import React, { useState, useEffect } from "react";
import { addDataToCerti } from "../utils/converter";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


function DashForm() {
  const [logo, setLogo] = useState("https://i.ibb.co/cDNy1Jq/6c4baa6e-3e9f-4919-b1a7-b8622892cf84file-741123.webp");
  const [sign, setSign] = useState("https://i.ibb.co/23yn7dW/Whats-App-Image-2022-09-15-at-12-35-01-AM.jpg");
  const [Name, setName] = useState("");
  const [isEnable, setEnable] = useState(true);
  //   const [username, setUsename] = useState("");
  const [certiTemplate, setCertiTemplate] = useState({});
  let { id } = useParams();
  const onSubmit = (e) => {
    e.preventDefault();
    setEnable(false)
    const data = {
      Name,
    };
    const pictData = {
      institutionLogo: logo,
      institutionSignature: sign,
    };
    addDataToCerti(certiTemplate, data, pictData);
  };
  useEffect(() => {
    fetch("https://api-certi-portal.herokuapp.com/api/template/" + id).then(
      (data) => {
        data.json().then((res) => {
          console.log(res);
          setCertiTemplate(res.data.html);
        });
      }
    );
  }, []);
  return (
    <div className="form-container">
      <h1>Add Your Information</h1>
      <form className="dash-form" onSubmit={onSubmit}>
        <div className="form-group">
          <div>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter Username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <input
            type="text"
            name="logo"
            id="logo"
            placeholder="Enter Link for Logo of Institution"
            onChange={(e) => {
              setLogo(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="sign"
            id="signature"
            placeholder="Enter link for Signature"
            onChange={(e) => {
              setSign(e.target.value);
            }}
          />
        </div>
        <div>
          {/* <input
            type="text"
            name="instname"
            id="institute"
            placeholder="Enter Name of Institution"
            onChange={(e) => {
              setInstname(e.target.value);
            }}
          /> */}
        </div>

        <button type="submit" className="btn btn-primary" disabled={!isEnable}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default DashForm;
