import { Context, gql, useApolloClient } from "@paisidevs/tra-apollo";
import {
  Box,
  Button,
  Flex,
  Form,
  Grid,
  Input,
  ScrollView,
  Text,
} from "@paisidevs/tra-components";
import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useTodosQuery,
} from "../../generated/graphql";

const GET_TODOS = gql`
  query todos {
    todos @client {
      id
      description
    }
  }
`;

const resolvers = {
  Mutation: {
    createTodo: (_: any, { input }: any, { cache }: Context) => {
      const query = GET_TODOS;
      const previous = cache.readQuery({ query });

      const todo = previous.todos.find(
        (todo: any) => todo.description === input.description
      );

      if (todo) {
        throw new Error("Duplicate exists!");
      }

      const newTodo = { ...input, id: uuidv4(), __typename: "Todo" };
      const todos = [newTodo, ...previous.todos];
      const data = { todos };

      cache.writeQuery({ query, data });
      return newTodo;
    },
    deleteTodo: (_: any, { id }: any, { cache }: Context) => {
      const query = GET_TODOS;
      const previous = cache.readQuery({ query });

      const todo = previous.todos.find((todo: any) => todo.id === id);

      if (!todo) {
        throw new Error("Todo doesn't exist!");
      }

      const todos = previous.todos.filter((todo: any) => todo.id !== id);
      const data = { todos };

      cache.writeQuery({ query, data });
      return todo;
    },
  },
};

const Example: React.FC = () => {
  const client = useApolloClient();
  client.addResolvers(resolvers);

  const [createTodo] = useCreateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const { data: todosData } = useTodosQuery();

  return (
    <Grid
      backgroundColor="background.surface"
      height="100%"
      overflow="hidden"
      width="100%"
    >
      <ScrollView>
        <Box padding={2}>
          <Box margin="0 auto" maxWidth={500} width="100%">
            <Form
              name="todo"
              initialValues={{ description: "" }}
              onSubmit={async (
                { description },
                { resetForm, setFieldError }
              ) => {
                try {
                  await createTodo({
                    variables: { input: { description } },
                  });
                  resetForm();
                } catch ({ networkError }) {
                  if (networkError) {
                    setFieldError("description", networkError.message);
                  }
                }
              }}
            >
              {({ handleSubmit, values }) => (
                <React.Fragment>
                  <Input
                    label="Add a task..."
                    name="description"
                    endAdornment={
                      !Boolean(values.description?.length < 1) && (
                        <Button
                          height="100%"
                          // @ts-ignore
                          onClick={handleSubmit}
                          text="Add"
                          type="submit"
                        />
                      )
                    }
                  />
                </React.Fragment>
              )}
            </Form>
            {todosData?.todos?.map((todo) => (
              <Flex
                key={todo?.id}
                data-id={todo?.id}
                alignItems="center"
                height={40}
              >
                <Flex flex={1}>
                  <Text>{todo?.description}</Text>
                </Flex>
                <Flex flex="none">
                  <Button
                    onClick={() =>
                      todo?.id && deleteTodo({ variables: { id: todo?.id } })
                    }
                    text="Remove"
                  />
                </Flex>
              </Flex>
            ))}
          </Box>
        </Box>
      </ScrollView>
    </Grid>
  );
};

export default Example;
