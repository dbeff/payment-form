var apiURL =  "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=[COUNTRY]&q=[QUERY]";





function ajax(url){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET", url);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE) {
            if(xmlhttp.status == 200){
                console.log("Response: " + xmlhttp.responseText );
            }else{
                console.log("Error: " + xmlhttp.statusText )
            }
        }
    }
    xmlhttp.send(data);
}



ajax(apiURL);
