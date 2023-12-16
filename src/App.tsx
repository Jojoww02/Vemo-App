import routes from "@/router";
import { useRoutes } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

export default function App(): JSX.Element {
  const content = useRoutes(routes);
  return (
    <>
      {content}
      <Toaster />
    </>
  );
}
