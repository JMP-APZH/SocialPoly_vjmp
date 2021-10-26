import "./AppStyle";
import { AppMain } from './AppStyle';
import { BrowserRouter as Router, Route } from "react-router-dom";
import TestPage from './Pages/TestPage/TestPage';

function App() {
    return (
        <Router>
            <AppMain>
                <Route path='/' component={TestPage} exact />
            </AppMain>
        </Router>
    );
}

export default App;
