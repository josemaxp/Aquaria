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

function showAllPlants(){
  document.getElementById("info").innerHTML = '';

  liters.style.borderColor = "#B7E2F0";
  luminosity.style.borderColor = "#B7E2F0";
  bulbTypeContainer.style.borderColor = "#FFFFFF";
  waterTypeContainer.style.borderColor = "#FFFFFF";
  temperatureContainer.style.borderColor = "#FFFFFF";
  plantedContainer.style.borderColor = "#FFFFFF";

  for(var i = 0; i < plants.records.length; i++){
      document.getElementById("info").innerHTML += 
        "<div class='swiperContainer swiper-slide card'>"+
          "<div class='swiperTop d-flex my-3 mx-1'>"+
              "<div class='swiperTitle d-flex justify-content-center align-items-center bg-white'>"+
                  "<h5 class='bg-white'>"+plants.records[i].nombreCientifico+"</h5>"+
              "</div>"+
              "<div class='swiperIcon bg-white'>"+
                "<button type='button' class='buttonIcon btn' data-toggle='modal' data-target='#modal' onclick='loadModelInfo("+plants.records[i].id+")'>"+
                  "<i class='fa fa-eye bg-white' aria-hidden='true'></i>"+
                "</button>"+
              "</div>"+
          "</div>"+
          "<div class='swiperImgContainer d-flex justify-content-center align-items-center bg-white'>"+
              "<img class='swiperImg' src='"+plants.records[i].imagen+"'/>"+                                 
          "</div>"+
        "</div>";
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
  document.getElementById("info").innerHTML = '';

  //Hace que, al darle al botón de plantas, se vuelva a mostrar. Es decir, nunca se contrae a no ser que se le de a otro botón.
  $('#collapseOne').on('hidden.bs.collapse', function () {
    $('#collapseOne').collapse('show');
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
      
        document.getElementById("info").innerHTML += "<p class='bg-white m-3' style='color:red;''>No se muestra ninguna planta o coral puesto que tu acuario no será plantado.</p>";
        break;
      } else if(temperature == "fria"){

        document.getElementById("info").innerHTML += "<p class='bg-white m-3' style='color:red;''>Los datos de las plantas de agua fría aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      }else if(waterType == "salada"){

        document.getElementById("info").innerHTML += "<p class='bg-white m-3' style='color:red;''>Los datos de los corales aún se encuentran incompletos. Estarán disponibles lo antes posible.</p>";
        break;

      } else if(temperature == "caliente" && parseFloat(luminosity) >= parseFloat(plantLuminosity) && parseFloat(plantTemperature[1]) > 19 && plants.records[i].tipoAgua == "dulce"){
        checkHotWaterPlants = true;

        document.getElementById("info").innerHTML += 
          "<div class='swiperContainer swiper-slide card'>"+
            "<div class='swiperTop d-flex my-3 mx-1'>"+
                "<div class='swiperTitle d-flex justify-content-center align-items-center bg-white'>"+
                    "<h5 class='bg-white'>"+plants.records[i].nombreCientifico+"</h5>"+
                "</div>"+
                "<div class='swiperIcon bg-white'>"+
                    "<button type='button' class='buttonIcon btn' data-toggle='modal' data-target='#modal' onclick='loadModelInfo("+plants.records[i].id+")'>"+
                      "<i class='fa fa-eye bg-white' aria-hidden='true'></i>"+
                    "</button>"+
                "</div>"+
            "</div>"+
            "<div class='swiperImgContainer d-flex justify-content-center align-items-center bg-white'>"+
                "<img class='swiperImg' src='"+plants.records[i].imagen+"'/>"+                                 
            "</div>"+
          "</div>";

      }
    }

  }else{
    document.getElementById("info").innerHTML += "<p class='bg-white m-3' style='color:red;''>Por favor, rellene correctamente todos los campos marcados en rojo.</p>";
  }

  if (!checkHotWaterPlants && temperature == "caliente" && waterType != "salada" && planted == "si"){
    document.getElementById("info").innerHTML += "<p class='bg-white m-3' style='color:red;''>No existen plantas que cumplan estas condiciones.</p>";
  }
}

function loadModelInfo(id){

  document.getElementById("modalInfo").innerHTML = '';

  for(var i = 0; i < plants.records.length; i++){

    if(parseInt(id) == parseInt(plants.records[i].id)){

      document.getElementById("modalInfo").innerHTML +=
      "<div class='modal-header bg-info'>"+
        "<h5 class='modal-title bg-info' id='modalLabel' title='Nombre común - Nombre científico'>"+plants.records[i].nombreComun +" - "+ plants.records[i].nombreCientifico+"</h5>"+
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
      "<div class='modal-footer'>"+
        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Cerrar</button>"+
        "<button type='button' class='btn btn-primary' href='"+plants.records[i].tienda+"'>Comprar</button>"+
      "</div>";

      break;
    }
  }
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

const plants = JSON.parse('{"records":[{"id":1,"nombreComun":"Ambulia","nombreCientifico":"Limnophila sessiliflora","luzLED":"27","luzFluorescente":"50","temperatura":"22-28","ph":"6.0-8.5","gh":"4-12","tipoAgua":"dulce","sustrato":"Grava fina.","zonaAcuario":"Parte media o trasera.","dificultad":"Baja","distribucionYHabitat":"Procede del sudeste asiático donde puede ser considerada como una plaga por su capacidad de reproducción. Es capaz de desarrollarse en diferentes ambientes, su capacidad para tolerar diferentes cambios químicos del agua la hacen una planta invasiva que puede vivir en lagos, arroyos y aguas estancadas.","forma":"Planta frondosa y de color verde intenso. Tiene un tallo principal que se divide en diferentes ramas.","tamaño":"Puede llegar a medir unos 40 o 50 centímetros de altura, pudiendo crecer a una velocidad de 5 centímetros por semana.","reproduccion":"Se reproduce con facilidad a través de esquejes. Sacar un esqueje cortando unos diez centímetros de la parte superior de la planta, retirr las hojas que queden en la parte inferior para no enterrarlas y meter con una pinza el esqueje en el sustrato. Separar los nuevos esquejes de la planta originaria para que no se peguen en exceso.","consejos":"Las Limnophila prefieren el agua blanda y ácida. Su mejor rango de temperatura oscila los 24-27ºC. Si la iluminación es más intensa, el crecimiento es más denso y apretado, mientras que con una iluminación menos intensa, crece de forma más alargada, con un color menos vivo y menos densa. La grava fina facilita su enraizamiento. El fondo se puede acompañar con arcilla y ser rico en nutrientes minerales para evitar que se tenga que abonar de forma frecuente, sino se pueden abonar con productos ricos en sales minerales.","compatibilidad":"Se recomienda utilizar en un acuario con Guppys y Platys.","problemas":"No es conveniente utilizarla en un acuario con peces herbívoros porque en su crecimiento es una planta frágil que se puede romper con facilidad.","imagen":"images/plants/Limnophila-sessiliflora.jpg","tienda":""},{"id":2,"nombreComun":"Anubias Nana","nombreCientifico":"Anubias barteri var. nana","luzLED":"10","luzFluorescente":"25","temperatura":"22-28","ph":"6.0-7.5","gh":"3-8","tipoAgua":"dulce","sustrato":"Se adapta bien a casi cualquier sustrato. Se puede pegar en piedras y troncos usando un pegamento adecuado para plantas.","zonaAcuario":"Parte delantera o media.","dificultad":"Baja","distribucionYHabitat":"El genero de las Anubias es endémico de África tropical. Actualmente tiene una amplia distribución en Europa, Asia y Estados Unidos. En estado silvestre habita en embalses muy poco profundos , zanjas, estanques, arroyos, ríos, áreas boscosas y pantanos, generalmente a lo largo de la orilla con fondo fangoso y nivel de agua variable.","forma":"Plantas de acuario muy pequeñas. Crecen compactas y cuentan con una coloración que va del verde claro al oscuro brillante. El envés de las hojas es más claro. Sus hojas son coriáceas, ovaladas y miden entre 3 cms a 5 cms de ancho, y unos 6 cms de largo. Su flor es de color blanco cremoso, con el estigma en color amarillo.","tamaño":"No suelen sobrepasar los 15 centímetros de altura.","reproduccion":"Poseen un rizoma que se extiende lateralmente. La propagación se realiza simplemente cortando el rizoma de la planta madre. Los esquejes sólo deben tomarse de plantas maduras y sanas utilizando tijeras esterilizadas. Cada corte debe tener al menos 3 hojas. El rizoma no debe enterrarse bajo el sustrato, ya que se pudre y muere.","consejos":"Las Anubias Nana son plantas muy fuertes y resistentes con un crecimiento muy lento. Raramente tienen problemas. Se cultiva bien con una luz fija de entre 7 a 10 horas. Crece bien con el CO2 exhalado por el pez y no necesita CO2 adicional aunque lo agradece. También le favorecen los cambios regulares de agua y una dosis ocasional de fertilizante, como abonos líquidos para plantas de acuario.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Puede ser infectada por algas, pero con los conocidos peces chupalagas el problema suele arreglarse solo. Nos podemos encontrar que las hojas amarillen, lo que se denomina clorosis. Si observamos que las hojas se ponen amarillas, es posible que la iluminación sea muy baja o por faltan nutrientes.","imagen":"images/plants/Anubias-Nana.jpg","tienda":""},{"id":3,"nombreComun":"Bacopa, hisopo de agua, brahmi, lágrima de bebé, verdolaga de puerco","nombreCientifico":"Bacopa monnieri","luzLED":"27","luzFluorescente":"50","temperatura":"15-30","ph":"6-9","gh":"6-13","tipoAgua":"dulce","sustrato":"Grava fina. Se recomienda incluir concentraciones de cloruro y cadmio.","zonaAcuario":"Parte media o trasera.","dificultad":"Baja","distribucionYHabitat":"Planta herbácea perenne que vive en ambientes húmedos y orillas fangosas. Crece en agua tanto dulce como ligeramente salobre. Es originaria de las zonas pantanosas de Nepal, Sri Lanka, India, Vietnam, Taiwán y China. En Estados Unidos, específicamente en la Florida y los estados sureños, se cultiva en lagunas y jardines pantanosos.","forma":"Es una planta suculenta con forma redondeada. Sus hojas son gruesas y oblanceoladas, dispuestas en sentido contrario al tallo, el cual es fino y erguido. Puede llegar a florecer dando una flor por tallo, pero sólo ocurrirá si están por encima del nivel del agua. Su coloración habitual es el verde brillante.","tamaño":"Llega hasta los 50 centímetros de largo y 3 centímetros de diámetro. Crece de forma moderada, pudiendo llegar a 10 centímetros al mes.","reproduccion":"Se multiplican muy fácilmente por esquejes. Es aconsejable buscar los más vigorosos y sanos para replantarlos en el sustrato fijándolos en espacios compactos. Cuando se observen las primeras hojas se puede concluir que el esqueje ya está enraizado y comienza su crecimiento y posterior reproducción.","consejos":"En general son plantas muy resistentes que se adaptan perfectamente a diferentes condiciones de pH, gH y sustratos. Se puede abonar con abono que contenga Ca, Mg, He y micronutrientes.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Nos podemos encontrar que las hojas amarillen, lo que se denomina clorosis. Si observamos que las hojas se ponen amarillas, es posible que la iluminación sea muy baja o por faltan nutrientes. Puede ser infectada por algas, por lo que se recomienda que se hagan cambios de agua de forma regular.","imagen":"images/plants/bacopa-monnieri.jpg","tienda":""},{"id":4,"nombreComun":"Musgo japonés","nombreCientifico":"Aegagropila linnaei","luzLED":"10","luzFluorescente":"25","temperatura":"20-28","ph":"6.5-8.5","gh":"9-30","tipoAgua":"dulce","sustrato":"Es indiferente el sustrato y abono del acuario, sin embargo, la grava fina es lo más adecuado para la Cladophora.","zonaAcuario":"Parte media o trasera.","dificultad":"Baja","distribucionYHabitat":"La Cladophora tiene una distribución muy amplia. Su hábitat habitual son los fondos de los lagos, donde suele encontrarse en zonas poco profundas, aunque se sabe que pueden llegar a vivir hasta a 25 metros de profundidad, en condiciones muy duras, ya que soportan temperaturas entre 5ºC y -28ºC y niveles de sal de un 5% a 6%.","forma":"Es un alga que crece en grupos y que normalmente al entrar en contacto total con el agua se forma una bola esférica muy densa. El interior está compuesto principalmente por lodo y restos de tallos muertos. Las más grandes se suelen quedar huecas, dando a un original fenómeno por el que pueden llegar a flotar. ","tamaño":"Puede llegar a medir hasta 30 centímetros de diámetro.","reproduccion":"Se reproduce de manera sencilla. Solo se debe dividir la bola para obtener nuevas plantas. Para que vuelva a crecer de manera natural y de forma esférica debe estar sujeta dentro del acuario. De lo contrario, es necesario moverla diariamente para que todos sus lados obtengan luz.","consejos":"Son muy convenientes para los gambarios: a los camarones les encanta posarse sobre las bolas de musgo y alimentarse de las partículas que quedan retenidas en ellas. Son grandes consumidoras de nitratos, por lo que son capaces de mantener al resto de algas a raya. Se conserva bien en casi cualquier situación del acuario. Cómo su crecimiento es extremadamente lento, se puede añadir CO2 al acuario para que se acelere. Son grandes consumidoras de CO2, a cambio aportan también mucho oxígeno al acuario.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Hay que estar atento al CO2 del acuario, ya que sin un aporte adecuado de éste puede acabar muriendo.","imagen":"images/plants/cladophora-aegagrophila.jpg","tienda":""},{"id":5,"nombreComun":"Helecho de Java","nombreCientifico":"Microsorum pteropus","luzLED":"10","luzFluorescente":"25","temperatura":"10-30","ph":"5.5-8.0","gh":"4-20","tipoAgua":"dulce","sustrato":"Se adaptan a casi cualquier sustrato e inlcuso sobreviven muy bien sujetas a piedras y troncos.","zonaAcuario":"Parte delantera o media.","dificultad":"Baja","distribucionYHabitat":"Es un helecho que se puede encontrar en la Isla de Java, de ahi su nombre común, así como en Malasia, Tailandia y determinadas regiones de China. Esta amplia distribución geográfica, es la que proporciona diferentes tipos de hojas, tamaño y forma. En estado natural, sus raíces se unen a las rocas y puede crecer total o parcialmente sumergida.","forma":"Sus hojas, aunque pueden presentar varias formas (hoja estrecha, hoja de aguja, hoja de Windelov, etc.), suelen ser alargadas y hondeadas. Su coloración varía desde el verde bajo hasta el verde intenso, aunque puede amarronarse cuando está en fase reproductiva. Puede ser un helecho acuático o terrestre, aunque a menudo se encuentra en las orillas. El helecho de Java posee un rizoma del que brotan las hojas. Este rizoma está compuesto de falsas raíces que actúan como ancla de la planta al sustrato, y de raíces reales. Aparentemente son iguales, salvo por que las raíces reales poseen tricomas, una vellosidad que recorre las raíces, mientras que las falsas, que tienen como única misión fijar la planta, no poseen esta vellosidad. Las raíces no tienen la misión de trasportar los nutrientes a las hojas, como sucede en la mayoría de las plantas, su única misión es servir de sujeción a la planta, que absorbe sus nutrientes a través de las hojas.","tamaño":"Su tamaño es muy variable, está aproximadamente entre los 15 y los 30 cm de altura, y no más de 15 o 20 cm de ancho. Su crecimiento es muy lento.","reproduccion":"En la naturaleza se puede reproducir por esporas transportadas por el aire, pero en un acuario es muy díficil. La forma más habitual es dividiendo el rizoma rastrero, que crece a lo ancho y del que brotan nuevas hojas a medida que crece. Otra forma es obteniendo pequeñas plantas a partir de la poda de las hojas. Consistiría en cortar la parte superior de la hoja y sembrarla en el sustrato.","consejos":"Son plantas muy sencillas de mantener. Crecen sin necesidad de prestarle mucha atención y su crecimiento no es excesivo, por lo que no debemos preocuparnos de que acabe invadiendo el acuario. No es una planta que lleve bien que enterremos sus raíces, su rizoma debe crecer adherido a un tronco o la superficie de unas rocas, pero si lo plantamos, debemos procurar que sólo sea parcialmente. Cuando el acuario cuenta con una alta cantidad de peces, su crecimiento resulta más exuberante debido a la cantidad de nutrientes procedentes del desecho de los peces.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Si la iluminación es muy intensa debe ser colocada bajo alguna otra planta o en algún lugar que haga sombra pues puede llegar a deteriorarse.","imagen":"images/plants/Microsorum-pteropus.jpg","tienda":""},{"id":6,"nombreComun":"Lenteja de Agua","nombreCientifico":"Lemna minor","luzLED":"27","luzFluorescente":"50","temperatura":"15-20","ph":"6.0-7.5","gh":"3-15","tipoAgua":"dulce","sustrato":"Son plantas que flotan en la superficie del agua por lo que no necesitan ningún tipo de sustrato.","zonaAcuario":"Superficie del agua.","dificultad":"Baja","distribucionYHabitat":"Es una planta flotante que se suelen encontrar en zonas estancadas o de curso muy lento en las regiones de América, Australia, Asia y Europa, regiones tropicales y subtropicales. La familia está constituida por plantas acuáticas muy primitivas, consideradas como las fanerógamas más pequeñas y se distribuyen en casi todas las aguas dulces estancadas o poco movidas de casi todas las zonas templadas, subtropicales y tropicales del globo terráqueo. En España se citan dos especies que pueden encontrarse en charcos y estanques: Lemna minor y Lemna polirrhiza.","forma":"Están conformadas por una diminuta lámina verdosa o verde amarillenta, cuya parte inferior, en contacto con el agua lleva una o varias raicillas diminutas, filiformes, simplificadas en auténticos rizoides que llevan una cubierta protectora en su extremo. Son vegetales perennes, transformados en organismos muy reducidos cuyas primitivas raicillas, bastante cortas, se internan en el agua que sobrenada la parte verde, obteniendo las sustancias minerales y orgánicas requeridas para su sustento. La falsa hoja aparente de las Lemnáceas es en realidad una especie de mezcla transformada, de tallo reducido a su mí­nima expresión, o inexistente, que tiene forma ovalada lenticular y bastante aplanada.","tamaño":"Aproximadamente 1cm. Cada hoja tiene una anchura de entre 2 u 3 milímetros.","reproduccion":"Este tipo de plantas de agua poseen órganos florales simples muy pequeños, y es común que su propagación reproductiva sea por vía de la germinación. También se puede reproducir vía asexual, esto quiere decir que se desarrollan pequeños brotes muy parecidos a la planta madre que se desprenden de ella, formando inmediatamente una lana verde espesa. Su reproducción es extremadamente rápida.","consejos":"La letenja de agua se adapta a cualquier tipo de iluminación, aunque cuando están en el proceso de desarrollo de su ciclo de vida se recomienda una iluminación media o intensa de doce a catorce horas al día. La lenteja de agua ayuda a tamizar la luz de las peceras que necesitan una tenue iluminación. Es una planta que se puede mantener en un acuario sin filtro.","compatibilidad":"Se adapta bien con casi cualquier especie. Ecológicamente la lenteja de agua es beneficiosa por su adaptabilidad e interacción con las demás especies, siendo un punto positivo para el hábitat donde se desarrolla, ya que ayuda a que la luz se mantenga tenue en los estanques tropicales. También beneficia al ambiente, ya que ayuda al tratamiento de las aguas residuales absorbiendo los contaminantes y forma parte de los alimentos para los animales domésticos.","problemas":"Son muy pocos los cuidados que necesita la lenteja de agua. No es recomendable ofrecer comida flotante a los peces, porque se queda atrapada en la lenteja y se daña.","imagen":"images/plants/lenteja-de-agua.jpg","tienda":""},{"id":7,"nombreComun":"Musgo de Java","nombreCientifico":"Vesicularia dubyana","luzLED":"10","luzFluorescente":"25","temperatura":"20-26","ph":"6.5-8.0","gh":"3-12","tipoAgua":"dulce","sustrato":"Se adaptan a cualquier sustrato e incluso a cualquier superficie, incluido el cristal.","zonaAcuario":"Parte delantera o media.","dificultad":"Baja","distribucionYHabitat":"Originaria del Sudeste asiático, crece en los cursos de agua lentos tropicales de la Isla de Java, Sumatra, Borneo y archipiélagos colindantes en zonas umbrosas y a profundidades variables sobre las orillas de lagos y riachuelos.","forma":" Es una planta tapizante de acuario de porte denso que crece en filamentos o tallos filiformes muy alargados cubiertos de pequeñísimas hojas opuestas, puntiagudas, imbricadas como escamas y que se entrelazan con otros tallos creando auténticas masas, esponjosas y densas.","tamaño":"Las hojas suelen tener 1,5 mm de ancho y unos 5 mm de longitud.","reproduccion":"En la naturaleza el musgo de Java se reproduce por esporas pero en un acuario es muy complicado. La mejor opción es mediante división de la planta. Tomamos un trozo de la planta, que se retira con mucha facilidad, y procedemos a plantarla en otro lugar. Crece muy bien sobre cáscaras de coco, maderas y rocas volcánicas o silíceas.","consejos":"El exceso de luz puede perjudicar al musgo de Java haciendo crecer sobre él algas verdes que asfixian la planta y deslucen su efecto. Como es una planta que no “arraiga” sobre sustrato y que la alimentación que recibe es a través de sus hojas, es recomendable que el acuario donde la vayamos a colocar ya esté ciclado y en funcionamiento desde hace un tiempo. Si es atacada con algas, la mejor opción es eliminar las zonas con más algas. Usar un producto antialgas puede ser perjudicial para el musgo de Java.","compatibilidad":"Se adapta bien con casi cualquier especie.","problemas":"Uno de los problemas habituales del musgo de Java es que adquiera un tono marrón. Esto quiere decir que esa zona del musgo ha muerto. Lo primero que tenemos que hacer es retirar las partes dañadas y puede que las partes que aún están verdes comienzan a crecer. Si eso no lo arregla es posible que la planta esté expuesta a demasiada iluminación. Otra medida que funciona es usar o aumentar el CO2.","imagen":"images/plants/musgo-de-java.jpg","tienda":""}]}');