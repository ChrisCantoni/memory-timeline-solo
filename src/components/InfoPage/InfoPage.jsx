import React from 'react';
import './InfoPage.css';
import linkedIn from './linkedin.jpeg';
// This is one of our simplest components
// It doesn't have local state
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is

function InfoPage() {
  return (
    <div className="infoPage">
      <div>
    <img width="300" src="https://media.licdn.com/dms/image/D5603AQEoONXDkJ2F0w/profile-displayphoto-shrink_200_200/0/1697640986588?e=1710979200&v=beta&t=yqNqPywYonRl0n6knlnC579WuycYdbC0Q9NFaGZrEUc"/>
    </div>
    <div className="infoContainer container">
    <h2 id='infoPage'>Info</h2>
    
    
      
      <h3>Technologies Used:</h3>
      <div className="techUsed">
      <div className='list1'>
      <ul>
        <li>Javascript</li>
        <li>React</li>
        <li>Redux</li>
        <li>Sagas</li>
        <li>Node.js</li>
        <li>Express</li>
        </ul>
        </div>
        <div className='list2'>
          <ul>
        <li>PostgreSQL</li>
        <li>Material UI</li>
        <li>Passport</li>
        <li>Cloudinary</li>
        <li>sweetalert2</li>
        <li>moment</li>
      </ul>
      </div>
      <div>
      <h3>Future Plans</h3>
      
      <ul>
        <li>Let posts belong to multiple timelines</li>
        <li>Add a function to present a random memory upon request</li>
        <li>Implement informational tags</li>
      </ul>
      <h3>Thanks</h3>
      <p id="thanks">Thanks to my family, my friends, and the amazing and supportive Taaffeite Cohort, Prime Digital Academy 
        and my wise yet patient instructor Chris for helping shepherd this project from the ether to reality.
      </p>
      </div>
      </div>
      <h3>linkedin.com/chriscantoni</h3>
      <div className="linkedIn">
        
        
        
      </div>
      {/* <div className="futurePlans">
      
      </div>
      <div className="thanks">
      
      </div> */}
      
    </div>
    <div>
    <img width="300" src={linkedIn} alt="link to my linkedin profile"/>
    </div>
    </div>
  );
}

export default InfoPage;
