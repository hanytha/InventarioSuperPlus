CrearAcordeonedartamentos(); 
function CrearAcordeonedartamentos() {
    $.get("/Entrada/ConsultaEntradas", function (Eds) {
        var CodHTML = "";
        for (var i = 0; i < Eds.length; i++) {
            CodHTML += "<button onclick='myFunction(ed" + Eds[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Eds[i].NombreArticulo + "</button>";
            CodHTML += "<div id='ed" + Eds[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Nombre del articulo:" + Eds[i].NombreArticulo +"</h4>";
            CodHTML += "<h4>Cantidad:" + Eds[i].Cantidad+"</h4>" ;
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}