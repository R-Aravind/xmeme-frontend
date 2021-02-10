import React, { useState, useEffect } from 'react';
import { apiUrl }  from './App';
import useMemeForm from './useMemeForm';
import useTimeline from './useTimeline';

const XMemes = () => {
  const [loading, setLoading] = useState("");    
  const [memes, setMemes] = useState([]);
  
  const [memeID, MemeForm] = useMemeForm()
  const [commentID, Timeline] = useTimeline(memes, loading);

  async function fetchMemes() {
    try {
      setLoading("true")
      const response = await fetch(`${apiUrl}/memes/`);
      const json = await response.json();
      setMemes(json.map(item => item))
    } catch (error) {
      setLoading("false");
    }
  }

  useEffect(() => {
    fetchMemes();
  }, [memeID, commentID])

  return (
    <div className="md:flex">
      <MemeForm/>
      <Timeline/>
    </div>
  );
}

export default XMemes;