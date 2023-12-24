import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { usePatientDataMutation } from '../slices/usersApiSlice';


export default function Patients() {
  const [patients, setPatients] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [patientData, { isLoading }] = usePatientDataMutation();
  const email = userInfo.email;

  const fetchData = async () => {
    try {
      const res = await patientData({ email }).unwrap();
      setPatients(res);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setPatients([]); // Reset patients to an empty array in case of error
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Mobile</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.ptname}</td>
                <td>{patient.age}</td>
                <td>{patient.sex}</td>
                <td>{patient.mobile}</td>
                <td>{patient.address}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No patient data available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
