var liters = document.getElementById("liters");
var luminosity = document.getElementById("luminosity");
var bulbTypeContainer = document.getElementById("bulbTypeContainer");
var waterTypeContainer = document.getElementById("waterTypeContainer");
var temperatureContainer = document.getElementById("temperatureContainer");
var plantedContainer = document.getElementById("plantedContainer");

function calculateLuminosity(){
  var liters = document.getElementById("liters").value;
  var watts = document.getElementById("watts").value;

  var total = (watts * 70)/liters; 

  document.getElementById("luminosity").value=total.toFixed(2);
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

function swiperBuilder(nombreComun,id,imagen,model){
  var swiperString = 
    "<div class='swiperContainer swiper-slide card'>"+
        "<div class='swiperTop d-flex my-3 mx-1 bg-white'>"+
          "<div class='swiperTitle d-flex align-items-center bg-white ml-2'>"+
            "<h5 class='bg-white'><i class='bg-white'>"+nombreComun+"</i></h5>"+
          "</div>"+
          "<div class='swiperIcon bg-white'>"+
            "<button type='button' class='buttonIcon btn' data-toggle='modal' data-target='#modal' onclick='"+model+"("+id+")'>"+
              "<i class='fa fa-eye bg-white' aria-hidden='true'></i>"+
            "</button>"+
          "</div>"+
        "</div>"+
        "<div class='swiperImgContainer d-flex justify-content-center align-items-center bg-white'>"+
          "<img class='swiperImg' src='"+imagen+"'/>"+                                 
        "</div>"+
      "</div>";

  return swiperString;

}

function showAllPlants(){
  document.getElementById("infoPlants").innerHTML = '';

  liters.style.borderColor = "#B7E2F0";
  luminosity.style.borderColor = "#B7E2F0";
  bulbTypeContainer.style.borderColor = "#FFFFFF";
  waterTypeContainer.style.borderColor = "#FFFFFF";
  temperatureContainer.style.borderColor = "#FFFFFF";
  plantedContainer.style.borderColor = "#FFFFFF";

  for(var i = 0; i < plants.records.length; i++){
    document.getElementById("infoPlants").innerHTML += swiperBuilder(plants.records[i].nombreComun,plants.records[i].id,plants.records[i].imagen,"loadPlantsModelInfo");
  }
} 

function showAllFish(){
  document.getElementById("infoFishes").innerHTML = '';

  liters.style.borderColor = "#B7E2F0";
  luminosity.style.borderColor = "#B7E2F0";
  bulbTypeContainer.style.borderColor = "#FFFFFF";
  waterTypeContainer.style.borderColor = "#FFFFFF";
  temperatureContainer.style.borderColor = "#FFFFFF";
  plantedContainer.style.borderColor = "#FFFFFF";

  for(var i = 0; i < fishes.records.length; i++){
    document.getElementById("infoFishes").innerHTML += swiperBuilder(fishes.records[i].nombreComun,fishes.records[i].id,fishes.records[i].imagen,"loadFishesModelInfo");
  }

}

function getInputData(){
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
  document.getElementById("infoPlants").innerHTML = '';

  //Hace que, al darle al botón de plantas, se vuelva a mostrar. Es decir, nunca se contrae a no ser que se le de a otro botón.
  $('#collapseOne').on('hidden.bs.collapse', function () {
    $('#collapseOne').collapse('show');
    $('#collapseTwo').collapse('hide');
    $('#collapseThree').collapse('hide');
  })

  var checkHotWaterPlants = false;
    
  if(this.checkFields()){
    var dataInput = this.getInputData();

    var liters = dataInput[0].value;
    var luminosity = dataInput[1].value;
    var bulbType = dataInput[2];
    var waterType = dataInput[3];
    var temperature = dataInput[4];
    var planted = dataInput[5];

    for(var i = 0; i < plants.records.length; i++){
      var plantLuminosity = null;
      var plantTemperature = plants.records[i].temperatura.split("-");

      if(bulbType == "luzLED"){
        plantLuminosity = plants.records[i].luzLED;
      }else{
        plantLuminosity = plants.records[i].luzFluorescente;
      }

      if(planted == "no"){
      
        document.getElementById("infoPlants").innerHTML += "<p class='bg-white' style='color:red;''>No se muestra ninguna planta o coral puesto que tu acuario no será plantado.</p>";
        break;
      }else if(waterType == "salada"){

        document.getElementById("infoPlants").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de los corales aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      }else if(temperature == "fria"){

        document.getElementById("infoPlants").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de las plantas de agua fría aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      }else if(temperature == "caliente" && parseFloat(luminosity) >= parseFloat(plantLuminosity) && parseFloat(plantTemperature[1]) > 19 && plants.records[i].tipoAgua == "dulce"){
        checkHotWaterPlants = true;

        document.getElementById("infoPlants").innerHTML += swiperBuilder(plants.records[i].nombreComun,plants.records[i].id,plants.records[i].imagen,"loadPlantsModelInfo");
      }
    }

  }else{
    document.getElementById("infoPlants").innerHTML += "<p class='bg-white' style='color:red;''>Por favor, rellene correctamente todos los campos marcados en rojo.</p>";
  }

  if (!checkHotWaterPlants && temperature == "caliente" && waterType != "salada" && planted == "si"){
    document.getElementById("infoPlants").innerHTML += "<p class='bg-white' style='color:red;''>No existen plantas que cumplan estas condiciones.</p>";
  }
}

function loadFishData(){
  document.getElementById("infoFishes").innerHTML = '';

  //Hace que, al darle al botón de plantas, se vuelva a mostrar. Es decir, nunca se contrae a no ser que se le de a otro botón.
  $('#collapseTwo').on('hidden.bs.collapse', function () {
    $('#collapseTwo').collapse('show');
    $('#collapseOne').collapse('hide');
    $('#collapseThree').collapse('hide');
  })

  var checkHotWaterFishes = false;
    
  if(this.checkFields()){
    var dataInput = this.getInputData();

    var liters = dataInput[0].value;
    var luminosity = dataInput[1].value;
    var bulbType = dataInput[2];
    var waterType = dataInput[3];
    var temperature = dataInput[4];
    var planted = dataInput[5];

    for(var i = 0; i < fishes.records.length; i++){
      var fishTemperature = fishes.records[i].temperatura.split("-");

      if(waterType == "salada"){

        document.getElementById("infoFishes").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de los peces de agua salada aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      }else if(temperature == "fria"){

        document.getElementById("infoFishes").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de los peces de agua fría aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      }else if(temperature == "caliente" && parseFloat(fishTemperature[1]) > 19 && fishes.records[i].tipoAgua == "dulce" && parseFloat(liters) >= parseFloat(fishes.records[i].litrosAcuario)){
        checkHotWaterFishes = true;

        document.getElementById("infoFishes").innerHTML += swiperBuilder(fishes.records[i].nombreComun,fishes.records[i].id,fishes.records[i].imagen,"loadFishesModelInfo");
      }
    }

  }else{
    document.getElementById("infoFishes").innerHTML += "<p class='bg-white' style='color:red;''>Por favor, rellene correctamente todos los campos marcados en rojo.</p>";
  }

  if (!checkHotWaterFishes && temperature == "caliente" && waterType != "salada"){
    document.getElementById("infoFishes").innerHTML += "<p class='bg-white' style='color:red;''>No existen peces que cumplan estas condiciones.</p>";
  }
}


function loadPlantsModelInfo(id){

  document.getElementById("modalInfo").innerHTML = '';

  for(var i = 0; i < plants.records.length; i++){

    if(parseInt(id) == parseInt(plants.records[i].id)){

      document.getElementById("modalInfo").innerHTML +=
      "<div class='modal-header bg-info'>"+
        "<h5 class='modal-title bg-info' id='modalLabel' title='Nombre común - Nombre científico'>"+plants.records[i].nombreComun +" - <i class='bg-transparent'>"+ plants.records[i].nombreCientifico+"</i></h5>"+
        "<button type='button' class='close bg-transparent' data-dismiss='modal' aria-label='Close'>"+
          "<span aria-hidden='true' class='bg-transparent'>&times;</span>"+
        "</button>"+
      "</div>"+
      "<div class='modal-body'>"+
        "<img class='modalImg' src='"+plants.records[i].imagen+"'/>"+
        "<div class='modalContainer mt-3 my-3'>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>lm/l con luz LED:</h4>"+
                "<h4 class='text-white ml-2'>"+plants.records[i].luzLED+" lm/l</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>lm/l con luz fluorescente: </h4>"+
                "<h4 class='text-white ml-2'>"+plants.records[i].luzFluorescente+" lm/l</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>Temperatura:</h4>"+
                "<h4 class='text-white ml-2'>"+plants.records[i].temperatura+" ºC</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>pH:</h4>"+
                "<h4 class='text-white ml-2'>"+plants.records[i].ph+" pH</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>dH:</h4>"+
                "<h4 class='text-white ml-2'>"+plants.records[i].gh+" dH</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>Dificultad:</h4>"+
                "<h4 class='text-white ml-2'>"+plants.records[i].dificultad+"</h4>"+
            "</div>"+
            "<h4 class='mt-3'>Zona del acuario:</h4>"+
            "<p class='text-white'>"+plants.records[i].zonaAcuario+"</p>"+
            "<h4 class='mt-3'>Tipo de sustrato:</h4>"+
            "<p class='text-white'>"+plants.records[i].sustrato+"</p>"+
            "<h4 class='mt-3'>Distribución y hábitat:</h4>"+
            "<p class='text-white'>"+plants.records[i].distribucionYHabitat+"</p>"+
            "<h4 class='mt-3'>Forma:</h4>"+
            "<p class='text-white'>"+plants.records[i].forma+"</p>"+
            "<h4 class='mt-3'>Tamaño:</h4>"+
            "<p class='text-white'>"+plants.records[i].tamaño+"</p>"+
            "<h4 class='mt-3'>Reproducción:</h4>"+
            "<p class='text-white'>"+plants.records[i].reproduccion+"</p>"+
            "<h4 class='mt-3'>Consejos:</h4>"+
            "<p class='text-white'>"+plants.records[i].consejos+"</p>"+
            "<h4 class='mt-3'>Compatibilidad:</h4>"+
            "<p class='text-white'>"+plants.records[i].compatibilidad+"</p>"+
            "<h4 class='mt-3'>Posibles problemas:</h4>"+
            "<p class='text-white'>"+plants.records[i].problemas+"</p>"+
        "</div>"+
      "</div>"+
      "<div class='modal-footer bg-dark'>"+
        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>"+
        "<button type='button' class='btn btn-primary' href='"+plants.records[i].tienda+"'>Comprar</button>"+
      "</div>";

      break;
    }
  }
}

function loadFishesModelInfo(id){

  document.getElementById("modalInfo").innerHTML = '';

  for(var i = 0; i < fishes.records.length; i++){

    if(parseInt(id) == parseInt(fishes.records[i].id)){

      document.getElementById("modalInfo").innerHTML +=
      "<div class='modal-header bg-info'>"+
        "<h5 class='modal-title bg-info' id='modalLabel' title='Nombre común - Nombre científico'>"+fishes.records[i].nombreComun +" - <i class='bg-transparent'>"+ fishes.records[i].nombreCientifico+"</i></h5>"+
        "<button type='button' class='close bg-transparent' data-dismiss='modal' aria-label='Close'>"+
          "<span aria-hidden='true' class='bg-transparent'>&times;</span>"+
        "</button>"+
      "</div>"+
      "<div class='modal-body'>"+
        "<img class='modalImg' src='"+fishes.records[i].imagen+"'/>"+
        "<div class='modalContainer mt-3 my-3'>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>Temperatura:</h4>"+
                "<h4 class='text-white ml-2'>"+fishes.records[i].temperatura+" ºC</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>pH:</h4>"+
                "<h4 class='text-white ml-2'>"+fishes.records[i].ph+" pH</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>dH:</h4>"+
                "<h4 class='text-white ml-2'>"+fishes.records[i].gh+" dH</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>Dificultad:</h4>"+
                "<h4 class='text-white ml-2'>"+fishes.records[i].dificultad+"</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>Temperamento:</h4>"+
                "<h4 class='text-white ml-2'>"+fishes.records[i].temperamento+"</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>Litros:</h4>"+
                "<h4 class='text-white ml-2'>"+fishes.records[i].litrosAcuario+"</h4>"+
            "</div>"+
            "<div class='modalDiv d-flex flex-row my-3'>"+
                "<h4>Población mínima:</h4>"+
                "<h4 class='text-white ml-2'>"+fishes.records[i].numeroCardumen+"</h4>"+
            "</div>"+
            "<h4 class='mt-3'>Dieta:</h4>"+
            "<p class='text-white'>"+fishes.records[i].dieta+"</p>"+
            "<h4 class='mt-3'>Descripción:</h4>"+
            "<p class='text-white'>"+fishes.records[i].descripcion+"</p>"+
            "<h4 class='mt-3'>Distribución y hábitat:</h4>"+
            "<p class='text-white'>"+fishes.records[i].distribucionYHabitat+"</p>"+
            "<h4 class='mt-3'>Longitud:</h4>"+
            "<p class='text-white'>"+fishes.records[i].longitud+"</p>"+
            "<h4 class='mt-3'>Reproducción:</h4>"+
            "<p class='text-white'>"+fishes.records[i].reproduccion+"</p>"+
            "<h4 class='mt-3'>Consejos:</h4>"+
            "<p class='text-white'>"+fishes.records[i].consejos+"</p>"+
            "<h4 class='mt-3'>Compatibilidad:</h4>"+
            "<p class='text-white'>"+fishes.records[i].compatibilidad+"</p>"+
            "<h4 class='mt-3'>Posibles problemas:</h4>"+
            "<p class='text-white'>"+fishes.records[i].problemas+"</p>"+
        "</div>"+
      "</div>"+
      "<div class='modal-footer bg-dark'>"+
        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>"+
        "<button type='button' class='btn btn-primary' href='"+fishes.records[i].tienda+"'>Comprar</button>"+
      "</div>";

      break;
    }
  }
}

function advices(){
  document.getElementById("advices").innerHTML = '';
  document.getElementById("infoFishesAdvice").innerHTML = '';

  $('#collapseThree').on('hidden.bs.collapse', function () {
    $('#collapseThree').collapse('show');
    $('#collapseOne').collapse('hide');
    $('#collapseTwo').collapse('hide');
  })

  if(this.checkFields()){
    var dataInput = this.getInputData();

    var liters = dataInput[0].value;
    var luminosity = dataInput[1].value;
    var bulbType = dataInput[2];
    var waterType = dataInput[3];
    var temperature = dataInput[4];
    var planted = dataInput[5];

    //Compruebo que existe algún pez que cumpla con el requisito de los litros
    var checkLiters = false;

    for (var i = 0; i < fishes.records.length; i++) {
      if(parseFloat(liters) >= parseFloat(fishes.records[i].litrosAcuario)){
        checkLiters = true;
      }
    }


    if(!checkLiters){
      document.getElementById("advices").innerHTML += "<p class='bg-white' style='color:red;''>No existe ningún pez que pueda añadirse a tu acuario y que se encuentre cómodo.</p>"
    }else if(waterType == "salada"){
      document.getElementById("advices").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de los peces de agua salada aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
    }else if(temperature == "fria"){
      document.getElementById("advices").innerHTML += "<p class='bg-white' style='color:red;''>Los datos de los peces de agua fría aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
    }else{
      var checkAdvices = false;
      while(!checkAdvices){
        //Obtengo el id aleatorio de un pez de los que ya existen y que cumpla con el requisito de los litros.
        do{
          var idFish = Math.floor(Math.random() * fishes.records.length);
        }while (parseFloat(liters) < parseFloat(fishes.records[idFish].litrosAcuario) /*|| fishes.records[idFish].tipoAgua == waterType*/);

        //Primero saco los peces compatibles, los cuales se encuentran en el json en compatibilidad. A partir de : estan separados por ,
        var compatibilySplitByTwoPoints = fishes.records[idFish].compatibilidad.toLowerCase().split(":");
        var compatibilySplitByTwoComa = compatibilySplitByTwoPoints[1].split(",");

        //Elimino los espacios en blanco que puedan tener
        for (var i = 0; i < compatibilySplitByTwoComa.length; i++) {
          compatibilySplitByTwoComa[i] = compatibilySplitByTwoComa[i].trim();
        }

        //Como el JSON acaba en punto, se lo quito al último dato
          compatibilySplitByTwoComa[compatibilySplitByTwoComa.length-1] = compatibilySplitByTwoComa[compatibilySplitByTwoComa.length-1].slice(0,-1);

        //Ahora comparo con otros peces para buscar los que son compatibles de forma aleatoria.
        var fishesCompared = new Set();

        do{
          var idFishToCompare = Math.floor(Math.random() * fishes.records.length);
          fishesCompared.add(idFishToCompare);
        
          //Comprueblo que el pez no es él mismo, que cumple el requisito de los litros y que se encuentra en las compatibilidades
          if(fishes.records[idFish].id != fishes.records[idFishToCompare].id && parseFloat(liters) >= parseFloat(fishes.records[idFishToCompare].litrosAcuario) && compatibilySplitByTwoComa.includes(fishes.records[idFishToCompare].nombreComun.toLowerCase().trim()) && fishes.records[idFish].tipoAgua == fishes.records[idFishToCompare].tipoAgua){
            var tempFish1 = fishes.records[idFish].temperatura.split("-");
            var tempFish2 = fishes.records[idFishToCompare].temperatura.split("-");
            var phFish1 = fishes.records[idFish].ph.split("-");
            var phFish2 = fishes.records[idFishToCompare].ph.split("-");
            var ghFish1 = fishes.records[idFish].gh.split("-");
            var ghFish2 = fishes.records[idFishToCompare].gh.split("-");

            var commonTemp = compareValues(tempFish1, tempFish2);
            var commonPh = compareValues(phFish1, phFish2);
            var commonGh = compareValues(ghFish1, ghFish2);

            if (commonTemp.length != 0 && commonPh.length != 0 && commonGh.length != 0){
              if(commonTemp.length == 1){
                var temperatureText = "El acuario debería tener una temperatura de "+commonTemp[0]+"ºC";
              }else{
                var temperatureText = "El acuario debería encontrarse en el rango de temperatura de "+commonTemp[0]+"-"+commonTemp[commonTemp.length-1]+"ºC";
              }

              if(commonPh.length == 1){
                var phText = "con un pH de "+commonPh[0]+"";
              }else{
                var phText = "con un pH que se encuentre entre "+commonPh[0]+"-"+commonPh[commonPh.length-1]+"";
              }

              if(commonGh.length == 1){
                var ghText = "y un gH de "+commonGh[0]+"";
              }else{
                var ghText = "y un gH que se encuentre entre "+commonGh[0]+"-"+commonGh[commonGh.length-1]+"";
              }

              document.getElementById("advices").innerHTML +=
              "<p class= 'bg-white'>Según las condiciones de tu acuario podrías mantener, por ejemplo, "+
              fishes.records[parseInt(idFish)].numeroCardumen+" "+ fishes.records[parseInt(idFish)].nombreComun+" junto a "+
              fishes.records[parseInt(idFishToCompare)].numeroCardumen+" "+ fishes.records[parseInt(idFishToCompare)].nombreComun+". "+ temperatureText+
              ", "+phText+" "+ghText+". Comprueba las fichas de las especies para obtener más información sobre ellas.</p>";

              document.getElementById("infoFishesAdvice").innerHTML +=  
              swiperBuilder(fishes.records[idFish].nombreComun,fishes.records[idFish].id,fishes.records[idFish].imagen,"loadFishesModelInfo")+
              swiperBuilder(fishes.records[idFishToCompare].nombreComun,fishes.records[idFishToCompare].id,fishes.records[idFishToCompare].imagen,"loadFishesModelInfo");
                  

              checkAdvices = true;

              break;
            }
          }
        }while (fishesCompared.size != fishes.records.length);

          if(fishesCompared.size == fishes.records.length && !checkAdvices){
            document.getElementById("advices").innerHTML +=
            "<p class= 'bg-white'>Por las condiciones de tu acuario es mejor que mantengas una única especie."+
            " Algo que podrías mantener sin problemas es, por ejemplo, "+fishes.records[parseInt(idFish)].numeroCardumen+ 
            " "+fishes.records[parseInt(idFish)].nombreComun+ " (comprueba su ficha para obtener más información)."+
            " El acuario debería encontrarse en el rango de temperatura de "+fishes.records[idFish].temperatura+
            "ºC, con un pH que se encuentre entre "+fishes.records[idFish].ph+" y un gH que se encuentre entre "+
            fishes.records[idFish].gh+".</p>";

            document.getElementById("infoFishesAdvice").innerHTML +=  
              swiperBuilder(fishes.records[idFish].nombreComun,fishes.records[idFish].id,fishes.records[idFish].imagen,"loadFishesModelInfo");

            checkAdvices = true;
            break;
          }
      }
    }
  }else{
    document.getElementById("advices").innerHTML += "<p class='bg-white' style='color:red;''>Por favor, rellene correctamente todos los campos marcados en rojo.</p>";
  }
}




function compareValues(value1, value2) {
  var commonValues = [];

  let commonMin = Math.max(value1[0], value2[0]);
  let commonMax = Math.min(value1[1], value2[1]);

  if (commonMin < commonMax) {
    commonValues.push(commonMin);
    commonValues.push(commonMax);
  }else if(commonMin == commonMax){
    commonValues.push(commonMin);
  }

  return commonValues;
}


var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetweenSlides: 10,
  slidesPerGroup: 1,
  breakpoints: {
    800: {
      slidesPerView: 3,
      spaceBetweenSlides: 30,
      slidesPerGroup: 3,
    },
  },
  loop: false,
  loopFillGroupWithBlank: false,
});

/* JSON */

var plants = JSON.parse('{"records":[{"id":1,"nombreComun":"Ambulia","nombreCientifico":"Limnophila sessiliflora","luzLED":"27","luzFluorescente":"50","temperatura":"22-28","ph":"6.0-8.5","gh":"4-12","tipoAgua":"dulce","sustrato":"Grava fina.","zonaAcuario":"Parte media o trasera.","dificultad":"Baja","distribucionYHabitat":"Procede del sudeste asiático donde puede ser considerada como una plaga por su capacidad de reproducción. Es capaz de desarrollarse en diferentes ambientes, su capacidad para tolerar diferentes cambios químicos del agua la hacen una planta invasiva que puede vivir en lagos, arroyos y aguas estancadas.","forma":"Planta frondosa y de color verde intenso. Tiene un tallo principal que se divide en diferentes ramas.","tamaño":"Puede llegar a medir unos 40 o 50 centímetros de altura, pudiendo crecer a una velocidad de 5 centímetros por semana.","reproduccion":"Se reproduce con facilidad a través de esquejes. Sacar un esqueje cortando unos diez centímetros de la parte superior de la planta, retirr las hojas que queden en la parte inferior para no enterrarlas y meter con una pinza el esqueje en el sustrato. Separar los nuevos esquejes de la planta originaria para que no se peguen en exceso.","consejos":"Las Limnophila prefieren el agua blanda y ácida. Su mejor rango de temperatura oscila los 24-27ºC. Si la iluminación es más intensa, el crecimiento es más denso y apretado, mientras que con una iluminación menos intensa, crece de forma más alargada, con un color menos vivo y menos densa. La grava fina facilita su enraizamiento. El fondo se puede acompañar con arcilla y ser rico en nutrientes minerales para evitar que se tenga que abonar de forma frecuente, sino se pueden abonar con productos ricos en sales minerales.","compatibilidad":"Se recomienda utilizar en un acuario con Guppys y Platys.","problemas":"No es conveniente utilizarla en un acuario con peces herbívoros porque en su crecimiento es una planta frágil que se puede romper con facilidad.","imagen":"images/plants/Limnophila-sessiliflora.jpg","tienda":""},{"id":2,"nombreComun":"Anubias Nana","nombreCientifico":"Anubias barteri var. nana","luzLED":"10","luzFluorescente":"25","temperatura":"22-28","ph":"6.0-7.5","gh":"3-8","tipoAgua":"dulce","sustrato":"Se adapta bien a casi cualquier sustrato. Se puede pegar en piedras y troncos usando un pegamento adecuado para plantas.","zonaAcuario":"Parte delantera o media.","dificultad":"Baja","distribucionYHabitat":"El genero de las Anubias es endémico de África tropical. Actualmente tiene una amplia distribución en Europa, Asia y Estados Unidos. En estado silvestre habita en embalses muy poco profundos , zanjas, estanques, arroyos, ríos, áreas boscosas y pantanos, generalmente a lo largo de la orilla con fondo fangoso y nivel de agua variable.","forma":"Plantas de acuario muy pequeñas. Crecen compactas y cuentan con una coloración que va del verde claro al oscuro brillante. El envés de las hojas es más claro. Sus hojas son coriáceas, ovaladas y miden entre 3 cms a 5 cms de ancho, y unos 6 cms de largo. Su flor es de color blanco cremoso, con el estigma en color amarillo.","tamaño":"No suelen sobrepasar los 15 centímetros de altura.","reproduccion":"Poseen un rizoma que se extiende lateralmente. La propagación se realiza simplemente cortando el rizoma de la planta madre. Los esquejes sólo deben tomarse de plantas maduras y sanas utilizando tijeras esterilizadas. Cada corte debe tener al menos 3 hojas. El rizoma no debe enterrarse bajo el sustrato, ya que se pudre y muere.","consejos":"Las Anubias Nana son plantas muy fuertes y resistentes con un crecimiento muy lento. Raramente tienen problemas. Se cultiva bien con una luz fija de entre 7 a 10 horas. Crece bien con el CO2 exhalado por el pez y no necesita CO2 adicional aunque lo agradece. También le favorecen los cambios regulares de agua y una dosis ocasional de fertilizante, como abonos líquidos para plantas de acuario.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Puede ser infectada por algas, pero con los conocidos peces chupalagas el problema suele arreglarse solo. Nos podemos encontrar que las hojas amarillen, lo que se denomina clorosis. Si observamos que las hojas se ponen amarillas, es posible que la iluminación sea muy baja o por faltan nutrientes.","imagen":"images/plants/Anubias-Nana.jpg","tienda":""},{"id":3,"nombreComun":"Bacopa","nombreCientifico":"Bacopa monnieri","luzLED":"27","luzFluorescente":"50","temperatura":"15-30","ph":"6-9","gh":"6-13","tipoAgua":"dulce","sustrato":"Grava fina. Se recomienda incluir concentraciones de cloruro y cadmio.","zonaAcuario":"Parte media o trasera.","dificultad":"Baja","distribucionYHabitat":"Planta herbácea perenne que vive en ambientes húmedos y orillas fangosas. Crece en agua tanto dulce como ligeramente salobre. Es originaria de las zonas pantanosas de Nepal, Sri Lanka, India, Vietnam, Taiwán y China. En Estados Unidos, específicamente en la Florida y los estados sureños, se cultiva en lagunas y jardines pantanosos.","forma":"Es una planta suculenta con forma redondeada. Sus hojas son gruesas y oblanceoladas, dispuestas en sentido contrario al tallo, el cual es fino y erguido. Puede llegar a florecer dando una flor por tallo, pero sólo ocurrirá si están por encima del nivel del agua. Su coloración habitual es el verde brillante.","tamaño":"Llega hasta los 50 centímetros de largo y 3 centímetros de diámetro. Crece de forma moderada, pudiendo llegar a 10 centímetros al mes.","reproduccion":"Se multiplican muy fácilmente por esquejes. Es aconsejable buscar los más vigorosos y sanos para replantarlos en el sustrato fijándolos en espacios compactos. Cuando se observen las primeras hojas se puede concluir que el esqueje ya está enraizado y comienza su crecimiento y posterior reproducción.","consejos":"En general son plantas muy resistentes que se adaptan perfectamente a diferentes condiciones de pH, gH y sustratos. Se puede abonar con abono que contenga Ca, Mg, He y micronutrientes.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Nos podemos encontrar que las hojas amarillen, lo que se denomina clorosis. Si observamos que las hojas se ponen amarillas, es posible que la iluminación sea muy baja o por faltan nutrientes. Puede ser infectada por algas, por lo que se recomienda que se hagan cambios de agua de forma regular.","imagen":"images/plants/bacopa-monnieri.jpg","tienda":""},{"id":4,"nombreComun":"Musgo japonés","nombreCientifico":"Aegagropila linnaei","luzLED":"10","luzFluorescente":"25","temperatura":"20-28","ph":"6.5-8.5","gh":"9-30","tipoAgua":"dulce","sustrato":"Es indiferente el sustrato y abono del acuario, sin embargo, la grava fina es lo más adecuado para la Cladophora.","zonaAcuario":"Parte media o trasera.","dificultad":"Baja","distribucionYHabitat":"La Cladophora tiene una distribución muy amplia. Su hábitat habitual son los fondos de los lagos, donde suele encontrarse en zonas poco profundas, aunque se sabe que pueden llegar a vivir hasta a 25 metros de profundidad, en condiciones muy duras, ya que soportan temperaturas entre 5ºC y -28ºC y niveles de sal de un 5% a 6%.","forma":"Es un alga que crece en grupos y que normalmente al entrar en contacto total con el agua se forma una bola esférica muy densa. El interior está compuesto principalmente por lodo y restos de tallos muertos. Las más grandes se suelen quedar huecas, dando a un original fenómeno por el que pueden llegar a flotar. ","tamaño":"Puede llegar a medir hasta 30 centímetros de diámetro.","reproduccion":"Se reproduce de manera sencilla. Solo se debe dividir la bola para obtener nuevas plantas. Para que vuelva a crecer de manera natural y de forma esférica debe estar sujeta dentro del acuario. De lo contrario, es necesario moverla diariamente para que todos sus lados obtengan luz.","consejos":"Son muy convenientes para los gambarios: a los camarones les encanta posarse sobre las bolas de musgo y alimentarse de las partículas que quedan retenidas en ellas. Son grandes consumidoras de nitratos, por lo que son capaces de mantener al resto de algas a raya. Se conserva bien en casi cualquier situación del acuario. Cómo su crecimiento es extremadamente lento, se puede añadir CO2 al acuario para que se acelere. Son grandes consumidoras de CO2, a cambio aportan también mucho oxígeno al acuario.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Hay que estar atento al CO2 del acuario, ya que sin un aporte adecuado de éste puede acabar muriendo.","imagen":"images/plants/cladophora-aegagrophila.jpg","tienda":""},{"id":5,"nombreComun":"Helecho de Java","nombreCientifico":"Microsorum pteropus","luzLED":"10","luzFluorescente":"25","temperatura":"10-30","ph":"5.5-8.0","gh":"4-20","tipoAgua":"dulce","sustrato":"Se adaptan a casi cualquier sustrato e inlcuso sobreviven muy bien sujetas a piedras y troncos.","zonaAcuario":"Parte delantera o media.","dificultad":"Baja","distribucionYHabitat":"Es un helecho que se puede encontrar en la Isla de Java, de ahi su nombre común, así como en Malasia, Tailandia y determinadas regiones de China. Esta amplia distribución geográfica, es la que proporciona diferentes tipos de hojas, tamaño y forma. En estado natural, sus raíces se unen a las rocas y puede crecer total o parcialmente sumergida.","forma":"Sus hojas, aunque pueden presentar varias formas (hoja estrecha, hoja de aguja, hoja de Windelov, etc.), suelen ser alargadas y hondeadas. Su coloración varía desde el verde bajo hasta el verde intenso, aunque puede amarronarse cuando está en fase reproductiva. Puede ser un helecho acuático o terrestre, aunque a menudo se encuentra en las orillas. El helecho de Java posee un rizoma del que brotan las hojas. Este rizoma está compuesto de falsas raíces que actúan como ancla de la planta al sustrato, y de raíces reales. Aparentemente son iguales, salvo por que las raíces reales poseen tricomas, una vellosidad que recorre las raíces, mientras que las falsas, que tienen como única misión fijar la planta, no poseen esta vellosidad. Las raíces no tienen la misión de trasportar los nutrientes a las hojas, como sucede en la mayoría de las plantas, su única misión es servir de sujeción a la planta, que absorbe sus nutrientes a través de las hojas.","tamaño":"Su tamaño es muy variable, está aproximadamente entre los 15 y los 30 cm de altura, y no más de 15 o 20 cm de ancho. Su crecimiento es muy lento.","reproduccion":"En la naturaleza se puede reproducir por esporas transportadas por el aire, pero en un acuario es muy díficil. La forma más habitual es dividiendo el rizoma rastrero, que crece a lo ancho y del que brotan nuevas hojas a medida que crece. Otra forma es obteniendo pequeñas plantas a partir de la poda de las hojas. Consistiría en cortar la parte superior de la hoja y sembrarla en el sustrato.","consejos":"Son plantas muy sencillas de mantener. Crecen sin necesidad de prestarle mucha atención y su crecimiento no es excesivo, por lo que no debemos preocuparnos de que acabe invadiendo el acuario. No es una planta que lleve bien que enterremos sus raíces, su rizoma debe crecer adherido a un tronco o la superficie de unas rocas, pero si lo plantamos, debemos procurar que sólo sea parcialmente. Cuando el acuario cuenta con una alta cantidad de peces, su crecimiento resulta más exuberante debido a la cantidad de nutrientes procedentes del desecho de los peces.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Si la iluminación es muy intensa debe ser colocada bajo alguna otra planta o en algún lugar que haga sombra pues puede llegar a deteriorarse.","imagen":"images/plants/Microsorum-pteropus.jpg","tienda":""},{"id":6,"nombreComun":"Lenteja de Agua","nombreCientifico":"Lemna minor","luzLED":"27","luzFluorescente":"50","temperatura":"15-20","ph":"6.0-7.5","gh":"3-15","tipoAgua":"dulce","sustrato":"Son plantas que flotan en la superficie del agua por lo que no necesitan ningún tipo de sustrato.","zonaAcuario":"Superficie del agua.","dificultad":"Baja","distribucionYHabitat":"Es una planta flotante que se suelen encontrar en zonas estancadas o de curso muy lento en las regiones de América, Australia, Asia y Europa, regiones tropicales y subtropicales. La familia está constituida por plantas acuáticas muy primitivas, consideradas como las fanerógamas más pequeñas y se distribuyen en casi todas las aguas dulces estancadas o poco movidas de casi todas las zonas templadas, subtropicales y tropicales del globo terráqueo. En España se citan dos especies que pueden encontrarse en charcos y estanques: Lemna minor y Lemna polirrhiza.","forma":"Están conformadas por una diminuta lámina verdosa o verde amarillenta, cuya parte inferior, en contacto con el agua lleva una o varias raicillas diminutas, filiformes, simplificadas en auténticos rizoides que llevan una cubierta protectora en su extremo. Son vegetales perennes, transformados en organismos muy reducidos cuyas primitivas raicillas, bastante cortas, se internan en el agua que sobrenada la parte verde, obteniendo las sustancias minerales y orgánicas requeridas para su sustento. La falsa hoja aparente de las Lemnáceas es en realidad una especie de mezcla transformada, de tallo reducido a su mí­nima expresión, o inexistente, que tiene forma ovalada lenticular y bastante aplanada.","tamaño":"Aproximadamente 1cm. Cada hoja tiene una anchura de entre 2 u 3 milímetros.","reproduccion":"Este tipo de plantas de agua poseen órganos florales simples muy pequeños, y es común que su propagación reproductiva sea por vía de la germinación. También se puede reproducir vía asexual, esto quiere decir que se desarrollan pequeños brotes muy parecidos a la planta madre que se desprenden de ella, formando inmediatamente una lana verde espesa. Su reproducción es extremadamente rápida.","consejos":"La letenja de agua se adapta a cualquier tipo de iluminación, aunque cuando están en el proceso de desarrollo de su ciclo de vida se recomienda una iluminación media o intensa de doce a catorce horas al día. La lenteja de agua ayuda a tamizar la luz de las peceras que necesitan una tenue iluminación. Es una planta que se puede mantener en un acuario sin filtro.","compatibilidad":"Se adapta bien con casi cualquier especie. Ecológicamente la lenteja de agua es beneficiosa por su adaptabilidad e interacción con las demás especies, siendo un punto positivo para el hábitat donde se desarrolla, ya que ayuda a que la luz se mantenga tenue en los estanques tropicales. También beneficia al ambiente, ya que ayuda al tratamiento de las aguas residuales absorbiendo los contaminantes y forma parte de los alimentos para los animales domésticos.","problemas":"Son muy pocos los cuidados que necesita la lenteja de agua. No es recomendable ofrecer comida flotante a los peces, porque se queda atrapada en la lenteja y se daña.","imagen":"images/plants/lenteja-de-agua.jpg","tienda":""},{"id":7,"nombreComun":"Musgo de Java","nombreCientifico":"Vesicularia dubyana","luzLED":"10","luzFluorescente":"25","temperatura":"20-26","ph":"6.5-8.0","gh":"3-12","tipoAgua":"dulce","sustrato":"Se adaptan a cualquier sustrato e incluso a cualquier superficie, incluido el cristal.","zonaAcuario":"Parte delantera o media.","dificultad":"Baja","distribucionYHabitat":"Originaria del Sudeste asiático, crece en los cursos de agua lentos tropicales de la Isla de Java, Sumatra, Borneo y archipiélagos colindantes en zonas umbrosas y a profundidades variables sobre las orillas de lagos y riachuelos.","forma":" Es una planta tapizante de acuario de porte denso que crece en filamentos o tallos filiformes muy alargados cubiertos de pequeñísimas hojas opuestas, puntiagudas, imbricadas como escamas y que se entrelazan con otros tallos creando auténticas masas, esponjosas y densas.","tamaño":"Las hojas suelen tener 1,5 mm de ancho y unos 5 mm de longitud.","reproduccion":"En la naturaleza el musgo de Java se reproduce por esporas pero en un acuario es muy complicado. La mejor opción es mediante división de la planta. Tomamos un trozo de la planta, que se retira con mucha facilidad, y procedemos a plantarla en otro lugar. Crece muy bien sobre cáscaras de coco, maderas y rocas volcánicas o silíceas.","consejos":"El exceso de luz puede perjudicar al musgo de Java haciendo crecer sobre él algas verdes que asfixian la planta y deslucen su efecto. Como es una planta que no “arraiga” sobre sustrato y que la alimentación que recibe es a través de sus hojas, es recomendable que el acuario donde la vayamos a colocar ya esté ciclado y en funcionamiento desde hace un tiempo. Si es atacada con algas, la mejor opción es eliminar las zonas con más algas. Usar un producto antialgas puede ser perjudicial para el musgo de Java.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Uno de los problemas habituales del musgo de Java es que adquiera un tono marrón. Esto quiere decir que esa zona del musgo ha muerto. Lo primero que tenemos que hacer es retirar las partes dañadas y puede que las partes que aún están verdes comienzan a crecer. Si eso no lo arregla es posible que la planta esté expuesta a demasiada iluminación. Otra medida que funciona es usar o aumentar el CO2.","imagen":"images/plants/musgo-de-java.jpg","tienda":""}]}');
plants.records.sort((a, b) => {
    if (a["nombreComun"] < b["nombreComun"]) {
        return -1;
    }
    if (a["nombreComun"] > b["nombreComun"]) {
        return 1;
    }
    return 0;
});

var fishes = JSON.parse('{"records":[{"id":1,"nombreComun":"Guppy","nombreCientifico":"Poecilia reticulata","litrosAcuario":"60","temperatura":"18-28","ph":"5.5-8.0","gh":"6-15","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"5","dieta":"El guppy es omnívoro, acepta comida vegetal y le encanta degustar artemia, daphnia y larvas de mosquito. En su hábitat natural la alimentación del guppy se basa en las larvas de mosquito. Su boca súpera indica que se alimenta de la superficie aunque puede bajar al fondo a comer si fuera necesario. El sistema digestivo del guppy es rápido por lo que hay que tener cuidado con la sobrealimentación. Echar varias veces de comer pero en muy pequeñas cantidades.","descripcion":"El guppy presenta unas aletas pectorales situadas en la parte alta de los lados del cuerpo. Sus aletas pélvicas se encuentran algo adelantadas. El macho es más colorido que la hembra. Además, posee un gonópodo (órgano copulador) en lugar de la aleta anal trasera. En los machos, las aletas y colas están mucho más desarrolladas y coloridas que en las hembras. La hembra presenta un mayor tamaño que el macho (unos 4 cm por 3 cm en el macho) siendo siempre algo menos colorida. Además, cuando se encuentra embarazada, presenta una mancha oscura a nivel del estómago.","longitud":"Las hembras son más grandes que los machos y no suelen superar los 5 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Es una especie que vive en grupos difusos, en estanques, pantanos y arroyos. La mayoría de las veces residen cerca de la superficie, en áreas poco profundas con vegetación cerca de las orillas. Muchas especies son capaces de aclimatarse al agua salobre y se encuentran también en manglares y ensenadas costeras. Es originaria de América del sur, aunque ha sido introducido para combatir el paludismo por su eficacia y depredación hacia las larvas de mosquito en países como Australia, América del norte o Namibia.","reproduccion":"Los guppys son peces ovovivíparos, las hembras desarrollan los huevos en su interior hasta que éstos están maduros y, cuando alumbran, los alevines salen del vientre de sus madres completamente desarrolladas, cayendo primero al fondo para inmediatamente después nadar. A los tres meses de vida, los guppys ya son sexualmente activos. La hembra fecundada engorda notablemente y muestra en su parte posterior una mancha negra.","consejos":"Es aconsejable un acuario bien plantado para que los alevines se puedan refugiar, la cabomba, musgo de java y sobre todo plantas de superficie tipo riccia y lenteja son muy adecuadas ya que los alevines recién nacidos suelen subir atraídos por la luz. Sin embargo, para evitar que los machos guppy estresen a las hembras, es necesario mantener más hembras que machos en el mismo acuario. Se aconseja una relación de un macho por cada cuatro o cinco hembras.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Molly negro, Molly vela, Platy, Xipho, Corydora bronceada, Pez cebra, Danio perla, Neón chino.","problemas":"El comportamiento opresivo de los machos puede llegar a cansar a las hembras hasta tal punto que, a veces, puede conducirlas a la muerte. Por ello es también importante proveer al acuario de numerosas plantas que les aporten refugio. Esta especie aprecia un entorno particularmente rico en vegetación.","imagen":"images/fishes/Guppy.jpg","tienda":""},{"id":2,"nombreComun":"Pez Betta","nombreCientifico":"Betta splendens","litrosAcuario":"50","temperatura":"24-28","ph":"6.5-7.5","gh":"5-20","tipoAgua":"dulce","dificultad":"Media","numeroCardumen":"1","dieta":"La alimentación del pez betta es variada porque, aunque son omnívoros, pueden alimentarse como si fueran carnívoros. Las escamas son un alimento que pueden consumir pero no debe ser lo principal en su dieta. También comen crustáceos e insectos como mosquitos, gusanos, artemia, etc., En la naturaleza se alimentan de organismos vivos como zooplancton, insectos, larvas y huevos de insectos en la superficie del agua.","descripcion":"El pez Betta, conocido popularmente como pez luchador de Siam, pertenece al género de los Belóntidos, de la familia Osphronemidae. Casi todos los peces Betta tienen la coletilla luchador o combatiente, sin embargo el pez Betta Imbellis, denominado “combatiente pacífico”, puede convivir perfectamente con otros machos dentro de un acuario, siempre que tengan suficiente espacio y hembras para todos. Es uno de los peces más populares para acuarios de agua dulce, por su gran variedad en coloridos, forma de su cola y aletas. Su cuerpo es fusiforme (alargado y elíptico), además de hidrodinámico. Una de sus características morfológicas mas originales es su órgano respiratorio accesorio, llamado laberinto. Este órgano le permite al pez Betta respirar aire atmosférico, que suele estar más desarrollado en aquellas especies que viven en ambientes con menos oxígeno. El sobrenombre de Pez luchador de Siam, se deriva de la tradición tailandesa de criar peces para luchar entre sí en combates organizados, en los que los participantes y espectadores realizan apuestas sobre el resultado del combate. El pez Betta Splendens, que es el verdadero pez luchador de Siam, es fruto de una cría selectiva de peces, buscando potenciar el vigor y la fuerza. Parece que el género actual es un híbrido en el que se incluyeron al Betta Imbelis, Smaragdina y Mahachaiensis.","longitud":"El pez Betta splendens puede alcanzar los 7 centímetros.","temperamento":"Agresivo","distribucionYHabitat":"Es originario del sudeste de Asia, incluyendo la península del norte de Malasia, el centro y el este de Tailandia, Camboya, y el sur de Vietnam. En libertad es posible encontrarlos en aguas tranquilas y con poco movimiento, como son los arrozales, pantanos, arroyos y estanques. A menudo estas aguas llenas de vegetación, lodo o arena, que contienen poco oxígeno disuelto. Se han adaptado a vivir en una gran variedad de situaciones complicadas, desde zanjas con agua estancada, a bosques pantanosos, donde la composición del agua es muy ácida.","reproduccion":"Los Betta suelen practicar la incubación bucal. Construyen nidos de burbujas envueltos en mucus salival. Los nidos de burbujas los construyen los machos. Debemos proveer el acuario de algún tipo de cobertura, como son las plantas de superficie, que les sirvan de lugar de anidación. Las hembras se vuelven más pálidas antes del desove y le aparecen unas barras oscuras en los laterales. La hembra a veces intenta comerse los huevos, siendo los machos los que asumen la responsabilidad de vigilar y cuidar el nido. Los huevos eclosionarán en 24 a 48 horas. Una vez que los alevines empiezan a nadar, el macho pierde todo el interés por el nido. Los machos tienen una aleta dorsal y anal más desarrollada que las hembras y unos colores mucho más llamativos y espectaculares. Además, a diferencia de las hembras, los machos presentan un comportamiento muy agresivo con otro espécimen de su mismo sexo.","consejos":"Es cierto que los peces Betta pueden sobrevivir en acuarios de incluso 15 litros, pero aquí siempre ponemos las condiciones en las que el puez de encuentre más cómodo. Se recomienda un acuario con abundante vegetación superficial para que pueda poner sus nidos de burbujas. Nunca poner dos machos juntos pues pueden llegar a matarse. Evitar las corrientes de agua, ya que son peces de aguas tranquilas. ","compatibilidad":"Si el acuario es grande, los Betta se pueden compatibilizar con peces de temperamento muy tranquilo ya que no compiten por el espacio. Por ejemplo: Platy, Corydora bronceada.","problemas":"Es normal que los Betta suban a respirar algo de oxígeno a la superficie, pero si lo hacen con mucha frecuencia es que tienes falta de oxígeno en el acuario.","imagen":"images/fishes/Betta-splendens.jpg","tienda":""},{"id":3,"nombreComun":"Pez Óscar","nombreCientifico":"Astronotus ocellatus","litrosAcuario":"600","temperatura":"20-28","ph":"6.0-7.5","gh":"6-30","tipoAgua":"dulce","dificultad":"Media","numeroCardumen":"1","dieta":"Siendo en la naturaleza principalmente piscívoro, en cautiverio puede ser alimentado además de con pequeños peces, con lombrices, invertebrados, trozos de pescado, pollo, ternera (todo esto debe ser proporcionado con cuidado de que no queden desperdicios en el acuario), además del alimento congelado que se puede encontrar para peces.","descripcion":"Pez con forma ovalada, comprimido lateralmente y de gran tamaño. Sus aletas están muy desarrolladas, especialmente la dorsal y anal que llegan hasta la finalización de la aleta caudal, ésta última es redondeada. Las dos especies que conforman el género Astronotus poseen como el resto de los cíclidos dientes en sus quijadas, pero además cuentan con la particularidad de poseer tambien dentición en la placa faringeal. En su forma salvaje, su fondo es de color verde oliva grisáceo, con manchas anaranjadas por todo el cuerpo, con un ocelo característico donde comienza la aleta caudal. En cautiverio, podemos encontrar variedades rojas, atigradas, albinas, etc. Se trata de un pez que va cambiando de aspecto a medida que envejece, siendo en su estado juvenil muy atrayente, con colores amarillos y marrón claro, mientras que cuando envejecen resultan menos vistosos. Se dice que se les puede enseñar a realizar pequeños trucos, es inteligente, puede comer de nuestra mano, e incluso pueden ser acariciados. Responden a los mimos que les prodigan sus dueños, siendo sensibles y también exigentes, como si formaran parte del núcleo familiar.","longitud":"Puede llegar a los 35 centímetros.","temperamento":"Poco agresivo","distribucionYHabitat":"El Astronotus ocellatus es un pez originario de la región amazónica, estando presente en Colombia, Venezuela, Bolivia, Ecuador, Perú, Brasil, Guayana Francesa, Paraguay, Uruguay y Argentina. Se puede encontrar en aguas poco profundas y tranquilas, con aguas blancas y limosas, donde habitualmente se encuentra cerca de raíces de árboles o bajo cubiertas vegetales.","reproduccion":"Son fáciles de reproducir en cautividad, siempre que tengan suficiente espacio y estén bien alimentados. Generalmente depositan los huevos en piedras que limpian para la ocasión. Los huevos son de un color marrón claro, hasta las 24 horas donde se tornan transparentes. Al cabo de unas 48 horas eclosionan y son transportadas por los padres a zonas del acuario donde puedan estar más seguras, pudiéndose tratar de cavidades preparadas por tan cuidadosos y dedicados padres que los defenderán ferozmente contra cualquier amenaza. En principio los alevines se aferran constantemente al fondo, rocas, plantas o incluso al vidrio, pero cuando comienzan a nadar libremente pueden ser alimentadas con artemias y en pocos días aceptarán alimento comercial finamente triturado o líquido para alevines.","consejos":"Necesitan un agua bien oxigenada pero no gustan de demasiado movimiento del agua. Son peces con tendencia a excavar en el sustrato, que debe ser suave y arenoso, con algunas rocas, raíces y ramas grandes de madera flotando para darle mayor naturalidad y proporcionarles lugares donde esconderse. Se recomienda hacer cambios de agua semanales, en el que se cambie entre el 30% y el 50% del volumen de acuario y tener un filtro y calentador externo pues pueden llegar a romperlos. En cuanto a las plantas, como los demás cíclidos, suelen romperlas al excarvar el sustrato.","compatibilidad":"El pez óscar no es agresivo, sin embargo, su tamaño y su voracidad le inhibe para compartir acuario con otros peces de menor tamaño. Se pueden buscar otros cíclidos de tamaño similar con el que compartir espacio, aunque esto requiere tener un acuario de gran tamaño. Puede convivir con peces de fondo siempre y cuando éstos no sean de pequeño tamaño. Por ejemplo: Gurami gigante, Flower Horn.","problemas":"El pez óscar puede verse afectado por una enfermedad llamada Hexamita, que provoca agujeros en la cabeza. Esta enfermedad provoca necrosis celular en los músculos de la cabeza. La Hexamitiasis está causada por un protozoo llamado Hexamita que se encuentra en los intestinos de los animales y que llegan allí ingeridos con el alimento. Normalmente no son un problema, salvo que los peces sean sometidos a situaciones de estrés en el acuario, fruto de un número excesivo de peces, una calidad del agua inadecuada, cambios bruscos de temperatura o una dieta inapropiada.","imagen":"images/fishes/Astronotus_ocellatus.jpg","tienda":""},{"id":4,"nombreComun":"Flower Horn","nombreCientifico":"Cichlasoma Flowerhorn","litrosAcuario":"250","temperatura":"24-30","ph":"6.5-7.8","gh":"9-20","tipoAgua":"dulce","dificultad":"Media","numeroCardumen":"1","dieta":"Son omnívoros y pueden ser alimentados con Krill, Bloodworm, Gusanos, Grillos secos, Saltamontes secos, pequeños filetes de pescado y Gammarus. La frecuencia de alimentación debe ser generalmente entre dos o tres veces al día pero esto dependerá de qué tan saludable se encuentre su sistema digestivo y el tamaño correcto de las porciones.","descripcion":"El pez Flower Horn pertenece a la familia cichlidae híbrida. Es una especie que se creó selectivamente por acuaristas asiáticos a finales del siglo XX, específicamente en 1998, y apareció en el mercado bajo el nombre de Hua Lou Han. Es de cuerpo alargado y angosto lateralmente, aunque existen algunas variedades con sus costados más redondeados. Su gran aleta dorsal le hace ver cómo un pez atractivo ya que se extiende hasta la base de su cola, sin embargo, la característica más sobresaliente de la morfología del pez con cuerno es su cabeza abultada y ojos plantados. Tanto el macho como la hembra esta gran joroba y cuerpos voluminosos, siendo bastante difícil diferenciarlos. Estos peces se han hecho muy populares por la combinación de colores que poseen y sus patrones de manchas desiguales.","longitud":"Puede alcanzar los 30 centímetros.","temperamento":"Agresivo","distribucionYHabitat":"El pez Flower Horn no existe en la naturaleza, aunque se han liberado varios ejemplares en algunos lagos estos han causado alteraciones en el ecosistema.","reproduccion":"Es una variedad de peces cíclidos que se reproduce con mucha facilidad en condiciones normales. Los peces Flowerhorn son maduros entre los 1.5 a 2 años de edad, aunque algunos ejemplares pueden ser capaces de reproducirse antes de cumplir el año de edad. La hembra, depositará los huevos en superficies planas lisas, incluso sobre el propio fondo del acuario. Aproximadamente cada puesta tendrá 1000 huevos, que posteriormente serán fertilizados por el macho. Lo habitual es que la madre cuide de cada uno de ellos, mientras que el macho vigilará el territorio. La eclosión ocurre 72 horas después del desove, donde los padres los llevarán a un gran hoyo para que luego de 5 días empiecen a nadar libremente. Es habitual que la pareja cuide de sus crías durante unos dos meses.","consejos":"Son peces con tendencia a excavar en el sustrato, que debe ser suave y arenoso, con algunas rocas, raíces y ramas grandes de madera flotando para darle mayor naturalidad y proporcionarles lugares donde esconderse. En cuanto a las plantas, como los demás cíclidos, suelen romperlas al excarvar el sustrato. Una de las ventajas es que no necesitan cuidados tan meticulosos como otras variedades de cíclidos, son muy resistentes y pueden ser básicamente mantenidos por cualquier principiante.","compatibilidad":"Como ocurre con la mayoría de cíclidos, sus compñaeros no pueden ser de un tamaño menor al de él. Puede convivir con peces de fondo siempre y cuando éstos no sean de pequeño tamaño. Debes evitar todos los peces que son muy activos porque se irrita con facilidad. Por ejemplo: Pez Óscar, Flower Horn.","problemas":"No se recomienda el uso de alimentos vivos en su dieta pues es muy susceptible a las infecciones parasitarias por una dieta inadecuada.","imagen":"images/fishes/Cichlasoma_Flowerhorn.jpg","tienda":""},{"id":5,"nombreComun":"Molly negro","nombreCientifico":"Poecilia sphenops","litrosAcuario":"100","temperatura":"18-28","ph":"6.8-7.2","gh":"7-20","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"8","dieta":"Son omnívoros. Esta especie puede ser alimentada con alimentos secos (copos, gránulos), alimentos frescos y alimentos congelados. Para evitar deficiencias, se recomienda variar el tipo de alimento.","descripcion":"Es un pez que presenta una coloración unicolor con un cuerpo mayoritariamente plateado y negro, aunque algunos pueden tener motitas de color amarillo o naranja. Las hembras poseen un abdomen más redondeado que el de los machos. Por otro lado, los machos cuentan con un gonopodio en su aleta caudal. Tiene diferentes variaiones, como la conocido Molly balón.","longitud":"Pueden llegar hasta los 7 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"En estado silvestre se puede encontrar en muchas partes del mundo, aunque son originarios del sudeste de Estados Unidos, Venezuela y Colombia hasta México. Se sabe de poblaciones aisladas en algunas islas del Caribe. Son peces que suelen vivir en las desembocaduras de los ríos, por lo que aguantan cierto grado de salinidad en el agua.","reproduccion":"Si las condiciones del acuario son adecuadas, la reproducción es muy sencilla. La gestación del pez Molly embarazada dura unas 8 semanas, al final de las cuales podemos encontrarnos con más de 100 pequeños alevines. Se recomienda poner a la hembra en una paridera debido al canibalismo que se da. Una vez la hembra ha parido, hay que retirarla de la paridera dejando a los alevines solos.","consejos":"Para evitar que los machos guppy estresen a las hembras, es necesario mantener más hembras que machos en el mismo acuario. Se aconseja una relación de un macho por cada tres hembras.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy, Platy.","problemas":"La enfermedad más común en los Molly es la denominada enfermedad del Molly, provocada por la bacteria Columnaris, Flavobactetium columnare, que provoca deformación en la columna de los peces. Existen tratamientos a base de permanganato de potasio y terramicina y se recomienda aislar a los peces afectados. También es sensible a la enfermedad del punto blanco y a la tuberculosis.","imagen":"images/fishes/poecilia_sphenops.jpg","tienda":""},{"id":6,"nombreComun":"Molly vela","nombreCientifico":"Poecilia latipinna","litrosAcuario":"90","temperatura":"25-28","ph":"7.2-8","gh":"8-18","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"3","dieta":"En hábitat natural son casi exclusivamente herbívoros y se alimentan de algas y otros materiales vegetales. No obstante, los criados en acuarios aceptan la mayoría de los alimentos que se les ofrecen, pero debería incluirse en la dieta alguna materia vegetal, como espinacas escaldadas o copos de verduras. Si no se proporciona suficiente materia verde, el desarrollo de la aleta dorsal del macho puede verse afectado.","descripcion":"Es un pez que presenta una coloración tricolor con un cuerpo mayoritariamente amarillo, azul y plateado. Los machos cuentan con una aleta dorsal mucho más desarrollada que la de la hembra además de un gonópodo. Es un pez que vive en pequeños grupos cerca de la superficie. Es un animal herbívoro de temperamento tranquilo. Tras la cría selectiva de esta especie se pueden encontrar variaciones en las que el cuerpo está redondeado, dando una apariencia de globo. Comúnmente se le conoce como Molly balón dálmata.","longitud":"Pueden llegar hasta los 15 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Esta variedad de poecilia procede del sur de Norteamérica y de México. Suele encontrarse en arroyos costeros con mucha vegetación, estanques, pantanos, canales y zanjas. Está especialmente asociada a hábitats salobres en los que las algas y otro fitoplancton están presentes en grandes cantidades.","reproduccion":"Si las condiciones del acuario son adecuadas, la reproducción es muy sencilla. La gestación del pez Molly embarazada dura unas 8 semanas, al final de las cuales podemos encontrarnos con más de 100 pequeños alevines. Se recomienda poner a la hembra en una paridera debido al canibalismo que se da. Una vez la hembra ha parido, hay que retirarla de la paridera dejando a los alevines solos.","consejos":"Al ser una especie que vive en grupos se aconseja introducir al menos tres individuos con una relación de un macho por cada dos hembras.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy, Platy.","problemas":"La enfermedad más común en los Molly es la denominada enfermedad del Molly, provocada por la bacteria Columnaris, Flavobactetium columnare, que provoca deformación en la columna de los peces. Existen tratamientos a base de permanganato de potasio y terramicina y se recomienda aislar a los peces afectados. También es sensible a la enfermedad del punto blanco y a la tuberculosis.","imagen":"images/fishes/Poecilia_latipinna.jpg","tienda":""},{"id":7,"nombreComun":"Molly vela gigante","nombreCientifico":"Poecilia velifera","litrosAcuario":"300","temperatura":"25-28","ph":"7.2-8","gh":"13-19","tipoAgua":"dulce","dificultad":"Media","numeroCardumen":"5","dieta":"Son omnívoros. Esta especie puede ser alimentada con alimentos secos (copos, gránulos), alimentos frescos y alimentos congelados. Para evitar deficiencias, se recomienda variar el tipo de alimento.","descripcion":"Es un pez que presenta una coloración tricolor con un cuerpo mayoritariamente amarillo, azul y plateado. Los machos cuentan con una aleta dorsal mucho más desarrollada que la de la hembra además de un gonópodo.","longitud":"Pueden llegar hasta los 15 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Esta variedad de poecilia procedede México. Suele encontrarse en arroyos costeros con mucha vegetación, estanques, pantanos, canales y zanjas. Está especialmente asociada a hábitats salobres en los que las algas y otro fitoplancton están presentes en grandes cantidades.","reproduccion":"Si las condiciones del acuario son adecuadas, la reproducción es muy sencilla. La gestación del pez Molly embarazada dura unas 8 semanas, al final de las cuales podemos encontrarnos con más de 100 pequeños alevines. Se recomienda poner a la hembra en una paridera debido al canibalismo que se da. Una vez la hembra ha parido, hay que retirarla de la paridera dejando a los alevines solos.","consejos":"Al ser una especie que vive en grupos se aconseja introducir al menos cinco individuos con una relación de un macho por cada tres o cuatro hembras. Se recomienda un entorno rico en vegetación. El aporte de plantas le ofrecerá numerosos escondites que le servirán para descansar. Estas zonas resultarán también favorables para una eventual reproducción en el acuario.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy, Platy.","problemas":"La enfermedad más común en los Molly es la denominada enfermedad del Molly, provocada por la bacteria Columnaris, Flavobactetium columnare, que provoca deformación en la columna de los peces. Existen tratamientos a base de permanganato de potasio y terramicina y se recomienda aislar a los peces afectados. También es sensible a la enfermedad del punto blanco y a la tuberculosis.","imagen":"images/fishes/Poecilia_vellifera.jpg","tienda":""},{"id":8,"nombreComun":"Platy","nombreCientifico":"Xiphophorus maculatus","litrosAcuario":"80","temperatura":"22-27","ph":"6.8-7.2","gh":"7-20","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"5","dieta":"Es un pez omnívoro. Puede ser alimentada con alimentos secos (copos, gránulos), alimentos frescos y alimentos congelados. Para evitar deficiencias, se recomienda variar el tipo de alimento. Si el acuario es compartido con otras especies, estaremos atentos a que coma lo suficiente, ya que son bastante pasivos y no van a pelear por la comida.","descripcion":"Tienen forma alargada, en la que el vientre el más convexo que el dorso del pez. La boca del pez está orientada hacia arriba, típica de los peces habituados a comer de la superficie. Es posible distinguir a las hembras Platy de los machos porque estos últimos poseen gonopodio.","longitud":"Pueden llegar hasta los 7 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"El hábitat natural del Platy está en las aguas tranquilas de arroyos y ríos de las regiones costeras de México, Guatemala, Nicaragua y Belice.","reproduccion":"Se reproduce con facilidad. Para una mayor tasa de éxito y aunque no se suelen comer a sus crías, se debería apartar las parejas en el momento del desove para, una vez que producido, retirar a los peces adultos. La Platy embarazada tendrá un periodo de gestación de entre 4 y 6 semanas, para producir hasta 80 alevines en cada puesta.","consejos":"Al ser una especie que vive en grupos se aconseja introducir al menos cinco individuos con una relación de un macho por cada tres o cuatro hembras. Se recomienda un entorno rico en vegetación que le servirán para descansar y como escondites tanto para adultos como para alevines.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy, Molly negro, Molly vela.","problemas":"Es sensible a la enfermedad del punto blanco,a los hongos, a la tuberculosis y a la hidropesia.","imagen":"images/fishes/Xiphophorus_maculatus.jpg","tienda":""},{"id":9,"nombreComun":"Xipho","nombreCientifico":"Xiphophorus hellerii","litrosAcuario":"120","temperatura":"21-26","ph":"6.8-7.2","gh":"10-15","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"4","dieta":"Son omnívoros y pueden ser alimentados por larvas de mosquito, tubifex, artemias, alga espirulina, espinacas, y las comunes escamas. Algunas personas los alimentan con polen, alimento alto en proteínas.","descripcion":"En su estado salvaje tiene un color verde grisáceo con una franja rojiza que recorre todo su cuerpo. Esta franja puede cambiar de color al llegar a la cola. En cautiverio podemos encontrarlos con un abanico de colores más amplio. El macho se caracteriza por que es el que posee la cola de espada, un alargamiento de los radios inferiores de su aleta caudal. Cerca de la aleta anal podemos observar el gonopodio, su órgano reproductor. Son peces de cuerpo alargado, robusto y con una boca que apunta hacia arriba para alimentarse de la superficie. En libertad y en zonas con falta de machos pueden producirse cambios de sexo en esta especie, una hembra puede convertirse en un ardiente macho, sin embargo, el proceso inverso no está documentado.","longitud":"Pueden llegar hasta los 15 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Originario de América central, los países en los que más abundan son México, Honduras, Belice y Guatemala. Es común encontrarlos nadando libremente en arroyos y ríos de corrientes suaves y cristalinas.","reproduccion":"Su reproducción es bastante sencilla. El embarazo puede durar de 4 a 6 semanas. La hembra llevará los huevos hasta el momento de la eclosión, que sucede dentro de ella para posteriormente dar a luz a los alevine. Cabe destacar que estas pequeñas crías son autosuficientes desde el primer segundo de vida. Durante la gestación la hembra suele situarse en una zona baja y con abundante vegetación.","consejos":"Al ser una especie que vive en grupos se aconseja introducir al menos cuatro individuos con una relación de un macho por cada tres hembras. Se recomienda un acuario plantado que ayude a la oxigenación del agua, pudiendo usar si fuese necesario un oxigenador. Los machos suelen ser muy territoriales por lo que si va a haber más de un macho en el acuario se recomienda que haya una alta proporción de hembras y que el acuario sea grande. Se recomienda un agua ligeramente alcalina ya que las ácidas acortan su esperanza de vida.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy.","problemas":"Es sensible a la enfermedad del punto blanco y a la hidropesia.","imagen":"images/fishes/Xiphophorus_hellerii.jpg","tienda":""},{"id":10,"nombreComun":"Corydora bronceada","nombreCientifico":"Corydoras aeneus","litrosAcuario":"120","temperatura":"25-28","ph":"6.8-7.2","gh":"5-19","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"8","dieta":"Es un pez omnívoro. Su dieta debe incluir presas pequeñas, como lombrices, gusanos, Tubifex o larvas de mosquito. Idealmente se les deben de proporcionar vivas, pero también se las comerán sin ningún problema si son congeladas. También pueden ser alimentadas con pastillas para peces de fondo.","descripcion":"Tiene un cuerpo carente de escamas. En su lugar posee una doble hilera de placas óseas solapadas que cubren todo su cuerpo. Tiene forma triangular, aplanadas en el vientre y una parte dorsal ligeramente bombeada. Detrás de la aleta dorsal encontramos una aleta adiposa común en la familia de las Corydoras. En la aleta pectoral el primer radio tiene forma de espina. La aleta pectoral está transformada para transportar los huevos durante la puesta. Su cabeza es corta y compacta, con ojos relativamente grandes y móviles. En la boca, bastante estrecha, podemos encontrar tres pares de barbillones en su mandíbula inferior con los que remueve el fondo del acuario sin parar. Son capaces de respirar fuera del agua, lo que les permite vivir en aguas muy contaminadas y pobres en oxígeno. Es de color cobrizo con tonos rosados en el vientre. No obstante, se han criado especímenes albinos.","longitud":"Pueden llegar hasta los 7 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Son peces que se pueden encontrar en libertad en la isla de Trinidad, en los ríos y arroyos del interior de aguas rápidas y limpias. También están presentes en gran parte de América del Sur.","reproduccion":"Su reproducción no es precisamente fácil. Para ello debemos tener una proporción de al menos dos machos por cada hembra. Cuando sea evidente que las hembras portan sus huevos, se debe cambiar entre el 50% y el 70% del agua del acuario con agua más fría hasta que se produzca el desove. Se debe incrementar también la oxigenación y el flujo del agua del acuario. Los huevos son adhesivos y los colocaran bajo las hojas o en las paredes del acuario. Una vez producido el desove se deben separar los adultos de los huevos. Lo ideal sería pasar los huevos a un nano acuario de aislamiento, donde mantendremos las mismas condiciones que el original, además deberíamos usar la misma agua de este acurio. En un primer momento los huevos son frágiles, pero cuando pasan unos 30 minutos se vuelven duros y resistentes. A los tres o cuatro días comenzarán a romper sus huevos los alevines. Cuando han absorbido por completo sus sacos vitelinos, se les debe alimentar con pequeños alimentos vivos como nauplios de Artemia. Si no tenemos o nos es complicado, aceptarán aliento seco muy desmenuzado.","consejos":"Gustan de que el acuario tenga vegetación y posea un fondo arenoso. Les debemos proporcionar refugios con piedras o cuevas. Como tienen tendencia a remover el sustrato del acuario, conviene evitar las plantas de hoja pequeña.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas. Algunos ejemplos son: Guppy.","problemas":"Es sensible a la enfermedad del punto blanco, tuberculosis, a la vejiga natatoria y a la intoxicación por amoniaco o nitrito.","imagen":"images/fishes/corydoras_aeneus.jpg","tienda":""},{"id":11,"nombreComun":"Pez cebra","nombreCientifico":"Danio rerio","litrosAcuario":"100","temperatura":"18-24","ph":"6.8-7.2","gh":"6-12","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"10","dieta":"Son omnívoros. En estado natural se suele alimentar de larvas de mosquito, pequeños crustáceos y otros invertebrados. En el acuario debemos aportarle una dieta que comprenda alimentos secos junto con pequeñas larvas de artemia vivas o congeladas, incluso se puede añadir a su alimentación pequeños trozos de verduras hervidas.","descripcion":"Tienen un color dorado o plata con cinco a nueve franjas de azul oscuro longitudinales, lo que les califica como peces cebra. No es fácil distinguir los machos de las hembras, salvo cuando alcanzan la madurez sexual, entonces podremos observar como la hembra adquiere una forma más redondeada, se ve un poco más grande que los machos y pierde algo de color. En la época de desove, cuando la hembra del pez cebra está embarazada, los machos intensifican su coloración. Además, los machos alternan bandas azules y doradas, mientras que las hembras son azules y plateadas.","longitud":"Pueden llegar hasta los 5 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Su distribución original es algo confusa, ya que es posible que originalmente, se confundiera al danio rerio con otros danios. Actualmente se sabe que están presentes en la India, cordilleras de Ghats orientales y occidentales, Bangladesh y Bhután. Se encuentra en ríos de aguas rápidas y poco profundas con fondos limosos y abundante vegetación. Algunas informaciones recientes sobre su ciclo de vida muestran que los adultos viven en arroyos y ríos pequeños buscando zonas tranquilas y sombreadas hasta que llegan las lluvias y buscan charcas marginales y arrozales para desovar.","reproduccion":"Su reproducción es fácil. No demuestra demasiado cuidado parental, desovando muy a menudo y presentando comportamientos caníbales con su progenie. Se recomienda preparar un acuario a parte para las crías. Cuando tengamos evidencias de que se han puesto los huevos, a las pocas horas debemos retirar a los adultos ya que se comerán los huevos que encuentren. Los alevines aparecerán entre las 24 y 36 horas siguientes. Los alevines comen alimentos muy pequeños, podemos encontrar alimento seco adecuado para alevines ya preparado.","consejos":"Durante la época de apareamiento, lo ideal es aumentar la presencia de presas vivas.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy.","problemas":"Es muy sensible a la enfermedad del Tetra neón, que está causada por un parásito. Se puede reconocer por la aparición de manchas blancas en la piel y que el pez se separará del grupo. Esta enfermedad no tiene cura. También es sensible a la enfermedad del punto blanco, tuberculosis y a la hidropesia.","imagen":"images/fishes/danio_rerio.jpg","tienda":""},{"id":12,"nombreComun":"Danio perla","nombreCientifico":"Danio albolineatus","litrosAcuario":"80","temperatura":"24-27","ph":"6.8-7.2","gh":"6-15","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"10","dieta":"Se alimenta principalmente de insectos acuáticos y terrestres y sus larvas. Mantenidos en el acuario, los Danios perla aceptan todo tipo de alimento vivo, congelado y en escamas. Para mantenerlos sanos, aliméntelos con comida tropical en escamas o granulada de alta calidad, así como con comida congelada y viva, como tubifex, larvas de mosquito, artemia y dafnias.","descripcion":"Dependiendo de la ubicación, el pez muestra diferentes colores, lo que ha hecho que este pez reciba varios nombres científicos, aunque todos ellos se refieren a la misma especie. La clasificación es controvertida entre los científicos y la clasificación original bajo el género Brachydanio fue declarada recientemente inválida. Su cuerpo azul-violeta se ve acentuado por una franja naranja-roja que va desde la mitad del cuerpo hasta la cola, lo que le da un aspecto nacarado. A diferencia de las hembras, los machos suelen tener un tinte rojo en el abdomen. La especie tiene una cola bifurcada y dos pares de barbos.","longitud":"Pueden llegar hasta los 6 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Su hábitat nativo son los arroyos y ríos claros y caudalosos de Myanmar, Tailandia y Sumatra. El pez también se ha encontrado en Laos, Camboya y Vietnam. La principal área de distribución son las grandes cuencas fluviales, como el Mekong, el Chao Phraya, el Mae Klong, el Irrawaddy y el Salween.","reproduccion":"Son peces fáciles de criar si se mantienen en un acuario bien plantado y aclimatado. No demasiado complicada en el acuario si se dan las condiciones. En un acuario de unos 40 litros recubre el fondo con grava gorda o rejilla de plástico para que los huevos se cuelen entre ellas y así quedar fuera del alcance de sus progenitores, que de otra manera se los comerán. Debe de haber plantas flotantes para darles seguridad y es preferible juntar la hembra y el macho de noche. A la mañana siguiente con las primeras luces comenzará la puesta. El macho correteará a la hembra hasta que esta ponga los huevos en el agua, que será una puesta muy numerosa de 400 a 500 huevos, y en ese momento el macho procederá a la fertilización. Una vez concluida se retira a los padres. Los huevos eclosionaran a las 48, 72 horas. A los dos días habrán consumido su saco vitelino y comerán infusorios, y ya a la semana se les puede dar nauplios de artemia y escamas trituradas.","consejos":"Es un pez saltador, por lo que el acuario debe estar totalmente cubierto.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy.","problemas":"Es muy sensible a la enfermedad del Tetra neón, que está causada por un parásito. Se puede reconocer por la aparición de manchas blancas en la piel y que el pez se separará del grupo. Esta enfermedad no tiene cura. También es sensible a la enfermedad del punto blanco, tuberculosis y a la hidropesia.","imagen":"images/fishes/Danio-albolineatus.jpg","tienda":""},{"id":13,"nombreComun":"Neón chino","nombreCientifico":"Tanichthys albonubes","litrosAcuario":"50","temperatura":"2-22","ph":"6.8-7.2","gh":"5-19","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"8","dieta":"Son omnívoros. No suelen rechazar ningún tipo de alimento. En estado natural se suelen alimentar de pequeños insectos, gusanos y crustáceos. Se puede utilizar alimento seco al que es buena idea añadir alimentos congelados, como lombrices, gusanos o artemias.","descripcion":"El pez Neón chino, también conocido como pez de la Montaña de la Nube Blanca, es un pez gregario y pacífico ideal para acuarios de agua fría. Las hembras son más redondeadas y grandes que los machos, y estos últimos más delgados y con mayor colorido. Los colores habituales el Neón chino son el marrón verdoso para el cuerpo, cruzado por una línea longitudinal de color amarillo. Sus aletas son de color amarillo y rojo. Con el paso de los años, los colores se van apagando lentamente, en los dos sexos. Los colores habituales el Neón chino son el marrón verdoso para el cuerpo, cruzado por una línea longitudinal de color amarillo. Sus aletas son de color amarillo y rojo.Con el paso de los años, los colores se van apagando lentamente, en los dos sexos.","longitud":"Pueden llegar hasta los 4 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Es originario de una zona muy concreta de China, White Cloud Montain, Kwangtung. Aunque no hay demasiada información al respecto, su origen parece estar restringida al delta del río de las Perlas (río Pearl o Zhujiang, antiguamente conocido como río Cantón). Esta especie está considerada en peligro de extinción por las agencias gubernamentales Chinas, y durante varios años no se encontraban en estado natural. Posteriormente (en 2007) se encontraron algunas poblaciones en la isla de Hainan, provincia de Hainan. Su hábitat natural es un arroyo de montaña lento, con aguas de frías poco profundas y densa vegetación. En la isla de Hainan, las poblaciones de pez Neón chino, ocupan zonas estancadas tranquilas, cerca de vegetación densa.","reproduccion":"La reproducción es sencilla. Desova continuamente y los padres no presentan ningún tipo de cuidado. Si deseas tener un mayor control sobre la reproducción, puedes montar un acuario de cría más pequeño, en el que favorecer las condiciones. Montaremos una iluminación más débil y dispondremos el fondo de manera que los adultos no puedan acceder a los huevos. Los huevos tardan entre 48 y 60 horas en eclosionar. Una vez abiertos, los alevines nadan libremente.","consejos":"Es un pez muy fácil de mantener. Se recomienda un acuario bien plantado con zonas de iluminación débil para la seguridad tanto de los adultos como de las crías.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy.","problemas":"Debido a la gran demanda de estos peces para acuario, se detecta que las especies criadas para su venta sufren de endogamia, lo que les hace genéticamente débiles y propensos a enfermar, incluso desarrollan deformidades físicas.","imagen":"images/fishes/Tanichthys_albonubes.jpg","tienda":""},{"id":14,"nombreComun":"Otocinclus","nombreCientifico":"Otocinclus affinis","litrosAcuario":"60","temperatura":"20-26","ph":"5.5-7.5","gh":"5-15","tipoAgua":"dulce","dificultad":"Baja","numeroCardumen":"6","dieta":"Son peces principalmente peces herbívoros, consumiendo en su mayor parte algas verdes y marrones, pequeñas plantitas y microorganismos presentes en las plantas. En el acuario pueden aceptar también verduras cocidas: calabacines, guisantes y lechuga, así como alimentos artificiales y tubifex. Se les debe proporcionar algún tronco o raíz, del que proveerse de celulosa.","descripcion":"Tienen forma alargada, redondeados en el dorso y aplanados ventralmente. Su cabeza es ligeramente aplanada, con los ojos situados a ambos lados, lo que le confiere una visión lateral. Una de las características morfológicas más originales, aunque propias de los Loricáridos, es la presencia de una ventosa succionadora en la boca que les sirve tanto para alimentarse como para fijarse en las rocas o plantas, muy útil en su hábitat natural de ríos con fuertes corrientes. Son peces carentes de vejiga natatoria, lo que les impide nadar. Para solventarlo dan saltos laterales y se sujetan con la boca al sustrato para evitar ser arrastrados por la corriente de los ríos que habitan. Las aletas poseen espinas de refuerzo, similares (aunque no tan fuertes) a las del Hypostomus plecostomus, con el que comparte es sobrenombre de pez Limpiafondos o Limpiacristales. No posee espinas en la aleta adiposa y en la aleta caudal. Son peces de color amarillo ocre tirando a dorado con franjas laterales negras que recorren todo su cuerpo, desde la aleta caudal hasta la boca. Esta franja se va estrechando al llegar a la aleta caudal, donde termina con una mancha en forma de punto. El dorso es de color marrón oscuro con motas negras y reflejos dorados. La parte ventral es de color blanca.","longitud":"Pueden llegar hasta los 5 centímetros.","temperamento":"Pacífico","distribucionYHabitat":"Son originaros del sureste de Brasil, en la selva del Mato Grosso y también es posible encontrarlos en algunos ríos de Colombia: Río Caquetá, Canca y Japurá. Gustan de aguas claras con fuertes corrientes, donde encuentran su alimento preferido en las rocas cubiertas de algas y la abundante vegetación.","reproduccion":"Su reproducción es difícil. Para fomentar la puesta, a pesar de ser peces especialmente vegetarianos, se les debe proporcionar una alimentación con alimento vivo o congelado. También es posible fomentar la freza con cambios parciales y continuados del agua, simulando la estación de lluvias de su origen. El grupo debe estar formado por mas hembras que machos, que las perseguirán hasta que estos sean aceptados. Una vez conseguido, las hembras colocan sus huevos (entre 20 y 40 por ejemplar) en las paredes del acuario o sobre las hojas de las plantas. Las puestas no son muy abundantes y los padres abandonan a sus huevos, que nosotros podemos recoger y trasladar a un acuario de cría. Su eclosión se produce a los 2 o 3 días. Nacerán pequeños alevines, que pueden ser alimentados los primeros días con infusorios, para ir añadiendo poco a poco a la dieta, nauplios de artemia y vegetales hervidos y muy triturados.","consejos":"S recomienda un acuario con una buena cantidad de plantas de hoja ancha que faciliten el crecimiento de las algas y que les proporcionen cobijo, ya que son bastante tímidos y no son muy buenos nadadores. No se recomienda introducirlos en un acuario nuevo donde no encontrarían alimento suficiente para sobrevivir.","compatibilidad":"Conviven sin problemas con otras especies que también sean pacíficas y que no crezcan mucho más que ellas. Algunos ejemplos son: Guppy.","problemas":"Es sensible a la enfermedad del punto blanco.","imagen":"images/fishes/otocinclus-affinis.jpg","tienda":""}]}');
fishes.records.sort((a, b) => {
    if (a["nombreComun"] < b["nombreComun"]) {
        return -1;
    }
    if (a["nombreComun"] > b["nombreComun"]) {
        return 1;
    }
    return 0;
});