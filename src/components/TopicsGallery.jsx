import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getTopics }  from "../utils/api.js"

const TopicsGallery = () => {
const [topics, setTopics] = useState([]);
const [selectedTopic, setSelectedTopic] = useState("")
const [isError, setIsError] = useState(false);
const history = useHistory();

useEffect( () => {
    setIsError(false);
    getTopics()
    .then((topicsFromApi)=> {
        setTopics(topicsFromApi)
    })
    .catch(() => {
        setIsError(true);
      });
}, [])

useEffect(() => {
    if (selectedTopic.length > 0) {
    history.push(`/articles/${selectedTopic}`)
    }
    setSelectedTopic('');
  }, [selectedTopic, history]);


    return (
        <section>
          {isError ? (
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