import { useEffect, useRef } from 'react';

const useClickOutside = (callbackFun) => {
  const elementRef = useRef(null);
  const callBackFunRef = useRef(null);

  callBackFunRef.current = callbackFun;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!elementRef.current?.contains(e.target) && callBackFunRef.current) {
        callBackFunRef.current(e);
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [elementRef, callbackFun]);

  return elementRef;
};

export default useClickOutside;