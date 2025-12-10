import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AddSale from "./AddSale";
import Welcome from "./Welcome";
import OTP from "./OTP";
import ViewSales from "./ViewSales";
import Navbar from "./Navbar";
import Error from "./Error";

function App() {
  const [productsInCart, setProductInCart] = useState([]);

  const addProductInCart = (product) => {
    const updatedProductInCart = productsInCart.concat([product]);
    setProductInCart(updatedProductInCart);
  };

  return (
    <BrowserRouter>
  <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/verify-login" element={<OTP />} />
        <Route path="/add-sale" element={<AddSale />} />
        <Route path="/view-sales" element={<ViewSales />} />
                <Route path="/error" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
