// src/index.tsx
import ReactDOM from "react-dom/client"; // Nota: react-dom/client para React 18
import App from "./App"
import { store } from './redux/store'
import { Provider } from 'react-redux'
import initializeDefaultUser from "./utils/initializeDefaultUser";
import "./main.sass"


initializeDefaultUser();

const rootElement: HTMLElement | null = document.getElementById("root");

// Verifica que el rootElement no sea null antes de usar createRoot
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error("No se pudo encontrar el elemento 'root'");
}
