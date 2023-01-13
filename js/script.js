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

function getInputData(){
  var liters = document.getElementById("liters");
  var luminosity = document.getElementById("luminosity");
  var bulbTypeContainer = document.getElementById("bulbTypeContainer");
  var waterTypeContainer = document.getElementById("waterTypeContainer");
  var temperatureContainer = document.getElementById("temperatureContainer");
  var plantedContainer = document.getElementById("plantedContainer");

  const radioButtonsBulb = document.querySelectorAll('input[name="bulb"]');
  var bulbType = null

  const radioButtonsWaterType = document.querySelectorAll('input[name="waterType"]');
  var waterType = null

  const radioButtonsTemperature = document.querySelectorAll('input[name="temperature"]');
  var temperature = null

  const radioButtonsPlanted = document.querySelectorAll('input[name="planted"]');
  var planted = null

  for (const radioButton of radioButtonsBulb) {
    if (radioButton.checked) {
      bulbType = radioButton.value;
      break;
    }
  }

  for (const radioButton of radioButtonsWaterType) {
    if (radioButton.checked) {
      waterType = radioButton.value;
      break;
    }
  }

  for (const radioButton of radioButtonsTemperature) {
    if (radioButton.checked) {
      temperature = radioButton.value;
      break;
    }
  }

  for (const radioButton of radioButtonsPlanted) {
    if (radioButton.checked) {
      planted = radioButton.value;
      break;
    }
  }

  return [liters,luminosity,bulbType,waterType,temperature,planted];

}

function checkFields(){

  var bulbTypeContainer = document.getElementById("bulbTypeContainer");
  var waterTypeContainer = document.getElementById("waterTypeContainer");
  var temperatureContainer = document.getElementById("temperatureContainer");
  var plantedContainer = document.getElementById("plantedContainer");

  var dataInput = this.getInputData();

  var liters = dataInput[0];
  var luminosity = dataInput[1];
  var bulbType = dataInput[2];
  var waterType = dataInput[3];
  var temperature = dataInput[4];
  var planted = dataInput[5];
  

  if (liters.value <= 0 || luminosity.value <= 0 || bulbType == null || waterType == null || (waterType == "dulce" && temperature == null) || planted == null){
    liters.style.borderColor = "red";
    luminosity.style.borderColor = "red";
    bulbTypeContainer.style.borderColor = "red";
    waterTypeContainer.style.borderColor = "red";
    plantedContainer.style.borderColor = "red";

    if(waterType == "dulce" && temperature == null){
      temperatureContainer.style.borderColor = "red";
    }

    return false;    
  }else{
    liters.style.borderColor = "#B7E2F0";
    luminosity.style.borderColor = "#B7E2F0";
    bulbTypeContainer.style.borderColor = "#FFFFFF";
    waterTypeContainer.style.borderColor = "#FFFFFF";
    temperatureContainer.style.borderColor = "#FFFFFF";
    plantedContainer.style.borderColor = "#FFFFFF";

    return true;
  }
}

function loadPlantData(){
  document.getElementById("info").innerHTML = '';
    
  if(this.checkFields()){
    var dataInput = this.getInputData();

    var liters = dataInput[0];
    var luminosity = dataInput[1];
    var bulbType = dataInput[2];
    var waterType = dataInput[3];
    var temperature = dataInput[4];
    var planted = dataInput[5];

    var checkHotWaterPlants = false;

    for(var i = 0; i < plants.records.length; i++){
      var plantLuminosity = null;
      var plantTemperature = plants.records[i].temperatura.split("-");


      if(bulbType == "luzLED"){
        plantLuminosity = plants.records[i].luzLED;
      }else{
        plantLuminosity = plants.records[i].luzFluorescente;
      }

      console.log(plantLuminosity+", "+luminosity.value)


      if(waterType == "salada"){

        document.getElementById("info").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de los corales aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      }else if(temperature == "fria"){

        document.getElementById("info").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de las plantas de agua fría aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      }else if(luminosity.value >= plantLuminosity  && waterType.value == plants.records[i].tipoAgua && plantTemperature[0] > 10){
        checkHotWaterPlants = true;

        document.getElementById("info").innerHTML += 
          "<div class='swiperContainer swiper-slide card m-2'>"+
            "<div class='swiperTop d-flex my-3 mx-1'>"+
                "<div class='swiperTitle d-flex justify-content-center align-items-center bg-white'>"+
                    "<h5 class='bg-white'>"+plants.records[i].nombreCientifico+"</h5>"+
                "</div>"+
                "<div class='swiperIcon bg-white'>"+
                    "<i class='fa fa-eye bg-white' aria-hidden='true'></i>"+
                "</div>"+
            "</div>"+
            "<div class='swiperImgContainer d-flex justify-content-center align-items-center bg-white'>"+
                "<img class='swiperImg' src='"+plants.records[i].imagen+"'/>"+                                 
            "</div>"+
          "</div>";

      }
    }
  }else{
    document.getElementById("info").innerHTML += "<p class='bg-white' style='color:red;''>Por favor, rellene correctamente todos los campos marcados en rojo.</p>";
  }

  if (!checkHotWaterPlants && temperature == "caliente" && waterType.value != "salada"){
    document.getElementById("info").innerHTML += "<p class='bg-white' style='color:red;''>No existen plantas que cumplan estas condiciones.</p>";
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

const data = JSON.parse('{"fields":[{"type":"int","id":"id"},{"type":"text","id":"NOMBRE"},{"type":"text","id":"LONGITUD"},{"type":"text","id":"TIEMPO DE IDA"},{"type":"text","id":"DIFICULTAD"},{"type":"text","id":"LONGITUDE"},{"type":"text","id":"LATITUDE"},{"type":"text","id":"DESCRIPCION"},{"type":"text","id":"IMAGEN"}],"records":[{"id":1,"NOMBRE":"CERRO DEL ÁGUILA","LONGITUD":"4 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.3196114","LATITUDE":"36.848971","DESCRIPCION":"Desde Sanlúcar de Barrameda tomar hacia Bonanza, en dirección norte la CA-9027. Pasada La Algaida, a unos 100 metros, se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5656070/170_SS_03.jpg"},{"id":2,"NOMBRE":"LAGUNAS DE ESPERA","LONGITUD":"2 kms","TIEMPO DE IDA":"45 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.8649104","LATITUDE":"36.8730955","DESCRIPCION":"El acceso a la Reserva Natural Lagunas de Espera se puede realizar por dos lugares diferentes. El primer acceso lo tenemos en la parte más alta del municipio de Espera, junto al cementerio y muy próximo a su castillo medieval. Desde allí parte un carril descendiente que nos llevará directamente a las lagunas, siguiendo las indicaciones que nos encontremos. El otro acceso lo tenemos en la carretera CA 4412/SE 447 Espera-Las Cabezas de San Juan, a la que llegamos desde el pueblo, dirección Sevilla. A un 1.5 Km. de la localidad por esta carrtera tenemos señalizada la entrada a un carril que nos llevará al camino antes descrito, de unos 5Km.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5678990/1067_SS_01.jpg"},{"id":3,"NOMBRE":"PUERTO DE LAS PRESILLAS","LONGITUD":"4.3 kms","TIEMPO DE IDA":"2:45 h.","DIFICULTAD":"Media","LONGITUDE":"-5.396168","LATITUDE":"36.7544421","DESCRIPCION":"En la carretera A-372, de Benamahoma a Grazalema, en el km 49 donde se encuentra el Puerto del Boyar.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5677493/Puertopresillas02.jpg"},{"id":4,"NOMBRE":"LA BODEGA","LONGITUD":"1 kms","TIEMPO DE IDA":"20 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.3982644","LATITUDE":"36.8367228","DESCRIPCION":"En Zahara de la Sierra tomar el Camino de la Fuente, en sentido suroeste. Tras recorrer unos 500 m encontramos el cuartel de la Guardia Civil, desde donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5654078/Bodega1.JPG"},{"id":5,"NOMBRE":"LA GARGANTA VERDE","LONGITUD":"2.5 kms","TIEMPO DE IDA":"1:40 h.","DIFICULTAD":"Alta","LONGITUDE":"-5.3943179","LATITUDE":"36.8083425","DESCRIPCION":"Desde Grazalema tomar la A-372, hacia Benamahoma. Tras recorrer 1,5 km girar a la derecha y tomar la CA-9104 hacia el Puerto de la Palomas. Después de haber recorrido unos 10 km, el sendero se inicia a nuestra izquierda sobre esta carretera. También podemos llegar desde Zahara de la Sierra.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5661194/Garganta_verde4.jpg"},{"id":6,"NOMBRE":"LLANOS DE RABEL","LONGITUD":"6.3 kms","TIEMPO DE IDA":"2:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.3929361","LATITUDE":"36.8028382","DESCRIPCION":"Desde Grazalema tomar la A-372, hacia Benamahoma. Tras recorrer 1,5 km girar a la derecha y tomar la CA-9104 hacia el Puerto de las Palomas. Después de haber recorrido unos 9 km, el sendero se inicia a nuestra izquierda sobre esta carretera.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5657658/Rabel3.jpg"},{"id":7,"NOMBRE":"EL PINSAPAR","LONGITUD":"11.1 kms","TIEMPO DE IDA":"4:30 h.","DIFICULTAD":"Media","LONGITUDE":"-5.3835673","LATITUDE":"36.76792","DESCRIPCION":"En el cruce de la carretera A-372 que une El Bosque con Grazalema, se toma por la CA-9104 en dirección Zahara de la Sierra, a un kilómetro de distancia se encontrará un área de descanso a pie de carretera con aparcamientos donde se encuentra el inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5671784/Pinsapar6.jpg"},{"id":8,"NOMBRE":"RÍO MAJACEITE","LONGITUD":"4.4 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.5086056","LATITUDE":"36.7618461","DESCRIPCION":"Una vez nos encontramos en El Bosque, tomaremos un camino que comienza enfrente de la plaza de toros, junto al hotel Las Truchas. Tras recorrer unos 600 metros por este camino llegamos al inicio del sendero, próximo al albergue juvenil. También se puede iniciar desde Benamahoma, en la zona baja del pueblo. Junto a la venta El Bujío, accediendo por la calle La cuesta de la Venta.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5657374/239_SS_07.jpg"},{"id":9,"NOMBRE":"EL TORREÓN","LONGITUD":"3.2 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Alta","LONGITUDE":"-5.4378649","LATITUDE":"36.7550742","DESCRIPCION":"Desde Benamahoma tomar la A-372, hacia Grazalema, en sentido este. Tras recorrer unos 5 km, el sendero se inicia a nuestra izquierda.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5670242/SS_245_12.jpg"},{"id":10,"NOMBRE":"EL TESORILLO","LONGITUD":"1.2 kms","TIEMPO DE IDA":"30 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.4554974","LATITUDE":"36.7568084","DESCRIPCION":"Desde Benamahoma tomar la A-372, hacia Grazalema en sentido este. Tras recorrer unos 2 km encontramos el área recreativa Los Llanos del Campo, desde donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5664090/258_SS_01.jpg"},{"id":11,"NOMBRE":"ARROYO DEL DESCANSADERO","LONGITUD":"1.2 kms","TIEMPO DE IDA":"30 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.4663191","LATITUDE":"36.758744","DESCRIPCION":"Justo enfrente de la entrada alta al pueblo de Benamahoma, sobre la A-372, y junto a la parada del autobús, se encuentra el inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5669686/240_SS_05.jpg"},{"id":12,"NOMBRE":"LLANOS DE BERRAL","LONGITUD":"1.6 kms","TIEMPO DE IDA":"40 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.4573079","LATITUDE":"36.7552619","DESCRIPCION":"Desde Benamahoma tomar la A-372, hacia Grazalema en sentido este. Tras recorrer unos 2 km encontramos el área recreativa Los Llanos del Campo, justo enfrente se inicia el sendero. Debe extremarse la precaución a la hora de cruzar la carretera.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5665177/257_SS_10.jpg"},{"id":13,"NOMBRE":"CAMINO DE LOS CHARCONES (PTO. DEL BOYAR)","LONGITUD":"1.9 kms","TIEMPO DE IDA":"45 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.3786699","LATITUDE":"36.7611376","DESCRIPCION":"Saliendo de Grazalema en dirección Benamahoma por la A-372, a unos 350 metros hay un puente sobre el río Guadalete. Justo aquí comienza el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5663208/238_SS_04.jpg"},{"id":14,"NOMBRE":"LLANOS DEL REPUBLICANO","LONGITUD":"5.4 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Media","LONGITUDE":"-5.3830134","LATITUDE":"36.6967317","DESCRIPCION":"Desde el municipio de Villaluenga del Rosario, nada más salir en dirección a Grazalema, a la derecha, junto al Hostal Villaluenga. Hay que seguir esta cañada que es la que recorre el sendero hasta los Llanos.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5670462/249_SS_05.jpg"},{"id":15,"NOMBRE":"LLANOS DEL ENDRINAL","LONGITUD":"3.1 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Media","LONGITUDE":"-5.3751951","LATITUDE":"36.7587308","DESCRIPCION":"Para realizar este sendero hay que llegar hasta el camping de Tajo Rodillo, a la entrada de Grazalema. A unos 50 metros, en dirección Zahara de la Sierra, parte un camino que nos marca el inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5680938/Llanosendrinal03.jpg"},{"id":16,"NOMBRE":"SALTO DEL CABRERO","LONGITUD":"3.4 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Media","LONGITUDE":"-5.4266214","LATITUDE":"36.7071401","DESCRIPCION":"El sendero actualmente sólo puede iniciase desde Benaocaz. La señal de inicio del sendero se encuentra al final de la calle Pajaruco, en el límite norte del casco urbano.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5660074/Salto_cabrero4.jpg"},{"id":17,"NOMBRE":"OJO DEL MORO","LONGITUD":"1.4 kms","TIEMPO DE IDA":"45 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.4286365","LATITUDE":"36.7061252","DESCRIPCION":"Desde Benaocaz tomar la A-2302 en sentido Ubrique, hacia el norte. Recorrido 1 km, giramos por el carril de la derecha, hacia Los Chozos. A los pocos metros se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5657301/Ojo_moro1.jpg"},{"id":18,"NOMBRE":"LA CALZADA ROMANA","LONGITUD":"3.4 kms","TIEMPO DE IDA":"1 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.4447533","LATITUDE":"36.6810742","DESCRIPCION":"En Benaocaz, el sendero se inicia sobre la A-2302, justo donde se encuentra la parada de autobús del pueblo. Si lo iniciamos en Ubrique, buscaremos el convento o ermita de San Juan.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5666310/Calzada_romana4.jpg"},{"id":19,"NOMBRE":"LA TEJA","LONGITUD":"3.6 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.578646","LATITUDE":"36.2780279","DESCRIPCION":"Tomar la salida nº 70 y seguir la vía de servicio dirección Alcalá de los Gazules a unos 2,5 kms, aparece una pista forestal a la derecha, es la ruta cicloturista Sierra de Montecoche, donde empieza nuestro itinerario.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5655786/1287_SS_02.jpg"},{"id":20,"NOMBRE":"VALDEINFIERNO","LONGITUD":"4.3 kms","TIEMPO DE IDA":"2:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.586977","LATITUDE":"36.227791","DESCRIPCION":"Tomar la salida 73 de la autovia A-381, y recorrer la vía de servicio en dirección a Los Barrios, unos dos kilómetros después de la rotonda desviarse a mano derecha.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5659274/1184_SS_04.jpg"},{"id":21,"NOMBRE":"TRAVESÍA DEL ALJIBE","LONGITUD":"10 kms","TIEMPO DE IDA":"5-6 h.","DIFICULTAD":"Alta","LONGITUDE":"-5.6505085","LATITUDE":"36.5217565","DESCRIPCION":"Sobre la carretera A-2304 (Alcalá de los Gazules-Ubrique) en el km 13-14, se encuentra el área recreativa El Picacho, desde donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5661354/Travesia_Aljibe6.jpg"},{"id":22,"NOMBRE":"GARGANTA DE PUERTO OSCURO","LONGITUD":"0.9 kms","TIEMPO DE IDA":"30 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.649062","LATITUDE":"36.522031","DESCRIPCION":"En el km 13-14 de la carretera A-2304 (Alcalá de los Gazules-Ubrique), se encuentra el área recreativa El Picacho, donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5668381/216_SS_01.jpg"},{"id":23,"NOMBRE":"SUBIDA AL PICACHO","LONGITUD":"3.3 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Alta","LONGITUDE":"-5.6508431","LATITUDE":"36.5216166","DESCRIPCION":"En el km 13 - 14 de la carretera A-2304 (Alcalá de los Gazules - Ubrique), se encuentra el área recreativa El Picacho, donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5677978/Picacho1.jpg"},{"id":24,"NOMBRE":"SUBIDA AL ALJIBE","LONGITUD":"6.9 kms","TIEMPO DE IDA":"4 h.","DIFICULTAD":"Alta","LONGITUDE":"-5.651009","LATITUDE":"36.5218322","DESCRIPCION":"En el km 13 - 14 de la carretera A-2304 (Alcalá de los Gazules - Ubrique), se encuentra el área recreativa El Picacho, donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5677562/Aljibe1.jpg"},{"id":25,"NOMBRE":"RUTA DE LOS MOLINOS","LONGITUD":"1.7 kms","TIEMPO DE IDA":"45 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.6591767","LATITUDE":"36.4634946","DESCRIPCION":"Al final de la carretera CA-6201 (Alcalá de los Gazules - Patrite), se encuentra el inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5668046/Ruta_molinos4.JPG"},{"id":26,"NOMBRE":"RÍO HOZGARGANTA","LONGITUD":"3.3 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.4533575","LATITUDE":"36.4285331","DESCRIPCION":"Desde Jimena, junto al molino de Rodete, se encuentra el inicio. Otras opciones son: por el camino de la Encubierta, accediendo a la mitad del recorrido, o hacerlo en sentido contrario al aquí descrito, por lo que empezaremos en la pista que sale a la izquierda de la carreterra de la Cruz Blanca, donde resulta cómodo encontrar aparcamiento, y evitando así el fuerte desnivel que se describe en el texto.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5667736/Hozgarganta_7.JPG"},{"id":27,"NOMBRE":"VEREDA UBRIQUE - ASOMADILLAS","LONGITUD":"7.2 kms","TIEMPO DE IDA":"2:30 h.","DIFICULTAD":"Media","LONGITUDE":"-5.4617652","LATITUDE":"36.4445963","DESCRIPCION":"Al final de la calle Fuente Nueva de Jimena de la Frontera, a la salida del pueblo, haciendo intersección con la carretera CA-8201 (Jimena de la Frontera-Puerto de Gáliz), se inicia este sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5661369/214_SS_14.jpg"},{"id":28,"NOMBRE":"LA CALZADA DEHESA BOYAL","LONGITUD":"5.2 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Media","LONGITUDE":"-5.4528427","LATITUDE":"36.311291","DESCRIPCION":"Hasta Castellar de la Frontera por la A-405 (San Roque - Jimena de la Frontera). Desde allí, coger la CA-9201, dirección al castillo, dejando a la derecha la venta La Jarandilla, punto de inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5665546/217_SS_05.jpg"},{"id":29,"NOMBRE":"RÍO GUADALMESÍ","LONGITUD":"5.6 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Media","LONGITUDE":"-5.5188535","LATITUDE":"36.0724126","DESCRIPCION":"Este sendero parte del área recreativa de El Bujeo, en Tarifa. Se puede llegar a ella a través de una pista forestal que parte de la carretera N-340, en el Km 95. Si se viene desde Tarifa, hay que hacer un cambio de sentido más adelante, en El Pelayo.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5667562/Rio_guadalmesi5.jpg"},{"id":30,"NOMBRE":"EL PALANCAR","LONGITUD":"2.9 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.5811292","LATITUDE":"36.24837","DESCRIPCION":"El inicio del sendero se encuentra en un carril de acceso a los Montes Públicos del Ayuntamiento de Los Barrios, en la carretera A-381, a 18 kilómetros de Los Barrios y muy próximo al área recreativa de Charco Redondo.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5666524/1347_SS_04.jpg"},{"id":31,"NOMBRE":"ARROYO SAN CARLOS DEL TIRADERO","LONGITUD":"2.6 kms","TIEMPO DE IDA":"1 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.5809955","LATITUDE":"36.1677431","DESCRIPCION":"De la antigua carretera CA-7200 (Facinas-Los Barrios, hoy considerada pista forestal), a unos 8 km de la autovía A-381(Jerez de la Frontera-Los Barrios, salida 77), parte a nuestra izquierda un carril donde encontraremos el antiguo caserío de San Carlos del Tiradero o Tejas Verdes, punto de inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5656754/209_SS_01.jpg"},{"id":32,"NOMBRE":"CANUTO DEL RISCO BLANCO","LONGITUD":"4.8 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Media","LONGITUDE":"-5.5846002","LATITUDE":"36.1632733","DESCRIPCION":"En la antigua carretera CA-7200 (Facinas-Los Barrios), hoy catalogada como pista forestal y carrilbici, a unos 9 km de la autovía A-381(Jerez de la Frontera-Los Barrios, salida 77), una cancela de hierro, señala el inicio de este sendero y del de Arroyo del Tiradero, a un km desde el cortijo de las Tejas Verdes.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5665022/215_SS_01.jpg"},{"id":33,"NOMBRE":"RÍO DE LA MIEL","LONGITUD":"2.4 kms","TIEMPO DE IDA":"1 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.4790817","LATITUDE":"36.1172616","DESCRIPCION":"Se inicia en El Cobre, barriada de Algeciras, en el mismo punto que el Sendero Río de la Miel. Desde la N-340 en la rotonda del punto kilométrico 101,5 tomar la salida en dirección al polígono industrial Cortijo Real. En la siguiente rotonda tomar la segunda salida por la avenida de Algeciras y girar a la derecha en la calle Antonio Barrero. Por último giramos a la izquierda hacia la calle Maestra Mª Luisa, y a 300 m. se encuentra el inicio.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5669560/Rio_miel_1.JPG"},{"id":34,"NOMBRE":"CAÑADA REAL LOS RATONES","LONGITUD":"2.4 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.7423024","LATITUDE":"36.4117421","DESCRIPCION":"A través de la A-381 de Jerez Los Barrios, salida 42 dirección Benalup-Casas Viejas km 1.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5659240/1195_SS_02.jpg"},{"id":35,"NOMBRE":"LA PEÑA","LONGITUD":"0.9 kms","TIEMPO DE IDA":"30 min  .","DIFICULTAD":"Baja","LONGITUDE":"-5.6651357","LATITUDE":"36.0577953","DESCRIPCION":"Por la N-340 viniendo de Tarifa y pasado el km 79 y el camping, tomamos la primera desviación a la derecha, hacia el punto de información del parque natural, junto al cual se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/0/1361_SS_09.jpg"},{"id":36,"NOMBRE":"CERRO DEL TAMBOR","LONGITUD":"6.3 kms","TIEMPO DE IDA":"2:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.5067538","LATITUDE":"36.0808398","DESCRIPCION":"En la N-340 a la altura del km 96 se toma la vía de servicio a la barriada Pelayo que lleva al aparcamiento del centro de visitantes Huerta Grande, en el se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5661326/1270_SS_05.jpg"},{"id":37,"NOMBRE":"COLADA DE LA COSTA - HUERTA GRANDE","LONGITUD":"16.2 kms","TIEMPO DE IDA":"5:30 h.","DIFICULTAD":"Media","LONGITUDE":"-5.5973037","LATITUDE":"36.0135238","DESCRIPCION":"Desde Tarifa, dejando el castilo de Sancho IV o Guzmán el Bueno, el sendero se inicia nada más pasar la estación marítima.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5665270/1210_SS_11.jpg"},{"id":38,"NOMBRE":"LOS LANCES","LONGITUD":"1.5 kms","TIEMPO DE IDA":"30 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.6173405","LATITUDE":"36.0245141","DESCRIPCION":"A Tarifa se llega por la N-340. Ya en la ciudad hay que ir hacia su extremo noroeste donde está el Estadio Municipal de Deportes y el aparcamiento de la playa de Los Lance, donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5662166/1209_SS_12.jpg"},{"id":39,"NOMBRE":"LOS ALGARBES - BETIJUELO","LONGITUD":"5.6 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Media","LONGITUDE":"-5.7024327","LATITUDE":"36.0759506","DESCRIPCION":"En la N-340 a la altura del km 74 se toma la carretera A-2325 a Punta Paloma. Antes de llegar a este poblado, pasado el camping Paloma, se gira a la derecha tomando una pista que lleva a la necrópolis de los Algarbes, en laque se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5658314/1186_SS_09.jpg"},{"id":40,"NOMBRE":"DUNA DE BOLONIA","LONGITUD":"1.1 kms","TIEMPO DE IDA":"30 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.7705625","LATITUDE":"36.0874321","DESCRIPCION":"En la N-340 a la altura del km 71, se toma la carretera CA-8202 que lleva a Bolonia y siguiendo la dirección hacia la playa, cruzando el arroyo de Alparieta, se encuentra el inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5654374/970_SS_12.jpg"},{"id":41,"NOMBRE":"FARO CAMARINAL","LONGITUD":"1.7 kms","TIEMPO DE IDA":"40 min.","DIFICULTAD":"Baja","LONGITUDE":"-5.7978274","LATITUDE":"36.36.0960398","DESCRIPCION":"En la N-340 a la altura del km 71, se toma la carretera CA-2216 a Bolonia y se continua en dirección al conjunto arqueológico de Baelo-Claudia, siguiendo por la misma carretera 3 km más hacia la sierra de la Plata.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5660930/969_SS_04.jpg"},{"id":42,"NOMBRE":"MARISMAS DE BARBATE","LONGITUD":"8.6 kms","TIEMPO DE IDA":"3 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.9515734","LATITUDE":"36.2419912","DESCRIPCION":"Viniendo por la N-340 (Cádiz-Algeciras), se toma el desvío a Vejer de la Frontera/ Barbate. Tras recorrer 1,3 km, después de pasar La Barca de Vejer, encontramos a nuestra izquierda la estación depuradora en el punto kilométrico 2,2. Aquí encontramos el punto de inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5659114/62_PN_04.jpg"},{"id":43,"NOMBRE":"DEL ACANTILADO","LONGITUD":"7.1 kms","TIEMPO DE IDA":"2:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.945836","LATITUDE":"36.1904573","DESCRIPCION":"Hasta Vejer de la Frontera por la N-340 (Cádiz-Algeciras). Tomar el desvío a Vejer de la Frontera/ Barbate, en La Barca de Vejer, (A-314). Tomar la carretera A-2233, dirección Los Caños. A unos 5 km, a nuestra derecha parte una pista forestal que nos conduce al área recreativa El Jarillo, punto de inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5661274/160_SS_11.jpg"},{"id":44,"NOMBRE":"TORRE DEL TAJO","LONGITUD":"2.1 kms","TIEMPO DE IDA":"1 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.957404","LATITUDE":"36.1868743","DESCRIPCION":"Hasta Vejer de la Frontera por la N-340 (Cádiz-Algeciras). Tomar el desvío a Vejer de la Frontera/Barbate, en La Barca de Vejer, (A-314). Tomar la carretera A-2233, dirección Los Caños. A unos 2,5 km del puerto de Barbate, en el punto kilométrico 19,5, se encuentra a nuestra izquierda una zona de aparcamiento, punto de inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5655418/161_SS_06.jpg"},{"id":45,"NOMBRE":"JARILLO - TORRE DE MECA","LONGITUD":"3.9 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.984164","LATITUDE":"36.1971843","DESCRIPCION":"El inicio del sendero se localiza en el área recreativa de El Jarillo, cerca de la casa forestal. A este área se accede por una pista asfaltada de unos 600 metros, que sale del kilómetro 7 de la carretera A-2233 que une Los Caños con Barbate.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5662098/159_SS_09.jpg"},{"id":46,"NOMBRE":"CAÑOS - TORRE DE MECA","LONGITUD":"3.7 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.015734","LATITUDE":"36.1945043","DESCRIPCION":"Hasta Vejer de la Frontera por la N-340 (Cádiz-Algeciras). Tomar el desvío a Vejer de la Frontera/ Barbate, en La Barca de Vejer, (A-314).Llegados a Barbate cruzar el pueblo en sentido suroeste, hasta tomar la A-2233 hacia Caños de Meca. Tras recorrer unos 7 km, a la entrada del pueblo, a nuestra derecha, se encuentra el inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5662098/159_SS_05.jpg"},{"id":47,"NOMBRE":"ARROYO MONDRAGÓN","LONGITUD":"3.6 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.978276","LATITUDE":"36.2050223","DESCRIPCION":"Desde la carretera A-2233 dirección Los Caños, a 5 km. tomar la carretera de San Ambrosio a la derecha, pasar el área recreativa El Jarillo y continuar aproximadamente 2 km.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5675532/1461_SS_01.jpg"},{"id":48,"NOMBRE":"LAS QUEBRADAS","LONGITUD":"2.2 kms","TIEMPO DE IDA":"1 h.","DIFICULTAD":"Media","LONGITUDE":"-5.9595629","LATITUDE":"36.2337013","DESCRIPCION":"Desde la carretera A-314, de Vejer a Barbate, entre el km 3 y el 4, a la altura de la urbanización La Ribera de la Oliva, tomar a la derecha por una pista hasta el inicio del sendero, a unos seiscientos metros.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5658638/1294_SS_01.jpg"},{"id":49,"NOMBRE":"PUNTA DEL BOQUERÓN","LONGITUD":"2.7 kms","TIEMPO DE IDA":"45 min.","DIFICULTAD":"Baja","LONGITUDE":"-6.2259884","LATITUDE":"36.4185869","DESCRIPCION":"Desde San Fernando tomar la carretera a la playa de Camposoto. Al final de la carretera comienza el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5663474/960_SS_12.jpg"},{"id":50,"NOMBRE":"TRES AMIGOS - RÍO ARILLO","LONGITUD":"3.1 kms","TIEMPO DE IDA":"1 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.2283642","LATITUDE":"36.4448823","DESCRIPCION":"Desde San Fernando tomar la carretera a la playa de Camposoto. Frente al cuartel hay un eucaliptal donde se inicia el sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5654678/152_SS_06.jpg"},{"id":51,"NOMBRE":"SALINA DOLORES","LONGITUD":"3.1 kms","TIEMPO DE IDA":"1 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.231319","LATITUDE":"36.4589432","DESCRIPCION":"Desde San Fernando tomar el carril que parte cerca del centro comercial Bahía Sur, en dirección a la estación de aguas residuales. Pasado el río Arillo girar a la derecha donde aparece un cartel de inicio.","IMAGEN":"https://resizer.lavozdigital.es/resizer/resizer.php?imagen=/deliverty/demo/resources/jpg/9/5/1315913878359.jpg"},{"id":52,"NOMBRE":"LOS TORUÑOS","LONGITUD":"5.2 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.2173846","LATITUDE":"36.5720981","DESCRIPCION":"En la urbanización de la playa de Valdelagrana (El Puerto de Santa María), tomar la avenida del Mar, hasta el centro de recepción de visitantes del Parque Metropolitano Marisma de los Toruños y Pinar de la Algaida, lugar de inicio del sendero.","IMAGEN":"https://img.europapress.es/fotoweb/fotonoticia_20201212122955_640.webp"},{"id":53,"NOMBRE":"PINAR DE LA ALGAIDA - SALINA DESAMPARADOS","LONGITUD":"6.1 kms","TIEMPO DE IDA":"2 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.213332","LATITUDE":"36.5763823","DESCRIPCION":"Desde Puerto Real, dirigirse al campus universitario y junto a la facultad de Ciencias se inicia el sendero, en la entrada Sur del Parque Metropolitano Marisma de los Toruños y Pinar de la Algaida.","IMAGEN":"https://www.sendacadiz.es/gallery/IMG_0412.jpg"},{"id":54,"NOMBRE":"SALINA DE LA ESPERANZA","LONGITUD":"0.9 kms","TIEMPO DE IDA":"20 min.","DIFICULTAD":"Baja","LONGITUDE":"-6.1553135","LATITUDE":"36.5119447","DESCRIPCION":"El acceso se realiza en la rotonda del Puente Melchor por vía de servicio del tren, en Puerto Real , donde se ubica la salina de Molinete.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5662186/1305_SS_03.jpg"},{"id":55,"NOMBRE":"SALINA DE CARBONEROS","LONGITUD":"4 kms","TIEMPO DE IDA":"1:30 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.1850895","LATITUDE":"36.3893281","DESCRIPCION":"El acceso se realiza a través de la carretera de la Playa de la Barrosa a la altura de la urbanización de Las Mogarizas, antes de llegar a la Venta del Popeye.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5665286/1335_SS_02.jpg"},{"id":56,"NOMBRE":"LAGUNA DE MEDINA","LONGITUD":"1.5 kms","TIEMPO DE IDA":"30 min.","DIFICULTAD":"Baja","LONGITUDE":"-6.0605159","LATITUDE":"36.6134086","DESCRIPCION":"Desde la autovía A-381 (Jerez de la Frontera a Los Barrios, salida 4), tomamos la vía de servicio (A-2006), y a un 1 km. a la derecha encontramos un amplio aparcamiento. A la izquierda se encuentra el inicio del sendero Laguna de Medina, junto a otro pequeño aparcamiento. Este sendero tiene dos sentidos: hacia la derecha, nos dirige a través de una pasarela elevada hasta el observatorio Laguna de Medina y hacia la izquierda, nos lleva hasta el mirador de su mismo nombre y a continuación al mirador de La Malvasía.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5684930/S_LagunaMedina01.jpg"},{"id":57,"NOMBRE":"LAS FUENTES","LONGITUD":"2.9 kms","TIEMPO DE IDA":"1:15 h.","DIFICULTAD":"Baja","LONGITUDE":"-5.4104965","LATITUDE":"36.8805381","DESCRIPCION":"El sendero se inicia cerca de La Fuente del Algarrobo (conocida en la población de Algodonales como Fuente baja) y finaliza cerca de la Fuente Alta, realizándose por la cara sur de la Sierra de Lijar, y a escasos metros de la población.","IMAGEN":"https://www.grazalemaconencanto.com/uploads/senderos/Las-fuentes.jpg"},{"id":58,"NOMBRE":"LA MUELA - LOS NACIMIENTOS","LONGITUD":"6.5 kms","TIEMPO DE IDA":"3 h.","DIFICULTAD":"Media","LONGITUDE":"-5.407049","LATITUDE":"36.9125691","DESCRIPCION":"El sendero comienza cerca de localidad de La Muela, pedanía de Algodonales. Una vez en La Muela, en la carretera CA-9101 a unos 800 m del pueblo, hay un desvío hacia la Sierra de Líjar, por un carril en buenas condiciones utilizado para subir a las pistas de ala delta. Unos 3 Km después llegamos al inicio del sendero.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5662854/1057_SS_04.jpg"},{"id":59,"NOMBRE":"ALGODONALES - LOS NACIMIENTOS","LONGITUD":"10.5 kms","TIEMPO DE IDA":"4 h.","DIFICULTAD":"Media","LONGITUDE":"-5.4081263","LATITUDE":"36.8835921","DESCRIPCION":"El sendero comienza al final de la calle Las Piedras, en Algodonales, en la parte alta del pueblo.","IMAGEN":"https://www.juntadeandalucia.es/medioambiente/portal/documents/255035/5677310/1056_SS_07.jpg"},{"id":60,"NOMBRE":"VÍA VERDE DE LA SIERRA","LONGITUD":"36 kms","TIEMPO DE IDA":"10 h.","DIFICULTAD":"Media","LONGITUDE":"-5.4089891","LATITUDE":"36.9719913","DESCRIPCION":"En el municipio de Olvera, en el cruce del camino que une Olvera con Pruna, junto al complejo turístico “Estación de Olvera” puedes aparcar en el parking situado junto a la estación.","IMAGEN":"https://www.fundacionviaverdedelasierra.es/wp-content/uploads/2017/03/050VIA.jpg"},{"id":61,"NOMBRE":"CORREDOR VERDE DOS BAHÍAS","LONGITUD":"93 kms","TIEMPO DE IDA":"17 h.","DIFICULTAD":"Baja","LONGITUDE":"-6.1528155","LATITUDE":"36.5191441","DESCRIPCION":"El sendero comienza en el Parque de las Cañadas, más concretamente en la Cañada Real del Camino de Medina Sidonia por Venta Catalana, situado junto al aparcamiento del Hospital Universitario de Puerto Real.","IMAGEN":"https://upload.wikimedia.org/wikipedia/commons/c/c6/Embalse_del_Celem%C3%ADn-dos_bah%C3%ADas.jpg"}]}');
const plants = JSON.parse('{"records":[{"id":1,"nombreComun":"Ambulia","nombreCientifico":"Limnophila sessiliflora","luzLED":"27","luzFluorescente":"50","temperatura":"22-28","ph":"6.0-8.5","gh":"4-12","sustrato":"Grava fina.","zonaAcuario":"Parte media o trasera","dificultad":"Baja","distribucionYHabitat":"Procede del sudeste asiático donde puede ser considerada como una plaga por su capacidad de reproducción. Es capaz de desarrollarse en diferentes ambientes, su capacidad para tolerar diferentes cambios químicos del agua la hacen una planta invasiva que puede vivir en lagos, arroyos y aguas estancadas.","forma":"Planta frondosa y de color verde intenso. Tiene un tallo principal que se divide en diferentes ramas.","tamaño":"Puede llegar a medir unos 40 o 50 centímetros de altura, pudiendo crecer a una velocidad de 5 centímetros por semana.","reproduccion":"Se reproduce con facilidad a través de esquejes. Sacar un esqueje cortando unos diez centímetros de la parte superior de la planta, retirr las hojas que queden en la parte inferior para no enterrarlas y meter con una pinza el esqueje en el sustrato. Separar los nuevos esquejes de la planta originaria para que no se peguen en exceso.","consejos":"Las Limnophila prefieren el agua blanda y ácida. Su mejor rango de temperatura oscila los 24-27ºC. Si la iluminación es más intensa, el crecimiento es más denso y apretado, mientras que con una iluminación menos intensa, crece de forma más alargada, con un color menos vivo y menos densa. La grava fina facilita su enraizamiento. El fondo se puede acompañar con arcilla y ser rico en nutrientes minerales para evitar que se tenga que abonar de forma frecuente, sino se pueden abonar con productos ricos en sales minerales.","compatibilidad":"Se recomienda utilizar en un acuario con Guppys y Platys.","problemas":"No es conveniente utilizarla en un acuario con peces herbívoros porque en su crecimiento es una planta frágil que se puede romper con facilidad.","imagen":"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Limnophila_sessiliflora.jpg/330px-Limnophila_sessiliflora.jpg"},{"id":2,"nombreComun":"","nombreCientifico":"","luzLED":"","luzFluorescente":"","temperatura":"","ph":"","gh":"","sustrato":"","zonaAcuario":"","dificultad":"","distribucionYHabitat":"","forma":"","tamaño":"","reproduccion":"","consejos":"","compatibilidad":"","problemas":"","imagen":""}]}');