import { useEffect } from "react";

const useDetectClickOutside = (ref, handler) => {
  const listener = (e) => !ref.current.contains(e.target) && handler(false);
  useEffect(() => {
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);
};
export default useDetectClickOutside;
