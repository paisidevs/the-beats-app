import { Box, Flex, H1, Text } from "@paisidevs/tra-components";
import React, { FC } from "react";
import { Search } from "react-feather";
import Truncate from "react-truncate";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { routes } from "../../containers/App/routes";
import GoBackButton from "../GoBackButton";

/**
 * @render react
 * @name Header component
 * @description Header component.
 * @example
 * <Header />
 */

const Header: FC = ({ ...props }) => {
  const breadcrumbs = useBreadcrumbs(routes);
  const slicedBreadcrumbs = breadcrumbs.slice(1);
  const title = slicedBreadcrumbs[slicedBreadcrumbs.length - 2]?.breadcrumb;
  const subtitle = slicedBreadcrumbs[slicedBreadcrumbs.length - 1]?.breadcrumb;

  return (
    <Box as="header" justifyContent="center" flex="none" {...props}>
      <Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flex="none"
          minWidth={64}
        >
          <GoBackButton show={slicedBreadcrumbs.length > 0} />
        </Flex>
        <Flex justifyContent="center" flex={1} flexDirection="column">
          <Text fontSize={[1, 2]} margin={0}>
            {title}
          </Text>
          <H1 fontSize={[4, 5]} margin={0}>
            <Truncate lines={1}>{subtitle}</Truncate>
          </H1>
        </Flex>
        <Flex
          alignItems="center"
          justifyContent="center"
          flex="none"
          minWidth={64}
        >
          <Search />
        </Flex>
      </Flex>
    </Box>
  );
};

Header.defaultProps = {
  backgroundColor: "background.surface",
  height: [64, 88],
};

export default Header;
