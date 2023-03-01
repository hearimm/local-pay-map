import React, { useEffect, useState } from 'react';
import './App.css';
import KakaoMap from './components/KakaoMap';
import exampleData from './data/example.json';

function App() {

  const [markerList, setMarkerList] = useState([]);
  const handleAddMarker = () => setMarkerList([...exampleData]);

  return (
    <div className="App">
      <button onClick={handleAddMarker}>Search</button>
      <KakaoMap markerPositions={markerList} />
    </div>
  );
}

export default App;
