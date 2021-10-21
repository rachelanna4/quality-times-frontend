import React from 'react';
import { StarFill } from 'react-bootstrap-icons';

const StarArticle = ({article_id, star_count}) => {
    return (
        <section className="SingleArticle_columns-leftBottom">
                    <p className="ArticleStars">
                        <span role="img" aria-label="Number of stars"><StarFill className="ArticleStars_icon" /></span>&nbsp;&nbsp;{star_count}
                    </p>
        </section>
    );
};

export default StarArticle;