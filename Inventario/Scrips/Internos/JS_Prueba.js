ConsultaComprass();
function ConsultaComprass() {
    $.get("/Prueba/ConsultaCompras", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaCompras = "";
    CodigoHtmlTablaCompras  += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaCompras += "<thead><tr><th>Fecha ingreso</th><th>Existencia Actual</th><th>Coste</th><th>Acción</thead>";
    CodigoHtmlTablaCompras  += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompras  += "<tr>";
        CodigoHtmlTablaCompras += "<td>" + Data[i].FechaDeIngreso + "</td>";
        CodigoHtmlTablaCompras += "<td>" + Data[i].ExitenciaActual + "</td>";
        CodigoHtmlTablaCompras += "<td>" + Data[i].Coste + "</td>";
        CodigoHtmlTablaCompras  += "<td>";
        CodigoHtmlTablaCompras += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#ModalEntrada'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompras += "<button class='btn btn-danger' onclick='EliminarEntrada(" + Data[i].IdCompra + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaCompras  += "</td>";
        CodigoHtmlTablaCompras  += "</tr>";
    }
    CodigoHtmlTablaCompras += "</tbody>";
    CodigoHtmlTablaCompras  += "</table>";
    document.getElementById("tabla").innerHTML = CodigoHtmlTablaCompras ;
}

//limpiar campos
function LimpiarCampos() {
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var controlesSLT = document.getElementsByClassName("limpiarSelect");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
    }
}

//"Elimina" la compra cambia el Estatus
function EliminarEntrada(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Entrada/EliminarEntrada/?Id=" + id, function (DatoMarca) {
            if (DatoMarca == 1) {
                alert("Se elimino correctamente");
                ConsultaEntradas();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}




