import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton"
import NhanMp3Card from "../../components/NhanMp3Card";
import homeApi from "../../api/homeApi";
import { useDispatch, useSelector } from "react-redux";
import { addTop100 } from "../../redux/actions/home"

function Top100Page() {

  const top100NoiBat = useSelector((state) => state.home.top100NoiBat);
  const top100VietNam = useSelector((state) => state.home.top100VietNam);

 
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (JSON.stringify(top100NoiBat) === JSON.stringify({}) || JSON.stringify(top100VietNam) === JSON.stringify({})) {
          console.log('call API TOP 100')
          const data = await homeApi.getTop100();
          dispatch(addTop100({
            top100NoiBat: data.dataFromZingMp3.data[0],
            top100VietNam: data.dataFromZingMp3.data[1]
          }))
        }
       
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch, top100NoiBat, top100VietNam]);

  // console.log({top100NoiBat, top100VietNam});

  return (
    <div className="home-page page">
      <div className="top100" style={{marginTop: 90}}>
        <Container>
          <Row>
            <Col xl={12}>
              <h2 className="title">{top100NoiBat.title}</h2>
              <Row>
                {top100NoiBat.items ? (
                  top100NoiBat.items.map((item) => (
                    <Col xl={2} xs={6} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <Skeleton baseColor="#ccc" duration={1} height={170} count={2} style={{margin: '10px 0'}} />
                )}
              </Row>
            </Col>
            <Col xl={12} style={{marginTop: 20}}>
              <h2 className="title">{top100VietNam.title}</h2>
              <Row>
                {top100VietNam.items ? (
                  top100VietNam.items.map((item) => (
                    <Col xl={2} xs={6} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <Skeleton baseColor="#ccc" duration={1} height={170} count={2} style={{margin: '10px 0'}} />
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
