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
        <div class="d-flex justify-content-center">
          <a href="#" onclick="getMobileId('${searchMobile.slug}')" class=" text-center btn btn-primary ">More Details</a>
          <img onclick="addToLove()" class="small-item1 ms-2" type="button" src="img/love.png" alt="" />
          <img class="small-item ms-2" type="button" src="img/cart.png" alt="" />
        </div>
        
        </div>
      </div>
    </div>`;
    addToCart.appendChild(div);
    // spinner
    if ((onclick = "getValue()")) {
      document.getElementById("spinner").style.display = "none";
      // document.getElementById("modal-Id").style.display = "block";
    }
  });
};

// add to like
const addToLove = () => {
  console.log("clicked");
  document.getElementById("love-circle").style.display = "block";
};
// get mobiles id
const getMobileId = (mobilesId) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${mobilesId}`)
    .then((res) => res.json())
    .then((data) => showMobileId(data.data));

  // When the user clicks on details button open it again
  if ((onclick = "getMobileId()")) {
    document.getElementById("modal-Id").style.display = "block";
  }
};

// show phone details
const showMobileId = (idDetails) => {
  const addMobileId = document.getElementById("modal-Id");
  addMobileId.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("add-bg");
  div.innerHTML = `
  <div id="modal" onclick = "modal()">
  <div class="modal-bg">
    <button onclick="crossValue()" class="btn-light crossBtn" id="cross">
      X
    </button>
    <h1>title</h1>
    <ul class="my-ul">
      <li>
        <b>ChipSet: </b> Find Send Sms Usa at Shopwebly, the Website to
        Compare Prices! Find and Compare Send Sms Usa Online. Save Now at
        Shopwebly! Many Products. Easy Acces. Quick Results.
      </li>
      <li><b>ChipSet:</b></li>
      <li><b>ChipSet:</b></li>
    </ul>
  </div>
</div>
  `;
  addMobileId.appendChild(div);
};
// When the user clicks on <span> (x), close the modal
const crossValue = () => {
  if ((onclick = "crossValue()")) {
    document.getElementById("modal-Id").style.display = "none";
  }
};
// When the user clicks anywhere outside of the modal, close it
const modal = () => {
  if ((onclick = "crossValue()")) {
    document.getElementById("modal-Id").style.display = "none";
  }
};

// **************//
