import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AddSale from "./AddSale";
import Welcome from "./Welcome";

function App() {
  const [productsInCart, setProductInCart] = useState([]);

  const addProductInCart = (product) => {
    const updatedProductInCart = productsInCart.concat([product]);
    setProductInCart(updatedProductInCart);
  };

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/add-sale" element={<AddSale />} />
        {/* <Route path="/all-sales" element={<AllSales />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/summary" element={<Summary />} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
