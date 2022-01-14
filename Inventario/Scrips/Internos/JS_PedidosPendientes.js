
ConsultaCompras();
BloquearCTRL();
function ConsultaCompras() {
    $.get("/PedidosPendientes/ConsultaPedidos", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaPedidos = "";
    CodigoHtmlTablaPedidos += "<br />"
    CodigoHtmlTablaPedidos += "<div class='input-group mb-3 float-right '>";

    CodigoHtmlTablaPedidos += "<input  style='border-style:  outset; border-width: 3px;   border-color:mediumturquoise;     border-radius: 8px;   background-color:mintcream;' class='form-control col-md-3 light-table-filter'  data-table='order-table' type='text'  placeholder='Search....'>";

    CodigoHtmlTablaPedidos += "<span  class='input-group-text' style='border-style:  outset; border-width: 3px; border-color:mediumturquoise;   border-radius: 8px; '  id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPedidos += "</div>";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-info table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>Núm_Pedido</th>";
    CodigoHtmlTablaPedidos += "<th>Tienda</th>";
    CodigoHtmlTablaPedidos += "<th>Opciones</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaPedidos += "<tr>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].NumeroPedido + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Tienda + "</td>";
        CodigoHtmlTablaPedidos += "<td>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-info' onclick='abrirModal(" + Data[i].NumeroPedido + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-danger' onclick='EliminarCompra(" + Data[i].NumeroPedido + ",this)'><i class='far fa-trash-alt'></i></button>";

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

        });
    }
}

//*********************************************************************************************


//----------------------Función para ver las compras por id de compra-----------------------------------
function MostrarArticulosPorIdCompra(id) {

    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');

    }
    else {

        $.get("/Compra/ConsultaIdCompraenCompraArts/?Id=" + id, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Unidad_Medida</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Impuesto</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Precio_Unitario</label>";
            TablaArticulo += "</div>";

            for (var i = 0; i < Data.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar ' disabled name=' " + Data[i].IdArticulo + "'   id='" + Data[i].IdArticulos + "'  value='" + Data[i].Articulo + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-Unidad sinborde limpiar redondeado' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].Unidad + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-impuesto sinborde limpiar redondeado' disabled  style='width:45px;'  id='" + Data[i].IdArticulos + "'  value='" + Data[i].Impuesto + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='" + Data[i].StockActual + "' onkeyup='costo();' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' name='" + Data[i].ExistenciaInicial + "'><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='" + Data[i].PrecioUnitario + "' onkeyup='costo();' class='input-Precio monto redondeado limpiar' id='" + Data[i].IdArticulos + "' name='" + Data[i].IdExistenciaCompra + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;

            deshabilitar();
        });
    }
}



//------------------limpiar campos-------------------------------
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
