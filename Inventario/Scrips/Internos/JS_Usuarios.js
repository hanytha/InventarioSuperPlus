
LlenarCMBPrin();

var imagen64;
imagen64 = getBase64Image(document.getElementById("PBFoto"));
//CrearAcordeonUsuarios();

////Crea el acordeón e inserta (los registros de la base de datos)
//function CrearAcordeonUsuarios() {
//    $.get("/Usuario/ConsultaUsuarios", function (Data) {
//        //Accordeon(DatosProveedor, document.getElementById("accordion"));
//        AcordeonUsuarios(Data, document.getElementById("accordion"));
//    });
//    imagen64 = getBase64Image(document.getElementById("PBFoto"));
//}
//function AcordeonUsuarios(Data, CtrlBonis) {
//    var CodigoHTMLUsuarios = "";
//    for (var i = 0; i < Data.length; i++) {
//        if (i < 1) {
//            CodigoHTMLUsuarios += "<div class='card m-b-0'>";
//        }
//        else {
//            CodigoHTMLUsuarios += "<div class='card m-b-0 border-top'>";
//        }
//        CodigoHTMLUsuarios += "<div class='card-header' id='heading" + Data[i].IdUsuarios + "'>";
//        CodigoHTMLUsuarios += "<h5 class='mb-0'>";
//        CodigoHTMLUsuarios += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdUsuarios + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdUsuarios + "' class='collapsed'>";
//        //CodigoHTMLUsuarios += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
//        CodigoHTMLUsuarios += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
//        CodigoHTMLUsuarios += "<span >" + Data[i].CURP + "</span>";
//        CodigoHTMLUsuarios += "</a>";
//        CodigoHTMLUsuarios += "</h5>";
//        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
//        CodigoHTMLUsuarios += "<div id='collapse" + Data[i].IdUsuarios + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
//        CodigoHTMLUsuarios += "<div class='card-body'>";
//        CodigoHTMLUsuarios += "<div class='row'>";
//        CodigoHTMLUsuarios += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre: </strong>" + Data[i].Nombre + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Apellidos Paterno: </strong>" + Data[i].ApellidosP + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Apellidos Materno: </strong>" + Data[i].ApellidosM + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Fecha De Nacimiento: </strong>" + Data[i].FechaDeNacimiento + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>RFC: </strong>" + Data[i].RFC + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Estado: </strong>" + Data[i].Estado + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Municipio + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + Data[i].Localidad + "</div>";

//        CodigoHTMLUsuarios += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Area: </strong>" + Data[i].NArea + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Sub Area: </strong>" + Data[i].NSArea + "</div>";

//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>NoSS: </strong>" + Data[i].NoSS + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].Correo + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Telefono: </strong>" + Data[i].Telefono + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Perfil </strong>" + Data[i].LvlPerfil + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Usuario: </strong>" + Data[i].Usuario + "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>FechaIngreso: </strong>" + Data[i].FechaIngreso + "</div>";
//        CodigoHTMLUsuarios += "</div>";

//        //  CodigoHTMLUsuarios += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
//        CodigoHTMLUsuarios += "</div>";
//        CodigoHTMLUsuarios += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
//        CodigoHTMLUsuarios += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
//        CodigoHTMLUsuarios += "<button class='btn btn-danger' onclick='EliminarUsuario(" + Data[i].IdUsuarios + ",this)' ><i class='fas fa-eraser'></i></button>";
//        CodigoHTMLUsuarios += "<button class='btn btn-success' onclick='abrirModalBloqueado(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#ModalBloqueado'><i class='fas fa-window-restore list__img'></i></button> ";
//        CodigoHTMLUsuarios += "</div>";
//        CodigoHTMLUsuarios += "</div>";
//        CodigoHTMLUsuarios += "</div>";
//        CodigoHTMLUsuarios += "</div>";
//        CodigoHTMLUsuarios += "</div>";
//        CodigoHTMLUsuarios += "</div>";
//    }
//    CtrlBonis.innerHTML = CodigoHTMLUsuarios;
//}


//CrearAcordeonUsuarios();

////Crea el acordeón e inserta (los registros de la base de datos)
//function CrearAcordeonUsuarios() {
//    $.get("/Usuario/ConsultaUsuarios", function (Data) {
//        //Accordeon(DatosProveedor, document.getElementById("accordion"));
//        AcordeonUsuarios(Data);
//    });
//}

//function AcordeonUsuarios(Data) {
//    var CodigoHTMLUsuarios = "";
//    CodigoHTMLUsuarios += "<table id='tablas' class='table table table-sm' >";
//    CodigoHTMLUsuarios += " <thead class='thead-dark'><tr><th>CURP</th><th>Nombre</th><th>Apellido Paterno</th><th>Acción</thead>";
//    CodigoHTMLUsuarios += "<tbody>";
//    for (var i = 0; i < Data.length; i++) {
//        CodigoHTMLUsuarios += "<tr>";
//        CodigoHTMLUsuarios += "<td>" + Data[i].CURP + "</td>";
//        CodigoHTMLUsuarios += "<td>" + Data[i].Nombre + "</td>";
//        CodigoHTMLUsuarios += "<td>" + Data[i].ApellidosP + "</td>";
//        CodigoHTMLUsuarios += "<td>";

//        CodigoHTMLUsuarios += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
//        CodigoHTMLUsuarios += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
//        CodigoHTMLUsuarios += "<button class='btn btn-danger' onclick='EliminarUsuario(" + Data[i].IdUsuarios + ",this)' ><i class='fas fa-eraser'></i></button>";
//        CodigoHTMLUsuarios += "<button class='btn btn-success' onclick='abrirModalBloqueado(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#ModalBloqueado'><i class='fas fa-window-restore list__img'></i></button> ";
//        CodigoHTMLUsuarios += "</td>";
//        CodigoHTMLUsuarios += "</tr>";
//    }

//    CodigoHTMLUsuarios += "</tbody>";
//    CodigoHTMLUsuarios += "</table>";
//    document.getElementById("tablaPerfiles").innerHTML = CodigoHTMLUsuarios;
//}


ConsultaUsuarios();
function ConsultaUsuarios() {
    $.get("/Usuario/ConsultaUsuarios", function (Data) {
        CrearTablaUsuarios(Data);
    }
    );
    //Cargar las opciones de asignación en el bombo
    $.get("/Usuario/Asignasion", function (DatosAsignasion) {
        if (DatosAsignasion.length !== 0) {
            llenarCombo(DatosAsignasion, document.getElementById("cmbAsignacion"));
        } else {
            alert("No hay datos en la tabla Asignasión.");
        }
    });

    //Cargar el combo bloqueado
    $.get("/Usuario/Asignasion", function (DatosAsignasion) {
        if (DatosAsignasion.length !== 0) {
            llenarCombo(DatosAsignasion, document.getElementById("cmbAsignacionBloqueado"));
        } else {
            alert("No hay datos en la tabla Asignasión.");
        }
    });

}


function CrearTablaUsuarios(Data) {
    var CodigoHtmlTablaUsuarios = "";
    CodigoHtmlTablaUsuarios += "<table id='tablas' class='table table table-sm' >";
    CodigoHtmlTablaUsuarios += " <thead class='thead-dark'><tr><th>CURP</th><th>Nombre</th><th>Apellido Paterno</th><th>Apellido Materno</th><th>Teléfono</th><th>Acción</thead>";
    CodigoHtmlTablaUsuarios += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaUsuarios += "<tr>";
        CodigoHtmlTablaUsuarios += "<td>" + Data[i].CURP + "</td>";
        CodigoHtmlTablaUsuarios += "<td>" + Data[i].Nombre + "</td>";
        CodigoHtmlTablaUsuarios += "<td>" + Data[i].ApellidosP + "</td>";
        CodigoHtmlTablaUsuarios += "<td>" + Data[i].ApellidosM + "</td>";
        CodigoHtmlTablaUsuarios += "<td>" + Data[i].Telefono + "</td>";

        CodigoHtmlTablaUsuarios += "<td>";
        CodigoHtmlTablaUsuarios += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaUsuarios += "<button class='btn btn-danger' onclick='EliminarUsuario(" + Data[i].IdUsuarios + ",this)'><i class='fas fa-eraser'></i></button>";
        CodigoHtmlTablaUsuarios += "<button class='btn btn-success' onclick='abrirModalBloqueado(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#ModalBloqueado'><i class='fas fa-window-restore list__img'></i></button> ";
        CodigoHtmlTablaUsuarios += "</td>";
        CodigoHtmlTablaUsuarios += "</tr>";
    }
    CodigoHtmlTablaUsuarios += "</tbody>";
    CodigoHtmlTablaUsuarios += "</table>";
    document.getElementById("tablaUsuarios").innerHTML = CodigoHtmlTablaUsuarios;
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
    //$.get("/GLOBAL/BDEstado", function (data) {
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

var Asigna = document.getElementById("cmbAsignacion");
Asigna.addEventListener("change", function () {
    Sitio(Asigna.value, 0);
});


//(SITIO)Opciones según la selección
function Sitio(IDAsignacion, IDSitio) {
       //Mostrar la opcion oficina al seleccionar la opcion 3(Oficina)
    if (IDAsignacion == 3) {
        let DatosOficina = [{ "ID": 1, "Nombre": "Oficina" }];
        llenarCombo(DatosOficina, document.getElementById("cmbSitio"));
        document.getElementById("cmbSitio").value = IDSitio;
    }
       //Mostrar todas las superviciones registradas al seleccionar la opcion 2(Supervisión)
    else if (IDAsignacion == 2) {
        $.get("/GLOBAL/BDSupervision", function (DatosSupervisiones) {
            if (DatosSupervisiones.length !== 0) {
                llenarCombo(DatosSupervisiones, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
        //Mostrar todas las tiendas registradas al seleccionar la opcion 1(Tienda)
    else if (IDAsignacion == 1) {
        $.get("/GLOBAL/BDTiendaSuper", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }

}




//(SITIO BLOQUEADO)Visualizar las opciones según la selección
function SitioBloqueado(IDAsignacion, IDSitio) {
    //Mostrar la opcion oficina al seleccionar la opcion 3(Oficina)
    if (IDAsignacion == 3) {
        let DatosOficina = [{ "ID": 1, "Nombre": "Oficina" }];
        llenarCombo(DatosOficina, document.getElementById("cmbSitioBloqueado"));
        document.getElementById("cmbSitioBloqueado").value = IDSitio;
    }
    //Mostrar todas las superviciones registradas al seleccionar la opcion 2(Supervisión)
    else if (IDAsignacion == 2) {
        $.get("/GLOBAL/BDSupervision", function (DatosSupervisiones) {
            if (DatosSupervisiones.length !== 0) {
                llenarCombo(DatosSupervisiones, document.getElementById("cmbSitioBloqueado"));
                document.getElementById("cmbSitioBloqueado").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
    //Mostrar todas las tiendas registradas al seleccionar la opcion 1(Tienda)
    else if (IDAsignacion == 1) {
        $.get("/GLOBAL/BDTiendaSuper", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitioBloqueado"));
                document.getElementById("cmbSitioBloqueado").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }


}


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
        sessionStorage.setItem('IdUsuarios', '0');
    }
    else {

        $.get("/Usuario/ConsultaUsuario/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdUsuarios', Data[0].IdUsuarios);
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

            document.getElementById("cmbAsignacion").value = Data[0].IdAsignacion;
            Sitio(Data[0].IdAsignacion, Data[0].IdSitio);
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

                var IdAsignacion = document.getElementById("cmbAsignacion").value;
                var TempAsignacion = document.getElementById("cmbAsignacion");
                var NombreAsignacion = TempAsignacion.options[TempAsignacion.selectedIndex].text;

                var IdSitio = document.getElementById("cmbSitio").value;
                var TempSitio = document.getElementById("cmbSitio");
                var NombreSitio = TempSitio.options[TempSitio.selectedIndex].text;

                //var IdAsignacion = document.getElementById("cmbAsignacion").value;
                var IdSitio = document.getElementById("cmbSitio").value;
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
                frm.append("IdAsignacion", IdAsignacion);
                frm.append("NombreAsignacion", NombreAsignacion);
                frm.append("IdSitio", IdSitio);
                frm.append("NombreSitio", NombreSitio);
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
                            alert("Ocurrió un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe el Usuario");
                        }
                        else {
                            alert("Se ejecutó correctamente");
                            ConsultaUsuarios();
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
                    'Se eliminó correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                ConsultaUsuarios();
            } else {
                alert("Ocurrió un error");
            }
        });
    }
}


//    //ModalBloqueado//     //


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
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdUsuarioBloqueado', Data[0].IdUsuarios);     //Variable de sesión

            //document.getElementById("cmbArBloqueado").value = Data[0].NArea;

            document.getElementById("TxtCurpBloqueado").value = Data[0].CURP;
            document.getElementById("TxtNombreBloqueado").value = Data[0].Nombre;
            document.getElementById("TxtApellidoPaternoBloqueado").value = Data[0].ApellidosP;
            document.getElementById("TxtApellidoMaternoBloqueado").value = Data[0].ApellidosM;
            document.getElementById("TxtFechaNBloqueado").value = Data[0].FechaDeNacimiento;
            document.getElementById("TxtRFCBloqueado").value = Data[0].RFC;
            document.getElementById("cmbEstadoBloqueado").value = Data[0].IdEstado;
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
            document.getElementById("TxtCorreoBloqueado").value = Data[0].Correo;
            document.getElementById("cmbNSSBloqueado").value = Data[0].NoSS;
            document.getElementById("TxtTelBloqueado").value = Data[0].Telefono;
            document.getElementById("cmbArBloqueado").value = Data[0].NArea;
            $.get("/GLOBAL/BDSubAreas/?IDA=" + Data[0].IdArea, function (Subareas) {
                llenarCombo(Subareas, document.getElementById("cmbSubAreaBloqueado"));
                document.getElementById("cmbSubAreaBloqueado").value = Data[0].IdSubArea;
            });

            document.getElementById("TxtPerfilBloqueado").value = Data[0].LvlPerfil;
            document.getElementById("TxtUsuarioBloqueado").value = Data[0].Usuario;
            document.getElementById("PBFotoBloqueado").src = "data:image/png;base64," + Data[0].FOTOMOSTRAR;
            //document.getElementById("Txtpassword").value = Data[0].Password;
            document.getElementById("cmbAsignacionBloqueado").value = Data[0].IdAsignacion;
            SitioBloqueado(Data[0].IdAsignacion, Data[0].IdSitio);
        });
    }
}







//function Usuario(id) {

//    if (id == dialogo1) {
//        (function () {
//            var template = null
//            $('.modal').on('show.bs.modal', function (event) {
//                if (template == null) {//Valores nulos
//                    template = $(this).html()

//                } else {
//                    $(this).html(template)
//                    //Recetear el formulario iniciando del paso 1
//                    $(document).ready(function () {
//                        var current = 1, current_step, next_step, steps;
//                        steps = $("fieldset").length;
//                        $(".next").click(function () {
//                            current_step = $(this).parent();
//                            next_step = $(this).parent().next();
//                            next_step.show();
//                            current_step.hide();
//                            setProgressBar(++current);
//                        });
//                        $(".previous").click(function () {
//                            current_step = $(this).parent();
//                            next_step = $(this).parent().prev();
//                            next_step.show();
//                            current_step.hide();
//                            setProgressBar(--current);
//                        });
//                        setProgressBar(current);
//                        // Cambiar la acción de la barra de progreso
//                        function setProgressBar(curStep) {
//                            var percent = parseFloat(100 / steps) * curStep;
//                            percent = percent.toFixed();
//                            $(".progress-bar")
//                                .css("width", percent + "%")
//                                .html(percent + "%");
//                        }
//                        //Termina Recetear el formulariode usuarios
//                    });
//                }

//            })
//        })()

//    }
//}