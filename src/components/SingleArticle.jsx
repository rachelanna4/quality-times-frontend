import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import * as api from '../utils/api'; 
import { PersonFill, Calendar, ChatLeftText, StarFill } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';

const SingleArticle = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState("")
    const [comments, setComments] = useState([])
    const [isArticleError, setIsArticleError] = useState(false);
    const [isCommentsError, setIsCommentsError] = useState(false);

    useEffect(() => {
        setIsArticleError(false);
        api.getSingleArticle(article_id)
        .then((articleFromApi) => {
            setArticle(articleFromApi)
        })
        .catch(() => {
            setIsArticleError(true);
        });
    }, [article_id])

    useEffect(() => {
        setIsCommentsError(false);
        api.getCommentsByArticle(article_id)
        .then((commentsFromApi) => {
            setComments(commentsFromApi.comments)
        })
        .catch(() => {
            setIsCommentsError(true);
        });
    }, [comments, article_id])



    return (
        <> 
            {isArticleError ? (
            <section className="SingleArticle-error">
                <p>Oops! Something went wrong and we can't find the article</p>
                <p>Try again later</p>
            </section>
            ): (
            <section className="SingleArticle">
                <h2>{article.title}</h2>
                <h6 className={`ArticleTopic ArticleTopic-${article.topic}`}>{article.topic}</h6>
                <section className="SingleArticle_columns">
                    <section className="SingleArticle_columns-left">
                        <p className="ArticleDate">
                            <span role="img" aria-label="Date" className="ArticleDate_icon"><Calendar/></span> {new Date(article.created_at).toLocaleDateString("en-GB")}
                        </p>
                        <p className="ArticleAuthor">
                            <span role="img" aria-label="Written by"><PersonFill className="ArticleAuthor_icon"/></span> {article.author}
                        </p>
                    </section>
                        <section className="SingleArticle_columns-right">
                        <p className="ArticleBody">{article.body}</p> 
                    </section> 
                    <section className="SingleArticle_columns-leftBottom">
                        <p className="ArticleStars">
                        <span role="img" aria-label="Number of stars"><StarFill className="ArticleStars_icon" /></span> {article.votes}
                    </p>
                    </section>
                    <section className="SingleArticle_columns-rightBottom">
                        {isCommentsError ? (
                            <section className="CommentList-error">
                                <Accordion>
                                    <Accordion.Item eventKey="comments-error">
                                        <Accordion.Header>
                                            <span role="img" aria-label="Number of comments"><ChatLeftText className="ArticleComments_icon" /></span> &nbsp; &nbsp;View all comments
                                        </Accordion.Header>
                                        <Accordion.Body>
                                                <p>Sorry we can't find any comments right now</p>
                                                <p>Try again later</p>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </section>
                        ) : (
                            <section className="CommentList">
                                <Accordion>
                                <Accordion.Item eventKey="comments">
                                    <Accordion.Header>
                                    <span role="img" aria-label="Number of comments"><ChatLeftText className="ArticleComments_icon" /></span> &nbsp; &nbsp;View all {article.comment_count} comments
                                    </Accordion.Header>
                                    {comments.map((comment) => {
                                        return (
                                            <Accordion.Body>
                                            <p>
                                                <span role="img" aria-label="Written by"><PersonFill className="CommentAuthor_icon"/></span>{comment.author} 
                                                <span role="img" aria-label="Date" className="CommentDate_icon"><Calendar/></span> {new Date(comment.created_at).toLocaleDateString("en-GB")}
                                            </p>
                                            <p>{comment.body}</p>
                                            <p>Votes: {comment.votes}</p>
                                            </Accordion.Body>
                                        )
                                    })}
                                
                                </Accordion.Item>
                                </Accordion>
                            </section>
                        )}
                    </section>
                        
                </section>
            </section>
            )
        }
        </>
    );
};

export default SingleArticle;