﻿LlenarCMBPRTienda();
CrearAcordeonSuperviciones();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonSuperviciones() {
    $.get("/Supervision/ConsultaSuperviciones", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonSuperviciones(Data, document.getElementById("accordion"));
    });
}
function AcordeonSuperviciones(Data, CtrlSuper) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdSupervision + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdSupervision + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdSupervision + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].TipoSupervicion + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdSupervision + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Tienda: </strong>" + Data[i].Tienda + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre Usuario: </strong>" + Data[i].nombreUsuario + "</div>";
        CodigoHTMLAreas += "</div>";

        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdSupervision + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarSupervicion(" + Data[i].IdSupervision + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlSuper.innerHTML = CodigoHTMLAreas;
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
        sessionStorage.setItem('IDSuper', '0');

    }
    else {

        $.get("/Supervision/ConsultaSupervicion/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDSuper', Data[0].IdSupervision);
            document.getElementById("TxtNomSuper").value = Data[0].TipoSupervicion;
            document.getElementById("TxtNomUser").value = Data[0].nombreUsuario;
            document.getElementById("cmbTienda").value = Data[0].IdTienda;

        });
    }
}




//Guarda los cambios y altas de las áreas
function GuardarBonificacion() {
    if (CamposObligatorios("obligatorio") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdSupervision = sessionStorage.getItem('IDSuper');
            var TipoSupervicion = document.getElementById("TxtNomSuper").value;
            var nombreUsuario = document.getElementById("TxtNomUser").value;
            var IdTienda = document.getElementById("cmbTienda").value;
            var TempEdo = document.getElementById("cmbTienda");
            var Tienda = TempEdo.options[TempEdo.selectedIndex].text;

            var frm = new FormData();
            frm.append("IdSupervision", IdSupervision);
            frm.append("TipoSupervicion", TipoSupervicion);
            frm.append("nombreUsuario", nombreUsuario);
            frm.append("IdTienda", IdTienda);
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
                        alert("Ya existe el proveedor");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        CrearAcordeonSuperviciones();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
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
function EliminarSupervicion(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Supervision/EliminarSupervicion/?Id=" + id, function (DatoSupervicion) {
            if (DatoSupervicion == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonSuperviciones();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


function LlenarCMBPRTienda() {
    $.get("/GLOBAL/BDTienda", function (data) {
        llenarCombo(data, document.getElementById("cmbTienda"));
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


}
