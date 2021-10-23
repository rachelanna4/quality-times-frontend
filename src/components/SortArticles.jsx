import React from 'react';

const SortArticles = ({selectedSortBy, setSelectedSortBy}) => {

    return (
        <>
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
                    <option value="" selected disabled>Sort articles by:</option>
                    <option value="created_at:desc">Newest</option>
                    <option value="created_at:asc">Oldest</option>
                    <option value="comment_count:desc">Most Comments</option>
                    <option value="comment_count:asc">Fewest Comments</option>
                    <option value="votes:desc">Most Stars</option>
                    <option value="votes:asc">Fewest Stars</option>
                </select>
            </form>
        </>
    );
};

export default SortArticles;