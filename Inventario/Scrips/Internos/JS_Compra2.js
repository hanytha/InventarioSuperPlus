
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
    CodigoHtmlTablaPedidos += "<th>Fecha de Ingreso</th>";
    CodigoHtmlTablaPedidos += "<th>Opciones</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaPedidos += "<tr>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].NoCompra + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Articulo + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].FechaDeIngreso + "</td>";
        CodigoHtmlTablaPedidos += "<td>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-info' style='width: 28px; height: 28px;' onclick='abrirModal(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
   

        CodigoHtmlTablaPedidos += "</td>";
        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>";
    CodigoHtmlTablaPedidos += "</table>";
    document.getElementById("tablaCompras").innerHTML = CodigoHtmlTablaPedidos;
}


//------------Limpia la información y carga la informacion de la compra------------------------
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDExt', '0');

    }
    else {

        $.get("/Compra/ConsultaCompra/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDExt', Data[0].IdCompra);
            document.getElementById("TxtNoCompra").value = Data[0].NoCompra;
            document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("TxtMetodo").value = Data[0].MetodoDePago;
            document.getElementById("TxtFechaDeIngreso").value = Data[0].FechaDeIngreso;
            document.getElementById("TxtPrecioUnitario").value = Data[0].PrecioUnitario;
            document.getElementById("TxtExitenciaActual").value = Data[0].ExitenciaActual;
            document.getElementById("TxtCoste").value = Data[0].Coste;
            document.getElementById("cmbUnidad").value = Data[0].IdUnidadDeMedida;
            document.getElementById("cmbImpuesto").value = Data[0].IdImpuesto;

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


//---------Guarda los cambios y altas de las compras------------------------------------
function GuardarCompra() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdCompra = sessionStorage.getItem('IDExt');
            var NoCompra = document.getElementById("TxtNoCompra").value;

            var IdArticulo = document.getElementById("cmbArticulo").value;
            var TempArt = document.getElementById("cmbArticulo");
            var Articulo = TempArt.options[TempArt.selectedIndex].text;

            var IdProveedor = document.getElementById("cmbProveedor").value;
            var TempPro = document.getElementById("cmbProveedor");
            var Proveedor = TempPro.options[TempPro.selectedIndex].text;

            var MetodoDePago = document.getElementById("TxtMetodo").value;
            var FechaDeIngreso = document.getElementById("TxtFechaDeIngreso").value;
            var PrecioUnitario = document.getElementById("TxtPrecioUnitario").value;
            var ExitenciaActual = document.getElementById("TxtExitenciaActual").value;
            var Coste = document.getElementById("TxtCoste").value;

            var IdUnidadDeMedida = document.getElementById("cmbUnidad").value;
            var TempUni = document.getElementById("cmbUnidad");
            var Unidad = TempUni.options[TempUni.selectedIndex].text;

            var IdImpuesto = document.getElementById("cmbImpuesto").value;
            var TempEdo = document.getElementById("cmbImpuesto");
            var Impuesto = TempEdo.options[TempEdo.selectedIndex].text;

            var frm = new FormData();
            frm.append("IdCompra", IdCompra);
            frm.append("NoCompra", NoCompra);
            frm.append("IdArticulo", IdArticulo);
            frm.append("Articulo", Articulo);
            frm.append("IdProveedor", IdProveedor);
            frm.append("Proveedor", Proveedor);
            frm.append("MetodoDePago", MetodoDePago);
            frm.append("FechaDeIngreso", FechaDeIngreso);
            frm.append("PrecioUnitario", PrecioUnitario);
            frm.append("ExitenciaActual", ExitenciaActual);
            frm.append("Coste", Coste);
            frm.append("IdUnidadDeMedida", IdUnidadDeMedida);
            frm.append("Unidad", Unidad);
            frm.append("IdImpuesto", IdImpuesto);
            frm.append("Impuesto", Impuesto);


            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Compra/GuardarCompra",
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
                        //-----Mensaje de confirmación-----------------------
                        swal("Su compra se guardó exitosamente!", "", "success");

                        ConsultaCompras();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}

//----------marca los campos obligatorios--------------------
function CamposObligatorios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
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


