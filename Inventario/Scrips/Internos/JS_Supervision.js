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
            alert("No hay datos que mostrar Supervisión");
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
    CodigoHtmlTablaSuperviciones += "<div class='input-group mb-3 float-right '>";
    CodigoHtmlTablaSuperviciones += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>"
    CodigoHtmlTablaSuperviciones += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaSuperviciones += "</div>";
    CodigoHtmlTablaSuperviciones += "<div class='table-responsive'>";
    CodigoHtmlTablaSuperviciones += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaSuperviciones += "<thead>";
    CodigoHtmlTablaSuperviciones += "<tr>";
    CodigoHtmlTablaSuperviciones += "<th>Tipo de Supervicion</th>";
    CodigoHtmlTablaSuperviciones += "<th>Nombre del Usuario</th>";
    CodigoHtmlTablaSuperviciones += "<th>Tienda</th>";
    CodigoHtmlTablaSuperviciones += "<th>Opciones</th>";
    CodigoHtmlTablaSuperviciones += "</tr>";
    CodigoHtmlTablaSuperviciones += "</thead>";
    CodigoHtmlTablaSuperviciones += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaSuperviciones += "<tr>";
        CodigoHtmlTablaSuperviciones += "<td>" + Data[i].TipoSupervicion + "</td>";
        CodigoHtmlTablaSuperviciones += "<td>" + Data[i].nombreUsuario + "</td>";
        CodigoHtmlTablaSuperviciones += "<td>" + Data[i].Tienda + "</td>";
        CodigoHtmlTablaSuperviciones += "<td>";
        CodigoHtmlTablaSuperviciones += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdSupervision + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHtmlTablaSuperviciones += "<button class='btn btn-danger' onclick='EliminarSupervicion(" + Data[i].IdSupervision + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHtmlTablaSuperviciones += "</td>";
        CodigoHtmlTablaSuperviciones += "</tr>";
    }
    CodigoHtmlTablaSuperviciones += "</tbody>";
    CodigoHtmlTablaSuperviciones += "</table>";
    document.getElementById("tablaSupervicion").innerHTML = CodigoHtmlTablaSuperviciones;
}

function abrirModal(id) {
    MostrarTiendas();
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDSuper', '0');
    }
    else {
        $.get("/Supervision/ConsultaSupervicion/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDSuper', Data[0].IdSupervision);
            document.getElementById("TxtNomSuper").value = Data[0].TipoSupervicion;
            document.getElementById("cmbEncargado").value = Data[0].IdUsuario;
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
                            Swal.fire(
                                '',
                                'Ocurrió un error',
                                'danger'
                            )
                        }
                        else if (data == -1) {
                            Swal.fire(
                                '',
                                'Ya existe la supervición',
                                'warning'
                            )
                        }
                        else {
                            Swal.fire(
                                '¡GUARDADO!',
                                'Se guardó correctamente.',
                                'success'
                            )
                            
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
        if (controlesObligatorio[i].value == "" || controlesObligatorio[i].value == "0") {
            exito = false;
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");
        }
    }
    return exito;
}
function EliminarSupervicion(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Supervision/EliminarSupervicion/?Id=" + id, function (DatoSupervicion) {
            if (DatoSupervicion == 1) {
                Swal.fire(
                    'Deleted!',
                    'Se eliminó correctamente.',
                    'success'
                )
                ConsultaSuperviciones();
            } else {
                Swal.fire(
                    '',
                    'Ocurrìó un error',
                    'danger'
                )
            }
        });
    }
}
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
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
