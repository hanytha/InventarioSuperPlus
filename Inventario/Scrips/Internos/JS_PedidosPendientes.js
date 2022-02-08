//ConsultaCompras();
BloquearCTRL();
function ConsultaCompras() {
    $.get("/PedidosPendientes/ConsultaPedidosNumeroPedido", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaPedidos = "";
    CodigoHtmlTablaPedidos = "<br / >";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-success table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>Núm_Pedido</th>";
    CodigoHtmlTablaPedidos += "<th>Tienda</th>";
    CodigoHtmlTablaPedidos += "<th>Opciones</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";


    let NoPedido = Data.NoPedido;
    let ArrayNoPedido = NoPedido.split(',');
    let NomTienda = Data.NomTienda;
    let ArrayNomTienda = NomTienda.split(',');

    let IdAsignacion = Data.IdAsignacion;
    let ArrayIdAsignacion = IdAsignacion.split(',');
    let IdTienda = Data.IdTienda;
    let ArrayIdTienda = IdTienda.split(',');


    for (var i = 0; i < ArrayNoPedido.length; i++) {

        CodigoHtmlTablaPedidos += "<tr>";
        CodigoHtmlTablaPedidos += "<td>" + ArrayNoPedido[i] + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + ArrayNomTienda[i] + "</td>";
        CodigoHtmlTablaPedidos += "<td>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-success' onclick='abrirModal(" + ArrayNoPedido[i] + ")' data-toggle='modal' data-target='#ModalPedidos'><i class='fas fa-file-upload'></i></button>";
       // CodigoHtmlTablaPedidos += "<button class='btn btn-danger' onclick='EliminarCompra(" + ArrayNoPedido[i] + ",this)'><i class='far fa-trash-alt'></i></button>";

        CodigoHtmlTablaPedidos += "</td>";
        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>";
    CodigoHtmlTablaPedidos += "</table>";
    document.getElementById("tablaPedidos").innerHTML = CodigoHtmlTablaPedidos;
}


//------------Limpia la información y carga la informacion de la compra------------------------
function abrirModal(id) {

    if (id == 0) {

        sessionStorage.setItem('IDExt', '0');

    }
    else {

        $.get("/PedidosPendientes/ConsultaPedidoXNumero/?Num=" + id, function (Data) {


            document.getElementById("TxtAsignacion").value = Data[0].IdAsignacion;
            document.getElementById("TxtNumPedido").value = Data[0].NumeroPedido;
            document.getElementById("TxtIDTienda").value = Data[0].IdSitio;
            document.getElementById("TxtProveedor").value = Data[0].Proveedor;
            document.getElementById("TxtProveedor").name = Data[0].IdProveedor;
            document.getElementById("TxtFecha").value = Data[0].Fecha;
            document.getElementById("TxtNoProveedor").value = Data[0].NumPedidoProveedor;
            document.getElementById("TxtTiendas").value = Data[0].Sitio;

            MostrarArticulosPorId(id);
            CalcularFecha();
        });
    }
}

//*********************************************************************************************


//----------------------Función para ver las compras por id de compra-----------------------------------
function MostrarArticulosPorId(id) {

    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');

    }
    else {

        $.get("/PedidosPendientes/ConsultaPedidosNumero/?Num=" + id, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad_Solicitada</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Stock</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad_Aprobada</label>";
            TablaArticulo += "</div>";

            let IdArticulo = Data.IdArticulo;
            let ArrayIdArticulo = IdArticulo.split(',');
            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let solicitada = Data.solicitada;
            let Arraysolicitada = solicitada.split(',');
            let stock = Data.stock;
            let Arraystock = stock.split(',');
            let NoPedidoG = Data.NoPedidoG;
            let ArrayNoPedidoG = NoPedidoG.split(',');




            for (var i = 0; i < ArrayIdArticulo.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  id='" + ArrayIdArticulo[i] + "' name='" + ArrayIdArticulo[i] + "' class='input-Articulo sinborde limpiar ' disabled  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input id='" + ArrayIdArticulo + "' class='input-solicitada sinborde limpiar ' disabled onkeyup=''  value='" + Arraysolicitada[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input id='" + ArrayIdArticulo + "' class='input-total sinborde limpiar ' disabled  value='" + Arraystock[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input id='" + ArrayIdArticulo + "' class='input-aprobar  limpiar redondeado'   type='number' onkeyup='BordeInput()' value='' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}

//-------------Función para verificar que la cantidad aprobada no sea mayor al stock----------------------
//function Verificar() {
//    var total = document.getElementsByClassName("input-total");
//    var aprobar = document.getElementsByClassName("input-aprobar");
//    //var contador = 0;
//    //var contadorAprobada = 0;
//    var exito = true;
//    for (let i = 0; i < total.length; i++) {
//        if (aprobar[i].value < 0 || aprobar[i].value > total[i].value) {
//            swal("¡Datos incorrectos!", "Verifique los datos ingresados", "warning");
//            exito = false;
//        }
//    }
//    return exito;
//    //if (contador == contadorAprobada && contador >= 1) {

//    //    GuardarCompraInterna();
//    //}
//    //else {
//    //    swal("¡Datos incorrectos!", "Verifique los datos ingresados", "warning");
//    //}
//}

//-------------------------Validacion---------------------------
function validacion() {
    var total = document.getElementsByClassName("input-total");
    var aprobar = document.getElementsByClassName("input-aprobar");

    var aprobacion = 0;
    var sumaS = 0;
    var contador = 0;
    var contadorA = 0;

    for (let i = 0; i < aprobar.length; i++) {


        var aprobacion = (aprobar[i].value) * 1;
        var sumaS = (total[i].value) * 1;

        if (aprobacion < 0 || aprobacion > 0 || aprobacion == 0 && sumaS == 0) {
            contador++;
        }


        if (aprobacion < 0 || aprobacion > sumaS) {

            aprobar[i].style.borderColor = 'Red';
        }
        if (sumaS > aprobacion && aprobacion > 0 || sumaS == aprobacion || aprobacion == 0 && sumaS == 0) {

            aprobar[i].style.borderColor = 'DimGray';
            contadorA++;
        }
    }
    if (contador == contadorA && contadorA >= 1) {

        //-------------------------------------------------------------------
        swal({
            title: "Desea guardar los datos?",
            text: "",
            icon: "info",
            buttons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
        })
            .then((willDelete) => {
                if (willDelete) {

                    GuardarCompraInterna();
                }
            });
        //-------------------------------------------------------------------
    }
    else {
        swal("¡Datos incorrectos!", "Verifique los datos ingresados", "warning");

    }
}



//-------Funcion para cambiar el color del input cuando el valor ingresado se positivo y menor al stock de artículo---------
function BordeInput() {

    var stock = document.getElementsByClassName("input-total");
    var aprobar = document.getElementsByClassName("input-aprobar");
    var aprobacion = 0;
    var sumaS = 0;

    for (i = 0; i < aprobar.length; i++) {

        var aprobacion = (aprobar[i].value) * 1;
        var sumaS = (stock[i].value) * 1;


        if (aprobacion > 0 && aprobacion <= sumaS || aprobacion == 0) {

            aprobar[i].style.borderColor = 'DimGray';
        }
    }
}


//------------------------------------------------------limpiar campos-------------------------------
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

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

//------------Funcion que calcula la fecha del sistema------------------------
function CalcularFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaAprobada').value = fecha;

}
//---------------------------------------------------------------------------

//----Función para guardar los datos en la tabla de compras internos-------------------

function GuardarCompraInterna() {

    //  if (Verificar() == true) {
    var IdCompraInterno = sessionStorage.getItem('IDExt');
    var NoPedido = document.getElementById("TxtNumPedido").value;
    var NoPedidoProveedor = document.getElementById("TxtNoProveedor").value;
    var IdProveedor = document.getElementById("TxtProveedor").name;
    var Proveedor = document.getElementById("TxtProveedor").value;
    var FechaIngreso = document.getElementById("TxtFechaAprobada").value;

    var IdSitio = document.getElementById("TxtIDTienda").value;
    var Sitio = document.getElementById("TxtTiendas").value;
    var IdAsignacion = document.getElementById("TxtAsignacion").value;


    var frm = new FormData();

    frm.append("IdCompraInterno", IdCompraInterno);
    frm.append("NoPedido", NoPedido);
    frm.append("NoPedidoProveedor", NoPedidoProveedor);
    frm.append("IdProveedor", IdProveedor);
    frm.append("Proveedor", Proveedor);
    frm.append("FechaIngreso", FechaIngreso);
    frm.append("IdSitio", IdSitio);
    frm.append("Sitio", Sitio);
    frm.append("IdAsignacion", IdAsignacion);

    $.ajax({
        type: "POST",
        url: "/PedidosPendientes/GuardarProveedorInterno",
        data: frm,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data == 0) {
                swal("¡Ocurrio un error!", "", "danger");
            }
            else if (data == -1) {
                swal("¡La compra ya existe!", "", "warning");
            }
            else {
                alert("Los datos se guardaron de manera exitosa");

                GuardarDatosArticuloCompra(data, NoPedido);

                document.getElementById("btnCancelar").click();
            }
        }
    });
    // }
}

//----------------------------------------------Termina------------------------------------------------------------------------

//--------------------------------Función para guardar los datos en la segunda tabla de existencias almacen--------------------

function GuardarDatosArticuloCompra(IdCompras, NumeroPedido) {

    //----------Guardar los inputs de manera individual en la Base de datos--------------------
    var cantidad = document.getElementsByClassName("input-aprobar");

    var NomArticulos = document.getElementsByClassName("input-Articulo");



    for (let i = 0; i < cantidad.length; i++) {


        if (cantidad[i].value >= 1 && NomArticulos[i].value && NomArticulos[i].name) {

            //------------------------Guarda el nombre del artículo solicitado----------------------------------
            var IdExistenciaAlmacenG = sessionStorage.getItem('IDExt');
            var Articulo = NomArticulos[i].value;
            var IdArticulo = NomArticulos[i].name;
            var ExitenciaInicial = cantidad[i].value;
            var ExitenciaActual = cantidad[i].value;


            //-------------------------------------------------------------------------------------------------------------
            var frm = new FormData();
            frm.append("IdExistenciaAlmacenG", IdExistenciaAlmacenG);
            frm.append("IdCompraInterno", IdCompras);
            frm.append("Articulo", Articulo);
            frm.append("IdArticulo", IdArticulo);
            frm.append("ExitenciaInicial", ExitenciaInicial);
            frm.append("ExitenciaActual", ExitenciaActual);
            frm.append("NoPedidoG", NumeroPedido);

            $.ajax({
                type: "POST",
                url: "/PedidosPendientes/GuardarArticulosAlmacen",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal({
                            title: "Verifique la actualización de sus datos",
                            text: "",
                            icon: "info",
                            buttons: true,
                            showCancelButton: true,
                            cancelButtonColor: '#d33',
                        })
                    }
                    else {

                        ConsultaCompras();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });

        }
    }
    nuevoStock();

    OcultarPedido(NumeroPedido);

    ConsultaCompras();
    //-----Mensaje de confirmación de que la compra o bonificación se guardo exitosamente-----------------------
    swal("Sus datos se guardaron correctamente!", "", "success");

}

//------------Función para cambiar el estatus a cero una vez solventado el pedido--------------

function OcultarPedido(no) {

    $.get("/PedidosPendientes/ConsultaOcultar/?No=" + no, function (Data) {
        let sum = Data;
        if (Data == 1) {
            alert("hOLA")
        }
    });

}

//-----------------------------------Función  para el nuevo stock---------------------------------------
function nuevoStock() {

    var Articulos = document.getElementsByClassName("input-Articulo");
    var IDArticulos = document.getElementsByClassName("input-Articulo");
    var Aprobar = document.getElementsByClassName("input-aprobar");


    var total = "";

    for (let i = 0; i < Articulos.length; i++) {

        if (Aprobar[i].value > 0) {

            total += IDArticulos[i].name + ":" + Aprobar[i].value + "/";

        }
    }

    $.get("/PedidosPendientes/ConsultaStockArticulo/?DatosArticulos=" + total, function (Data) {
        let RES = Data;
        if (Data == 1) { alert("hOLA") }

    });
}