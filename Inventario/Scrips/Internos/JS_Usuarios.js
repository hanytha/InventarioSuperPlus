LlenarCMBPrin();

var imagen64;
ConsultaImpuesto();
function ConsultaImpuesto() {
    $.get("/Usuario/ConsultaUsuarios", function (Data) {
        CrearTablaImpuesto(Data);
    }
    );
}
function CrearTablaImpuesto(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra += "<table id='tablas' class='table table table-sm' >";
    CodigoHtmlTablaCompra += " <thead class='thead-dark'><tr><th>Perfil</th><th>Nivel</th><th>Acción</thead>";
    CodigoHtmlTablaCompra += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra += "<tr>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].CURP + "</td>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Nombre + "</td>";

        CodigoHtmlTablaCompra += "<td>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#ModalUsuario'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarUsuario(" + Data[i].IdUsuarios + ",this)'><i class='fas fa-eraser'></i></button>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='abrirModalBloqueado(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#ModalImpuesto'><i class='fas fa-window-restore list__img'></i></button>";

        CodigoHtmlTablaCompra += "</td>";
        CodigoHtmlTablaCompra += "</tr>";
    }
    CodigoHtmlTablaCompra += "</tbody>";
    CodigoHtmlTablaCompra += "</table>";
    document.getElementById("tablaImpuesto").innerHTML = CodigoHtmlTablaCompra;
}



BloquearCTRL();

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}




//llena los combosprincipales
function LlenarCMBPrin() {
    //$.get("/GLOBAL/BDEstados", function (data) {
    //    llenarCombo(data, document.getElementById("cmbEstado"), true);
    //});
    $.get("/GLOBAL/BDAreas", function (data) {
        llenarCombo(data, document.getElementById("cmbArea"));
    });
    $.get("/Usuario/ConsultaPerfiles", function (data) {
        llenarCombo(data, document.getElementById("cmbPerfil"));
    });
}


//event Change index Areas para llenar el combobox SubAreas
var IDA = document.getElementById("cmbArea");
IDA.addEventListener("change", function () {
    $.get("/GLOBAL/BDSubAreas/?IDA=" + IDA.value, function (data) {
        llenarCombo(data, document.getElementById("cmbSubArea"));
    });
});
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
//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdUsuarios', '0');
    }
    else {
        $.get("/Usuario/ConsultaUsuario/?Id=" + id, function (Data) {

            sessionStorage.setItem('IdUsuarios', Data[0].IdUsuarios);

            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdUsuarios', Data[0].IdUsuarios);     //Variable de sesión

            document.getElementById("TxtCURP").value = Data[0].CURP;
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("TxtApellidoP").value = Data[0].ApellidosP;
            document.getElementById("TxtApellidoM").value = Data[0].ApellidosM;
            document.getElementById("TxtFechaN").value = Data[0].FechaDeNacimiento;
            document.getElementById("TxtRFC").value = Data[0].RFC;

            document.getElementById("TxtCorreo").value = Data[0].Correo;
            document.getElementById("TxtNSS").value = Data[0].NoSS;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtUsuario").value = Data[0].Usuario;
            document.getElementById("cmbEstado").value = Data[0].IdEstado;
            document.getElementById("cmbPerfil").value = Data[0].IdPerfil;
            document.getElementById("cmbArea").value = Data[0].IdArea;

            //Mostrar el Estado, Municipio y localidad registrado al inicio y permitir cambiarlo
            document.getElementById("cmbEstado").value = Data[0].IdEstado;
            $.get("/GLOBAL/BDMunicipio/?IDE=" + Data[0].IdEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"));
                document.getElementById("cmbMunicipio").value = Data[0].IdMunicipio;
            });
            $.get("/GLOBAL/BDLocalidades/?IDM=" + Data[0].IdMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"));
                document.getElementById("cmbLocalidad").value = Data[0].IdLocalidad;
            });
            $.get("/GLOBAL/BDSubAreas/?IDA=" + Data[0].IdArea, function (Subareas) {
                llenarCombo(Subareas, document.getElementById("cmbSubArea"));
                document.getElementById("cmbSubArea").value = Data[0].IdSubArea;
            });

            document.getElementById("Txtpassword").value = Data[0].Password;
            document.getElementById("TxtConfirmacion").value = Data[0].Password;
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
function GuardarUsuario() {
    var pas1 = document.getElementById("Txtpassword").value;
    var pas2 = document.getElementById("TxtConfirmacion").value;
    if (pas1 == pas2) {
        if (CamposObligatorios() == true) {
            if (confirm("¿Desea aplicar los cambios?") == 1) {
                var IdUsuarios = sessionStorage.getItem('IdUsuarios');
                var CURP = document.getElementById("TxtCURP").value;
                var Nombre = document.getElementById("TxtNombre").value;
                var ApellidosP = document.getElementById("TxtApellidoP").value;
                var ApellidosM = document.getElementById("TxtApellidoM").value;
                var FechaDeNacimiento = document.getElementById("TxtFechaN").value;
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
                var NoSS = document.getElementById("TxtNSS").value;
                var Correo = document.getElementById("TxtCorreo").value;
                var Telefono = document.getElementById("TxtTelefono").value;
                var FechaDeNacimiento = document.getElementById("TxtFechaN").value;
                var IdArea = document.getElementById("cmbArea").value;
                var TempNA = document.getElementById("cmbArea");
                var NArea = TempNA.options[TempNA.selectedIndex].text;
                var IdSubArea = document.getElementById("cmbSubArea").value;
                var TempNSA = document.getElementById("cmbSubArea");
                var NSArea = TempNSA.options[TempNSA.selectedIndex].text;
                var IdPerfil = document.getElementById("cmbPerfil").value;
                var TempPerf = document.getElementById("cmbPerfil");
                var LvlPerfil = TempPerf.options[TempPerf.selectedIndex].text;
                var Usuario = document.getElementById("TxtUsuario").value;
                var Foto = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
                if (Foto.endsWith('png')) {
                    Foto = imagen64.replace("data:image/png;base64,", "");
                }
                var password = document.getElementById("Txtpassword").value;
                var Correo = document.getElementById("TxtCorreo").value;
                var f = new Date();
                var FechaIngreso = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                var frm = new FormData();
                var frm = new FormData();
                frm.append("IdUsuarios", IdUsuarios);
                frm.append("CURP", CURP);
                frm.append("Nombre", Nombre);
                frm.append("ApellidosP", ApellidosP);
                frm.append("ApellidosM", ApellidosM);
                frm.append("FechaDeNacimiento", FechaDeNacimiento);
                frm.append("IdEstado", IdEstado);
                frm.append("Estado", Estado);
                frm.append("IdMunicipio", IdMunicipio);
                frm.append("Municipio", Municipio);
                frm.append("IdLocalidad", IdLocalidad);
                frm.append("Localidad", Localidad);
                frm.append("RFC", RFC);
                frm.append("NoSS", NoSS);
                frm.append("Correo", Correo);
                frm.append("Telefono", Telefono);
                frm.append("FechaDeNacimiento", FechaDeNacimiento);
                frm.append("IdArea", IdArea);
                frm.append("NArea", NArea);
                frm.append("IdSubArea", IdSubArea);
                frm.append("NSArea", NSArea);
                frm.append("IdPerfil", IdPerfil);
                frm.append("LvlPerfil", LvlPerfil);
                frm.append("FechaIngreso", FechaIngreso);
                frm.append("Usuario", Usuario);
                frm.append("cadF", Foto);
                frm.append("password", password);
                frm.append("Estatus", 1);
                $.ajax({
                    type: "POST",
                    url: "/Usuario/GuardarUsuario",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        if (data == 0) {
                            alert("Ocurrio un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe el usuario");
                        }
                        else {
                            alert("Se ejecutó correctamente");
                            CrearAcordeonUsuarios();
                            document.getElementById("btnCancelar").click();
                        }
                    }
                });
            }
        }
    }
    else {
        alert("Su contraseña no coincide")
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
function EliminarUsuario(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Usuario/EliminarUsuarios/?IdUsuarios=" + id, function (DatoUsuario) {
            if (DatoUsuario == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se elimino correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                CrearAcordeonUsuarios();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}




//    //         //     //


function abrirModalBloqueado(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdUsuarioBloqueado', '0');
    }
    else {
        $.get("/Usuario/ConsultaUsuario/?Id=" + id, function (Data) {

            sessionStorage.setItem('IdUsuarioBloqueado', Data[0].IdUsuarios);

            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdUsuarioBloqueado', Data[0].IdUsuarios);     //Variable de sesión

            document.getElementById("TxtCurpBloqueado").value = Data[0].CURP;
            document.getElementById("TxtNombreBloqueado").value = Data[0].Nombre;
            document.getElementById("TxtApellidoPaternoBloqueado").value = Data[0].ApellidosP;
            document.getElementById("TxtApellidoMaternoBloqueado").value = Data[0].ApellidosM;
            document.getElementById("TxtFechaNBloqueado").value = Data[0].FechaDeNacimiento;
            document.getElementById("TxtRFCBloqueado").value = Data[0].RFC;

            document.getElementById("TxtCorreoBloqueado").value = Data[0].Correo;
            document.getElementById("cmbNSSBloqueado").value = Data[0].NoSS;
            document.getElementById("TxtTelBloqueado").value = Data[0].Telefono;
            document.getElementById("TxtUsuarioBloqueado").value = Data[0].Usuario;
            document.getElementById("cmbEstadoBloqueado").value = Data[0].IdEstado;
            document.getElementById("TxtPerfilBloqueado").value = Data[0].IdPerfil;
            document.getElementById("cmbAreaBloqueado").value = Data[0].IdArea;

            //Mostrar el Estado, Municipio y localidad registrado al inicio y permitir cambiarlo
            document.getElementById("cmbEstadoBloqueado").value = Data[0].IdEstado;
            $.get("/GLOBAL/BDMunicipio/?IDE=" + Data[0].IdEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipioBloqueado"));
                document.getElementById("cmbMunicipioBloqueado").value = Data[0].IdMunicipio;
            });
            $.get("/GLOBAL/BDLocalidades/?IDM=" + Data[0].IdMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidadBloqueado"));
                document.getElementById("cmbLocalidadBloqueado").value = Data[0].IdLocalidad;
            });
            $.get("/GLOBAL/BDSubAreas/?IDA=" + Data[0].IdArea, function (Subareas) {
                llenarCombo(Subareas, document.getElementById("cmbSubAreaBloqueado"));
                document.getElementById("cmbSubAreaBloqueado").value = Data[0].IdSubArea;
            });

            document.getElementById("Txtpassword").value = Data[0].Password;
            document.getElementById("TxtConfirmacion").value = Data[0].Password;
            document.getElementById("PBFotoBloqueado").src = "data:image/png;base64," + Data[0].FOTOMOSTRAR;

        });
    }
}