import { Container, Row, Col } from 'react-grid-system';
import { memo } from 'react';
import Song from '../Song'
import './PlayListDetail.css'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import helper from '../../helper/NhanMp3';

function PlayListDetail({data}) {

    const { id } = useParams()

    const isPaused = useSelector(state => state.playerControl.isPaused)
    const currentSong = useSelector(state => state.playerControl.currentSong)
    const currentAlbum = useSelector(state => state.playerControl.currentAlbum)
    return (
      
      <div className="playlist-detail-container">
       <Container>
         <Row>
          <Col xl={4}>
            <div className="playlist-header">
                <div className="media-left">
                  <div className={`nhanmp3-card-image ${(!isPaused && currentAlbum === id) ? 'running' : ''}`}>
                      <img src={data.thumbnail} alt="" />
                  </div>
                </div>
                <div className="media-content">
                  <div className="content-top">
                    <h3 className="title">{data.title}</h3>
                    <p className="release">Cập nhật: {data.releaseDate ? data.releaseDate : helper.getNow()}</p>
                    {data.artistsNames && <p>{data.artistsNames}</p>}
                    {data.like && <p>{helper.formatLike(data.like)}</p>}
                  </div>
                </div>
            </div>
          </Col>
          <Col xl={8}>
              <div className="playlist-content">
                <div className="description">
                  <span>{data.description}</span>
                </div>
                <div className="song-list">
                  <div className="song-list-header media">
                    <div className="media-left">
                      <p>Bài hát</p>
                    </div>
                    <div className="media-content">
                      <p>Album</p>
                    </div>

                    <div className="media-right">
                      <p>Thời gian</p>
                    </div>
                  </div>
                  <div className="song-list-content">
                    {
                      data.song.items ?
                      data.song.items.map((item, index) => 
                        <Song key={item.encodeId} index={index} data={item} isPlay={currentSong === item.encodeId} />
                      ): <h1>Loading...</h1>
                    }
                  </div>
                </div>
            </div>
          </Col>
         </Row>
       </Container>

      </div>

    )

}

export default memo(PlayListDetail)