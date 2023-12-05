import * as React from "react";

export default function useMobile() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth >= 900);

  React.useEffect(() => {
    const handleMobile = () => {
      setIsMobile(window.innerWidth >= 900);
    };

    window.addEventListener("resize", handleMobile);

    return () => {
      window.removeEventListener("resize", handleMobile);
    };
  }, []);

  return isMobile;
}
