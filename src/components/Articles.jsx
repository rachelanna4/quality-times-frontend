import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../utils/api'; 

const Articles = () => {
const [allArticles, setAllArticles] = useState([])
const [isError, setIsError] = useState(false);
const { topic } = useParams();

useEffect(() => {
    setIsError(false);
    getArticles({topic: topic})
    .then((articlesFromApi) => {
        setAllArticles(articlesFromApi)
    })
    .catch(() => {
        setIsError(true);
      });
}, [topic] )

    return (
        <section className="ArticlesList">
        <ul>
            {allArticles.map((article) => {
                return (
                    <li key={article.article_id}>
                        <h3>{article.title}</h3>
                        <p>{article.author}</p>
                        <p>{article.topic}</p>
                    </li>
                )
            })}
        </ul>
        </section>
    );
};

export default Articles;