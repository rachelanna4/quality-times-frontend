import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <section className="nav">
            <Link to="/">Home</Link>
            <Link to="/articles">Articles </Link>
            <Link to="/post-article">Post Article</Link>
        </section>
    );
};

export default Nav;