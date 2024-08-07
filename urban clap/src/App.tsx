import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Main from "./routes/Main";
// import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </div>
  );
}

export default App;
