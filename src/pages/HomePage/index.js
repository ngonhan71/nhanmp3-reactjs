import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Skeleton from 'react-loading-skeleton'
import Banner from "../../components/Banner";
import NhanMp3Card from "../../components/NhanMp3Card";
import homeApi from "../../api/homeApi";
import { useDispatch, useSelector } from "react-redux";
import { addSections } from "../../redux/actions/home"

function HomePage() {


  const sectionCoTheBanMuonNghe = useSelector((state) => state.home.sectionCoTheBanMuonNghe);
  const sectionNhacMoiMoiNgay = useSelector((state) => state.home.sectionNhacMoiMoiNgay);

 
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sectionNhacMoiMoiNgay.items && !sectionNhacMoiMoiNgay.items) {
          console.log('callAPI')
          const dataPage1 = await homeApi.getHome(1);
          const dataPage2 = await homeApi.getHome(2);
          dispatch(addSections({
            sectionCoTheBanMuonNghe: dataPage1.dataFromZingMp3.data.items[3],
            sectionNhacMoiMoiNgay: dataPage2.dataFromZingMp3.data.items[1]
          }))
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, sectionCoTheBanMuonNghe, sectionNhacMoiMoiNgay]);


  return (
    <div className="home-page page">
      <Banner />
      
      <div>
        <Container>
          <Row>
            <Col xl={12}>
              <h2 className="title">{sectionNhacMoiMoiNgay.title}</h2>
              <Row>
                {sectionNhacMoiMoiNgay.items ? (
                  sectionNhacMoiMoiNgay.items.map((item) => (
                    <Col xl={2} xs={6} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : <Skeleton baseColor="#ccc" duration={1} height={200} count={2} style={{margin: '10px 0'}} />
                }
              </Row>
            </Col>

            <Col xl={12} style={{marginTop: 20}}>
              <h2 className="title">{sectionCoTheBanMuonNghe.title}</h2>
              <Row>
                {sectionCoTheBanMuonNghe.items ? (
                  sectionCoTheBanMuonNghe.items.map((item) => (
                    <Col xl={2} xs={6} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : <Skeleton baseColor="#ccc" duration={1} height={200} count={2} style={{margin: '10px 0'}} /> }
              </Row>
            </Col>

          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
