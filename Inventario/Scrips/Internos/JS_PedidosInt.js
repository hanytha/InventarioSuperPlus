LlenarCMBPrincipal();
BloquearCTRL();
//Tabla

//ConsultaUnidadDeMedida();
//function ConsultaUnidadDeMedida() {
//    $.get("/Pedidosint/ConsultaPedidosInternos", function (Data) {
//        CrearTablaUnidadDeMedida(Data);
//    }
//    );
//}
//function CrearTablaUnidadDeMedida(Data) {
//    var CodigoHtmlTablaCompra = "";
//    CodigoHtmlTablaCompra += "<table id='tablas' class='table table table-sm'>";
//    CodigoHtmlTablaCompra += "<thead class='thead-dark'><tr><th>Número de pedido</th><th>Artículo</th><th>Cantidad solicitada</th><th>Tipo</th><th>Proveedor</th><th>Acción</thead>";
//    CodigoHtmlTablaCompra += "<tbody>";
//    for (var i = 0; i < Data.length; i++) {
//        CodigoHtmlTablaCompra += "<tr>";
//        CodigoHtmlTablaCompra += "<td>" + Data[i].NumeroPedido + "</td>";
//        CodigoHtmlTablaCompra += "<td>" + Data[i].Articulo + "</td>";
//        CodigoHtmlTablaCompra += "<td>" + Data[i].CantidadSolicitada + "</td>";
//        CodigoHtmlTablaCompra += "<td>" + Data[i].Tienda + "</td>";
//        CodigoHtmlTablaCompra += "<td>" + Data[i].Proveedor + "</td>";
//        CodigoHtmlTablaCompra += "<td>";
//        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdPedidosInternos + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
//        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarUnidadDeMedida(" + Data[i].IdPedidosInternos + ",this)'><i class='fas fa-eraser'></i></button>";

//        CodigoHtmlTablaCompra += "</td>";
//        CodigoHtmlTablaCompra += "</tr>";
//    }
//    CodigoHtmlTablaCompra += "</tbody>";
//    CodigoHtmlTablaCompra += "</table>";
//    document.getElementById("tabla").innerHTML = CodigoHtmlTablaCompra;
//}


ConsultaPedidos();
function ConsultaPedidos() {
    $.get("/Pedidosint/ConsultaPedidosInternos", function (Data) {
        CrearTablaPedidos(Data);
    }
    );
}
function CrearTablaPedidos(Data) {
    var CodigoHtmlTablaPedidos = ""; 
    CodigoHtmlTablaPedidos += "<div class='input-group mb-3'>";
    
    CodigoHtmlTablaPedidos += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>";
    CodigoHtmlTablaPedidos += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPedidos += "</div>";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>ID</th>";
    CodigoHtmlTablaPedidos += "<th>Número_Pedido</th>";
    CodigoHtmlTablaPedidos += "<th>Artículo</th>";
    CodigoHtmlTablaPedidos += "<th>Fecha</th>";
    CodigoHtmlTablaPedidos += "<th>Acción</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";
    for (var i = 0; i < Data.length; i++) {

        CodigoHtmlTablaPedidos += "<tr>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].IdPedidosInternos + "</td>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].NumeroPedido + "</td>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Articulo + "</td>"
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Fecha + "</td>"
        CodigoHtmlTablaPedidos += "<td><button class='btn btn-primary'  data-title='Ver pedido' onclick='VerPedido(" + Data[i].NumeroPedido + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='fas fa-window-restore list__img'></i></i></button></td>";
        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>";
    CodigoHtmlTablaPedidos += "</table>";
    document.getElementById("TablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
}


//ConsultaPedidos();
//function ConsultaPedidos() {
//    $.get("/Pedidosint/ConsultaPedidosInternos", function (Data) {
//        CrearTablaPedidos(Data);
//    }
//    );
//}
//function CrearTablaPedidos(Data) {
//    var CodigoHtmlTablaPedidos = "";
//    CodigoHtmlTablaPedidos += "<div class='input-group mb-3'>";
//    CodigoHtmlTablaPedidos += "<input  class='form-control col-md-3 light-table-filter' data-table='order-table' type='text' placeholder='Search..'>";
//    CodigoHtmlTablaPedidos += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
//    CodigoHtmlTablaPedidos += "</div>";
//    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
//    CodigoHtmlTablaPedidos += "<table class='table-primary table table-bordered order-table'>";
//    CodigoHtmlTablaPedidos += "<thead>";
//    CodigoHtmlTablaPedidos += "<tr>";
//    CodigoHtmlTablaPedidos += "<th>ID</th>";
//    CodigoHtmlTablaPedidos += "<th>Número_Pedido</th>";
//    CodigoHtmlTablaPedidos += "<th>Proveedor</th>";
//    CodigoHtmlTablaPedidos += "<th>Fecha</th>";
//    CodigoHtmlTablaPedidos += "<th>Acción</th>";
//    CodigoHtmlTablaPedidos += "</tr>";
//    CodigoHtmlTablaPedidos += "</thead>";
//    CodigoHtmlTablaPedidos += "<tbody>";
//    for (var i = 0; i < Data.length; i++) {

//        CodigoHtmlTablaPedidos += "<tr>"
//        CodigoHtmlTablaPedidos += "<td>" + Data[i].IdPedidosInternos + "</td>"
//        CodigoHtmlTablaPedidos += "<td>" + Data[i].NumeroPedido + "</td>"
//        CodigoHtmlTablaPedidos += "<td>" + Data[i].Proveedor + "</td>"
//        CodigoHtmlTablaPedidos += "<td>" + Data[i].Fecha + "</td>"
//        CodigoHtmlTablaPedidos += "<td><button class='btn btn-primary'  data-title='Ver pedido' onclick='VerPedido(" + Data[i].NumeroPedido + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='fas fa-window-restore list__img'></i></i></button></td>";
//        CodigoHtmlTablaPedidos += "</tr>";
//    }
//    CodigoHtmlTablaPedidos += "</tbody>";
//    CodigoHtmlTablaPedidos += "</table>";
//    document.getElementById("TablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
//}


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
                        alert("Ocurrioó un error");
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
                alert("Ocurrió un error");
            }
        });
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

}


