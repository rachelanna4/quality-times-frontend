import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
                {isError ? (
                    <Card className="Card">
                    <Card.Img className="Card_img" variant="top" src="/images/latest-news.png" />
                    <Card.Title className="Card_title">Sorry we can't find any articles right now</Card.Title>
                    <Card.Body>
                      <Card.Text>
                        Please try again later 
                      </Card.Text>
                      <Button className="Card_button" variant="primary">Go back home</Button>
                    </Card.Body>
                  </Card>
                ) : (
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
                )}
            </section> 
    );
};

export default Articles;