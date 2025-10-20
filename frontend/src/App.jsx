import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'
import Landing from './Pages/Landing'
import Login from './Pages/Login'
import Prediction from './Pages/Prediction'
import Register from './Pages/Register'
import AllySelection from './Pages/AllySelection'
import HouseSelection from './pages/HouseSelection'
import OpeningScreen from './Pages/OpeningScreen'
import StartGame from './Pages/StartGame'
import StarkGame from './Pages/starksGame/StarkGame'
import LannisterGame from './Pages/LannistersGame/LannisterGame'
import TargaryenGame from './Pages/TargaryenGame/TargaryenGame'
import BaratheonGame from './Pages/BaratheonGame/BaratheonGame'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/register" element={<Register />} />
      <Route path="/allySelection" element={<AllySelection />} />
      <Route path='/houseSelection' element={<HouseSelection/>}/>
      <Route path='/openingScreen' element={<OpeningScreen/>}/>
      <Route path='/startGame' element={<StartGame/>}/>
      <Route path='/starkGame' element={<StarkGame/>}/>
      <Route path='/lannisterGame' element={<LannisterGame/>}/>
      <Route path='/targaryenGame' element={<TargaryenGame/>}/>
      <Route path='/baratheonGame' element={<BaratheonGame/>}/>
    </Routes>
  )
}

export default App
