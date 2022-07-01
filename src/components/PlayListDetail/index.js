import { Container, Row, Col } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
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
          <Col xl={4} xs={12}>
            <div className="playlist-header">
                <div className="media-left">
                  <div className={`nhanmp3-card-image ${(!isPaused && currentAlbum === id) ? 'running' : ''}`}>
                      {data?.thumbnail ? <img src={data.thumbnail} alt="" /> :
                      <Skeleton baseColor="#ccc" duration={1} height={300} />}
                  </div>
                </div>
                <div className="media-content">
                  <div className="content-top">
                    <h3 className="title">{data?.title ? data.title : <Skeleton baseColor="#ccc" duration={1} height={50} style={{margin: '5px 0'}} />}</h3>
                    {data ? <p className="release">Cập nhật: {data?.releaseDate ? data.releaseDate : helper.getNow()}</p> : ''}
                    {data?.artistsNames ? <p>{data.artistsNames}</p> : <Skeleton baseColor="#ccc" duration={1} height={25} style={{margin: '5px 0'}} />}
                    {data?.like ? <p>{helper.formatLike(data.like)}</p> : <Skeleton baseColor="#ccc" duration={1} height={25} style={{margin: '5px 0'}} />}
                  </div>
                </div>
            </div>
          </Col>
          <Col xl={8} xs={12}>
              <div className="playlist-content">
                <div className="description">
                  <span>{data?.description ? data?.description : <Skeleton baseColor="#ccc" duration={1} height={40} />}</span>
                </div>
                {data?.song?.items ? (
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
                      data?.song.items &&
                      data?.song.items.map((item, index) => 
                        item.isWorldWide && <Song key={item.encodeId} index={index} data={item} isPlay={currentSong === item.encodeId} />
                      )
                    }
                  </div>
                </div>
                ) : <Skeleton baseColor="#ccc" duration={1} count={10} width={400} height={80} style={{margin: '5px 0'}} />}
            </div>
          </Col>
         </Row>
       </Container>

      </div>

    )

}

export default memo(PlayListDetail)