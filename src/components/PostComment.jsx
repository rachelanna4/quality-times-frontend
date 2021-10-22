import React, { useContext, useState } from 'react';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'


const PostComment = ({article_id, downloadComments}) => {
    const { user, setUser, isLoggedIn} = useContext(UserContext); 
    const [commentInput, setCommentInput] = useState(""); 
    const [isPostCommentError, setIsPostCommentError] = useState(false); 
    const [isCommentPosted, setIsCommentPosted] = useState(false)

    const handlePostComment = () => {
        setIsPostCommentError(false)
        setIsCommentPosted(false)
        api.postComment(article_id, user, commentInput)
        .then(() => {
            downloadComments()
            setCommentInput("")
            setIsCommentPosted(true)
        })
        .catch(() => {
            setIsPostCommentError(true);
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
                        handlePostComment();
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
                <section className="PostComment_button-container">
                    <button type="submit" className="PostComment_button">Post Comment</button>
                </section>
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