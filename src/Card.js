import React, { useState } from 'react';
import CommentForm from './CommentForm';

const Card = (props) => {

    const [showComments, setShowCommments] = useState(false);
    
    return (
        <div className="card" key={props.id}>
            <img src={props.url} className="mx-auto" alt="" />
            <p className="mt-5 font-semibold text-blue-500 text-md">{props.name}</p>
            <p className="w-full mt-2 text-sm">{props.caption}</p>

            <div className="mt-5 md:flex">
            <button className="card-button" 
                onClick={e => {
                    const like = {"meme_id": props.id}
                    props.postLike(like, props.likes).then(() => {
                    });
                }}
            >
                {props.likes} Likes
            </button>
            <button className="ml-2 card-button"
                onClick={e=> {
                    setShowCommments(!showComments)
                }}
            >
                {props.comments.length} Comments
            </button>
            </div>
            {showComments ? (
            <div>
            {props.comments.length === 0 ? (<p></p>) : (
                <div className="mt-2 overflow-y-auto text-sm max-h-32">
                { props.comments.map(comment => (
                    <div key={comment.id}> 
                    <p className="mt-2 font-semibold">{comment.name}</p>
                    <p>{comment.content}</p>
                    </div>
                ))
                }            
                </div>    
                
            )}

            <CommentForm
                postComment={props.postComment}
                id={props.id}
            />
            </div>
            ) : (
                <div></div>
            )}

        </div>
    )
}

export default Card;
