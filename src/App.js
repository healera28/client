import { message } from "antd";
import Router from "./Router/Router";
import Header from "./components/Header/Header";

function App() {

  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  )
}

export default App;
