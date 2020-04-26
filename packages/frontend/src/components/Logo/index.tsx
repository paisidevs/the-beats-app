import { Box } from '@paisidevs/tra-components';
import { useTheme } from '@paisidevs/tra-theme';
import React from 'react';
import { Outer } from './styles';

const Logo = () => {
  const { theme } = useTheme();

  const ovalProps = {
    border: 3,
    borderColor: theme.colors.text.default,
    borderRadius: '50%',
    className: 'a-oval',
    height: '40%',
    position: 'absolute' as 'absolute',
    width: '100%',
  };

  return (
    <Outer alignItems="center" justifyContent="center" size={144}>
      <Box {...ovalProps} />
      <Box {...ovalProps} />
      <Box {...ovalProps} />
    </Outer>
  );
};

export default Logo;
