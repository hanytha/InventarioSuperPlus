﻿LlenarCMBPrin();
BloquearCTRL();
LlenarCMBCompra();
CrearExistenciasAlmacen();
function CrearExistenciasAlmacen() {
    $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacenes", function (Data) {
        CrearTablaExistenciasAlmacen(Data);
    }
    );
}
function CrearTablaExistenciasAlmacen(Data) {
    var CodigoHtmlExistenciasAlmacen = "";
    CodigoHtmlExistenciasAlmacen += "<div class='input-group mb-3 float-right '>";
    CodigoHtmlExistenciasAlmacen += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>"
    CodigoHtmlExistenciasAlmacen += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlExistenciasAlmacen += "</div>";
    CodigoHtmlExistenciasAlmacen += "<div class='table-responsive'>";
    CodigoHtmlExistenciasAlmacen += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlExistenciasAlmacen += "<thead>";
    CodigoHtmlExistenciasAlmacen += "<tr>";
    CodigoHtmlExistenciasAlmacen += "<th>Número de pedido</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Fecha</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Operación</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Artículo</th>";
    CodigoHtmlExistenciasAlmacen += "</tr>";
    CodigoHtmlExistenciasAlmacen += "</thead>";
    CodigoHtmlExistenciasAlmacen += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlExistenciasAlmacen += "<tr>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].NoPedido + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].FechaDeIngreso + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].TipoDeOperacion + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].NombreEmpresa + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>";
         //CodigoHtmlExistenciasAlmacen += "<button class='btn btn-danger' onclick='EliminarExistenciasG(" + Data[i].IdArticulos + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHtmlExistenciasAlmacen += "</td>";
        CodigoHtmlExistenciasAlmacen += "</tr>";
    }
    CodigoHtmlExistenciasAlmacen += "</tbody>";
    CodigoHtmlExistenciasAlmacen += "</table>";
    document.getElementById("TablaExistencia").innerHTML = CodigoHtmlExistenciasAlmacen;
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
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
//Guarda los cambios y altas de las áreas
function GuardarAlmacen() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdExistenciaAlmacenG = sessionStorage.getItem('IdExistenciaAlmacenG');
            var NoPedido = document.getElementById("TxtNumCompra").value;
            var IdArticulo = document.getElementById("cmbArticulo").value;
            var TempArticulo = document.getElementById("cmbArticulo");
            var NombreEmpresa = TempArticulo.options[TempArticulo.selectedIndex].text;
            //var ExitenciaInicial = document.getElementById("TxtExistenciaInicial").value;
            var ExitenciaActual = document.getElementById("TxtExistenciaActual").value;
            var TipoDeOperacion = document.getElementById("TxtTipoOperacion").value;
            //var IdCompra = document.getElementById("cmbCompra").value;
            var FechaDeIngreso = document.getElementById("TxtFechaSistema").value;
            //var Coste = document.getElementById("TxtCosto").value;
            var IdAsignacion = document.getElementById("cmbAsignacion").value;
            var IdProveedor = document.getElementById("cmbProveedor").value;
            var TempProveedor = document.getElementById("cmbProveedor");
            var Proveedor = TempProveedor.options[TempProveedor.selectedIndex].text;
            var IdSitio = document.getElementById("cmbSitio").value;
            var frm = new FormData();
            frm.append("IdExistenciaAlmacenG", IdExistenciaAlmacenG);
            frm.append("NoPedido", NoPedido);
            //frm.append("ExitenciaInicial", ExitenciaInicial);
            frm.append("ExitenciaActual", ExitenciaActual);
            frm.append("FechaDeIngreso", FechaDeIngreso);
            frm.append("TipoDeOperacion", TipoDeOperacion);
            //frm.append("IdCompra", IdCompra);
            //frm.append("Coste", Coste);
            frm.append("IdAsignacion", IdAsignacion);
            frm.append("IdProveedor", IdProveedor);
            frm.append("Proveedor", Proveedor);
            frm.append("IdSitio", IdSitio);
            frm.append("IdArticulo", IdArticulo);
            frm.append("NombreEmpresa", NombreEmpresa);
            //frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/ExistenciaAlmacen/GuardarAlmacen",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        Swal.fire(
                            '',
                            'Ocurrió un error',
                            'danger'
                        )
                    }
                    else if (data == -1) {
                        Swal.fire(
                            '',
                            'Ya existe el proveedor',
                            'warning'
                        )
                    }
                    else {
                        Swal.fire(
                            '¡GUARDADO!',
                            'Se guardó correctamente.',
                            'success'
                        )
                        CrearExistenciasAlmacen();
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
////"Elimina" la Existencia cambia el Estatus
//function EliminarExistenciasG(id) {
//    if (confirm("¿Desea eliminar el registro?") == 1) {

//        $.get("/ExistenciaAlmacen/EliminarAlmacen/?Id=" + id, function (DatoExistecia) {
//            if (DatoExistecia == 1) {
//                alert("Se elimino correctamente");
//                CrearExistenciasAlmacen();
//            } else {
//                alert("Ocurrio un error");
//            }
//        });
//    }
//}
function LlenarCMBCompra() {
    //$.get("/GLOBAL/BDCompras", function (data) {
    //    llenarCombo(data, document.getElementById("cmbCompra"));
    //});
    //funcion general para llenar los select
    function llenarCombo(data, control) {
        var contenido = "";
        contenido += "<option value='0'>--Seleccione--</option>";
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
        }
        control.innerHTML = contenido;
    }
}
var Asigna = document.getElementById("cmbAsignacion");
Asigna.addEventListener("change", function () {
    Sitio(Asigna.value, 0);
});
//(SITIO)Opciones según la selección
function Sitio(IDAsignacion, IDSitio) {
    //Mostrar la opcion oficina al seleccionar la opcion 3(Oficina)
    if (IDAsignacion == 1) {
        $.get("/GLOBAL/Areas", function (DatosDepartamento) {
            if (DatosDepartamento.length !== 0) {
                llenarCombo(DatosDepartamento, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
    //Mostrar todas las tiendas registradas al seleccionar la opcion 1(Tienda)
    else if (IDAsignacion == 2) {
        $.get("/GLOBAL/BDTiendaSuper", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }
}
function LlenarCMBPrin() {
    $.get("/GLOBAL/BDCompras", function (data) {
        llenarCombo(data, document.getElementById("cmbCompra"));
    });
    $.get("/GLOBAL/BDProveedorExist", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"), true);
    });
}
var IDP = document.getElementById("cmbProveedor");
IDP.addEventListener("change", function () {
    $.get("/GLOBAL/BDArtEx/?IDP=" + IDP.value, function (data) {
        llenarCombo(data, document.getElementById("cmbArticulo"));
    });
});
//funcion general para llenar los select
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
