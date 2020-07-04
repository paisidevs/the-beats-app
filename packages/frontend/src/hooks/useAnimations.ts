import { useSpring } from "react-spring";

export const useAnimations = () => {
  const useFadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  const useFadeUp = useSpring({
    from: { opacity: 0, transform: "translateY(32px)" },
    to: { opacity: 1, transform: "translateY(0px" }
  });

  return { useFadeIn, useFadeUp };
};
