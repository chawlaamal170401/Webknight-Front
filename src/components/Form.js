import React, { useState,useEffect } from "react";
import { addDataToCerti } from "../utils/converter";
function Form() {
  const [logo, setLogo] = useState("");
  const [sign, setSign] = useState("");
  const [instname, setInstname] = useState("");
  const [username, setUsename] = useState("");
  const [certiTemplate,setCertiTemplate] = useState({})
  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      logo,
      sign,
      instname,
      username,
    };
    addDataToCerti(certiTemplate,data);
  };
  useEffect(()=>{
    fetch("https://api-certi-portal.herokuapp.com/api/certificate/1").then((data)=>{
        data.json().then((res)=>{
            console.log(res)
            setCertiTemplate(res.data.content)
        })
    })
  },[])
  return (
    <form className="" onSubmit={onSubmit}>
      <input type="text" name="logo" id="" onChange={(e)=>{setLogo(e.target.value)}}/>
      <input type="text" name="sign" id="" onChange={(e)=>{setSign(e.target.value)}}/>
      <input type="text" name="instname" id="" onChange={(e)=>{setInstname(e.target.value)}}/>
      <input type="text" name="username" id="" onChange={(e)=>{setUsename(e.target.value)}}/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
