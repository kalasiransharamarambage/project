import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CashierSchedule/cashierschedule.css';
import Beauticians from './../Beauticians/Beauticians';

export default function CashierSchedule() {
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/appointments')
      .then(response => {
        setAppointments(response.data.appointments);
      })
      .catch(error => {
        console.error('There was an error fetching the appointments!', error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredAppointments = appointments.filter(appointment => 
    appointment.date.includes(searchQuery) || 
    appointment.time.includes(searchQuery) || 
    appointment.b_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    appointment.services.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className='sc_topicBox'>
        <p>Schedule</p>
        <Link to="/Report01">
          <button className='reportbtn'>Appointment report</button>
        </Link>
      </div>
      <div className='search-bar-container'>
        <input 
          type="text" 
          placeholder="🔍  Search appointments..." 
          value={searchQuery} 
          onChange={handleSearchChange} 
          className='cashier-search-bar'
        />
      </div>
      <div>
        <Table striped bordered hover className="rounded-scheduletable">
          <thead>
            <tr className='schedule_tr'>
              <th>Date</th>
              <th>Time</th>
              <th>Beautician's Name</th>
              <th>Customer's name</th>
              <th>Services</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment._id} className='schedule_tr'>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.b_name}</td>
                <td>{appointment.cus_name}</td>
                <td>{appointment.services}</td>
                <td><Link to={`/booking/${appointment._id}`}>view</Link></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
