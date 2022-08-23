import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const HeroSection = () =>{
    return(
        <>
            <section className="hero-section" >
                <Container>
                    <Row className="justify-content-center" >
                        <Col xl={8} lg={8} md={10} sm={12} >
                            <div>
                                <div className="hero-content">
                                    <h4>Invest Funds <br/>on <span>Astra</span></h4>
                                    <p>Lorem Ipsum is simply dummy text of the printing 
                                    and typesetting industry. Lorem Ipsum has been the 
                                    industry's standard dummy text ever since the.</p>
                                    <Link to="/transaction" className="common-btn hero-launch-btn" >Launch App</Link>
                                    <div className="convert-investment">
                                        <p>Convert Investment</p>
                                        <h5>000,000,000,</h5>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default HeroSection;