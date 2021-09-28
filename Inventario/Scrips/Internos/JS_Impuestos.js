CrearAcordeonImpuestos(); 
function CrearAcordeonImpuestos() {
    $.get("/Impuestos/ConsultaImpuestos", function (Impstos) {
        var CodHTML = "";
        for (var i = 0; i < Impstos.length; i++) {
            CodHTML += "<button onclick='myFunction(imp" + Impstos[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Impstos[i].Nombre + "</button>";
            CodHTML += "<div id='imp" + Impstos[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Impuesto:" + Impstos[i].Impuesto1 +"</h4>";
            CodHTML += "<h4>Porcentaje:" + Impstos[i].Porcentaje+"</h4>" ;
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });

}
/*Funcion*/
function myFunction(Id) {
    var x = document.getElementById(Id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}