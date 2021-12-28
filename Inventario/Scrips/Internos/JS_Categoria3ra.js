ConsultaCategorias();
function ConsultaCategorias() {
    $.get("/Categoria/ConsultaCategorias", function (Data) {
        CrearTablaCategorias(Data);
    }
    );
}
function CrearTablaCategorias(Data) {
    var CodigoHtmlTablaCategoria = "";
    CodigoHtmlTablaCategoria  += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaCategoria += "<thead class='thead-dark'><tr><th>Clasificación</th></thead>";
    CodigoHtmlTablaCategoria  += "<tbody>";
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
