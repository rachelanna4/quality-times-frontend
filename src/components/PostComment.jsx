import React, { useContext, useState } from 'react';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 
import PulseLoader from "react-spinners/PulseLoader"
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'


const PostComment = ({article_id, handlePostedComment}) => {
    const { user, setUser, isLoggedIn} = useContext(UserContext); 
    const [isPosting, setIsPosting] = useState(false);
    const [commentInput, setCommentInput] = useState(""); 
    const [isPostCommentError, setIsPostCommentError] = useState(false); 
    const [isCommentPosted, setIsCommentPosted] = useState(false)

    const handlePostRequest = () => {
        setIsPosting(true);
        setIsPostCommentError(false);
        setIsCommentPosted(false);
        api.postComment(article_id, user, commentInput)
        .then((newComment) => {
            handlePostedComment(newComment)
            setCommentInput("")
            setIsCommentPosted(true)
        })
        .catch(() => {
            setIsPostCommentError(true);
        })
        .finally(() => {
            setIsPosting(false);
        })
    }

    return (
        <>
        <RequiresGuest isLoggedIn={isLoggedIn}>
            <section className="CommentLoginButton-container">
                    <button className="CommentLoginButton" 
                        onClick={ () => {
                        setUser("jessjelly")
                        }}>
                     Login to leave a comment
                    </button>
            </section>
        </RequiresGuest> 
        <RequiresLogin isLoggedIn={isLoggedIn}>
        <section className="PostCommentForm">
            <Form onSubmit={(e) => {
                        e.preventDefault();
                        handlePostRequest();
                }}>
                <Form.Group className="mb-3" >
                    <Form.Label>{user} leave a comment here:</Form.Label>
                    <Form.Control as="textarea" rows={3} value={commentInput} 
                                  required
                                  maxLength={500}
                                  onChange={(e) => {
                                 setCommentInput(e.target.value)
                                 }}/>
                </Form.Group>
                <section className={`PostComment_button-container ${isPosting ? "Hidden" : ""}`}>
                    <button type="submit" className="PostComment_button">Post Comment</button>
                </section>
                {isPosting && (
                            <section className="Loading-post" >
                                <PulseLoader color={"#577399"}/>
                            </section>
                        )
                 }
            </Form>
            </section>
        </RequiresLogin>
        {isCommentPosted && 
                <Alert variant="success">
                  Comment successfully posted!
                </Alert>
        }
        {isPostCommentError && 
                <Alert variant="danger">
                  Unable to post comment. <br />
                  Please try again later.
                </Alert>
        }
        </>
    );
};

export default PostComment;