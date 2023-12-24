import { Container, Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useAllPatientsMutation, useDeletePatientMutation ,useUpdatePatientMutation} from '../slices/usersApiSlice';
import React, { useState, useEffect } from 'react';


const Hero = () => {
  const [patients, setPatients] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);
  const [allPatients, { isLoading }] = useAllPatientsMutation();
  const [deletePatient] = useDeletePatientMutation();
  const [updatePatient] = useUpdatePatientMutation();
  const [state, setState] = useState(true);
  const [editableRow, setEditableRow] = useState(null);

  const fetchData = async () => {
    try {
      const res = await allPatients().unwrap();
      setPatients(res);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      setPatients([]);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [state]);

  const [ptname,setPtname] = useState("");
  const [age,setAge] = useState("");
  const [sex,setSex] = useState("");
  const [mobile,setMobile] = useState("");
  const [address,setAddress] = useState("");
  
  const handleDelete = async (id) => {
    try {
      await deletePatient({ id });
      setState(!state);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const handleEdit = (id) => {
    setEditableRow(id);
  
  };

  const handleSave = async (id) => {
    try {
      const patientToUpdate = patients.find((patient) => patient._id === id);
      const response = await updatePatient({
        id,
        ptname,
        age,
        sex,
        mobile,
        address
      });

      if (response.error) {
        console.error(response.error);
      } else {
        toast.success("Patient Details Updated Successfully");
        setEditableRow(null);
        setState(!state);
        fetchData(); // Fetch updated data after successful update
      }
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };
  

  const handleNameChange = (newValue, id) => {
    const updatedPatients = patients.map((patient) => {
      if (patient._id === id) {
        return { ...patient, ptname: newValue };
      }
      return patient;
    });

    setPatients(updatedPatients);
    setPtname(newValue);
  };

  const handleAgeChange = (newValue, id) => {
    const updatedPatients = patients.map((patient) => {
      if (patient._id === id) {
        return { ...patient, age: newValue };
      }
      return patient;
    });

    setPatients(updatedPatients);
    setAge(newValue); // Update state for age
  };

  const handleSexChange = (newValue, id) => {
    const updatedPatients = patients.map((patient) => {
      if (patient._id === id) {
        return { ...patient, sex: newValue };
      }
      return patient;
    });

    setPatients(updatedPatients);
    setSex(newValue); // Update state for sex
  };

  const handleMobileChange = (newValue, id) => {
    const updatedPatients = patients.map((patient) => {
      if (patient._id === id) {
        return { ...patient, mobile: newValue };
      }
      return patient;
    });

    setPatients(updatedPatients);
    setMobile(newValue); // Update state for mobile
  };

  const handleAddressChange = (newValue, id) => {
    const updatedPatients = patients.map((patient) => {
      if (patient._id === id) {
        return { ...patient, address: newValue };
      }
      return patient;
    });

    setPatients(updatedPatients);
    setAddress(newValue); // Update state for address
  };



  return (
    <div className=' py-5' style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
      {userInfo ? (
        userInfo.role ? (
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
                    <td>
                      {editableRow === patient._id ? (
                        <input
                          type="text"
                          value={patient.ptname}
                          onChange={(e) =>handleNameChange(e.target.value, patient._id)}
                        />
                      ) : (
                        patient.ptname
                      )}
                    </td>
                    <td>
                      {editableRow === patient._id ? (
                        <input
                          type="text"
                          value={patient.age}
                          onChange={(e) => handleAgeChange(e.target.value, patient._id)} // Add handler for age change
                        />
                      ) : (
                        patient.age
                      )}
                    </td>
                    <td>
                      {editableRow === patient._id ? (
                        <input
                          type="text"
                          value={patient.sex}
                          onChange={(e) => handleSexChange(e.target.value, patient._id)} // Add handler for sex change
                        />
                      ) : (
                        patient.sex
                      )}
                    </td>
                    <td>
                      {editableRow === patient._id ? (
                        <input
                          type="text"
                          value={patient.mobile}
                          onChange={(e) => handleMobileChange(e.target.value, patient._id)} // Add handler for mobile change
                        />
                      ) : (
                        patient.mobile
                      )}
                    </td>
                    <td>
                      {editableRow === patient._id ? (
                        <input
                          type="text"
                          value={patient.address}
                          onChange={(e) => handleAddressChange(e.target.value, patient._id)} // Add handler for address change
                        />
                      ) : (
                        patient.address
                      )}
                    </td>
                    <td>
                      {editableRow === patient._id ? (
                        <>
                          <td><Button variant="success" onClick={() => handleSave(patient._id)}>Save</Button></td>
                        <td>  <Button  variant="info" onClick={() => setEditableRow(null)}>Cancel</Button></td>
                        </>
                      ) : (
                        <Button onClick={() => handleEdit(patient._id,patient)}>Edit</Button>
                      )}

                    </td>
                    <td>
                    <ButtonToolbar aria-label="Toolbar with button groups">
                        <ButtonGroup className="me-2" aria-label="Third group">
                          <Button variant="danger" onClick={() => handleDelete(patient._id)}>Delete</Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No patient data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        ) : (
          <Container className='d-flex justify-content-center' style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
            <Card className='p-5 d-flex flex-column align-items-center hero-card ' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
              <h1 className='text-center mb-4'>Welcome to Vedha Hospitals</h1>
              <h2>Logged In</h2>
            </Card>
          </Container>
        )
      ) : (
        <Container className='d-flex justify-content-center' style={{ backgroundColor: 'rgba(0,0,0,0)' }}>
          <Card className='p-5 d-flex flex-column align-items-center hero-card ' style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
            <h1 className='text-center mb-4'>Welcome to Vedha Hospitals</h1>
            <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Sign In
            </Button>
            <Button variant='secondary' href='/register'>
              Register
            </Button>
          </div>
          </Card>
        </Container>
      )}
    </div>
  );
};

export default Hero;
