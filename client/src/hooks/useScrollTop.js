import { useEffect } from "react";

const useScrollTop = () => {
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, []);
};

export default useScrollTop;