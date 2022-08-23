import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import logo from "../../assets/logo.png";

const HowItWorks = () =>{
    return(
        <>
            <section className="vision-section">
                <Container>
                    <Row className="justify-content-center" >
                        <Col xl={6} lg={8} md={10} sm={12} >
                            <div className="vision-content">
                                <div className="title" >
                                    <h4>How it Works</h4>
                                    <span></span>
                                </div>
                                <img src={logo} alt="logo" />
                                <p>The minimum investment is 500 USDC. The net monthly yields
                                range from 2-3%, with a maximum loss of 10% per year.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default HowItWorks;