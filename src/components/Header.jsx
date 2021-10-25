import React from 'react';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <section className="Header">
            <Link to="/" className="Header_link">
            <h1>The Quality Times</h1>
            <p>Bringing you the latest positive and inspiring news from around the globe</p>
            </Link>
        </section>
    );
};

export default Header;