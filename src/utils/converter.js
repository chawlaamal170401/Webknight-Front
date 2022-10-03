export const addDataToCerti = (certificateTemplate, data, pictData) => {
  let a = document.createElement("div");
  console.log(typeof certificateTemplate);
  a.innerHTML = certificateTemplate;
  //   a.style.display = "none";
  document.body.appendChild(a);
  for (let i in data) {
    if (document.querySelector("." + i))
      document.querySelector("." + i).innerHTML = data[i];
  }

  for (let i in pictData) {
    if (document.querySelector("." + i))
      document.querySelector("." + i).src = pictData[i];
  }

  // eslint-disable-next-line no-undef
  domtoimage
    .toJpeg(document.getElementById("temp"), { quality: 0.95 })
    .then(function (dataUrl) {
      var link = document.createElement("a");
      link.download = "my-image-name.jpeg";
      link.href = dataUrl;
      link.click();
    });
};
export const checkUser=async()=>{
    const token=localStorage.getItem("token");
    const url = "https://api-certi-portal.herokuapp.com/auth/me";
    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization":"Bearer "+token
      },
    };
    const response = await fetch(url, options);
    if(response.status!==200)return null;
    const responseData = await response.json();
    return responseData.data;
}