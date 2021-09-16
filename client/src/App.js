import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actionLoggedIn, actionLoggedOut } from './redux/actions/user';
import Login from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SellPage from './pages/SellPage';
import ProtectedRoute from './components/ProtectedRoute';
import NavBar from './components/NavBar';
import CategoriesBar from './components/CategoriesBar';
import Carousel from './components/Carousel';
import Home from './pages/Home';
import ClothesPage from './pages/ClothesPage';
import ShoesPage from './pages/ShoesPage';
import TentsPages from './pages/TentsPages';

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
          <Route exact path="/sell">
            <SellPage />
          </Route>
          <Route path="/clothes">
            <ClothesPage />
          </Route>
          <Route path="/shoes">
            <ShoesPage />
          </Route>
          <Route path="/tents">
            <TentsPages />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
