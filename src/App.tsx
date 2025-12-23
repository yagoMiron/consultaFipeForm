import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { initBitrix } from "./hooks/useBitrix";
import { routes } from "./routes/Routes";
import "./App.css";

function App() {
  useEffect(() => {
    initBitrix().then(() => {
      console.log("Bitrix pronto");
    });
  }, []);
  const elements = useRoutes(routes);
  return elements;
}

export default App;
