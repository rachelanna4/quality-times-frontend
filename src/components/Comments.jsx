import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader"
import * as api from '../utils/api'; 
import { PersonFill, Calendar, ChatLeftText, } from 'react-bootstrap-icons';
import Accordion from 'react-bootstrap/Accordion';
import Pagination from 'react-bootstrap/Pagination'
import VoteComments from './VoteComments';
import PostComment from './PostComment';


const Comments = ({article_id, comment_count}) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true)
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [comments, setComments] = useState([])
    const [isCommentsError, setIsCommentsError] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        setIsPageLoading(true);
        setIsCommentsError(false);
        api.getCommentsByArticle(article_id, currPage)
        .then((commentsFromApi) => {
            setComments(commentsFromApi.comments)
            setTotalPages(Math.ceil(commentsFromApi.total_count / 10))
        })
        .catch(() => {
            setIsCommentsError(true);
        })
        .finally(() => {
            setIsPageLoading(false);
            setIsFirstLoad(false);
        })
    }, [article_id, currPage])

    let active = currPage;
    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
        <Pagination.Item key={number} active={number === active} onClick={() => setCurrPage(number)}>
        {number}
        </Pagination.Item>,
     );
    }

    const handlePostedComment = (postedComment) => {
        const commentsCopy = [...comments, postedComment]; 
        setComments(commentsCopy)

    }

    if (isFirstLoad) {
        return (
          <section className="Loading-comments" >
            <PulseLoader color={"#577399"}/>
          </section>
        )
      }

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
                                                    <Link to={`/articles/authors/${comment.author}`} className="Author_Link">
                                                        <p>
                                                            <span role="img" aria-label="Written by"><PersonFill className="CommentAuthor_icon"/></span>&nbsp;&nbsp;{comment.author} 
                                                        </p>
                                                    </Link>
                                                </section>
                                                    <section className="CommentList_body">
                                                    <p>"{comment.body}"</p>
                                                </section>
                                                <VoteComments comment_id={comment.comment_id} votes={comment.votes} />
                                                <hr />
                                            </Accordion.Body>
                                        )
                                    })}
                                    <Accordion.Body >
                                        <Pagination className={`CommentPages ${isPageLoading ? "Hidden" : ""}`}>{paginationItems}</Pagination>
                                        {isPageLoading && (
                                            <section className="Loading-commentPage" >
                                            <PulseLoader color={"#577399"}/>
                                            </section>
                                        )}
                                     </Accordion.Body>
                                     <Accordion.Body >
                                         <PostComment article_id={article_id} handlePostedComment={handlePostedComment} />
                                     </Accordion.Body>
                                
                                </Accordion.Item>
                                </Accordion>
                            </section>
                        )}
                    </section>
    );
};

export default Comments;