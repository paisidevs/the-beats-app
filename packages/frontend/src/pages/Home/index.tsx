import React from "react";
import { Helmet } from "react-helmet";
import { Logo } from "../../components";
import { Wrapper } from "./styles";

const Home: React.FC = () => {
  return (
    <Wrapper>
      <Helmet>
        <title>the-react-app - Built with love by @paisidevs</title>
      </Helmet>
      <Logo />
    </Wrapper>
  );
};

export default Home;
