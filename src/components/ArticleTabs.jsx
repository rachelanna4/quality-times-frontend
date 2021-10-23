import React, { useEffect, useState } from 'react';
import { useHistory} from 'react-router-dom';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import * as api from '../utils/api'; 

const ArticleTabs = ({topic, setCurrPage}) => {
const [topicsList, setTopicsList] = useState([]);
const [tabPath, setTabPath]= useState("");
const history = useHistory();

useEffect(() => {
    api
      .getTopics()
      .then((topicsFromApi) => {
        setTopicsList(topicsFromApi);
      })
  }, []);

  useEffect(() => {
    if (tabPath) {
    setCurrPage(1)
    history.push(`/articles${tabPath}`)
    }
    setTabPath ('');
    },  [tabPath, history, setCurrPage]);

    return (
        <>
        { topicsList.length > 0 &&
            <Tabs defaultActiveKey={topic ? `/topics/${topic}` : '/'} id="uncontrolled-tab-example" className="mb-3" 
                  onSelect={(eventKey) => {
                    console.log('tab event ', eventKey)
                    setTabPath(eventKey)
                  }} >
              <Tab eventKey="/" title="all articles"/>
              {topicsList.map((topic) => {
                return (
                  <Tab className={`Tab ${topic.slug}`} key={`${topic.slug}`} eventKey={`/topics/${topic.slug}`} title={`${topic.slug}`}/>
                )
              })}
            </Tabs>
          }
        </>
    );
};

export default ArticleTabs;