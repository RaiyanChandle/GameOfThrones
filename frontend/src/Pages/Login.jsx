import React,{useRef} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
const navigate=useNavigate();
const usernameRef=useRef();
const passwordRef=useRef();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response =await axios.post('http://localhost:5000/api/v1/user/login', {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            });
            localStorage.setItem('token', response.data.token);
            navigate('/startGame');
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" ref={usernameRef} />
                <input type="password" placeholder="Password" ref={passwordRef} />
                <button type="submit">Login</button>
            </form>
            Don't have an Account?
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}

export default Login