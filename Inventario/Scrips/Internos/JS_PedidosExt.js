
//*****************Crea la tabla de todos los pedidos quee se realizan a los proveedores*****************************
ConsultaPedidos();
function ConsultaPedidos() {
    $.get("/Pedidosext/ConsultaPedidosNumeroPedido", function (Data) {
        CrearTablaPedidos(Data);
    }
    );
}
function CrearTablaPedidos(Data) {
    var CodigoHtmlTablaPedidos = "";
    CodigoHtmlTablaPedidos += "<div class='input-group mb-3'>";

    CodigoHtmlTablaPedidos += "<input   style='border-style:   outset; border-width: 3px;  border-color:cornflowerblue;     border-radius: 8px;   background-color:mintcream;' class='form-control col-md-3 light-table-filter'  data-table='order-table' type='text'  placeholder='Search....'>";

    CodigoHtmlTablaPedidos += "<span  class='input-group-text' style='border-style:  outset; border-width: 3px; border-color:cornflowerblue;   border-radius: 8px; '  id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPedidos += "</div>";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>Número_Pedido</th>";
    CodigoHtmlTablaPedidos += "<th>Proveedor</th>";
    CodigoHtmlTablaPedidos += "<th></th>";
    CodigoHtmlTablaPedidos += "<th>Fecha</th>";
    CodigoHtmlTablaPedidos += "<th>Acción</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";




    let NoPedido = Data.NoPedido;
    let ArrayNoPedido = NoPedido.split(',');
    let NoProvedor = Data.NoProvedor;
    let ArrayNoProvedor = NoProvedor.split(',');
    let Proveedor = Data.Proveedor;
    let ArrayProveedor = Proveedor.split(',');
    let fecha = Data.fecha;
    let Arrayfecha = fecha.split(',');
    let IdPedido = Data.IdPedido;
    let ArrayIdPedido = IdPedido.split(',');


    for (var i = 0; i < ArrayIdPedido.length; i++) {

        CodigoHtmlTablaPedidos += "<tr>"
        CodigoHtmlTablaPedidos += "<td>" + ArrayNoPedido[i] + "</td>"
        CodigoHtmlTablaPedidos += "<td colspan='2'>" + ArrayProveedor[i] + "</td>"
        CodigoHtmlTablaPedidos += "<td>" + Arrayfecha[i] + "</td>"
        CodigoHtmlTablaPedidos += "<td><button class='btn btn-primary'  data-title='Ver pedido' onclick='VerPedido(" + ArrayNoPedido[i] + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='far fa-eye'></i></i></button></td>";
        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>"; 
    CodigoHtmlTablaPedidos += "</table>";
    document.getElementById("TablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
}

//******************************************************************************************************************************
//*******************Despliega el modal deacuerdo con el número de pedido************************************************

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
            document.getElementById("TxtDepartamento").textContent = Data[0].Area;
            document.getElementById("TxtNumeroPedido").textContent = Data[0].NumPedidoProveedor;
            MostrarArticulos(num);
        });
    }
}

//******************************************************************************************************************************
//--------------Crea la tabla de los artículos y sus caracteristicas para mostrarse en el modal de ver pedido-----------------
function MostrarArticulos(num) {
    if (num == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Pedidosext/ConsultaPedidosArticuos/?Pedi=" + num, function (Data) {
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
            dos += "<th >Total por artículo</th>"
            dos += "</tr>"
            dos += "</thead>"
            dos += "<tbody>"

            var total = 0;
            for (var i = 0; i < Data.length; i++) {

                //--------Multiplica la cantidad solicitada por el precio unitario para obtener el total------------------------

                var tres = (Data[i].CantidadSolicitada) * (Data[i].PrecioUnitario);
                total = total + tres;
                //------------------------Cuerpo de la tabla------------------------------------------
                dos += "<tr>"
                dos += "<td align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Articulo + "</label></td>"
                dos += "<td  align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Unidad + "</label></td>"
                dos += "<td  align='left' id='lin1_col2' {NM_CSS_CAB}><label>" + Data[i].CantidadSolicitada + "</label></td>"
                dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + Data[i].PrecioUnitario + "</label></td>"
                dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + tres + "</label></td>"
                dos += "</tr>"
            }
            dos += "<tfoot>"
            dos += "<th></th>"
            dos += "<th></th>"
            dos += "<th></th>"
            dos += "<th>Total</th>"
            dos += "<th>$"+ total+"</th>"
            dos += "</tfoot>"

            dos += "</tbody>"
            dos += "</table>"
            dos += "</div>";
            dos += "</div>";

            document.getElementById("TblArticulos").innerHTML = dos;
        });
    }
}

