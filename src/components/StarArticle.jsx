import React, { useContext, useState, useEffect } from 'react';
import { StarFill, HandThumbsUp, HandThumbsUpFill} from 'react-bootstrap-icons';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 

const StarArticle = ({article_id, star_count}) => {
    const { setUser, isLoggedIn} = useContext(UserContext);
    const [clickCount, setClickCount] = useState(0); 
    const [starChange, setStarChange] = useState(""); 
    

    useEffect(() => {
        let requestStarChange = ""
       if (clickCount > 0 && clickCount % 2 === 0) {
            requestStarChange = -1;
            setStarChange(0)
       } else if (clickCount > 0 && clickCount % 2 !== 0) {
            requestStarChange = 1;
            setStarChange(1)
       }
       api.patchArticleVotes(article_id, requestStarChange)
    }, [clickCount, article_id])

    return (
        <section className="SingleArticle_columns-leftBottom">
            <p className="ArticleStars">
                <span role="img" aria-label="Number of stars"><StarFill className="ArticleStars ArticleStars_icon" /></span>&nbsp;&nbsp;{star_count + starChange}
            </p>
            <RequiresGuest isLoggedIn={isLoggedIn}>
                <button className="StarLoginButton" 
                        onClick={ () => {
                        setUser("jessjelly")
                    }
                    }>Login to star</button>
            </RequiresGuest>
            <RequiresLogin isLoggedIn={isLoggedIn}>
                <button className="StarButton" 
                            onClick={ () => {
                            setClickCount((clickCount) => clickCount += 1) 
                        }}>
                    <span role="img" aria-label="Thumbs up" className={`StarThumb ${clickCount % 2 === 0 ? "active" : ""}`} ><HandThumbsUp /></span>
                    <span role="img" aria-label="Thumbs up" className={`StarThumb ${clickCount % 2 !== 0 ? "active" : ""}`}><HandThumbsUpFill /></span>
                </button>
            </RequiresLogin>
                    
        </section>
    );
};

export default StarArticle;