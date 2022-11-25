import React, { Component } from 'react'
import {Container,Nav,Navbar,NavDropdown} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Bisection from './Bisection';
import CramerRule from './CramerRule';
import False_position from './False_position';
import GaussElimination from './GaussElimination';
import Home from './Home';
import Jacobi from './jacobi';
import Lagrange from './lagrange';
import NewtonRaphson from './newton';
import Newtoninterpolation from './newtoninterpolation';
import Secant from './secant';
import Seidel from './seidel';


export default class NavbarComp extends Component {
  render() {
    return (
        <Router>
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to={"\Home"}>Numberical Methods Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="Numberical Methods Project" />
          <Navbar.Collapse id="Numberical Methods Project">
            <Nav 
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '400px' }}
              navbarScroll
            >
              <NavDropdown title="Root of Equation" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to={"\Bisection"}>Bisection</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"\False_position"}>False position</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"\Newton"}>Newton Raphson</NavDropdown.Item>
                {/* <NavDropdown.Item as={Link} to={"\Secant"}>Secant Methods</NavDropdown.Item> */}
              </NavDropdown>
              <NavDropdown title="Linear Algebra" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to={"\Cramer_Rule"}>Cramer's Rule</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"\Gauss_Eli"}>Gauss's Elimination</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"\Jacobi"}>Gauss's Jacobi</NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"\gaussseidel"}>Gauss's Seidel</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Interpolation" id="navbarScrollingDropdown">
                {/* <NavDropdown.Item as={Link} to={"\NewtonInterpolation"}>Newton Divide Difference</NavDropdown.Item> */}
                <NavDropdown.Item as={Link} to={"\LagrangeInterpolation"}>Lagrange</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
            <Route path="/Home" element={<Home/>} />
            <Route path="/Bisection" element={<Bisection/>} />
            <Route path="/False_position" element={<False_position/>} />
            <Route path="/Newton" element={<NewtonRaphson/>} />
            <Route path="/Secant" element={<Secant/>} />

            <Route path="/Cramer_Rule" element={<CramerRule/>} />
            <Route path="/Gauss_Eli" element={<GaussElimination/>} />
            <Route path="/Jacobi" element={<Jacobi/>} />
            <Route path="/gaussseidel" element={<Seidel/>} />

            <Route path ="/NewtonInterpolation" element={<Newtoninterpolation/>} />
            <Route path ="/LagrangeInterpolation" element={<Lagrange/>} />
        </Routes>
      </Router>
      

    )
  }
}
