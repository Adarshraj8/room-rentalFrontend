import AIChatbot from "./Chatbot";
const Footer = () => {
    return (
        <footer>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
            ></link>
            <div className="container footer-wrapper">
             
            <div className="copyright">© RoomRent 2025. All Rights Reserved.</div>

                <div className="icon-wrapper">
                    <a href="https://x.com/AdarshR51591018">
                        <i className="fa-brands fa-twitter icon"></i>
                    </a>
                    <a href="https://www.instagram.com/adarshraj8877/">
                        <i className="fa-brands fa-instagram icon"></i>
                    </a>
                    <a href="mailto:adarshrajgr2016@gmail.com">
                        <i className="fa-regular fa-envelope icon"></i>
                    </a>
                </div>
            </div>
            <div className="ai"><AIChatbot/></div>
            <div className="support">
            <p>Email: support@roomrental.com</p>
            <p>Phone: +91 6201478724</p>
            </div>
        </footer>
    );
};
export default Footer;
