var form = document.getElementById("paymentForm");
var firstName = form.elements["firstName"];
var surname = form.elements["surname"];
var adress = form.elements["adress"];
var country = form.elements["country"];
var city = form.elements["city"];
var cost = form.elements["cost"];
var cardName = form.elements["cardName"];
var cardNumber = form.elements["cardNumber"];
var cardCCV = form.elements["cardCCV"];
var agreement = document.getElementById("agreement");
var warnings = document.querySelector(".warnings");
var warningsList = warnings.querySelector(".list");
var results = document.querySelector(".results");
var resultsList = document.querySelector(".results .list");

var costs = {
    "DE": "2,5€",
    "AT": "3€",
    "ES": "5,45€",
    "FR": "2€",
    "UK": "2,75GBP",
}

var fields = {
    firstName: { regex: "[A-Za-z]{3,20}", errorMessage: "Invalid name."},
    surname : { regex: "[A-Za-z]{3,20}", errorMessage: "Invalid surname."},
    adress : { regex: "[A-Za-z]{3,20}", errorMessage: "Invalid adress."},
    country : { regex: "[A-Z]{2}", errorMessage: "Select country."},
    city : { regex: "[A-Za-z]{3,30}", errorMessage: "Invalid city."},
    cardName : { regex: "[A-Za-z]{3,20}", errorMessage: "Invalid card name."},
    cardNumber : { regex: "[0-9]{13,16}", errorMessage: "Invalid card number."},
    cardCCV : { regex: "[0-9]{3}", errorMessage: "Invalid card CCV."}
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
    resultsList.innerHTML = "";
    city.classList.remove("-loading");
    payload.map(function(item,index){
        if (item != ""){
            var li = document.createElement("li");
            li.classList.add("item");
            li.innerHTML = item;
            li.onclick = function(event){
                city.value = item;
                resultsList.innerHTML = "";
                cost.value = costs[country.value] || "";
            }
            resultsList.appendChild(li);
        }
    });
}

function onChangeCountry(e,value){
    city.value = "";
    cost.value = "";
    resultsList.innerHTML = "";
    city.disabled = false;
    city.focus();
    country.classList.remove("-error");
}

function onChangeCity(e, value) {
    var searchTerm = value.trim();
    city.classList.remove("-error");
    if (searchTerm.length >= 3 && country.value !== "") {
        city.classList.add("-loading");
        requestData(country.value, searchTerm);
    } else {
        city.classList.remove("-loading");
        resultsList.innerHTML = "";
        cost.value = "";
    }
}

function onBlurCity(e){
    setTimeout(function(){
        resultsList.innerHTML = "";
    }, 200);
}

function onUpdateInput(input){
    input.classList.remove("-error");
}

function validations(){
    var errors = [];

    for(field in fields){
        var item = fields[field];
        var el = form.elements[field];
        if (!el.value.match(item.regex)){
            errors.push(item.errorMessage);
            el.classList.add("-error");
        } else {
            el.classList.remove("-error");
        }
    }

    if (!agreement.checked) errors.push("You need to accept the terms.");

    return errors;
}

function validateForm(e){

    var errors = validations();

    if (errors.length){

        warnings.classList.add("-show");
        warnings.classList.add("-animate");
        warningsList.innerHTML = "";
        errors.map(function(item,index){
            var li = document.createElement("li");
            li.classList.add("item");
            li.innerHTML = item;
            warningsList.appendChild(li);
        });
        return false;
    }
    return true;
}
