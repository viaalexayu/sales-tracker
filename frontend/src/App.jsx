import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AddSale from "./AddSale";
import Welcome from "./Welcome";
import ViewSales from "./ViewSales";
import EditSale from "./EditSale";

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
        <Route path="/edit-sale" element={<EditSale />} />
        <Route path="/view-sales" element={<ViewSales />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
