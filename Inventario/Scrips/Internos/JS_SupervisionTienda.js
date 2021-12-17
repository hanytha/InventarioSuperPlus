LlenarCMCProveedores();
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
            CodigoHtmlArticuloComp += "<div class='col-sm'>ID</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>No. de Pedido</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Artículo</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha de Ingreso</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Stock</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "<hr class='solid'>";
            CodigoHtmlArticuloComp += "</div>";
            
            let id = Data.id;
            let ArrayId = id.split(',');
            let NoPedido = Data.NoPedido;
            let ArrayNoPedido = NoPedido.split(',');
            let Nombre = Data.Nombre;
            let Arraynombre = Nombre.split(',');
            let Fechas = Data.Fechas;
            let Arrayfechas = Fechas.split(',');
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
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraynombre[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfechas[i] + "</div>";
                CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraystock[i] + "</div>";
                //CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayIdSitio[i] + "</div>";
                //-----------------Botón para desplegar la primera tabla--------------
                CodigoHtmlArticuloComp += "<div class='col'>"
                CodigoHtmlArticuloComp += "<label>"
                //Pasar los 2 parámetros de la función desplegar(función que muestra la tabla del artículo) para  conocer el número de pedido que se va a mostrar en la tienda que tenga el id recibido
                CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayNoPedido[i] + ", "+ArrayIdSitio[i] + ")'><i class='fas fa-angle-down'></i></button>";
                CodigoHtmlArticuloComp += "</label>";
                CodigoHtmlArticuloComp += "</div>";
                //-------------Termina----------------------------------------
                CodigoHtmlArticuloComp += "</div>";
                CodigoHtmlArticuloComp += "</div>";
                //------------------------Despliega primer grid-----------------------------------------------------------------------
                //CodigoHtmlArticuloComp += "<div class='row'>";
                CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayNoPedido[i] + "," + ArrayIdSitio[i] +"' class='collapse'></div></div>";
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
/////////////////////////////////////////////
//----------------------------Crea el grid a desplegar con el botón con la función de desplegar------------------------------------
//función que muestra la tabla del artículo
//Pasar los parametros(No.Pedido, Id del sitio para desplegar solo los pedidos que tiene esa tienda)
function Desplegar(no, id) {
    if (no == 0 && id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Supervision/ConsultaExistenciaAlmGJoinProveedor/?No=" + no + "&Id= " + id, function (Data) {
            var DespXArt = "";
            //---Encabezado del grid---------
            DespXArt += "<hr class='solid4'>";
            DespXArt += "<div class='row'>";
            DespXArt += "<div class='col-sm'>NoPedido</div>";
            DespXArt += "<div class='col-sm'>Artículo</div>";
            DespXArt += "<div class='col-sm'>Fecha de Ingreso</div>";
            DespXArt += "</div>";
            DespXArt += "<hr class='solid4'>";

            for (var i = 0; i < Data.length; i++) {
                //----Cuerpo del grid-------------
                DespXArt += "<div class='row'>";
                DespXArt += "<div class='col-sm'>" + Data[i].NoPedido + "</div>";
                DespXArt += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
                DespXArt += "<div class='col-sm'>" + Data[i].FechaDeIngreso + "</div>";
                DespXArt += "</div>";
            }
            DespXArt += "</div>";
            DespXArt += "</br>";
            DespXArt += "</br>";
            //Pasando los dos parametros(No.Pedido, idSitio) para desplegar los articulos del pedido por tienda
            let compraArticulo = "desplegable" + no +","+ id;
            document.getElementById(compraArticulo).innerHTML = DespXArt;

        });
    }
}

//----------------Abrir modal de Pedidos Internos--------------------------------------------------------
function abrirModal(id) {
    //LlenarCMBTienda();
    LimpiarCampos();
    if (id == 0) {
        sessionStorage.setItem('IdPedidosInternos', '0');
    }
    else {
        $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdPedidosInternos', Data[0].IdPedidosInternos);
            //document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbTienda").value = Data[0].Tienda;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
        });
        MostrarArticulos();
        ConsultaSiguientePedido();
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
                    var Fecha = document.getElementById("TxtFechaIngreso").value;
                    //------------------------Guarda checkbox de los artículos seleccionados----------------------------------
                    var IdArticulo = ChevPedidos[i].id;
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
                    frm.append("IdArticulo", IdArticulo);
                    frm.append("NumeroPedido", NumeroPedido);
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
                                alert("Ya existe");
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
//-----------------------------------Llenar el comobobox de proveedores------------------------------------------------------
//function LlenarCMBTienda() {
//    //$.get("/Supervision/BDProveedor", function (data) {
//    //    llenarCombo(data, document.getElementById("cmbProveedor"));
//    //});
//    $.get("/Supervision/BDTienda", function (data) {
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


function MostrarArticulos() {

    //if (id == 0) {
    //    sessionStorage.setItem('IdPedidosInternos', '0');
    //}
    //else {

    $.get("/Supervision/ConsultaArtProveedores", function (Data) {

        let ID = Data.ID;
        let ArrayID = ID.split(',');
        let Articulos = Data.Articulos;
        let ArrayArticulos = Articulos.split(',');

        var TablaArticulo = "";
        TablaArticulo += "<div class='row row-cols-auto'>";

        for (var i = 0; i < (ArrayArticulos, ArrayID).length; i++) {
            //-------Crea los chex-box-------------------------------------------------------------------------
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + ArrayID[i] + "' ><span class='help-block text-muted small-font'>" + ArrayArticulos[i] + "</span>";
            TablaArticulo += "</div>";

            //-------Crea los input-------------------------------------------------------------------------
            TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>"
            TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado' id='" + ArrayID[i] + "' ><span class='help-block text-muted small-font'></span>";
            TablaArticulo += "</label>"
            TablaArticulo += "</div>";
        }
        TablaArticulo += "</div>";
        document.getElementById("TblArticulos").innerHTML = TablaArticulo;
    });
    //}
}

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

function LlenarCMCProveedores() {
    $.get("/GLOBAL/BDPro", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
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
