import React from "react";
import { jobshost } from "../../static";

const FeedStats = (setFeedStats, setIsloading) => {
  const options = {
    method: 'POST',
    headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/8.4.1'},
    body: '{}'
  };
  setIsloading(true)
  fetch(`${jobshost}allvms/getFeedUpdate`, options)
    .then((response) => response.json())
    .then((response) => {
        setIsloading(false);
        setFeedStats(response);
     
    })
    .catch((error) => console.log("error", error));
};

export default FeedStats;
