import { useState, useEffect } from 'react';
import { apiUrl } from './App';

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