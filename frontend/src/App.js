import './App.css';
import Home from "./Pages/Home"
import Chats from "./Pages/Chats"

import { Route } from "react-router-dom"

function App() {
  return (
    <div className='App'>
      <Route path="/" component={Home} exact/>
      <Route path="/chats" component={Chats} exact/>
    </div>
  );
}

export default App;