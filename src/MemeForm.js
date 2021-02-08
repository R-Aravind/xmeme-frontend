import React, { useState } from 'react';
import { apiUrl }  from './App';

export function MemeForm() {
    const [meme, setMeme] = useState({
        "name": "",
        "caption": "",
        "url": ""
      });
    const [memeID, setMemeID] = useState()

    async function postMemes() {
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
        } catch (error) {
          setMemeID(`error : ${error}`);
        }
        return [memeID];
    }

    return (
      <form
        onSubmit={e => {
            e.preventDefault();
            postMemes(meme).then( () => {
                alert("Meme posted")
            })
            }
        }
        >
          <label>Post meme:
            <br></br>
            name: 
            <input type="text" value={meme.name}
              onChange={e =>{
                e.persist()
                setMeme((meme) => ({...meme, name: e.target.value}) );
              }}>
            </input>
            caption: 
            <input type="text" value={meme.caption}
              onChange={e =>{
                e.persist()
                setMeme((meme) => ({...meme, caption: e.target.value}) );
              }}> 
            </input>
            meme url: 
            <input type="text" value={meme.url} 
              onChange={e =>{
                e.persist()
                setMeme((meme) => ({...meme, url: e.target.value}) );
              }}>
              </input>
            <input type="submit"></input>
          </label>        
        </form>
        )
}