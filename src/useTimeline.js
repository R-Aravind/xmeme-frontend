import React from 'react';

const useTimeline = (memes, loading) => {

    const commentID = 1;

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
            <button className="card-button">{item.likes} Likes</button>
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
            <div className="w-full mt-5">
            <input type="text" placeholder="Username" className="card-input" />
            <input type="text" placeholder="Post a comment" className="card-input" />
            <button className="card-comment-button">Post</button>
            </div>
        </div>
        ))
        )
    }
    </div>

    );

    return [commentID, Timeline]
}

export default useTimeline;