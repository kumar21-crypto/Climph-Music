import React from 'react'
import Home from './Pages/Home'
import Browse from './Pages/Browse'
import Trending from './Pages/Trending'
import Albums from './Pages/Albums'
import Artists from './Pages/Artists'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContainer from './Pages/MainContainer'
import { AppContext } from './components/ContextApi'
import AlbumDetail from './Pages/AlbumDetail'
import Sidebar from './components/Sidebar'
import SearchResult from './Pages/SearchResult'

const App = () => {
  return (
    <>
    <AppContext>
      <BrowserRouter>
        <Header />
        <MainContainer>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/browse' element={<Browse />} />
          <Route path='/trending' element={<Trending />} />
          <Route path='/albums' element={<Albums />} />
          <Route path='/artists' element={<Artists />} />
          <Route path='/albumdetail' element={<AlbumDetail />} />
          <Route path='/searchresult' element={<SearchResult />} />
        </Routes>
     </MainContainer>
     {/* <Footer /> */}
      </BrowserRouter>
      </AppContext>


    </>
  );
}

export default App