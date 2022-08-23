import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Vision = () =>{
    return(
        <>
            <section className="vision-section">
                <Container>
                    <Row className="justify-content-center" >
                        <Col xl={6} lg={8} md={10} sm={12} >
                            <div className="vision-content">
                                <div className="title" >
                                    <h4>Vision</h4>
                                    <span></span>
                                </div>
                                <img src={logo} alt="logo" />
                                <p>Astra was born in times of high inflation in which preserving
                                people's purchasing power is a necessity.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Vision;