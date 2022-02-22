//ConsultaArticulos();
ConsultaArticulos();

//---------------Crea una tabla de todos los artículos de la BD---------------
function ConsultaArticulos() {
    $.get("/Mermas/ConsultaCompraInternaJoinExistenciasAlmacen", function (Data) {
        CrearTablaArticulos(Data);
    }
    );
}
function CrearTablaArticulos(Data) {
    var CodigoHtmlTablaArticulos = "";

    CodigoHtmlTablaArticulos += "<div class='table-responsive'>";
    CodigoHtmlTablaArticulos += "<table class='table-success table table-bordered order-table'>";
    CodigoHtmlTablaArticulos += "<thead>";
    CodigoHtmlTablaArticulos += "<tr>";
    CodigoHtmlTablaArticulos += "<th>Artículo</th>";
    CodigoHtmlTablaArticulos += "<th></th>";
    CodigoHtmlTablaArticulos += "<th>Área</th>";
    CodigoHtmlTablaArticulos += "<th></th>";
    CodigoHtmlTablaArticulos += "<th>Precio_Unitario_Promedio</th>";
    CodigoHtmlTablaArticulos += "<th>Opciones</th>";
    CodigoHtmlTablaArticulos += "</tr>";
    CodigoHtmlTablaArticulos += "</thead>";
    CodigoHtmlTablaArticulos += "<tbody>";


    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaArticulos += "<tr>";
        CodigoHtmlTablaArticulos += "<td colspan='2'>" + Data[i].IdCompra + "</td>";
        CodigoHtmlTablaArticulos += "<td colspan='2'>" + Data[i].IdArticulo + "</td>";
        CodigoHtmlTablaArticulos += "<td>" + Data[i].Articulo + "</td>";
        CodigoHtmlTablaArticulos += "<td>";
        CodigoHtmlTablaArticulos += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdArticulo + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHtmlTablaArticulos += "<button class='btn btn-danger' onclick='EliminarArticulo(" + Data[i].IdArticulo + ",this)' ><i class='far fa-trash-alt'></i></button>";

        CodigoHtmlTablaArticulos += "</td>";
        CodigoHtmlTablaArticulos += "</tr>";
    }
    CodigoHtmlTablaArticulos += "</tbody>";
    CodigoHtmlTablaArticulos += "</table>";
    document.getElementById("tablaMermas").innerHTML = CodigoHtmlTablaArticulos;
}


//