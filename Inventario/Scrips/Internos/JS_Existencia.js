﻿LlenarCMBImpuesto();
LlenarCMBArticulo();
LlenarCMBProveedores();
LlenarCMBUnidades();

ConsultaCompras();
function ConsultaCompras() {
    $.get("/Compra/ConsultasCompras", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaCompras = "";
    CodigoHtmlTablaCompras += "<div class='input-group mb-3'>";
    CodigoHtmlTablaCompras += "<input  class='form-control col-md-3 light-table-filter' data-table='order-table' type='text' placeholder='Search..'>";
    CodigoHtmlTablaCompras += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaCompras += "</div>";
    CodigoHtmlTablaCompras += "<div class='table-responsive'>";
    CodigoHtmlTablaCompras += "<table class='table-info table table-bordered order-table'>";
    CodigoHtmlTablaCompras += "<thead>";
    CodigoHtmlTablaCompras += "<tr>";
    CodigoHtmlTablaCompras += "<th>Número_Compra</th>";
    CodigoHtmlTablaCompras += "<th>Fecha De Ingreso</th>";
    CodigoHtmlTablaCompras += "<th>Coste</th>";
    CodigoHtmlTablaCompras += "<th>Unidad</th>";
    CodigoHtmlTablaCompras += "<th>Artículo</th>";
    CodigoHtmlTablaCompras += "<th>Detalle Compra</th>";
    CodigoHtmlTablaCompras += "</tr>";
    CodigoHtmlTablaCompras += "</thead>";
    CodigoHtmlTablaCompras += "<tbody>";
    for (var i = 0; i < Data.length; i++) {

        CodigoHtmlTablaCompras += "<tr>"
        CodigoHtmlTablaCompras += "<td>" + Data[i].NoCompra + "</td>"
        CodigoHtmlTablaCompras += "<td>" + Data[i].FechaDeIngreso + "</td>"
        CodigoHtmlTablaCompras += "<td>" + Data[i].Coste + "</td>"
        CodigoHtmlTablaCompras += "<td>" + Data[i].Unidad + "</td>"
        CodigoHtmlTablaCompras += "<td>" + Data[i].Articulo + "</td>"
        CodigoHtmlTablaCompras += "<td><button class='btn btn-primary'  data-title='Ver pedido' onclick='VerPedido(" + Data[i].NumeroPedido + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='far fa-eye'></i></i></button></td>";
        CodigoHtmlTablaCompras += "</tr>";
    }
    CodigoHtmlTablaCompras += "</tbody>";
    CodigoHtmlTablaCompras += "</table>";
    CodigoHtmlTablaCompras += "</div>";
    document.getElementById("TablaCompras").innerHTML = CodigoHtmlTablaCompras;
}


//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
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
            document.getElementById("TxtFechaFinal").value = Data[0].FechaFinal;
            document.getElementById("TxtExitenciaInicial").value = Data[0].ExitenciaInicial;
            document.getElementById("TxtExitenciaActual").value = Data[0].ExitenciaActual;
            document.getElementById("TxtCoste").value = Data[0].Coste;
            document.getElementById("cmbUnidad").value = Data[0].IdUnidadDeMedida;
            document.getElementById("cmbImpuesto").value = Data[0].IdImpuesto;
   
        });
    }
}



//limpiar campos
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


//Guarda los cambios y altas de las áreas
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
            var FechaFinal = document.getElementById("TxtFechaFinal").value;
            var ExitenciaInicial = document.getElementById("TxtExitenciaInicial").value;
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
            frm.append("FechaFinal", FechaFinal);
            frm.append("ExitenciaInicial", ExitenciaInicial);
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
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el número de compra");
                    }
                    else {
                        alert("Se ejecuto correctamente");

                        CrearAcordeonExistencia();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}

//marca los campos obligatorios
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



//"Elimina" el área cambia el Estatus
function EliminarCompra(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Compra/EliminarCompra/?Id=" + id, function (DatoTienda) {
            if (DatoTienda == 1) {
                alert("Se elimino correctamente");

                CrearAcordeonExistencia();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


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

function LlenarCMBProveedores() {
    $.get("/GLOBAL/BDPro", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });
}

function LlenarCMBUnidades() {
    $.get("/GLOBAL/BDUnidadesMedida", function (data) {
        llenarCombo(data, document.getElementById("cmbUnidad"));
    });
}

    //funcion general para llenar los select
    function llenarCombo(data, control) {
        var contenido = "";
        contenido += "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
        }
        control.innerHTML = contenido;
    }


