import React from 'react';
import Memes from './Memes';

export function Timeline() {
  const [memes, loading] = Memes();
  return (
    <div className="container">
      <h1>Timeline</h1>
      {loading === "null" ? (<p>Error! couldnt retrieve memes.</p>) : 
        ( 
            memes.map(item => {
            return (
                <div key={item.id}>
                    <br></br>
                    <p>author: {item.name}</p>
                    <p>meme: {item.url}</p>
                    <p>caption: {item.caption}</p>
                    <div>
                        {item.comments.length === 0 ? (<p></p>) : (<p>comments: </p>)}
                        {item.comments.map(comment => {
                            return <p key={comment.id}>{comment.content} - {comment.name}</p>;
                        })}
                    </div>
                </div>
                );}
            )
        )}
    </div>
  );
}
