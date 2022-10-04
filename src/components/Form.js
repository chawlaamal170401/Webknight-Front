import React, { useState, useEffect } from "react";
import { addDataToCerti, downloadPpt, issuePpt } from "../utils/converter";
import { useParams } from "react-router-dom";
import { checkUser } from "../utils/converter";
import { useNavigate } from "react-router-dom";

function DashForm() {
  const [logo, setLogo] = useState("");
  const [sign, setSign] = useState("");
  const [Name, setName] = useState("");
  const [isEnable, setEnable] = useState(true);
  //   const [username, setUsename] = useState("");
  const [certiTemplate, setCertiTemplate] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();
  const [u_id, setUId] = useState(2);

  const [uploadLogo, setUploadLogo] = useState("");
  const [uploadSign, setUploadSign] = useState("");

  async function getUser() {
    const user = await checkUser();
    if (!user) navigate("/login");
    else return user.id;
  }

  getUser().then((d) => {
    setUId(d);
  });

  const onSubmit = (e) => {
    e.preventDefault();
    setEnable(false);
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

  const handleUpload = async (uploadType) => {
    const formdata = new FormData();
    const fileToUpload = uploadType === "logo" ? uploadLogo[0] : uploadSign[0];

    formdata.append("file", fileToUpload);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    const response = await fetch(
      "https://api-stjudes.herokuapp.com/api/upload",
      requestOptions
    );
    const responseData = await response.json();

    if (response.status === 200) {
      console.log(uploadType);
      console.log(responseData.data);
      if (uploadType === "logo") setLogo(responseData.data);
      else if (uploadType === "sign") setSign(responseData.data);
    } else console.log("Failed to upload");
  };

  return (
    <div className="form-container">
      <h1>Add Your Information</h1>
      <form className="dash-form" onSubmit={onSubmit}>
        <div className="dash-form-item-upload"></div>
        <div className="insti-name">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter Institution Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="dash-form-item-upload">
          <input
            type="text"
            name="logo"
            id="logo"
            placeholder="Enter Link for Logo of Institution"
            value={logo}
            onChange={(e) => {
              setLogo(e.target.value);
            }}
          />
          <input
            className="file-input"
            type="file"
            onChange={(e) => setUploadLogo(e.target.files)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleUpload("logo");
            }}
            className="btn btn-primary"
          >
            Upload
          </button>
        </div>
        <div className="dash-form-item-upload">
          <input
            type="text"
            name="sign"
            id="signature"
            placeholder="Enter link for Signature"
            value={sign}
            onChange={(e) => {
              setSign(e.target.value);
            }}
          />
          <input
            className="file-input"
            type="file"
            onChange={(e) => setUploadSign(e.target.files)}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              handleUpload("sign");
            }}
            className="btn btn-primary"
          >
            Upload
          </button>
        </div>

        <button type="submit" className="btn btn-success" disabled={!isEnable}>
          Submit
        </button>
      </form>
      {isEnable ? (
        <></>
      ) : (
        <>
          <button
            onClick={() => {
              downloadPpt();
            }}
            className="btn btn-primary"
            style={{ marginRight: "50px" }}
          >
            Download
          </button>
          <button
            onClick={() => {
              issuePpt(u_id);
            }}
            className="btn btn-primary"
          >
            Issue
          </button>
        </>
      )}
    </div>
  );
}

export default DashForm;
