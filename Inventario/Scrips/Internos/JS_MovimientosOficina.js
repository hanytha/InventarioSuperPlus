LlenarCMCProveedores();
LlenarComboProveedores();
BloquearCTRL();
//----------Apartado de los movimientos------------//
function ConsultaArticuloComp(IDTienda) {
    if (IDTienda == 0) {
        sessionStorage.setItem('IDTienda', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaArticulos/?IDTienda=" + IDTienda, function (Data) {
            var CodigoHtmlArticuloComp = "";
            CodigoHtmlArticuloComp += "<div id='contenedor1'>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "<div class='row'>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>No. de Pedido</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Proveedor</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "</div>";
            let id = Data.id;
            let ArrayId = id.split(',');
            let NoPedido = Data.NoPedido;
            let ArrayNoPedido = NoPedido.split(',');
            let Fecha = Data.Fecha;
            let Arrayfecha = Fecha.split(',');
            let IdSitio = Data.IdSitio;
            let ArrayIdSitio = IdSitio.split(',');
            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let Proveedor = Data.Proveedor;
            let ArrayProveedor = Proveedor.split(',');
            let IdProveedor = Data.IdProveedor;
            let ArrayIdProveedor = IdProveedor.split(',');
            let IdCmpraInt = Data.IdCmpraInt;
            let ArrayIdCmpraInt = IdCmpraInt.split(',');
            for (var i = 0; i < ArrayId.length; i++) {
                CodigoHtmlArticuloComp += "<div>";
                CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayProveedor[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
                //-----------------Botón para desplegar la primera tabla-------------- 
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido
                CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayIdCmpraInt[i] + ", " + ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
                CodigoHtmlArticuloComp += "<button title='Pedido' class='btn btn-primary' onclick='VisualizarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + "," + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")'  data-toggle='modal' data-target='#VisualizarModalPedidos'><i class='fas fa-archive'></i></button>";
                CodigoHtmlArticuloComp += "</div>";
                //-------------Termina----------------------------------------
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                //------------------------Despliega primer grid-----------------------------------------------------------------------
                CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
                CodigoHtmlArticuloComp += "</div>";
            }
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "</br>";
            CodigoHtmlArticuloComp += "</br>";
            let contenedor1 = "contenedor1" + IDTienda;
            document.getElementById(contenedor1).innerHTML = CodigoHtmlArticuloComp;
        });
    }
}
function ConsultaArticuloCompra(IDTienda) {
    if (IDTienda == 0) {
        sessionStorage.setItem('IDTienda', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaArticulosAceptar/?IDTienda=" + IDTienda, function (Data) {
            var CodigoHtmlArticuloComp = "";
            CodigoHtmlArticuloComp += "<div id='contenedorAceptar'>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "<div class='row'>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>No. de Pedido</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Proveedor</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha de Ingreso</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "</div>";
            let id = Data.id;
            let ArrayId = id.split(',');
            let NoPedido = Data.NoPedido;
            let ArrayNoPedido = NoPedido.split(',');
            let Proveedor = Data.Proveedor;
            let ArrayProveedor = Proveedor.split(',');
            let Fecha = Data.Fecha;
            let Arrayfechas = Fecha.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            //El IdSitio se ocupa para conocer en qué tienda mostrar los pedidos
            let IdSitio = Data.IdSitio;
            let ArrayIdSitio = IdSitio.split(',');
            let IdCmpraInt = Data.IdCmpraInt;
            let ArrayIdCmpraInt = IdCmpraInt.split(',');
            for (var i = 0; i < ArrayId.length; i++) {
                CodigoHtmlArticuloComp += "<div>";
                CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayProveedor[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfechas[i] + "</div>";
                //-----------------Botón para desplegar la primera tabla--------------
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido
                CodigoHtmlArticuloComp += "<button title='Clic para Aceptar el pedido' class='btn btn-primary' id='hide' onclick='abrirModalAceptarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + "," + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")'  data-toggle='modal' data-target='#abrirModalAceptarPedido'><i class='fas fa-archive'></i></button>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                //------------------------Despliega primer grid-----------------------------------------------------------------------
                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
                CodigoHtmlArticuloComp += "</div>";
                //---------------------------------------Termina----------------------------------------------------------------------------
            }
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "</br>";
            CodigoHtmlArticuloComp += "</br>";
            let contenedorAceptar = "contenedorAceptar" + IDTienda;
            document.getElementById(contenedorAceptar).innerHTML = CodigoHtmlArticuloComp;
        });

    }
}

//////////////Pedidos REalizados//////////////
function ConsultaPedidosRealizados(IDTienda) {
    if (IDTienda == 0) {
        sessionStorage.setItem('IDTienda', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaArticulosVisualizarPedidos/?IDTienda=" + IDTienda, function (Data) {
            var CodigoHtmlArticuloComp = "";
            CodigoHtmlArticuloComp += "<div id='contenedorPedidos'>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "<div class='row'>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>No. de Pedido</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Proveedor</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "</div>";
            let id = Data.id;
            let ArrayId = id.split(',');
            let NoPedido = Data.NoPedido;
            let ArrayNoPedido = NoPedido.split(',');
            let fecha = Data.fecha;
            let Arrayfecha = fecha.split(',');
            let IdSitio = Data.IdSitio;
            let ArrayIdSitio = IdSitio.split(',');
            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let Proveedor = Data.Proveedor;
            let ArrayProveedor = Proveedor.split(',');
            let IdProveedor = Data.IdProveedor;
            let ArrayIdProveedor = IdProveedor.split(',');
            for (var i = 0; i < ArrayId.length; i++) {
                CodigoHtmlArticuloComp += "<div>";
                CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayProveedor[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='DesplegarPedidosInternos(" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegablePedido" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegablePedido(" + ArrayNoPedido[i] + ", " + ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>"; CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegablePedido" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
                CodigoHtmlArticuloComp += "</div>";
            }
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "</br>";
            CodigoHtmlArticuloComp += "</br>";
            let contenedorPedidosRealizados = "contenedorPedidos" + IDTienda;
            document.getElementById(contenedorPedidosRealizados).innerHTML = CodigoHtmlArticuloComp;
        });
    }
}
function mostrarBoton() {
    $('#btn-1').prop('disabled', true);
    $('#button').prop('disabled', false);
    Guardar();
    Mostrar();
}
function ocultarBoton() {

    $('#btn-1').prop('disabled', false);
    $('#button').prop('disabled', true);
}
function Mostrar() {
    $('#button').prop('disabled', false);
}
function editarModal(id) {
    LimpiarCampos();
    if (id == 0) {

    }
    else {
        $.get("/Supervision/ConsultaArticulo/?Id=" + id, function (Data) {
            document.getElementById("TxtArticulo").value = Data.Nombre;
            document.getElementById("TxtStock").value = Data.Stock;
            MovimientoModal(id);
        });
    }
}
function MovimientoModal(id) {
    $.get("/Supervision/ConsultaArticulo/?Id=" + id, function (Data) {
        if (document.getElementById("TxtCantidad") <= document.getElementById("TxtStock")) {
            let x = document.getElementById("TxtStock").value;
            let y = document.getElementById("TxtCantidad").value;
            let resultado = parseFloat(x) - parseFloat(y);
            document.getElementById("TxtStockTotal").value = resultado;
            if (document.getElementById("TxtStockTotal").value < 0) {
                Swal.fire(
                    '!',
                    'La cantidad excede al stock',
                    'alert'
                )
            }
        }
    });
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
//Bloquea los input con la clase
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
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
function LlenarComboProveedores() {
    $.get("/Supervision/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });
    $.get("/Supervision/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedorDevLider"));
    });
}
function ConsultaArt(idExist) {
    $.get("/Supervision/ConsultaArticuloModal/?id=" + idExist, function (Data) {
        document.getElementById("TxtArtDev").value = Data[0].Nombre;
        document.getElementById("TxtIdArtDev").value = Data[0].IdArticulo;

    });
}
//Obtener la fecha del sistema
function ObtenerFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaIngresoDev').value = fecha;
}
function ObtenerFechaUsado() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaIngresoUsados').value = fecha;
}
function ProvDev(idExist) {
    $.get("/Supervision/ConsultaArtDev/?Id=" + idExist, function (Data) {
        document.getElementById("cmbProveedorDevLider").value = Data[0].IdProveedor;
        document.getElementById("TxtNoPedidoDev").value = Data[0].NoPedido;
    });
}
function ExisteciaDevolucion(id) {
    $.get("/Supervision/ConsultaArticulos/?IDTienda=" + id, function (Data) {
        var cantidadExistencia = document.getElementById("TxtExistenciaActDev").value;
        document.getElementById("TxtCantidadDev").value;
        x = document.getElementById("TxtCantidadDev").value;
        var Validacion = x * 1;
        if (Validacion > cantidadExistencia) {
            Swal.fire(
                '!',
                'La cantidad excede al stock general',
                'alert'
            )
            document.getElementById("TxtCantidadDev").value = "";
        }
        else if (Validacion < 0) {
            Swal.fire(
                '!',
                'No se aceptan valores negativos',
                'alert'
            )
            document.getElementById("TxtCantidadDev").value = "";
        }
        else {
            document.getElementById("TxtCantidadDev").value = x;
        }
    });
}
function abrirModalMovimiento(IDTienda) {
    LimpiarCampos();
    if (IDTienda == 0) {
        sessionStorage.setItem('IDG', '0');
    }
    else {
        $.get("/Supervision/ConsultaArticulos/?IDTienda=" + IDTienda, function (Data) {
            document.getElementById("TxtArticuloM").value = Data[0].Articulo;
        });
        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            document.getElementById("cmbTienda").value = Data[0].Tienda;
        });

    }
}
//-------limpiar campos del Modal-formulario------------
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
function CamposObligatoriosPedidosInt() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorioPedidoInt");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "" || controlesObligatorio[i].value == "0") {
            exito = false;
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");

        }
    }
    return exito;
}
function CamposObligatorios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorioPedido");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "" || controlesObligatorio[i].value == "0") {
            exito = false;
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");
        }
    }
    return exito;
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
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
function LlenarCMCProveedores() {
    $.get("/Supervision/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });
    $.get("/Supervision/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbAceptarProveedor"));
    });
}
function CamposObligatoriosAceptar() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorioAceptar");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "" || controlesObligatorio[i].value == "0") {
            exito = false;
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");
        }
    }
    return exito;
}
function Guardar() {
    if (CamposObligatoriosAceptar() == true) {
        var IdCompraInterno = sessionStorage.getItem('IdPedido');
        var NoPedido = document.getElementById("TxtAceptarNumeroPedidoAceptar").value;
        var NoCompraProveedor = document.getElementById("TxtAceptarNumPedidoProveedor").value;
        var FechaIngreso = document.getElementById("TxtAceptarFechaIngreso").value;
        var Usuario = document.getElementById("TxtNombreUsr").value;
        var frm = new FormData();
        frm.append("IdCompraInterno", IdCompraInterno);
        frm.append("NoPedido", NoPedido);
        frm.append("NoCompraProveedor", NoCompraProveedor);
        frm.append("FechaIngreso", FechaIngreso);
        frm.append("Usuario", Usuario);
        frm.append("EstatusPedido", 1);
        $.ajax({
            type: "POST",
            url: "/Supervision/Guardar",
            data: frm,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data == 0) {
                    Swal.fire(
                        '',
                        'Ocurrió un error',
                        'danger'
                    )
                }
                else if (data == -1) {
                    Swal.fire(
                        '',
                        'Ya existe',
                        'warning'
                    )
                }
            }
        });
        ConsultaArticuloCompra();
        alert("¡¡Pedido aceptado satisfactoriamente!!");
    }
}
function CamposObligatoriosDevolucion() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorioDevolucion");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "" || controlesObligatorio[i].value == "0") {
            exito = false;
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");
        }
    }
    return exito;
}
function GuardarDevolucion() {
    if (CamposObligatoriosDevolucion() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            nuevoStock();
            alert("Los datos se guardaron correctamente");
            actualizar()
        }
    }

}
function GuardarUsados() {
    if (CamposObligatoriosUsados() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            //----------Guardar los inputs de manera individual en la Base de datos--------------------
            var cantidadUsados = document.getElementsByClassName("input-cantidadUsados");
            var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");
            var IdExistencia = document.getElementsByClassName("input-IdExistencia");
            for (let i = 0; i < cantidadUsados.length; i++) {
                if (cantidadUsados[i].value >= 1 && NomArticulos[i].value && IdExistencia[i].value) {
                    var IdMovimiento = sessionStorage.getItem('IdMovimiento');
                    var Movimiento = document.getElementById("TxtMovUsados").value;
                    var Fecha = document.getElementById("TxtFechaIngresoUsados").value;
                    //------------------------Guarda el nombre del artículo solicitado----------------------------------
                    var IdArticulo = NomArticulos[i].name;
                    var Articulo = NomArticulos[i].value;
                    //------------------------Guarda la cantidad de artículos solicitados----------------------------------
                    var CantidadSolicitada = cantidadUsados[i].value;
                    var Unidad = IdExistencia[i].value;
                    var frm = new FormData();
                    frm.append("IdMovimiento", IdMovimiento);
                    frm.append("Movimiento", Movimiento);
                    frm.append("Fecha", Fecha);
                    frm.append("IdArticulo", IdArticulo);
                    frm.append("Articulo", Articulo);
                    frm.append("Cantidad", CantidadSolicitada);
                    frm.append("IdExistencia", Unidad);
                    frm.append("Estatus", 1);
                    $.ajax({
                        type: "POST",
                        url: "/Supervision/GuardarUsados",
                        data: frm,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            if (data == 0) {
                                alert("Ocurrió un error");
                            }
                            else if (data == -1) {
                                alert("Ya existe este registro");
                            }
                            else {
                                nuevoStockUsados();
                                document.getElementById("btnCancelar").click();
                            }
                        }
                    });

                }
            }
            alert("Guardado correctamente");
        }
    }
}

function GuardarExistAlm() {
    if (CamposObligatoriosUsados() == true) {
        var cantidad = document.getElementsByClassName("input-cantidadUsados");
        //----------Guardar los inputs de manera individual en la Base de datos--------------------
        var ExistAct = document.getElementsByClassName("input-existAct");
        var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");
        var IdExistencia = document.getElementsByClassName("input-IdExistencia");
        for (let i = 0; i < ExistAct.length; i++) {
            if (cantidad[i].value >= 1 && NomArticulos[i].value && IdExistencia[i].value) {
                var IdExistenciaAlmacenG = sessionStorage.getItem('IDG');
                var IdArticulo = NomArticulos[i].name;
                var Articulo = NomArticulos[i].value;
                var CantidadSolicitada = ExistAct[i].value;
                var Unidad = IdExistencia[i].value;
                var frm = new FormData();
                frm.append("IdExistenciaAlmacenG", Unidad);
                frm.append("ExitenciaActual", CantidadSolicitada);
                $.ajax({
                    type: "POST",
                    url: "/Supervision/GuardarExt",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            alert("Ocurrió un error");
                        }
                        else if (data == -1) {
                            alert("Ya existe este registro");
                        }
                        else {

                            document.getElementById("btnCancelar").click();
                        }
                    }
                });

            }
        }
    }
}
function CamposObligatoriosUsados() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorioUsados");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "" || controlesObligatorio[i].value == "0") {
            exito = false;
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");

        }
    }
    return exito;
}
//Validaciones en el modal de usados
function CalcularExistenciaAct(id) {

    $.get("/Supervision/ConsultaArticulos/?IDTienda=" + id, function (Data) {
        var res = document.getElementsByClassName("input-existAct");
        var cantidadUsados = document.getElementsByClassName("input-cantidadUsados");
        var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");
        var Stock = document.getElementsByClassName("input-Stock");
        for (let i = 0; i < cantidadUsados.length; i++) {
            if (cantidadUsados[i].value >= 1 && NomArticulos[i].value && Stock[i].value) {
                var CantidadSolicitada = cantidadUsados[i].value;
                var Existencia = Stock[i].value;
                var frm = new FormData();
                var resultado = parseFloat(Existencia) - parseFloat(CantidadSolicitada);
                //Si la cantidad excede al stock en tienda ( modal de usados )
                if (resultado < 0) {
                    Swal.fire(
                        '!',
                        'La cantidad excede al stock',
                        'alert'
                    )
                    var Result = cantidadUsados[i].value = "";
                    var cantidad = res[i].value = "";
                }

                else {
                    var Result = res[i].value = resultado;
                }
            }
        }
        //Validacion de numeros negativos en el modal de usados 
        for (let i = 0; i < cantidadUsados.length; i++) {
            if (cantidadUsados[i].value < 0 && NomArticulos[i].value && Stock[i].value) {

                if (cantidadUsados[i].value < 0) {

                    Swal.fire(
                        '!',
                        'No se aceptan valores negativos',
                        'alert'
                    )
                    var Result = cantidadUsados[i].value = "";
                }
                else {
                    var Result = res[i].value = resultado;
                }
            }
        }
    });
}
////-------------------------------------------OFICINA----------------------------------------
//----------------------Guardar datos de los pedidos-----------------------------------------------
function GuardarPedidoInterno() {
    if (CamposObligatoriosPedidosInt() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var NumPedidos = document.getElementsByClassName("input-cantidadPedidos");
            var ChevPedidos = document.getElementsByClassName("input-ArticulosPedidos");
            for (let i = 0; i < NumPedidos.length; i++) {
                if (NumPedidos[i].value >= 1 && ChevPedidos[i].value) {
                    var IdPedidosExternos = sessionStorage.getItem('IdPedidosExternos');
                    var IdProveedor = document.getElementById("cmbProveedor").value;
                    var TempProvedor = document.getElementById("cmbProveedor");
                    var Proveedor = TempProvedor.options[TempProvedor.selectedIndex].text;
                    var NumeroPedido = document.getElementById("TxtNumeroPedido").value;
                    var NumPedidoProveedor = document.getElementById("TxtNumPedidoProveedor").value;
                    var Fecha = document.getElementById("TxtFechaIngreso").value;
                    var IdArticulo = ChevPedidos[i].name;
                    var Articulo = ChevPedidos[i].value;
                    var CantidadSolicitada = NumPedidos[i].value;
                    var IdSitio = document.getElementById("cmbOficina").value;
                    var TempSitio = document.getElementById("cmbOficina");
                    var Sitio = TempSitio.options[TempSitio.selectedIndex].text;
                    var frm = new FormData();
                    frm.append("IdPedidosExternos", IdPedidosExternos);
                    frm.append("IdProveedor", IdProveedor);
                    frm.append("Proveedor", Proveedor);
                    frm.append("IdArticulo", IdArticulo);
                    frm.append("Articulo", Articulo);
                    frm.append("NumeroPedido", NumeroPedido);
                    frm.append("NumPedidoProveedor", NumPedidoProveedor);
                    frm.append("CantidadSolicitada", CantidadSolicitada);
                    frm.append("Sitio", Sitio);
                    frm.append("IdSitio", IdSitio);
                    frm.append("Fecha", Fecha);
                    frm.append("IdAsignacion", 1);
                    frm.append("Estatus", 1);
                    $.ajax({
                        type: "POST",
                        url: "/Supervision/GuardarPedidoInterno",
                        data: frm,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            if (data == 0) {
                                alert("Ocurrió un error");
                            }
                            else if (data == -1) {
                                alert("Ya existe este registro");
                            }
                        }
                    });
                }
            }
            alert("Los datos se guardaron correctamente");
            ConsultaArticuloComp();
            document.getElementById("btnCancelar").click();
            actualizar();
        }
    }
}
function llenarComboTienda(data, control) {
    var contenido = "";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
function LlenarCMBTienda(Id) {
    $.get("/MovimientosOficina/BDOficina/?Id=" + Id, function (data) {
        llenarComboTienda(data, document.getElementById("cmbOficina"));
    });
}
function abrirModal(id, idS) {
    LlenarCMBTienda(idS);
    LimpiarCampos();
    if (idS == 0) {
        sessionStorage.setItem('IDG', '0');
    }
    else {
        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            document.getElementById("cmbTienda").value = Data[0].Tienda;
        });
        Prov(id)
    }
}
function Prov(id) {
    $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
        document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
        //Muestra los artículos que le pertenecen a ese proveedor----
        MostrarArticulosPedidos(id);
        //Muestra el número de pedido que le corresponde por proveedor-------
        SiguientePedidoProveedor(id);
        //Muestra el número de pedido que le corresponde-------
        ConsultaSiguientePedido();
    });
}
function MostrarArticulosPedidos(id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {
        $.get("/Supervision/ConsultaIdPro/?IdPro=" + id, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            for (var i = 0; i < Data.length; i++) {
                //-------Crea los input-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-ArticulosPedidos sinborde limpiar ' disabled name=' " + Data[i].IdArticulos + "'   id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input type='number' value='' class='input-cantidadPedidos  redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}
//Función que determina el siguiente número de pedido por proveedor
function SiguientePedidoProveedor(id) {
    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaNumPedidoProveedor/?ID=" + id, function (Data) {
            let numPedidoProve = Data.numPedidoProve;
            let ArraynumPedidoProve = numPedidoProve.split(',');
            var ultimo = ArraynumPedidoProve[ArraynumPedidoProve.length - 1]
            document.getElementById("TxtNumPedidoProveedor").value = ultimo;

        });
    }
}
function MostrarArticulos(id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {
        $.get("/Supervision/ConsultaIdPro/?IdPro=" + id, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Unidad_Medida</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-0 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "</div>";
            for (var i = 0; i < Data.length; i++) {
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
                TablaArticulo += "</div>";
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label   id='" + Data[i].IdArticulos + "' ></label><span class='help-block text-muted small-font'>" + Data[i].Unidad + "</span>";
                TablaArticulo += "</div>";
                TablaArticulo += "<div class='col-md-0 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "</div>";
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}
function ConsultaSiguientePedido() {
    $.get("/Supervision/ConsultaPedidosDecendiente", function (Data) {
        SiguientePedido(Data);
    }
    );
}
//Función para mostrar automaticamente el siguiente pedido
function SiguientePedido(Data) {
    let NumeroPedido = Data.NumeroPedido;
    let ArrayNumeroPedido = NumeroPedido.split(',');
    var ultimoElemento = ArrayNumeroPedido[ArrayNumeroPedido.length - 1]
    document.getElementById("TxtNumeroPedido").value = ultimoElemento;
}
//----------Art pedidos Aceptados--------------------------
function DesplegarPedidosInternos(IdCmpraInt, id) {
    if (IdCmpraInt == 0 && id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaArtTiendaDespl/?idCompraInt=" + IdCmpraInt + "&idS= " + id, function (Data) {
            var DespXArt = "";
            DespXArt += "<hr class='solid4'>";
            DespXArt += "<div class='row'>";
            DespXArt += "<div class='col-sm'>NoPedido</div>";
            DespXArt += "<div class='col-sm'>Artículo</div>";
            DespXArt += "<div class='col-sm'>Fecha del pedido</div>";
            DespXArt += "<div class='col-sm'>Cantidad Solicitada</div>";
            DespXArt += "<div class='col-sm'></div>";
            DespXArt += "</div>";
            DespXArt += "<hr class='solid4'>";
            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulos = IdArticulo.split(',');
            let NumeroPedido = Data.NumeroPedido;
            let ArrayNoPedido = NumeroPedido.split(',');
            let Fechas = Data.Fechas;
            let Arrayfecha = Fechas.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            //El IdSitio se ocupa para conocer en qué tienda mostrar los pedidos
            let IdSitio = Data.IdSitio;
            let ArrayIdSitio = IdSitio.split(',');
            let Nombre = Data.Nombre;
            let ArrayArticulo = Nombre.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');
            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                //----Cuerpo del grid-------------
                DespXArt += "<div class='row'>";
                DespXArt += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + ArrayArticulo[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + Arraystock[i] + "</div>";
                // DespXArt += "<button title='Devoluciones' class='btn btn-primary' onclick='abrirModalDevoluciones(" + ArrayIdExistenciaAlmacenG[i] + "," + ArrayIdArticulos[i] + "," + ArrayIdSitio[i] + ")'data-toggle='modal' data-target='#ModalDevoluciones'><i class='fas fa-archive'></i></button>";
                DespXArt += "<div class='col-sm'></div>";
                DespXArt += "</div>";
            }
            DespXArt += "</div>";
            DespXArt += "</br>";
            DespXArt += "</br>";
            //Pasando los dos parametros(No.Pedido, idSitio) para desplegar los articulos del pedido por tienda
            let compraArticulo = "desplegablePedido" + IdCmpraInt + "," + id;
            document.getElementById(compraArticulo).innerHTML = DespXArt;
        });
    }
}
//Modal AceptarPedido
function abrirModalAceptarPedido(id, no, IdCompInt, idS) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdPedido', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaAceptarPedido/?No=" + no + "&Id= " + id, function (Data) {
            sessionStorage.setItem('IdPedido', Data[0].IdPedidosInternos);
            document.getElementById("TxtNombreUsr");
            document.getElementById("TxtAceptarNumeroPedidoAceptar").value = Data[0].NumeroPedido;
            document.getElementById("TxtAceptarNumPedidoProveedor").value = Data[0].NumPedidoProveedor;
            document.getElementById("TxtAceptarFechaIngreso").value = Data[0].Fecha;
            document.getElementById("cmbAceptarArea").value = Data[0].IdTienda;
            document.getElementById("cmbAceptarProveedor").value = Data[0].IdProveedor;
            MostrarArt(IdCompInt, idS);
            VerPedido(id, no, IdCompInt, idS);
        });
    }
}
//------Despliega el modal de aceptar pedidos deacuerdo con el número de pedido-----
function VerPedido(id, no, IdCompInt, idS) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaAceptarPedido/?No=" + no + "&Id= " + id, function (Data) {
            document.getElementById("TxtNumeroPedidoArt").textContent = Data[0].NoCompraProveedor;
            document.getElementById("TxtProveedor").textContent = Data[0].Proveedor;
            document.getElementById("TxtTelefono").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreo").textContent = Data[0].Correo;
            document.getElementById("TxtFecha").textContent = Data[0].Fecha;
            document.getElementById("TxtDepartamento").textContent = Data[0].Area;
            MostrarArticulos(IdCompInt, idS);
        });

    }
}
//-----------Mostrar los articulos en el modal aceptar pedido----------------------
function MostrarArt(IdCompInt, idS) {
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaTablaArtAceptarPedidos/?IdCompInt=" + IdCompInt + "&idS= " + idS, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Id Articulo</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-5 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulos = IdArticulo.split(',');
            let NumeroPedido = Data.NumeroPedido;
            let ArrayNoPedido = NumeroPedido.split(',');
            let Fechas = Data.Fechas;
            let Arrayfecha = Fechas.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            let Nombre = Data.Nombre;
            let ArrayArticulo = Nombre.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');
            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                if (ArrayIdArticulos[i] > 0) {
                    TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input  class='input-IdArticulo sinborde limpiar' disabled  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayIdArticulos[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                    //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                    TablaArticulo += "<div class='col-md-5 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<label>"
                    TablaArticulo += "<input  class='input-ArticuloAceptarP sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</label>"
                    TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input  class='input-StockAceptarP sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + Arraystock[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                }
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblAceptarArticulos").innerHTML = TablaArticulo;
        });
    }
}
function MostrarArticulos(IdCompInt, idS) {
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaTablaArtAceptarPedidos/?IdCompInt=" + IdCompInt + "&idS= " + idS, function (Data) {
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulos = IdArticulo.split(',');
            let NumeroPedido = Data.NumeroPedido;
            let ArrayNoPedido = NumeroPedido.split(',');
            let Fechas = Data.Fechas;
            let Arrayfecha = Fechas.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            let Nombre = Data.Nombre;
            let ArrayArticulo = Nombre.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');
            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                if (ArrayIdArticulos[i] > 0) {
                    TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<label>"
                    TablaArticulo += "<input  class='input-ArticuloAceptarP sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</label>"
                    TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input  class='input-StockAceptarP sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + Arraystock[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                }
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArt").innerHTML = TablaArticulo;
        });
    }
}
function Desplegar(IdCmpraInt, id) {
    if (IdCmpraInt == 0 && id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaArtOficina/?idCompraInt=" + IdCmpraInt + "&idS= " + id, function (Data) {
            var DespXArt = "";
            DespXArt += "<hr class='solid4'>";
            DespXArt += "<div class='row'>";
            DespXArt += "<div class='col-sm'>NoPedido</div>";
            DespXArt += "<div class='col-sm'>Artículo</div>";
            DespXArt += "<div class='col-sm'>Fecha de Ingreso</div>";
            DespXArt += "<div class='col-sm'>Stock</div>";
            DespXArt += "<div class='col-sm'></div>";
            DespXArt += "</div>";
            DespXArt += "<hr class='solid4'>";
            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulos = IdArticulo.split(',');
            let NumeroPedido = Data.NumeroPedido;
            let ArrayNoPedido = NumeroPedido.split(',');
            let Fechas = Data.Fechas;
            let Arrayfecha = Fechas.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            let IdSitio = Data.IdSitio;
            let ArrayIdSitio = IdSitio.split(',');
            let Nombre = Data.Nombre;
            let ArrayArticulo = Nombre.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');
            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                DespXArt += "<div class='row'>";
                DespXArt += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + ArrayArticulo[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + Arraystock[i] + "</div>";
                DespXArt += "<button title='Devoluciones' class='btn btn-primary' onclick='abrirModalDevoluciones(" + ArrayIdExistenciaAlmacenG[i] + "," + ArrayIdArticulos[i] + "," + ArrayIdSitio[i] + ")'data-toggle='modal' data-target='#ModalDevoluciones'><i class='fas fa-archive'></i></button>";
                DespXArt += "<div class='col-sm'></div>";
                DespXArt += "</div>";
            }
            DespXArt += "</div>";
            DespXArt += "</br>";
            DespXArt += "</br>";
            //Pasando los dos parametros(No.Pedido, idSitio) para desplegar los articulos del pedido por tienda
            let compraArticulo = "desplegable" + IdCmpraInt + "," + id;
            document.getElementById(compraArticulo).innerHTML = DespXArt;
        });
    }
}
//Visulizar el archivo de los pedidos aceptados
function VisualizarPedido(id, no, IdCompInt, idS) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaPedidosAceptados/?No=" + no + "&Id= " + id, function (Data) {
            document.getElementById("TxtFechaVisualizar").textContent = Data[0].Fecha;
            document.getElementById("TxtNumeroPedidoArtVisualizar").textContent = Data[0].NoCompraProveedor;
            document.getElementById("TxtProveedorVisualizar").textContent = Data[0].Proveedor;
            document.getElementById("TxtTelefonoVisualizar").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreoVisualizar").textContent = Data[0].Correo;
            document.getElementById("TxtDepartamentoVisualizar").textContent = Data[0].Area;
            MostrarArticulosVisualizar(IdCompInt, idS);
        });
    }
}
function MostrarArticulosVisualizar(IdCompInt, idS) {
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaTablaArtPedidosAceptados/?IdCompInt=" + IdCompInt + "&idS= " + idS, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulos = IdArticulo.split(',');
            let NumeroPedido = Data.NumeroPedido;
            let ArrayNoPedido = NumeroPedido.split(',');
            let Fechas = Data.Fechas;
            let Arrayfecha = Fechas.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            let Nombre = Data.Nombre;
            let ArrayArticulo = Nombre.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');
            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                if (ArrayIdArticulos[i] > 0) {
                    //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                    TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<label>"
                    TablaArticulo += "<input  class='input-ArticuloAceptarP sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</label>"
                    TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input  class='input-StockAceptarP sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + Arraystock[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                }
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArtVisualizar").innerHTML = TablaArticulo;
        });
    }
}
function abrirModalDevoluciones(idExist, id, idS) {
    ObtenerFecha();
    LimpiarCampos();
    if (idS == 0) {
        sessionStorage.setItem('IdExistenciaAlmacenG', '0');
    }
    else {
        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            document.getElementById("TxtIdTiendaDev").value = Data[0].Tienda;
            document.getElementById("cmbTiendaDev").value = Data[0].Tienda;
        });
        $.get("/Supervision/ConsultaDevA/?idExist=" + idExist, function (Data) {
            sessionStorage.setItem('IdExistenciaAlmacenG', Data[0].IdExistenciaAlmacenG);
            document.getElementById("TxtExistenciaInicDev").value = Data[0].ExitenciaActual;
        });
        //-----Mostrando el stock general de los articulos----
        $.get("/MovimientosOficina/ConsultaStockArticulos/?IDTienda=" + idS + "&IdArt= " + id, function (Data) {
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            document.getElementById("TxtExistenciaActDev").value = Arraystock[0];
        });
        ConsultaArt(idExist);
        ProvDev(idExist);
    }
}
function abrirModalUsados(id, idS) {
    LimpiarCampos();
    ObtenerFechaUsado();
    if (idS == 0) {
        sessionStorage.setItem('IDG', '0');
    }
    else {
        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            sessionStorage.setItem('IDG', Data[0].IdExistenciaAlmacenG);
            document.getElementById("cmbTiendaUsados").value = Data[0].Tienda;
        });
        MostrarUs(idS);
    }
}
function MostrarUs(idS) {
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {
        $.get("/MovimientosOficina/ConsultaPedidosUs/?idS=" + idS, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Id Articulo</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Existencia Actual</label>";
            TablaArticulo += "</div>";
            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulos = IdArticulo.split(',');
            let NumeroPedido = Data.NumeroPedido;
            let ArrayNoPedido = NumeroPedido.split(',');
            let Fechas = Data.Fechas;
            let Arrayfecha = Fechas.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            let Nombre = Data.Nombre;
            let ArrayArticulo = Nombre.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');
            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                if (ArrayIdArticulos[i] > 0) {
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    //  TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "<input  class='input-IdExistencia sinborde limpiar' disabled  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayIdArticulos[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                    //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<label>"
                    TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</label>"
                    TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularExistenciaAct(this.value)' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input  class='input-Stock sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + Arraystock[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                }
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulosUsados").innerHTML = TablaArticulo;
        });
    }
}
//-----------------------------------Función  para el nuevo stock---------------------------------------
function nuevoStockUsados() {
    var Articulos = document.getElementsByClassName("input-ArticuloUsados");
    var IDArticulos = document.getElementsByClassName("input-ArticuloUsados");
    var Aprobar = document.getElementsByClassName("input-cantidadUsados");
    var IDTienda = document.getElementById("cmbTiendaUsados").value;
    var total = "";
    for (let i = 0; i < Articulos.length; i++) {
        if (Aprobar[i].value > 0) {
            total += IDArticulos[i].name + ":" + Aprobar[i].value + "/" + IDTienda + ",";
        }
    }
    $.get("/MovimientosOficina/ConsultaMovimientoUsado/?DatosArticulos=" + total, function (Data) {
        let RES = Data;
    });
    alert("Guardado correctamente");
    actualizar();
}
function actualizar() {
    location.reload(true);
}
//Movimiento devolucion
function nuevoStock() {
    var Articulos = document.getElementById("TxtArtDev").value;
    var IDArticulos = document.getElementById("TxtIdArtDev").value;
    var Aprobar = document.getElementById("TxtCantidadDev").value;
    var Observaciones = document.getElementById("TxtDescripcionDev").value;
    var IDTienda = document.getElementById("TxtIdTiendaDev").value;
    var total = "";
    total += IDArticulos + ":" + Aprobar + "/" + IDTienda + "," + Observaciones + "#";
    $.get("/MovimientosOficina/ConsultaStockArticulo/?DatosArticulos=" + total, function (Data) {
        let RES = Data;
    });
    ConsultaArticuloComp();
}