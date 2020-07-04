import { Box, Form, ScrollView, Text } from "@paisidevs/tra-components";
import React from "react";
import { ChevronDown } from "react-feather";
import { Helmet } from "react-helmet";

const Playlists: React.FC = () => {
  const regex = /{{\s*?[a-z]*\s*?}}/g;
  const template =
    "The statemanager is a utility class that wraps around the base {{subject}} and each Select variant to expose inputValue and value as {{school}} props. For more detailed information on these props and their usage please see the controlled props section of the advanced page.";
  const expressions = template
    .match(regex)
    ?.map((expression) => expression.replace(/{{|}}/g, "").trim());
  const templateParts = template.split(regex);

  const placeholder = {
    subject: "United Federation of Planets option is not specified",
    school: "Updating package configuration",
  };

  const renderPitch = () => {
    let pitch: any[] = [];

    templateParts.forEach((part, index) => {
      pitch.push(<Text key={"text-" + index}>{part}</Text>);
      if (expressions?.[index]) {
        // @ts-ignore
        const expression = placeholder[expressions[index]];

        pitch.push(
          <Text
            key={"expression-" + index}
            backgroundColor="primary.base"
            color="text.onPrimary"
            style={{ cursor: "pointer" }}
            padding="2px 4px"
          >
            {expression} <ChevronDown size={12} />
          </Text>
        );
      }
    });

    return pitch;
  };

  return (
    <ScrollView>
      <Helmet>
        <title>the-beats-app - Built with love by @paisidevs</title>
      </Helmet>
      <Form name="pitch" initialValues={{}} onSubmit={() => null}>
        <Box display="block" padding={2}>
          {renderPitch()}
        </Box>
      </Form>
    </ScrollView>
  );
};

export default Playlists;
