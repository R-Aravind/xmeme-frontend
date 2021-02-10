import React, { useState } from 'react';
import { apiUrl }  from './App';

const useMemeForm = () => {
    
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

    const Form = () => (
        <div className="form-container">
        <h1 className="mt-10 text-xl">Submit a meme</h1>

        <form 
            className="form"
            onSubmit={e => {
                e.preventDefault();
                postMemes(meme).then( () => {
                    alert("Meme posted");
                })
                }
        }>
            
          <p className="">Username:</p>
          <input
            type="text"
            value={meme.name}
            onChange={e =>{
                e.persist()
                setMeme((meme) => ({...meme, name: e.target.value}) );
              }}
            className="form-input"/>
          <p className="mt-5">Caption:</p>
          <input
            type="text" 
            value={meme.caption}
            onChange={e =>{
                e.persist()
                setMeme((meme) => ({...meme, caption: e.target.value}) );
              }}
            className="form-input"/>
          <p className="mt-5">Meme URL:</p>
          <input
            type="text"
            value={meme.url} 
            onChange={e =>{
                e.persist()
                setMeme((meme) => ({...meme, url: e.target.value}) );
              }}
            className="form-input"/>

          <button
            type="submit"
            className="form-button"
          >
            Submit Meme
          </button>
        </form>

      </div>
    )

    return  [memeID, Form];

}

export default useMemeForm;