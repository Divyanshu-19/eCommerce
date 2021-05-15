import "./App.css"
import { useState } from "react";
import { Header } from "./components/Header";
import Products from "./components/Products";
import Wishlist from "./components/Wishlist";
import Cart from "./components/Cart";

function App() {
  const [route, setRoute] = useState("products");

  return (
    <>
      <Header route={route} setRoute={setRoute}/>
      {route==="products" && <Products setRoute={setRoute} />}
      {route==="wishlist" && <Wishlist />}
      {route==="cart" && <Cart />}
    </>
  );
}

export default App;
