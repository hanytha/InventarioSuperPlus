CrearAcordeonSupervisores(); 
function CrearAcordeonSupervisores() {
    $.get("/Supervisor/ConsultaSupervisores", function (superv) {
        var CodHTML = "";
        for (var i = 0; i < superv.length; i++) {
            CodHTML += "<button onclick='myFunction(sp" + superv[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + superv[i].Nombre + "</button>";
            CodHTML += "<div id='sp" + superv[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Nombre:" + superv[i].Nombre +"</h4>";
            CodHTML += "<h4>Apellidos:" + superv[i].Apellidos+"</h4>" ;
            CodHTML += "<h4>Teléfono:" + superv[i].Telefono+"</h4>" ;
            CodHTML += "<h4>Correo:" + superv[i].Correo+"</h4>" ;
            CodHTML += "</div>";
        }
        document.getElementById("ac").innerHTML = CodHTML;
    });

   
}
/*function myFunction(Id) {
    var x = document.getElementById(Id);
    if (x.className.indexOf("w3-hide") == 1) {
        x.className += " w3-show";
    } else {
    x.className = x.className.replace(" w3-show", "w3-hide");
    }
}
*/

$(function () {
    $(".accordion-titulo").click(function (e) {

        e.preventDefault();

        var contenido = $(this).next(".accordion-content");

        if (contenido.css("display") == "none") { //open		
            contenido.slideDown(250);
            $(this).addClass("open");
        }
        else { //close		
            contenido.slideUp(250);
            $(this).removeClass("open");
        }

    });
});