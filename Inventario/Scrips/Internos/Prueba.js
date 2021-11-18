ConsultaArticuloComp();
function ConsultaArticuloComp() {
    $.get("/compr/ConsultaComprasArt", function (Data) {
        CrearArticuloComp(Data);
        });

}

function CrearArticuloComp(Data) {
    var CodigoHtmlArticuloComp = "";
    CodigoHtmlArticuloComp += "<div id='contenedor1'>";
    CodigoHtmlArticuloComp += "<section id='contenedor_follow'>";
    CodigoHtmlArticuloComp += "<hr class='solid'>";
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>ID</div> "
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Nombre Empresa</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Fecha de ingreso</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Stock</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Costo</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono '>Acción</div>";
    CodigoHtmlArticuloComp += "<hr class='solid'>"
    CodigoHtmlArticuloComp += "<div>";

    let Id = Data.Id;
    let ArrayId = Id.split(',');
    let Clave = Data.Clave;
    let Arraynombre = Clave.split(',');
    let Numero = Data.Numero;
    let ArrayNumero = Numero.split(',');
    let Idcom = Data.Idcom;
    let ArrayIdcom = Idcom.split(',');
 

    for (var i = 0; i < (ArrayId, Arraynombre, Arraynombre, ArrayIdcom ).length; i++) {
        CodigoHtmlArticuloComp += "<div>";
        CodigoHtmlArticuloComp += "<div class='row row-cols-auto '>"
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + ArrayId[i]+ "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraynombre[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col  Cell'>" + ArrayNumero[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + ArrayIdcom[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraycostos[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<label>"
        CodigoHtmlArticuloComp += "<button class='collapsible btn btn-primary btn btn-outline-primary'><i class='fas fa-angle-down'></i></button>"
        CodigoHtmlArticuloComp += "</label>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
    }
    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;
   
}
