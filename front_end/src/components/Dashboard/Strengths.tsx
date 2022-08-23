import { Col, Container, Row } from "react-bootstrap";
import logo from "../../assets/logo.png";

const Strengths = () =>{
    return(
        <>
            <section className="vision-section">
                <Container>
                    <Row className="justify-content-center" >
                        <Col xl={6} lg={8} md={10} sm={12} >
                            <div className="vision-content">
                                <div className="title" >
                                    <h4>Strengths</h4>
                                    <span></span>
                                </div>
                                <img src={logo} alt="logo" />
                                <p>Thanks to the high specialization, capacity and experience of our
                                team, it allows us to position ourselves in the best way to face the
                                most adverse market conditions.</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Strengths;