import logo from './logo.svg';
import './App.css';

import {FormPortfolio} from "./component/form/formPortfolio";
import {Dashboard} from "./component/dashboard/dashboard";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Router>

            <Routes>

                <Route path="/" element={<FormPortfolio /> }/>
                <Route path="/dashboard" element={<Dashboard/>}/>

            </Routes>

        </Router>
    </div>
  );
}

export default App;
