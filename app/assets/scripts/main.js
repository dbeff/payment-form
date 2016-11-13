function parsePayload(payload) {
    var resultElement = document.querySelector(".results");
    resultElement.innerHTML = payload.toString();
}

function ajax(filter, query) {
    var script = document.createElement("script");
    script.src = "//gd.geobytes.com/AutoCompleteCity?callback=parsePayload&filter=" + filter + "&q=" + query;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function onChangeCity(e, value) {
    var country = document.querySelector(".country");
    if (value.length >= 3 && country !== "") {
        ajax(country.value, value);
    }
}
