import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './cashondelivery.css'

export default function CashOnDelivery() {

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {

        const response = await axios.get('http://localhost:3000/confirmed-payments');
        setPayments(response.data);
              
      } catch (error) {
        console.error('Error fetching confirmed payments:', error);
      }
    };

    fetchPayments();
  }, []);

   const totalIncome = payments.reduce((sum, payment) => sum + payment.price, 0);


  return (
    <div>
         <div className='topicBox'>
        <p>Cash On Delivery</p>
     </div>
     <div>
        <table className='cashtable'>
          <thead>  <tr className='firstrow'>
                <th style={{ borderTopLeftRadius:'15px' }}>Order ID</th>
                <th>Buyer Name</th>
                <th style={{ borderTopRightRadius:'15px' }}>Income(Rs:)</th>
            </tr></thead>
          
            <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className='middlerow'>
                
                <td>{payment._id}</td>
                <td>{payment.cus_name}</td>
                <td>{payment.price.toFixed(2)}</td>
              </tr>
            ))}
            <tr className='lastrow' style={{borderTop:'1px solid black'}}>
              <td style={{ borderBottomLeftRadius:'15px' }}>Total</td>
              <td></td>
              <td style={{ borderBottomRightRadius:'15px' }}>{totalIncome.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
     </div>
      
    </div>
  )
}
