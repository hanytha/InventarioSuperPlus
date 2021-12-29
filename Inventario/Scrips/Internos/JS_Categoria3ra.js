ConsultaCategorias();
function ConsultaCategorias() {
    $.get("/Categoria/ConsultaCategorias", function (Data) {
        CrearTablaCategorias(Data);
    }
    );
}
function CrearTablaCategorias(Data) {
    var CodigoHtmlTablaCategoria = "";
    CodigoHtmlTablaCategoria += "<div class='table-responsive'>";
    CodigoHtmlTablaCategoria += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaCategoria += "<thead>";
    CodigoHtmlTablaCategoria += "<tr>";
    CodigoHtmlTablaCategoria += "<th>Clasificación</th>";
    CodigoHtmlTablaCategoria += "</tr>";
    CodigoHtmlTablaCategoria += "</thead>";
    CodigoHtmlTablaCategoria += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCategoria  += "<tr>";
        CodigoHtmlTablaCategoria  += "<td>" + Data[i].Tipo + "</td>";
        CodigoHtmlTablaCategoria  += "</td>";
        CodigoHtmlTablaCategoria  += "</tr>";
    }
    CodigoHtmlTablaCategoria  += "</tbody>";
    CodigoHtmlTablaCategoria  += "</table>";
    document.getElementById("tablaCategoria").innerHTML = CodigoHtmlTablaCategoria ;
}
