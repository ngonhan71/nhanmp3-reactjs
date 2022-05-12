import './App.css';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import HomePage from './pages/HomePage';
import Top100Page from './pages/Top100Page';
import AlbumPage from './pages/AlbumPage'
import SearchPage from './pages/SearchPage'
import Header from './components/Header';
import NhanMp3PlayerControl from './components/NhanMp3PlayerControl';

function App() {

  console.log('re-render app')

  const isPlaying = useSelector(state => state.playerControl.isPlaying)

  return (
    <div className="App">
      <Header />
      {isPlaying && <NhanMp3PlayerControl />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/top100" element={<Top100Page />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/tim-kiem/tat-ca" element={<SearchPage type="all" />} />
        <Route path="/tim-kiem/bai-hat" element={<SearchPage type="song" />} />
      </Routes>
    </div>
  );
}

export default App
