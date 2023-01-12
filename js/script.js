function calculateLuminosity(){
  var liters = document.getElementById("litros").value;
  var watts = document.getElementById("watts").value;

  var total = (watts * 70)/liters; 

  document.getElementById("luminosidad").value=total;
}

function showTemperature(){
  var x = document.getElementById("temperature");

  x.style.display = "none"

  if(x.style.display == "none"){
    x.style.display = "flex";
  }
}

function hideTemperature(){
  var x = document.getElementById("temperature");

  if(x.style.display == "flex"){
    x.style.display = "none";
  }
}

function loadFishData(){

  fetch("https://josemaxp.github.io/jsonapi/senderoscadiz.json")
  .then(function (response){
    return response.json();
  })
  .then(function (data){
    for(var i = 0; i<data.records.length; i++){
      document.getElementById("info").innerHTML += "<div class='swiper-slide card'><h5>"+data.records[i].NOMBRE+"</h5>"+
      "<div class='pra'><p class='cvtext' >"+data.records[i].NOMBRE+"</p></div></div>";
    }
  })
}

var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetweenSlides: 30,
  slidesPerGroup: 3,
  loop: false,
  loopFillGroupWithBlank: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});