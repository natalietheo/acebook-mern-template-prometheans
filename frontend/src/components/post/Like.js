import React, { useState } from "react";

const LikeButton = (props) => {
    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const token = window.localStorage.getItem("token")

    const sendLike = async (event) => {
        console.log("this is the id", props.post._id);
        event.preventDefault();
        let response = await fetch('/posts/like', {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ post_id: props.post._id, like: 1 })
        })
      
        if (response.status !== 200) {
          console.log("post failed, Error status:" + response.status)
        } else {
          console.log("oop: " + response.status)
          let data = await response.json()
          console.log(data)
        //   window.localStorage.setItem("token", data.token)
          //This refreshes the page, there may be a nicer way of doing it 
          window.location.reload(false);
        }
    }

    const handleClick = () => {
      if (isClicked) {
        setLikes(likes - 1);
        sendLike();
      } else {
        setLikes(likes + 1);
        sendLike();
      }
      setIsClicked(!isClicked);
    };
  
    return (
      <button className={ `like-button ${isClicked && 'liked'}` } onClick={ handleClick }>
        <span className="likes-counter">{ `Like | ${likes}` }</span>
      </button>
    );
  };
  
  export default LikeButton;