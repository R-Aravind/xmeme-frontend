import React, { useState, useEffect } from 'react';
import Basic from './Form'
import Card from './Card'

export const apiUrl = "http://3.21.6.196";

function App() {
  
  const [memeID, setMemeID] = useState()
  const [commentID, setCommentID] = useState();
  const [likeID, setLikeID] = useState();
  const [updateMemeID, setUpdateMemeID] = useState();

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
  }, [likeID, memeID, commentID, updateMemeID])

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

async function updateMeme(meme) {
  try {
      const response = await fetch(`${apiUrl}/memes/`, {
          method: "PATCH",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify(meme)
      });
      const json = await response.json();
      setUpdateMemeID(`${json.id}+${json.caption}+${json.url}`);
      alert("Meme updated");
  } catch (error) {
    setUpdateMemeID(`error : ${error}`);
  }
  return [updateMemeID];
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
        memes.length === 0 ? (
          <div className="card">
            <img className="mx-auto" src="https://i.kym-cdn.com/photos/images/newsfeed/001/668/803/f75.jpg" alt="sad meme"></img>
          </div>
          ) :
          ( memes.map(item => (
            <Card
            key= {item.id}
            postLike={postLike}
            postComment={postComment}
            updateMeme={updateMeme}
            id={item.id}
            name={item.name}
            url={item.url}
            caption={item.caption}
            likes={item.likes}
            comments={item.comments}
            />
        )))
      )}
      </div>
    </div>

    </div>
  );
}

export default App;