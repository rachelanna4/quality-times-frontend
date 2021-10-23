import React, { useState } from 'react';
import LatestNews from "./LatestNews";
import TopicsGallery from "./TopicsGallery";
import PulseLoader from "react-spinners/PulseLoader"

const Homepage = () => {
    const [isLatestNewsLoading, setIsLatestNewsLoading] = useState(true); 
    const [isTopicsGalleryLoading, setIsTopicsGalleryLoading] = useState(true); 


   let isLoading = isLatestNewsLoading || isTopicsGalleryLoading;

    return (
        <> 
            {
            isLoading && 
                (
                <section className="Loading-page" >
                    <PulseLoader color={"#577399"}/>
                </section>
                )
            }
            <LatestNews setIsLatestNewsLoading={setIsLatestNewsLoading} isLoading={isLoading} />
            <TopicsGallery setIsTopicsGalleryLoading={setIsTopicsGalleryLoading} isLoading={isLoading} />
        </>
    );
};

export default Homepage;