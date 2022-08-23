import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import TransactionDetail from "../Dashboard/TransactionDetail";
import "./Transaction.css";

const Transaction = () =>{
    return(
        <>
            <section className="transaction-main-hero" >
                <Container>
                    <Row className="justify-content-center" >
                        <div className="hero-content">
                            <h4>Transaction History</h4>
                        </div>
                        <TransactionDetail />
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default Transaction;