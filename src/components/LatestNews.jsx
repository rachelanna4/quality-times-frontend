import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import * as api from '../utils/api';
import Carousel from 'react-bootstrap/Carousel'
import { PersonFill } from 'react-bootstrap-icons';


const LatestNews = () => {
  const [latestNews, setLatestNews] = useState([])
  const [isError, setIsError] = useState(false);

  useEffect(() => {
      setIsError(false);
      api.getArticles({sort_by: "created_at", order: "desc", limit: 3})
      .then((articlesFromApi) => {
          setLatestNews(articlesFromApi.articles)
      })
      .catch(() => {
          setIsError(true);
        });
      }, [])

    return (
        <section className="LatestNews">
        {isError ? (
            <Carousel className="Carousel Carousel-error">
               <Carousel.Item>
                    <img
                    src="./images/background1.png"
                    alt="Oops something went wrong"
                    className="LatestNews_img"
                    />
               <Carousel.Caption className="LatestNews_caption">
                     <h3>Sorry we can't display the latest news right now</h3>
                     <p>Try again later</p>
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
          ) : (
        <section className="LatestNews">
            <h3> <span className="LatestNews_span-red">Latest</span><span className="LatestNews_span-blue">News!</span></h3>
          <Carousel className="Carousel">
           {latestNews.map((article) => {
              return (
                
                  <Carousel.Item key={article.article_id}>
                     <Link to ={`/articles/${article.article_id}`}>
                     <img
                        src="./images/background1.png"
                        alt={article.article_id}
                        className="LatestNews_img"
                    />
                    <Carousel.Caption className="LatestNews_caption">
                        <h3>{article.title}</h3>
                        <p><span role="img" aria-label="Written by"><PersonFill/></span> {article.author}</p>
                    </Carousel.Caption>
                    </Link>
                  </Carousel.Item>
                  
                )
            })}
          </Carousel>
        </section>   
     )
    }
    </section>
    ) 
};

export default LatestNews;