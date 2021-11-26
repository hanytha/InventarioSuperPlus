BloquearCTRL();
function CrearAcordeonSubAreas(IdPedidoSolicitado) {
    $.get("/PedidoSolicitado/ConsultasSubAreasXAreas/?idArea=" + IdPedidoSolicitado, function (Data) {
        AcordeonSubAreas(Data, document.getElementById("Acorden" + IdPedidoSolicitado));
    });
}
function AcordeonSubAreas(Data, CtrlSub) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdPedidoSolicitado + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdPedidoSolicitado + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdPedidoSolicitado + "' class='collapsed'>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'><label></label></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Articulo + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdPedidoSolicitado + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>CantidadSolicitada: </strong>" + Data[i].CantidadSolicitada + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UnidadDeMedida: </strong>" + Data[i].UnidadDeMedida + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Marca: </strong>" + Data[i].Marca + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Proveedor: </strong>" + Data[i].Proveedor + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Articulo: </strong>" + Data[i].Articulo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>NumeroPedido: </strong>" + Data[i].NumeroPedido + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";

        CodigoHTMLAreas += "<button  style='background-color:dodgerblue'  class='btn btn-success'  onclick='abrirModalSub(" + Data[i].IdPedidoSolicitado + ")' data-toggle='modal' data-target='#dialogo'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarSubarea(" + Data[i].IdPedidoSolicitado + ",this)' ><i class='fas fa-eraser'></i></button>";
        //CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlSub.innerHTML = CodigoHTMLAreas;
}

LlenarCMBPrin();
CrearAcordeonDepartamentos();
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
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdPedidosExternos + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdPedidosExternos + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdPedidosExternos + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'><label></label></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdPedidosExternos + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UNombre : </strong>" + Data[i].UNombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Correo : </strong>" + Data[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Télefono : </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Carpeta : </strong>" + Data[i].Carpeta + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdPedidosExternos + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarDepartamento(" + Data[i].IdPedidosExternos + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlAlmacen.innerHTML = CodigoHTMLAreas;
}



function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}


//llena los combosprincipales
function LlenarCMBPrin() {
    $.get("/GLOBAL/BDPro", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"), true);
    });
    //$.get("/GLOBAL/BDAreas", function (data) {
    //    llenarCombo(data, document.getElementById("cmbArea"));
    //});
    //$.get("/Usuario/ConsultaPerfiles", function (data) {
    //    llenarCombo(data, document.getElementById("cmbPerfil"));
    //});
}



var IDP = document.getElementById("cmbProveedor");
IDP.addEventListener("change", function () {
    $.get("/GLOBAL/BDArt/?IDP=" + IDP.value, function (data) {
        llenarCombo(data, document.getElementById("cmbArticulo"));
    });
});
//event Change index Articulo para llenar el combo box Unidad de medida
var IDAR = document.getElementById("cmbArticulo");
IDAR.addEventListener("change", function () {
    $.get("/GLOBAL/BDUnidadM/?IDAR=" + IDAR.value, function (data) {
        llenarCombo(data, document.getElementById("cmbUnidadDeMedida"));
    });
});


var IDART = document.getElementById("cmbArticulo");
IDART.addEventListener("change", function () {
    $.get("/GLOBAL/BDMarca/?IDART=" + IDART.value, function (data) {
        llenarCombo(data, document.getElementById("cmbMarca"));
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




//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    LimpiarCampos();
    if (id == 0) {

        sessionStorage.setItem('IdPedidosExternos', 0);

    }
    else {

        $.get("/Pedidosext/ConsultaPedidoExterno/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdPedidosExternos', Data[0].IdPedidosExternos);     //Variable de sesión
            document.getElementById("TxtFechaIngreso").value = Data[0].Fecha;
            document.getElementById("TxtNumeroPedido").value = Data[0].NumeroPedido;
            //document.getElementById("TxtCantidadSolicitada").value = Data[0].CantidadSolicitada;
            //document.getElementById("cmbUnidadDeMedida").value = Data[0].IdUnidadDeMedida;
            //document.getElementById("cmbMarca").value = Data[0].IdMarca;
            //document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;

            $.get("/GLOBAL/BDArt/?IDP=" + Data[0].IdProveedor, function (Proveedor) {
                llenarCombo(Proveedor, document.getElementById("cmbArticulo"));
                document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            });
            //$.get("/GLOBAL/BDUnidadM/?IDM=" + Data[0].IdArticulo, function (Articulos) {
            //    llenarCombo(Articulos, document.getElementById("cmbUnidadDeMedida"));
            //    document.getElementById("cmbUnidadDeMedida").value = Data[0].IdUnidadDeMedida;
            //});


            //$.get("/GLOBAL/BDMarca/?IDAR=" + Data[0].IdArticulo, function (Articulos) {
            //    llenarCombo(Articulos, document.getElementById("cmbMarca"));
            //    document.getElementById("cmbMarca").value = Data[0].IdMarca;
            //});
        
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
//-------------Scrips SUBÁREAS------------------
BloquearCTRL();
function CrearAcordeonSubAreas(IdPedidoExterno) {
    $.get("/PedidoSolicitado/ConsultasPedidos/?idPedido=" + IdPedidoExterno, function (Data) {
        AcordeonSubAreas(Data, document.getElementById("Acorden" + IdPedidoExterno));
    });
}
function AcordeonSubAreas(Data, CtrlSub) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdPedidoSolicitado + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdPedidoSolicitado + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdPedidoSolicitado + "' class='collapsed'>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'><label></label></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Articulo + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdPedidoSolicitado + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Área: </strong>" + Data[i].CantidadSolicitada + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>No de Subárea: </strong>" + Data[i].NoSubArea + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UNombre: </strong>" + Data[i].UNombre + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado1: </strong>" + Data[i].NEncargado1 + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Télefono encargado1: </strong>" + Data[i].TelefonoE1 + "</div>";
        //CodigoHTMLAreas += "</div>";
        //CodigoHTMLAreas += "<div class='row'>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo encargado1: </strong>" + Data[i].CorreoE1 + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado2: </strong>" + Data[i].NEncargado2 + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Télefono encargado2: </strong>" + Data[i].TelefonoE2 + "</div>";
        //CodigoHTMLAreas += "</div>";
        //CodigoHTMLAreas += "<div class='row'>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo encargado2: </strong>" + Data[i].CorreoE2 + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado3: </strong>" + Data[i].NEncargado3 + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Télefono encargado3: </strong>" + Data[i].TelefonoE3 + "</div>";
        //CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo encragado3: </strong>" + Data[i].CorreoE3 + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button  style='background-color:dodgerblue'  class='btn btn-success'  onclick='abrirModalSub(" + Data[i].IdPedidoSolicitado + ")' data-toggle='modal' data-target='#dialogo'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarSubarea(" + Data[i].IdPedidoSolicitado + ",this)' ><i class='fas fa-eraser'></i></button>";
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
function abrirModalSub(idSubarea, idArea) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("ObligatoriosSub");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    LimpiarCampos();
    if (idSubarea == 0) {

        sessionStorage.setItem('IDSb', idSubarea);
        document.getElementById("cmbArea").value = idArea;
    }
    else {

        $.get("/Subarea/ConsultaSubArea/?Id=" + idSubarea, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            let id = Data[0].IdSubAreas;
            sessionStorage.setItem('IDSb', Data[0].IdSubAreas);
            document.getElementById("cmbArea").value = Data[0].IdArea;
            document.getElementById("TxtNombreSub").value = Data[0].Nombre;
            document.getElementById("TxtNumero").value = Data[0].NoSubArea;
            document.getElementById("TxtUNombre").value = Data[0].UNombre;
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

//Guarda los cambios y altas de las áreas
function GuardarSubarea() {
    if (CamposObligatoriosSub("SubArea") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdSubAreas = sessionStorage.getItem('IDSb');
            var IdArea = document.getElementById("cmbArea").value;
            var TempEdo = document.getElementById("cmbArea");
            var Area = TempEdo.options[TempEdo.selectedIndex].text;
            var Nombre = document.getElementById("TxtNombreSub").value;
            var NoSubArea = document.getElementById("TxtNumero").value;
            var UNombre = document.getElementById("TxtUNombre").value;
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
            frm.append("IdArea", IdArea);
            frm.append("Area", Area);
            frm.append("Nombre", Nombre);
            frm.append("NoSubArea", NoSubArea);
            frm.append("UNombre", UNombre);
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

//limpiar campos
function LimpiarCamposSub() { 
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var controlesSLT = document.getElementsByClassName("limpiarSelect");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
    }
}

//marca los campos obligatorios
function CamposObligatoriosSub() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("ObligatoriosSub");
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




function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}


function LlenarCMBPrin() {
    $.get("/GLOBAL/BDAreas", function (data) {
        llenarCombo(data, document.getElementById("cmbArea"));
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


}