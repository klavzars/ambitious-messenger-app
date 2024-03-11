import { useRef, useEffect } from "react";

const useClickOutside = (handler) => {
  const domNode = useRef(null);

  useEffect(() => {
    const closeOnOutsideClickHandler = (event) => {
      if (domNode.current !== null && !domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClickHandler);
    };
  });

  return domNode;
};

export default useClickOutside;
