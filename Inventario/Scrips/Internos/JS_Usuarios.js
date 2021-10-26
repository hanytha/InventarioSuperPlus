
LlenarCMBPrin();

var imagen64;
CrearAcordeonUsuarios();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonUsuarios() {
    $.get("/Usuario/ConsultaUsuarios", function (Data) {
        AcordeonUsuarios(Data, document.getElementById("accordion"));
    });
    imagen64 = getBase64Image(document.getElementById("PBFoto"));
}//Acordeón proveedores
function AcordeonUsuarios(Data, CtrlUsuarios) {
    var CodigoHTMLUsuario = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLUsuario += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLUsuario += "<div class='card m-b-0 border-top'>";
        } //Obtener los registros de la base de datos para mostrarlo en el accordión
        CodigoHTMLUsuario += "<div class='card-header' id='heading" + Data[i].IdUsuarios + "'>";
        CodigoHTMLUsuario += "<h5 class='mb-0'>";
        CodigoHTMLUsuario += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdUsuarios + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdUsuarios + "' class='collapsed'>";
        CodigoHTMLUsuario += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLUsuario += "<span >" + Data[i].CURP + "</span>";
        CodigoHTMLUsuario += "</a>";
        CodigoHTMLUsuario += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLUsuario += "<div id='collapse" + Data[i].IdUsuarios + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLUsuario += "<div class='card-body'>";
        CodigoHTMLUsuario += "<div class='row'>";
        CodigoHTMLUsuario += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre: </strong>" + Data[i].Nombre + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>ApellidosP: </strong>" + Data[i].ApellidosP + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].ApellidosM + "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "<div class='row'>";
        CodigoHTMLUsuario += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Foto: </strong>" + Data[i].Foto + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>FechaDeNacimiento: </strong>" + Data[i].FechaDeNacimiento + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Estado: </strong>" + Data[i].Estado + "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "<div class='row'>";
        CodigoHTMLUsuario += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Municipio + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + Data[i].Localidad + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>RFC: </strong>" + Data[i].RFC + "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "<div class='row'>";
        CodigoHTMLUsuario += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>NoSS: </strong>" + Data[i].NoSS + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].Correo + "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "<div class='row'>";
        CodigoHTMLUsuario += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Telefono: </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>NArea: </strong>" + Data[i].NArea + "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "<div class='row'>";
        CodigoHTMLUsuario += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>NSArea: </strong>" + Data[i].NSArea + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>LvlPerfil: </strong>" + Data[i].LvlPerfil + "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "<div class='row'>";
        CodigoHTMLUsuario += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Usuario: </strong>" + Data[i].Usuario + "</div>";
        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>FechaIngreso: </strong>" + Data[i].FechaIngreso + "</div>";

        CodigoHTMLUsuario += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Contraseña: </strong>" + Data[i].Password + "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLUsuario += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdUsuarios + ")' data-toggle='modal' data-target='#diaFoto1'><i class='fas fa-edit'></i></button>";
        CodigoHTMLUsuario += "<button class='btn btn-danger' onclick='EliminarUsuarioses(" + Data[i].IdUsuarios + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "</div>";
        CodigoHTMLUsuario += "</div>";
    }
    CtrlUsuarios.innerHTML = CodigoHTMLUsuario;
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
        sessionStorage.setItem('IdUsuarios', 0);
    }
    else {
        $.get("/Usuario/ConsultaUsr/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdUsuarios', Data[0].IdUsuarios);     //Variable de sesión
            document.getElementById("TxtCURP").value = Data[0].Nombre;
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("TxtApellidoP").value = Data[0].Nombre;
            document.getElementById("TxtApellidoM").value = Data[0].Nombre;
            document.getElementById("TxtFechaN").value = Data[0].Nombre;
            document.getElementById("TxtRFC").value = Data[0].Nombre;
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
            $.get("/GLOBAL/BDSubAreas/?IDA=" + data[0].IDArea, function (Subareas) {
                llenarCombo(Subareas, document.getElementById("cmbSubArea"));
                document.getElementById("cmbSubArea").value = data[0].IDSubArea;
            });
            document.getElementById("TxtCorreo").value = Data[0].Correo;
            document.getElementById("TxtNSS").value = Data[0].RFC;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("Txtpassword").value = data[0].Contraseña;
            document.getElementById("TxtConfirmacion").value = data[0].Contraseña;
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
    var pas2 = document.getElementById("Txtpassword").value;
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
                var Telefono = document.getElementById("Txtelefono").value;
                var FNacimiento = document.getElementById("TxtFnaci").value;
                var IdArea = document.getElementById("cmbArea").value;
                var TempNA = document.getElementById("cmbArea");
                var NombreA = TempNA.options[TempNA.selectedIndex].text;
                var IdSubArea = document.getElementById("cmbSubArea").value;
                var TempNSA = document.getElementById("cmbSubArea");
                var NombreAS = TempNSA.options[TempNSA.selectedIndex].text;
                var IdPerfil = document.getElementById("cmbPerfil").value;
                var TempPerf = document.getElementById("cmbPerfil");
                var Perfil = TempPerf.options[TempPerf.selectedIndex].text;
                var Usuario = document.getElementById("TxtUsuario").value;

                var Descripcion = document.getElementById("TxtDescripcion").value;
                var Foto = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");
                if (Foto.endsWith('png')) {
                    Foto = imagen64.replace("data:image/png;base64,", "");
                }
                var password = document.getElementById("TxtContrasena").value;
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
                frm.append("FNacimiento", FNacimiento);
                frm.append("IdArea", IdArea);
                frm.append("NombreA", NombreA);
                frm.append("IdSubArea", IdSubArea);
                frm.append("NombreAS", NombreAS);
                frm.append("IdPerfil", IdPerfil);
                frm.append("cadF", Foto);
                frm.append("Descripcion", Descripcion);
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
                            alert("Ya existe el proveedor");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            CrearAcordeonUsuarios();
                            document.getElementById("btnCancelar").click();
                        }
                    }
                });
            }
        }
    }
    else {
        alert("Ingrese nuevamente su contraseña")
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
function EliminarUsuarioses(id) {
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






