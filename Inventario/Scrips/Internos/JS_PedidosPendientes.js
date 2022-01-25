
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
 
            sessionStorage.setItem('IDExt', Data[0].IdPedidosInternos);
            document.getElementById("TxtAsignacion").value = Data[0].IdAsignacion;
            document.getElementById("TxtNumPedido").value = Data[0].NumeroPedido;
            document.getElementById("TxtTienda").value = Data[0].IdTienda;
            document.getElementById("TxtProveedor").value = Data[0].Proveedor;
            document.getElementById("TxtFecha").value = Data[0].Fecha;
            MostrarArticulosPorId(id);
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
                TablaArticulo += "<input  class='input-stock sinborde limpiar ' disabled  value='" + Arraystock[i]  + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input  class='input-aprobada  limpiar redondeado'  onkeyup='BordeInput()' value='' ><span class='help-block text-muted small-font'></span>";
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
    var stock = document.getElementsByClassName("input-stock");
    var aprobar = document.getElementsByClassName("input-aprobada");

    for (let i = 0; i < aprobar.length; i++) {

        stock[i].value;

        if (aprobar[i].value > stock[i].value || aprobar[i].value < 0) {

            aprobar[i].style.borderColor = 'Red';
        }
    }
}
//-------Funcion para cambiar el color del input cuando el valor ingresado se positivo y menor al stock de artículo---------
function BordeInput() {

    var stock = document.getElementsByClassName("input-stock");
    var aprobar = document.getElementsByClassName("input-aprobada");

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
