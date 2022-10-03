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
