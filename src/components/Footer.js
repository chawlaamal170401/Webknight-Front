import React from "react";
import "./footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <div className="fLists">
                <ul className="fList">
                    <li className="fListItem">Authentication</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Unique Certificates</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Interesting Templates</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Validate Certificates</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">History of Users</li>
                </ul>
            </div>
            <div className="fText">Copyright © 2022 Web Warriors</div>
        </div>
    );
};

export default Footer;