import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>GAME OF THRONES</h1>
            <h2>do you have what it takes to survive?</h2>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}

export default Landing;