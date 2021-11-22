
//LlenarCMBPrin();
var imagen64;
imagen64 = getBase64Image(document.getElementById("PBFoto"));

CrearAcordeonProveedores();
function CrearAcordeonProveedores() {
    $.get("/Proveedores/ConsultaProveedores", function (IncidenciasArea) {
        AcordeonProveedores(IncidenciasArea, document.getElementById("accordion"));
    });
}

//Crea la información basica de las insidencias
function AcordeonProveedores(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].IdProveedores + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].IdProveedores + ");' data-toggle='collapse' data-target='#collapse" + data[i].IdProveedores + "' aria-expanded='false' aria-controls='collapse" + data[i].IdProveedores + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        //CodHtml += "<i class='m-r-5 fas fa-clipboard-list' style='font - size: 100px; color: red;' aria-hidden='true'></i>";
     
        CodHtml += "<span >" + data[i].Nombre + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].IdProveedores + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Banco: </strong>" + data[i].Banco + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + data[i].Telefono + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>ClaveInterbancaria: </strong>" + data[i].ClaveInterbancaria + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Correo: </strong>" + data[i].Correo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>NumeroDeCuenta: </strong>" + data[i].NumeroDeCuenta + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'></div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Estado: </strong>" + data[i].Estado + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + data[i].UsoCFDI + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + data[i].Municipio + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>RFC: </strong>" + data[i].RFC + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + data[i].Localidad + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>RazonSocial: </strong>" + data[i].RazonSocial + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Direccion: </strong>" + data[i].Direccion + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Descripcion: </strong>" + data[i].Descripcion + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>CodigoPostal: </strong>" + data[i].CodigoPostal + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + data[i].IdProveedores + "," + data[i].IdProveedores + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarProveedores(" + data[i].IdProveedores + "," + data[i].IdProveedores + ",this)'><i class='fas fa-eraser'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}

BloquearCTRL();

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

////llena los combosprincipales
//function LlenarCMBPrin() {
//    //$.get("/GLOBAL/BDEstado", function (data) {
//    //    llenarCombo(data, document.getElementById("cmbEstado"), true);
//    //});
//    $.get("/GLOBAL/BDAreas", function (data) {
//        llenarCombo(data, document.getElementById("cmbArea"));
//    });
//    $.get("/Usuario/ConsultaPerfiles", function (data) {
//        llenarCombo(data, document.getElementById("cmbPerfil"));
//    });
//}

////event Change index Areas para llenar el combobox SubAreas
//var IDA = document.getElementById("cmbArea");
//IDA.addEventListener("change", function () {
//    $.get("/GLOBAL/BDSubAreas/?IDA=" + IDA.value, function (data) {
//        llenarCombo(data, document.getElementById("cmbSubArea"));
//    });
//});
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





//Foto
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
//Limpia la información y carga la informacion del usuario
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
        sessionStorage.setItem('IdProveedores', '0');

    }
    else {

        $.get("/Proveedores/ConsultaProveedor/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdProveedores', Data[0].IdProveedores);

            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("Txtcorreo").value = Data[0].Correo;
            document.getElementById("TxtRazonSocial").value = Data[0].RazonSocial;
            document.getElementById("TxtClaveInterbancaria").value = Data[0].ClaveInterbancaria;
            document.getElementById("TxtCodigoPostal").value = Data[0].CodigoPostal;

            document.getElementById("cmbEstado").value = Data[0].IdEstado;

            //Mostrar el Estado, Municipio y localidad registrado al inicio y permitir cambiarlo
            document.getElementById("cmbEstado").value = Data[0].IdEstado;
            $.get("/GLOBAL/BDUnidadM/?IDE=" + Data[0].IdEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"));
                document.getElementById("cmbMunicipio").value = Data[0].IdMunicipio;
            });
            $.get("/GLOBAL/BDLocalidades/?IDM=" + Data[0].IdMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"));
                document.getElementById("cmbLocalidad").value = Data[0].IdLocalidad;
            });
            document.getElementById("TxtRFC").value = Data[0].RFC;

            document.getElementById("TxtTelefono").value = Data[0].Telefono;

            document.getElementById("TxtDireccion").value = Data[0].Direccion;
            document.getElementById("TxtBanco").value = Data[0].Banco;
            document.getElementById("TxtNumeroDeCuenta").value = Data[0].NumeroDeCuenta;
            document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
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



//Guarda los cambios y altas de los proveedores
function GuardarProveedor() {

    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdProveedores = sessionStorage.getItem('IdProveedores');
            var Nombre = document.getElementById("TxtNombre").value;
            var Correo = document.getElementById("Txtcorreo").value;
            var RazonSocial = document.getElementById("TxtRazonSocial").value;
            var ClaveInterbancaria = document.getElementById("TxtClaveInterbancaria").value;
            var CodigoPostal = document.getElementById("TxtCodigoPostal").value;
            var IdEstado = document.getElementById("cmbEstado").value;
            var TempEdo = document.getElementById("cmbEstado");
            var Estado = TempEdo.options[TempEdo.selectedIndex].text;
            var IdMunicipio = document.getElementById("cmbMunicipio").value;
            var TempMuni = document.getElementById("cmbMunicipio");
            var Municipio = TempMuni.options[TempMuni.selectedIndex].text;
            var IdLocalidad = document.getElementById("cmbLocalidad").value;
            var TempLoca = document.getElementById("cmbLocalidad");
            var Localidad = TempLoca.options[TempLoca.selectedIndex].text;
            var RFC = document.getElementById("TxtRFC").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            var Direccion = document.getElementById("TxtDireccion").value;
            var Banco = document.getElementById("TxtBanco").value;


            var NumeroDeCuenta = document.getElementById("TxtNumeroDeCuenta").value;

            var UsoCFDI = document.getElementById("TxtUsoCFDI").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;

            var Logo = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
            if (Logo.endsWith('png')) {
                Logo = imagen64.replace("data:image/png;base64,", "");
            }

            var frm = new FormData();
            frm.append("IdProveedores", IdProveedores);
            frm.append("Nombre", Nombre);
            frm.append("Correo", Correo);
            frm.append("RazonSocial", RazonSocial);
            frm.append("ClaveInterbancaria", ClaveInterbancaria);
            frm.append("CodigoPostal", CodigoPostal);
            frm.append("IdEstado", IdEstado);
            frm.append("Estado", Estado);
            frm.append("IdMunicipio", IdMunicipio);
            frm.append("Municipio", Municipio);
            frm.append("IdLocalidad", IdLocalidad);
            frm.append("Localidad", Localidad);
            frm.append("RFC", RFC);
            frm.append("Telefono", Telefono);
            frm.append("Direccion", Direccion);
            frm.append("Banco", Banco);
            frm.append("NumeroDeCuenta", NumeroDeCuenta);
            frm.append("UsoCFDI", UsoCFDI);
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
                        alert("Ocurrió un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el proveedor");
                    }
                    else {
                        alert("Se ejecutó correctamente");
                        CrearAcordeonProveedores();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }

}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
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
function EliminarProveedores(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Proveedores/EliminarProveedores/?IdProveedores=" + id, function (DatoUsuario) {
            if (DatoUsuario == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se eliminó correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                CrearAcordeonProveedores();
            } else {
                alert("Ocurrió un error");
            }
        });
    }
}


