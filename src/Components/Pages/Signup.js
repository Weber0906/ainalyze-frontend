import React, {useRef, useState} from 'react';
import {Form, Button, Card, Alert} from "react-bootstrap";
import { useAuth } from '../../contexts/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import Particle from '../Particles';

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const {signInWithGoogle} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }
  async function handleSubmitGoogle(e) {
    e.preventDefault()
    try {
      setError("")
      setLoading(true)
      await signInWithGoogle()
      navigate("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
    <Particle />
      <Card className='w-50 text-center mx-auto'>
        <Card.Body >
          <h2 className='text-center mb-4'>Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id='email'>
              <Form.Label>Email</Form.Label>
                <Form.Control type='email' ref={emailRef} required />
            </Form.Group>
            <Form.Group id='password'>
              <Form.Label>Password</Form.Label>
                <Form.Control type='password' ref={passwordRef} required />
            </Form.Group>
            <Form.Group id='password-confirm'>
              <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className='w-50 mt-2' type='submit'>Sign Up</Button>
          </Form>
          <Button onClick={handleSubmitGoogle} disabled={loading} className='w-50 mt-2' type='submit'>Sign Up With Google</Button>
        </Card.Body>
      </Card>
      <div className='w-50 text-center mx-auto mt-2'>
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
    
  )
}
