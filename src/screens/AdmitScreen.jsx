import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdmitPatientMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const AdmitScreen = () => {
  const [ptname, setPtname] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

  const [admitPatient, { isLoading }] = useAdmitPatientMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const email= userInfo.email;
  const submitHandler = async (e) => {
    console.log(userInfo)
    e.preventDefault();
      try {
        const res = await admitPatient({ ptname, age, sex, mobile, address,email }).unwrap();
        toast.success("Patient Details Submitted Successfully");
        setPtname("");
        setAge("");
        setSex("");
        setMobile("");
        setAddress("");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
  };
  return (
    <FormContainer>
      <h1>Admit Patient</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='ptname'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter name'
            value={ptname}
            onChange={(e) => setPtname(e.target.value)}
          required></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='age'>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Age'
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='sex'>
          <Form.Label>Sex</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Sex'
            value={sex}
            onChange={(e) => setSex(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='mobile'>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Mobile Number'
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required></Form.Control>
        </Form.Group>
        {isLoading && <Loader />}
        <Button type='submit' variant='primary' className='mt-3'>
          Register
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdmitScreen;