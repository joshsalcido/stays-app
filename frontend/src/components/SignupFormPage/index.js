import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import ReactModal from "react-modal";

ReactModal.setAppElement('body')

function SignupFormPage({toggleModalSignUp}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors)
          } else {
            toggleModalSignUp()
          };
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  const demoSubmit = async (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({credential: "Demo-User", password: "password"}))
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
        height: '32rem',

    }
}

  return (
    <ReactModal isOpen={true} style={customStyles} onRequestClose={() => toggleModalSignUp()}  shouldCloseOnOverlayClick={true}>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <ul className="errors">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
        <Link class="guestLink" onClick={demoSubmit}>Log in as Guest</Link>
      </form>
    </ReactModal>
  );
}

export default SignupFormPage;
