import React, { useEffect, useState } from 'react';
import { useParams, Link} from 'react-router-dom';
import PulseLoader from "react-spinners/PulseLoader"
import * as api from '../utils/api'; 
import StarArticle from "./StarArticle";
import Comments from "./Comments";
import { PersonFill, Calendar } from 'react-bootstrap-icons';

const SingleArticle = () => {
    const {article_id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [article, setArticle] = useState({});
    const [isArticleError, setIsArticleError] = useState(false);

    useEffect(() => {
        setIsLoading(true)
        setIsArticleError(false);
        api.getSingleArticle(article_id)
        .then((articleFromApi) => {
            setArticle(articleFromApi)
        })
        .catch(() => {
            setIsArticleError(true);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [article_id])

    if (isLoading) {
        return (
          <section className="Loading-page" >
            <PulseLoader color={"#577399"}/>
          </section>
        )
      }

    return (
        <> 
            {isArticleError ? (
            <section className="SingleArticle-error">
                <h4>Oops! It doesn't look like this article exists</h4>
                <h5>View all available articles here:</h5>
                <button>
                    <Link to={`/articles`}> Go to articles </Link>
                </button>
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