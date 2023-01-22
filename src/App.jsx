import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import NewArrival from "./pages/NewArrivalShoes";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);
  // const user = false;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newarrival" element={<NewArrival />} />
        <Route path="/products/" element={<ProductList />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
