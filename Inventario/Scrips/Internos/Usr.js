Consulta();
LlenarCMBPrin();

$("#TxtFechaN").datepicker(
    {
        dateFormat: "dd/mm/yy",
        changeMonth: true,
        changeYear: true
    }
);
//crea la tabla
function Consulta() {
    $.get("/Usr/BDUsuarios", function (DatosUsuarios) {
        CrearTabla(["ID", "Nombre Completo", "Area", "Correo Electronico", "Telefono", "Ingreso"], DatosUsuarios);
    });
}
function CrearTabla(AColumnas, DatosUsuarios) {
    var CodHtml = "";
    CodHtml += "<table id='tablas'  class='table table table-sm' >";
    CodHtml += "<thead>";
    CodHtml += "<tr>";
    for (var i = 0; i < AColumnas.length; i++) {
        CodHtml += "<td>" + AColumnas[i] + "</td>";
    }
    CodHtml += "<td>Opciones</td>";
    CodHtml += "</tr>";
    CodHtml += "</thead>";
    CodHtml += "<tbody>";
    for (var i = 0; i < DatosUsuarios.length; i++) {
        CodHtml += "<tr>";
        CodHtml += "<td>" + DatosUsuarios[i].IdUsuarios + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].Nombre + " " + DatosUsuarios[i].APaterno + " " + DatosUsuarios[i].AMaterno + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].NombreA + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].Correo + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].Telefono + "</td>";
        CodHtml += "<td>" + DatosUsuarios[i].FechaIngreso + "</td>";
        CodHtml += "<td>";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + DatosUsuarios[i].IdUsuarios + ");' data-toggle='modal' data-target='#myModal'><i class='fas fa-edit'></i></button>";
        CodHtml += "<button class='btn btn-danger' onclick='eliminar(" + DatosUsuarios[i].IdUsuarios + ",this);' ><i class='fas fa-eraser'></i></button>";
        CodHtml += "</td>";
        CodHtml += "</tr>";
    }
    CodHtml += "</tbody>";
    CodHtml += "</table>";
    document.getElementById("tabla").innerHTML = CodHtml;
    $("#tablas").dataTable(
        {
            searching: false
        }
    );
}
//llena los combosprincipales
function LlenarCMBPrin() {
    //$.get("/GLOBAL/BDEstados", function (data) {
    //    llenarCombo(data, document.getElementById("cmbEstado"), true);
    //});
    $.get("/GLOBAL/BDAreas", function (data) {
        llenarCombo(data, document.getElementById("cmbArea"), true);
    });
    $.get("/Usuarios/BDPerfiles", function (data) {
        llenarCombo(data, document.getElementById("cmbPerfil"), true);
    });
}
//event Change index Areas para llenar el combobox SubAreas
var IDA = document.getElementById("cmbArea");
IDA.addEventListener("change", function () {
    $.get("/GLOBAL/BDSubAreas/?IDA=" + IDA.value, function (data) {
        llenarCombo(data, document.getElementById("cmbSubArea"), true);
    });
});
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
//abrir PopUp
function abrirModal(id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        LimpiarCampos();
    }
    else {
        $.get("/Usr/BDUser/?ID=" + id, function (data) {
            document.getElementById("TxtIDUsuario").value = data[0].IDUsuario;
            document.getElementById("TxtCURP").value = data[0].CURP;
            document.getElementById("TxtNombre").value = data[0].Nombre;
            document.getElementById("TxtApellidoP").value = data[0].APaterno;
            document.getElementById("TxtApellidoM").value = data[0].AMaterno;
            document.getElementById("PBFoto").src = "data:image/png;base64," + data[0].FOTOMOSTRAR;
            document.getElementById("TxtFechaN").value = data[0].FechaNaci;
            document.getElementById("cmbEstado").value = data[0].IDEstado;
            document.getElementById("cmbPerfil").value = data[0].IDPerfil;
            document.getElementById("cmbArea").value = data[0].IDArea;
            $.get("/GLOBAL/BDMunicipio/?IDE=" + data[0].IDEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"), true);
                document.getElementById("cmbMunicipio").value = data[0].IDMunicipio;
            });
            $.get("/GLOBAL/BDLocalidades/?IDM=" + data[0].IDMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"), true);
                document.getElementById("cmbLocalidad").value = data[0].IDLocalidad;
            });
            $.get("/GLOBAL/BDSubAreas/?IDA=" + data[0].IDArea, function (Subareas) {
                llenarCombo(Subareas, document.getElementById("cmbSubArea"), true);
                document.getElementById("cmbSubArea").value = data[0].IDSubArea;
            });
            document.getElementById("TxtCorreo").value = data[0].Correo;
            document.getElementById("TxtTelefono").value = data[0].Telefono;
            document.getElementById("Txtpassword").value = data[0].Contraseña;
            document.getElementById("TxtpasswordConf").value = data[0].Contraseña;
        });
    }
}
// Guardar loS registros en la Base de Datos
function Guardar() {
    var pas1 = document.getElementById("Txtpassword").value;
    var pas2 = document.getElementById("TxtpasswordConf").value;
    if (pas1 == pas2) {
        if (CamposObligatorios() == true) {
            if (confirm("¿Desea aplicar los cambios?") == 1) {
                var IDUsuario = document.getElementById("TxtIDUsuario").value;
                var CURP = document.getElementById("TxtCURP").value;
                var IDArea = document.getElementById("cmbArea").value;
                var TempNA = document.getElementById("cmbArea");
                var NombreA = TempNA.options[TempNA.selectedIndex].text;
                var IDSubArea = document.getElementById("cmbSubArea").value;
                var TempNSA = document.getElementById("cmbSubArea");
                var NombreAS = TempNSA.options[TempNSA.selectedIndex].text;
                var IDPerfil = document.getElementById("cmbPerfil").value;
                var TempPerf = document.getElementById("cmbPerfil");
                var Perfil = TempPerf.options[TempPerf.selectedIndex].text;
                var Nombre = document.getElementById("TxtNombre").value;
                var APaterno = document.getElementBNombreASyId("TxtApellidoP").value;
                var AMaterno = document.getElementById("TxtApellidoM").value;
                var FNacimiento = document.getElementById("TxtFechaN").value;
                var Foto = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
                var Contraseña = document.getElementById("Txtpassword").value;
                var IDEstado = document.getElementById("cmbEstado").value;
                var TempEdo = document.getElementById("cmbEstado");
                var NombreE = TempEdo.options[TempEdo.selectedIndex].text;
                var IDMunicipio = document.getElementById("cmbMunicipio").value;
                var TempMuni = document.getElementById("cmbMunicipio");
                var NombreM = TempMuni.options[TempMuni.selectedIndex].text;
                var IDLocalidad = document.getElementById("cmbLocalidad").value;
                var TempLoca = document.getElementById("cmbLocalidad");
                var NombreL = TempLoca.options[TempLoca.selectedIndex].text;
                var Correo = document.getElementById("TxtCorreo").value;
                var Telefono = document.getElementById("TxtTelefono").value;
                var f = new Date();
                var FIngreso = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
                var frm = new FormData();
                frm.append("IDUsuario", IDUsuario);
                frm.append("CURP", CURP);
                frm.append("IDArea", IDArea);
                frm.append("NombreA", NombreA);
                frm.append("IDSubArea", IDSubArea);
                frm.append("NombreAS", NombreAS);

                frm.append("IDPerfil", IDPerfil);
                frm.append("Perfil", Perfil);
                frm.append("Nombre", Nombre);
                frm.append("APaterno", APaterno);
                frm.append("AMaterno", AMaterno);
                frm.append("FNacimiento", FNacimiento);
                frm.append("Contraseña", Contraseña);
                frm.append("IDEstado", IDEstado);
                frm.append("NombreE", NombreE);
                frm.append("IDMunicipio", IDMunicipio);
                frm.append("NombreM", NombreM);
                frm.append("IDLocalidad", IDLocalidad);
                frm.append("NombreL", NombreL);
                frm.append("Correo", Correo);
                frm.append("Telefono", Telefono);
                frm.append("FIngreso", FIngreso);
                frm.append("cadF", Foto);
                frm.append("Estatus", 1);
                $.ajax({
                    type: "POST",
                    url: "/Usr/guardar",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrio un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe un usuario con esa información");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            Consulta();
                            document.getElementById("btnCancelar").click();
                        }
                    }
                }
                );
            }
        }
    }
    else {
        alert("Ingrese nuevamente su contraseña")
    }
}
//limpiar campos
function LimpiarCampos() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controles[i].nodeName == "SELECT") {
            controles[i].value = "0";
        }
        else {
            controles[i].value = "";
        }
    }
    ErroresCampos();
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
//eliminar Lel registro en la base de datos
function eliminar(id) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Usuarios/eliminar/?id=" + id, function (data) {
            if (data == -1) {
                alert("Ya existe el usuario");
            } else {
                if (data == 0) {
                    alert("Ocurrio un error"); (
                } else {
                    alert("Se elimino correctamente");
                    Consulta();
                }
            }
        });
    }
}