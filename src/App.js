import React from 'react';
import Memes from './Memes';

function App() {
  const [memes, loading] = Memes();
  return (
    <div className="container">
      <h1>XMEME</h1>
      {
        loading === "null" ? (
          <p>Error! couldnt retrieve memes.</p>
        ) : (
          memes.map(item => {
            return (
            <div key={item.id}> 
              <br></br>
              <p>author: {item.name}</p>
              <p>meme: {item.url}</p>
              <p>caption: {item.caption}</p>
              <div>
              </div>
            </div>
            )
          })
        )
      }
    </div>
  );
}

export default App;