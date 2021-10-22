import React, { useEffect, useState } from 'react';
import * as api from '../utils/api'; 
import { PersonFill, Calendar, ChatLeftText, } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import PostComment from './PostComment';


const Comments = ({article_id, comment_count}) => {
    const [comments, setComments] = useState([])
    const [isCommentsError, setIsCommentsError] = useState(false);

    useEffect(() => {
        setIsCommentsError(false);
        api.getCommentsByArticle(article_id)
        .then((commentsFromApi) => {
            setComments(commentsFromApi.comments)
        })
        .catch(() => {
            setIsCommentsError(true);
        });
    }, [ article_id])


    return (
        <section className="SingleArticle_columns-rightBottom">
                        {isCommentsError ? (
                            <section>
                                <Accordion className="CommentList-error">
                                    <Accordion.Item eventKey="comments-error">
                                        <Accordion.Header className="CommentList_header-error">
                                            <p>
                                                <span role="img" aria-label="Number of comments"><ChatLeftText className="ArticleComments_icon" /></span> &nbsp; &nbsp;View all comments
                                            </p>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                                <p>Sorry we can't find any comments right now</p>
                                                <p>Try again later</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </section>
                        ) : (
                            <section>
                                <Accordion className="CommentList">
                                <Accordion.Item eventKey="comments">
                                    <Accordion.Header className="CommentList_header">
                                    <p>
                                        <span role="img" aria-label="Number of comments"><ChatLeftText className="ArticleComments_icon" /></span> &nbsp; &nbsp;View all {comment_count} comments
                                    </p>
                                    </Accordion.Header>
                                    {comments.map((comment) => {
                                        return (
                                            <Accordion.Body key={comment.comment_id}>
                                                <section className="CommentList_metadata">
                                                    <p>
                                                        <span role="img" aria-label="Date" className="CommentDate_icon"><Calendar/></span> &nbsp;&nbsp;{new Date(comment.created_at).toLocaleDateString("en-GB")}
                                                    </p>
                                                    <p>
                                                        <span role="img" aria-label="Written by"><PersonFill className="CommentAuthor_icon"/></span>&nbsp;&nbsp;{comment.author} 
                                                    </p>
                                                </section>
                                                    <section className="CommentList_body">
                                                    <p>"{comment.body}"</p>
                                                </section>
                                                <p>Votes: {comment.votes}</p>
                                                <hr />
                                            </Accordion.Body>
                                        )
                                    })}
                                     <Accordion.Body >
                                                <PostComment />
                                     </Accordion.Body>
                                
                                </Accordion.Item>
                                </Accordion>
                            </section>
                        )}
                    </section>
    );
};

export default Comments;