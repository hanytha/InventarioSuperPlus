CrearAcordeonSubArea(); 
function CrearAcordeonSubArea() {
    $.get("/subArea/ConsultaSubAreas", function (SubAr) {
        var CodHTML = "";
        for (var i = 0; i < SubAr.length; i++) {
            CodHTML += "<button onclick='myFunction(sb" + SubAr[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + SubAr[i].Nombre + "</button>";
            CodHTML += "<div id='sb" + SubAr[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Usuario:" + SubAr[i].UNombre +"</h4>";
            CodHTML += "<h4>Número de Subarea:" + SubAr[i].NoSubArea+"</h4>" ;
            CodHTML += "<h4>Telefono:" + SubAr[i].Telefono+"</h4>" ;
            CodHTML += "<h4>Correo:" + SubAr[i].Correo + "</h4>";
            CodHTML += "<h4>Nombre del encargado 2:" + SubAr[i].NEncargado2 + "</h4>";
            CodHTML += "<h4>Correo del Encargado 2:" + SubAr[i].CorreoE2 + "</h4>";
            CodHTML += "<h4>Nombre del encargado 3:" + SubAr[i].NEncargado3 + "</h4>";
            CodHTML += "<h4>Telefono del Encargado 3:" + SubAr[i].TelefonoE3 + "</h4>";
            CodHTML += "<h4>Correo del Encargado 3:" + SubAr[i].CorreoE3 + "</h4>";
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}