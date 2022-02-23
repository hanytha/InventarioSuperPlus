//ConsultaArticulos();
//ConsultaArticulos();
consultaFecha();
//---------------Crea una tabla de todos los artículos de la BD---------------

function abrirModal(id) {
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDTiend', '0');

    }
    else {
        LimpiarCampos();

        $.get("/Mermas/ConsultaArticuloM/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDTiend', Data[0].IdExistenciaAlmacenG);
            document.getElementById("TxtIdCompra").value = Data[0].IdCompra;
            document.getElementById("TxtIdCompraInterna").value = Data[0].IdCompraInterno;
            document.getElementById("TxtNumPedido").value = Data[0].NoPedidoG;
            document.getElementById("TxtProveedor").value = Data[0].Proveedor;
            document.getElementById("TxtArticulo").value = Data[0].Articulo;
            document.getElementById("TxtCantidad").value = Data[0].ExitenciaActual;
            document.getElementById("TxtNoObservaciones").value = Data[0].Observaciones;

        });
    }
}

//----------------------------------Función para calcular la fecha------------------------------------------
function consultaFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFecha').value = fecha;
}
//----------------------------------------------------------------------
function LimpiarCampos() {

    document.getElementById("cmbMovimiento").value = 0;

}
