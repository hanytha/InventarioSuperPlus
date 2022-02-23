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

        $.get("/Mermas/ConsultaArticuloM/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDTiend', Data[0].IdExistenciaAlmacenG);
            document.getElementById("TxtIdCompra").value = Data[0].IdCompra;
            document.getElementById("TxtIdCompraInterna").value = Data[0].IdCompraInterno;
            document.getElementById("TxtNumPedido").value = Data[0].NoPedidoG;
           // document.getElementById("TxtProveedor").value = Data[0].E1Nombre;
            document.getElementById("TxtArticulo").value = Data[0].Articulo;
            document.getElementById("TxtCantidad").value = Data[0].ExitenciaActual;
            document.getElementById("Observaciones").value = Data[0].A1Nombre;
        });
    }
}

//--------------------------------------------------------------------------------------------------------
function consultaFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFecha').value = fecha;
}