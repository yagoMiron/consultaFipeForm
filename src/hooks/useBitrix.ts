declare global {
  interface Window {
    BX24: any;
  }
}

export function initBitrix(): Promise<void> {
  return new Promise((resolve) => {
    if (!window.BX24) {
      console.error("BX24 não está disponível");
      return;
    }

    window.BX24.init(() => {
      console.log("BX24 inicializado");

      // Ajusta o tamanho da iframe
      window.BX24.resizeWindow(1200, 800);

      resolve();
    });
  });
}
