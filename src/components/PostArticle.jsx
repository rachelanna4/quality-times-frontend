import React, { useContext, useState } from 'react';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 

const PostArticle = () => {
    const { user, setUser, isLoggedIn} = useContext(UserContext); 
    
    return (
        <>
        <RequiresGuest isLoggedIn={isLoggedIn}>
            <section className="PostArticleLogin">
                <h4>Please login to post your article</h4>
                <button onClick={ () => {
                    setUser("jessjelly")
                }
                }>Login</button>
            </section>
        </RequiresGuest>
        <RequiresLogin isLoggedIn={isLoggedIn}>
            <section className="PostArticleForm-container">
        
            </section>
        </RequiresLogin>
        </>
    );
};

export default PostArticle;