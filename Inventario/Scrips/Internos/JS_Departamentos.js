﻿CrearAcordeonDepartamentos();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonDepartamentos() {
    //$.get("/Departamentos/ConsultaDepartamentos", function (Data) {
    //    //Accordeon(DatosProveedor, document.getElementById("accordion"));
    //    AcordeonDepartamentos(Data, document.getElementById("accordion"));
    //});
}
function AcordeonDepartamentos(Data, CtrlAlmacen) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdAreas + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdAreas + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdAreas + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdAreas + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].UNombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Carpeta + "</div>";
        CodigoHTMLAreas += "</div>";

        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";


        //CodigoHTMLAreas += "<button class='btn btn-info' onclick='MostrarOcultar(" + DatosProveedor[i].ID + ")'><i id='BtnMO" + DatosProveedor[i].Id + "' class='fas fa-chevron-circle-down'></i></button></div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdAreas + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarDepartamento(" + Data[i].IdAreas + ",this)' ><i class='fas fa-eraser'></i></button>";
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
        controlesObligatorio[i].classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDDepartamento', '0');
      
    }
    else {

        $.get("/Departamentos/ConsultaDepartamento/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDDepartamento', Data[0].IdAreas);
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("TxtUsuario").value = Data[0].UNombre;
            document.getElementById("TxtCorreo").value = Data[0].Correo;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtCarpeta").value = Data[0].Carpeta;


           
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
function GuardarDepartamento() {
    if (CamposObligatorios("Area") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdAreas = sessionStorage.getItem('IDDepartamento');
            var Nombre = document.getElementById("TxtNombre").value;
            var UNombre = document.getElementById("TxtUsuario").value;
            var Correo = document.getElementById("TxtCorreo").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            var Carpeta = document.getElementById("TxtCarpeta").value;

            var frm = new FormData();
            frm.append("IdAreas", IdAreas);
            frm.append("Nombre", Nombre);
            frm.append("UNombre", UNombre);
            frm.append("Correo", Correo);
            frm.append("Telefono", Telefono);
            frm.append("Carpeta", Carpeta);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Departamentos/GuardarDepartamento",
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
                        CrearAcordeonDepartamentos();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}


//marca los campos obligatorios
function CamposObligatorios(clase) {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName(clase);
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].classList.add("error");
        }
        else {
            controlesObligatorio[i].classList.remove("error");
        }
    }
    return exito;
}



//"Elimina" el área cambia el Estatus
function EliminarDepartamento(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Departamentos/EliminarDepartamento/?Id=" + id, function (DatoDepartamento) {
            if (DatoDepartamento == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonDepartamentos();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


//---------Validación Departamentos---------
function validarFormularioD() {

    var TxtNombre = document.getElementById('TxtNombre').value;
    var TxtUsuario = document.getElementById('TxtUsuario').value;
    var Txtcorreo = document.getElementById('Txtcorreo').value;
    var TxtTelefono = document.getElementById('TxtTelefono').value;
    var TxtCarpeta = document.getElementById('TxtCarpeta').value;


    //Test campo obligatorio
    if (TxtNombre == null || TxtNombre.length == 0 || /^\s+$/.test(TxtNombre)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }
    //Test campo obligatorio
    if (TxtUsuario == null || TxtUsuario.length == 0 || /^\s+$/.test(TxtUsuario)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtUsuario');
        return false;
    }

    //Test correo
    if (!(/\S+@\S+\.\S+/.test(Txtcorreo))) {
        alert('ERROR: Debe escribir un correo válido');
        return false;
    }

    //Test edad
    if (TxtTelefono == null || TxtTelefono.length == 0 || isNaN(TxtTelefono)) {
        alert('ERROR: Debe ingresar una edad TxtTelefono');
        return false;

    }
    //Test campo obligatorio
    if (TxtCarpeta == null || TxtCarpeta.length == 0 || /^\s+$/.test(TxtCarpeta)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtUsuario TxtCarpeta');
        return false;
    }

    return true;
}



//-------------------------------

function CrearAcordeonSubAreas(IdArea) {
    $.get("/Subarea/ConsultasSubAreasXAreas/?idArea=" + IdArea, function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonSubAreas(Data, document.getElementById("Acorden" + IdArea));
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
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdSubAreas + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdSubAreas + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdSubAreas + "' class='collapsed'>";
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
