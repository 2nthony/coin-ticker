// integrated in `main.ts`
import { appWindow } from "@tauri-apps/api/window";
import { listen, TauriEvent } from "@tauri-apps/api/event";

const { DEV, PROD } = import.meta.env;

if (DEV) {
  appWindow.setDecorations(true);
  appWindow.show();
}

if (PROD) {
  listen(TauriEvent.WINDOW_BLUR, () => {
    appWindow.hide();
  });
}

export default null;
