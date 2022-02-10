//LlenarCMTMovimientos();
LlenarCMCProveedores();
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
               // CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayId[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayProveedor[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfecha[i] + "</div>";
                //CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraystock[i] + "</div>";
                //-----------------Botón para desplegar la primera tabla-------------- 
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido
                CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayIdCmpraInt[i] + ", " + ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
                CodigoHtmlArticuloComp += "<button title='Pedido' class='btn btn-primary' onclick='VerPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + ")'data-toggle='modal' data-target='#ModalPedidos'><i class='fas fa-archive'></i></button>";


                //  CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='VerPedido(" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#ModalPedidos" + ArrayIdCmpraInt[i] + "," + ArrayNoPedido[i] + "' aria-expanded='false' aria-controls='desplegable2(" + ArrayIdCmpraInt[i] + ", " + ArrayNoPedido[i] + ")'><i class='fas fa-angle-down'></i></button>";
              //CodigoHtmlArticuloComp += "<button title='Devoluciones' class='btn btn-primary' onclick='abrirModalDevoluciones(" + ArrayId[i] + "," + ArrayIdSitio[i] + ")'data-toggle='modal' data-target='#ModalDevoluciones'><i class='fas fa-archive'></i></button>";
                //CodigoHtmlArticuloComp += "</label>";

                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido

                CodigoHtmlArticuloComp += "</div>";
                //-------------Termina----------------------------------------
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                //------------------------Despliega primer grid-----------------------------------------------------------------------
                CodigoHtmlArticuloComp += "<div class='row'>";
               // CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayIdCmpraInt[i] + "," + ArrayIdSitio[i] + "' class='collapse'></div></div>";
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
            CodigoHtmlArticuloComp += "<div class='col-sm'>ID</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>No. de Pedido</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Proveedor</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha de Ingreso</div>";
            //CodigoHtmlArticuloComp += "<div class='col-sm'>Stock</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "</div>";

            //let IdPedido = Data.IdPedido;
            //let ArrayIdPedido = IdPedido.split(',');
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




            //let Costos = Data.Costos;
            //let Arraycostos = Costos.split(',');

            for (var i = 0; i < ArrayId.length; i++) {

                CodigoHtmlArticuloComp += "<div>";
                CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayId[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayNoPedido[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayProveedor[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfechas[i] + "</div>";
                //CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraystock[i] + "</div>";

                //CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayIdSitio[i] + "</div>";
                //-----------------Botón para desplegar la primera tabla--------------
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido
                //CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayNoPedido[i] + ", " + ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
                // CodigoHtmlArticuloComp += "<button title='Clic para aceptar el pedido' class='btn btn-primary' onclick='AceptarPedido(" + ArrayId[i] + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-archive'></i></button>";
              //  CodigoHtmlArticuloComp += "<button title='Clic para Aceptar el pedido' class='btn btn-primary' id='hide' onclick='abrirModalAceptarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + ")'  data-toggle='modal' data-target='#abrirModalAceptarPedido'><i class='fas fa-archive'></i></button>";
                CodigoHtmlArticuloComp += "<button title='Clic para Aceptar el pedido' class='btn btn-primary' id='hide' onclick='abrirModalAceptarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + ")'  data-toggle='modal' data-target='#abrirModalAceptarPedido'><i class='fas fa-archive'></i></button>";
               // CodigoHtmlArticuloComp += "<button title='Clic para Aceptar pedido' class='btn btn-outline-primary' onclick='abrirModalAceptarPedido(" + ArrayId[i] + "," + ArrayNoPedido[i] + ")' type='button' data-toggle='collapse' data-target='#abrirModalAceptarPedido" + ArrayId[i] + "," + ArrayNoPedido[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayId[i] + ", " + ArrayNoPedido[i] + ")'><i class='fas fa-angle-down'></i></button>";


                //CodigoHtmlArticuloComp += "</label>";

                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido

                CodigoHtmlArticuloComp += "</div>";
                //-------------Termina----------------------------------------
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                //------------------------Despliega primer grid-----------------------------------------------------------------------
                //CodigoHtmlArticuloComp += "<div class='row'>";
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
function mostrarBoton() {
    //btn_1.disabled = 'true';
    //btn_2.disabled = 'true';
    ////btn_3.style.display = 'inline';
    //document.getElementById('btn-2').disabled)==false
    //$('#btn-1').prop('disabled', true);
    $('#btn-1').prop('disabled', true);

    Guardar();
    // CodigoHtmlArticuloComp += "<td><button class='btn btn-primary disabled'  id='btn-2' data-title='Ver pedido' onclick='VerPedido(" + ArrayNoPedido[i] + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='far fa-eye'></i></i></button></td>";
}

jQuery.fn.extend({
    disable: function (state) {
        return this.each(function () {
            this.disabled = state;
        });
    }

});

// Disabled with:
$('input[type="submit"], input[type="button"], button').disable(true);

// Enabled with:
$('input[type="submit"], input[type="button"], button').disable(false);


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


        //if (document.getElementById("cmbMovimiento").value == 1) {

        //    let bonificacion = parseFloat(x) + parseFloat(y);

        //    document.getElementById("TxtStockTotal").value = bonificacion;
        //}
        //else {


        //}


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



//////////////////////////////
//function Desplegar(no, id) {
//    if (no == 0 && id == 0) {
//        sessionStorage.setItem('IDArt', '0');
//    }
//    else {
//        $.get("/Supervision/ConsultaExistenciaAlmGJoinProveedor/?No=" + no + "&Id= " + id, function (Data) {
//            var DespXArt = "";
//            //---Encabezado del grid---------
//            DespXArt += "<hr class='solid4'>";
//            DespXArt += "<div class='row'>";
//            DespXArt += "<div class='col-sm'>NoPedido</div>";
//            DespXArt += "<div class='col-sm'>Artículo</div>";
//            DespXArt += "<div class='col-sm'>Fecha de Ingreso</div>";
//            DespXArt += "<div class='col-sm'>Stock</div>";
//            DespXArt += "<div class='col-sm'></div>";

//            DespXArt += "</div>";
//            DespXArt += "<hr class='solid4'>";



//            for (var i = 0; i < Data.length; i++) {
//                //----Cuerpo del grid-------------
//                DespXArt += "<div class='row'>";
//                DespXArt += "<div class='col-sm'>" + Data[i].NoPedido + "</div>";
//                DespXArt += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
//                DespXArt += "<div class='col-sm'>" + Data[i].FechaDeIngreso + "</div>";
//                DespXArt += "<div class='col-sm'>" + Data[i].stockActual + "</div>";
//                DespXArt += "<button title='Devoluciones' class='btn btn-primary' onclick='abrirModalDevoluciones(" + Data[i].IdExistenciaAlmacenG + "," + Data[i].id + "," + Data[i].IdSitio + ")'data-toggle='modal' data-target='#ModalDevoluciones'><i class='fas fa-archive'></i></button>";
//                DespXArt += "<div class='col-sm'></div>";
//                DespXArt += "</div>";

//                 }
//            DespXArt += "</div>";
//            DespXArt += "</br>";
//            DespXArt += "</br>";
//            //Pasando los dos parametros(No.Pedido, idSitio) para desplegar los articulos del pedido por tienda
//            let compraArticulo = "desplegable" + no + "," + id;
//            document.getElementById(compraArticulo).innerHTML = DespXArt;

//        });
//    }
//}
//////////////////////// 


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




function abrirModalDevoluciones(idExist, id, idS) {
    ObtenerFecha();
    LimpiarCampos();
    if (idS == 0) {
        sessionStorage.setItem('IdExistenciaAlmacenG', '0');

    }

    else {

        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            // sessionStorage.setItem('IdExistenciaAlmacenG', Data[0].IdExistenciaAlmacenG);
            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbTiendaDev").value = Data[0].Tienda;
            //document.getElementById("TxtNoPedidoDev").value = Data[0].Tienda;
            //document.getElementById("TxtNoPedidoProvDev").value = Data[0].Tienda;
        });
        $.get("/Supervision/ConsultaDevA/?idExist=" + idExist, function (Data) {
            sessionStorage.setItem('IdExistenciaAlmacenG', Data[0].IdExistenciaAlmacenG);
            document.getElementById("TxtExistenciaInicDev").value = Data[0].ExitenciaActual;
            //if (Data[0].ExistenciaInicDevolucion <= 0 || Data[0].ExistenciaInicDevolucion == 'NULL') {

            //    document.getElementById("TxtExistenciaInicDev").value = Data[0].ExistenciaInicial;
            //} else if (Data[0].ExistenciaActDevolucion >=0) {
            //    document.getElementById("TxtExistenciaInicDev").value = Data[0].ExistenciaActDevolucion;
            //}

        });
        ConsultaArt(idExist);
      //  ProvDev(id);
        ProvDev(id)
        //     BDNoPedido(id);

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
        //   $.get("/Supervision/ConsultaArtDev/?Id=" + id, function (Data) {
        //    document.getElementById("cmbProveedorDevolucion").value = Data[0].IdProveedor;

        document.getElementById("TxtArtDev").value = Data[0].Nombre;

        //Muestra el número de pedido que le corresponde por proveedor-------
        //SiguientePedidoProveedor(id);
        ////Muestra el número de pedido que le corresponde-------
        //ConsultaSiguientePedido();

    });
}
//Obtener la fecha del sistema
function ObtenerFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaIngresoDev').value = fecha;

} 

function ProvDev(id) {

    $.get("/Supervision/ConsultaArtDev/?Id=" + id, function (Data) {
        document.getElementById("cmbProveedorDevLider").value = Data[0].IdProveedor;
        document.getElementById("TxtNoPedidoDev").value = Data[0].NoPedido;

    });
}

function abrirModal(id, idS) {

    LimpiarCampos();
    if (idS == 0) {
        sessionStorage.setItem('IDG', '0');

    }

    else {

        $.get("/Supervision/Consulta/?Id=" + idS, function (Data) {
            //sessionStorage.setItem('IdPedidosInternos', Data[0].IdPedidosInternos);
            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbTienda").value = Data[0].Tienda;


        });
        Prov(id)
    }
}


function Prov(id) {
    $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
        //document.getElementById("cmbTienda").value = Data[0].IdTienda;
        document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
        //document.getElementById("TxtRFC").value = Data[0].RFC;
        //document.getElementById("TxtClabe").value = Data[0].Clabe;
        //document.getElementById("TxtCorreo").value = Data[0].Correo;
        //document.getElementById("TxtTelefono").value = Data[0].Telefono;
        //document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
        //document.getElementById("TxtDireccion").value = Data[0].Direccion;
        //document.getElementById("TxtNumPedidoProve").value = Data[0].NumPedidoProveedor;
        //Muestra los artículos que le pertenecen a ese proveedor----
        MostrarArticulosPedidos(id);
        //Muestra el número de pedido que le corresponde por proveedor-------
        SiguientePedidoProveedor(id);
        //Muestra el número de pedido que le corresponde-------
        ConsultaSiguientePedido();

    });
}


function ExisteciaDevolucion(id) {



    $.get("/Supervision/ConsultaArticulos/?IDTienda=" + id, function (Data) {
        //if (document.getElementById("cmbMovimiento").value == 1) {

        //    let bonificacion = parseFloat(x) + parseFloat(y);

        //    document.getElementById("TxtStockTotal").value = bonificacion;
        //}
        //else {


        //}


        if (document.getElementById("TxtCantidadDev") <= document.getElementById("TxtExistenciaInicDev")) {
            //if (y <= x) {
            let x = document.getElementById("TxtExistenciaInicDev").value;

            let y = document.getElementById("TxtCantidadDev").value;
            let resultado = parseFloat(x) - parseFloat(y);

            document.getElementById("TxtExistenciaActDev").value = resultado;

            if (document.getElementById("TxtExistenciaActDev").value < 0) {

                Swal.fire(
                    '!',
                    'La cantidad excede al stock',
                    'alert'
                )
            }
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
            //TablaArticulo += "<label>Precio_Unitario</label>";
            TablaArticulo += "</div>";
            for (var i = 0; i < Data.length; i++) {
                //-------Crea los chex-box-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
                TablaArticulo += "</div>";
                //-------Crea los input-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

                //-------Crea la lista de las unidades de medida por artículo-------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label   id='" + Data[i].IdArticulos + "' ></label><span class='help-block text-muted small-font'>" + Data[i].Unidad + "</span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
                TablaArticulo += "<div class='col-md-0 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<label class='label-precio'  id='" + Data[i].IdArticulos + "' ></label>$<span class='help-block text-muted small-font'>" + Data[i].PrecioUnitarioPromedio + "</span>";
                TablaArticulo += "</div>";


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
            var NumPedidos = document.getElementsByClassName("input-cantidad");

            let llenar = "";
            var ChevPedidos = document.getElementsByClassName("checkbox-articulos");
            let seleccionados = "";
            for (let i = 0; i < NumPedidos.length && ChevPedidos.length; i++) {
                if (NumPedidos[i].value >= 1 && ChevPedidos[i].checked == true) {
                    llenar += NumPedidos[i].value;
                    seleccionados += ChevPedidos[i].id;

                    var IdPedidosExternos = sessionStorage.getItem('IdPedidosExternos');
                    var IdProveedor = document.getElementById("cmbProveedor").value;
                    var TempProvedor = document.getElementById("cmbProveedor");
                    var Proveedor = TempProvedor.options[TempProvedor.selectedIndex].text;
                    var NumeroPedido = document.getElementById("TxtNumeroPedido").value;
                    var NumPedidoProveedor = document.getElementById("TxtNumPedidoProveedor").value;
                    var Fecha = document.getElementById("TxtFechaIngreso").value;
                    //------------------------Guarda checkbox de los artículos seleccionados----------------------------------
                    var Articulo = ChevPedidos[i].id;
                    //var Articulo = ChevPedidos[i].id;
                    //------------------------Guarda la cantidad de artículos solicitados----------------------------------
                    var CantidadSolicitada = NumPedidos[i].value;
                    //------------------------------------------------------------------------------------------------------

                    var IdTienda = document.getElementById("cmbTienda").value;
                    var TempTienda = document.getElementById("cmbTienda");
                    var Tienda = TempTienda.options[TempTienda.selectedIndex].text;

                    var frm = new FormData();
                    frm.append("IdPedidosExternos", IdPedidosExternos);
                    frm.append("IdProveedor", IdProveedor);
                    frm.append("Proveedor", Proveedor);
                    frm.append("Articulo", Articulo);
                    frm.append("NumeroPedido", NumeroPedido);
                    frm.append("NumPedidoProveedor", NumPedidoProveedor);
                    frm.append("CantidadSolicitada", CantidadSolicitada);
                    frm.append("IdTienda", IdTienda);
                    frm.append("Tienda", Tienda);
                    frm.append("Fecha", Fecha);
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

//-----------------------------------Llenar el comobobox de proveedores------------------------------------------------------
function LlenarCMBTienda(Id) {
    //$.get("/Supervision/BDProveedor", function (data) {
    //    llenarCombo(data, document.getElementById("cmbProveedor"));
    //});
    $.get("/Supervision/BDTienda/?Id=" + Id, function (data) {
        llenarCombo(data, document.getElementById("cmbTienda"));
    });
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



function abrirModalAceptarPedido(id, no) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdPedido', '0');

    }
    else {
        $.get("/Supervision/ConsultaAceptarPedido/?No=" + no + "&Id= " + id, function (Data) {

            //   $.get("/Supervision/ConsultaAceptarPedido/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdPedido', Data[0].IdPedidosInternos);
            document.getElementById("TxtNombreUsr");
            document.getElementById("TxtAceptarNumeroPedidoAceptar").value = Data[0].NumeroPedido;
            document.getElementById("TxtAceptarNumPedidoProveedor").value = Data[0].NumPedidoProveedor;
            document.getElementById("TxtAceptarFechaIngreso").value = Data[0].Fecha;
            document.getElementById("cmbAceptarTienda").value = Data[0].IdTienda;
            document.getElementById("cmbAceptarProveedor").value = Data[0].IdProveedor;
            //document.getElementById("TblArticulos").value = Data[0].CP;
            MostrarArt(id, no); 
        });
    }
}
////PDF de pedidos internos


////*****************Crea la tabla de todos los pedidos quee se realizan a los proveedores*****************************
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

//    CodigoHtmlTablaPedidos += "<input   style='border-style:   outset; border-width: 3px;  border-color:cornflowerblue;     border-radius: 8px;   background-color:mintcream;' class='form-control col-md-3 light-table-filter'  data-table='order-table' type='text'  placeholder='Search....'>";

//    CodigoHtmlTablaPedidos += "<span  class='input-group-text' style='border-style:  outset; border-width: 3px; border-color:cornflowerblue;   border-radius: 8px; '  id='basic-addon1'><i class='fas fa-search'></i></span>";
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
//        CodigoHtmlTablaPedidos += "<td><button class='btn btn-primary'  data-title='Ver pedido' onclick='VerPedido(" + Data[i].NumeroPedido + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='far fa-eye'></i></i></button></td>";
//        CodigoHtmlTablaPedidos += "</tr>";
//    }
//    CodigoHtmlTablaPedidos += "</tbody>";
//    CodigoHtmlTablaPedidos += "</table>";
//    document.getElementById("TablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
//}

//******************************************************************************************************************************
//*******************Despliega el modal deacuerdo con el número de pedido************************************************

function VerPedido(id, no) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaAceptarPedido/?No=" + no + "&Id= " + id, function (Data) {
            //$.get("/Pedidosint/ConsultaPedidoXnum/?Num=" + num, function (Data) {
            document.getElementById("TxtProveedor").textContent = Data[0].Proveedor;

            document.getElementById("TxtTelefono").textContent = Data[0].Telefono;
            document.getElementById("TxtCorreo").textContent = Data[0].Correo;
            document.getElementById("TxtFecha").textContent = Data[0].Fecha;
            document.getElementById("TxtDepartamento").textContent = Data[0].Tienda;
            document.getElementById("TxtDireccion").textContent = Data[0].Direccion;
            document.getElementById("TxtNumeroPedido").textContent = Data[0].NoCompraProveedor;
            MostrarArticulos(id, no);
        });
    }
}

//******************************************************************************************************************************
//--------------Crea la tabla de los artículos y sus caracteristicas para mostrarse en el modal de ver pedido-----------------
//function MostrarArticulos(num) {
//    if (num == 0) {
//        sessionStorage.setItem('IdPedidosInternos', '0');
//    }
//    else {

//        $.get("/Supervision/ConsultaPedidosArticulos/?Pedi=" + num, function (Data) {
//            var dos = "";

//            dos += "<div style='width: 100%'>"
//            dos += "<div {NM_CSS_FUN_CAB} style='height:11px; display: inline; border-width:0px; '></div>"
//            dos += "<div style='height:37px; background-color:#FFFFFF; border-width:0px 0px 1px 0px;  border-style: dashed; border-color:#ddd; display: inline'>"
//            dos += "<table style='width:100%; border-collapse:collapse; padding:0;'>"
//            dos += "<thead>"
//            dos += "<tr align='left'>"
//            dos += "<th >Artículo</th>"
//            //dos += "<th >Unidad_Medida</th>"
//            dos += "<th >Cantidad Solicitada</th>"
//            ////dos += "<th >Precio_Unitario</th>"
//            //dos += "<th >Total</th>"
//            dos += "</tr>"
//            dos += "</thead>"
//            dos += "<tbody>"

//            for (var i = 0; i < Data.length; i++) {

//                //--------Multiplica la cantidad solicitada por el precio unitario para obtener el total------------------------
//                //let tres = (Data[i].CantidadSolicitada) * (Data[i].PrecioUnitario);
//                //------------------------Cuerpo de la tabla------------------------------------------
//                dos += "<tr>"
//                dos += "<td align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Articulo + "</label></td>"
//                //dos += "<td  align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Unidad + "</label></td>"
//                dos += "<td  align='left' id='lin1_col2' {NM_CSS_CAB}><label>" + Data[i].CantidadSolicitada + "</label></td>"
//                //dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + Data[i].PrecioUnitario + "</label></td>"
//                //dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + tres + "</label></td>"
//                dos += "</tr>"
//            }
//            dos += "<tfoot>"
//            //dos += "<th>Total</th>"
//            dos += "</tfoot>"

//            dos += "</tbody>"
//            dos += "</table>"
//            dos += "</div>";
//            dos += "</div>";

//            document.getElementById("TblArt").innerHTML = dos;
//        });
//    }
//}


function MostrarArticulos(id, no) {
    if (id == 0) {
        sessionStorage.setItem('IdPedidosInternos', '0');
    }
    else {
        $.get("/Supervision/ConsultaPedidosArticulos/?id=" + id + "&no= " + no, function (Data) {
            //$.get("/Supervision/ConsultaPedidosArticulos/?id=" + id, function (Data) {
            var dos = "";

            dos += "<div style='width: 100%'>"
            dos += "<div {NM_CSS_FUN_CAB} style='height:11px; display: inline; border-width:0px; '></div>"
            dos += "<div style='height:37px; background-color:#FFFFFF; border-width:0px 0px 1px 0px;  border-style: dashed; border-color:#ddd; display: inline'>"
            dos += "<table style='width:100%; border-collapse:collapse; padding:0;'>"
            dos += "<thead>"
            dos += "<tr align='left'>"
            dos += "<th >Artículo</th>"
            //dos += "<th >Unidad_Medida</th>"
            dos += "<th >Cantidad Aprobada</th>"
            ////dos += "<th >Precio_Unitario</th>"
            //dos += "<th >Total</th>"
            dos += "</tr>"
            dos += "</thead>"
            dos += "<tbody>"

            for (var i = 0; i < Data.length; i++) {

                //--------Multiplica la cantidad solicitada por el precio unitario para obtener el total------------------------
                //let tres = (Data[i].CantidadSolicitada) * (Data[i].PrecioUnitario);
                //------------------------Cuerpo de la tabla------------------------------------------
                dos += "<tr>"
                dos += "<td align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Articulo + "</label></td>"
                //dos += "<td  align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Unidad + "</label></td>"
                dos += "<td  align='left' id='lin1_col2' {NM_CSS_CAB}><label>" + Data[i].CantidadSolicitada + "</label></td>"
                //dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + Data[i].PrecioUnitario + "</label></td>"
                //dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + tres + "</label></td>"
                dos += "</tr>"
            }
            dos += "<tfoot>"
            //dos += "<th>Total</th>"
            dos += "</tfoot>"

            dos += "</tbody>"
            dos += "</table>"
            dos += "</div>";
            dos += "</div>";

            document.getElementById("TblArt").innerHTML = dos;
        });
    }
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
            //TablaArticulo += "<label>Precio_Unitario</label>";
            TablaArticulo += "</div>";
            for (var i = 0; i < Data.length; i++) {
                //-------Crea los chex-box-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
                TablaArticulo += "</div>";
                //-------Crea los input-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

                //-------Crea la lista de las unidades de medida por artículo-------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label   id='" + Data[i].IdArticulos + "' ></label><span class='help-block text-muted small-font'>" + Data[i].Unidad + "</span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
                TablaArticulo += "<div class='col-md-0 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<label class='label-precio'  id='" + Data[i].IdArticulos + "' ></label>$<span class='help-block text-muted small-font'>" + Data[i].PrecioUnitarioPromedio + "</span>";
                TablaArticulo += "</div>";


            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}

//function MostrarArt(id, no) {
//    if (id == 0) {
//        sessionStorage.setItem('IdPedidosInternos', '0');
//    }
//    else {
//        $.get("/Supervision/ConsultaPedidosArticulos/?id=" + id + "&no= " + no, function (Data) {
//            //$.get("/Supervision/ConsultaPedidosArticulos/?id=" + id, function (Data) {
//            var dos = "";

//            dos += "<div style='width: 100%'>"
//            dos += "<div {NM_CSS_FUN_CAB} style='height:11px; display: inline; border-width:0px; '></div>"
//            dos += "<div style='height:37px; background-color:#FFFFFF; border-width:0px 0px 1px 0px;  border-style: dashed; border-color:#ddd; display: inline'>"
//            dos += "<table style='width:100%; border-collapse:collapse; padding:0;'>"
//            dos += "<thead>"
//            dos += "<tr align='left'>"
//            dos += "<th >Artículo</th>"
//            //dos += "<th >Unidad_Medida</th>"
//            dos += "<th >Cantidad Aprobada</th>"
//            ////dos += "<th >Precio_Unitario</th>"
//            //dos += "<th >Total</th>"
//            dos += "</tr>"
//            dos += "</thead>"
//            dos += "<tbody>"

//            for (var i = 0; i < Data.length; i++) {

//                //--------Multiplica la cantidad solicitada por el precio unitario para obtener el total------------------------
//                //let tres = (Data[i].CantidadSolicitada) * (Data[i].PrecioUnitario);
//                //------------------------Cuerpo de la tabla------------------------------------------
//                dos += "<tr>"
//                dos += "<td align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Articulo + "</label></td>"
//                //dos += "<td  align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Data[i].Unidad + "</label></td>"
//                dos += "<td  align='left' id='lin1_col2' {NM_CSS_CAB}><label>" + Data[i].CantidadSolicitada + "</label></td>"
//                //dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + Data[i].PrecioUnitario + "</label></td>"
//                //dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + tres + "</label></td>"
//                dos += "</tr>"
//            }
//            dos += "<tfoot>"
//            //dos += "<th>Total</th>"
//            dos += "</tfoot>"

//            dos += "</tbody>"
//            dos += "</table>"
//            dos += "</div>";
//            dos += "</div>";

//            document.getElementById("TblAceptarArticulos").innerHTML = dos;
//        });
//    }
//}



function MostrarArt(id, no) {
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
            //TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";

            ////TablaArticulo += "<label>Precio Unitario</label>"; 
            //TablaArticulo += "</div>";
            //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            //TablaArticulo += "<label>PrecioUnitario</label>"; 
            //TablaArticulo += "</div>";
          

            //TablaArticulo += "<div class='col-md-1 col-sm-12 col-xs-12 justify-content-end'>";
            //TablaArticulo += "<label>Existencia Actual</label>"; 
            //TablaArticulo += "</div>";
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
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                //TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input type='number' value='' class='input-cantidadUsados redondeado limpiar' id='" + Data[i].IdArticulo + "' onchange='CalcularCosto(this.value)' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";

                //TablaArticulo += "<div class='col-md-4 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input type='number' value='' class='input-res redondeado limpiar' id='" + Data[i].IdArticulo + "'  ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";
                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
               

                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='input-ExistenciaAct redondeado limpiar' id='" + Data[i].IdArticulos + "'  value='" + Data[i].ExistenciaActDevolucion + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";

                //TablaArticulo += "<div class='col-md-1 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='input-PrecioU sinborde limpiar' disabled  id='" + Data[i].IdArticulos + "'   value='" + Data[i].PrecioUnitarioPromedio + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";
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
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdCompraInterno = sessionStorage.getItem('IdPedido');
            var NoPedido = document.getElementById("TxtAceptarNumeroPedidoAceptar").value;
            var NoCompraProveedor = document.getElementById("TxtAceptarNumPedidoProveedor").value;
            //var EstatusPedido = value"1";
            //var IdProveedor = document.getElementById("TxtRazonSocial").value;
            //var Proveedor = document.getElementById("cmbAceptarProveedor").value;
            var FechaIngreso = document.getElementById("TxtAceptarFechaIngreso").value;
            var Usuario = document.getElementById("TxtNombreUsr").value;
            var frm = new FormData();
            frm.append("IdCompraInterno", IdCompraInterno);
            frm.append("NoPedido", NoPedido);
            frm.append("NoCompraProveedor", NoCompraProveedor);
            //frm.append("IdProveedor", IdProveedor);
            //frm.append("Proveedor", Proveedor);
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
            alert("Los datos se guardaron correctamente");
            ConsultaArticuloCompra();
            document.getElementById("btnCancelar").click();
        }
    }
}




//function GuardarExistenciasAlm() {
//    if (CamposObligatoriosDevolucion() == true) {
//        if (confirm("¿Desea aplicar los cambios?") == 1) {
//            var IdExistenciaAlmacenG = sessionStorage.getItem('IdExistenciaAlmacenG');
//            var Observaciones = document.getElementById("TxtDescripcionDev").value;
//            var TipoDeOperacion = document.getElementById("TxtMovDev").value;
//            var ExistenciaInicDevolucion = document.getElementById("TxtExistenciaInicDev").value;
//            var ExistenciaActDevolucion = document.getElementById("TxtExistenciaActDev").value;
//            //var EstatusPedido = value"1";
//            //var IdProveedor = document.getElementById("TxtRazonSocial").value;
//            //var Proveedor = document.getElementById("cmbAceptarProveedor").value;
//            //var FechaIngreso = document.getElementById("TxtAceptarFechaIngreso").value;
//            //var Usuario = document.getElementById("TxtNombreUsr").value;
//            var frm = new FormData();
//            frm.append("IdExistenciaAlmacenG", IdExistenciaAlmacenG);
//            frm.append("Observaciones", Observaciones);
//            frm.append("TipoDeOperacion", TipoDeOperacion);
//            frm.append("ExistenciaInicDevolucion", ExistenciaInicDevolucion);
//            frm.append("ExistenciaActDevolucion", ExistenciaActDevolucion);
//            //frm.append("Proveedor", Proveedor);
//            //frm.append("FechaIngreso", FechaIngreso);
//            //frm.append("Usuario", Usuario);



//            //if (ExistenciaActDevolucion==0) {
//            //    frm.append("EstatusArticulo", 0);
//            //}

//            $.ajax({
//                type: "POST",
//                url: "/Supervision/GuardarDev",
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

//                }
//            });
//            alert("Los datos se guardaron correctamente");
//            ConsultaArticuloComp();
//            document.getElementById("btnCancelar").click();
//        }
//    }
//}


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
            var IdExistenciaAlmacenG = sessionStorage.getItem('IdExistenciaAlmacenG');
            var Observaciones = document.getElementById("TxtDescripcionDev").value;
            var TipoDeOperacion = document.getElementById("TxtMovDev").value;
            //  var ExistenciaInicDevolucion = document.getElementById("TxtExistenciaInicDev").value;
            var ExitenciaActual = document.getElementById("TxtExistenciaActDev").value;

            //var ExistenciaActDevolucion = document.getElementById("TxtExistenciaActDev").value;

            //  var IdAsignacion = NoPedido;


            //var EstatusPedido = value"1";
            //var IdProveedor = document.getElementById("TxtRazonSocial").value;
            //var Proveedor = document.getElementById("cmbAceptarProveedor").value;
            //var FechaIngreso = document.getElementById("TxtAceptarFechaIngreso").value;
            //var Usuario = document.getElementById("TxtNombreUsr").value;
            var frm = new FormData();
            frm.append("IdExistenciaAlmacenG", IdExistenciaAlmacenG);
            frm.append("Observaciones", Observaciones);
            frm.append("TipoDeOperacion", TipoDeOperacion);
            //  frm.append("ExistenciaInicDevolucion", ExistenciaInicDevolucion);
            frm.append("ExitenciaActual", ExitenciaActual);
            //frm.append("Proveedor", Proveedor);
            //frm.append("FechaIngreso", FechaIngreso);
            //frm.append("Usuario", Usuario);



            //if (ExistenciaActDevolucion==0) {
            //    frm.append("EstatusArticulo", 0);
            //}

            $.ajax({
                type: "POST",
                url: "/Supervision/GuardarDev",
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
            alert("Los datos se guardaron correctamente");
            ConsultaArticuloComp();
            document.getElementById("btnCancelar").click();
        }
    }
}
