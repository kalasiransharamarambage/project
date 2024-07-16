import React from 'react';
import './salary.css';
import Table from 'react-bootstrap/Table';

const salaries = [
  { name: 'W.H.Nimali', month: 'January', basic: 60000, bonus: 30000, leaves: 2, reduction: 0 },
  { name: 'W.H.Nimali', month: 'February', basic: 60000, bonus: 30000, leaves: 0, reduction: 0 },
  { name: 'W.H.Nimali', month: 'March', basic: 60000, bonus: 30000, leaves: 3, reduction: 0 },
  { name: 'W.H.Nimali', month: 'April', basic: 60000, bonus: 30000, leaves: 1, reduction: 0 },
  { name: 'W.H.Nimali', month: 'June', basic: 60000, bonus: 30000, leaves: 2, reduction: 0 },
  { name: 'W.H.Nimali', month: 'July', basic: 60000, bonus: 30000, leaves: 0, reduction: 0 }
];

const calculateSalary = (basic, bonus, leaves, reduction) => {
  const leaveDeduction = leaves * 2000;
  return basic + bonus - leaveDeduction - reduction;
};

export default function Salary() {
  return (
    <div>
      <div className='topicBox'>
        <p>Salary</p>
      </div>
      <div>
        <Table striped bordered hover className="rounded-saltable">
          <thead>
            <tr className='saltr'>
              <th>Name</th>
              <th>Month</th>
              <th>Basic (Rs.)</th>
              <th>Bonus (Rs.)</th>
              <th>Leaves</th>
              <th>Reduction</th>
              <th>Salary (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            {salaries.map((salary, index) => (
              <tr key={index} className='saltr'>
                <td>{salary.name}</td>
                <td>{salary.month}</td>
                <td>{salary.basic.toLocaleString()}</td>
                <td>{salary.bonus.toLocaleString()}</td>
                <td>{salary.leaves}</td>
                <td>{salary.reduction.toLocaleString()}</td>
                <td>{calculateSalary(salary.basic, salary.bonus, salary.leaves, salary.reduction).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
