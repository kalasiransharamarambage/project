import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import './Report01.css';

const BillingAndAppointmentCount = () => {
  const [billingCount, setBillingCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [totalBilling, setTotalBilling] = useState(0);
  const [billings, setBillings] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const billingCountResponse = await axios.get("http://localhost:3000/billing/count");
        const appointmentCountResponse = await axios.get("http://localhost:3000/appointments/count");
        const totalBillingResponse = await axios.get("http://localhost:3000/billing/sum");
        const billingsResponse = await axios.get("http://localhost:3000/billing");
        const appointmentsResponse = await axios.get("http://localhost:3000/appointments");

        setBillingCount(billingCountResponse.data.count);
        setAppointmentCount(appointmentCountResponse.data.count);
        setTotalBilling(totalBillingResponse.data.totalSum);
        setBillings(billingsResponse.data);
        setAppointments(appointmentsResponse.data.appointments);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById('report');
    
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('report.pdf');
    });
  };

  return (
    <div> 
      <div id="report">
        <h1 className="report_topic">Monthly Report</h1>
        <table className="reporttable">
          <tr>
            <th>Successful Payments</th>
            <td>{billingCount}</td>
          </tr>
          <tr>
            <th>Pending Appointments</th>
            <td>{appointmentCount}</td>
          </tr>
          <tr>
            <th>Total Revenue</th>
            <td>Rs. {totalBilling.toFixed(2)}</td>
          </tr>
        </table>
        
        <div>
          <h2 className="table_topic">Billing Details</h2>
          <table className="reporttable">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Total (Rs:)</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {billings.map((billing) => (
                <tr key={billing._id}>
                  <td>{billing.appointmentId}</td>
                  <td>{billing.total}</td>
                  <td>{billing.discount}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="table_topic">Appointment Details</h2>
          <table className="reporttable">
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Name of the Client</th>
                <th>Name of the Beautician</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment._id}</td>
                  <td>{appointment.cus_name}</td>
                  <td>{appointment.b_name}</td>
                  <td>{appointment.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className="downloadbtn" onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default BillingAndAppointmentCount;
