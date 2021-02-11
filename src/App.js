import React, { useState, useEffect } from 'react';
import Basic from './Form'
import Card from './Card'

export const apiUrl = "http://127.0.0.1:8000/api";

function App() {
  
  const [memeID, setMemeID] = useState()
  const [commentID, setCommentID] = useState();
  const [likeID, setLikeID] = useState();

  const [loading, setLoading] = useState("");    
  const [memes, setMemes] = useState([]);
  
  async function fetchMemes() {
    try {
      setLoading("true")
      const response = await fetch(`${apiUrl}/memes/`);
      const json = await response.json();
      setMemes(json.map(item => item))
    } catch (error) {
      setLoading("false");
    }
  }

  useEffect(() => {
    fetchMemes();
  }, [likeID, memeID, commentID])

  async function postMemes(meme) {
      try {
          const response = await fetch(`${apiUrl}/memes/`, {
              method: "post",
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
              },
              body: JSON.stringify(meme)
          });
          const json = await response.json();
          setMemeID(json.id);
          alert("Meme posted");
      } catch (error) {
        setMemeID(`error : ${error}`);
      }
      return [memeID];
  }

  async function postComment(comment) {
    try {
        const response = await fetch(`${apiUrl}/comment/`, {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });
        const json = await response.json();
        setCommentID(`${json.meme_id}-${json.id}`);
    } catch (error) {
      setCommentID(`error : ${error}`);
    }
    return [commentID];
}

async function postLike(like, likeCount) {
    try {
        const response = await fetch(`${apiUrl}/like/`, {
            method: "post",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(like)
        });            
        const json = await response.json();
        setLikeID(`${json.id}-${likeCount}`);
    } catch (error) {
      setLikeID(`error : ${error}`);
    }
    return [likeID];
}

  return (
    <div>
      <header className="header">
        <h1 className="font-semibold">XMEME</h1>
      </header>

    <div className="md:flex">
      <Basic
        postMemes={postMemes}
      />
      <div className="p-5 md:overflow-y-auto md:h-screen md:p-20 md:w-2/4">
      { loading === "false" ? (<p>Error! couldnt retrieve memes.</p>) : 

      (
        memes.map(item => (
          <Card
          key= {item.id}
          postLike={postLike}
          postComment={postComment}
          id={item.id}
          name={item.name}
          url={item.url}
          caption={item.caption}
          likes={item.likes}
          comments={item.comments}
          />
        ))
      )}
      </div>
    </div>

    </div>
  );
}

export default App;