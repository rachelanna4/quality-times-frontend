import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import * as api from '../utils/api'; 
import { PersonFill, Calendar, ChatLeftText, StarFill } from 'react-bootstrap-icons';

const SingleArticle = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState("")
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(false);
        api.getSingleArticle(article_id)
        .then((articleFromApi) => {
            setArticle(articleFromApi)
        })
        .catch(() => {
            setIsError(true);
        });
    }, [article_id])


    return (
        <> 
            {isError ? (
            <section className="SingleArticle-error">
                <p>Oops! Something went wrong and we can't find the article</p>
                <p>Try again later</p>
            </section>
            ): (
            <section className="SingleArticle">
                <h2>{article.title}</h2>
                <h6 className={`ArticleTopic ArticleTopic-${article.topic}`}>{article.topic}</h6>
                <p className="ArticleDate">
                    <span role="img" aria-label="Date" className="ArticleDate_icon"><Calendar/></span> {new Date(article.created_at).toLocaleDateString("en-GB")}
                </p>
                <p className="ArticleAuthor">
                    <span role="img" aria-label="Written by"><PersonFill className="ArticleAuthor_icon"/></span> {article.author}
                </p>
                <p>{article.body}</p>
                <p>
                    <span role="img" aria-label="Number of stars"><StarFill className="ArticleStars_icon" /></span> {article.votes}
                </p>
                <p>
                    <span role="img" aria-label="Number of comments"><ChatLeftText className="ArticleComments_icon" /></span> {article.comment_count}
                </p>
            </section>
            )
        }
        </>
    );
};

export default SingleArticle;