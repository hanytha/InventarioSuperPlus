CrearAcordeonSubAreas();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonSubAreas() {
    $.get("/Subarea/ConsultaSubAreas", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonSubAreas(Data, document.getElementById("accordion"));
    });
}
function AcordeonSubAreas(Data, CtrlSub) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdSubAreas+ "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdSubAreas + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdSubAreas + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdSubAreas + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].NoSubArea + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].NEncargado1 + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].TelefonoE1 + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].CorreoE1 + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].NEncargado2 + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].TelefonoE2 + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].CorreoE2 + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].NEncargado3 + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].TelefonoE3 + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].CorreoE3 + "</div>";
        CodigoHTMLAreas += "</div>";
        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";


        //CodigoHTMLAreas += "<button class='btn btn-info' onclick='MostrarOcultar(" + DatosProveedor[i].ID + ")'><i id='BtnMO" + DatosProveedor[i].Id + "' class='fas fa-chevron-circle-down'></i></button></div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdSubAreas + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarSubarea(" + Data[i].IdSubAreas + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlSub.innerHTML = CodigoHTMLAreas;
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
        sessionStorage.setItem('IDSub', '0');

    }
    else {

        $.get("/Subarea/ConsultaSubArea/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDSub', Data[0].IdSubAreas);
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("TxtNombre1").value = Data[0].NEncargado1;
            document.getElementById("TxtTelefono1").value = Data[0].TelefonoE1;
            document.getElementById("TxtCorreo1").value = Data[0].CorreoE1;
            document.getElementById("TxtNombre2").value = Data[0].NEncargado2;
            document.getElementById("TxtTelefono2").value = Data[0].TelefonoE2;
            document.getElementById("TxtCorreo2").value = Data[0].CorreoE2;
            document.getElementById("TxtNombre3").value = Data[0].NEncargado3;
            document.getElementById("TxtTelefono3").value = Data[0].TelefonoE3;
            document.getElementById("TxtCorreo3").value = Data[0].CorreoE3;

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
function GuardarSubarea() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdSubAreas = sessionStorage.getItem('IDSub');
            var Nombre = document.getElementById("TxtNombre").value;
            var NoSubArea = document.getElementById("TxtNumero").value;
            var NEncargado1 = document.getElementById("TxtNombre1").value;
            var TelefonoE1 = document.getElementById("TxtTelefono1").value;
            var CorreoE1 = document.getElementById("TxtCorreo1").value;
            var NEncargado2 = document.getElementById("TxtNombre2").value;
            var TelefonoE2 = document.getElementById("TxtTelefono2").value;
            var CorreoE2 = document.getElementById("TxtCorreo2").value;
            var NEncargado3 = document.getElementById("TxtNombre3").value;
            var TelefonoE3 = document.getElementById("TxtTelefono3").value;
            var CorreoE3 = document.getElementById("TxtCorreo3").value;

            var frm = new FormData();
            frm.append("IdSubAreas", IdSubAreas);
            frm.append("Nombre", Nombre);
            frm.append("NoSubArea", NoSubArea);
            frm.append("NEncargado1", NEncargado1);
            frm.append("TelefonoE1", TelefonoE1);
            frm.append("CorreoE1", CorreoE1);
            frm.append("NEncargado2", NEncargado2);
            frm.append("TelefonoE2", TelefonoE2);
            frm.append("CorreoE2", CorreoE2);
            frm.append("NEncargado3", NEncargado3);
            frm.append("TelefonoE3", TelefonoE3);
            frm.append("CorreoE3", CorreoE3);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Subarea/GuardarSubarea",
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
                        CrearAcordeonSubAreas();
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
function EliminarSubarea(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Subarea/EliminarSubarea/?Id=" + id, function (DatoSub) {
            if (DatoSub == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonSubAreas();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}
