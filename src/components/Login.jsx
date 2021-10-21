import React, { useContext } from 'react';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';

const Login = () => {
    const { user, setUser, isLoggedIn} = useContext(UserContext); 

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
                <h4>Hello {user}!</h4>
                <h5>You are succesfully logged in</h5>
                <button onClick={ () => {
                    setUser(null)
                }
                }>Logout</button>
            </section>
        </RequiresLogin>
        </>
    );
};

export default Login;