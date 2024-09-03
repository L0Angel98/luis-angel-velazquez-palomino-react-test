// src/App.tsx
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import ProductForm from './pages/ProductForm/ProductForm';
import ProductDetails from './pages/ProductDetail/ProductDetail';
import Users from './pages/Users/Users';
import AutoLogout from './components/AutoLogout/AutoLogout';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';



const App: React.FC = () => {
  return (
    <Router>
        <Routes>  
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<AutoLogout><PrivateRoute /> </AutoLogout>}>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/products/create" element={<ProductForm />} />
            <Route path="/products/create/:id" element={<ProductForm />} />
            <Route path="/users" element={<Users />} />
          </Route>
          <Route  path="*" element={<NotFoundPage />} />
        </Routes>
    </Router>
  );
};

export default App;
