import React, { useEffect, useState } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { PersonFill, Calendar, ArrowRightCircle } from 'react-bootstrap-icons';
import { getArticles } from '../utils/api'; 

const Articles = () => {
const [allArticles, setAllArticles] = useState([])
const [isError, setIsError] = useState(false);
const { topic } = useParams();
const history = useHistory();

useEffect(() => {
    setIsError(false);
    getArticles({topic: topic})
    .then((articlesFromApi) => {
        setAllArticles(articlesFromApi)
    })
    .catch(() => {
        setIsError(true);
      });
}, [topic] )



    return (
            <>
                {isError ? (
                <section className="ArticlesList">
                    <Card className="Card"
                    onClick={((e) =>{
                        history.push("/")
                      })}>
                    <Card.Img className="Card_img" variant="top" src="/images/background1.png" />
                    <Card.ImgOverlay className="Card_overlay">
                        <h3 className="Card_title">Sorry we can't find any articles right now</h3>
                    </Card.ImgOverlay>
                    <Card.Body>
                      <Card.Text>
                        Please try again later 
                      </Card.Text>
                      <Button className="Card_button" 
                              variant="primary"
                      >Go back home</Button>
                    </Card.Body>
                  </Card>
                </section>
                ) : (
                    <ul className="ArticlesList">
                        {allArticles.map((article, index) => {
                            let background = "/images/background1.png"
                            
                            let shortBody = ""; 
                            shortBody += article.body.split(" ").slice(0, 20).join(" ") + "..."

                            return (
                                <Card className="Card" 
                                      key={article.article_id}
                                    //   onClick={((e) => {

                                    //   })}
                                    >
                                <Card.Img className="Card_img" variant="top" src={background} />
                                <Card.ImgOverlay className="Card_overlay">
                                    <h3 className="Card_title">{article.title}</h3>
                                </Card.ImgOverlay>
                                <Card.Body className="Card_body">
                                  <Card.Text>
                                       <p className={`Card_topic Card_topic-${article.topic}`}>{article.topic}</p>
                                        <p className="Card_intro">{shortBody}</p>
                                        <p className="Card_metadata">
                                            <PersonFill className="Card_metadata-icon"/> {article.author} 
                                            <span className="Card_metadata-date"><Calendar/> {new Date(article.created_at).toLocaleDateString("en-GB")}</span>
                                            </p> 
                                  </Card.Text>
                                  <Button className="Card_button" 
                                          variant="primary"
                                          onClick={((e) =>{
                                            history.push("/")
                                          })}
                                  >Read full article  <ArrowRightCircle /></Button>
                                </Card.Body>
                              </Card>
                            )
                        })}
                    </ul>
            
                )}
           </>
    );
};

export default Articles;