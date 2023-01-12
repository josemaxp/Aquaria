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