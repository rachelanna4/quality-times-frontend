import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const TopicsGallery = ({topics, isTopicError}) => {
const [selectedTopic, setSelectedTopic] = useState("")
const history = useHistory();

useEffect(() => {
    if (selectedTopic.length > 0) {
    history.push(`/articles/topics/${selectedTopic}`)
    }
    setSelectedTopic('');
  }, [selectedTopic, history]);


    return (
        <section className="TopicsGallery">
          {isTopicError ? (
            <p>Oops! Something went wrong.</p>
          ) : (
            <section className="TopicsGallery">
            <h3>Browse topics:</h3>
            <ul>
              {topics.map((topic) => {
                return (
                    <li key={topic.slug}
                        onClick={((e) => {
                        setSelectedTopic(topic.slug)
                    })} >
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
                )
              })}
            </ul>
            </section>
        )}
        </section>
    );
};

export default TopicsGallery;