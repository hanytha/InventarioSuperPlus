
ConsultaCompras();
BloquearCTRL();
function ConsultaCompras() {
    $.get("/PedidosPendientes/ConsultaPedidosNumeroPedido", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaPedidos = "";
    CodigoHtmlTablaPedidos = "<br / >";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-success table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>Núm_Pedido</th>";
    CodigoHtmlTablaPedidos += "<th>Tienda</th>";
    CodigoHtmlTablaPedidos += "<th>Opciones</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";


    let NoPedido = Data.NoPedido;
    let ArrayNoPedido = NoPedido.split(',');
    let NomTienda = Data.NomTienda;
    let ArrayNomTienda = NomTienda.split(',');

    let IdAsignacion = Data.IdAsignacion;
    let ArrayIdAsignacion = IdAsignacion.split(',');
    let IdTienda = Data.IdTienda;
    let ArrayIdTienda = IdTienda.split(',');


    for (var i = 0; i < ArrayNoPedido.length; i++) {

        CodigoHtmlTablaPedidos += "<tr>";
        CodigoHtmlTablaPedidos += "<td>" + ArrayNoPedido[i] + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + ArrayNomTienda[i] + "</td>";
        CodigoHtmlTablaPedidos += "<td>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-success' onclick='abrirModal(" + ArrayNoPedido[i] + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-danger' onclick='EliminarCompra(" + ArrayNoPedido[i] + ",this)'><i class='far fa-trash-alt'></i></button>";

        CodigoHtmlTablaPedidos += "</td>";
        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>";
    CodigoHtmlTablaPedidos += "</table>";
    document.getElementById("tablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
}


//------------Limpia la información y carga la informacion de la compra------------------------
function abrirModal(id) {

    if (id == 0) {

        sessionStorage.setItem('IDExt', '0');

    }
    else {

        $.get("/PedidosPendientes/ConsultaPedidoXNumero/?Num=" + id, function (Data) {
 
    
            document.getElementById("TxtAsignacion").value = Data[0].IdAsignacion;
            document.getElementById("TxtNumPedido").value = Data[0].NumeroPedido;
            document.getElementById("TxtTienda").value = Data[0].IdTienda;
            document.getElementById("TxtProveedor").value = Data[0].Proveedor;
            document.getElementById("TxtFecha").value = Data[0].Fecha;
            document.getElementById("TxtNoProveedor").value = Data[0].NumPedidoProveedor;
            document.getElementById("TxtProveedor").name = Data[0].IdProveedor;

            MostrarArticulosPorId(id);
            CalcularFecha();
        });
    }
}

//*********************************************************************************************


//----------------------Función para ver las compras por id de compra-----------------------------------
function MostrarArticulosPorId(id) {

    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');

    }
    else {

        $.get("/PedidosPendientes/ConsultaPedidosNumero/?Num=" + id, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad_Solicitada</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Stock</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad_Aprobada</label>";
            TablaArticulo += "</div>";

            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulo = IdArticulo.split(',');
            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let solicitada = Data.solicitada;
            let Arraysolicitada = solicitada.split(',');
            let stock = Data.stock;
            let Arraystock = stock.split(',');


            for (var i = 0; i < ArrayIdArticulo.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar ' disabled  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-solicitada sinborde limpiar ' disabled   value='" + Arraysolicitada[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-total sinborde limpiar ' disabled  value='" + Arraystock[i]  + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input  class='input-aprobar  limpiar redondeado'  onkeyup='BordeInput()' value='' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
     
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}

//-------------Función para verificar que la cantidad aprobada no sea mayor al stock----------------------
function comparar() {
    var total = document.getElementsByClassName("input-total");
    var aprobar = document.getElementsByClassName("input-aprobar");

    for (let i = 0; i < aprobar.length; i++) {

        if (aprobar[i].value > total[i].value || aprobar[i].value < 0) {

            aprobar[i].style.borderColor = 'Red';
        }
        else {
            alert("Correcto");
        }
    }
}
//-------Funcion para cambiar el color del input cuando el valor ingresado se positivo y menor al stock de artículo---------
function BordeInput() {

    var stock = document.getElementsByClassName("input-total");
    var aprobar = document.getElementsByClassName("input-aprobar");

    for (i = 0; i < aprobar.length; i++) {


        if (aprobar[i].value > 0 && aprobar[i].value <= stock[i].value || aprobar[i].value == 0) {

            aprobar[i].style.borderColor = 'DimGray';
        }
    }
}


//------------------------------------------------------limpiar campos-------------------------------
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

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

//------------Funcion que calcula la fecha del sistema------------------------
function CalcularFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaAprobada').value = fecha;

} 
//---------------------------------------------------------------------------


//----Función para guardar los datos en la tabla de compras internos-------------------

//Guarda los cambios y altas de las áreas
function GuardarCompraInterna() {

    if (confirm("¿Desea aplicar los cambios?") == 1) {

        var IdCompraInterno = sessionStorage.getItem('IDExt');
        var NoPedido = document.getElementById("TxtNumPedido").value;
        var NoPedidoProveedor = document.getElementById("TxtNoProveedor").value;
        var IdProveedor = document.getElementById("TxtProveedor").name;
        var Proveedor = document.getElementById("TxtProveedor").value;
        var FechaIngreso = document.getElementById("TxtFechaAprobada").value;

        var frm = new FormData();

        frm.append("IdCompraInterno", IdCompraInterno);
        frm.append("NoPedido", NoPedido);
        frm.append("NoPedidoProveedor", NoPedidoProveedor);
        frm.append("IdProveedor", IdProveedor);
        frm.append("Proveedor", Proveedor);
        frm.append("FechaIngreso", FechaIngreso);
 
            $.ajax({
                type: "POST",
                url: "/PedidosPendientes/GuardarProveedorInterno",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡La compra ya existe!", "", "warning");
                    }
                    else {
                        swal("La compra se registró exitosamente!", "", "success");
                        ConsultaCompras();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    
}