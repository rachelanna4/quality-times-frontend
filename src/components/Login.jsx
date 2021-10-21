import React, { useContext } from 'react';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';

const Login = () => {
    const { setUser, isLoggedIn} = useContext(UserContext); 

    return (
        <>
        <RequiresGuest isLoggedIn={isLoggedIn}>
            <section className="Login">
                <h4>Click the button below to login</h4>
                <button onClick={ () => {
                    setUser("jessjelly")
                }
                }>Login</button>
            </section>
        </RequiresGuest>
        <RequiresLogin isLoggedIn={isLoggedIn}>
            <section className="Login">
                <p>Succesfully logged in</p>
            </section>
        </RequiresLogin>
        </>
    );
};

export default Login;