import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
          <Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
