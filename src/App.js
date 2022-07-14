import './App.css';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import HomePage from './pages/HomePage';
import Top100Page from './pages/Top100Page';
import AlbumPage from './pages/AlbumPage'
import SearchPage from './pages/SearchPage'
import Header from './components/Header';
import SideBar from './components/SideBar'
import NhanMp3PlayerControl from './components/NhanMp3PlayerControl';
import { useCallback, useState } from 'react';

function App() {

  console.log('re-render app')
  const [isActive, setIsActive] = useState(false)

  const isPlaying = useSelector(state => state.playerControl.isPlaying)

  const handleOpenSideBar = useCallback(() => {
    setIsActive(!isActive)
  }, [isActive])

  const handleCloseSideBar = useCallback(() => {
    setIsActive(false)
  }, [])


  return (
    <div className="App">
      <Header onOpenSideBar={handleOpenSideBar} />
      <SideBar isActive={isActive} onCloseSideBar={handleCloseSideBar} />
      {isPlaying && <NhanMp3PlayerControl />}
      <div className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/top100" element={<Top100Page />} />
          <Route path="/album/:id" element={<AlbumPage />} />
          <Route path="/tim-kiem/tat-ca" element={<SearchPage type="all" />} />
          <Route path="/tim-kiem/bai-hat" element={<SearchPage type="song" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App
