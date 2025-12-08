import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./AddSale.css";

function AddSale() {

  const timestamp = Date.now();
  const dateNow = new Date(timestamp);
  const formattedDate = dateNow.toISOString().substring(0, 10);

  const [date, setDate] = useState(formattedDate);
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [number, setNumber] = useState("");
  const [price11kgRefill, setPrice11kgRefill] = useState("0");
  const [price2_7kgCylinder, setPrice2_7kgCylinder] = useState("0");
  const [price2_7kgRefill, setPrice2_7kgRefill] = useState("0");
  const [price11kgCylinder, setPrice11kgCylinder] = useState("0");
  const [qty11kgKCylinder, setQty11kgKCylinder] = useState("0");
  const [qty11kgKRefill, setQty11kgKRefill] = useState("0");
  const [qty11kgPCylinder, setQty11kgPCylinder] = useState("0");
  const [qty11kgPRefill, setQty11kgPRefill] = useState("0");
  const [qty2_7kgCylinder, setQty2_7kgCylinder] = useState("0");
  const [qty2_7kgRefill, setQty2_7kgRefill] = useState("0");
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const total =
      ((parseInt(qty11kgKRefill) + parseInt(qty11kgPRefill)) * parseFloat(price11kgRefill)) +
      ((parseInt(qty11kgKCylinder) + parseInt(qty11kgPCylinder)) * parseFloat(price11kgCylinder)) +
      (parseInt(qty2_7kgRefill) * parseFloat(price2_7kgRefill)) +
      (parseInt(qty2_7kgCylinder) * parseFloat(price2_7kgCylinder));

    if (!total || isNaN(total)) setTotalPrice(0);
    else setTotalPrice(total);
  }, [
    qty11kgKRefill, qty11kgPRefill,
    qty11kgKCylinder, qty11kgPCylinder,
    qty2_7kgRefill, qty2_7kgCylinder,
    price11kgRefill, price11kgCylinder,
    price2_7kgRefill, price2_7kgCylinder
  ]);

  const validateForm = () => {
    let newError = {};
    if (!date) newError.date = 'Date required!';
    if (!seller) newError.seller = 'Seller required!';
    if (!buyer) newError.buyer = 'Buyer required!';
    if (!number) newError.number = 'Number required!';
    if (!qty11kgKCylinder) newError.qty11kgKCylinder = 'Quantity required!';
    if (!qty11kgKRefill) newError.qty11kgKRefill = 'Quantity required!';
    if (!qty11kgPCylinder) newError.qty11kgPCylinder = 'Quantity required!';
    if (!qty11kgPRefill) newError.qty11kgPRefill = 'Quantity required!';
    if (!qty2_7kgCylinder) newError.qty2_7kgCylinder = 'Quantity required!';
    if (!qty2_7kgRefill) newError.qty2_7kgRefill = 'Quantity required!';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    setIsEditable(false);

    try {
      const res = await fetch("http://localhost:3000/sales", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          date: date,
          seller: seller,
          buyer: buyer,
          number: number,
          price11kgRefill: price11kgRefill,
          price2_7kgCylinder: price2_7kgCylinder,
          price2_7kgRefill: price2_7kgRefill,
          price11kgCylinder: price11kgCylinder,
          qty11kgKCylinder: qty11kgKCylinder,
          qty11kgKRefill: qty11kgKRefill,
          qty11kgPCylinder: qty11kgPCylinder,
          qty11kgPRefill: qty11kgPRefill,
          qty2_7kgCylinder: qty2_7kgCylinder,
          qty2_7kgRefill: qty2_7kgRefill,
          totalPrice: totalPrice
        })
      });

      if (!res.ok) {
        const content = await res.json();
        setError(content.message);
      }

      else {
        const content = await res.json();
        console.log(content);
        alert("Successfully added new sale!");
        navigate('/');
      }
    }

    catch (error) {
      setError("Network error:" + error.message);

    } finally {
      setIsEditable(true);
      setLoading(false);
    }
  }

  return (
    <div className="body">
      <h1>Add New Sale</h1>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="section section1">
            <label>Date:&nbsp;
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.date && <p className="error">{error.date}</p>}
            </div>
            <br />
            <label>Seller:&nbsp;
              <input
                type="text"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.seller && <p className="error">{error.seller}</p>}
            </div>
            <label>Buyer:&nbsp;
              <input
                type="text"
                value={buyer}
                onChange={(e) => setBuyer(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.buyer && <p className="error">{error.buyer}</p>}
            </div>
            <br />

            <label>Number:&nbsp;
              <input
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.number && <p className="error">{error.number}</p>}
            </div>
            <br /> <br />
            <br /> <br />
            <h2>Total Price: ₱{totalPrice}</h2>

          </div>
          <div className="section">
            <img src="./src/Fiesta11kgK.jpg" width="200px"></img>
            <br />
            <label>Cylinder Price:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={price11kgCylinder}
                onChange={(e) => setPrice11kgCylinder(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <br />
            <label>Refill Price:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={price11kgRefill}
                onChange={(e) => setPrice11kgRefill(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <br />
            <p>K type</p>
            <label>Cylinder Quantity:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={qty11kgKCylinder}
                onChange={(e) => setQty11kgKCylinder(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgKCylinder && <p className="error">{error.qty11kgKCylinder}</p>}
            </div>
            <label>Refill Quantity:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={qty11kgKRefill}
                onChange={(e) => setQty11kgKRefill(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgKRefill && <p className="error">{error.qty11kgKRefill}</p>}
            </div>
          </div>
          <div className="section">
            <img src="./src/Fiesta11kgP.jpg" width="200px"></img>
            <br />
            <p>P type</p>
            <label>Cylinder Quantity:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={qty11kgPCylinder}
                onChange={(e) => setQty11kgPCylinder(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgPCylinder && <p className="error">{error.qty11kgPCylinder}</p>}
            </div>
            <label>Refill Quantity:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={qty11kgPRefill}
                onChange={(e) => setQty11kgPRefill(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgPRefill && <p className="error">{error.qty11kgPRefill}</p>}
            </div>
          </div>
          <div className="section">
            <img src="./src/Fiesta2_7kg.jpg" width="200px"></img>
            <br />
            <label>Cylinder Price:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={price2_7kgCylinder}
                onChange={(e) => setPrice2_7kgCylinder(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <br />
            <label>Refill Price:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={price2_7kgRefill}
                onChange={(e) => setPrice2_7kgRefill(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <br />
            <label>Cylinder Quantity:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={qty2_7kgCylinder}
                onChange={(e) => setQty2_7kgCylinder(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty2_7kgCylinder && <p className="error">{error.qty2_7kgCylinder}</p>}
            </div>
            <label>Refill Quantity:&nbsp;
              <input
                type="number"
                min="0"
                max="99"
                value={qty2_7kgRefill}
                onChange={(e) => setQty2_7kgRefill(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty2_7kgRefill && <p className="error">{error.qty2_7kgRefill}</p>}
            </div>
          </div>
                  </div>
          <br />
          <button className="btn" type="submit" disabled={!isEditable}>Submit</button>
          <br /> <br />
      </form >
    </div >
  )
}

export default AddSale;