import React from 'react';
import './InfoPage.css';
// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <><div class="star-layer" id="stars"></div>
    <div class="star-layer" id="stars2"></div>
    <div class="star-layer" id="stars3"></div>
    <div className="infoContainer container">
      
      <h2 id='infoPage'>Info Page</h2>
      <div className="techUsed">
      <h3>Technologies Used:</h3>
      <ul>
        <li>Javascript</li>
        <li>React</li>
        <li>Redux</li>
        <li>Sagas</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>Material UI</li>
        <li>Passport</li>
        <li>Cloudinary</li>
        <li>sweetalert2</li>
        <li>moment</li>
      </ul>
      </div>
      <div className="futurePlans">
      <h3>Future Plans</h3>
      <ul>
        <li>Add the ability to share timelines with others</li>
        <li>Add a function to present a random memory upon request</li>
        <li>Implement informational tags</li>
      </ul>
      </div>
      <div className="thanks">
      <h3>Thanks</h3>
      <p id="thanks">Thanks to my family, my friends, and the amazing and supportive Taaffeite Cohort, Prime Digital Academy 
        and my wise yet patient instructor Chris for helping shepherd this project from the ether to reality.
      </p>
      </div>
    </div>
    </>
  );
}

export default InfoPage;
