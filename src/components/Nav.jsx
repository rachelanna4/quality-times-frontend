import React from 'react';
import { HouseDoor, BoxArrowInRight } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import { Link } from 'react-router-dom';


const Navigation = () => {

    return (
        <Navbar bg="light" expand="md" className="Nav">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto Nav_links">
                    <Nav.Link href="/">
                        <span role="img" aria-label="Home Icon"><HouseDoor /></span> 
                        &nbsp;&nbsp;Home
                    </Nav.Link>
                    <Nav.Link href="/articles">Articles</Nav.Link>
                    <Nav.Link href="/post-article">Post Article</Nav.Link>
                    <Nav.Link href="/login">
                    <span role="img" aria-label="Login Icon"><BoxArrowInRight /></span> 
                        &nbsp;&nbsp;Login
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
        </Navbar>
    )





    //     <section className="Nav">
    //         <section className="Nav_links">
    //         <Link to="/"><span role="img" aria-label="Home Icon"><HouseDoor /></span> Home</Link>
    //         <Link to="/articles">Articles </Link>
    //         <Link to="/post-article">Post Article</Link>
    //         </section>
    //     </section>
    // );
};

export default Navigation;