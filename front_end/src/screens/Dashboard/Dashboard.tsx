import HeroSection from "../../components/Dashboard/HeroSection";
import Vision from "../../components/Dashboard/Vision";
import HowItWorks from "../../components/Dashboard/HowItWorks";
import Investment from "../../components/Dashboard/Investment";
import Strengths from "../../components/Dashboard/Strengths";
import TransactionDetail from "../../components/Dashboard/TransactionDetail";
import Faq from "../../components/Dashboard/Faq";

const Dashboard = () =>{
    return(
        <>
            <HeroSection />
            <Vision />
            <HowItWorks />
            <Investment />
            <Strengths />
            {/* <TransactionDetail /> */}
            <Faq />
        </>
    );
}

export default Dashboard;