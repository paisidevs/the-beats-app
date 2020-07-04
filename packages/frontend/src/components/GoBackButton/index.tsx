import { Animated, Box } from "@paisidevs/tra-components";
import React from "react";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { useTransition } from "react-spring";

// import { makeDebugger } from '../../utils';
// const debug = makeDebugger('GoBackButton');

interface IGoBackButtonProps {
  show?: boolean;
}

/**
 * @render react
 * @name GoBackButton component
 * @description GoBackButton component.
 * @example
 * <GoBackButton />
 */

const GoBackButton = ({ show }: IGoBackButtonProps) => {
  const history = useHistory();

  const backButtonTrans = useTransition(show, null, {
    from: { opacity: 0, transform: "translateX(-64px)" },
    enter: { opacity: 1, transform: "translateX(0)" },
    leave: { opacity: 0, transform: "translateX(-64px)" },
  });

  return (
    <Box style={{ cursor: "pointer" }} width="auto">
      {backButtonTrans.map(
        ({ item, key, props: styleProps }) =>
          item && (
            <Animated
              key={key}
              style={styleProps}
              onClick={() => history.goBack()}
            >
              <ArrowLeft />
            </Animated>
          )
      )}
    </Box>
  );
};

export default GoBackButton;
