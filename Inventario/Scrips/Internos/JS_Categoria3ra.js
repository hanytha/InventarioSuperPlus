
//**********************************Crea la liste de categorias y unidades de media*******************************************

ListaCategorias();
function ListaCategorias() {
    $.get("/Categoria/ConsultaCategorias", function (Data) {
        CrearListaCategorias(Data);
    }
    );
}
function CrearListaCategorias(Data) {
    var CodigoHtmlTablaCategoria = "";


    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCategoria += "<ul class='list-group list-group-flush'>";
        CodigoHtmlTablaCategoria += "<li>" + Data[i].Tipo + "</li>";
        CodigoHtmlTablaCategoria += "</ul>";
    }

    document.getElementById("listaCategoria").innerHTML = CodigoHtmlTablaCategoria;
}

//******************************************************************************************

ListaUnidadDeMedida();
function ListaUnidadDeMedida() {
    $.get("/UnidadMedida/ConsultaUnidadDeMedidas", function (Data) {
        CrearListaUnidadDeMedida(Data);
    }
    );
}
function CrearListaUnidadDeMedida(Data) {
    var CodigoHtmlTablaCompra = "";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra += "<ul class='list-group list-group-flush'>";
        CodigoHtmlTablaCompra += "<li>" + Data[i].Unidad + "</li>";
        CodigoHtmlTablaCompra += "</ul>";

    }

    document.getElementById("ListaUnidadMedida").innerHTML = CodigoHtmlTablaCompra;
}
