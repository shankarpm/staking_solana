import { useState } from "react";
import { Container , Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.png";
import "./Header.css";
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';

const Header = () =>{
    const location = useLocation();
    const [navbarMain, setNavbar] = useState(false);
    const changeBackground = () =>{
        if(window.scrollY >= 80){
            setNavbar(true)
        } else{
            setNavbar(false);
        }
    };
    window.addEventListener('scroll', changeBackground);
    return(
        <>
            {/* <div className="header" >
                <Container>
                    <Navbar fixed="top" className="header-section" />
                        <img src={logo} alt="logo" className="navbar-brand" />
                        <Link to="/" className="common-btn" >Launch app</Link>
                    </Navbar>
                </Container>
            </div>    */}

            <div className="header">
                <Navbar fixed="top" className={ navbarMain ? 'navbarMain active' : 'navbarMain' }>
                    <Container>
                        <Link to="/"><img src={logo} alt="logo" className="navbar-brand" /></Link>
                        { location.pathname != "/transaction"?(
                            <Link to="/transaction" className="common-btn" >Launch app</Link>
                        ):(
                            <WalletModalProvider>
                                <WalletMultiButton />
                            </WalletModalProvider>
                        )}
                    </Container>
                </Navbar>
            </div>
        </>
    );
}

export default Header;