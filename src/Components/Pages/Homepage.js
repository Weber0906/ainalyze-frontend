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
          <h4>Stock market analysis using the AI (OpenchatGPT powered)</h4> <br/>
          <p>Free trial version - one stock AI.nalysis per minute available</p>
          <Button as={NavLink} to={'/signup'}>Get Started</Button>
      </div>
      
    </div>
    
  )
}
