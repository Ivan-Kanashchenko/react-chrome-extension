import { createRoot } from "react-dom/client";
import { StyleProvider } from "@ant-design/cssinjs";
import App from "@src/pages/content/components/LinkedInIviter/app";

import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content");

const init = () => {
  const timerId = setInterval(() => {
    const isLinkedIn = document.querySelector('[aria-label="LinkedIn"]');

    if (!isLinkedIn) {
      return;
    }

    const body = document.querySelector("body");

    if (body) {
      clearInterval(timerId);
      const root = document.createElement("div");

      root.id = "chrome-extension-inviter";
      root.style.position = "fixed";
      root.style.bottom = "10px";
      root.style.left = "10px";
      root.style.zIndex = "999";

      body.prepend(root);
      createRoot(root).render(
        // <StyleProvider hashPriority="high">
        <App />
        // </StyleProvider>
      );
    }
  }, 3000);
};

init();
