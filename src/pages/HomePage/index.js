import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import Banner from "../../components/Banner";
import NhanMp3Card from "../../components/NhanMp3Card";
import homeApi from "../../api/homeApi";
import { useDispatch, useSelector } from "react-redux";
import { addSections } from "../../redux/actions/home";

function HomePage() {
  const sectionOne = useSelector((state) => state.home.sectionOne);
  const sectionTwo = useSelector((state) => state.home.sectionTwo);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("callAPI");
        const dataPage1 = await homeApi.getHome(1);
        const dataPage2 = await homeApi.getHome(2);
        dispatch(
          addSections({
            sectionOne: dataPage2.dataFromZingMp3.data.items[0],
            sectionTwo: dataPage1.dataFromZingMp3.data.items[4],
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (
      Object.keys(sectionOne).length === 0 ||
      Object.keys(sectionTwo).length === 0
    ) {
      fetchData();
    }
  }, [dispatch, sectionOne, sectionTwo]);

  return (
    <div className="home-page page">
      <Banner />

      <div>
        <Container>
          <Row>
            <Col xl={12}>
              <h2 className="title">{sectionOne.title}</h2>
              <Row>
                {sectionOne.items ? (
                  sectionOne.items.map((item) => (
                    <Col xl={2} xs={6} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <Skeleton
                    baseColor="#ccc"
                    duration={1}
                    height={200}
                    count={2}
                    style={{ margin: "10px 0" }}
                  />
                )}
              </Row>
            </Col>

            <Col xl={12} style={{ marginTop: 20 }}>
              <h2 className="title">{sectionTwo.title}</h2>
              <Row>
                {sectionTwo.items ? (
                  sectionTwo.items.map((item) => (
                    <Col xl={2} xs={6} key={item.encodeId}>
                      <NhanMp3Card data={item} />
                    </Col>
                  ))
                ) : (
                  <Skeleton
                    baseColor="#ccc"
                    duration={1}
                    height={200}
                    count={2}
                    style={{ margin: "10px 0" }}
                  />
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
