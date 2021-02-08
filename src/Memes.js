import { useState, useEffect } from 'react';

const apiUrl = "http://127.0.0.1:8000/api";

function Memes() {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState("false");
  
  useEffect(() => {
    async function fetchMemes() {
      try {
        setLoading("true");
        const response = await fetch(`${apiUrl}/memes/`);
        const json = await response.json();
        setMemes(json.map(item => item))
      } catch (error) {
        setLoading("null");
      }
    }

    fetchMemes();
  }, [])

  return [memes, loading];
}

export default Memes;