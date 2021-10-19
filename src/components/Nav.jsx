import React from 'react';
import { HouseDoor } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';


const Nav = () => {
    return (
        <section className="Nav">
            <Link to="/"><HouseDoor /> Home</Link>
            <Link to="/articles">Articles </Link>
            <Link to="/post-article">Post Article</Link>
        </section>
    );
};

export default Nav;