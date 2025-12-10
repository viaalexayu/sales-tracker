import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import "./Welcome.css";

function Error() {

    const location = useLocation();
    const { errorCode, errorMessage } = location.state || { errorCode: "404", errorMessage: "Cannot be found" };

    return (
        <div className="body">
            <h1>Error {errorCode}</h1>
            <h2>{errorMessage}.</h2>
        </div >
    )
}

export default Error;