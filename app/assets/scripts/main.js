var form = document.getElementById("payment-form");
var name = form.elements["country"];
var country = form.elements["country"];
var cost = form.elements["cost"];
var city = form.elements["city"];
var cardNumber = form.elements["card-number"];
var results = document.querySelector(".results");
var costs = {
    "DE": "2,5€",
    "AT": "3€",
    "ES": "5,45€",
    "FR": "2€",
    "UK": "2,75GBP",
}

function requestData(filter, query) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.getElementById("geobytes");
    var url = "//gd.geobytes.com/AutoCompleteCity";
    var params = "?callback=requestDataPayload&filter=" + filter + "&q=" + query;

    if (script !== null) script.parentNode.removeChild( script );

    script = document.createElement("script");
    script.id = "geobytes";
    script.src = url + params
    head.appendChild(script);
}

function requestDataPayload(payload) {
    results.innerHTML = payload.toString();
}

function onChangeCountry(e,value){
    city.value = "";
    cost.value = costs[country.value] || "";
    results.innerHTML = "";
}

function onChangeCity(e, value) {
    if (value.length >= 3 && country.value !== "") {
        requestData(country.value, value);
    } else {
        results.innerHTML = "";
    }
}

function validateForm(e){
    console.log("Validation form");
    return true;
}
