import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "../BookingDetails/bookingDetails.css";

export default function BookingDetail() {
 
  const [appointment, setAppointment] = useState({});
  const [services, setServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/appointments/${id}`)
      .then((response) => {
        setAppointment(response.data.appointment);
        setTotal(response.data.appointment.Total_price);
        setLoading(false); // Set loading to false after data is fetched
       
      })
      .catch((error) => {
        console.error("There was an error fetching the appointment!", error);
        setLoading(false); // Set loading to false even if there's an error
        
      });
  }, [id]);

  const serviceOptions = [
    { name: "Facial cleanup", price: 1200 },
    { name: "Service 02", price: 1500 },
    { name: "Service 03", price: 1800 },
  ];

  const handleSelectService = (service) => {
    const newServices = [...services, service];
    const Total = (appointment.Total_price);
    const newTotal = newServices.reduce((sum, s) => sum + s.price,0);
    const totalWithAppointmentPrice = newTotal +Total ;
   console.log(newTotal);
   console.log(Total);
   console.log(totalWithAppointmentPrice);

    setServices(newServices);
    setTotal(totalWithAppointmentPrice);
  };

  

  const handleRemoveService = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    const newTotal = newServices.reduce((sum, s) => sum + s.price, 0);
    const Total = appointment.Total_price;
    const totalWithAppointmentPrice = newTotal +Total ;
    setServices(newServices);
    setTotal(totalWithAppointmentPrice);
  };

  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value) || 0;
    setDiscount(discountValue);
  };

  const calculateTotalWithDiscount = () => {
    const discountedTotal = total - (total * discount) / 100  ;
    return discountedTotal;
  };

  const handlePayment = () => {
    const billingDetails = {
      appointmentId: appointment._id,
      booked_services:appointment.services,
      services: services ,
      total: calculateTotalWithDiscount(),
      paymentStatus: "Payment Completed",
      discount: discount,
    };

    axios
      .post("http://localhost:3000/billing", billingDetails)
      .then((response) => {
        console.log("Billing details saved successfully:", response.data);
        setPaymentStatus("Payment Completed");
        setIsPaid(true);

        return axios.delete(`http://localhost:3000/appointments/${id}`);

      })
      .then(() => {
        alert("Appointment deleted successfully");
        setAppointment(null);
      })
      .catch((error) => {
        console.error("There was an error saving the billing details:", error);
      });

      
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  

  return (
    <div>
      <div className="topicBox">
        <p>Booking Details</p>
      </div>

      <div className="content">
        <div className="table01">
          <table>
          
            <thead>
              <tr className="Bookingtr">
                <th>ID</th>
                <th>Name</th>
                <th>Services</th>
                <th>Total Price (Rs:)</th>
              </tr>
            </thead>

            <tbody>
              <tr className="Bookingtr">
                
                
                  <td>{appointment._id}</td>
                <td>{appointment.cus_name}</td>
                <td>{appointment.services}</td>
                 
                  <td>{appointment.Total_price}</td> 
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <div className="button-container">
            <Dropdown className="drop">
              <Dropdown.Toggle
                id="dropdown-basic"
                className="servicedropdown"
                disabled={isPaid}
              >
                Add Service
              </Dropdown.Toggle>
              <Dropdown.Menu className="Menu">
                {serviceOptions.map((service, index) => (
                  <Dropdown.Item
                    key={index}
                    onClick={() => handleSelectService(service)}
                    className="Item"
                  >
                    {service.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="table02">
            <table>
             <p> <b>Billing Details</b></p>
              <tbody>
                <tr>
                  <td>{appointment.services}</td>
                  <td>{appointment.Total_price}</td>
                </tr>
                {services.map((service, index) => (
                  <tr className="t2tr" key={index}>
                    
                    <td>{service.name}</td>
                    <td>{service.price.toFixed(2)}</td>
                    <td>
                      <button
                        className="remove"
                        onClick={() => handleRemoveService(index)}
                        disabled={isPaid}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="t2tr">
                  <td>Discount (%)</td>
                  <td>
                    <input
                      type="number"
                      value={discount}
                      onChange={handleDiscountChange}
                      className="discount-input"
                      disabled={isPaid}
                    />
                  </td>
                </tr>
                <tr className="t2tr">
                  <td>Total</td>
                  <td>{calculateTotalWithDiscount().toFixed(2)}</td>
                </tr>
                <tr className="t2tr">
                  <td>Payment Status</td>
                  <td>{paymentStatus}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="Paybutton-container">
            <button
              onClick={handlePayment}
              className="payment-button"
              disabled={isPaid}
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
