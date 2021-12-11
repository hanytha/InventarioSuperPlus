
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
        CodigoHtmlTablaPedidos += "<td><button class='btn btn-primary'  data-title='Ver pedido' onclick='VerPedido(" + Data[i].NumeroPedido + ")' data-toggle='modal' data-target='#MoPedidos(" + Data[i].NumeroPedido + ")'><i class='far fa-eye'></i></i></button></td>";
        CodigoHtmlTablaPedidos += "</tr>";

        CodigoHtmlTablaPedidos += "<div class='modal fade' id='MoPedidos(" + Data[i].NumeroPedido + ")'><div class='modal-dialog'><div class='modal-content'> <div class='modal-body'></div></div></div></div>"
    }
    CodigoHtmlTablaPedidos += "</tbody>";
    CodigoHtmlTablaPedidos += "</table>";
    CodigoHtmlTablaPedidos += "</div>";
    document.getElementById("TablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
}

//******************************************************************************************************************************
//******************************************************************************************************************************

function VerPedido(num) {
    if (num == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Pedidosext/ConsultaPedidoXnum/?Num=" + num, function (Data) {
            var Pedidos = "";

            Pedidos += "<div class='card'>"
            Pedidos += " <img class='card-img-top' src='http://1.bp.blogspot.com/-ib8pBUm-zgo/UZQPlF2yb1I/AAAAAAAAABM/h5pf7fstMkc/s1600/logotipo+super+plus+(1).jpg'>"
            Pedidos += "<div class='card-body'>"
            Pedidos += "<h5 class='card-title' style='text-align:center;'>PEDIDO(S)</h5>"
            Pedidos += "</div>"

            for (var i = 0; i < Data.length; i++) {

                Pedidos += "<ul class='list-group list-group-flush'>"
                Pedidos += "<li class='list-group-item'>"
                Pedidos += "<strong>Proveedor:</strong>" + Data[i].Proveedor + "</li>"
                Pedidos += "<li class='list-group-item'>"
                Pedidos += "<strong>RFC:</strong>" + Data[i].RFC + "</li>"
                Pedidos += "<li class='list-group-item'>"
                Pedidos += "<strong>Correo:</strong>" + Data[i].Correo + "</li>"
                Pedidos += "<li class='list-group-item'>"
                Pedidos += "<strong>Clabe Interbancaria:</strong>" + Data[i].Clabe + "</li>"
                Pedidos += "<li class='list-group-item'>"
                Pedidos += "<strong>Télefono:</strong>" + Data[i].Telefono + "</li>"
                Pedidos += "</ul>"
                Pedidos += "</div>"
            }
            Pedidos += "<div class='modal-footer'>"
            Pedidos += "<button id='btnCancelar' class='btn btn-danger' data-dismiss='modal'>Cancelar</button>"
            Pedidos += "</div>"

            let nombre = "MoPedidos" + num;
            document.getElementById(nombre).innerHTML = Pedidos;
        });
    }
}
