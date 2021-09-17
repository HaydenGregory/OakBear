import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionLoggedIn, actionLoggedOut } from './redux/actions/user';
import Login from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SellPage from './pages/SellPage';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import ClothesPage from './pages/ClothesPage';
import ShoesPage from './pages/ShoesPage';
import TentsPages from './pages/TentsPages';
import DetailsPage from './pages/DetailsPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('/user/getuser')
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          dispatch(actionLoggedIn(data))
        } else {
          dispatch(actionLoggedOut())
        }
      })
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <ProtectedRoute exact path="/dashboard">
            <DashboardPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path="/sell">
            <SellPage />
          </ProtectedRoute>
          <Route path="/clothes">
            <ClothesPage />
          </Route>
          <Route path="/shoes">
            <ShoesPage />
          </Route>
          <Route path="/tents">
            <TentsPages />
          </Route>
          <Route path="/detailspage/:id">
            <DetailsPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
