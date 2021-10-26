import "./AppStyle";
import { AppMain } from './AppStyle';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestPage from './Pages/TestPage/TestPage';
import GridDND from "./Components/GridDND/GridDND";
/* import TopBar from "./Components/TopBar/TopBar"; */

function App() {
    return (
        <Router>
            <AppMain>
                {/* <TopBar /> */}
                <Route path='/' component={TestPage} exact />
                <Route path='/grid' component={GridDND} exact />
            </AppMain>
        </Router>
    );
}

export default App;
