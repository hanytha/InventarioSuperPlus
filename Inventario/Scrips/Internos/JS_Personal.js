CrearAcordeonPersonal(); 
function CrearAcordeonPersonal() {
    $.get("/Personal/ConsultaPersonales", function (Prnls) {
        var CodHTML = "";
        for (var i = 0; i < Prnls.length; i++) {
            CodHTML += "<button onclick='myFunction(pl" + Prnls[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Prnls[i].TipoPersonal + "</button>";
            CodHTML += "<div id='pl" + Prnls[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>TipoPersonal:" + Prnls[i].TipoPersonal +"</h4>";
            CodHTML += "<h4>NumeroTienda:" + Prnls[i].NumeroTienda+"</h4>" ;

            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}