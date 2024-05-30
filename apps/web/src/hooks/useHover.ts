import { useState } from "react";

export const useHover = () => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => setHover(true);
  const onMouseLeave = () => setHover(false);

  return { hover, onMouseEnter, onMouseLeave };
};
