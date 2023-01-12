

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


  for(var i = 0; i<data.records.length; i++){
    document.getElementById("info").innerHTML += "<div class='swiper-slide card'><h5>"+data.records[i].NOMBRE+"</h5>"+
    "<div class='pra'><p class='cvtext' >"+data.records[i].NOMBRE+"</p></div></div>";
  }
  
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

/* JSON */

const data = JSON.parse('{"records": [{"id": 1,"NOMBRE": "CERRO DEL ÁGUILA","LONGITUD": "4 kms","TIEMPO DE IDA": "1:30 h.","DIFICULTAD": "Baja","LONGITUDE": "-6.3196114","LATITUDE": "36.848971","DESCRIPCION": "Desde Sanlúcar de Barrameda tomar hacia Bonanza, en dirección norte la CA-9027. Pasada La Algaida, a unos 100 metros, se inicia el sendero.","IMAGEN": "https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5656070/170_SS_03.jpg"},{"id": 2,"NOMBRE": "LAGUNAS DE ESPERA","LONGITUD": "2 kms","TIEMPO DE IDA": "45 min.","DIFICULTAD": "Baja","LONGITUDE": "-5.8649104","LATITUDE": "36.8730955","DESCRIPCION": "El acceso a la Reserva Natural Lagunas de Espera se puede realizar por dos lugares diferentes. El primer acceso lo tenemos en la parte más alta del municipio de Espera, junto al cementerio y muy próximo a su castillo medieval. Desde allí parte un carril descendiente que nos llevará directamente a las lagunas, siguiendo las indicaciones que nos encontremos. El otro acceso lo tenemos en la carretera CA 4412/SE 447 Espera-Las Cabezas de San Juan, a la que llegamos desde el pueblo, dirección Sevilla. A un 1.5 Km. de la localidad por esta carrtera tenemos señalizada la entrada a un carril que nos llevará al camino antes descrito, de unos 5Km.","IMAGEN": "https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5678990/1067_SS_01.jpg"},'+
  '{"id": 1,"NOMBRE": "CERRO DEL ÁGUILA","LONGITUD": "4 kms","TIEMPO DE IDA": "1:30 h.","DIFICULTAD": "Baja","LONGITUDE": "-6.3196114","LATITUDE": "36.848971","DESCRIPCION": "Desde Sanlúcar de Barrameda tomar hacia Bonanza, en dirección norte la CA-9027. Pasada La Algaida, a unos 100 metros, se inicia el sendero.","IMAGEN": "https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5656070/170_SS_03.jpg"},{"id": 2,"NOMBRE": "LAGUNAS DE ESPERA","LONGITUD": "2 kms","TIEMPO DE IDA": "45 min.","DIFICULTAD": "Baja","LONGITUDE": "-5.8649104","LATITUDE": "36.8730955","DESCRIPCION": "El acceso a la Reserva Natural Lagunas de Espera se puede realizar por dos lugares diferentes. El primer acceso lo tenemos en la parte más alta del municipio de Espera, junto al cementerio y muy próximo a su castillo medieval. Desde allí parte un carril descendiente que nos llevará directamente a las lagunas, siguiendo las indicaciones que nos encontremos. El otro acceso lo tenemos en la carretera CA 4412/SE 447 Espera-Las Cabezas de San Juan, a la que llegamos desde el pueblo, dirección Sevilla. A un 1.5 Km. de la localidad por esta carrtera tenemos señalizada la entrada a un carril que nos llevará al camino antes descrito, de unos 5Km.","IMAGEN": "https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5678990/1067_SS_01.jpg"}]}');