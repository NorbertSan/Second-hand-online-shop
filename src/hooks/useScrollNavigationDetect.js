import { useEffect } from "react";

const useScrollNavigationDetect = (elementRef, handler) => {
  let lastScrollPosition = 0;
  const listener = (e) => {
    handler(false);
    let currentPosition = window.pageYOffset;
    if (currentPosition > lastScrollPosition) {
      // scroll down
      elementRef.current.classList.remove("active");
      elementRef.current.classList.add("hidden");
    } else {
      // scroll up
      elementRef.current.classList.remove("hidden");
      elementRef.current.classList.add("active");
    }
    lastScrollPosition = currentPosition;
  };

  useEffect(() => {
    document.addEventListener("scroll", listener);
    return () => document.removeEventListener("scroll", listener);
  });
};

export default useScrollNavigationDetect;
