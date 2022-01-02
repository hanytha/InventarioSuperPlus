BloquearCTRL();
MostrarPerfiles();
function MostrarPerfiles() {
    $.get("/Configuracion/BDPerfiles", function (Data) {
        CrearTablaPerfiles(Data);
    }
    );
}
function CrearTablaPerfiles(Data) {
    var CodigoHtmlTablaPerfiles = "";
    CodigoHtmlTablaPerfiles += "<div class='input-group mb-3 float-right '>";
    CodigoHtmlTablaPerfiles += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>"
    CodigoHtmlTablaPerfiles += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPerfiles += "</div>";
    CodigoHtmlTablaPerfiles += "<div class='table-responsive'>";
    CodigoHtmlTablaPerfiles += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaPerfiles += "<thead>";
    CodigoHtmlTablaPerfiles += "<tr>";
    CodigoHtmlTablaPerfiles += "<th>Perfil</th>";
    CodigoHtmlTablaPerfiles += "<th>Nivel</th>";
    //CodigoHtmlTablaPerfiles += "<th>Permisos</th>";
    CodigoHtmlTablaPerfiles += "<th>Comentarios</th>";
    CodigoHtmlTablaPerfiles += "<th>Opciones</th>";
    CodigoHtmlTablaPerfiles += "</tr>";
    CodigoHtmlTablaPerfiles += "</thead>";
    CodigoHtmlTablaPerfiles += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaPerfiles += "<tr>";
        CodigoHtmlTablaPerfiles += "<td>" + Data[i].Nombre + "</td>";
        CodigoHtmlTablaPerfiles += "<td>" + Data[i].Nivel + "</td>";
        //CodigoHtmlTablaPerfiles += "<td>" + Data[i].Permisos + "</td>";
        CodigoHtmlTablaPerfiles += "<td>" + Data[i].Comentarios + "</td>";
        CodigoHtmlTablaPerfiles += "<td>";
        CodigoHtmlTablaPerfiles += "<button class='btn btn-primary' onclick='AModalPerfil(" + Data[i].ID + ")' data-toggle='modal' data-target='#ModalSystem_Perfil'><i class='fas fa-edit'></i></button> ";
        CodigoHtmlTablaPerfiles += "<button class='btn btn-danger' onclick='EliminarPerfil(" + Data[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHtmlTablaPerfiles += "</td>";
        CodigoHtmlTablaPerfiles += "</tr>";
    }
    CodigoHtmlTablaPerfiles += "</tbody>";
    CodigoHtmlTablaPerfiles += "</table>";
    document.getElementById("Paginas_Perfiles").innerHTML = CodigoHtmlTablaPerfiles;
}
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
//limpia y llenas los campor del modal si es para la edición
function AModalPerfil(ID) {
    var CtrlObligatorio = document.getElementsByClassName("PerfilObligatorio");
    MostrarPaginasPerfiles();
    Limpiar();
    for (var i = 0; i < CtrlObligatorio.length; i++) {
        CtrlObligatorio[i].classList.remove("border-danger");
    }
    if (ID == 0) {
        sessionStorage.setItem('IdPfl', '0');
    }
    else {
        $.get("/Configuracion/BDPerfil/?IDPerfil=" + ID, function (DatosPerfil) {
            //document.getElementById("TxtIDPerfil").value = DatosPerfil[0].ID;
            sessionStorage.setItem('IdPfl', DatosPerfil[0].ID);
            document.getElementById("TxtNivel").value = DatosPerfil[0].Nivel;
            document.getElementById("TxtPerfil").value = DatosPerfil[0].Nombre;
            //--------
            var activar = DatosPerfil[0].Permisos.split('#');
            var ChevPermisos = document.getElementsByClassName("checkbox-area");
            for (let j = 0; j < activar.length; j++) {
                for (let i = 0; i < ChevPermisos.length; i++) {
                    if (ChevPermisos[i].id == activar[j]) {
                        ChevPermisos[i].checked = true;
                        break;
                    }
                }
            }
            document.getElementById("TxtComentarios").value = DatosPerfil[0].Comentarios;
        });
    }
}
//Guarda los cambios o la nuevas áreas
function GuardarPerfil() {
    if (ObligatoriosPerfil() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            //var IDPerfil = document.getElementById("TxtIDPerfil").value;
            var IdPerfilDeUsuario = sessionStorage.getItem('IdPfl');
            var Nivel = document.getElementById("TxtNivel").value;
            var Perfil = document.getElementById("TxtPerfil").value;
            var ChevPermisos = document.getElementsByClassName("checkbox-area");
            let seleccionados = "";
            for (let i = 0; i < ChevPermisos.length; i++) {
                if (ChevPermisos[i].checked == true) {
                    seleccionados += ChevPermisos[i].id;
                    seleccionados += "#";
                }
            }
            var Permisos = seleccionados.substring(0, seleccionados.length - 1);
            var Comentarios = document.getElementById("TxtComentarios").value;
            var frm = new FormData();
            frm.append("IdPerfilDeUsuario", IdPerfilDeUsuario);
            frm.append("Perfil", Perfil);
            frm.append("Nivel", Nivel);
            frm.append("Permisos", Permisos);
            frm.append("Comentarios", Comentarios);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Configuracion/GuardarPerfil",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrió un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el perfil");
                    }
                    else {
                        alert("Se guardaron los datos correctamente.");
                        MostrarPerfiles();
                        document.getElementById("btnCancelarPerfil").click();
                    }
                }
            });
        }
    }
}
//verifica que los campos obligatorios tengas datos
function ObligatoriosPerfil() {
    let exito = true;
    let CtrlObligatorio = document.getElementsByClassName("PerfilObligatorio");
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
//"Elimina" el área cambia el Estatus
function EliminarPerfil(id) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Configuracion/EliminarPerfil/?IdPerfil=" + id, function (Perfil) {
            if (Perfil == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se eliminó correctamente.',
                    'success'
                )
                MostrarPerfiles();
            } else {
                alert("Ocurrió un error");
            }
        });
    }
}
//---
function Limpiar() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}
//MostrarPaginasPerfiles();
function MostrarPaginasPerfiles() {
    $.get("/Configuracion/BDPaginas", function (InfPaginas) {
        var CodigoHtmlTablaPagina = "";
        CodigoHtmlTablaPagina += "<div class='row'>";
        for (var i = 0; i < InfPaginas.length; i++) {
            CodigoHtmlTablaPagina += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            CodigoHtmlTablaPagina += "<input type='checkbox' class='checkbox-area' id='" + InfPaginas[i].ID + "' ><span class='help-block text-muted small-font'>" + InfPaginas[i].Descripcion + "</span>";
            CodigoHtmlTablaPagina += "</div>";
        }
        CodigoHtmlTablaPagina += "</div>";
        document.getElementById("TblPaginas").innerHTML = CodigoHtmlTablaPagina;
    });
}
