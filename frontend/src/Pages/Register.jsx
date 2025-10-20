import React,{useRef}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate();

    const usernameRef=useRef();
    const passwordRef=useRef();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/v1/user/register', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            });
            localStorage.setItem('token', response.data.token);
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={usernameRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <button type="submit">Register</button>
            </form>
            Already have an Account?
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}

export default Register