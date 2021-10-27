﻿
CrearAcordeonTiposDeMovimiento();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonTiposDeMovimiento() {
    $.get("/TiposDeMovimiento/ConsultaTiposDeMovimientos", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonTiposDeMovimiento(Data, document.getElementById("accordion"));
    });
}
function AcordeonTiposDeMovimiento(Data, CtrlAlmacen) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdMovimientos+ "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdMovimientos + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdMovimientos + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].TipoDeMovimiento + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdMovimientos + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].Descripcion + "</div>";
        CodigoHTMLAreas += "</div>";

        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdMovimientos + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarTipoDeMovimiento(" + Data[i].IdMovimientos + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlAlmacen.innerHTML = CodigoHTMLAreas;
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
        sessionStorage.setItem('IDTDM', '0');
      
    }
    else {

        $.get("/TiposDeMovimiento/ConsultaTipoDeMovimiento/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDTDM', Data[0].IdMovimientos);
            document.getElementById("TxtTipoDeMovimiento").value = Data[0].TipoDeMovimiento;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;



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

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}


//Guarda los cambios y altas de las áreas
function GuardarTipoDeMovimiento() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdMovimientos = sessionStorage.getItem('IDTDM');
            var TipoDeMovimiento = document.getElementById("TxtTipoDeMovimiento").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;

          

            var frm = new FormData();
            frm.append("IdMovimientos", IdMovimientos);
            frm.append("TipoDeMovimiento", TipoDeMovimiento);
            frm.append("Descripcion", Descripcion);

            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/TiposDeMovimiento/GuardarTipoDeMovimiento",
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
                        CrearAcordeonTiposDeMovimiento();
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
function EliminarTipoDeMovimiento(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/TiposDeMovimiento/EliminarTipoDeMovimiento/?Id=" + id, function (DatoMovimiento) {
            if (DatoMovimiento == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonTiposDeMovimiento();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}
