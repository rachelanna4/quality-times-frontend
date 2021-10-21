import React from 'react';
import { Link } from 'react-router-dom';

const TopicsGallery = ({topics, isTopicError}) => {

    return (
       <>
          {isTopicError ? (
            <section className="TopicsGallery-error">
            <p>Oops! Something went wrong loading the topics</p>
            <p>Try again later</p>
          </section>
          ) : (
            <section className="TopicsGallery">
            <h3>Browse topics:</h3>
            <ul>
              {topics.map((topic) => {
                return (
                  <Link to={`/articles/topics/${topic.slug}`} className="TopicLinks">
                    <li key={topic.slug}>
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