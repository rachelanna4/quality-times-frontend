import React, { useContext, useState } from 'react';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 
import Form from 'react-bootstrap/Form'; 


const PostComment = ({article_id, downloadComments}) => {
    const { user, setUser, isLoggedIn} = useContext(UserContext); 
    const [commentInput, setCommentInput] = useState(""); 

    const handlePostComment = () => {
        api.postComment(article_id, user, commentInput)
        .then(() => {
            downloadComments()
            setCommentInput("")
        })
        .catch()
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
        </>
    );
};

export default PostComment;