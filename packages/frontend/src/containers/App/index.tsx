import { Box, ErrorBoundary, Grid, Routes } from "@paisidevs/tra-components";
import { Global, ThemeProvider } from "@paisidevs/tra-theme";
import React, { FC } from "react";
import { Header } from "../../components";
import { routes } from "./routes";

const App: FC = () => {
  const renderApp = () => {
    return (
      <React.Fragment>
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        <Box height="100%" overflow="hidden">
          <ErrorBoundary>
            <Routes routes={routes} />
          </ErrorBoundary>
        </Box>
      </React.Fragment>
    );
  };

  return (
    <ThemeProvider>
      <Grid
        backgroundColor="background.surface"
        color="text.default"
        gridTemplateRows="64px 1fr"
        height="100%"
        overflow="hidden"
      >
        <Global />
        {renderApp()}
      </Grid>
    </ThemeProvider>
  );
};

export default App;
