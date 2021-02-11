import React from 'react';
import CommentForm from './CommentForm';

const Card = (props) => {
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
            <button className="ml-2 card-button">Comment</button>
            </div>

            {props.comments.length === 0 ? (<p></p>) : (
                <div className="h-32 mt-2 overflow-y-auto text-sm">
                { props.comments.map(comment => (
                    <div key={comment.id}>    
                    <p className="mt-2 font-semibold">{comment.name}</p>
                    <p>{comment.content}</p>
                    </div>
                ))
                }            
                </div>    
                
            )}
            {/* Comment Form */}
            <CommentForm
                postComment={props.postComment}
                id={props.id}
            />
        </div>
    )
}

export default Card;
