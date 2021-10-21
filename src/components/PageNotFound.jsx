import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {

    return (
            <section className="PageNotFound">
               <h4>Page not found</h4>
                <h5>Click the button below to return to the homepage</h5>

                <button>
                    <Link to="/">
                        Go home
                    </Link>
                </button>
            </section>
    );
};

export default PageNotFound;