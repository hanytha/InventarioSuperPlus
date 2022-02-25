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

            document.getElementById("TxtNumPedido").name = Data[0].IdExistenciaAlmacenG;
            document.getElementById("TxtNumPedido").value = Data[0].NoPedidoG;

            document.getElementById("TxtProveedor").value = Data[0].Proveedor;

            document.getElementById("TxtArticulo").value = Data[0].Articulo;
            document.getElementById("TxtArticulo").name = Data[0].IdArticulo;
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
//-------------------------------------------------------------------------------------------------------------------
function verficar() {
    var combo = document.getElementById("cmbMovimiento");

    if (combo.value == 0) {

        swal("¡Seleccione una opción!", "", "warning");
    }


    if (combo.value == 1) {


        swal({
            title: "Desea guardar la información?",
            text: "",
            icon: "info",
            buttons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
        })
            .then((willDelete) => {
                if (willDelete) {

                    GuardarMerma();
                }
            });

    }
    if (combo.value == 2) {

        swal({
            title: "Desea guardar la información?",
            text: "",
            icon: "info",
            buttons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
        })
            .then((willDelete) => {
                if (willDelete) {

                    nuevoStock();
                }
            });
        
    }
}

//-----------------------Guardar los datos en la tabla de mermasGeneral-------------------------------------------
function GuardarMerma() {

    var IdMermas = sessionStorage.getItem('IDTiend')
    var IdCompra = document.getElementById("TxtIdCompra").value;
    var IdCompraInterna = document.getElementById("TxtIdCompraInterna").value;

    var NoPedidoG = document.getElementById("TxtNumPedido").value;
    var NoName = document.getElementById("TxtNumPedido").name;

    var IdArticulo = document.getElementById("TxtArticulo").name;
    var Articulo = document.getElementById("TxtArticulo").value;
    var StockInicial = document.getElementById("TxtCantidad").value;
    var Observaciones = document.getElementById("TxtNoObservaciones").value;
    var fecha = document.getElementById('TxtFecha').value;

    CambiarDev(NoName);

    var frm = new FormData();

    frm.append("IdMermas", IdMermas);
    frm.append("IdCompra", IdCompra);
    frm.append("IdCompraInterna", IdCompraInterna);
    frm.append("NoPedidoG", NoPedidoG);
    frm.append("IdArticulo", IdArticulo);
    frm.append("Articulo", Articulo);
    frm.append("StockInicial", StockInicial);
    frm.append("StockActual", StockInicial);
    frm.append("Observaciones", Observaciones);
    frm.append("fecha", fecha);
    frm.append("Estatus", 1);

    $.ajax({
        type: "POST",
        url: "/Mermas/GuardarMerma",
        data: frm,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data == 0) {
                swal("¡Ocurrio un error!", "", "danger");
            }
            else if (data == -1) {
                swal("¡El método de pago ya existe!", "", "warning");
            }
            else {
                swal("Datos guardados exitosamente!", "", "success");
                consultaFecha();
                document.getElementById("btnCancelar").click();
            }
        }
    });


}

//------------------------------------------------------------------------------------

function CambiarDev(ID) {

    $.get("/Mermas/ConsultaDevolución/?Id=" + ID, function (Data) {
        let sum = Data;
        if (Data == 1) {
            alert("Ejecución correcta")
        }
    });

}
//------------------------------------------------------------------------------------
function nuevoStock() {

    var compra = document.getElementById("TxtIdCompra").value;
    var articulo = document.getElementById("TxtArticulo").name;
    var ncantidad = document.getElementById("TxtCantidad").value;
    var existencia = document.getElementById("TxtNumPedido").name;


    var cantidad = (ncantidad)*(-1)

    var total = "";

    total += compra + ":" + articulo + "," + cantidad + "/" + existencia;

    $.get("/Mermas/ConsultaStockArticulo/?DatosArticulos=" + total, function (Data) {
        let RES = Data;
        if (Data == 1) { alert("La cantidad se agrego correctamente en el stock") }
        ver();
    });
}

//-------------------------------------------------------------------------------------------------
function ver() {
    $('#ModalPedidos').hide();
    $('.modal-backdrop').hide();
}
//-------------------------------------------------------------------------------------------------
BloquearCTRL();
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
