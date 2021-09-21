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
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import CategoriesBar from './components/CategoriesBar';
import BackpackPage from './pages/BackpackPage';
import GearPage from './pages/GearPage';
import KnivesPage from './pages/KnivesPage';
import CartPage from './pages/CartPage';
import CheckoutComplete from './pages/CheckoutComplete';

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
            <NavBar />
            <CategoriesBar />
            <DashboardPage />
          </ProtectedRoute>
          <ProtectedRoute exact path="/">
            <Home />
          </ProtectedRoute>
          <ProtectedRoute exact path="/sell">
            <SellPage />
          </ProtectedRoute>
          <ProtectedRoute path="/clothes">
            <NavBar />
            <CategoriesBar />
            <ClothesPage />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/shoes">
            <NavBar />
            <CategoriesBar />
            <ShoesPage />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/tents">
            <NavBar />
            <CategoriesBar />
            <TentsPages />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/backpacks">
            <NavBar />
            <CategoriesBar />
            <BackpackPage />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/gear">
            <NavBar />
            <CategoriesBar />
            <GearPage />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/knives">
            <NavBar />
            <CategoriesBar />
            <KnivesPage />
            <Footer />
          </ProtectedRoute>
          <ProtectedRoute path="/detailspage/:id">
            <CategoriesBar />
            <DetailsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/checkout_completed/:checkout_id">
            <CheckoutComplete />
          </ProtectedRoute>
          <ProtectedRoute path="/cart">
            <NavBar />
            <CategoriesBar />
            <CartPage />
          </ProtectedRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
