﻿//LlenarCMTMovimientos();
//LlenarCMCProveedores();
LlenarComboProveedores();
BloquearCTRL();
////----------Tabla------------////
//-----------------------Crea el grid con las consultas de la tabla artículos por tienda---------------------------------------------------

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
            // CodigoHtmlArticuloComp += "<div class='col-sm'>Id</div>";
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
            //let Stock = Data.Stock;
            //let Arraystock = Stock.split(',');
            //El IdSitio se ocupa para conocer en qué tienda mostrar los pedidos
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
                CodigoHtmlArticuloComp += "<button title='Pedido' class='btn btn-primary' onclick='VerPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + ")'data-toggle='modal' data-target='#ModalPedidos'><i class='fas fa-archive'></i></button>";

                CodigoHtmlArticuloComp += "</div>";
                //-------------Termina----------------------------------------
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                //------------------------Despliega primer grid-----------------------------------------------------------------------
                CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
                CodigoHtmlArticuloComp += "</div>";
                //---------------------------------------Termina----------------------------------------------------------------------------
            }
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "</br>";
            CodigoHtmlArticuloComp += "</br>";
            let contenedor1 = "contenedor1" + IDTienda;

            document.getElementById(contenedor1).innerHTML = CodigoHtmlArticuloComp;

        });

    }
}
//function ConsultaArticuloComp(IDTienda) {
//    if (IDTienda == 0) {
//        sessionStorage.setItem('IDTienda', '0');
//    }
//    else {
//        $.get("/Supervision/ConsultaArticulos/?IDTienda=" + IDTienda, function (Data) {
//            var CodigoHtmlArticuloComp = "";

//            CodigoHtmlArticuloComp += "<div id='contenedor1'>";
//            CodigoHtmlArticuloComp += "<hr class='solid'>";
//            CodigoHtmlArticuloComp += "<div class='row'>";
//            //CodigoHtmlArticuloComp += "<div class='col-sm'>Id</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>No. de Pedido</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>Artículo</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>Stock</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
//            CodigoHtmlArticuloComp += "</div>";
//            CodigoHtmlArticuloComp += "<hr class='solid'>";
//            CodigoHtmlArticuloComp += "</div>";

//            let id = Data.id;
//            let ArrayId = id.split(',');
//            let NoPedido = Data.NoPedido;
//            let ArrayNoPedido = NoPedido.split(',');
//            let Fecha = Data.Fecha;
//            let Arrayfecha = Fecha.split(',');
//            let Stock = Data.Stock;
//            let Arraystock = Stock.split(',');
//            //El IdSitio se ocupa para conocer en qué tienda mostrar los pedidos
//            let IdSitio = Data.IdSitio;
//            let ArrayIdSitio = IdSitio.split(',');

//            let Articulo = Data.Articulo;
//            let ArrayArticulo = Articulo.split(',');
//            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
//            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');

//            //let Costos = Data.Costos;
//            //let Arraycostos = Costos.split(',');

//            for (var i = 0; i < ArrayId.length; i++) {

//                CodigoHtmlArticuloComp += "<div>";
//                CodigoHtmlArticuloComp += "<div class='row'>";
//                // CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayId[i] + "</div>";
//                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
//                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayArticulo[i] + "</div>";
//                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
//                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraystock[i] + "</div>";
//                //-----------------Botón para desplegar la primera tabla--------------
//                CodigoHtmlArticuloComp += "<div class='col'>"
//                CodigoHtmlArticuloComp += "<label>"
//                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido
//                CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayNoPedido[i] + ", " + ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
//                CodigoHtmlArticuloComp += "<button title='Devoluciones' class='btn btn-primary' onclick='abrirModalDevoluciones(" + ArrayIdExistenciaAlmacenG[i] + "," + ArrayId[i] + "," + ArrayIdSitio[i] + ")'data-toggle='modal' data-target='#ModalDevoluciones'><i class='fas fa-archive'></i></button>";
//                //CodigoHtmlArticuloComp += "</label>";

//                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido

//                CodigoHtmlArticuloComp += "</div>";
//                //-------------Termina----------------------------------------
//                CodigoHtmlArticuloComp += "</div>";
//                CodigoHtmlArticuloComp += "</div>";
//                //------------------------Despliega primer grid-----------------------------------------------------------------------
//                CodigoHtmlArticuloComp += "<div class='row'>";
//                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
//                CodigoHtmlArticuloComp += "</div>";
//                //---------------------------------------Termina----------------------------------------------------------------------------
//            }
//            CodigoHtmlArticuloComp += "</div>";
//            CodigoHtmlArticuloComp += "</br>";
//            CodigoHtmlArticuloComp += "</br>";
//            let contenedor1 = "contenedor1" + IDTienda;

//            document.getElementById(contenedor1).innerHTML = CodigoHtmlArticuloComp;

//        });

//    }
//}
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
            //if (y <= x) {
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




function ExisteciaDevolucion(id) {

    $.get("/Supervision/ConsultaArticulos/?IDTienda=" + id, function (Data) {

        document.getElementById("TxtExistenciaActDev").value;
        document.getElementById("TxtCantidadDev").value;


        if (document.getElementById("TxtExistenciaActDev").value < document.getElementById("TxtCantidadDev").value) {
                Swal.fire(
                    '!',
                    'La cantidad excede al stock general',
                    'alert'
                )
            document.getElementById("TxtCantidadDev").value = "";
        } else if (document.getElementById("TxtCantidadDev").value<0) {
            Swal.fire(
                '!',
                'No se aceptan valores negativos',
                'alert'
            )
            document.getElementById("TxtCantidadDev").value = "";
        }

    });
}



//function CalcularExistenciaAct(id) {

//    $.get("/Supervision/ConsultaArticulos/?IDTienda=" + id, function (Data) {

//        var res = document.getElementsByClassName("input-existAct");


//        var cantidadUsados = document.getElementsByClassName("input-cantidadUsados");

//        var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");

//        var Stock = document.getElementsByClassName("input-Stock");

//        var Existencia = document.getElementsByClassName("input-existAct");

//        for (let i = 0; i < cantidadUsados.length; i++) {
//            if (cantidadUsados[i].value >= 1 && NomArticulos[i].value && Stock[i].value) {
//                // if (NumPedidos[i].value >= 1 && NomArticulos[i].value && UnidadM[i].value && Precio[i].value) {

//                //var IdMovimiento = sessionStorage.getItem('IdMovimiento');
//                //var Movimiento = document.getElementById("TxtMovUsados").value;
//                //var Fecha = document.getElementById("TxtFechaIngresoUsados").value;

//                //------------------------Guarda el nombre del artículo solicitado----------------------------------
//                //var IdArticulo = NomArticulos[i].name;
//                //var Articulo = NomArticulos[i].value;
//                //------------------------Guarda la cantidad de artículos solicitados----------------------------------
//                var CantidadSolicitada = cantidadUsados[i].value;
//                //------------------------Guarda la unidad media de los artículos solicitados----------------------------------
//                var Unidad = Stock[i].value;
//                //------------------------Guarda el precio unitario de los artículos solicitados----------------------------------
//                //var ExistenciaAct = Existencia[i].value;
//                //-------------------------------------------------------------------------------------------------------------
//                var frm = new FormData();
//                var resultado = parseFloat(Unidad) - parseFloat(CantidadSolicitada);

//                if (resultado < 0) {

//                    Swal.fire(
//                        '!',
//                        'La cantidad excede al stock',
//                        'alert'
//                    )
//                    //resultado == 0;
//                    var Result = cantidadUsados[i].value = "";
//                    var cantidad = res[i].value = "";
//                } else {
//                    var Result = res[i].value = resultado;
//                }
//            }
//        }
//    });
//}



//****************************************************************************************************************

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

//---------------------------------------Termina-------------------------------------------------


//function LlenarCMTMovimientos() {
//    $.get("/Supervision/BDTiposMovimiento", function (data) {
//        llenarCombo(data, document.getElementById("cmbMovimiento"));
//    });
//}

////funcion general para llenar los select
//function llenarCombo(data, control) {

//    var contenido = "";
//    contenido += "<option value='0'>--Seleccione--</option>";

//    for (var i = 0; i < data.length; i++) {
//        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
//    }
//    control.innerHTML = contenido;
//}

//Bloquea los input con la clase
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

///////////////////////////////////////////// 
//----------------------------Crea el grid a desplegar con el botón con la función de desplegar------------------------------------
//función que muestra la tabla del artículo
//Pasar los parametros(No.Pedido, Id del sitio para desplegar solo los pedidos que tiene esa tienda)
function Desplegar(no, id) {
    if (no == 0 && id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaArtTiendaLider/?No=" + no + "&Id= " + id, function (Data) {
            var DespXArt = "";
            //---Encabezado del grid---------
            DespXArt += "<hr class='solid4'>";
            DespXArt += "<div class='row'>";
            DespXArt += "<div class='col-sm'>NoPedido</div>";
            DespXArt += "<div class='col-sm'>Artículo</div>";
            DespXArt += "<div class='col-sm'>Fecha de Ingreso</div>";
            DespXArt += "<div class='col-sm'>Stock</div>";
            DespXArt += "<div class='col-sm'></div>";

            DespXArt += "</div>";
            DespXArt += "<hr class='solid4'>";


            let IdArticulos = Data.IdArticulos;
            let ArrayIdArticulos = IdArticulos.split(',');
            let NoPedido = Data.NoPedido;
            let ArrayNoPedido = NoPedido.split(',');
            let Fecha = Data.Fecha;
            let Arrayfecha = Fecha.split(',');
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            //El IdSitio se ocupa para conocer en qué tienda mostrar los pedidos
            let IdSitio = Data.IdSitio;
            let ArrayIdSitio = IdSitio.split(',');

            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');

            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                //----Cuerpo del grid-------------
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
            let compraArticulo = "desplegable" + no + "," + id;
            document.getElementById(compraArticulo).innerHTML = DespXArt;

        });
    }
}


function llenarComboTienda(data, control) {
    var contenido = "";
    //contenido += "<option value='0'>--Seleccione--</option>";

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
                //-------Crea los chex-box-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
                TablaArticulo += "<input  class='input-ArticulosPedidos sinborde limpiar ' disabled name=' " + Data[i].IdArticulos + "'   id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input-------------------------------------------------------------------------

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

function abrirModalMovimiento(IDTienda) {

    LimpiarCampos();
    if (IDTienda == 0) {
        sessionStorage.setItem('IDG', '0');

    }

    else {

        $.get("/Supervision/ConsultaArticulos/?IDTienda=" + IDTienda, function (Data) {
            //document.getElementById("cmbTienda").value = Data[0].IdTienda;
            document.getElementById("TxtArticuloM").value = Data[0].Articulo;

            //document.getElementById("TxtRFC").value = Data[0].RFC;
            //document.getElementById("TxtClabe").value = Data[0].Clabe;
            //document.getElementById("TxtCorreo").value = Data[0].Correo;
            //document.getElementById("TxtTelefono").value = Data[0].Telefono;
            //document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
            //document.getElementById("TxtDireccion").value = Data[0].Direccion;
            //document.getElementById("TxtNumPedidoProve").value = Data[0].NumPedidoProveedor;
            //Muestra los artículos que le pertenecen a ese proveedor----
            //MostrarArticulos(id);
            ////Muestra el número de pedido que le corresponde por proveedor-------
            //SiguientePedidoProveedor(id);devolucion
            ////Muestra el número de pedido que le corresponde-------
            //ConsultaSiguientePedido();

        });
        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            //sessionStorage.setItem('IdPedidosInternos', Data[0].IdPedidosInternos);
            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbTienda").value = Data[0].Tienda;


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
        $.get("/Supervision/ConsultaStockArticulos/?IDTienda=" + idS + "&IdArt= " + id, function (Data) {
            let Stock = Data.Stock;
            let Arraystock = Stock.split(',');
            document.getElementById("TxtExistenciaActDev").value = Arraystock[0];
        });


        ConsultaArt(idExist);
        ProvDev(idExist);
    }
}

function ObtenerFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaIngresoDev').value = fecha;

}
function ConsultaArt(idExist) {
    $.get("/Supervision/ConsultaArticuloModal/?id=" + idExist, function (Data) {
        document.getElementById("TxtArtDev").value = Data[0].Nombre;
        document.getElementById("TxtIdArtDev").value = Data[0].IdArticulo;

    });
}


function ProvDev(idExist) {

    $.get("/Supervision/ConsultaArtDev/?Id=" + idExist, function (Data) {
        document.getElementById("cmbProveedorDevLider").value = Data[0].IdProveedor;
        document.getElementById("TxtNoPedidoDev").value = Data[0].NoPedido;

    });
}

//function BDNoPedido(id) {

//    $.get("/Supervision/BDNoPedido/?Id=" + id, function (Data) {
//      ///  document.getElementById("cmbProveedorDevolucion").value = Data[0].IdProveedor;
//        document.getElementById("TxtNoPedidoDev").value = Data[0].NoPedido;

//    });
//}

function abrirModalMovimiento(IDTienda) {

    LimpiarCampos();
    if (IDTienda == 0) {
        sessionStorage.setItem('IDG', '0');

    }

    else {

        $.get("/Supervision/ConsultaArticulos/?IDTienda=" + IDTienda, function (Data) {
            //document.getElementById("cmbTienda").value = Data[0].IdTienda;
            document.getElementById("TxtArticuloM").value = Data[0].Articulo;

            //document.getElementById("TxtRFC").value = Data[0].RFC;
            //document.getElementById("TxtClabe").value = Data[0].Clabe;
            //document.getElementById("TxtCorreo").value = Data[0].Correo;
            //document.getElementById("TxtTelefono").value = Data[0].Telefono;
            //document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
            //document.getElementById("TxtDireccion").value = Data[0].Direccion;
            //document.getElementById("TxtNumPedidoProve").value = Data[0].NumPedidoProveedor;
            //Muestra los artículos que le pertenecen a ese proveedor----
            //MostrarArticulos(id);
            ////Muestra el número de pedido que le corresponde por proveedor-------
            //SiguientePedidoProveedor(id);
            ////Muestra el número de pedido que le corresponde-------
            //ConsultaSiguientePedido();

        });
        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            //sessionStorage.setItem('IdPedidosInternos', Data[0].IdPedidosInternos);
            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbTienda").value = Data[0].Tienda;


        });

    }
}



function MostrarArticulosDevolucion(idS) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (idS == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Supervision/ConsultaArticulosXtienda/?IdPro=" + idS, function (Data) {
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
            TablaArticulo += "<label>Descripción</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md- col-sm-12 col-xs-12 justify-content-end'>";
            //TablaArticulo += "<label>Precio_Unitario</label>";
            TablaArticulo += "</div>";
            for (var i = 0; i < Data.length; i++) {
                //-------Crea los chex-box-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                // TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar ' disabled name=' " + Data[i].IdArticulos + "'  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";

                TablaArticulo += "</div>";
                //-------Crea los input-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

                //-------Crea la lista de las unidades de medida por artículo-------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input type='text' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
                TablaArticulo += "<div class='col-md-0 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<label class='label-precio'  id='" + Data[i].IdArticulos + "' ></label>$<span class='help-block text-muted small-font'>" + Data[i].PrecioUnitarioPromedio + "</span>";
                TablaArticulo += "</div>";


            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulosDevolucion").innerHTML = TablaArticulo;
        });
    }
}

function abrirModalUsados(id, idS) {

    LimpiarCampos();
    if (idS == 0) {
        sessionStorage.setItem('IDG', '0');

    }

    else {

        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            sessionStorage.setItem('IDG', Data[0].IdExistenciaAlmacenG);
            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbTiendaUsados").value = Data[0].Tienda;


        });

        //Prov(id)
        //MostrarArticulosUsados(idS);
        MostrarUs(id, idS);
    }
}



//function Prov(id) {
//    $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
//        //document.getElementById("cmbTienda").value = Data[0].IdTienda;
//        document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
//        //document.getElementById("TxtRFC").value = Data[0].RFC;
//        //document.getElementById("TxtClabe").value = Data[0].Clabe;
//        //document.getElementById("TxtCorreo").value = Data[0].Correo;
//        //document.getElementById("TxtTelefono").value = Data[0].Telefono;
//        //document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
//        //document.getElementById("TxtDireccion").value = Data[0].Direccion;
//        //document.getElementById("TxtNumPedidoProve").value = Data[0].NumPedidoProveedor;
//        //Muestra los artículos que le pertenecen a ese proveedor----
//        MostrarArticulos(id);
//        //Muestra el número de pedido que le corresponde por proveedor-------
//        SiguientePedidoProveedor(id);
//        //Muestra el número de pedido que le corresponde-------
//        ConsultaSiguientePedido();

//    });
//}



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




//function MostrarArticulosUsados(idS) {
//    var controlesObligatorio = document.getElementsByClassName("obligatorio");
//    var ncontroles = controlesObligatorio.length;
//    for (var i = 0; i < ncontroles; i++) {//recorre
//        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
//    }
//    if (idS == 0) {
//        sessionStorage.setItem('IdPedidosExternos', '0');
//    }
//    else {

//        $.get("/Supervision/ConsultaArticulosXtienda/?IdPro=" + idS, function (Data) {
//            //-----------------------------------------------------------------------------------
//            var TablaArticulo = "";
//            TablaArticulo += "<div class='row row-cols-auto'>";
//            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>IdExistencia</label>";
//            TablaArticulo += "</div>";
//            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
//            TablaArticulo += "<label>Artículos</label>";
//            TablaArticulo += "</div>";
//            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Cantidad</label>";
//            TablaArticulo += "</div>";
//            //TablaArticulo += "<div class='col-md- col-sm-2 col-xs-12 justify-content-end'>";
//            //TablaArticulo += "<label>Precio_Unitario</label>";
//            //TablaArticulo += "</div>";
//            for (var i = 0; i < Data.length; i++) {
//                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<label   id='" + Data[i].IdArticulos + "' ></label><span class='help-block text-muted small-font'>" + Data[i].IdExistencia + "</span>";
//               // TablaArticulo += "<input  class='input-IdExistencia sinborde limpiar' disabled  name=' " + Data[i].IdExistencia +  "'  id='" + Data[i].IdExistencia + "'  value='" + Data[i].IdExistencia + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "<input  class='input-IdExistencia sinborde limpiar ' disabled name=' " + Data[i].IdExistencia + "'  id='" + Data[i].IdExistencia + "'  value='" + Data[i].IdExistencia + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "</div>";
//                //-------Crea los chex-box-------------------------------------------------------------------------
//                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
//                // TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
//                TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar ' disabled name=' " + Data[i].IdArticulos +  "'  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
//                  TablaArticulo += "</div>";


//                //-------Crea los input-------------------------------------------------------------------------
//                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
//                TablaArticulo += "<label>"
//                TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "</label>" 
//                TablaArticulo += "</div>";

//                //-------Crea la lista de las unidades de medida por artículo-------------------------------------------------------------------

//                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
//                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<label class='label-precio'  id='" + Data[i].IdArticulos + "' ></label>$<span class='help-block text-muted small-font'>" + Data[i].PrecioUnitarioPromedio + "</span>";
//                //TablaArticulo += "</div>";


//            }
//            TablaArticulo += "</div>";
//            TablaArticulo += "</div>";
//            document.getElementById("TblArticulosUsados").innerHTML = TablaArticulo;
//        });
//    }
//}



//function MostrarArticulosUsados(idS) {
//    var controlesObligatorio = document.getElementsByClassName("obligatorio");
//    var ncontroles = controlesObligatorio.length;
//    for (var i = 0; i < ncontroles; i++) {//recorre
//        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
//    }
//    if (idS == 0) {
//        sessionStorage.setItem('IdPedidosExternos', '0');
//    }
//    else {

//        $.get("/Supervision/ConsultaArticulosXtienda/?IdPro=" + idS, function (Data) {
//            //-----------------------------------------------------------------------------------
//            var TablaArticulo = "";
//            TablaArticulo += "<div class='row row-cols-auto'>";
//            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Id Existencia</label>";
//            TablaArticulo += "</div>";
//            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Artículos</label>";
//            TablaArticulo += "</div>";
//            TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Cantidad</label>";
//            TablaArticulo += "</div>";
//            ////TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//            ////TablaArticulo += "<label>Costo</label>";
//            ////TablaArticulo += "</div>";
//            //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//            //TablaArticulo += "<label>Precio Unitario</label>";
//            //TablaArticulo += "</div>";

//            //TablaArticulo += "<div class='col-md-1 col-sm-12 col-xs-12 justify-content-end'>";
//            //TablaArticulo += "<label>Existencia Actual</label>";
//            //TablaArticulo += "</div>";
//            for (var i = 0; i < Data.length; i++) {
//                //-------Crea los input con los nombres de los artículos por proveedor---------------------------
//                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
//                //  TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "<input  class='input-Unidad sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].IdExistencia + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "</div>";
//                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
//                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
//                TablaArticulo += "<label>"
//                TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar ' disabled name=' " + Data[i].IdArticulos + "'  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";

//                TablaArticulo += "</label>"
//                TablaArticulo += "</div>";
//                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
//                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
//                TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado limpiar' id='" + Data[i].IdArticulos + "' onchange='CalcularCosto(this.value)' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "</div>";

//                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input type='number' value='' class='input-res redondeado limpiar' disabled id='" + Data[i].IdArticulos + "'  ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";
//                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
//                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input  class='input-PrecioU sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'   value='" + Data[i].PrecioUnitarioPromedio + "' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";

//                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input  class='input-ExistenciaAct redondeado limpiar' id='" + Data[i].IdArticulos + "'  value='" + Data[i].ExistenciaActDevolucion + "' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";

//                //TablaArticulo += "<div class='col-md-1 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input  class='input-PrecioU sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'   value='" + Data[i].PrecioUnitarioPromedio + "' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";
//            }
//            TablaArticulo += "</div>";
//            TablaArticulo += "</div>";
//            document.getElementById("TblArticulosUsados").innerHTML = TablaArticulo;
//        });
//    }
//}




//function MostrarArticulosUsados(idS) {
//    var controlesObligatorio = document.getElementsByClassName("obligatorio");
//    var ncontroles = controlesObligatorio.length;
//    for (var i = 0; i < ncontroles; i++) {//recorre
//        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
//    }
//    if (idS == 0) {
//        sessionStorage.setItem('IdMovimiento', '0');
//    }
//    else {

//        $.get("/Supervision/ConsultaArticulos/?IDTienda=" + idS, function (Data) {
//            //-----------------------------------------------------------------------------------
//            var TablaArticulo = "";
//            TablaArticulo += "<div class='row row-cols-auto'>";
//            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Id Existencia</label>";
//            TablaArticulo += "</div>";
//            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Artículos</label>";
//            TablaArticulo += "</div>";
//            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//            TablaArticulo += "<label>Cantidad</label>";
//            TablaArticulo += "</div>";
//            //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//            //TablaArticulo += "<label>Stock</label>";
//            //TablaArticulo += "</div>";

//            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//            TablaArticulo += "<label>Existencia Actual</label>";
//            TablaArticulo += "</div>";

//            let IdArticulos = Data.IdArticulos;
//            let ArrayIdArticulos = IdArticulos.split(',');
//            let NoPedido = Data.NoPedido;
//            let ArrayNoPedido = NoPedido.split(',');
//            let Fecha = Data.Fecha;
//            let Arrayfecha = Fecha.split(',');
//            let Stock = Data.Stock;
//            let Arraystock = Stock.split(',');
//            //El IdSitio se ocupa para conocer en qué tienda mostrar los pedidos
//            //let IdSitio = Data.IdSitio;
//            //let ArrayIdSitio = IdSitio.split(',');

//            let Articulo = Data.Articulo;
//            let ArrayArticulo = Articulo.split(',');
//            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
//            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');


//            for (var i = 0; i < ArrayIdArticulos.length; i++) {
//                //-------Crea los input con los nombres de los artículos por proveedor---------------------------
           

//                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
//                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado sinborde limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularExistenciaAct(this.value)' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";


//                //if (ArrayIdArticulos[i] == 0) {
//                //    TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//                //    TablaArticulo += "<input type='number' value='' class='input-cantidadUsados  sinborde limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularExistenciaAct(this.value)' ><span class='help-block text-muted small-font'></span>";
//                //    TablaArticulo += "</div>";

//                //}

//                if (ArrayIdArticulos[i] > 0) {
//                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                    //  TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
//                    TablaArticulo += "<input  class='input-IdExistencia sinborde limpiar' disabled  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayIdExistenciaAlmacenG[i] + "' ><span class='help-block text-muted small-font'></span>";
//                    TablaArticulo += "</div>";
//                    //-------Crea los input para la cantidad solicitada------------------------------------------------------------
//                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                    TablaArticulo += "<label>"
//                    TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";

//                    TablaArticulo += "</label>"
//                    TablaArticulo += "</div>";
//                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                    TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularExistenciaAct(this.value)' ><span class='help-block text-muted small-font'></span>";
//                    TablaArticulo += "</div>";
//                    //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//                    //TablaArticulo += "<input type='number' value='' class='input-existAct redondeado limpiar' disabled id='" + ArrayIdArticulos[i] + "' ><span class='help-block text-muted small-font'></span>";
//                    //TablaArticulo += "</div>";
//                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                    TablaArticulo += "<input  class='input-Stock sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + Arraystock[i] + "' ><span class='help-block text-muted small-font'></span>";
//                    TablaArticulo += "</div>";
//                }


               
//                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input type='number' value='' class='input-existAct redondeado limpiar' disabled id='" + ArrayIdArticulos[i] + "' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";

//                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input type='number' value='' class='input-usados redondeado limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularCosto(this.value)' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";
//                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
//                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input  class='input-PrecioU sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'   value='" + Data[i].PrecioUnitarioPromedio + "' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";

//                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input  class='input-ExistenciaAct redondeado limpiar' id='" + Data[i].IdArticulos + "'  value='" + Data[i].ExistenciaActDevolucion + "' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";

//                //TablaArticulo += "<div class='col-md-1 col-sm-12 col-xs-12 justify-content-end'>";
//                //TablaArticulo += "<input  class='input-PrecioU sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'   value='" + Data[i].PrecioUnitarioPromedio + "' ><span class='help-block text-muted small-font'></span>";
//                //TablaArticulo += "</div>";
//            }
//            TablaArticulo += "</div>";
//            TablaArticulo += "</div>";
//            document.getElementById("TblArticulosUsados").innerHTML = TablaArticulo;
//        });
//    }
//}




function GuardarUsados() {

    if (CamposObligatoriosUsados() == true) {

        if (confirm("¿Desea aplicar los cambios?") == 1) {
            //----------Guardar los inputs de manera individual en la Base de datos--------------------
            var cantidadUsados = document.getElementsByClassName("input-cantidadUsados");

            var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");

            var IdExistencia = document.getElementsByClassName("input-IdExistencia");

            //var Precio = document.getElementsByClassName("input-res");

            for (let i = 0; i < cantidadUsados.length; i++) {
                if (cantidadUsados[i].value >= 1 && NomArticulos[i].value && IdExistencia[i].value) {
                    // if (NumPedidos[i].value >= 1 && NomArticulos[i].value && UnidadM[i].value && Precio[i].value) {

                    var IdMovimiento = sessionStorage.getItem('IdMovimiento');
                    var Movimiento = document.getElementById("TxtMovUsados").value;
                    var Fecha = document.getElementById("TxtFechaIngresoUsados").value;

                    //------------------------Guarda el nombre del artículo solicitado----------------------------------
                    var IdArticulo = NomArticulos[i].name;
                    var Articulo = NomArticulos[i].value;
                    //------------------------Guarda la cantidad de artículos solicitados----------------------------------
                    var CantidadSolicitada = cantidadUsados[i].value;
                    //------------------------Guarda la unidad media de los artículos solicitados----------------------------------
                    var Unidad = IdExistencia[i].value;
                    //------------------------Guarda el precio unitario de los artículos solicitados----------------------------------
                    // var PrecioUnitario = Precio[i].value;
                    // var Costo = Precio[i].value;
                    //-------------------------------------------------------------------------------------------------------------
                    var frm = new FormData();
                    frm.append("IdMovimiento", IdMovimiento);
                    frm.append("Movimiento", Movimiento);
                    frm.append("Fecha", Fecha);
                    frm.append("IdArticulo", IdArticulo);
                    frm.append("Articulo", Articulo);
                    //frm.append("NumeroPedido", NumeroPedido);
                    //frm.append("NumPedidoProveedor", NumPedidoProveedor);
                    frm.append("Cantidad", CantidadSolicitada);
                    frm.append("IdExistencia", Unidad);
                    // frm.append("PrecioUnitario", PrecioUnitario);

                    //frm.append("Costo", Costo);
                    //frm.append("IdArea", IdArea);
                    //frm.append("Area", Area);
                    //frm.append("Direccion", Direccion);
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
                        
                               // nuevoStockUsados();
                                // alert("Guardado correctamente");
                                document.getElementById("btnCancelar").click();
                            }
                        }
                    });

                }
            }
            //nuevoStock();
            //-----Mensaje de confirmación-----------------------
            // alert("Guardado correctamente");
        }
    }

}



//function GuardarExistAlm() {
//    if (CamposObligatoriosUsados() == true) {
//        var cantidad = document.getElementsByClassName("input-cantidadUsados");
//        //    if (confirm("¿Desea aplicar los cambios?") == 1) {
//        //----------Guardar los inputs de manera individual en la Base de datos--------------------
//        var ExistAct = document.getElementsByClassName("input-existAct");

//        var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");

//        var IdExistencia = document.getElementsByClassName("input-IdExistencia");
//        //var UnidadM = document.getElementsByClassName("input-Unidad");

//        //var Precio = document.getElementsByClassName("input-res");

//        for (let i = 0; i < ExistAct.length; i++) {
//            if (cantidad[i].value >= 1 && NomArticulos[i].value && IdExistencia[i].value) {
//                // if (NumPedidos[i].value >= 1 && NomArticulos[i].value && UnidadM[i].value && Precio[i].value) {

//                var IdExistenciaAlmacenG = sessionStorage.getItem('IDG');
//                //var Movimiento = document.getElementById("TxtMovUsados").value;
//                //var Fecha = document.getElementById("TxtFechaIngresoUsados").value;

//                //------------------------Guarda el nombre del artículo solicitado----------------------------------
//                var IdArticulo = NomArticulos[i].name;
//                var Articulo = NomArticulos[i].value;
//                //------------------------Guarda la cantidad de artículos solicitados----------------------------------
//                var CantidadSolicitada = ExistAct[i].value;
//                //------------------------Guarda la unidad media de los artículos solicitados----------------------------------
//                var Unidad = IdExistencia[i].value;
//                //------------------------Guarda el precio unitario de los artículos solicitados----------------------------------
//                // var PrecioUnitario = Precio[i].value;
//                // var Costo = Precio[i].value;
//                //-------------------------------------------------------------------------------------------------------------
//                var frm = new FormData();

//                //var resultado = parseFloat(Unidad) - parseFloat(CantidadSolicitada);

//                //if (resultado < 0) {

//                //    Swal.fire(
//                //        '!',
//                //        'La cantidad excede al stock',
//                //        'alert'
//                //    )
//                //    resultado == 0;
//                //    var Result = ExistAct[i].value = "";
//                //    var cantidad = res[i].value = "";
//                //} else {
//                //    var Result = res[i].value = resultado;
//                //}
//                frm.append("IdExistenciaAlmacenG", Unidad);
//                //frm.append("Movimiento", Movimiento);
//                //frm.append("Fecha", Fecha);
//                //frm.append("IdArticulo", IdArticulo);
//                //frm.append("Articulo", Articulo);
//                //frm.append("NumeroPedido", NumeroPedido);
//                //frm.append("NumPedidoProveedor", NumPedidoProveedor);

//                frm.append("ExitenciaActual", CantidadSolicitada);
//                //frm.append("IdExistencia", Unidad);
//                // frm.append("PrecioUnitario", PrecioUnitario);

//                //frm.append("Costo", Costo);
//                //frm.append("IdArea", IdArea);
//                //frm.append("Area", Area);
//                //frm.append("Direccion", Direccion);
//                //frm.append("Estatus", 1);
//                $.ajax({
//                    type: "POST",
//                    url: "/Supervision/GuardarExt",
//                    data: frm,
//                    contentType: false,
//                    processData: false,
//                    success: function (data) {
//                        if (data == 0) {
//                            alert("Ocurrió un error");
//                        }
//                        else if (data == -1) {
//                            alert("Ya existe este registro");
//                        }
//                        else {

//                            document.getElementById("btnCancelar").click();
//                        }
//                    }
//                });

//            }
//        }

//        // nuevoStock();
//        //-----Mensaje de confirmación-----------------------
//        nuevoStockUsados
//    }
//    alert("Guardado correctamente");
//    //}
//}



//function nuevoStockUsados() {

//    var Articulos = document.getElementsByClassName("input-ArticuloUsados");
//    var IDArticulos = document.getElementsByClassName("input-ArticuloUsados");
//    var Aprobar = document.getElementsByClassName("input-cantidadUsados");


//    var total = "";

//    for (let i = 0; i < Articulos.length; i++) {

//        if (Aprobar[i].value > 0) {

//            total += IDArticulos[i].name + ":" + Aprobar[i].value + "/";

//        }
//    }

//    $.get("/Supervision/ConsultaStockArticuloUsado/?DatosArticulos=" + total, function (Data) {
//        let RES = Data;
//        GuardarUsados();
//        if (Data == 1) { alert("Guardado correctamente") }

//    });
//}
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
       
     
        //if (Data == 1) { alert("===Guardado correctamente===") }
 
    });
    //GuardarUsados();
    alert("Guardado correctamente");
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
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            //TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
            //TablaArticulo += "<label>Unidad de Medida</label>";
            //TablaArticulo += "</div>";
            //TablaArticulo += "<div class='col-md-0 col-sm-12 col-xs-12 justify-content-end'>";
            ////TablaArticulo += "<label>Precio_Unitario</label>";
            //TablaArticulo += "</div>";
            for (var i = 0; i < Data.length; i++) {
                //-------Crea los chex-box-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
                TablaArticulo += "<input  class='input-ArticulosPedidos sinborde limpiar ' disabled name=' " + Data[i].IdArticulos + "'   id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input-------------------------------------------------------------------------

            


                //if (Data[i].IdArticulos > 0) {
                    //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                    //TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularExistenciaAct(this.value)' ><span class='help-block text-muted small-font'></span>";
                    //TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";

                    TablaArticulo += "<input type='number' value='' class='input-cantidadPedidos  redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</label>"
                    TablaArticulo += "</div>";
                //}
           

                //-------Crea la lista de las unidades de medida por artículo-------------------------------------------------------------------
                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                ////TablaArticulo += "<label   id='" + Data[i].IdArticulos + "' ></label><span class='help-block text-muted small-font'>" + Data[i].Unidad + "</span>";
                //TablaArticulo += "<input  class='input-ArticulosPedidos sinborde limpiar ' disabled name=' " + Data[i].IdArticulos + "'   id='" + Data[i].IdArticulos + "'  value='" + Data[i].Unidad + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";
                ////-------Crea la lista de los precios por artículo---------------------------------------------------------------
                //TablaArticulo += "<div class='col-md-0 col-sm-12 col-xs-12 justify-content-end'>";
                ////TablaArticulo += "<label class='label-precio'  id='" + Data[i].IdArticulos + "' ></label>$<span class='help-block text-muted small-font'>" + Data[i].PrecioUnitarioPromedio + "</span>";
                //TablaArticulo += "</div>";


            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}
//----------------Abrir modal de Pedidos Internos--------------------------------------------------------
//function abrirModal(id) {
//    LlenarCMCProveedores();
//    //LlenarCMBTienda();
//    LimpiarCampos();
//    if (id == 0) {
//        sessionStorage.setItem('IdPedidosInternos', '0');
//    }
//    else {
//        $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
//            //sessionStorage.setItem('IdPedidosInternos', Data[0].IdPedidosInternos);
//            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
//            document.getElementById("cmbTienda").value = Data[0].Tienda;
//            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
//            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;

//        });
//        //$.get("/Pedidosint/ConsultaPedidoInterno/?Id=" + id, function (Data) {

//        //    document.getElementById("cmbProv").value = Data[0].IdProveedor;
//        //});
//        //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;

//        MostrarArticulos(id);
//        ConsultaSiguientePedido();

//    }
//}



//function abrirModal(id) {
//    LlenarCMCProveedores();
//    LimpiarCampos();
//    if (id == 0) {
//        sessionStorage.setItem('IDG', '0');

//    }
//    else {

//        $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
//            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
//            //document.getElementById("TxtRFC").value = Data[0].RFC;
//            //document.getElementById("TxtClabe").value = Data[0].Clabe;
//            //document.getElementById("TxtCorreo").value = Data[0].Correo;
//            //document.getElementById("TxtTelefono").value = Data[0].Telefono;
//            //document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
//            //document.getElementById("TxtDireccion").value = Data[0].Direccion;
//            //---Muestra los artículos que le pertenecen a ese proveedor----
//            MostrarArticulos(id);
//            //----Muestra el número de pedido que le corresponde-------
//            ConsultaSiguientePedido();
//        });
//    }
//}


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

//----------------------Guardar datos de los pedidos-----------------------------------------------
function GuardarPedidoInterno() {

    if (CamposObligatorios() == true) {

        if (confirm("¿Desea aplicar los cambios?") == 1) {

            //----------Guardar los inputs y checkbox de manera individual en la Base de datos--------------------
            var NumPedidos = document.getElementsByClassName("input-cantidadPedidos");

            //let llenar = "";
            var ChevPedidos = document.getElementsByClassName("input-ArticulosPedidos");
            //let seleccionados = "";

            for (let i = 0; i < NumPedidos.length; i++) {
                if (NumPedidos[i].value >= 1 && ChevPedidos[i].value) {
                    //llenar += NumPedidos[i].value;
                    //seleccionados += ChevPedidos[i].id;

                    var IdPedidosExternos = sessionStorage.getItem('IdPedidosExternos');
                    var IdProveedor = document.getElementById("cmbProveedor").value;
                    var TempProvedor = document.getElementById("cmbProveedor");
                    var Proveedor = TempProvedor.options[TempProvedor.selectedIndex].text;
                    var NumeroPedido = document.getElementById("TxtNumeroPedido").value;
                    var NumPedidoProveedor = document.getElementById("TxtNumPedidoProveedor").value;
                    var Fecha = document.getElementById("TxtFechaIngreso").value;
                    //------------------------Guarda checkbox de los artículos seleccionados----------------------------------
                    var IdArticulo = ChevPedidos[i].name;
                    var Articulo = ChevPedidos[i].value;

                    //var Articulo = ChevPedidos[i].id;
                    //------------------------Guarda la cantidad de artículos solicitados----------------------------------
                    var CantidadSolicitada = NumPedidos[i].value;
                    //------------------------------------------------------------------------------------------------------

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

                        }
                    });
                }
            }
            //-----Mensaje de confirmación-----------------------
            alert("Los datos se guardaron correctamente");
            ConsultaArticuloComp();
            document.getElementById("btnCancelar").click();
        }
    }
}


function GuardarDevolucion() {


    if (CamposObligatoriosDevolucion() == true) {

        if (confirm("¿Desea aplicar los cambios?") == 1) {
            nuevoStock();
            alert("Los datos se guardaron correctamente");
        }
    }
   
}

//function GuardarDevolucion() {
//    if (CamposObligatoriosDevolucion() == true) {
//        if (confirm("¿Desea aplicar los cambios?") == 1) {
//            //var IDPerfil = document.getElementById("TxtIDPerfil").value;
//            var IdExistenciaAlmagenG = sessionStorage.getItem('IdExistenciaAlmagenG');
//            var Observaciones = document.getElementById("TxtDescripcionDev").value;
//            var TipoDeOperacion = document.getElementById("TxtMovDev").value;
//            //var ChevPermisos = document.getElementsByClassName("checkbox-area");
//            //let seleccionados = "";
//            //for (let i = 0; i < ChevPermisos.length; i++) {
//            //    if (ChevPermisos[i].checked == true) {
//            //        seleccionados += ChevPermisos[i].id;
//            //        seleccionados += "#";
//            //    }
//            //}
//            //var Permisos = seleccionados.substring(0, seleccionados.length - 1);
//            //var Comentarios = document.getElementById("TxtComentarios").value;
//            var frm = new FormData();
//            frm.append("IdExistenciaAlmagenG", IdExistenciaAlmagenG);
//            frm.append("Observaciones", Observaciones);
//            frm.append("TipoDeOperacion", TipoDeOperacion);
//            //frm.append("Permisos", Permisos);
//            //frm.append("Comentarios", Comentarios);
//            frm.append("Estatus", 1);
//            $.ajax({
//                type: "POST",
//                url: "/Supervision/GuardarDevolucion",
//                data: frm,
//                contentType: false,
//                processData: false,
//                success: function (data) {
//                    if (data == 0) {
//                        Swal.fire(
//                            '',
//                            'Ocurrió un error',
//                            'danger'
//                        )
//                    }
//                    else if (data == -1) {
//                        Swal.fire(
//                            '',
//                            'Ya existe',
//                            'warning'
//                        )
//                    }
//                    else {
//                        Swal.fire(
//                            '¡GUARDADO!',
//                            'Se guardó correctamente.',
//                            'success'
//                        )
//                        ConsultaArticuloComp();
//                        document.getElementById("btnCancelarDevolucion").click();
//                    }
//                }
//            });
//        }
//    }
//}



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
//-----------------------------------Llenar el comobobox de proveedores------------------------------------------------------
//function LlenarCMBTienda(Id) {
//    //$.get("/Supervision/BDProveedor", function (data) {
//    //    llenarCombo(data, document.getElementById("cmbProveedor"));
//    //});
//    $.get("/Supervision/BDTienda/?Id=" + Id, function (data) {
//        llenarCombo(data, document.getElementById("cmbTienda"));
//    });
//}

//funcion general para llenar los select
function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}


//function MostrarArticulos() {

//    //if (id == 0) {
//    //    sessionStorage.setItem('IdPedidosInternos', '0');
//    //}
//    //else {

//    $.get("/Supervision/ConsultaArtProveedores", function (Data) {

//        let ID = Data.ID;
//        let ArrayID = ID.split(',');
//        let Articulos = Data.Articulos;
//        let ArrayArticulos = Articulos.split(',');

//        var TablaArticulo = "";
//        TablaArticulo += "<div class='row row-cols-auto'>";

//        for (var i = 0; i < (ArrayArticulos, ArrayID).length; i++) {
//            //-------Crea los chex-box-------------------------------------------------------------------------
//            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
//            TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + ArrayID[i] + "' ><span class='help-block text-muted small-font'>" + ArrayArticulos[i] + "</span>";
//            TablaArticulo += "</div>";

//            //-------Crea los input-------------------------------------------------------------------------
//            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
//            TablaArticulo += "<label>"
//            TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado' id='" + ArrayID[i] + "' ><span class='help-block text-muted small-font'></span>";
//            TablaArticulo += "</label>"
//            TablaArticulo += "</div>";
//        }
//        TablaArticulo += "</div>";
//        document.getElementById("TblArticulos").innerHTML = TablaArticulo;
//    });
//    //}
//}

//function MostrarArticulos(id) {
//       var controlesObligatorio = document.getElementsByClassName("obligatorio");
//    var ncontroles = controlesObligatorio.length;
//    for (var i = 0; i < ncontroles; i++) {//recorre
//        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
//    }
//    if (id == 0) {
//        sessionStorage.setItem('IdPedidosExternos', '0');
//    }
//    else {

//        $.get("/Supervision/ConsultaArtProveedores/?IdP=" + id, function (Data) {

//            let ID = Data.ID;
//            let ArrayID = ID.split(',');
//            let Articulos = Data.Articulos;
//            let ArrayArticulos = Articulos.split(',');

//            var TablaArticulo = "";
//            TablaArticulo += "<div class='row row-cols-auto'>";

//            for (var i = 0; i < (ArrayArticulos, ArrayID).length; i++) {
//                //-------Crea los chex-box-------------------------------------------------------------------------
//                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
//                TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + ArrayID[i] + "' ><span class='help-block text-muted small-font'>" + ArrayArticulos[i] + "</span>";
//                TablaArticulo += "</div>";

//                //-------Crea los input-------------------------------------------------------------------------
//                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
//                TablaArticulo += "<label>"
//                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado' id='" + ArrayID[i] + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "</label>"
//                TablaArticulo += "</div>";
//            }
//            TablaArticulo += "</div>";
//            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
//        });
//    }
//}

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
            if (cantidadUsados[i].value <0 && NomArticulos[i].value && Stock[i].value) {

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


/////////////Validaciones modal devoluciones

function CalcularExistenciaAct(id) {

    $.get("/Supervision/ConsultaArticulos/?IDTienda=" + id, function (Data) {
        let x = document.getElementById("TxtExistenciaInicDev").value;

        let y = document.getElementById("TxtCantidadDev").value;
        //var res = document.getElementsByClassName("TxtExistenciaInicDev");

        //var cantidadUsados = document.getElementsByClassName("input-cantidadUsados");

        //var NomArticulos = document.getElementsByClassName("input-ArticuloUsados");

        //var Stock = document.getElementsByClassName("input-Stock");
        for (let i = 0; i < y; i++) {
            if (cantidadUsados[i].value >= 1 && NomArticulos[i].value && Stock[i].value) {
                var CantidadSolicitada = cantidadUsados[i].value;
                var Existencia = Stock[i].value;
                var frm = new FormData();
                var resultado = parseFloat(Existencia) - parseFloat(CantidadSolicitada);
                //Si la cantidad excede al stock en tienda ( modal de devoluciones )
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
        //Validacion de numeros negativos en el modal de devoluciones
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


//////////


function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

//function LlenarCMCProveedores() {
//    $.get("/GLOBAL/Areas", function (data) {
//        llenarCombo(data, document.getElementById("cmbProveedor"));
//    });
//}
//function LlenarCMCProveedores() {
//    $.get("/Prueba/BDProveedor", function (data) {
//        llenarCombo(data, document.getElementById("cmbProveedor"));
//    });

//}

//function LlenarCMCProveedores() {
//    $.get("/Supervision/BDProveedor", function (data) {
//        llenarCombo(data, document.getElementById("cmbProveedor"));
//    });
//    $.get("/Supervision/BDProveedor", function (data) {
//        llenarCombo(data, document.getElementById("cmbProveedorDevolucion"));
//    });
//}

//llenar combo de proveedores-devoluciones
function LlenarComboProveedores() {
    $.get("/Supervision/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });
    $.get("/Supervision/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedorDevLider"));
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
//-----Stock actual-------------


//-----------------------------------Función  para el nuevo stock---------------------------------------
function nuevoStock() {


    var Articulos = document.getElementById("TxtArtDev").value;
    var IDArticulos = document.getElementById("TxtIdArtDev").value;
    var Aprobar = document.getElementById("TxtCantidadDev").value;
    var Observaciones = document.getElementById("TxtDescripcionDev").value;
    var IDTienda = document.getElementById("TxtIdTiendaDev").value;
    var total = "";

    //for (let i = 0; i < Articulos.length; i++) {

    //    if (Aprobar > 0) {

    total += IDArticulos + ":" + Aprobar + "/" + IDTienda + "," + Observaciones + "#";

    //    }
    //}

    $.get("/Supervision/ConsultaStockArticulo/?DatosArticulos=" + total, function (Data) {
        let RES = Data;
        if (Data == 1) { alert("--Alerta---") }

    });
}



function VerPedido(id, no) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaAceptarPedido/?No=" + no + "&Id= " + id, function (Data) {
            //$.get("/Pedidosint/ConsultaPedidoXnum/?Num=" + num, function (Data) {
            document.getElementById("TxtNumeroPedidoArt").textContent = Data[0].NoCompraProveedor;
            document.getElementById("TxtProveedor").textContent = Data[0].Proveedor;

            document.getElementById("TxtTelefono").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreo").textContent = Data[0].Correo;
            document.getElementById("TxtFecha").textContent = Data[0].Fecha;
            document.getElementById("TxtDepartamento").textContent = Data[0].Tienda;
            document.getElementById("TxtDireccion").textContent = Data[0].Direccion;
          //  document.getElementById("TxtNumeroPedido").textContent = Data[0].NoCompraProveedor;
            MostrarArticulos(id, no);
            //MostrarArt(id, no); 
        });
    }
}


function MostrarArticulos(id, no) {
    // var controlesObligatorio = document.getElementsByClassName("obligatorio");
    // var ncontroles = controlesObligatorio.length;
    //for (var i = 0; i < ncontroles; i++) {//recorre
    //    controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    //}
    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Supervision/usado/?id=" + id + "&no= " + no, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";

            TablaArticulo += "<label>Articulo</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";

            TablaArticulo += "<label>Cantidad Solicitada</label>";
            TablaArticulo += "</div>";

            for (var i = 0; i < Data.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor---------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                //  TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "<input  class='input-Unidad sinborde limpiar' disabled  id='" + Data[i].IdArticulo + "'  value='" + Data[i].Articulo + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar ' disabled name=' " + Data[i].IdArticulo + "'  id='" + Data[i].IdArticulo + "'  value='" + Data[i].CantidadSolicitada + "' ><span class='help-block text-muted small-font'></span>";

                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArt").innerHTML = TablaArticulo;
        });
    }
}





function abrirModalUs(no, id) {

    LimpiarCampos();
    if (id == 0) {
        sessionStorage.setItem('IDG', '0');

    }

    else {

        //$.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
        //    sessionStorage.setItem('IDG', Data[0].IdExistenciaAlmacenG);
        //    //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
        //    document.getElementById("cmbTiendaUsados").value = Data[0].Tienda;


        //});

        //Prov(id)
        MostrarUs(no, id);
    }
}


function MostrarUs(id, idS) {
    //var controlesObligatorio = document.getElementsByClassName("obligatorio");
    //var ncontroles = controlesObligatorio.length;
    //for (var i = 0; i < ncontroles; i++) {//recorre
    //    controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    //}
    if (idS == 0) {
        sessionStorage.setItem('IdMovimiento', '0');
    }
    else {

        $.get("/Supervision/ConsultaPedidosUs/?idS=" + idS, function (Data) {
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
            //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            //TablaArticulo += "<label>Stock</label>";
            //TablaArticulo += "</div>";

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
            //El IdSitio se ocupa para conocer en qué tienda mostrar los pedidos
            //let IdSitio = Data.IdSitio;
            //let ArrayIdSitio = IdSitio.split(',');

            let Nombre = Data.Nombre;
            let ArrayArticulo = Nombre.split(',');
            let IdExistenciaAlmacenG = Data.IdExistenciaAlmacenG;
            let ArrayIdExistenciaAlmacenG = IdExistenciaAlmacenG.split(',');


            for (var i = 0; i < ArrayIdArticulos.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor---------------------------


                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado sinborde limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularExistenciaAct(this.value)' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";


                //if (ArrayIdArticulos[i] == 0) {
                //    TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                //    TablaArticulo += "<input type='number' value='' class='input-cantidadUsados  sinborde limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularExistenciaAct(this.value)' ><span class='help-block text-muted small-font'></span>";
                //    TablaArticulo += "</div>";

                //}

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
                    //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                    //TablaArticulo += "<input type='number' value='' class='input-existAct redondeado limpiar' disabled id='" + ArrayIdArticulos[i] + "' ><span class='help-block text-muted small-font'></span>";
                    //TablaArticulo += "</div>";
                    TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                    TablaArticulo += "<input  class='input-Stock sinborde limpiar ' disabled name=' " + ArrayIdArticulos[i] + "'  id='" + ArrayIdArticulos[i] + "'  value='" + Arraystock[i] + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</div>";
                }



                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input type='number' value='' class='input-existAct redondeado limpiar' disabled id='" + ArrayIdArticulos[i] + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";

                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input type='number' value='' class='input-usados redondeado limpiar' id='" + ArrayIdArticulos[i] + "' onchange='CalcularCosto(this.value)' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";
                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='input-PrecioU sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'   value='" + Data[i].PrecioUnitarioPromedio + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";

                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='input-ExistenciaAct redondeado limpiar' id='" + Data[i].IdArticulos + "'  value='" + Data[i].ExistenciaActDevolucion + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";

                //TablaArticulo += "<div class='col-md-1 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='input-PrecioU sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'   value='" + Data[i].PrecioUnitarioPromedio + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulosUsados").innerHTML = TablaArticulo;
        });
    }
}
//function MostrarUs(no, id) {
//    // var controlesObligatorio = document.getElementsByClassName("obligatorio");
//    // var ncontroles = controlesObligatorio.length;
//    //for (var i = 0; i < ncontroles; i++) {//recorre
//    //    controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
//    //}
//    if (id == 0) {
//        sessionStorage.setItem('IdPedidosExternos', '0');
//    }
//    else {
//        $.get("/Supervision/MostrarArtUsado/?id=" + id, function (Data) {
//        //$.get("/Supervision/usado/?id=" + id + "&no= " + no, function (Data) {
//            //-----------------------------------------------------------------------------------
//            var TablaArticulo = "";
//            TablaArticulo += "<div class='row row-cols-auto'>";
//            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Articulo</label>";
//            TablaArticulo += "</div>";
//            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";

//            TablaArticulo += "<label>Cantidad Solicitada</label>";
//            TablaArticulo += "</div>";

//            for (var i = 0; i < Data.length; i++) {
//                //-------Crea los input con los nombres de los artículos por proveedor---------------------------
//                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
//                //  TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "<input  class='input-Unidad sinborde limpiar' disabled  id='" + Data[i].IdArticulo + "'  value='" + Data[i].Articulo + "' ><span class='help-block text-muted small-font'></span>";
//                TablaArticulo += "</div>";
//                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
//                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
//                TablaArticulo += "<label>"
//                TablaArticulo += "<input  class='input-ArticuloUsados sinborde limpiar ' disabled name=' " + Data[i].IdArticulo + "'  id='" + Data[i].IdArticulo + "'  value='" + Data[i].CantidadSolicitada + "' ><span class='help-block text-muted small-font'></span>";

//                TablaArticulo += "</label>"
//                TablaArticulo += "</div>";

//            }
//            TablaArticulo += "</div>";
//            TablaArticulo += "</div>";
//            document.getElementById("TblArtUs").innerHTML = TablaArticulo;
//        });
//    }
//}
