import React, { useState, useEffect } from "react";
import { addDataToCerti, downloadPpt, issuePpt } from "../utils/converter";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function DashForm() {
 const [certiTemplate, setCertiTemplate] = useState({});
 let { id } = useParams();
  
  useEffect(() => {
    fetch("https://api-certi-portal.herokuapp.com/api/certificate/" + id).then(
      (data) => {
        data.json().then((res) => {
          console.log(res);
          if(document.querySelector("#temp")){
            document.querySelector("#temp").outerHTML=res.data.content;
          }
          else{
              const a=document.createElement("div");
              a.innerHTML=res.data.content
              document.body.appendChild(a);
          }
        });
      }
    );
  }, []);
  return (
    <div className="form-container">
      
    </div>
  );
}

export default DashForm;
