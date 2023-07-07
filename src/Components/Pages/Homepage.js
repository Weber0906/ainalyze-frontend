import React from 'react'
import Background from '../Particles'
import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'



export default function Homepage() {
  return (
    <div>
      <Background />

      <div id='main-logo' ></div>
      <div>
          <p>Stock market analysis using the AI (OpenchatGPT powered)</p>
          <Button as={NavLink} to={'/signup'}>Get Started</Button>
      </div>
      
    </div>
    
  )
}
