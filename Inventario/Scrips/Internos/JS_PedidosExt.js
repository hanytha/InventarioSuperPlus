
ConsultaPedidos();
function ConsultaPedidos() {
    $.get("/Pedidosext/ConsultaPedidosExternos", function (Data) {
        CrearTablaPedidos(Data);
    }
    );
}
function CrearTablaPedidos(Data) {
    var CodigoHtmlTablaPedidos = "";
    CodigoHtmlTablaPedidos += "<div class='input-group mb-3'>";
    CodigoHtmlTablaPedidos += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPedidos += "<input  class='form-control col-md-3 light-table-filter' data-table='order-table' type='text' placeholder='Search..'>";
    CodigoHtmlTablaPedidos += "</div>";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>ID</th>";
    CodigoHtmlTablaPedidos += "<th>Número_Pedido</th>";
    CodigoHtmlTablaPedidos += "<th>Proveedor</th>";
    CodigoHtmlTablaPedidos += "<th>Fecha</th>";
    CodigoHtmlTablaPedidos += "<th>Acción</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";
    for (var i = 0; i < Data.length; i++) {

        CodigoHtmlTablaPedidos += "<tr>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].IdPedidosExternos + "</td>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].NumeroPedido + "</td>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Proveedor + "</td>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Fecha + "</td>"
        CodigoHtmlTablaPedidos += "<td><button class='btn btn-primary'  data-title='Ver pedido' onclick='VerPedido(" + Data[i].NumeroPedido + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='far fa-eye'></i></i></button></td>";
        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>"; 
    CodigoHtmlTablaPedidos += "</table>";
    CodigoHtmlTablaPedidos += "</div>";
    document.getElementById("TablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
}

//******************************************************************************************************************************
//*************************Ver el pedido deacuerdo con el número de pedido************************************************

function VerPedido(num) {
    if (num == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Pedidosext/ConsultaPedidoXnum/?Num=" + num, function (Data) {
            document.getElementById("TxtProveedor").textContent = Data[0].Proveedor;
            document.getElementById("TxtRFC").textContent = Data[0].RFC;
            document.getElementById("TxtClabe").textContent = Data[0].Clabe;
            document.getElementById("TxtTelefono").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreo").textContent = Data[0].Correo;
            document.getElementById("TxtArticulo").textContent = Data[0].Articulo;
            document.getElementById("TxtCantidad").textContent = Data[0].CantidadSolicitada;
            MostrarArticulos(num);
        });
    }
}

//******************************************************************************************************************************
//************Genera los artículo y la cantidad solicitada deacuerdo con el número de pedido*****************************

function MostrarArticulos(num) {
    if (num == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Pedidosext/ConsultaArícuiloXnum/?Pedi=" + num, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";

            for (var i = 0; i < Data.length; i++) {
                //-------Crea los Artículos-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += " <label id='TxtArticulo'>" + Data[i].Articulo + "</label>"
                TablaArticulo += "</div>";
                //-------Crea la cantidad solicitada-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += " <label id='TxtArticulo'>" + Data[i].CantidadSolicitada + "</label>"
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
            }


            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}