import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-grid-system";
import Banner from "../../components/Banner";
import NhanMp3Card from "../../components/NhanMp3Card";
import homeApi from "../../api/homeApi";

function HomePage() {

  const [sectionCoTheBanMuonNghe, setSectionCoTheBanMuonNghe] = useState({});
  const [sectionNhacMoiMoiNgay, setSectionNhacMoiMoiNgay] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPage1 = await homeApi.getHome(1);
        const dataPage2 = await homeApi.getHome(2);
        setSectionCoTheBanMuonNghe(dataPage1.dataFromZingMp3.data.items[3])
        setSectionNhacMoiMoiNgay(dataPage2.dataFromZingMp3.data.items[1])
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home-page page">
      <Banner />
      <div>
        <Container>
          <Row>
            <Col xl={12}>
              <h2 className="title">{sectionCoTheBanMuonNghe.title}</h2>
              <Row>
                {sectionCoTheBanMuonNghe.items ? (
                  sectionCoTheBanMuonNghe.items.map((item) => (
                    <Col xl={2} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <h1>Loading...</h1>
                )}
              </Row>
            </Col>

            <Col xl={12} style={{marginTop: 20}}>
              <h2 className="title">{sectionNhacMoiMoiNgay.title}</h2>
              <Row>
                {sectionNhacMoiMoiNgay.items ? (
                  sectionNhacMoiMoiNgay.items.map((item) => (
                    <Col xl={2} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <h1>Loading...</h1>
                )}
              </Row>
            </Col>

          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HomePage;
