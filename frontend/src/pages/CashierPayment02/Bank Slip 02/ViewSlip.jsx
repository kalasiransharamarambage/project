import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './viewslip.css';

export default function ViewSlip() {
  const [slip, setSlipPayments] = useState({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/slip-payments/${id}`)
      .then((response) => {
        setSlipPayments(response.data.slipPayment);
        console.log(response.data.slipPayment);
        setIsConfirmed(response.data.slipPayment.status === 'confirmed');

      })
      .catch((error) => {
        console.error("There was an error fetching the slip!", error);
      });
  }, [id]);

  const handleConfirm = () => {
    axios
      .put(`http://localhost:3000/slip-payments/${id}`, { status: "confirmed" })
      .then((response) => {
        setSlipPayments(response.data.slipPayment);
        console.log();
        setIsConfirmed(true);
      })
      .catch((error) => {
        console.error("There was an error updating the slip!", error);
      });
  };

  return (
    <div>
      <div className='topicBox'>
        <p>Bank Slip</p>
      </div>
      <p className='ID'><b>Order ID: {slip._id}</b></p>
      <div>
        <div className='slip'>
          <img src={""} alt="slip" />
        </div>
        <div className='Confirmationbutton'>
          <button
            onClick={handleConfirm}
            disabled={isConfirmed}
          >
            {isConfirmed ? 'Confirmed' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
