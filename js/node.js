const getMobileApi = () => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
    .then((res) => res.json())
    .then((data) => addMobileApi(data.data.slice(0, 6)));
};
getMobileApi();
const addMobileApi = (mobileApis) => {
  console.log(mobileApis);
  mobileApis.forEach((mobileApi) => {
    const addMobile = document.getElementById("addMobile");
    const div = document.createElement("div");
    div.innerHTML = `<div class="col ">
    <div class="card h-75 border-0 ">
      <div class="d-flex justify-content-center">
          <img src="${mobileApi.image}" class="text-center w-50 card-img-top" alt="...">
      </div>
      <div class="card-body">
        <h5 class="card-title text-center">${mobileApi.phone_name}</h5>
      </div>
    </div>
  </div>`;
    addMobile.appendChild(div);
  });
};

const getValue = () => {
  const error = document.getElementById("error");
  const error1 = document.getElementById("error1");
  const searchField = document.getElementById("searchValue");
  const searchValue = searchField.value;
  searchField.value = "";
  // value checker
  if (!isNaN(searchValue) || searchValue == "") {
    error.innerText = "Please search by name";
  } else {
    let temp;
    fetch(
      `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
    )
      .then((res) => res.json())
      .then((data) => {
        temp = data;
        if (temp.status == false) {
          error1.innerText = "Phone is not found";
          document.getElementById("spinner").style.display = "none";
          document.getElementById("hideAddToCart").style.display = "none";
          document.getElementById("hideAddMobileId").style.display = "none";
        } else {
          fetch(
            `https://openapi.programming-hero.com/api/phones?search=${searchValue}`
          )
            .then((res) => res.json())
            .then((data) => getItems(data.data.slice(0, 20)));
          //
          if (temp.status == true) {
            document.getElementById("hideAddToCart").style.display = "block";
            document.getElementById("hideAddMobileId").style.display = "block";
          }
          error1.innerText = "";
        }
      });
    // spinner
    if ((onclick = "getValue()")) {
      document.getElementById("spinner").style.display = "block";
      document.getElementById("hideCarousel").style.display = "none";
    }
    error.innerText = "";
  }
};

// show 20 phones on display
const getItems = (searchMobiles) => {
  const addMobileId = document.getElementById("addMobileId");
  addMobileId.innerHTML = "";
  const addToCart = document.getElementById("addToCart");
  addToCart.innerHTML = "";
  searchMobiles.forEach((searchMobile) => {
    console.log(searchMobile);
    const div = document.createElement("div");
    div.innerHTML = `<div class="col ">
      <div class="card h-50 border-0 ">
      <div class="d-flex justify-content-center">
         <img src="${searchMobile.image}" class="text-center w-50 card-img-top" alt="...">
      </div>
        <div class="card-body">
          <h5 class="card-title text-center">${searchMobile.phone_name}</h5>
          <h5 class="card-title text-center">brand: ${searchMobile.brand}</h5>
        </div>
        <div class="text-center">
        <a href="#" onclick="getMobileId('${searchMobile.slug}')" class=" text-center btn btn-primary ">More Details</a>
        </div>
      </div>
    </div>`;
    addToCart.appendChild(div);
    // spinner
    if ((onclick = "getValue()")) {
      document.getElementById("spinner").style.display = "none";
    }
  });
};

// get mobiles id
const getMobileId = (mobilesId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${mobilesId}`)
    .then((res) => res.json())
    .then((data) => showMobileId(data.data));
};

// show phone details
const showMobileId = (idDetails) => {
  const addMobileId = document.getElementById("addMobileId");
  addMobileId.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card p-2" style="width: 20rem;">
    <div class="d-flex justify-content-center">
         <img src="${idDetails.image}" class="card-img-top w-50" alt="...">
    </div>
    <div class="card-body">
      <h5 class="card-title">${idDetails.name}</h5>
      <p>${
        idDetails.releaseDate ? idDetails.releaseDate : "Not found Release Date"
      }</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item"> 
        <b>ChipSet: </b>  ${idDetails.mainFeatures.chipSet} <br>
        <b>DisplaySize: </b>  ${idDetails.mainFeatures.displaySize} <br>
        <b>Memory: </b>  ${idDetails.mainFeatures.memory} <br>
        <b>Storage: </b>  ${idDetails.mainFeatures.storage} <br>
        </li>
      <li class="list-group-item"> <b>Sensors: </b>  ${
        idDetails.mainFeatures.sensors
      }</li>
      <li class="list-group-item"> 
        <b>Bluetooth: </b>  ${
          idDetails.others ? idDetails.others.Bluetooth : "not found"
        } <br>
        <b>GPS: </b>   ${
          idDetails.others ? idDetails.others.GPS : "not found"
        } <br>
        <b>NFC: </b>   ${
          idDetails.others ? idDetails.others.NFC : "not found"
        } <br>
        <b>Radio: </b>   ${
          idDetails.others ? idDetails.others.Radio : "not found"
        } <br>
        <b>USB: </b>   ${
          idDetails.others ? idDetails.others.USB : "not found"
        } <br>
        <b>WLAN: </b>   ${
          idDetails.others ? idDetails.others.WLAN : "not found"
        } 
      </li>
    </ul> 
  </div>
  `;
  addMobileId.appendChild(div);
};

// **************//
