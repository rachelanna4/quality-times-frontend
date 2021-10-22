import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext, RequiresLogin, RequiresGuest} from '../contexts/User';
import * as api from '../utils/api'; 
import Form from 'react-bootstrap/Form'; 
import Alert from 'react-bootstrap/Alert'

const PostArticle = ({topicsList}) => {
    const { user, setUser, isLoggedIn} = useContext(UserContext); 
    const [articleTitle, setArticleTitle] = useState(""); 
    const [articleTopic, setArticleTopic] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [newArticleId, setNewArticleId] = useState(null); 
    const [isPostError, setIsPostError] = useState(false)
    const [isPostSuccessful, setIsPostSuccessful] = useState(false)

    const postArticle = () => {
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
                                        required
                                        onChange={(e) => {
                                        setArticleTopic(e.target.value);

                                        }}>
                                <option disabled value="" >Select topic</option>
                                {topicsList.map((topic) => {
                                    return (
                                        <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
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
                        <section className="PostArticleSubmit">
                            <button type="submit">Post Article</button>
                        </section>
                    </Form>
                </section>
            </section>
        </RequiresLogin>
        </>
    );
};

export default PostArticle;