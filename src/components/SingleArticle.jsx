import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import * as api from '../utils/api'; 
import StarArticle from "./StarArticle";
import Comments from "./Comments";
import { PersonFill, Calendar } from 'react-bootstrap-icons';

const SingleArticle = () => {
    const {article_id} = useParams()
    const [article, setArticle] = useState("")
    const [isArticleError, setIsArticleError] = useState(false);

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
                            <span role="img" aria-label="Date" className="ArticleDate_icon"><Calendar/></span>&nbsp;&nbsp;{new Date(article.created_at).toLocaleDateString("en-GB")}
                        </p>
                        <p className="ArticleAuthor">
                            <span role="img" aria-label="Written by"><PersonFill className="ArticleAuthor_icon"/></span>&nbsp;&nbsp;{article.author}
                        </p>
                    </section>
                        <section className="SingleArticle_columns-right">
                        <p className="ArticleBody">{article.body}</p> 
                    </section> 
                    <StarArticle article_id={article_id} star_count={article.votes} />
                    <Comments article_id={article_id} comment_count={article.comment_count} />    
                </section>
            </section>
            )
        }
        </>
    );
};

export default SingleArticle;