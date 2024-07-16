import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './bankslip.css'

export default function BankSlip() {
  const [slippayments, setSlipPayments] = useState([]);

  useEffect(() => {
    const fetchSlipPayments = async () => {
      try {

        const response = await axios.get('http://localhost:3000/slip-payments');
        setSlipPayments(response.data);
        console.log(response.data)
              
      } catch (error) {
        console.error('Error fetching slip payments:', error);
      }
    };

    fetchSlipPayments();
  }, []);

  return (
    <div>
      <div className='topicBox'>
        <p>Bank Slip</p>
     </div>
     <div>

        <table className='sliptable'>
          <thead>
             <tr className='sliprow'>
                <th style={{borderTopLeftRadius:'15px'}}>Order ID</th>
                <th>Buyer Name</th>
                <th>Income(Rs:)</th>
                <th>Status</th>
                <th style={{borderTopRightRadius:'15px'}}></th>

            </tr>
            </thead>
            <tbody>
            {slippayments.map((payment) => (
               <tr key={payment._id} className='sliprow' >
                <td>{payment._id}</td>
                <td>{payment.cus_name}</td>
                <td>{payment.price.toFixed(2)}</td>
                <td>{payment.status}</td>
                <td>
                <Link to={`/viewSlip/${payment._id}`}>view slip</Link>
                </td>
            </tr>
             ))}
           </tbody>
           
           
        </table>
     </div>
      

    </div>
  )
}
