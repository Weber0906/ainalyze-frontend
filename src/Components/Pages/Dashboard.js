import React, {useState} from "react";
import {Card, Button, Alert} from 'react-bootstrap';
import { useAuth } from "../../contexts/AuthContext";
import {Link, useNavigate} from 'react-router-dom';
import Particle from "../Particles";

export default function Dashboard() {
    const [error, setError] = useState('')
    const {currentUser, logout} = useAuth()
    const navigate = useNavigate()

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
        <Particle />
            <Card id="profile" className='w-50 text-center mx-auto'>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {currentUser && (
                        <>
                            <strong>Email:</strong> {currentUser.email} <br/>
                            <strong>Name:</strong> {currentUser.displayName} 

                            <Link to='/update-profile' className="btn btn-primary w-100 mt-3">
                                Update Profile
                            </Link>
                        </>
                    )}
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Button variant='link' onClick={handleLogout}>
                    Log Out
                </Button>
            </div>
        </>
    );
}