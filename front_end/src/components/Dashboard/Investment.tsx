import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Investment = () =>{
    return(
        <>
            <section className="vision-section">
                <Container>
                    <Row className="justify-content-center" >
                        <Col xl={6} lg={8} md={10} sm={12} >
                            <div className="vision-content">
                                <div className="title" >
                                    <h4>Investments</h4>
                                    <span></span>
                                </div>
                                <img src={logo} alt="logo" />
                                <p>Our highly specialized investment team searches for the best
                                opportunities in the market through algorithms to offer the best
                                rates to our clients. Our investments are conservative with a longterm vision.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Investment;