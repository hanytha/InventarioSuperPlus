//LlenarCMBPrincipal();
LlenarCMBPrin();
BloquearCTRL();

CrearAcordeonPedidosExt();
function CrearAcordeonPedidosExt() {
    $.get("/Pedidosext/ConsultaPedidosExternos", function (IncidenciasArea) {
        AcordeonPedidosExt(IncidenciasArea, document.getElementById("accordion"));
    });
}

//Crea la información basica de las insidencias
function AcordeonPedidosExt(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].IdPedidosExternos + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].IdPedidosExternos + ");' data-toggle='collapse' data-target='#collapse" + data[i].IdPedidosExternos + "' aria-expanded='false' aria-controls='collapse" + data[i].IdPedidosExternos + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + data[i].NumeroPedido + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].IdPedidosExternos + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Cantidad solicitada: </strong>" + data[i].CantidadSolicitada + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Unidad de Medida: </strong>" + data[i].UnidadDeMedida + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Articulo: </strong>" + data[i].Articulo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Marca: </strong>" + data[i].Marca + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Proveedor: </strong>" + data[i].Proveedor + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Fecha: </strong>" + data[i].Fecha + "</div>";
        CodHtml += "</div >";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + data[i].IdPedidosExternos + "," + data[i].IdPedidosExternos + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarPedidoExterno(" + data[i].IdPedidosExternos + "," + data[i].IdPedidosExternos + ",this)'><i class='fas fa-eraser'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
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
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdPedidosExternos', 0);
    }
    else {
        $.get("/Pedidosext/ConsultaPedidoExterno/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdPedidosExternos', Data[0].IdPedidosExternos);     //Variable de sesión
            document.getElementById("TxtFechaIngreso").value = Data[0].Fecha;
            document.getElementById("TxtNumeroPedido").value = Data[0].NumeroPedido;
            document.getElementById("TxtCantidadSolicitada").value = Data[0].CantidadSolicitada;
            //document.getElementById("cmbUnidadDeMedida").value = Data[0].IdUnidadDeMedida;
            //document.getElementById("cmbMarca").value = Data[0].IdMarca;
            //document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;

            $.get("/GLOBAL/BDArt/?IDP=" + Data[0].IdProveedor, function (Proveedor) {
                llenarCombo(Proveedor, document.getElementById("cmbArticulo"));
                document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            });
            $.get("/GLOBAL/BDUnidadM/?IDM=" + Data[0].IdArticulo, function (Articulos) {
                llenarCombo(Articulos, document.getElementById("cmbUnidadDeMedida"));
                document.getElementById("cmbUnidadDeMedida").value = Data[0].IdUnidadDeMedida;
            });

            $.get("/GLOBAL/BDMarca/?IDAR=" + Data[0].IdArticulo, function (Articulos) {
                llenarCombo(Articulos, document.getElementById("cmbMarca"));
                document.getElementById("cmbMarca").value = Data[0].IdMarca;
            });
        });
    }
}

//Guarda los cambios y altas de los proveedores
function GuardarPedidoExterno() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdPedidosExternos = sessionStorage.getItem('IdPedidosExternos');
            var Fecha = document.getElementById("TxtFechaIngreso").value;
            var NumeroPedido = document.getElementById("TxtNumeroPedido").value;
            var CantidadSolicitada = document.getElementById("TxtCantidadSolicitada").value;
            var IdArticulo = document.getElementById("cmbArticulo").value;
            var TempArticulo = document.getElementById("cmbArticulo");
            var Articulo = TempArticulo.options[TempArticulo.selectedIndex].text;
            var IdUnidadDeMedida = document.getElementById("cmbUnidadDeMedida").value;
            var TempUnidadDeMedida = document.getElementById("cmbUnidadDeMedida");
            var UnidadDeMedida = TempUnidadDeMedida.options[TempUnidadDeMedida.selectedIndex].text;
            var IdMarca = document.getElementById("cmbMarca").value;
            var TempMarca = document.getElementById("cmbMarca");
            var Marca = TempMarca.options[TempMarca.selectedIndex].text;
            var IdProveedor = document.getElementById("cmbProveedor").value;
            var TempProveedor = document.getElementById("cmbProveedor");
            var Proveedor = TempProveedor.options[TempProveedor.selectedIndex].text;

            var frm = new FormData();
            frm.append("IdPedidosExternos", IdPedidosExternos);
            frm.append("Fecha", Fecha);
            frm.append("NumeroPedido", NumeroPedido);
            frm.append("CantidadSolicitada", CantidadSolicitada);
            frm.append("IdArticulo", IdArticulo);
            frm.append("Articulo", Articulo);
            frm.append("IdUnidadDeMedida", IdUnidadDeMedida);
            frm.append("UnidadDeMedida", UnidadDeMedida);
            frm.append("IdMarca", IdMarca);
            frm.append("Marca", Marca);
            frm.append("IdProveedor", IdProveedor);
            frm.append("Proveedor", Proveedor);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Pedidosext/GuardarPedidoExterno",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data == 0) {
                        alert("Ocurrió un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el pedido");
                    }
                    else {
                        alert("Se ejecutó correctamente");
                        CrearAcordeonPedidosExt();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
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
function EliminarPedidoExterno(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Pedidosext/EliminarPedidoExterno/?Id=" + id, function (DatoPedidosExt) {
            if (DatoPedidosExt == 1) {
                alert("Se eliminó correctamente");
                CrearAcordeonPedidosExt();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


//function LlenarCMBPrincipal() {
//    $.get("/GLOBAL/BDArticulosxNombreEmpresa", function (data) {
//        llenarCombo(data, document.getElementById("cmbArticulo"));
//    });
//    $.get("/GLOBAL/BDUnidadesMedida", function (data) {
//        llenarCombo(data, document.getElementById("cmbUnidadDeMedida"));
//    });

//    $.get("/GLOBAL/BDMarcas", function (data) {
//        llenarCombo(data, document.getElementById("cmbMarca"));
//    });
//    $.get("/GLOBAL/BDProveedor", function (data) {
//        llenarCombo(data, document.getElementById("cmbProveedor"));
//    });

//    //funcion general para llenar los select
//    function llenarCombo(data, control) {
//        var contenido = "";
//        contenido += "<option value='0'>--Seleccione--</option>";

//        for (var i = 0; i < data.length; i++) {
//            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
//        }
//        control.innerHTML = contenido;
//    }

//}

