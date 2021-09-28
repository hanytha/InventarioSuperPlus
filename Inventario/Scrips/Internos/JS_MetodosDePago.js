CrearAcordeonDepartamentos(); 
function CrearAcordeonDepartamentos() {
    $.get("/Departamentos/ConsultaDepartamentos", function (Deptos) {
        var CodHTML = "";
        for (var i = 0; i < Deptos.length; i++) {
            CodHTML += "<button onclick='myFunction(dep" + Deptos[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Deptos[i].Nombre + "</button>";
            CodHTML += "<div id='dep" + Deptos[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Usuario:" + Deptos[i].UNombre +"</h4>";
            CodHTML += "<h4>Email:" + Deptos[i].Correo+"</h4>" ;
            CodHTML += "<h4>Teléfono:" + Deptos[i].Telefono+"</h4>" ;
            CodHTML += "<h4>Carpeta:" + Deptos[i].Carpeta+"</h4>" ;
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}