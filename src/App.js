import { ToastContainer } from "react-toastify";
import "./App.css";
import AppRoutes from "./components/AppRoutes/AppRoutes";
function App() {
  return (
    <div className="App">
      <AppRoutes />
      <ToastContainer />
    </div>
  );
}

export default App;
