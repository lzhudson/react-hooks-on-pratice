
import React, { useState, useEffect } from 'react';

export default function App() {

  /*const [repositories, setRepositories] = useState([
    { id: 1, name: 'repo-1' },
    { id: 2, name: 'repo-2' },
    { id: 3, name: 'repo-3' },
  ]);

  function handleAddRepository() {
    setRepositories([...repositories, { id: Math.random(), name: 'Novo repositório' }]);
  }
  */
  const [repositories, setRepositories] = useState([]);
  const [location, setLocation] = useState({});

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);
  
  useEffect(() => {
    async function getRepositories() {
      const response = await fetch('https://api.github.com/users/lzhudson/repos');
      const data = await response.json();
      setRepositories(data);
    }
    getRepositories();
  }, []);


  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(handlePositionReceived);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  function handlePositionReceived({ coords }) {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  }
  return (
    <>
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite && <span>Favorito</span>}
          <button onClick={() => handleFavorite(repo.id)}>{repo.favorite ? 'Desfavoritar' : 'Favoritar'}</button>
        </li>
        ))}
    </ul>
    <button /* onClick={/*handleAddRepository} */ >
      Adicionar repositório
    </button>

    <p>Latitude: {location.latitude}</p>
    <p>Logitude: {location.longitude}</p>
    </>
  );
}