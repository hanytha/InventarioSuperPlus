LlenarCMBPrincipal();
BloquearCTRL();
CrearAcordeonPedidosInt();
function CrearAcordeonPedidosInt() {
    $.get("/Pedidosint/ConsultaPedidosInternos", function (IncidenciasArea) {
        AcordeonPedidosInt(IncidenciasArea, document.getElementById("accordion"));
    });
}

//Crea la información basica de las insidencias
function AcordeonPedidosInt(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].IdPedidosInternos + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].IdPedidosInternos + ");' data-toggle='collapse' data-target='#collapse" + data[i].IdPedidosInternos + "' aria-expanded='false' aria-controls='collapse" + data[i].IdPedidosExternos + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + data[i].NumeroPedido + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].IdPedidosInternos + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Articulo: </strong>" + data[i].Articulo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Cantidad aprobada: </strong>" + data[i].CantidadAprobada + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Tipo: </strong>" + data[i].Tipo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Cantidad solicitada: </strong>" + data[i].CantidadSolicitada + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
       
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Unidad De Medida: </strong>" + data[i].UnidadDeMedida + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Tienda: </strong>" + data[i].Tienda + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Marca: </strong>" + data[i].Marca + "</div>";
        CodHtml += "</div >";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + data[i].IdPedidosInternos + "," + data[i].IdPedidosInternos + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarPedidoInterno(" + data[i].IdPedidosInternos + "," + data[i].IdPedidosInternos + ",this)'><i class='fas fa-eraser'></i></button>";
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


function LlenarCMBPrincipal() {
    $.get("/GLOBAL/BDArticulosEmpresa", function (data) {
        llenarCombo(data, document.getElementById("cmbArticulo"));
    });
    //$.get("/GLOBAL/BDUnidadesMedida", function (data) {
    //    llenarCombo(data, document.getElementById("cmbUnidadDeMedida"));
    //});

    //$.get("/GLOBAL/BDMarcas", function (data) {
    //    llenarCombo(data, document.getElementById("cmbMarca"));
    //});
    $.get("/GLOBAL/BDTienda", function (data) {
        llenarCombo(data, document.getElementById("cmbTipoTienda"));
    });

}


var IDArt = document.getElementById("cmbArticulo");
IDArt.addEventListener("change", function () {
    $.get("/GLOBAL/BDUnidad/?IDArt=" + IDArt.value, function (data) {
        llenarCombo(data, document.getElementById("cmbUnidadDeMedida"));
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
        sessionStorage.setItem('IdPedidosInternos', 0);
    }
    else {
        $.get("/Pedidosint/ConsultaPedidoInterno/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdPedidosInternos', Data[0].IdPedidosInternos);     //Variable de sesión
            document.getElementById("TxtFechaIngreso").value = Data[0].Fecha;
            document.getElementById("TxtNumeroPedido").value = Data[0].NumeroPedido;
            document.getElementById("TxtCantidadSolicitada").value = Data[0].CantidadSolicitada;
            document.getElementById("TxtCantidadAprobada").value = Data[0].CantidadAprobada;
            document.getElementById("TxtTipo").value = Data[0].Tipo;
            //document.getElementById("cmbUnidadDeMedida").value = Data[0].IdUnidadDeMedida;
            //document.getElementById("cmbMarca").value = Data[0].IdMarca;
            document.getElementById("cmbTipoTienda").value = Data[0].IdTienda;
            document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            $.get("/GLOBAL/BDUnidad/?IDArt=" + Data[0].IdUnidadDeMedida, function (UnidadDeMedida) {
                llenarCombo(UnidadDeMedida, document.getElementById("cmbUnidadDeMedida"));
                document.getElementById("cmbUnidadDeMedida").value = Data[0].IdUnidadDeMedida;
            });
     
        });
    }
}

//Guarda los cambios y altas de los proveedores
function GuardarPedidoInterno() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdPedidosInternos = sessionStorage.getItem('IdPedidosInternos');
            var Fecha = document.getElementById("TxtFechaIngreso").value;
            var NumeroPedido = document.getElementById("TxtNumeroPedido").value;
            var CantidadSolicitada = document.getElementById("TxtCantidadSolicitada").value;
            var CantidadAprobada = document.getElementById("TxtCantidadAprobada").value;
            var Tipo = document.getElementById("TxtTipo").value;
            var IdUnidadDeMedida = document.getElementById("cmbUnidadDeMedida").value;
            var TempUnidadDeMedida = document.getElementById("cmbUnidadDeMedida");
            var UnidadDeMedida = TempUnidadDeMedida.options[TempUnidadDeMedida.selectedIndex].text;
            var IdMarca = document.getElementById("cmbMarca").value;
            var TempMarca = document.getElementById("cmbMarca");
            var Marca = TempMarca.options[TempMarca.selectedIndex].text;
            var IdTienda = document.getElementById("cmbTipoTienda").value;
            var TempTienda = document.getElementById("cmbTipoTienda");
            var Tienda = TempTienda.options[TempTienda.selectedIndex].text;
            var IdArticulo = document.getElementById("cmbArticulo").value;
            var TempArticulo = document.getElementById("cmbArticulo");
            var Articulo = TempArticulo.options[TempArticulo.selectedIndex].text;
            var frm = new FormData();
            frm.append("IdPedidosInternos", IdPedidosInternos);
            frm.append("Fecha", Fecha);
            frm.append("NumeroPedido", NumeroPedido);
            frm.append("CantidadSolicitada", CantidadSolicitada);
            frm.append("CantidadAprobada", CantidadAprobada);
            frm.append("Tipo", Tipo);
            frm.append("IdUnidadDeMedida", IdUnidadDeMedida);
            frm.append("UnidadDeMedida", UnidadDeMedida);
            frm.append("IdMarca", IdMarca);
            frm.append("Marca", Marca);
            frm.append("IdTienda", IdTienda);
            frm.append("Tienda", Tienda);
            frm.append("IdArticulo", IdArticulo);
            frm.append("Articulo", Articulo);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Pedidosint/GuardarPedidoInterno",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el pedido");
                    }
                    else {
                        alert("Se ejecutó correctamente");
                        CrearAcordeonPedidosInt();
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
function EliminarPedidoInterno(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Pedidosint/EliminarPedidoInterno/?Id=" + id, function (DatoPedidosInt) {
            if (DatoPedidosInt == 1) {
                alert("Se eliminó correctamente");
                CrearAcordeonPedidosInt();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}
