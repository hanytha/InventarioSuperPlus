CrearAcordeonConfiguraciones();
function CrearAcordeonConfiguraciones() {
    $.get("/Configuracion/ConsultaConfiguraciones", function (Config) {
        var CodHTML = "";
        for (var i = 0; i < Config.length; i++) {
            CodHTML += "<button onclick='myFunction(conf" + Config[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Config[i].NombreEmpresa + "</button>";
            CodHTML += "<div id='conf" + Config[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>RFC:" + Config[i].RFC + "</h4>";
            CodHTML += "<h4>Vision:" + Config[i].Vision + "</h4>";
            CodHTML += "<h4>Mision:" + Config[i].Mision + "</h4>";
            CodHTML += "<h4>Valores:" + Config[i].Valores + "</h4>";
            CodHTML += "<h4>Direccion:" + Config[i].Direccion + "</h4>";
            CodHTML += "<h4>Telefono:" + Config[i].Telefono + "</h4>";
            CodHTML += "<h4>DireccionHost:" + Config[i].DireccionHost + "</h4>";
            CodHTML += "<h4>Puerto:" + Config[i].Logo + "</h4>";
            CodHTML += "<h4>LogoTexto:" + Config[i].LogoTexto + "</h4>";
            CodHTML += "<h4>SesionAbierta:" + Config[i].SesionAbierta + "</h4>";
            CodHTML += "<h4>SerCorreo:" + Config[i].SerCorreo + "</h4>";
            CodHTML += "<h4>SerCorreoPort:" + Config[i].SerCorreoPort + "</h4>";
            CodHTML += "<h4>SerCorreoUser:" + Config[i].SerCorreoUser + "</h4>";
            CodHTML += "<h4>SerCorreoPass:" + Config[i].SerCorreoPass + "</h4>";
            CodHTML += "<h4>DireccionHost:" + Config[i].DireccionHost + "</h4>";
            CodHTML += "<h4>DirWeb:" + Config[i].DirWeb + "</h4>";
            CodHTML += "<h4>Tipo:" + Config[i].Tipo + "</h4>";
            CodHTML += "<h4>Dato2:" + Config[i].Dato2 + "</h4>";
            CodHTML += "<h4>Dato4:" + Config[i].Dato4 + "</h4>";

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
