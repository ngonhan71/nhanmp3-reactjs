import { Container, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton'
import Song from '../../components/Song'
import homeApi from '../../api/homeApi'
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './SearchPage.css'

function SearchPage({type}) {

  const [dataSearch, setDataSearch] = useState()
  const [counterSong, setCounterSong] = useState()
  const [loading, setLoading] = useState()

  const [searchParams] = useSearchParams()

  const keyword = searchParams.get('q')

  useEffect(() => {

    const fetchData = async () => {
      try {
          setLoading(true)
          let data = {}
          if (type === 'all') {
            data = await homeApi.searchAll(keyword)
            setCounterSong(data.dataFromZingMp3.data.counter.song)
            setDataSearch(data.dataFromZingMp3.data.songs.filter((item) => item.streamingStatus === 1))
          } else {
            data = await homeApi.searchSong({key: keyword, page: 1})
            setDataSearch(data.dataFromZingMp3.data.items.filter((item) => item.streamingStatus === 1))
          }
          setLoading(false)
      } catch (error) {
          setLoading(false)
      }
    }

    fetchData()


  }, [keyword, type])

  return (
    <div className="search-page page">
      <div className="result-container">
        <Container>
          <Row>
            <Col xl={12}>
              <div className="search-navbar">
                <h2 className="title">Kết Quả Tìm Kiếm</h2>
                <div className="navbar">
                  <ul className="nav">
                      <li className={`nav-item ${type === 'all' ? 'active' :'' }`}>
                          <Link to={`/tim-kiem/tat-ca?q=${keyword}`}>TẤT CẢ</Link>
                      </li>
                      <li className={`nav-item ${type === 'song' ? 'active' :'' }`}>
                          <Link to={`/tim-kiem/bai-hat?q=${keyword}`}>
                           BÀI HÁT {counterSong && <span className="counter-song">{counterSong}</span>}
                          </Link>
                      </li>
                  </ul>
                </div>
              </div>
              {type === 'all' && 
                  <div className="song-list-content">
                  {
                    loading ? <Skeleton baseColor="#ccc" duration={1} height={85} count={5} style={{margin: '5px 0'}} /> :
                    (dataSearch && dataSearch.length > 0 ?
                      dataSearch.map(song => 
                        <Song key={song.encodeId} data={song} isSearching={true} isPlay={false} />)
                      : <h1>Not Found</h1>
                    )
                  }
                </div>
              }
              {
                type === 'song' &&
                  <div className="song-list-content">
                  {
                    loading ? <h1>Loading...</h1> :
                    (dataSearch && dataSearch.length > 0 ?
                      dataSearch.map(song => 
                        <Song key={song.encodeId} data={song} isSearching={true} isPlay={false} />)
                      : <h1>Not Found</h1>
                    )
                  }
                </div>
              }
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default SearchPage;
