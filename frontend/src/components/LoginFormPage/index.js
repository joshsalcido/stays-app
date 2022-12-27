import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import './LoginForm.css';
import ReactModal from 'react-modal'

ReactModal.setAppElement('body')

function LoginFormPage({toggleModal}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const [openModal, setOpenModal] = useState(true)
  // const [showLogin, setShowLogin] = useState(false)

  if (sessionUser) return (
    <Redirect to="/user/:id" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors)
        } else {
          toggleModal()
        };
      });
  }
  const demoSubmit = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({credential: "Demo-User", password: "password"}))
    toggleModal()
  }
  const customStyles = {
    overlay: {
        background: 'rgba(0,0,0,0.3)',
      },
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px',
        padding: '0px',
        height: '26rem',
        heightMax: '75rem',
    }
}
// console.log( "TOGGLE MODAL", showLogin)

  return (
    <ReactModal closeTimeoutMS={2000} isOpen={true} style={customStyles} onRequestClose={() => toggleModal()}  shouldCloseOnOverlayClick={true}>
      <form onSubmit={handleSubmit} className="login-form">
        <p style={{fontWeight:'100',fontSize: '25px',float:'right', marginTop:'0px', marginBottom: '287px', marginRight:'0', marginLeft:'310px', padding: '0px',position: 'absolute' , cursor:'pointer'}} onClick={toggleModal}>x</p>
      <h3 className='login-title'>Welcome to stays!</h3>
      <p className='login-subtext'>Log-In to an exsisting account or try out our stays features with our Demo login button!</p>
      <ul className='login-errors' style={{ margin: 'auto', marginBottom: '10px', padding: '0'}}>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <label>
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Log In</button>
      <button onClick={demoSubmit}>Demo</button>
    </form>
    </ReactModal>
  );
}

export default LoginFormPage;
