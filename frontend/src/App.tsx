import Layout from "./views/layout/Layout";
import Router from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;