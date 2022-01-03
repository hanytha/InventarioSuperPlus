
ConsultaCompras();
LlenarCMBImpuesto();
LlenarCMBArticulo();
LlenarCMBUnidades();
LlenarCMBProveedor();

function ConsultaCompras() {
    $.get("/Compra/ConsultasCompras", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaPedidos = "";
    CodigoHtmlTablaPedidos += "<div class='input-group mb-3 float-right '>";

    CodigoHtmlTablaPedidos += "<input  style='border-style:  outset; border-width: 3px;   border-color:mediumturquoise;     border-radius: 8px;   background-color:mintcream;' class='form-control col-md-3 light-table-filter'  data-table='order-table' type='text'  placeholder='Search....'>"; 

    CodigoHtmlTablaPedidos += "<span  class='input-group-text' style='border-style:  outset; border-width: 3px; border-color:mediumturquoise;   border-radius: 8px; '  id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPedidos += "</div>";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-info table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>Núm_Compra</th>";
    CodigoHtmlTablaPedidos += "<th>Artículo</th>";
    CodigoHtmlTablaPedidos += "<th>Existencia</th>";
    CodigoHtmlTablaPedidos += "<th>Coste</th>";
    CodigoHtmlTablaPedidos += "<th>Fecha de Ingreso</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaPedidos += "<tr>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].NoCompra + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Articulo + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].ExitenciaActual + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Coste + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].FechaDeIngreso + "</td>";

        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>";
    CodigoHtmlTablaPedidos += "</table>";
    document.getElementById("tablaCompras").innerHTML = CodigoHtmlTablaPedidos;
}





//------obtiene los datos de las consultas para llenar los combobox-----------

function LlenarCMBImpuesto() {
    $.get("/GLOBAL/BDImpuesto", function (data) {
        llenarCombo(data, document.getElementById("cmbImpuesto"));
    });
}


function LlenarCMBArticulo() {
    $.get("/GLOBAL/BDArticulos", function (data) {
        llenarCombo(data, document.getElementById("cmbArticulo"));
    });
}



function LlenarCMBProveedor() {
    $.get("/GLOBAL/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });
}


function LlenarCMBUnidades() {
    $.get("/GLOBAL/BDUnidadesMedida", function (data) {
        llenarCombo(data, document.getElementById("cmbUnidad"));
    });
}

//----------------funcion general para llenar los select------------
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}




////------------------Crea el combobox de proveedores por id de artículo--------------------------
//function LlenarCMBProveedores(id) {
//    $.get("/Compra/ConsultaProveedorxArticulo/?IdPro=" + id, function (data) {
//        llenarComboProveedor(data, document.getElementById("cmbProveedor"));
//    });
//}
////----------------funcion para llenar el select de proveedores deacuerdo al artículo------------
//function llenarComboProveedor(data, control) {
//    var contenido = "";
//    contenido += "<option value='0'>--Seleccione--</option>";

//    let proveedor = data.proveedor;
//    let Arrayproveedor= proveedor.split('#');


//    for (var i = 0; i < Arrayproveedor.length; i++) {
//        contenido += "<option value='" + Arrayproveedor[i] + "'>" + Arrayproveedor[i] + "</option>";
//    }
//    control.innerHTML = contenido;
//}


