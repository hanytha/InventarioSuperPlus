CrearAcordeonCompra(); 
function CrearAcordeonCompra() {
    $.get("/Compra/ConsultaCompras", function (Deptos) {
        var CodHTML = "";
        for (var i = 0; i < Deptos.length; i++) {
            CodHTML += "<button onclick='myFunction(dep" + Deptos[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Deptos[i].MetodoDePago + "</button>";
            CodHTML += "<div id='dep" + Deptos[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>MetodoDePago:" + Deptos[i].MetodoDePago +"</h4>";
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}