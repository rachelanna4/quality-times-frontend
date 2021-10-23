import React, { useContext, useState} from 'react';
import { StarFill, HandThumbsUp, HandThumbsUpFill} from 'react-bootstrap-icons';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 

const StarArticle = ({article_id, star_count}) => {
    const { setUser, isLoggedIn} = useContext(UserContext);
    const [starChange, setStarChange] = useState(false); 
    
    const handleStarChange = () => {
        let currentStarState = starChange
        let voteChange = 0
        voteChange = currentStarState ?  1 : -1
        setStarChange(!starChange)

        api.patchArticleVotes(article_id, voteChange)
        .catch(() => {
           setStarChange(currentStarState)
        });
    }

    return (
        <section className="SingleArticle_columns-leftBottom">
            <p className="ArticleStars">
                <span role="img" aria-label="Number of stars"><StarFill className="ArticleStars ArticleStars_icon" /></span>&nbsp;&nbsp;{star_count + (starChange ? 1 : 0)}
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
                            handleStarChange();
                        }}>
                    <span role="img" aria-label="Thumbs up" className={`StarThumb ${!starChange ? "active" : ""}`} ><HandThumbsUp /></span>
                    <span role="img" aria-label="Thumbs up" className={`StarThumb ${starChange ? "active" : ""}`}><HandThumbsUpFill /></span>
                </button>
            </RequiresLogin>
                    
        </section>
    );
};

export default StarArticle;