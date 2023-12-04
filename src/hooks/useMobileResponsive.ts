import * as React from "react"
export default function useMobileResponsive() {
  const [isMobileResponsive, setIsMobileResponsive] = React.useState(window.innerWidth >= 900)

  React.useEffect(() => {
    const handleMobileResponsive = () => {
        setIsMobileResponsive(window.innerWidth >= 900)
    };

    window.addEventListener("resize", handleMobileResponsive);

    return () => {
        window.removeEventListener("resize", handleMobileResponsive)
    }
  }, []);

  return isMobileResponsive;
}