import { Container, Row } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import  { IoMenu } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import { memo, useRef } from 'react'
// import NavBar from '../NavBar';

import './Header.css';
function Header({onOpenSideBar}) {
    console.log('header re-render')

    const navigate = useNavigate()

    const formRef = useRef()
    const inputRef = useRef()

    const handleSubmitSearch = (e) => {
      e.preventDefault()

      const key = inputRef.current.value
      navigate({
        pathname: '/tim-kiem/tat-ca',
        search: `q=${key}`
      })
     
    }

    const handleOpenSideBar = () => {
      if (onOpenSideBar) {
        onOpenSideBar()
      }
    }

    return (
        <header className="header"> 
          <Container>
            <Row style={{alignItems: 'center'}}>
              <button onClick={handleOpenSideBar} className="nhanmp3-btn bar-btn"><IoMenu /></button>
              <div className="search">
                  <form ref={formRef} onSubmit={handleSubmitSearch}>
                    <div className="search-wrapper">
                      <button className="nhanmp3-btn search-btn">
                        <BsSearch />
                      </button>
                      <div className="form-group">
                        <input ref={inputRef} type="text" className="form-control" placeholder="Nhập tên bài hát, nghệ sĩ..." />
                      </div>
                    </div>
                  </form>
                </div>
            </Row>
          </Container>
        </header>
    )

}

export default memo(Header)