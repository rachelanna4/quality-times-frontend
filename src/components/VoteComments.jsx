import React, { useContext, useState} from 'react';
import { HeartFill, HandThumbsUp, HandThumbsUpFill, HandThumbsDown, HandThumbsDownFill} from 'react-bootstrap-icons';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 

const VoteComments = ({comment_id, comment_author, votes}) => {
    const { user,setUser, isLoggedIn} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [positiveVoteChange, setPositiveVoteChange] = useState(false); 
    const [negativeVoteChange, setNegativeVoteChange] = useState(false); 
    
    const handleVoteChange = (direction) => {
        setIsLoading(true); 

        const currentPositiveVoteState = positiveVoteChange;
        const currentNegativeVoteState = negativeVoteChange;

        let requestChange = 0;

        if (direction === "positive") {
            requestChange = currentPositiveVoteState ?  -1 : 1;
            setPositiveVoteChange(!positiveVoteChange)
        } 

        if (direction === "negative") {
            requestChange = currentNegativeVoteState ?  1 : -1;
            setNegativeVoteChange(!negativeVoteChange)
        }
        

        api.patchCommentVotes(comment_id, requestChange)
        .catch(() => {
           setPositiveVoteChange(currentPositiveVoteState)
           setNegativeVoteChange(currentNegativeVoteState)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <section className="Votes_container">
            <section>
                <p className="CommentVotes">
                    <span role="img" aria-label="Number of likes"><HeartFill className={`${votes > 0 ? "RedHeart" : "BlackHeart"}`} /></span>&nbsp;&nbsp;{votes + (positiveVoteChange ? 1 : 0) + (negativeVoteChange ? -1 : 0)}
                </p>
            </section>
            <RequiresGuest isLoggedIn={isLoggedIn}>
                <button className="VoteLoginButton" 
                        onClick={ () => {
                        setUser("jessjelly")
                    }
                    }>Login to vote</button>
            </RequiresGuest>
            {(user !== comment_author) && (
            <RequiresLogin isLoggedIn={isLoggedIn}>
                    <section>
                        <button className="ThumbUpButton" 
                                    disabled={isLoading || negativeVoteChange}
                                    onClick={ () => {
                                    handleVoteChange("positive");
                                }}>
                            <span role="img" aria-label="Thumbs up" className={`ThumbUp ${!positiveVoteChange ? "active" : ""}`} ><HandThumbsUp /></span>
                            <span role="img" aria-label="Thumbs up" className={`ThumbUp ${positiveVoteChange ? "active" : ""}`}><HandThumbsUpFill /></span>
                        </button>
                        <button className="ThumbDownButton" 
                                    disabled={isLoading || positiveVoteChange}
                                    onClick={ () => {
                                    handleVoteChange("negative");
                                }}>
                            <span role="img" aria-label="Thumbs down" className={`ThumbDown ${!negativeVoteChange ? "active" : ""}`}><HandThumbsDown /></span>
                            <span role="img" aria-label="Thumbs down" className={`ThumbDown ${negativeVoteChange ? "active" : ""}`}><HandThumbsDownFill /></span>
                        </button>
                    </section>
            </RequiresLogin>
            )}
        </section>
    );
};

export default VoteComments;