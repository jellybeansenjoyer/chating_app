import { Button } from "@chakra-ui/react";
import logo from "./logo.svg";
import Homepage from "./pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./pages/Chatpage";
import './App.css'
function App() {
  return <div className="App">
    <Route path="/" component={Homepage} exact />
    <Route path="/chats" component={Chatpage} />
    </div>;
}

export default App;
