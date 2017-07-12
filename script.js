// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

// callback
function afficher(reponse) {
    console.log(reponse);
    var meteo = JSON.parse(reponse);
    console.log(meteo);
    var ville = meteo.name;
    var temperature = meteo.main.temp;
    var humidite = meteo.main.humidity;
    var vent = meteo.wind.speed;
    var image = meteo.weather.icon;

    appendPtoChatroom(`A ${ville} il fait ${temperature} degrés. L'humidité est de ${humidite} % et le vent souffle à ${vent} km/h.`);
}

function appendPtoChatroom(pContent){
  var chatroom = document.querySelector(".chatroom");
  var pElt = document.createElement("p");
  pElt.textContent = pContent;
  chatroom.appendChild(pElt);
}


var buttonElt = document.querySelector('#button');
buttonElt.addEventListener('click', function(){
  var inputElt = document.querySelector('#textarea');
  var inputValue = inputElt.value;
  var villeRecherchee = inputValue;
  ajaxGet("http://api.openweathermap.org/data/2.5/weather?q="+villeRecherchee+"&appid=fa1eb7a7d2e0667d1af092ee048a0f88", afficher);
  appendPtoChatroom(inputValue);
  inputValue.innerHTML = "";
});
