import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddSales() {

  const [date, setDate] = useState("");
  const [seller, setSeller] = useState("");
  const [buyer, setBuyer] = useState("");
  const [number, setNumber] = useState("");
  const [price11kgRefill, setPrice11kgRefill] = useState("");
  const [price2_7kgCylinder, setPrice2_7kgCylinder] = useState("");
  const [price2_7kgRefill, setPrice2_7kgRefill] = useState("");
  const [price11kgCylinder, setPrice11kgCylinder] = useState("");
  const [qty11kgKCylinder, setQty11kgKCylinder] = useState("");
  const [qty11kgKRefill, setQty11kgKRefill] = useState("");
  const [qty11kgPCylinder, setQty11kgPCylinder] = useState("");
  const [qty11kgPRefill, setQty11kgPRefill] = useState("");
  const [qty2_7kgCylinder, setQty2_7kgCylinder] = useState("");
  const [qty2_7kgRefill, setQty2_7kgRefill] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isEditable, setIsEditable] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <div>
      <h2>Add New Sale</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>

        <label>Date:&nbsp;
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Seller:&nbsp;
          <input
            type="text"
            value={seller}
            onChange={(e) => setSeller(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Buyer:&nbsp;
          <input
            type="text"
            value={buyer}
            onChange={(e) => setBuyer(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Number:&nbsp;
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <p>11kg Cylinder</p>
        <label>Cylinder Price:&nbsp;
          <input
            type="number"
            value={price11kgCylinder}
            onChange={(e) => setPrice11kgCylinder(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Refill Price:&nbsp;
          <input
            type="number"
            value={price11kgRefill}
            onChange={(e) => setPrice11kgRefill(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <p>K type</p>
        <label>Cylinder Quantity:&nbsp;
          <input
            type="number"
            value={qty11kgKCylinder}
            onChange={(e) => setQty11kgKCylinder(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Refill Quantity:&nbsp;
          <input
            type="number"
            value={qty11kgKRefill}
            onChange={(e) => setQty11kgKRefill(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <p>P type</p>
        <label>Cylinder Quantity:&nbsp;
          <input
            type="number"
            value={qty11kgPCylinder}
            onChange={(e) => setQty11kgPCylinder(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Refill Quantity:&nbsp;
          <input
            type="number"
            value={qty11kgPRefill}
            onChange={(e) => setQty11kgPRefill(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <p>2.7kg Cylinder</p>
        <label>Cylinder Price:&nbsp;
          <input
            type="number"
            value={price2_7kgCylinder}
            onChange={(e) => setPrice2_7kgCylinder(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Refill Price:&nbsp;
          <input
            type="number"
            value={price2_7kgRefill}
            onChange={(e) => setPrice2_7kgRefill(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Cylinder Quantity:&nbsp;
          <input
            type="number"
            value={qty2_7kgCylinder}
            onChange={(e) => setQty2_7kgCylinder(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Refill Quantity:&nbsp;
          <input
            type="number"
            value={qty2_7kgRefill}
            onChange={(e) => setQty2_7kgRefill(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <label>Total Price:&nbsp;
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            disabled={!isEditable}
          />
        </label>
        <br /><br />
        <button className="btn" type="submit" disabled={!isEditable}>Submit</button>
      </form>
    </div>
  )
}

export default AddSales;