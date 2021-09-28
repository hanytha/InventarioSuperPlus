CrearAcordeonDepartamentos(); 
function CrearAcordeonDepartamentos() {
    $.get("/Supervision/ConsultaSupervisiones", function (Spvsn) {
        var CodHTML = "";
        for (var i = 0; i < Spvsn.length; i++) {
            CodHTML += "<button onclick='myFunction(spn" + Spvsn[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Spvsn[i].Supervicion + "</button>";
            CodHTML += "<div id='spn" + Spvsn[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Supervicion:" + Spvsn[i].Supervicion +"</h4>";
            CodHTML += "<h4>Nombre del usuario:" + Spvsn[i].UNombre+"</h4>" ;
            CodHTML += "<h4>Tiendas:" + Spvsn[i].Tiendas+"</h4>" ;
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}