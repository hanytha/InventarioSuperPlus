
CrearExistenciasAlmacen();
function CrearExistenciasAlmacen() {
    $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacenes", function (Data) {
        CrearTablaExistenciasAlmacen(Data);
    }
    );
}
function CrearTablaExistenciasAlmacen(Data) {
    var CodigoHtmlExistenciasAlmacen = "";
    CodigoHtmlExistenciasAlmacen += "<div class='input-group mb-3 float-right '>";
    CodigoHtmlExistenciasAlmacen += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>"
    CodigoHtmlExistenciasAlmacen += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlExistenciasAlmacen += "</div>";
    CodigoHtmlExistenciasAlmacen += "<div class='table-responsive'>";
    CodigoHtmlExistenciasAlmacen += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlExistenciasAlmacen += "<thead>";
    CodigoHtmlExistenciasAlmacen += "<tr>";
    CodigoHtmlExistenciasAlmacen += "<th>Número de pedido</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Fecha</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Operación</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Artículo</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Coste</th>";
    CodigoHtmlExistenciasAlmacen += "</tr>";
    CodigoHtmlExistenciasAlmacen += "</thead>";
    CodigoHtmlExistenciasAlmacen += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlExistenciasAlmacen += "<tr>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].NoPedido + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].FechaDeIngreso + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].TipoDeOperacion + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].NombreEmpresa + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].Coste + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>";
       
        CodigoHtmlExistenciasAlmacen += "</td>";
        CodigoHtmlExistenciasAlmacen += "</tr>";
    }
    CodigoHtmlExistenciasAlmacen += "</tbody>";
    CodigoHtmlExistenciasAlmacen += "</table>";
    document.getElementById("TablaPedidos").innerHTML = CodigoHtmlExistenciasAlmacen;
}
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdExistenciaAlmacenG', '0');
    }
    else {
        $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacen/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdExistenciaAlmacenG', Data[0].IdExistenciaAlmacenG);
            document.getElementById("TxtNumCompra").value = Data[0].NoPedido;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            $.get("/GLOBAL/BDArtEx/?IDP=" + Data[0].IdProveedor, function (Proveedor) {
                llenarCombo(Proveedor, document.getElementById("cmbArticulo"));
                document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            });
            document.getElementById("TxtExistenciaInicial").value = Data[0].ExitenciaInicial;
            document.getElementById("TxtExistenciaActual").value = Data[0].ExitenciaActual;
            document.getElementById("TxtFechaSistema").value = Data[0].FechaDeIngreso;
            document.getElementById("TxtTipoOperacion").value = Data[0].TipoDeOperacion;
            document.getElementById("cmbCompra").value = Data[0].IdCompra;
            document.getElementById("TxtFechaSistema").value = Data[0].FechaDeIngreso;
            document.getElementById("TxtCosto").value = Data[0].Coste;
            document.getElementById("cmbAsignacion").value = Data[0].IdAsignacion;
            Sitio(Data[0].IdAsignacion, Data[0].IdSitio);
        });
    }
}

