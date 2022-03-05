
LlenarCMCProveedores();
LlenarComboProveedores();
BloquearCTRL();
function ConsultaArticuloComp(IDTienda) {
    if (IDTienda == 0) {
        sessionStorage.setItem('IDTienda', '0');
    }
    else {
        $.get("/Supervision/ConsultaArticulos/?IDTienda=" + IDTienda, function (Data) {
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
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayIdCmpraInt[i] + ", " + ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
                CodigoHtmlArticuloComp += "<button title='Pedido' class='btn btn-primary' onclick='VisualizarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + "," + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")'  data-toggle='modal' data-target='#VisualizarModalPedidos'><i class='fas fa-archive'></i></button>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
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
        $.get("/Supervision/ConsultaArticulosAceptar/?IDTienda=" + IDTienda, function (Data) {
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
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                CodigoHtmlArticuloComp += "<button title='Clic para Aceptar el pedido' class='btn btn-primary' id='hide' onclick='abrirModalAceptarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + "," + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")'  data-toggle='modal' data-target='#abrirModalAceptarPedido'><i class='fas fa-archive'></i></button>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
                CodigoHtmlArticuloComp += "</div>";
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
        $.get("/Supervision/ConsultaArticulosVisualizarPedidos/?IDTienda=" + IDTienda, function (Data) {
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
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "<div class='row'>";
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

function ConsultaAceptarPedidoArea(IDTienda) {
    if (IDTienda == 0) {
        sessionStorage.setItem('IDTienda', '0');
    }
    else {
        $.get("/Supervision/ConsultaArticulosAceptar/?IDTienda=" + IDTienda, function (Data) {
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
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                CodigoHtmlArticuloComp += "<button title='Clic para Aceptar el pedido' class='btn btn-primary' id='hide' onclick='abrirModalAceptarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + "," + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")'  data-toggle='modal' data-target='#abrirModalAceptarPedido'><i class='fas fa-archive'></i></button>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
                CodigoHtmlArticuloComp += "</div>";
            }
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "</br>";
            CodigoHtmlArticuloComp += "</br>";
            let contenedorAceptar = "contenedorAceptar" + IDTienda;
            document.getElementById(contenedorAceptar).innerHTML = CodigoHtmlArticuloComp;
        });
    }
}
function mostrarBoton() {
    $('#btn-1').prop('disabled', false);
    $('#button').prop('disabled', false);
    Guardar();
    Mostrar();
}

function ocultarBoton() {

    $('#btn-1').prop('disabled', true);
    //  $('#button').prop('disabled', true);

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
function Desplegar(IdCmpraInt, id) {
    if (IdCmpraInt == 0 && id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaArtTiendaLider/?idCompraInt=" + IdCmpraInt + "&idS= " + id, function (Data) {
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
            let compraArticulo = "desplegable" + IdCmpraInt + "," + id;
            document.getElementById(compraArticulo).innerHTML = DespXArt;
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
        $.get("/Supervision/ConsultaStockArticulos/?IDTienda=" + idS + "&IdArt= " + id, function (Data) {
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            document.getElementById("TxtExistenciaActDev").value = Arraystock[0];
        });


        ConsultaArt(idExist);
        ProvDev(idExist);
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

function llenarComboTienda(data, control) {
    var contenido = "";
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}
function LlenarCMBTienda(Id) {

    $.get("/Supervision/BDTienda/?Id=" + Id, function (data) {
        llenarComboTienda(data, document.getElementById("cmbTienda"));
    });
}
function abrirModal(id, idS) {
    //ResetearBorde();
    //  ResetearLosBordesInput();
    EliminarInput();
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
    EliminarInput();
    $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
        document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
        MostrarArticulosPedidos(id);
        SiguientePedidoProveedor(id);
        ConsultaSiguientePedido();
    });
}

function MostrarArticulosPedidos(id) {
    //EliminarInput();
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Supervision/ConsultaIdPro/?IdPro=" + id, function (Data) {
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";

            for (var i = 0; i < Data.length; i++) {
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end LimpiarInput'>";
                TablaArticulo += "<input  class='input-ArticulosPedidos sinborde limpiar ' disabled name=' " + Data[i].IdArticulos + "'   id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end LimpiarInput'>";
                TablaArticulo += "<input onkeyup='ResetearLosBordesInput();' type='number' value='' class='input-cantidadPedidos  redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}

function EliminarInput() {

    var limpiar = document.getElementsByClassName("LimpiarInput");
    for (var i = 0; i < limpiar.length; i++) {

        limpiar[i].style.display = 'none';
    }

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
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("error");
    }
    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {
        $.get("/Supervision/ConsultaIdPro/?IdPro=" + id, function (Data) {
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
                    var IdSitio = document.getElementById("cmbTienda").value;
                    var TempSitio = document.getElementById("cmbTienda");
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
                    frm.append("IdAsignacion", 2);
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
                            else {
                                restablecerBordesInput();
                                document.getElementById("btnCancelar").click();
                            }
                        }
                    });
                }
            }
            alert("Los datos se guardaron correctamente");
            actualizar();
            //ConsultaArticuloComp();
            //restablecerBordesInput();
            //document.getElementById("btnCancelar").click();
        }
    }
}
function restablecerBordesInput() {
    //var Precio = document.getElementsByClassName("input-Precio");
    var NumPedidos = document.getElementsByClassName("input-cantidad");

    for (let i = 0; i < NumPedidos.length; i++) {

        NumPedidos[i].style.borderColor = 'DimGray';
        Precio[i].style.backgroundColor = 'White';
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
        $.get("/Supervision/ConsultaAceptarPedido/?No=" + no + "&Id= " + id, function (Data) {

            sessionStorage.setItem('IdPedido', Data[0].IdPedidosInternos);
            document.getElementById("TxtNombreUsr");
            document.getElementById("TxtAceptarNumeroPedidoAceptar").value = Data[0].NumeroPedido;
            document.getElementById("TxtAceptarNumPedidoProveedor").value = Data[0].NumPedidoProveedor;
            // document.getElementById("TxtAceptarFechaIngreso").value = Data[0].Fecha;
            document.getElementById("cmbAceptarTienda").value = Data[0].IdTienda;
            document.getElementById("cmbAceptarProveedor").value = Data[0].IdProveedor;
            MostrarArt(IdCompInt, idS);
            VerPedido(id, no, IdCompInt, idS);
        });
    }
}
function VerPedido(id, no, IdCompInt, idS) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaAceptarPedido/?No=" + no + "&Id= " + id, function (Data) {
            document.getElementById("TxtNumeroPedidoArt").textContent = Data[0].NoCompraProveedor;
            document.getElementById("TxtProveedor").textContent = Data[0].Proveedor;

            document.getElementById("TxtTelefono").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreo").textContent = Data[0].Correo;
            document.getElementById("TxtFecha").textContent = Data[0].Fecha;
            document.getElementById("TxtDepartamento").textContent = Data[0].Tienda;
            document.getElementById("TxtDireccion").textContent = Data[0].Localidad + "." + " " + "Dirección:" + Data[0].Direccion;
            //MostrarArticulos(IdCompInt, idS);
        });
    }
}

function VisualizarPedido(id, no, IdCompInt, idS) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/VerPedido/?No=" + no + "&Id= " + id, function (Data) {
            document.getElementById("TxtFechaVisualizar").textContent = Data[0].Fecha;
            document.getElementById("TxtNumeroPedidoArtVisualizar").textContent = Data[0].NoCompraProveedor;
            document.getElementById("TxtProveedorVisualizar").textContent = Data[0].Proveedor;
            document.getElementById("TxtTelefonoVisualizar").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreoVisualizar").textContent = Data[0].Correo;
            document.getElementById("TxtDireccionVisualizar").textContent = Data[0].Localidad + "." + " " + "Dirección:" + Data[0].Direccion;
            document.getElementById("TxtDepartamentoVisualizar").textContent = Data[0].Tienda;
            MostrarArticulosVisualizar(IdCompInt, idS);
        });
    }
}
function MostrarArticulosVisualizar(IdCompInt, idS) {
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {
        $.get("/Supervision/ConsultaTablaArtPedidosAceptados/?IdCompInt=" + IdCompInt + "&idS= " + idS, function (Data) {
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
            document.getElementById("TblArtVisualizar").innerHTML = TablaArticulo;
        });
    }
}
function MostrarArticulos(IdCompInt, idS) {
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {
        $.get("/Supervision/ConsultaTablaArtAceptarPedidos/?IdCompInt=" + IdCompInt + "&idS= " + idS, function (Data) {
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

function MostrarArt(IdCompInt, idS) {
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {
        $.get("/Supervision/ConsultaTablaArtAceptarPedidos/?IdCompInt=" + IdCompInt + "&idS= " + idS, function (Data) {
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
            actualizar();
        }
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

        $.get("/Supervision/ConsultaPedidosUs/?idS=" + idS, function (Data) {
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
                    TablaArticulo += "<input  class='input-IdExistencia sinborde limpiar' disabled  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayIdArticulos[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<label>"
                    TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</label>"
                    TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado limpiar' id='" + ArrayIdArticulos[i] + "' onchange='ValidarUsados(this.value)' ><span class='help-block text-muted small-font'></span>";
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
function GuardarUsados() {
    if (CamposObligatoriosUsados() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var cantidadUsados = document.getElementsByClassName("input-cantidadUsados");

            var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");

            var IdExistencia = document.getElementsByClassName("input-IdExistencia");

            for (let i = 0; i < cantidadUsados.length; i++) {
                if (cantidadUsados[i].value >= 1 && NomArticulos[i].value && IdExistencia[i].value) {
                    var IdMovimiento = sessionStorage.getItem('IdMovimiento');
                    var Movimiento = document.getElementById("TxtMovUsados").value;
                    var Fecha = document.getElementById("TxtFechaIngresoUsados").value;
                    var IdArticulo = NomArticulos[i].name;
                    var Articulo = NomArticulos[i].value;
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

    $.get("/Supervision/ConsultaMovimientoUsado/?DatosArticulos=" + total, function (Data) {
        let RES = Data;
    });
    alert("Guardado correctamente");
    actualizar();
}
function actualizar() {
    //location.reload(true);
    window.location.href = window.location.href;
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
function nuevoStock() {
    var Articulos = document.getElementById("TxtArtDev").value;
    var IDArticulos = document.getElementById("TxtIdArtDev").value;
    var Aprobar = document.getElementById("TxtCantidadDev").value;
    var Observaciones = document.getElementById("TxtDescripcionDev").value;
    var IDTienda = document.getElementById("TxtIdTiendaDev").value;
    var total = "";
    total += IDArticulos + ":" + Aprobar + "/" + IDTienda + "," + Observaciones + "#";
    $.get("/Supervision/ConsultaStockArticulo/?DatosArticulos=" + total, function (Data) {
        let RES = Data;

    });
    ConsultaArticuloComp();
}
/////////////////////////// Art pedidos Aceptados--------------------------

function DesplegarPedidosInternos(IdCmpraInt, id) {
    if (IdCmpraInt == 0 && id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaArtTiendaDespl/?idCompraInt=" + IdCmpraInt + "&idS= " + id, function (Data) {
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
                DespXArt += "<div class='row'>";
                DespXArt += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + ArrayArticulo[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
                DespXArt += "<div class='col-sm'>" + Arraystock[i] + "</div>";
                DespXArt += "<div class='col-sm'></div>";
                DespXArt += "</div>";
            }
            DespXArt += "</div>";
            DespXArt += "</br>";
            DespXArt += "</br>";
            let compraArticulo = "desplegablePedido" + IdCmpraInt + "," + id;
            document.getElementById(compraArticulo).innerHTML = DespXArt;
        });
    }
}



function ValidarDatosPedidos() {
    var CantidadArt = document.getElementsByClassName("input-cantidadPedidos");
    var Proveedor = document.getElementById("cmbProveedor").value;
    var contador = 0;
    var ContadorMayorAcero = 0;
    for (let i = 0; i < CantidadArt.length; i++) {
        CantidadArt[i].style.borderColor = 'DimGray';
        if (CantidadArt[i].value > 0 || CantidadArt[i].value < 0) {
            contador++;
        }
        if (CantidadArt[i].value > 0) {

            ContadorMayorAcero++;
        }
    }
    if (contador == ContadorMayorAcero && ContadorMayorAcero > 0 && Proveedor > 0) {
        GuardarPedidoInterno();
    }
    else {
        if (Proveedor > 0) {
            Swal.fire(
                '!',
                'Ingrese la cantidad de articulos a solicitar',
                'alert'
            )
        }
        for (let i = 0; i < CantidadArt.length; i++) {
            if (CantidadArt[i].value < 0) {

                CantidadArt[i].style.borderColor = 'Red';
                Swal.fire(
                    '!',
                    '¡La cantidad solicitada no puede ser negativo!',
                    'alert'
                )
            }
            if (CantidadArt[i].value == '0') {

                CantidadArt[i].style.borderColor = 'Red';
                Swal.fire(
                    '!',
                    'No se aceptan valores neutros!',
                    'alert'
                )
            }
            if (CantidadArt[i].value == "") {

                CantidadArt[i].style.borderColor = 'DimGray';
            }
        }

        if (Proveedor == 0) {
            Swal.fire(
                '!',
                'Seleccione el proveedor',
                'alert'
            )
        }
    }
}

function ValidarUsados() {

    var CantidadArt = document.getElementsByClassName("input-cantidadUsados");
    var Stock = document.getElementsByClassName("input-Stock");
    var contador = 0;
    var ContadorMayorAcero = 0;
    var resultado = 0;
    for (let i = 0; i < CantidadArt.length; i++) {
        if (CantidadArt[i].value > 0 || CantidadArt[i].value < 0) {
            contador++;
        }
        if (CantidadArt[i].value > 0) {

            ContadorMayorAcero++;
        }
        if (CantidadArt[i].value == "") {

            CantidadArt[i].style.borderColor = 'DimGray';
        }
        for (let i = 0; i < Stock.length; i++) {
            if (Stock[i].value > 0 || Stock[i].value < 0) {
                contador++;
            }
            if (Stock[i].value > 0) {

                ContadorMayorAcero++;
            }
        }
        var CantidadSolicitada = CantidadArt[i].value;
        var Existencia = Stock[i].value;
        var frm = new FormData();
        resultado = parseFloat(Existencia) - parseFloat(CantidadSolicitada);
        if (resultado >= 0) {
            CantidadArt[i].style.borderColor = 'DimGray';
        }
        if (resultado < 0) {

            Swal.fire(
                '!',
                'La cantidad excede al stock',
                'alert'
            )
            CantidadArt[i].style.borderColor = 'red';
            var cantidad = CantidadArt[i].value = "";
        }
        if (CantidadArt[i].value < 0) {

            Swal.fire(
                '!',
                '¡La cantidad solicitada no puede ser negativo!',
                'alert'
            )
            CantidadArt[i].style.borderColor = 'red';
            var cantidad = CantidadArt[i].value = "";
        }
        if (CantidadArt[i].value == '0') {

            CantidadArt[i].style.borderColor = 'Red';
            Swal.fire(
                '!',
                'No se aceptan valores neutros!',
                'alert'
            )
        }
    }

    for (let i = 0; i < Stock.length; i++) {
        if (Stock[i].value > 0 || Stock[i].value < 0) {
            contador++;
        }
        if (Stock[i].value > 0) {

            ContadorMayorAcero++;
        }
    }


}
function ImprimirPres() {

    //obtenerPro();

    var NumPedidos = document.getElementsByClassName("input-cantidadUsados");

    var Nombre = document.getElementsByClassName("input-ArticuloAceptarP");


    //var totalfin = document.getElementById('TxtTotal').value;


    var dos = "";



    dos += "<div style='width: 100%'>"
    dos += "<div {NM_CSS_FUN_CAB} style='height:11px; display: inline; border-width:0px; '></div>"
    dos += "<div style='height:37px; background-color:#FFFFFF; border-width:0px 0px 1px 0px;  border-style: dashed; border-color:#ddd; display: inline'>"
    dos += "<table style='width:100%; border-collapse:collapse; padding:0;'>"
    dos += "<thead>"
    dos += "<tr align='left'>"
    dos += "<th >Artículo</th>"
    dos += "<th >Cantidad Solicitada</th>"
    dos += "</tr>"
    dos += "</thead>"
    dos += "<tbody>"

    for (var i = 0; i < Nombre.length; i++) {

        if (NumPedidos[i].value > 0) {
            dos += "<tr>"
            dos += "<td align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Nombre[i].value + "</label></td>"
            dos += "<td  align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Nombre[i].name + "</label></td>"
            // dos += "<td  align='left' id='lin1_col2' {NM_CSS_CAB}><label>" + NumPedidos[i].value + "</label></td>"
            dos += "</tr>"
        }
    }
    dos += "<tfoot>"
    dos += "<th></th>"
    dos += "<th></th>"
    dos += "<th></th>"
    //  dos += "<th style='text-align: center;'>Total</th>"
    // dos += "<th style='text-align: center;'>$" + totalfin + "</th>"
    dos += "</tfoot>"

    dos += "</tbody>"
    dos += "</table>"
    dos += "</div>";
    dos += "</div>";

    document.getElementById("TblArt").innerHTML = dos;
    // actualizar()
}



function ValidarDUsado() {
    var CantidadArt = document.getElementsByClassName("input-cantidadUsados");
    //var Stock = document.getElementsByClassName("input-Stock");
    var Tienda = document.getElementById("cmbTiendaUsados").value;
    var contador = 0;
    var ContadorMayorAcero = 0;
    for (let i = 0; i < CantidadArt.length; i++) {
        CantidadArt[i].style.borderColor = 'DimGray';
        if (CantidadArt[i].value > 0 || CantidadArt[i].value < 0) {
            contador++;
        }
        if (CantidadArt[i].value > 0) {

            ContadorMayorAcero++;
        }
    }
    if (contador == ContadorMayorAcero && ContadorMayorAcero > 0 && Tienda > 0) {
        nuevoStockUsados();
    }
    else {
        if (Tienda > 0) {
            Swal.fire(
                '!',
                'Ingrese la cantidad de articulos a solicitar',
                'alert'
            )
        }
        for (let i = 0; i < CantidadArt.length; i++) {
            if (CantidadArt[i].value < 0) {

                CantidadArt[i].style.borderColor = 'Red';
                Swal.fire(
                    '!',
                    '¡La cantidad solicitada no puede ser negativo!',
                    'alert'
                )
            }
            if (CantidadArt[i].value == '0') {

                CantidadArt[i].style.borderColor = 'Red';
                Swal.fire(
                    '!',
                    'No se aceptan valores neutros!',
                    'alert'
                )
            }
            if (CantidadArt[i].value == "") {

                CantidadArt[i].style.borderColor = 'DimGray';
            }
        }
    }
}
