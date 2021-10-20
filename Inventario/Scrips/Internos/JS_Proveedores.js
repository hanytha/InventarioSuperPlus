﻿LlenarCMBPrin();

CrearAcordeonProveedores();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonProveedores() {
    $.get("/Proveedores/ConsultaProveedores", function (Data) {
        AcordeonProveedores(Data, document.getElementById("accordion"));
    });
}//Acordeón proveedores
function AcordeonProveedores(Data, CtrlProveedores) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        } //Obtener los registros de la base de datos para mostrarlo en el accordión
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdProveedores + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdProveedores + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdProveedores + "' class='collapsed'>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdProveedores + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Razón social: </strong>" + Data[i].RazonSocial + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Municipio + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Clave Interbancaria: </strong>" + Data[i].ClaveInterbancaria + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Código Postal: </strong>" + Data[i].CodigoPostal + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Estado: </strong>" + Data[i].Estado + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>RFC: </strong>" + Data[i].RFC + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + Data[i].Direccion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + Data[i].Localidad + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Banco: </strong>" + Data[i].Banco + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Número de Cuenta: </strong>" + Data[i].NumeroDeCuenta + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + Data[i].UsoCFDI + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nomenclatura: </strong>" + Data[i].Nomenclatura + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Descripción: </strong>" + Data[i].Descripcion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Logo: </strong>" + Data[i].Logo + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        //Botón para modificar y eliminar los datos de losproveedores
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        // CodigoHTMLAreas += "<button class='btn btn-success' onclick='editarModal(" + Data[i].Id + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdProveedores + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarProveedores(" + Data[i].IdProveedores + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlProveedores.innerHTML = CodigoHTMLAreas;
}
//imagenes
var btnFoto = document.getElementById("BtnFoto");
btnFoto.onchange = function (e) {
    var file = document.getElementById("BtnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("PBFoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);
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
        //  sessionStorage.setItem('IDProveedor', '0');  
    }
    else {

        $.get("/Proveedores/ConsultaProv/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDProveedor', Data[0].IdProveedores);     //Variable de sesión
            // document.getElementById("TxtIDUsuario").value = data[0].IDUsuario;
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("Txtcorreo").value = Data[0].Correo;
            document.getElementById("TxtRazonSocial").value = Data[0].RazonSocial;
            document.getElementById("TxtClaveInterbancaria").value = Data[0].ClaveInterbancaria;
            document.getElementById("TxtCodigoPostal").value = Data[0].CodigoPostal;
            //Mostrar el Estado, Municipio y localidad registrado al inicio y permitir cambiarlo
            document.getElementById("cmbEstado").value = Data[0].IdEstado;
            $.get("/GLOBAL/BDMunicipio/?IDE=" + Data[0].IdEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"), true);
                document.getElementById("cmbMunicipio").value = Data[0].IdMunicipio;
            });
            $.get("/GLOBAL/BDLocalidades/?IDM=" + Data[0].IdMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"), true);
                document.getElementById("cmbLocalidad").value = Data[0].IdLocalidad;
            });
            document.getElementById("TxtRFC").value = Data[0].RFC;
            document.getElementById("TxtDireccion").value = Data[0].Direccion;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtBanco").value = Data[0].Banco;
            document.getElementById("TxtNumeroDeCuenta").value = Data[0].NumeroDeCuenta;
            document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
            document.getElementById("TxtNomenclatura").value = Data[0].Nomenclatura;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;
            document.getElementById("PBFoto").src = "data:image/png;base64," + Data[0].FOTOMOSTRAR;
        });
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

    //Limpiar las imágenes
    var controlesImg = document.getElementsByClassName("limpiarImg");
    for (var i = 0; i < controlesImg.length; i++) {
        controlesImg[i].value = null;
    }
}

//llenar los combos Principales
function LlenarCMBPrin() {
    $.get("/GLOBAL/BDEstados", function (data) {
        llenarCombo(data, document.getElementById("cmbEstado"));
    });
    // $.get("/GLOBAL/BDAreas", function (data) {
    //    llenarCombo(data, document.getElementById("cmbArea"), true);
    //  });
    //  $.get("/Usuarios/BDPerfiles", function (data) {
    //  llenarCombo(data, document.getElementById("cmbPerfil"), true);
    //});
}

//event Change index Estados para llenar el combobox Municipios
var IDE = document.getElementById("cmbEstado");
IDE.addEventListener("change", function () {
    $.get("/GLOBAL/BDMunicipio/?IDE=" + IDE.value, function (data) {
        llenarCombo(data, document.getElementById("cmbMunicipio"));
    });
});
//event Change index Municipio para llenar el combo box Municipios 
var IDM = document.getElementById("cmbMunicipio");
IDM.addEventListener("change", function () {
    $.get("/GLOBAL/BDLocalidades/?IDM=" + IDM.value, function (data) {
        llenarCombo(data, document.getElementById("cmbLocalidad"));
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

//Guarda los cambios y altas de los proveedores
function GuardarProveedor() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var Id = sessionStorage.getItem('IDProveedor');
            var Nombre = document.getElementById("TxtNombre").value;
            var Correo = document.getElementById("Txtcorreo").value;
            var RazonSocial = document.getElementById("TxtRazonSocial").value;
            var ClaveInterbancaria = document.getElementById("TxtClaveInterbancaria").value;
            var CodigoPostal = document.getElementById("TxtCodigoPostal").value;
            var IdEstado = document.getElementById("cmbEstado").value;
            var TempEdo = document.getElementById("cmbEstado");
            var Estado = TempEdo.options[TempEdo.selectedIndex].text;
            var IDMunicipio = document.getElementById("cmbMunicipio").value;
            var TempMuni = document.getElementById("cmbMunicipio");
            var Municipio = TempMuni.options[TempMuni.selectedIndex].text;
            var IDLocalidad = document.getElementById("cmbLocalidad").value;
            var TempLoca = document.getElementById("cmbLocalidad");
            // var NombreL = TempLoca.options[TempLoca.selectedIndex].text;
            var Localidad = TempLoca.options[TempLoca.selectedIndex].text;
            var RFC = document.getElementById("TxtRFC").value;
            var Direccion = document.getElementById("TxtDireccion").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            var Banco = document.getElementById("TxtBanco").value;
            var NumeroDeCuenta = document.getElementById("TxtNumeroDeCuenta").value;
            var UsoCFDI = document.getElementById("TxtUsoCFDI").value;
            var Nomenclatura = document.getElementById("TxtNomenclatura").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;
            var Logo = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");  ///////////-------->
            var frm = new FormData();
            frm.append("Id", Id);
            frm.append("Nombre", Nombre);
            frm.append("Correo", Correo);
            frm.append("RazonSocial", RazonSocial);
            frm.append("ClaveInterbancaria", ClaveInterbancaria);
            frm.append("CodigoPostal", CodigoPostal);
            frm.append("IdEstado", IdEstado);
            frm.append("Estado", Estado);
            frm.append("IDMunicipio", IDMunicipio);
            frm.append("Municipio", Municipio);
            frm.append("IDLocalidad", IDLocalidad);
            frm.append("Localidad", Localidad);
            frm.append("CodigoPostal", CodigoPostal);
            frm.append("RFC", RFC);
            frm.append("Direccion", Direccion);
            frm.append("Telefono", Telefono);
            frm.append("Banco", Banco);
            frm.append("NumeroDeCuenta", NumeroDeCuenta);
            frm.append("UsoCFDI", UsoCFDI);
            frm.append("Nomenclatura", Nomenclatura);
            frm.append("Descripcion", Descripcion);
            frm.append("cadF", Logo);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Proveedores/GuardarProveedor",
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
                        CrearAcordeonProveedores();
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

////////////////////////////////

//"Elimina" el área cambia el Estatus
function EliminarProveedores(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Proveedores/EliminarProveedor/?IdProveedores=" + id, function (DatoProveedor) {
            if (DatoProveedor == 1) {
               alert("Se elimino correctamente");
              //  confirmarEliminar();
                CrearAcordeonProveedores();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}

/////////////////////////////


/*
function mostrar() {
    swal('Hola Mundo');
}*/
/*Funcion del botón eliminar*/
function eliminar() {
        swal({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(function () {
            swal(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        })
    }


/*
//Funcion para confirmar al eliminar registros
function eliminar1(id) {
    swal({
        title: '¿Estas seguro?',
        text: "No podrás revertir esta acción",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (confirm == 1) {
            swal(
                'Deleted!',
                'El registro se elimino correctamente.',
                'success'
            )
        }
    })
}


function eliminar2() {
    swal({
        title: '¿Desea eliminar el registro?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(function () {
        swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
    })
}
*/

//Alerta de confirmación al presionar el botón eliminar
function confirmarEliminar() {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    })

}