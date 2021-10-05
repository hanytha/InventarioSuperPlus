CrearAcordeonUsuarios(); 
function CrearAcordeonUsuarios() {
    $.get("/Usuario/ConsultaUsuarios", function (Users) {
        var CodHTML = "";
        for (var i = 0; i < Users.length; i++) {
            CodHTML += "<button onclick='myFunction(Us" + Users[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Users[i].Nombre + "</button>";
            CodHTML += "<div id='Us" + Users[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>CURP:" + Users[i].CURP +"</h4>";
            CodHTML += "<h4>Nombre:" + Users[i].Nombre+"</h4>" ;
            CodHTML += "<h4>ApellidosP:" + Users[i].ApellidosP+"</h4>" ;
            CodHTML += "<h4>ApellidosM" + Users[i].ApellidosM + "</h4>";
            CodHTML += "<h4>Foto:" + Users[i].Foto+ "</h4>";
            CodHTML += "<h4>FechaDeNacimiento:" + Users[i].FechaDeNacimiento + "</h4>";
            CodHTML += "<h4>RFC:" + Users[i].RFC + "</h4>";
            CodHTML += "<h4>Número de Seguro Social:" + Users[i].NoSS + "</h4>";
            CodHTML += "<h4>Correo:" + Users[i].Correo+ "</h4>";
            CodHTML += "<h4>Telefono" + Users[i].Telefono + "</h4>";
            CodHTML += "<h4>LvlPerfil:" + Users[i].LvlPerfil + "</h4>";
            CodHTML += "<h4>NArea:" + Users[i].NArea + "</h4>";
            CodHTML += "<h4>Asignacion:" + Users[i].Asignacion + "</h4>";
            CodHTML += "<h4>sitio:" + Users[i].sitio + "</h4>";
            CodHTML += "<h4>Usuario:" + Users[i].Usuario + "</h4>";
            CodHTML += "<h4>Contraseña:" + Users[i].Contraseña + "</h4>";
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}
function myFunction(Id) {
    var x = document.getElementById(Id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}


