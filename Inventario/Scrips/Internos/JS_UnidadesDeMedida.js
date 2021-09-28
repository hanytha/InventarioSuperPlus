CrearAcordeonUnidadesDeMedidas(); 
function CrearAcordeonUnidadesDeMedidas() {
    $.get("/UnidadMedida/ConsultaUnidadesDeMedida", function (UnddM) {
        var CodHTML = "";
        for (var i = 0; i < UnddM.length; i++) {
            CodHTML += "<button onclick='myFunction(udm" + UnddM[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + UnddM[i].Unidad + "</button>";
            CodHTML += "<div id='udm" + UnddM[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Usuario:" + UnddM[i].Unidad +"</h4>";
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}

