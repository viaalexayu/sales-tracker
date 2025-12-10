import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./AddSale.css";
import Fiesta11kgK from "./assets/Fiesta11kgK.jpg";
import Fiesta11kgP from "./assets/Fiesta11kgP.jpg";
import Fiesta2_7kg from "./assets/Fiesta2_7kg.jpg";

function AddSale() {

  const timestamp = Date.now();
  const dateNow = new Date(timestamp);
  const formattedDate = dateNow.toISOString().substring(0, 10);

  const [date, setDate] = useState(formattedDate);
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [number, setNumber] = useState("");
  const [price11kgRefill, setPrice11kgRefill] = useState(0);
  const [price2_7kgCylinder, setPrice2_7kgCylinder] = useState(0);
  const [price2_7kgRefill, setPrice2_7kgRefill] = useState(0);
  const [price11kgCylinder, setPrice11kgCylinder] = useState(0);
  const [qty11kgKCylinder, setQty11kgKCylinder] = useState(0);
  const [qty11kgKRefill, setQty11kgKRefill] = useState(0);
  const [qty11kgPCylinder, setQty11kgPCylinder] = useState(0);
  const [qty11kgPRefill, setQty11kgPRefill] = useState(0);
  const [qty2_7kgCylinder, setQty2_7kgCylinder] = useState(0);
  const [qty2_7kgRefill, setQty2_7kgRefill] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  const validateForm = () => {
    let newError = {};
    if (!date) newError.date = 'Valid date required!';
    if (!seller) newError.seller = 'Seller required!';
    if (!buyer) newError.buyer = 'Buyer required!';
    if (!number) newError.number = 'Number required!';
    if (qty11kgKCylinder == "") newError.qty11kgKCylinder = 'Quantity required!';
    if (qty11kgKRefill == "") newError.qty11kgKRefill = 'Quantity required!';
    if (qty11kgPCylinder == "") newError.qty11kgPCylinder = 'Quantity required!';
    if (qty11kgPRefill == "") newError.qty11kgPRefill = 'Quantity required!';
    if (qty2_7kgCylinder == "") newError.qty2_7kgCylinder = 'Quantity required!';
    if (qty2_7kgRefill == "") newError.qty2_7kgRefill = 'Quantity required!';
    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const preventKeyboardInput = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    fetchSalesData();
  };

  const fetchPricesData = async () => {
    setLoading(true);
    setIsEditable(false);
    try {
      const res = await fetch("http://localhost:3000/prices/" + date, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        const content = await res.json();
        navigate("/error", {
          state: {
            errorCode: res.status,
            errorMessage: content.message || "Fetch error"
          }
        });
        return;
      }

      else {
        const content = await res.json();

        const p11C = Number(content.price11kgCylinder) || 0;
        const p11R = Number(content.price11kgRefill) || 0;
        const p2C = Number(content.price2_7kgCylinder) || 0;
        const p2R = Number(content.price2_7kgRefill) || 0;

        setPrice11kgCylinder(p11C);
        setPrice11kgRefill(p11R);
        setPrice2_7kgCylinder(p2C);
        setPrice2_7kgRefill(p2R);

        const total =
          (Number(qty11kgKRefill) + Number(qty11kgPRefill)) * p11R +
          (Number(qty11kgKCylinder) + Number(qty11kgPCylinder)) * p11C +
          Number(qty2_7kgRefill) * p2R +
          Number(qty2_7kgCylinder) * p2C;

        setTotalPrice(total);
      }
    }

    catch (error) {
      navigate("/error", {
        state: {
          errorCode: 500,
          errorMessage: "Network error: " + error.message
        }
      });

    } finally {
      setIsEditable(true);
      setLoading(false);
    }
  }

  const fetchSalesData = async () => {
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
        navigate("/error", {
          state: {
            errorCode: res.status,
            errorMessage: content.message || "Fetch error"
          }
        });
        return;
      }

      else {
        const content = await res.json();
        console.log(content);
        alert("Successfully added new sale!");
        navigate('/');
      }
    }

    catch (error) {
      navigate("/error", {
        state: {
          errorCode: 500,
          errorMessage: "Network error: " + error.message
        }
      });

    } finally {
      setIsEditable(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPricesData();
  }, [date]);

  useEffect(() => {
    const total =
      (qty11kgKRefill + qty11kgPRefill) * price11kgRefill +
      (qty11kgKCylinder + qty11kgPCylinder) * price11kgCylinder +
      qty2_7kgRefill * price2_7kgRefill +
      qty2_7kgCylinder * price2_7kgCylinder;

    setTotalPrice(total || 0);
  }, [
    qty11kgKRefill, qty11kgPRefill,
    qty11kgKCylinder, qty11kgPCylinder,
    qty2_7kgRefill, qty2_7kgCylinder,
    price11kgRefill, price11kgCylinder,
    price2_7kgRefill, price2_7kgCylinder
  ]);

  return (
    <div className="body">
      <h1>Add New Sale</h1>

      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="section section1">
            <label>Date:&nbsp;
              <input
                type="date"
                max={formattedDate}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={!isEditable}
                onKeyDown={preventKeyboardInput}
              />
            </label>
            <div className="error-space">
              {error.date && <p className="error">{error.date}</p>}
            </div>
            <br />
            <label>Order#:&nbsp;
              <input
                className="inputText"
                type="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.number && <p className="error">{error.number}</p>}
            </div>
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
            <br /> <br />
            <h2>Total Price: ₱{totalPrice}</h2>

          </div>
          <div className="section">
            <img src={Fiesta11kgK} width="200px"></img>
            <br />
            <h3>11kg - K type</h3>
            <br />
            <label>Cylinder:&nbsp;
              <input
                className="inputNumber"
                type="number"
                min="0"
                max="99"
                value={qty11kgKCylinder}
                onChange={(e) => setQty11kgKCylinder(Number(e.target.value))}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgKCylinder && <p className="error">{error.qty11kgKCylinder}</p>}
            </div>
            <label>Refill:&nbsp;
              <input
                className="inputNumber"
                type="number"
                min="0"
                max="99"
                value={qty11kgKRefill}
                onChange={(e) => setQty11kgKRefill(Number(e.target.value))}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgKRefill && <p className="error">{error.qty11kgKRefill}</p>}
            </div>
          </div>
          <div className="section">
            <img src={Fiesta11kgP} width="200px"></img>
            <br />
            <h3>11kg - P type</h3>
            <br />
            <label>Cylinder:&nbsp;
              <input
                className="inputNumber"
                type="number"
                min="0"
                max="99"
                value={qty11kgPCylinder}
                onChange={(e) => setQty11kgPCylinder(Number(e.target.value))}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgPCylinder && <p className="error">{error.qty11kgPCylinder}</p>}
            </div>
            <label>Refill:&nbsp;
              <input
                className="inputNumber"
                type="number"
                min="0"
                max="99"
                value={qty11kgPRefill}
                onChange={(e) => setQty11kgPRefill(Number(e.target.value))}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty11kgPRefill && <p className="error">{error.qty11kgPRefill}</p>}
            </div>
          </div>
          <div className="section">
            <img src={Fiesta2_7kg} width="200px"></img>
            <br />
            <h3>2.7kg</h3>
            <br />
            <label>Cylinder:&nbsp;
              <input
                className="inputNumber"
                type="number"
                min="0"
                max="99"
                value={qty2_7kgCylinder}
                onChange={(e) => setQty2_7kgCylinder(Number(e.target.value))}
                disabled={!isEditable}
              />
            </label>
            <div className="error-space">
              {error.qty2_7kgCylinder && <p className="error">{error.qty2_7kgCylinder}</p>}
            </div>
            <label>Refill:&nbsp;
              <input
                className="inputNumber"
                type="number"
                min="0"
                max="99"
                value={qty2_7kgRefill}
                onChange={(e) => setQty2_7kgRefill(Number(e.target.value))}
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
      </form >
    </div >
  )
}

export default AddSale;