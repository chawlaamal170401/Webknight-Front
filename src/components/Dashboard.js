import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect } from "react";
import pic from "../img.jpg";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { TbCertificate } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { checkUser } from "../utils/converter";
import Card from 'react-bootstrap/Card';
import Footer from "./Footer"

function Dashboard() {
    const [templates, setTemplates] = useState([]);
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function getUser() {
            const user = await checkUser();
            if (!user) navigate("/login");
        }
        getUser();
        fetch("https://api-certi-portal.herokuapp.com/api/template").then(
            (data) => {
                data.json().then((res) => {
                    setTemplates([...res.data]);
                });
            }
        );
        fetch(
            "https://api-certi-portal.herokuapp.com/api/user/2/certificates"
        ).then((data) => {
            data.json().then((res) => {
                setHistory([...res.data.certificate]);
            });
        });
    }, []);
    const onLogout = () => {
        localStorage.clear();
        navigate("/login");
    };
    return (
        <div className="dash-container">
            <div className="dash-header">
                <h1>certifier</h1>
                <input type="search" placeholder="Search Certificate using id" />
                <div className="dash-icon">
                    <a href="#">
                        <FaRegUserCircle size={50} color="white" />
                    </a>
                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onLogout();
                        }}
                    >
                        <MdLogout size={50} color="white" />
                    </a>
                </div>
            </div>
            <h1>Templates</h1>
            <div className="templates">
                <Carousel variant="dark">
                    {templates.map((item) => {
                        return (
                            <Carousel.Item interval={1000} key={item.id}>
                                <Link to={"/form/" + item.id}>
                                    <img className="d-block w-50" src={pic} alt="First slide" />
                                </Link>
                            </Carousel.Item>
                        );
                    })}
                </Carousel>
            </div>
            <h4>History</h4>

            <div className="dash-grid">
                {history.map((item) => {
                    return (
                        <Card className="dash-certi">
                            <Card.Body>
                                <a href="#">
                                    <TbCertificate size={40} />
                                    {item.id}
                                </a>
                            </Card.Body>
                        </Card>
                    );
                })}
            </div>
            <Footer />
        </div>
    );
}

export default Dashboard;
