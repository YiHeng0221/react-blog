import { useEffect, useState } from "react";

const useRWD = () => {
  const [device, setDevice] = useState("");
  const handleRWD = () => {
    if (window.innerWidth > 768) setDevice("PC");
    else if (window.innerWidth > 576) setDevice("tablet");
    else setDevice("mobile");
  };
  useEffect(() => {
    window.addEventListener("resize", handleRWD);
    handleRWD();
    return () => {
      window.removeEventListener("resize", handleRWD);
    };
  }, []);
  return device;
};

export default useRWD;
