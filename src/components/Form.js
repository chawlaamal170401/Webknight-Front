import React, { useState, useEffect } from "react";
import { addDataToCerti } from "../utils/converter";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DashForm() {
  const [logo, setLogo] = useState("");
  const [sign, setSign] = useState("");
  const [instname, setInstname] = useState("");
  const [username, setUsename] = useState("");
  const [certiTemplate, setCertiTemplate] = useState({})
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      logo,
      sign,
      instname,
      username,
    };
    addDataToCerti(certiTemplate, data);
  };
  useEffect(() => {
    fetch("https://api-certi-portal.herokuapp.com/api/certificate/1").then((data) => {
      data.json().then((res) => {
        console.log(res)
        setCertiTemplate(res.data.content)
      })
    })
  }, [])
  return (
    <div className="form-container">
      <h1>Add Your Information</h1>
      <form className="dash-form" onSubmit={onSubmit}>
        <div className="form-group">
          <div>
            <input type="text" name="username" id="username" placeholder="Enter Username" onChange={(e) => { setUsename(e.target.value) }} />
          </div>
          <input type="text" name="logo" id="logo" placeholder="Enter Link for Logo of Institution" onChange={(e) => { setLogo(e.target.value) }} />
        </div>
        <div>
          <input type="text" name="sign" id="signature" placeholder="Enter link for Signature" onChange={(e) => { setSign(e.target.value) }} />
        </div>
        <div>
          <input type="text" name="instname" id="institute" placeholder="Enter Name of Institution" onChange={(e) => { setInstname(e.target.value) }} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>

  );
}

export default DashForm;
