import React, { useContext, useState} from 'react';
import { StarFill, HandThumbsUp, HandThumbsUpFill} from 'react-bootstrap-icons';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 

const VoteComments = ({comment_id, votes}) => {
    const { setUser, isLoggedIn} = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [voteChange, setVoteChange] = useState(false); 
    
    const handleVoteChange = () => {
        setIsLoading(true); 

        let currentVoteState = voteChange;
        let requestChange = 0;
        requestChange = currentVoteState ?  -1 : 1;
        setVoteChange(!voteChange)

        api.patchCommentVotes(comment_id, requestChange)
        .catch(() => {
           setVoteChange(currentVoteState)
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <section className="Votes_container">
            <section>
                <p className="CommentVotes">
                    <span role="img" aria-label="Number of stars"><StarFill className="CommentVotes_icon" /></span>&nbsp;&nbsp;{votes + (voteChange ? 1 : 0)}
                </p>
            </section>
            <RequiresGuest isLoggedIn={isLoggedIn}>
                <button className="VoteLoginButton" 
                        onClick={ () => {
                        setUser("jessjelly")
                    }
                    }>Login to vote</button>
            </RequiresGuest>
            <RequiresLogin isLoggedIn={isLoggedIn}>
                <button className="ThumbUpButton" 
                            disabled={isLoading}
                            onClick={ () => {
                            handleVoteChange();
                        }}>
                    <span role="img" aria-label="Thumbs up" className={`ThumbUp ${!voteChange ? "active" : ""}`} ><HandThumbsUp /></span>
                    <span role="img" aria-label="Thumbs up" className={`ThumbUp ${voteChange ? "active" : ""}`}><HandThumbsUpFill /></span>
                </button>
            </RequiresLogin>
        </section>
    );
};

export default VoteComments;