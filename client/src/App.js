import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ItemDetails from './components/ItemDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
          <Login/>
          </Route>
          <Route exact path="/dashboard">
            <DashboardPage />
          </Route>
          <Route exact path="/itemdetails">
            <ItemDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
