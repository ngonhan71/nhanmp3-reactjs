import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton"
import NhanMp3Card from "../../components/NhanMp3Card";
import homeApi from "../../api/homeApi";

function Top100Page() {
  const [sectionNoiBat, setSectionNoiBat] = useState({});
  const [sectionVietNam, secSectionVietNam] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await homeApi.getTop100();
        console.log(data)
        setSectionNoiBat(data.dataFromZingMp3.data[0])
        secSectionVietNam(data.dataFromZingMp3.data[1])
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // console.log({sectionNoiBat, sectionVietNam});

  return (
    <div className="home-page page">
      <div className="top100" style={{marginTop: 90}}>
        <Container>
          <Row>
            <Col xl={12}>
              <h2 className="title">{sectionNoiBat.title}</h2>
              <Row>
                {sectionNoiBat.items ? (
                  sectionNoiBat.items.map((item) => (
                    <Col xl={2} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <Skeleton height={170} count={2} style={{margin: '10px 0'}} />
                )}
              </Row>
            </Col>
            <Col xl={12} style={{marginTop: 20}}>
              <h2 className="title">{sectionVietNam.title}</h2>
              <Row>
                {sectionVietNam.items ? (
                  sectionVietNam.items.map((item) => (
                    <Col xl={2} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <Skeleton height={170} count={2} style={{margin: '10px 0'}} />
                )}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Top100Page;
