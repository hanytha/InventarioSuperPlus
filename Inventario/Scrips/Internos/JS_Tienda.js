CrearAcordeonTiendas();
function CrearAcordeonTiendas() {
    $.get("/Tienda/ConsultaTiendas", function (Tnda) {
        var CodHTML = "";
        for (var i = 0; i < Tnda.length; i++) {
            CodHTML += "<button onclick='myFunction(Tda" + Tnda[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Tnda[i].Nombre + "</button>";
            CodHTML += "<div id='Tda" + Tnda[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Nombre:" + Tnda[i].Nombre + "</h4>";
            CodHTML += "<h4>NombreS:" + Tnda[i].NombreS + "</h4>";
            CodHTML += "<h4>Unombre:" + Tnda[i].Unombre + "</h4>";
            CodHTML += "<h4>LNombre:" + Tnda[i].LNombre + "</h4>";
            CodHTML += "<h4>E1Nombre:" + Tnda[i].E1Nombre + "</h4>";
            CodHTML += "<h4>E3Nombre:" + Tnda[i].E3Nombre + "</h4>";
            CodHTML += "<h4>A1Nombre:" + Tnda[i].A1Nombre + "</h4>";
            CodHTML += "<h4>A2Nombre:" + Tnda[i].A2Nombre + "</h4>";
            CodHTML += "<h4>A3Nombre:" + Tnda[i].A3Nombre + "</h4>";
            CodHTML += "<h4>SesionAbierta:" + Tnda[i].SesionAbierta + "</h4>";
            CodHTML += "<h4>Estado:" + Tnda[i].Estado + "</h4>";
            CodHTML += "<h4>Municipio:" + Tnda[i].Municipio + "</h4>";
            CodHTML += "<h4>Localidad:" + Tnda[i].Localidad + "</h4>";
            CodHTML += "<h4>Calle:" + Tnda[i].Calle + "</h4>";
            CodHTML += "<h4>CP:" + Tnda[i].CP + "</h4>";
            CodHTML += "<h4>Telefono:" + Tnda[i].Telefono + "</h4>";
            CodHTML += "<h4>Latitud:" + Tnda[i].Latitud + "</h4>";
            CodHTML += "<h4>Longitud:" + Tnda[i].Longitud + "</h4>";
            CodHTML += "<h4>HApertura:" + Tnda[i].HApertura + "</h4>";
            CodHTML += "<h4>HCierre:" + Tnda[i].HCierre + "</h4>";

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
