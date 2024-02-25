
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import axios from 'axios';
import "../styles/AddPassenger.css"
import Validation from '../valid/loginValid';

function UserLogin() {
  const [values, setValues] = useState({
      email: '',
      password: ''
  }
  );
  const click1 = () => {
    navigate('/add-passenger');
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState([]);

  const handleInput = (event) => {
      setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      const err = Validation(values);
      setErrors(err);

      if (err.email === '' && err.password === '') {
          axios
              .post('api/v1/user/user-login', values)
              .then((res) => {
                  if (res.data.errors) {
                      setBackendError(res.data.errors);
                  } else {
                      setBackendError([]);
                      if (res.data === 'Success') {
                          navigate('/home');
                      } else {
                          alert('No record existed');
                      }
                  }
              })
              .catch((err) => console.log(err));
      }
  };

  return (
      <div className='d-flex justify-content-center align-items-center'>
          <div className='bg-white p-3 rounded w-25'>
              <h2>LOG IN</h2>
              {backendError.length > 0 &&
                  backendError.map((e, index) => (
                      <p key={index} className='text-danger'>
                          {e.msg}
                      </p>
                  ))}
              <form action='' onSubmit={handleSubmit}>
                  <div className='mb-3'>
                      <label htmlFor='email'>
                          <strong>Email</strong>
                      </label>
                      <input
                          type='email'
                          placeholder='Enter Email'
                          name='email'
                          onChange={handleInput}
                          className='form-control rounded-0'
                      />
                      {errors.email && <span className='text-danger'>{errors.email}</span>}
                  </div>
                  <div className='mb-3'>
                      <label htmlFor='password'>
                          <strong>Password</strong>
                      </label>
                      <input
                          type='password'
                          placeholder='Enter Password'
                          name='password'
                          onChange={handleInput}
                          className='form-control rounded-0'
                      />
                      {errors.password && <span className='text-danger'>{errors.password}</span>}
                  </div>
                  < Link to ='/train-ctrl'button type='submit' className='btn btn-success w-100 rounded-0'>
                      Log in
                      </Link>

                  <p>You agree to our terms and policies</p>
                  <Button className="custom-button"onClick={click1}>Create Account</Button>
              </form>
          </div>
      </div>
  );
}

export default UserLogin;