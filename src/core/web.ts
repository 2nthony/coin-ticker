// integrated in `main.ts`
const { PROD } = import.meta.env;

if (PROD) {
  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
}

export default null;
