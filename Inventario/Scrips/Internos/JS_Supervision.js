﻿//LlenarCMBPSupervicion();
ConsultaSuperviciones();



function ConsultaSuperviciones() {

    $.get("/Usuario/BDUsrPfl/?IDPerfil=" + 9, function (data) {
        if (data.length != 0) {
            llenarCombo(data, document.getElementById("cmbEncargado"));
        }
        else {
            alert("No hay datos que mostrar Supervisores");
        }
    });

    $.get("/Supervision/ConsultaSuperviciones", function (Data) {
        if (Data.length != 0) {
            CrearTablaSuperviciones(Data);
        }
        else {
            alert("No hay datos que mostrar Supervision");
        }
    });


    $.get("/GLOBAL/BDTiendas", function (InfSucursales) {
        var TablaSucursales = "";
        TablaSucursales += "<div class='row'>";
        for (var i = 0; i < InfSucursales.length; i++) {
            TablaSucursales += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaSucursales += "<input type='checkbox' class='checkbox-Sucursal' id='" + InfSucursales[i].ID + "' ><span class='help-block text-muted small-font'>" + InfSucursales[i].Nombre + "</span>";
            TablaSucursales += "</div>";
        }
        TablaSucursales += "</div>";
        document.getElementById("divPagina").innerHTML = TablaSucursales;
    });
}





function CrearTablaSuperviciones(Data) {
    var CodigoHtmlTablaSuperviciones = "";
    CodigoHtmlTablaSuperviciones += "<table id='tablas' class='table table table-sm' >";
    CodigoHtmlTablaSuperviciones += " <thead class='thead-dark'><tr><th>Tipo de Supervisión</th><th>nombre del Usuario</th><th>Tienda</th><th>Acción</thead>";
    CodigoHtmlTablaSuperviciones += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaSuperviciones += "<tr>";
        CodigoHtmlTablaSuperviciones += "<td>" + Data[i].TipoSupervicion + "</td>";
        CodigoHtmlTablaSuperviciones += "<td>" + Data[i].nombreUsuario + "</td>";
        CodigoHtmlTablaSuperviciones += "<td>" + Data[i].Tienda + "</td>";

        CodigoHtmlTablaSuperviciones += "<td>";
        CodigoHtmlTablaSuperviciones += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdSupervision + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaSuperviciones += "<button class='btn btn-danger' onclick='EliminarSupervicion(" + Data[i].IdSupervision + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaSuperviciones += "</td>";
        CodigoHtmlTablaSuperviciones += "</tr>";
    }
    CodigoHtmlTablaSuperviciones += "</tbody>";
    CodigoHtmlTablaSuperviciones += "</table>";
    document.getElementById("tablaSupervicion").innerHTML = CodigoHtmlTablaSuperviciones;
}



//CrearAcordeonSuperviciones();
////Crea el acordeón e inserta (los registros de la base de datos)
//function CrearAcordeonSuperviciones() {
//    $.get("/Supervision/ConsultaSuperviciones", function (Data) {
//        //Accordeon(DatosProveedor, document.getElementById("accordion"));
//        AcordeonSuperviciones(Data, document.getElementById("accordion"));
//    });
//}
//function AcordeonSuperviciones(Data, CtrlSuper) {
//    var CodigoHTMLAreas = "";
//    for (var i = 0; i < Data.length; i++) {
//        if (i < 1) {
//            CodigoHTMLAreas += "<div class='card m-b-0'>";
//        }
//        else {
//            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
//        }
//        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdSupervision + "'>";
//        CodigoHTMLAreas += "<h5 class='mb-0'>";
//        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdSupervision + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdSupervision + "' class='collapsed'>";
//        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
//        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
//        CodigoHTMLAreas += "<span >" + Data[i].TipoSupervicion + "</span>";
//        CodigoHTMLAreas += "</a>";
//        CodigoHTMLAreas += "</h5>";
//        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
//        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdSupervision + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
//        CodigoHTMLAreas += "<div class='card-body'>";
//        CodigoHTMLAreas += "<div class='row'>";
//        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Tienda: </strong>" + Data[i].Tienda + "</div>";
//        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre Usuario: </strong>" + Data[i].nombreUsuario + "</div>";
//        CodigoHTMLAreas += "</div>";

//        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
//        CodigoHTMLAreas += "</div>";
//        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
//        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdSupervision + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
//        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarSupervicion(" + Data[i].IdSupervision + ",this)' ><i class='fas fa-eraser'></i></button>";
//        CodigoHTMLAreas += "</div>";
//        CodigoHTMLAreas += "</div>";
//        CodigoHTMLAreas += "</div>";
//        CodigoHTMLAreas += "</div>";
//        CodigoHTMLAreas += "</div>";
//        CodigoHTMLAreas += "</div>";
//    }
//    CtrlSuper.innerHTML = CodigoHTMLAreas;
//}



//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    MostrarTiendas();
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("border-danger"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDSuper', '0');

    }
    else {

        $.get("/Supervision/ConsultaSupervicion/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDSuper', Data[0].IdSupervision);
            document.getElementById("TxtNomSuper").value = Data[0].TipoSupervicion;
            //document.getElementById("TxtNomUser").value = Data[0].nombreUsuario;
            document.getElementById("cmbEncargado").value = Data[0].IdUsuario;
         
            //document.getElementById("divPagina").value = Data[0].Tienda;
            //Se recorre el checkbox de permisos, separando las opciones concatenadas y se activan las casillas guardados
            var activar = Data[0].Tienda.split('#');
            var ChevPermisos = document.getElementsByClassName("checkbox-area");
            for (let j = 0; j < activar.length; j++) {
                for (let i = 0; i < ChevPermisos.length; i++) {
                    if (ChevPermisos[i].id == activar[j]) {
                        ChevPermisos[i].checked = true;
                        break;
                    }
                }
            }
            //document.getElementById("TxtComentarios").value = Data[0].Comentarios;
        });
    }
}




//Guarda los cambios y altas de las áreas
function GuardarSupervision() {

    if (CamposObligatorios("Supervision") == true) {
        var ChevPermisos = document.getElementsByClassName("checkbox-area");
        let seleccionados = "";
        for (let i = 0; i < ChevPermisos.length; i++) {
            if (ChevPermisos[i].checked == true) {
                seleccionados += ChevPermisos[i].id;
                seleccionados += "#";
            }
        }
        if (seleccionados == "") {

            alert("Rellene el checkbox");
        } else {
            if (confirm("¿Desea aplicar los cambios?") == 1) {
                var IdSupervision = sessionStorage.getItem('IDSuper');
                var TipoSupervicion = document.getElementById("TxtNomSuper").value;
                //var nombreUsuario = document.getElementById("TxtNomUser").value;
                var IdUsuario = document.getElementById("cmbEncargado").value;
                var temUser = document.getElementById("cmbEncargado");
                var nombreUsuario = temUser.options[temUser.selectedIndex].text;
                var ChevPermisos = document.getElementsByClassName("checkbox-area");
                let seleccionados = "";
                for (let i = 0; i < ChevPermisos.length; i++) {
                    if (ChevPermisos[i].checked == true) {
                        seleccionados += ChevPermisos[i].id;
                        seleccionados += "#";
                    }
                }

                var Tienda = seleccionados.substring(0, seleccionados.length - 1);

                var frm = new FormData();
                frm.append("IdSupervision", IdSupervision);
                frm.append("TipoSupervicion", TipoSupervicion);
                frm.append("IdUsuario", IdUsuario);
                frm.append("nombreUsuario", nombreUsuario);

                frm.append("Tienda", Tienda);

                frm.append("Estatus", 1);
                $.ajax({
                    type: "POST",
                    url: "/Supervision/GuardarSupervicion",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrio un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe la supervición");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            ConsultaSuperviciones();
                            document.getElementById("btnCancelar").click();
                        }
                    }
                });
            }
        }
    }
}


//limpiar campos
function LimpiarCampos() {
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var ChevPermisos = document.getElementsByClassName("checkbox-Sucursal");
    for (let i = 0; i < ChevPermisos.length; i++) {
        ChevPermisos[i].checked = false;
    }
    var controlesSLT = document.getElementsByClassName("limpiarSelect");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
    }
    /*Bloquear controles */
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

function Obligatorios(NoClase) {
    let exito = true;
    let CtrlObligatorio = document.getElementsByClassName(NoClase);
    for (let i = 0; i < CtrlObligatorio.length; i++) {
        if (CtrlObligatorio[i].value == "") {
            exito = false;
            CtrlObligatorio[i].classList.add("border-danger");
        }
        else {
            CtrlObligatorio[i].classList.remove("border-danger");
        }
    }
    return exito;
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



//function Obligatorios(NoClase) {
//    let exito = true;
//    let CtrlObligatorio = document.getElementsByClassName(NoClase);
//    for (let i = 0; i < CtrlObligatorio.length; i++) {
//        if (CtrlObligatorio[i].value == "") {
//            exito = false;
//            CtrlObligatorio[i].classList.add("border-danger");
//        }
//        else {
//            CtrlObligatorio[i].classList.remove("border-danger");
//        }
//    }
//    return exito;
//}
//function Limpiar() {
//    var controlesTXT = document.getElementsByClassName("limpiar");
//    for (var i = 0; i < controlesTXT.length; i++) {
//        controlesTXT[i].value = "";
//    }
//    var ChevPermisos = document.getElementsByClassName("checkbox-Sucursal");
//    for (let i = 0; i < ChevPermisos.length; i++) {
//        ChevPermisos[i].checked = false;
//    }
//    var controlesCMB = document.getElementsByClassName("SelectCLS");
//    for (var i = 0; i < controlesCMB.length; i++) {
//        document.getElementById(controlesCMB[i].id).value = 0;
//    }
//    /*Bloquear controles */
//    var CTRL = document.getElementsByClassName("bloquear");
//    for (var i = 0; i < CTRL.length; i++) {
//        $("#" + CTRL[i].id).attr('disabled', 'disabled');
//    }
//}


function EliminarSupervicion(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Supervision/EliminarSupervicion/?Id=" + id, function (DatoSupervicion) {
            if (DatoSupervicion == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se elimino correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                ConsultaSuperviciones();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}
//Función para visualizar las tiendas seleccionadas al presionar el botón modificar
function MostrarTiendas() {
    $.get("/GLOBAL/BDTienda", function (Tiendas) {
        var CodHTML = "";
        CodHTML += "<div class='row'>";
        for (var i = 0; i < Tiendas.length; i++) {
            CodHTML += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            CodHTML += "<input type='checkbox' class = 'checkbox-area' id='" + Tiendas[i].ID + "' ><span class='help-block text-muted small-font'>" + Tiendas[i].Nombre + "</span>";
            CodHTML += "</div>";
        }
        CodHTML += "</div>";
        document.getElementById("divPagina").innerHTML = CodHTML;
    });
}



//Funcion para llenar los combos
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}


//function LlenarCMBPSupervicion() {
//    $.get("/Usuario/BDUsrPfl", function (data) {
//        llenarCombo(data, document.getElementById("cmbEncargado"));
//    });

//    //funcion general para llenar los select
//    function llenarCombo(data, control) {
//        var contenido = "";
//        contenido += "<option value='0'>--Seleccione--</option>";

//        for (var i = 0; i < data.length; i++) {
//            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
//        }
//        control.innerHTML = contenido;
//    }


//}


