import React from 'react';
import { useEffect, useState } from 'react';
import { getTopics }  from "../utils/api.js"

const TopicsGallery = () => {
const [topics, setTopics] = useState([])

useEffect( () => {
    getTopics().then((topicsFromApi)=> {
        setTopics(topicsFromApi)
    })
}, [])


    return (
        <section className="TopicsGallery">
            <h2>Latest News:</h2>
            <ul>
            {topics.map((topic) => {
                return (
                    <li key={topic.slug}>
                        <img src={`/images/${topic.slug}.jpg`} alt={topic.slug}></img>
                        <h3>{topic.slug}</h3>
                    </li> 
                )
            })}
            </ul>
        </section>
    );
};

export default TopicsGallery;