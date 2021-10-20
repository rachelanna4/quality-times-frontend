import React, { useEffect, useState } from 'react';
import { useParams, useHistory} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Pagination from 'react-bootstrap/Pagination';
import { PersonFill, Calendar, ArrowRightCircle } from 'react-bootstrap-icons';
import * as api from '../utils/api'; 

const Articles = () => {
    const [allArticles, setAllArticles] = useState([])
    const [isError, setIsError] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState("")
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedSortBy, setSelectedSortBy] = useState("")
    const { topic } = useParams();
    const history = useHistory();

    useEffect(() => {

        const queries = {topic, currPage}

        if(selectedSortBy) {
        const sortQuery = selectedSortBy.split(":")
        queries.sort_by = sortQuery[0];
        queries.order = sortQuery[1];
        }

        setIsError(false);
        api.getArticles(queries)
        .then((dataFromApi) => {
            setAllArticles(dataFromApi.articles)
            setTotalPages(Math.ceil(dataFromApi.total_count / 9))
        })
        .catch(() => {
            setIsError(true);
        });
    }, [topic, currPage, selectedSortBy])

    useEffect(() => {
        if (selectedArticle) {
        history.push(`/articles/${selectedArticle}`)
        }
        setSelectedArticle('');
    }, [selectedArticle, history]);

    let active = currPage;
    let paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
    <Pagination.Item key={number} active={number === active} onClick={() => setCurrPage(number)}>
      {number}
    </Pagination.Item>,
  );
}


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
                    <section>
                    <form className="Sort">
                        <select
                        className="Sort_dropdown"
                        id="queries"
                        name="queries"
                        value={selectedSortBy}
                        onChange={(e) => {
                            setSelectedSortBy(e.target.value);
                        }}
                        >
                        <option value="" disabled>Sort articles by:</option>
                        <option value="created_at:desc">Newest</option>
                        <option value="created_at:asc">Oldest</option>
                        <option value="comment_count:desc">Most Comments</option>
                        <option value="comment_count:asc">Fewest Comments</option>
                        <option value="votes:desc">Most Stars</option>
                        <option value="votes:asc">Fewest Stars</option>
                        </select>
                    </form>
                    <ul className="ArticlesList">
                        {allArticles.map((article, index) => {
                            let background = "/images/background1.png"
                            
                            let shortBody = ""; 
                            shortBody += article.body.split(" ").slice(0, 20).join(" ") + "..."

                            return (
                                <Card className="Card" 
                                      key={article.article_id}
                                      onClick={(e) => {
                                        setSelectedArticle(article.article_id)
                                        }}>
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
                                  >Read full article  <ArrowRightCircle /></Button>
                                </Card.Body>
                              </Card>
                            )
                        })}
                    </ul>
                    <Pagination className="Pages">{paginationItems}</Pagination>
                </section>
                )}
           </>
    );
};

export default Articles;