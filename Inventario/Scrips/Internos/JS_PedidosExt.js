
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
    CodigoHtmlTablaPedidos += "<input  class='form-control col-md-3 light-table-filter' data-table='order-table' type='text' placeholder='Search..'>";
    CodigoHtmlTablaPedidos += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
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
            document.getElementById("TxtDireccion").textContent = Data[0].Direccion;
            document.getElementById("TxtTelefono").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreo").textContent = Data[0].Correo;
            document.getElementById("TxtFecha").textContent = Data[0].Fecha;
            document.getElementById("TxtNumeroPedido").textContent = Data[0].NumPedidoProveedor;
            MostrarArticulos(num);
        });
    }
}

//******************************************************************************************************************************
//-----------------------------------------------------------------------------------------------------------------------
function MostrarArticulos(num) {
    if (num == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Pedidosext/ConsultaPedidoJoinArticulo/?Pedi=" + num, function (Data) {
            var dos = "";

            dos += "<div style='width: 100%'>"
            dos += "<div {NM_CSS_FUN_CAB} style='height:11px; display: inline; border-width:0px; '></div>"
            dos += "<div style='height:37px; background-color:#FFFFFF; border-width:0px 0px 1px 0px;  border-style: dashed; border-color:#ddd; display: inline'>"
            dos += "<table style='width:100%; border-collapse:collapse; padding:0;'>"
            dos += "<thead>"
            dos += "<tr align='left'>"
            dos += "<th >Artículo</th>"
            dos += "<th >Unidad_Medida</th>"
            dos += "<th >Cantidad Solicitada</th>"
            dos += "<th >Precio_Unitario</th>"
            dos += "<th >Total</th>"
            dos += "</tr>"
            dos += "</thead>"
            dos += "<tbody>"

            for (var i = 0; i < Data.length; i++) { 

                //--------Multiplica la cantidad solicitada por el precio unitario para obtener el total------------------------
                let tres = (Data[i].CantidadSolicitada) * (Data[i].PrecioUnitarioPromedio);

                //----Cuerpo del grid-------------
                dos += "<tr>"
                dos += "<td align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Articulo + "</label></td>"
                dos += "<td  align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Unidad + "</label></td>"
                dos += "<td  align='left' id='lin1_col2' {NM_CSS_CAB}><label>" + Data[i].CantidadSolicitada + "</label></td>"
                dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + Data[i].PrecioUnitarioPromedio + "</label></td>"
                dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label></label>"+ tres +"</td>"
                dos += "</tr>"
            }
            dos += "</tbody>"
            dos += "</table>"
            dos += "</div>";
            dos += "</div>";

            document.getElementById("TblArticulos").innerHTML = dos;
        });
    }
}

