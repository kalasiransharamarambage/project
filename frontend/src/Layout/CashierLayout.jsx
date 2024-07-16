// src/layouts/CashierLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import CashierNav from '../components/CashierNav/CashierNav';
import AdminFooter from '../components/AdminFooter/AdminFooter';


export default function CashierLayout() {
  return (
    <div className="cashier-layout" style={{}}>
      <CashierNav />
      <div className="content" style={{flex:'1',margin:'0px',width:'100%',minHeight:'80vh'}}>
        <Outlet />
      </div>
      <AdminFooter />
    </div>
  );
}

