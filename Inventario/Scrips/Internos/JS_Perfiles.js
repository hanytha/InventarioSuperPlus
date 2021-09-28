CrearAcordeonPerfiles(); 
function CrearAcordeonPerfiles() {
    $.get("/Perfiles/ConsultaPerfiles", function (PflUs) {
        var CodHTML = "";
        for (var i = 0; i < PflUs.length; i++) {
            CodHTML += "<button onclick='myFunction(pfl" + PflUs[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + PflUs[i].Perfil + "</button>";
            CodHTML += "<div id='pfl" + PflUs[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Perfil:" + PflUs[i].Perfil +"</h4>";
            CodHTML += "<h4>Nivel:" + PflUs[i].Nivel+"</h4>" ;
            CodHTML += "<h4>Permisos:" + PflUs[i].Permisos+"</h4>" ;
            CodHTML += "<h4>Comentarios:" + PflUs[i].Comentarios+"</h4>" ;
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}