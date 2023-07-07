import React from "react"
import Signup from "./Pages/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import Login from "./Pages/Login"
import ForgotPassword from "./Pages/ForgotPassword"
import UpdateProfile from "./Pages/UpdateProfile"
import Exchanges from "./Pages/Exchanges"
import Stocks from "./Pages/Stocks"
import Navbar from "./Partials/Navbar"
import Homepage from "./Pages/Homepage"
import Analysis from "./Pages/Ainalyze"
import './Partials/Navbar.css'
import './Pages/Homepage.css'
import './Pages/Ainalize.css'

function App() {

  return (
    <Router>
      <AuthProvider>
        <Navbar/>
        <Container
          className="d-flex align-items-center justify-content-center mt-5"
          style={{ minHeight: '100vh', minWidth: '100vw' }}
        >
          <div className="w-100 text-center">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="/stocks/:exchangeId" element={<Stocks />} />
              <Route path="/profile" element={<Dashboard />} />
              <Route path="/ainalyze/:act_symbol" element={<Analysis />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </Container>
      </AuthProvider>
    </Router>
  );
  }

export default App
