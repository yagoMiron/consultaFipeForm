import { useRoutes } from "react-router-dom";
import { useEffect } from "react";
import { initBitrix } from "./hooks/useBitrix";
import { routes } from "./routes/Routes";
import "./App.css";

declare global {
  interface Window {
    BX24: any;
  }
}

function App() {
  useEffect(() => {
    initBitrix().then(() => {
      console.log("Bitrix pronto");
      window.BX24.callMethod("user.current", {}, (result: any) => {
        if (result.error()) {
          console.error("Erro ao buscar usuário:", result.error());
          return;
        }
        const user = result.data();
        console.log("Usuário Bitrix:", user.NAME, user.LAST_NAME);
      });
    });
  }, []);
  const elements = useRoutes(routes);
  return elements;
}

export default App;
