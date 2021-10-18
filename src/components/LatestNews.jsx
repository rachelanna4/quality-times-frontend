import React, {useEffect, useState} from 'react';
import { getArticles } from '../utils/api';

const LatestNews = () => {
const [latestNews, setLatestNews] = useState([])

useEffect(() => {
    getArticles({sort_by: "created_at"}, {order: "desc"}, {limit: 3})
    .then((articlesFromApi) => {
        setLatestNews(articlesFromApi)
    }, 
    []
)}

)
    return (
        <section className="LatestNews">
            
        </section>
        
    );
};

export default LatestNews;