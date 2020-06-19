import { useEffect, useCallback } from "react";

const useDetectClickOutside = (ref, handler, timer) => {
  // timer - time to wait to start listener; edge case
  const listener = useCallback(
    (e) => ref.current && !ref.current.contains(e.target) && handler(false),
    [ref, handler]
  );

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", listener);
      return () => document.removeEventListener("click", listener);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, timer);
  }, [listener, timer]);
};
export default useDetectClickOutside;
