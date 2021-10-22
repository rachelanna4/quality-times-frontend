import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as api from '../utils/api'; 

const TopicsGallery = () => {
  const [topicsList, setTopicsList] = useState([]);
  const [isTopicsListError, setIsTopicsListError] = useState(false);

  useEffect(() => {
    setIsTopicsListError(false);
    api
      .getTopics()
      .then((topicsFromApi) => {
        setTopicsList(topicsFromApi);
      })
      .catch(() => {
        setIsTopicsListError(true);
      });
  }, []);

    return (
       <>
          {isTopicsListError ? (
            <section className="TopicsGallery-error">
            <p>Oops! Something went wrong loading the topics</p>
            <p>Try again later</p>
          </section>
          ) : (
            <section className="TopicsGallery">
            <h3>Browse topics:</h3>
            <ul>
              {topicsList.map((topic) => {
                return (
                  <Link to={`/articles/topics/${topic.slug}`} className="TopicLinks" key={topic.slug}>
                    <li >
                      <section className="TopicsGallery_container">
                        <img 
                          src={`/images/${topic.slug}.jpg`}
                          onError={((e) => {
                            e.target.src="/images/default.jpg"
                            })}
                          alt={topic.slug}></img>
                        <h3>{topic.slug}</h3>
                      </section>
                    </li> 
                  </Link>
                )
              })}
            </ul>
            </section>
        )}
        </>
    );
};

export default TopicsGallery;