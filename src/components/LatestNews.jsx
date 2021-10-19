import React, {useEffect, useState} from 'react';
import { getArticles } from '../utils/api';
import Carousel from 'react-bootstrap/Carousel'


const LatestNews = () => {
const [latestNews, setLatestNews] = useState([])

useEffect(() => {
    getArticles({sort_by: "created_at"}, {order: "desc"}, {limit: 3})
    .then((articlesFromApi) => {
        setLatestNews(articlesFromApi)
    }, 
    []
)})
    return (
        <section className="LatestNews">
            <h3> <span className="LatestNews_span-red">Latest</span><span className="LatestNews_span-blue">News!</span></h3>
          <Carousel>
           {latestNews.map((article) => {
              return (
                  <Carousel.Item key={article.article_id}>
                    <img
                        src="./images/latest-news.png"
                        alt={article.article_id}
                        className="LatestNews_img"
                    />
                    <Carousel.Caption className="LatestNews_caption">
                        <h3>{article.title}</h3>
                        <p>Written by: {article.author}</p>
                    </Carousel.Caption>
                  </Carousel.Item>
                )
            })}
          </Carousel>
        </section>
    )
};

export default LatestNews;