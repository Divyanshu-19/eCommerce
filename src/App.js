import "./App.css"

import { Routes, Route, Navigate } from "react-router-dom";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail"
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
