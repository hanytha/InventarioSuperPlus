var imagen64;
BloquearCTRL();
CrearAcordeonExistencias();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonExistencias() {
    $.get("/Existencias/ConsultaExistencias", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonExistencias(Data, document.getElementById("accordion"));
    });
    imagen64 = getBase64Image(document.getElementById("PBFoto"));
}
function AcordeonExistencias(Data, CtrlExistencia) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdExistencia + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdExistencia + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdExistencia + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].NoCompra + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdExistencia + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].FechaDeIngreso + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].ExitenciaInicial + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].ExitenciaActual + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Coste + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].TipoDeExistencia + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].Logo + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdExistencia + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarExistencia(" + Data[i].IdExistencia + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlExistencia.innerHTML = CodigoHTMLAreas;
}

//Logo
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
        sessionStorage.setItem('IDExti', '0');  
    }
    else {

        $.get("/Existencias/ConsultaExistencia/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDExti', Data[0].IdExistencia);
            document.getElementById("TxtNuCompra").value = Data[0].NoCompra;
            document.getElementById("TxtExitenciaInicial").value = Data[0].ExitenciaInicial;
            document.getElementById("TxtExistenciaActual").value = Data[0].ExitenciaActual;
            document.getElementById("TxtTipoDeExistencia").value = Data[0].TipoDeExistencia;
            document.getElementById("TxtCosto").value = Data[0].Coste;
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
    }
    //Limpiar las imágenes
    var controlesImg = document.getElementsByClassName("limpiarImg");
    for (var i = 0; i < controlesImg.length; i++) {
        controlesImg[i].value = null;
    }
}
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

//Guarda los cambios y altas de los proveedores
function GuardarExistencia() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdExistencia = sessionStorage.getItem('IDExti');
            var FechaDeIngreso = document.getElementById("TxtFechaIngreso").value;
            var NoCompra = document.getElementById("TxtNuCompra").value;
            var ExitenciaInicial = document.getElementById("TxtExitenciaInicial").value;
            var ExitenciaActual = document.getElementById("TxtExistenciaActual").value;
            var TipoDeExistencia = document.getElementById("TxtTipoDeExistencia").value;
            var Coste = document.getElementById("TxtCosto").value;
            var Logo = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");  ///////////-------->
            if (Logo.endsWith('png')) {
                Logo = imagen64.replace("data:image/png;base64,", "");
            }
            var frm = new FormData();
            frm.append("IdExistencia", IdExistencia);
            frm.append("FechaDeIngreso", FechaDeIngreso);
            frm.append("NoCompra", NoCompra);
            frm.append("ExitenciaInicial", ExitenciaInicial);
            frm.append("ExitenciaActual", ExitenciaActual);
            frm.append("TipoDeExistencia", TipoDeExistencia);
            frm.append("Coste", Coste);
            frm.append("cadF", Logo);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Existencias/GuardarExistencia",
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
                        CrearAcordeonExistencias();
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
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");

        }
    }
    return exito;
}
//"Elimina" el área cambia el Estatus
function EliminarExistencia(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Existencias/EliminarExistencia/?Id=" + id, function (DatoExistencia) {
            if (DatoExistencia == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonExistencias();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}
