LlenarCMBPrincipal();
BloquearCTRL();
CrearAcordeonPedidosExt();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonPedidosExt() {
    $.get("/Pedidosext/ConsultaPedidosExternos", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonPedidosExt(Data, document.getElementById("accordion"));
    });
}
function AcordeonPedidosExt(Data, CtrlPedidosInt) {
    var CodigoHTMLPagina = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLPagina += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLPagina += "<div class='card m-b-0 border-top'>";
        } //Obtener los registros de la base de datos para mostrarlo en el accordión
        CodigoHTMLPagina += "<div class='card-header' id='heading" + Data[i].IdPedidosExternos + "'>";
        CodigoHTMLPagina += "<h5 class='mb-0'>";
        CodigoHTMLPagina += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdPedidosExternos + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdPedidosExternos + "' class='collapsed'>";
        CodigoHTMLPagina += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLPagina += "<span >" + Data[i].NumeroPedido + "</span>";
        CodigoHTMLPagina += "</a>";
        CodigoHTMLPagina += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLPagina += "<div id='collapse" + Data[i].IdPedidosExternos + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLPagina += "<div class='card-body'>";
        CodigoHTMLPagina += "<div class='row'>";
        CodigoHTMLPagina += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>CantidadSolicitada: </strong>" + Data[i].CantidadSolicitada + "</div>";

        CodigoHTMLPagina += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UnidadDeMedida: </strong>" + Data[i].UnidadDeMedida + "</div>";
        CodigoHTMLPagina += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Marca: </strong>" + Data[i].Marca + "</div>";
        CodigoHTMLPagina += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Provedor: </strong>" + Data[i].Proveedor + "</div>";
        CodigoHTMLPagina += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Articulo: </strong>" + Data[i].Articulo + "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "<div class='row'>";
        CodigoHTMLPagina += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Fecha: </strong>" + Data[i].Fecha + "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLPagina += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdPedidosExternos + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHTMLPagina += "<button class='btn btn-danger' onclick='EliminarPedidoExterno(" + Data[i].IdPedidosExternos + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
    }
    CtrlPedidosInt.innerHTML = CodigoHTMLPagina;
}
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
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
            document.getElementById("cmbUnidadDeMedida").value = Data[0].IdUnidadDeMedida;
            document.getElementById("cmbMarca").value = Data[0].IdMarca;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
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
                        alert("Ocurrio un error");
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


function LlenarCMBPrincipal() {
    $.get("/GLOBAL/BDArticulosxNombreEmpresa", function (data) {
        llenarCombo(data, document.getElementById("cmbArticulo"));
    });
    $.get("/GLOBAL/BDUnidadesMedida", function (data) {
        llenarCombo(data, document.getElementById("cmbUnidadDeMedida"));
    });

    $.get("/GLOBAL/BDMarcas", function (data) {
        llenarCombo(data, document.getElementById("cmbMarca"));
    });
    $.get("/GLOBAL/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
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

