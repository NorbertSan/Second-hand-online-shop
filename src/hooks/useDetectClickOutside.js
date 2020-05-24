import { useEffect } from "react";

const useDetectClickOutside = (ref, handler) => {
  const listener = (e) =>
    ref.current && !ref.current.contains(e.target) && handler(false);

  useEffect(() => {
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default useDetectClickOutside;
