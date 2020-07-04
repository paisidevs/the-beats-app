import { logger } from "@paisidevs/tra-utilities";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { routes } from "../../containers/App/routes";

const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs(routes);
  const slicedBreadcrumbs = breadcrumbs.slice(1);
  logger({ breadcrumbs, slicedBreadcrumbs });

  return null;
};

export default Breadcrumbs;
