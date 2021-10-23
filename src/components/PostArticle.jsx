import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 
import PulseLoader from "react-spinners/PulseLoader"
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'

const PostArticle = () => {
    const { user, setUser, isLoggedIn} = useContext(UserContext); 
    const [isTopicsLoading, setIsTopicsLoading] = useState(true);
    const [articleTitle, setArticleTitle] = useState(""); 
    const [articleTopic, setArticleTopic] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [newArticleId, setNewArticleId] = useState(null); 
    const [isPosting, setIsPosting] = useState(false);
    const [isPostError, setIsPostError] = useState(false)
    const [isPostSuccessful, setIsPostSuccessful] = useState(false)
    const [topicsList, setTopicsList] = useState([]);

    useEffect(() => {
        setIsTopicsLoading(true)
        api
        .getTopics()
        .then((topicsFromApi) => {
            setTopicsList(topicsFromApi);
        })
        .finally(() => {
            setIsTopicsLoading(false)
        })
    }, []);

    const postArticle = () => {
        setIsPosting(true)
        setIsPostError(false)
        setIsPostSuccessful(false)
        api.postArticle(user, articleTitle, articleTopic, articleBody)
        .then((createdArticleId) => {
            setNewArticleId(createdArticleId)
            setArticleTitle("");
            setArticleTopic("");
            setArticleBody("");
            setIsPostSuccessful(true);
        })
        .catch(() => {
            setIsPostError(true)
        })
        .finally(() => {
            setIsPosting(false)
        })
    }

    return (
        <>
        <RequiresGuest isLoggedIn={isLoggedIn}>
            <section className="PostArticleLogin">
                <h4>Please login to post your article</h4>
                <button onClick={ () => {
                    setUser("jessjelly")
                }
                }>Login</button>
            </section>
        </RequiresGuest>
        <RequiresLogin isLoggedIn={isLoggedIn}>
            <section className="PostArticle-container">
                <section className="PostArticleIntro">
                <h4>Fill in the form to post your article:</h4>
                {isPostSuccessful && 
                    <Alert variant="success">
                    <p>Article successfully posted!</p>
                    <button>
                        <Link to={`/articles/${newArticleId}`} >Go to article</Link>
                        </button>
                    </Alert>
                }
                {isPostError && 
                    <Alert variant="danger">
                    Unable to post article. <br />
                    Please try again later.
                    </Alert>
                }
                </section>
                <section className="PostArticleForm-container">
                    <Form onSubmit={(e) => {
                            e.preventDefault();
                            postArticle();
                            }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Author:</Form.Label>
                            <Form.Control type="text" placeholder={user} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Topic:</Form.Label>
                            <Form.Select value={articleTopic}
                                        disabled={isTopicsLoading}
                                        required
                                        onChange={(e) => {
                                        setArticleTopic(e.target.value);

                                        }}>
                                <option disabled value="" >Select topic</option>
                                {topicsList.map((topic) => {
                                    const firstLetter = topic.slug[0].toUpperCase()
                                    const restOfTopic = topic.slug.slice(1)
                                    const capitalisedTopic = firstLetter + restOfTopic;
                                    return (
                                        <option key={topic.slug} value={topic.slug}>{capitalisedTopic}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" value={articleTitle}
                                        required
                                        maxLength={100}
                                        onChange={(e) => {
                                        setArticleTitle(e.target.value)
                                        }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Content:</Form.Label>
                            <Form.Control as="textarea" rows={7} value={articleBody} 
                                        required
                                        onChange={(e) => {
                                        setArticleBody(e.target.value)
                                        }}/>
                        </Form.Group>
                        <section className={`PostArticleSubmit ${isPosting ? "Hidden" : ""}`}>
                            <button type="submit">Post Article</button>
                        </section>
                        {isPosting && (
                            <section className="Loading-postArticle" >
                                <PulseLoader color={"#577399"}/>
                            </section>
                        )
                        }
                    </Form>
                </section>
            </section>
        </RequiresLogin>
        </>
    );
};

export default PostArticle;