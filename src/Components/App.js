import React from "react"
import Signup from "./Pages/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard.js"
import Login from "./Pages/Login.js"
import ForgotPassword from "./Pages/ForgotPassword.js"
import UpdateProfile from "./Pages/UpdateProfile.js"
import Exchanges from "./Pages/Exchanges.js"
import Stocks from "./Pages/Stocks.js"
import Navbar from "./Partials/Navbar.js"
import Homepage from "./Pages/Homepage.js"
import Analysis from "./Pages/Ainalyze.js"
import '../static/App.css'

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
