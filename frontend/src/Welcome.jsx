import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Welcome() {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div>
      <h2>Hello</h2>
    </div>
  )
}

export default Welcome;