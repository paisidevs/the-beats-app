import { Box, ErrorBoundary, Grid, Routes } from '@paisidevs/tra-components';
import { Global, ThemeProvider } from '@paisidevs/tra-theme';
import React, { FC } from 'react';
import { routes } from './routes';

const App: FC = () => {
  const renderApp = () => {
    return (
      <React.Fragment>
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
        backgroundColor="background.base"
        color="text.default"
        gridTemplateRows={['auto 1fr auto', 'auto 1fr auto']}
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
