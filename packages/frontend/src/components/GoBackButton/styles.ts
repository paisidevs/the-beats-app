import { Button } from "@paisidevs/tra-components";
import { styled } from "@paisidevs/tra-theme";

const Wrapper = styled(Button)`
  position: sticky;
  top: 0;
  border-radius: 100%;
  height: 56px;
  overflow: hidden;
  width: 56px;

  i,
  i > svg {
    height: 24px;
    width: 24px;
  }
`;

export default Wrapper;
