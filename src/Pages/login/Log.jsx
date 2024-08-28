import React, { useState } from 'react';
import { FaUserShield } from "react-icons/fa";
import { AiOutlineSwapRight } from "react-icons/ai";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link,useNavigate } from 'react-router-dom';
import "./Log.scss";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';


const Log = () => {

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const notify = () => toast.error('Login failed. Please check your credentials. ');
    const navigate = useNavigate(); 

   const login = async(e) => {
        e.preventDefault();
   
        try {
            const response = await axios.post('http://localhost:3333/api/auth/signin', {
            email,
              password,
            });
            navigate("/"); 
            // Handle the response as needed
          } catch (err) {
            notify();
            console.error(err);
           // setError('Login failed. Please check your credentials and try again.');
          }
         

        };
    
   

    // Email validation
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        const lengthValid = password.length >= 6;
        const uppercaseValid = /[A-Z]/.test(password);
        const lowercaseValid = /[a-z]/.test(password);
        const numberValid = /[0-9]/.test(password);
    
        return lengthValid && uppercaseValid && lowercaseValid && numberValid;
      };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('Invalid email address');
        } else {
            setEmailError('');
        }
    };
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        if (!validatePassword(value)) {
          setPasswordError(
            "Password must be at least 6 characters long, include an uppercase letter, a lowercase letter, and a number"
          );
        } else {
          setPasswordError("");
        }
      };
   
    const handleSubmit = (e) => {
        e.preventDefault();

        // Check final validation before submission
        if ( !emailError &&
            !passwordError &&
            validateEmail(email) &&
            validatePassword(password))  {
            // Handle form submission
            console.log('Form submitted', { email, password});
            
        }
    };


    return (
        
        <div className='loginPage flex'>
            <div className='container flex'>
                <div className='imageDiv'>
                    <div className='mediSideImage' alt=""></div>
                </div>
                  {/*error && <p>{error}</p>*/}
                <div className='formDiv flex'>
                    <div className='headerDiv'>
                        <h3>Welcome Back!</h3>
                    </div>

                    <form className='form grid' onSubmit={login}>
                        <div className='inputDiv'>
                            <div className='input flex'>
                                <FaUserShield className='icon' />
                                <input
                                    type="email"
                                    placeholder='Entrer votre login'
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                />
                            </div>
                            {emailError && <span className='error'>{emailError}</span>}
                        </div>

                        <div className='inputDiv'>
                            <div className='input flex'>
                                <BsFillShieldLockFill className='icon' />
                                <input
                                    type="password"
                                    placeholder='Entrer votre mot de passe'
                                    onChange={handlePasswordChange}
                                    required
                                />
                            </div>
                        </div>

                        <button type='submit' className='btn flex'>
                            Se connecter
                            <AiOutlineSwapRight className='icon' />
                            <Toaster />

                        </button>

                        <div className='footerDiv flex'>
                            <span className='text'>Vous n'avez pas un compte?</span>
                            <Link to='/sign' className='btnSig'>
                                S'inscrire
                            </Link>
                        </div>

                        <span className='forgotPassword'>
                            Vous avez oublié votre mot de passe? <br/>
                            <a href='#3'>Click here</a>
                        </span>
                       
                    </form>
                </div>
            </div>
        </div>
    );
}

  

export default Log;
