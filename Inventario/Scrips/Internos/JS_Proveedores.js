LlenarCMBPrin();

CrearAcordeonProveedores();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonProveedores() {
    $.get("/Proveedores/ConsultaProveedores", function (DatosProveedor) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonProveedores(DatosProveedor, document.getElementById("accordion"));
    });
}//Acordeon proveedores
function AcordeonProveedores(DatosProveedor, CtrlProveedores) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < DatosProveedor.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + DatosProveedor[i].Id + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + DatosProveedor[i].Id + "' aria-expanded='false' aria-controls='collapse" + DatosProveedor[i].Id + "' class='collapsed'>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + DatosProveedor[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + DatosProveedor[i].Id + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + DatosProveedor[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + DatosProveedor[i].GiroDelProveedor + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + DatosProveedor[i].Municipio + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Cuenta Interbancaria: </strong>" + DatosProveedor[i].CuentaInterbancaria + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Código Postal: </strong>" + DatosProveedor[i].CodigoPostal + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Estado: </strong>" + DatosProveedor[i].Estado + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>RFC: </strong>" + DatosProveedor[i].RFC + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + DatosProveedor[i].Localidad + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosProveedor[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Banco: </strong>" + DatosProveedor[i].Banco + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosProveedor[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Número de Cuenta: </strong>" + DatosProveedor[i].NumeroDeCuenta + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + DatosProveedor[i].UsoCFDI + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nomenclatura: </strong>" + DatosProveedor[i].Nomenclatura + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Descripción: </strong>" + DatosProveedor[i].Descripcion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Logo: </strong>" + DatosProveedor[i].Logo + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='AbrirMProveedores(" + DatosProveedor[i].Id + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarProveedores(" + DatosProveedor[i].Id + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlProveedores.innerHTML = CodigoHTMLAreas;
}
//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase AreaObligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("border-danger");//Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
    }
    else {
        $.get("/Proveedores/ConsultaProveedor/?Id=" + Id, function (DatosProveedor) {
            document.getElementById("TxtId").value = DatosProveedor[0].Id;
            document.getElementById("TxtNombre").value = DatosProveedor[0].Nombre;
            document.getElementById("TxtCorreo").value = DatosProveedor[0].Correo;
            document.getElementById("TxtGiroDelProveedor").value = DatosProveedor[0].GiroDelProveedor;
            document.getElementById("TxtCuentaInterbancaria").value = DatosProveedor[0].CuentaInterbancaria;
            document.getElementById("TxtCodigoPostal").value = DatosProveedor[0].CodigoPostal;
            document.getElementById("cmbEstado").value = DatosProveedor[0].Estado;
            $.get("/GLOBAL/BDMunicipio/?IDE=" + data[0].IDEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"), true);
                document.getElementById("cmbMunicipio").value = data[0].IDMunicipio;
            });
            $.get("/GLOBAL/BDLocalidades/?IDM=" + data[0].IDMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"), true);
                document.getElementById("cmbLocalidad").value = data[0].IDLocalidad;
            });
            document.getElementById("TxtRFC").value = DatosProveedor[0].RFC;
            document.getElementById("TxtDireccion").value = DatosProveedor[0].Direccion;
            document.getElementById("TxtTelefono").value = DatosProveedor[0].Telefono;
            document.getElementById("TxtBanco").value = DatosProveedor[0].Banco;
            document.getElementById("TxtNumeroDeCuenta").value = DatosProveedor[0].NumeroDeCuenta;
            document.getElementById("TxtUsoCFDI").value = DatosProveedor[0].UsoCFDI;
            document.getElementById("TxtNomenclatura").value = DatosProveedor[0].Nomenclatura;
            document.getElementById("TxtDescripcion").value = DatosProveedor[0].Descripcion;
            document.getElementById("TxtLogo").value = DatosProveedor[0].Logo;
        });
    }
}

//limpiar campos
function LimpiarCampos() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controles[i].nodeName == "SELECT") {
            controles[i].value = "0";
            CodigoHTMLAreas += "<button class='btn btn-success' onclick='AbrirMProveedores(" + DatosProveedor[i].Id + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        }
        else {
            controles[i].value = "";
        }
    }
    ErroresCampos();
}

//llenar los combos Principales
function LlenarCMBPrin() {
    $.get("/GLOBAL/BDEstados", function (data) {
        llenarCombo(data, document.getElementById("cmbEstado"), true);
    });
    $.get("/GLOBAL/BDAreas", function (data) {
        llenarCombo(data, document.getElementById("cmbArea"), true);
    });
    $.get("/Usuarios/BDPerfiles", function (data) {
        llenarCombo(data, document.getElementById("cmbPerfil"), true);
    });
}

//event Change index Estados para llenar el combobox Municipios
var IDE = document.getElementById("cmbEstado");
IDE.addEventListener("change", function () {
    $.get("/GLOBAL/BDMunicipio/?IDE=" + IDE.value, function (data) {
        llenarCombo(data, document.getElementById("cmbMunicipio"), true);
    });
});
//event Change index Municipio para llenar el combo box Municipios 
var IDM = document.getElementById("cmbMunicipio");
IDM.addEventListener("change", function () {
    $.get("/GLOBAL/BDLocalidades/?IDM=" + IDM.value, function (data) {
        llenarCombo(data, document.getElementById("cmbLocalidad"), true);
    });
});
//funcion general para llenar los select
function llenarCombo(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value='0'>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}

//Guarda los cambios y altas de las áreas
function GuardarProveedor() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var Id = document.getElementById("TxtId").value;
            var Nombre = document.getElementById("TxtNombre").value;
            var Correo = document.getElementById("Txtcorreo").value;
            var GiroDelProveedor = document.getElementById("TxtGiroDelProveedor").value;
            var CuentaInterbancaria = document.getElementById("TxtCuentaInterbancaria").value;
            var CodigoPostal = document.getElementById("TxtCodigoPostal").value;
            document.getElementById("cmbEstado").value = data[0].IDEstado;

            var estado = document.getElementById("cmbestado").value;
            var Municipio = document.getElementById("cmbMunicipio").value;
            var Localidad = document.getElementById("cmblocalidad").value;
           
            var RFC = document.getElementById("RFC").value;
            var Direccion = document.getElementById("TxtDireccion").value;
            var Telefono = document.getElementById("TxtTelefono").value;

            var Banco = document.getElementById("TxtBanco").value;
            var NumeroDeCuenta = document.getElementById("TxtNumeroDeCuenta").value;
            var UsoCFDI = document.getElementById("TxtUsoCFDI").value;
            var Nomenclatura = document.getElementById("TxtNomenclatura").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;
            var Logo = document.getElementById("TxtLogo").value;
            var frm = new FormData();
            frm.append("Id", Id);
            frm.append("Nombre", Nombre);
            frm.append("Correo", Correo);
            frm.append("GiroDelProveedor", GiroDelProveedor);
            frm.append("CuentaInterbancaria", CuentaInterbancaria);
            frm.append("CodigoPostal", CodigoPostal);
            frm.append("Estado", GiroDelProveedor);
            frm.append("Municipio", Municipio);
            frm.append("CodigoPostal", CodigoPostal);
            frm.append("RFC", RFC);
            frm.append("Direccion", Direccion);
            frm.append("Telefono", Telefono);
            frm.append("Banco", Banco);
            frm.append("NumeroDeCuenta", NumeroDeCuenta);
            frm.append("UsoCFDI", UsoCFDI);
            frm.append("Nomenclatura", Nomenclatura);
            frm.append("Descripcion", Descripcion);
            frm.append("Logo", Logo);
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
//"Elimina" el área cambia el Estatus
function EliminarProveedores(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Proveedores/EliminarProveedor/?Id=" + id, function (DatoProveedor) {
            if (DatoProveedor == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonProveedores();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


