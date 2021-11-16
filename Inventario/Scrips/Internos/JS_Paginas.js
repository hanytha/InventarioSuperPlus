

CrearAcordeonPagina();
function CrearAcordeonPagina() {
    $.get("/Pagina/ConsultaPaginas", function (IncidenciasArea) {
        AcordeonPagina(IncidenciasArea, document.getElementById("accordion"));
    });
}

//Crea la información basica de las insidencias
function AcordeonPagina(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].IdPagina + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].IdPagina + ");' data-toggle='collapse' data-target='#collapse" + data[i].IdPagina + "' aria-expanded='false' aria-controls='collapse" + data[i].IdPagina + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + data[i].Mensaje + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].IdPagina + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Apellido paterno: </strong>" + data[i].Accion + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Apellido Materno: </strong>" + data[i].Controlador + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'></div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + data[i].Icono + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Correo: </strong>" + data[i].Descripcion + "</div>";
        CodHtml += "</div>";
        CodHtml += "</div >";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModalPagina(" + data[i].IdPagina + "," + data[i].IdPagina + ")' data-toggle='modal' data-target='#ModalPagina'><i class='fas fa-edit'></i></button> ";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarPagina(" + data[i].IdPagina + "," + data[i].IdPagina + ",this)'><i class='fas fa-eraser'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}

//Limpia la información y carga la informacion del proveedor
function abrirModalPagina(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdPagina', 0);
    }
    else {
        $.get("/Pagina/ConsultaPag/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdPagina', Data[0].IdPagina);     //Variable de sesión
            document.getElementById("TxtAccion").value = Data[0].Accion;
            document.getElementById("TxtMensaje").value = Data[0].Mensaje;
            document.getElementById("TxtControlador").value = Data[0].Controlador;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;
            document.getElementById("TxtIconos").value = Data[0].Icono;
        });
    }
}
//Guarda los cambios y altas de los proveedores
function GuardarPagina() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdPagina = sessionStorage.getItem('IdPagina');
            var Accion = document.getElementById("TxtAccion").value;
            var Mensaje = document.getElementById("TxtMensaje").value;
            var Controlador = document.getElementById("TxtControlador").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;
            // var Padre = document.getElementById("cmbTipo").value;
            var Icono = document.getElementById("TxtIconos").value;
            var frm = new FormData();
            frm.append("IdPagina", IdPagina);
            frm.append("Accion", Accion);
            frm.append("Mensaje", Mensaje);
            frm.append("Controlador", Controlador);
            frm.append("Descripcion", Descripcion);
            frm.append("Icono", Icono);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Pagina/GuardarPagina",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrió un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe la pagina");
                    }
                    else {
                        alert("Se ejecutó correctamente");
                        CrearAcordeonPagina();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}
//limpiar campos
function LimpiarCampos() {
    //Limpiar la casilla de texto
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }//Limpiar el campo de select
    var controlesSLT = document.getElementsByClassName("limpiarSelect");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
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
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");

        }
    }
    return exito;
}
//"Elimina" el área cambia el Estatus
//function EliminarPagina(id) {
//    if (confirm("¿Desea eliminar el registro?") == 1) {

//        $.get("/Pagina/EliminarPagina/?Id=" + id, function (DatoPagina) {
//            if (DatoPagina == 1) {
//                alert("Se elimino correctamente");
//                CrearAcordeonPagina();
//            } else {
//                alert("Ocurrio un error");
//            }
//        });
//    }
//}
function EliminarPagina(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Pagina/EliminarPagina/?Id=" + id, function (DatoPagina) {
            if (DatoPagina == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se eliminó correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                CrearAcordeonPagina();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}
function LlenarCMB() {

    $.get("/Pagina/BDPagina", function (data) {
        llenarCombo(data, document.getElementById("cmbPadre"), true);
    });
}
function llenarComboPaginas(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Mensaje + "</option>";
    }
    control.innerHTML = contenido;
}
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Mensaje + "</option>";
    }
    control.innerHTML = contenido;
}
//Deshabilitar el clic externo para el modal del formulario.
jQuery(document).ready(function () {
    jQuery('[data-toggle="modal"]').each(function () {
        jQuery(this).attr('data-backdrop', 'static');
        jQuery(this).attr('data-keyboard', 'false');
    });
});