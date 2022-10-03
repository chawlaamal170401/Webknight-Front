import Carousel from "react-bootstrap/Carousel";
import React from "react";
import pic from "../img.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <div className="dash-container">
            <div className="dash-header">
                <h1>Hello</h1>
                <input type="search" placeholder="Search Certificate using id" />
                <div className="dash-icon">
                    <a href="#">
                        <FaRegUserCircle size={50} />
                    </a>
                    <a href="#">
                        <MdLogout size={50} />
                    </a>
                </div>
            </div>
            <div className="templates">
                <Carousel variant="dark">
                    <Carousel.Item interval={1000}>
                        <Link to="/form/1234">
                            <img className="d-block w-50" src={pic} alt="First slide" />
                        </Link>
                    </Carousel.Item>
                    <Carousel.Item interval={500}>
                        <img className="d-block w-50" src={pic} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-50" src={pic} alt="Third slide" />
                    </Carousel.Item>
                </Carousel>
            </div>

            <div className="dash-grid">
                <h4>History</h4>
                <div className="dash-certi">
                    <a href="#">
                        <TbCertificate size={40} />
                        Cid
                    </a>
                    <a href="#">
                        <TbCertificate size={40} />
                        Cid
                    </a>
                    <a href="#">
                        <TbCertificate size={40} />
                        Cid
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
