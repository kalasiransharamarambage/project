import React, { useState, useEffect } from 'react'; // Ensure useState and useEffect are imported
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import '../CashierSchedule/cashierschedule.css';

export default function CashierSchedule() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/appointments') // Adjust the URL if necessary
      .then(response => {
        setAppointments(response.data.appointments);
      })
      .catch(error => {
        console.error('There was an error fetching the appointments!', error);
      });
  }, []);


  return (
    <div>
      <div className='sc_topicBox'>
        <p>Schedule</p>
        <Link to="/Report01">
                <button className='reportbtn'>Appointment report</button>
</Link>
      </div>
      <div>
        <Table striped bordered hover className="rounded-scheduletable">
          <thead>
            <tr className='schedule_tr'>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Services</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id} className='schedule_tr'>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.b_name}</td>
                <td>{appointment.services}</td>
                <td><Link to={`/booking/${appointment._id}`}>view</Link></td>              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
