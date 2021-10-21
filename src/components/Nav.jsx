import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { HouseDoor, BoxArrowInRight, PersonFill, Person } from 'react-bootstrap-icons';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';


const Navigation = () => {
    const { user, isLoggedIn} = useContext(UserContext); 

    return (
        <Navbar bg="light" expand="md" className="Nav">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto Nav_links">
                    <Link to="/">
                        <span role="img" aria-label="Home Icon"><HouseDoor /></span> 
                        &nbsp;&nbsp;Home
                    </Link>
                    <Link to="/articles">Articles</Link>
                    <Link to="/post-article">Post Article</Link>
                    
                    <Link to="/login">
                        <RequiresGuest isLoggedIn={isLoggedIn}>
                            <span role="img" aria-label="Login Icon"><BoxArrowInRight /></span> 
                                &nbsp;&nbsp;Login
                        </RequiresGuest>
                        <RequiresLogin isLoggedIn={isLoggedIn}>
                        <span role="img" aria-label="User Icon"><PersonFill /></span> 
                        &nbsp;&nbsp;{user}</RequiresLogin>
                    </Link>
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