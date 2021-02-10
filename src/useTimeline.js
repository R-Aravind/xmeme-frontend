import React, { useState } from 'react';
import { apiUrl } from './App'

const useTimeline = (memes, loading) => {

    const [commentID, setCommentID] = useState();
    const [likeID, setLikeID] = useState();
    const [like, setLike] = useState({
        "meme_id": ""
    });
    const [comment, setComment] = useState({
        "name": "",
        "content": "",
        "meme_id": ""
      });

    async function postComment() {
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
                    // eslint-disable-next-line no-console
                    console.log(comment);
        }
        return [commentID];
    }

    async function postLike() {
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
            setLikeID(json.id);
        } catch (error) {
          setLikeID(`error : ${error}`);
        }
        return [likeID];
    }
      
    const Timeline = () => (
    <div className="p-5 md:overflow-y-auto md:h-screen md:p-20 md:w-2/4">
    
    { loading === "false" ? (<p>Error! couldnt retrieve memes.</p>) : 
        ( 
        memes.map(item => (
            <div className="card" key={item.id}>
            <img src="https://picsum.photos/1000/300" className="mx-auto" alt="" />
            <p className="mt-5 font-semibold text-blue-500 text-md">{item.name}</p>
            <p className="w-full mt-2 text-sm">{item.caption}</p>

            <div className="mt-5 md:flex">
            <button className="card-button" 
                onClick={e => {
                    setLike((like) => ({...like, meme_id: item.id}));
                    postLike(like).then(() => {
                        alert("Liked Meme");
                    });
                }}
            >
                {item.likes} Likes
            </button>
            <button className="ml-2 card-button">Comment</button>
            </div>

            {item.comments.length === 0 ? (<p></p>) : (
                <div className="h-32 mt-2 overflow-y-auto text-sm">
                { item.comments.map(comment => (
                    <div key={comment.id}>    
                    <p className="mt-2 font-semibold">{comment.name}</p>
                    <p>{comment.content}</p>
                    </div>
                ))
                }            
                </div>    
                
            )}
            <form className="w-full mt-5"            
                onSubmit={e => {
                    e.preventDefault();
                    setComment((comment) => ({...comment, meme_id: item.id}))
                    postComment(comment).then( () => {
                        alert("Comment posted");
                    })}   
                }
            >
            <input type="text" placeholder="Username" className="card-input" 
                value={comment.name}
                onChange={e =>{
                    e.persist()
                    setComment((comment) => ({...comment, name: e.target.value}) );
                  }}
            />
            <input type="text" placeholder="Post a comment" className="card-input" 
                value={comment.content}
                onChange={e =>{
                    e.persist()
                    setComment((comment) => ({...comment, content: e.target.value}) );
                  }}
            />
            <button type="submit" className="card-comment-button">Post</button>
            </form>
        </div>
        ))
        )
    }
    </div>

    );

    return [commentID, likeID, Timeline]
}

export default useTimeline;