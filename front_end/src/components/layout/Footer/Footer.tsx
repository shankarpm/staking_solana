import "./Footer.css";
import twitter from "../../../assets/twitter.svg";
import discord from "../../../assets/discord.svg";

const Footer = () =>{
    return(
        <>
            <footer>
                <ul>
                    <li><a href="#" ><img src={discord} alt="discord" /></a></li>
                    <li><a href="#" ><img src={twitter} alt="twitter" /></a></li>
                </ul>
            </footer>
        </>
    );
}

export default Footer;