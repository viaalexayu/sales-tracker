import { useState } from "react";
import "./App.css";
import AddSales from "./AddSales";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  const [productsInCart, setProductInCart] = useState([]);

  const addProductInCart = (product) => {
    const updatedProductInCart = productsInCart.concat([product]);
    setProductInCart(updatedProductInCart);
  };

  return (
    <BrowserRouter>

      <Routes>
        {/* <Route path="/" element={<ProductsPage onAddToCartClick={addProductInCart} />} /> */}
        <Route path="/add-sale" element={<AddSales />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
