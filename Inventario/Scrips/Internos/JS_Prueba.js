BloquearCTRL();
//*********************************************************************************************************************************
//----------------------------Crea el grid a desplegar con el botón con la función de desplegar------------------------------------
function Desplegar(id) {

    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');

    }
    else {
        $.get("/ExistenciasG/ConsultaIdArticulo/?Id=" + id, function (Data) {
            var uno = "";
            //---Encabezado del grid---------
            uno += "<hr class='solid4'>";
            uno += "<div class='row'>";
            uno += "<div class='col-sm'>NoCompra</div>";
            uno += "<div class='col-sm'>Artículo</div>";
            uno += "<div class='col-sm'>Operación</div>";
            uno += "<div class='col-sm'>Fecha de Ingreso</div>";
            uno += "<div class='col-sm'>Precio_Unitario</div>";
            uno += "<div class='col-sm'>Acción</div>";
            uno += "</div>";
            uno += "<hr class='solid4'>";

            for (var i = 0; i < Data.length; i++) {
                //----Cuerpo del grid-------------
                uno += "<div class='row'>";
                uno += "<div class='col-sm'>" + Data[i].NoCompra + "</div>";
                uno += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
                uno += "<div class='col-sm'>" + Data[i].TipoDeOperacion + "</div>";
                uno += "<div class='col-sm'>" + Data[i].FechaIngreso + "</div>";
                uno += "<div class='col-sm'>" + Data[i].PrecioUnitario + "</div>";
                //-----------------------------Abre el modal deacuerdo con el proveedor---------------------------------------------------
                //uno += "<div class='col-sm'><button style='background-color:white; border:none;' onclick='abrirModal(" + Data[i].IdProveedor + ")' data-toggle='modal' data-target='#ModalProveedor'>" + Data[i].Proveedor + "</button></div>";
                //-----------------Botón para desplegar la segunda tabla--------------------------------------------
                uno += "<div class='col-sm'>"
                uno += "<label>"
                uno += "<button  data-title='Ver_tabla' class='btn btn-outline-warning' onclick='Desplegar2(" + Data[i].NoCompra + " , "+ Data[i].IdArticulo +")' type='button' data-toggle='collapse'  data-target='#desplegable2" + Data[i].NoCompra + Data[i].IdArticulo + "' aria-expanded='false'                      aria-controls='desplegable2(" + Data[i].NoCompra + Data[i].IdArticulo +")'><i class='fas fa-angle-down'></i></button>";
                uno += "</label>"
                uno += "</div>";
                //-------------------Termina-------------------------
                uno += "</div>";
                //--------------------Se inserta la segunda tabla atravez de su id---------------------
                uno += "<div class='row'>";
                uno += "<div class='col'><div id='desplegable2" + Data[i].NoCompra + Data[i].IdArticulo + "' class='collapse'></div></div>";
                uno += "</div>";
            }
            uno += "</div>";
            uno += "</br>";
            uno += "</br>";

            let compraArticulo = "desplegable" + id;
            document.getElementById(compraArticulo).innerHTML = uno;
        });
    }
}

//********************************************************************************************
//----------------Abrir modal Proveedor--------------------------------------------------------
function abrirModal(id) {
    LlenarCMCProveedores();
    LimpiarCampos();


    if (id == 0) {
        sessionStorage.setItem('IDG', '0');

    }
    else {

        $.get("/ExistenciasG/ConsultaProveedorModal/?Id=" + id, function (Data) {
            document.getElementById("cmbProveedor").value = Data[0].IdProveedores;
            document.getElementById("TxtRFC").value = Data[0].RFC;
            document.getElementById("TxtCorreo").value = Data[0].Correo;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
            document.getElementById("TxtDireccion").value = Data[0].Direccion;
            //---Muestra los artículos que le pertenecen a ese proveedor----
            MostrarArticulos(id);
            //----Muestra el número de pedido que le corresponde por proveedor-------
            ConsultaSiguientePedidoPrveedor(id);
            //----Muestra el número de pedido que le corresponde-------
            ConsultaSiguientePedido();
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

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}

//************************************************************************************************
//-------------------Crear los chex-box de artículos por ID  de proveedor------------------------
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

        $.get("/ExistenciasG/ConsultaIdProveedorArticulos/?IdPro=" + id, function (Data) {
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
            TablaArticulo += "<label>Unidad_Medida</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Precio_Unitario</label>";
            TablaArticulo += "</div>";


            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let IDA = Data.IDA;
            let ArrayIDA = IDA.split(',');
            let Unidad = Data.Unidad;
            let ArrayUnidad = Unidad.split(',');
            let Precio = Data.Precio;
            let ArrayPrecio = Precio.split(',');




            for (var i = 0; i < ArrayArticulo.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor---------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar' disabled  id='" + ArrayIDA[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input onkeyup='habilitar(); boordeInput();' type='number' value='' class='input-cantidad redondeado limpiar' id='" + ArrayIDA[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input  class='input-Unidad sinborde limpiar' disabled  id='" + ArrayIDA[i] + "'  value='" + ArrayUnidad[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input onkeyup='boordeInput()' class='input-Precio sinborde limpiar' disabled  id='" + ArrayIDA[i] + "'   value='" + ArrayPrecio[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}
//---------------------------------------------------------------------------------------------------------
function Borrar() {

    var regre = document.getElementsByClassName("regresar");
    for (var i = 0; i < regre.length; i++) {

        regre[i].style.display = 'none';
    }

}


//------------------------------Función para habilitar el input de precio cuando este sea 0--------------------------------------
function habilitar() {

    var Precio = document.getElementsByClassName("input-Precio");
    var NumPedidos = document.getElementsByClassName("input-cantidad");

    for (let i = 0; i < NumPedidos.length; i++) {

        if (Precio[i].value == 0) {

            Precio[i].disabled = false;
            Precio[i].style.backgroundColor = 'PaleTurquoise';
        }
    }
}

//------------------------------Función para verificar que --------------------------------------
function Verificar() {

    var Precio = document.getElementsByClassName("input-Precio");
    var NumPedidos = document.getElementsByClassName("input-cantidad");
    var combo = document.getElementById("cmbArea").value;
    var provee =  document.getElementById("cmbProveedor").value;
    var contador = 0;
    var contadorPrecio = 0;

    for (let i = 0; i < NumPedidos.length; i++) {

        if (Precio[i].value == 0) {

            Precio[i].disabled = false;
            Precio[i].style.backgroundColor = 'PaleTurquoise';
        }

        if (Precio[i].value < 0 && NumPedidos[i].value > 0 || Precio[i].value > 0 && NumPedidos[i].value > 0 || Precio[i].value == 0 && NumPedidos[i].value > 0 || Precio[i].value < 0 && NumPedidos[i].value < 0 || Precio[i].value > 0 && NumPedidos[i].value < 0 || Precio[i].value == 0 && NumPedidos[i].value < 0) {

            contador++;
        }
        if (Precio[i].value > 0 && NumPedidos[i].value > 0) {

            contadorPrecio++;
        }
    }

    if (contador == contadorPrecio && contadorPrecio >= 1 && combo > 0 && provee > 0) {

        swal({
            title: "Desea guardar el Pedido?",
            text: "",
            icon: "info",
            buttons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
        })
            .then((willDelete) => {
                if (willDelete) {

                    GuardarPedidoExterno();
                }
            });
    }
    else {
        if (provee == "") {
            swal("¡Seleccione un proveedor!", "", "warning");
        }
        if (combo > 0) {
            swal("¡No se han ingresado datos!", "", "warning");
        }

        for (let i = 0; i < NumPedidos.length; i++) {
            if (NumPedidos[i].value < 0) {

                NumPedidos[i].style.borderColor = 'Red';
                swal("¡La cantidad solicitada no puede ser igual o inferiror a cero!", "Verifique los datos ingresados", "warning");
            }
            if (NumPedidos[i].value > 0 && Precio[i].value == 0 || Precio[i].value < 0 || NumPedidos[i].value > 0 && Precio[i].value < 0) {

                Precio[i].style.backgroundColor = 'Red';
            }
            if (NumPedidos[i].value < 0 && Precio[i].value < 0) {

                NumPedidos[i].style.borderColor = 'Red';
                Precio[i].style.backgroundColor = 'Red';

            }
            if (NumPedidos[i].value > 0 && Precio[i].value <= 0) {

                swal("¡El precio unitario no puede ser igual o inferior a cero!", "Verifique los datos ingresados", "warning");
            }
        }

        if (combo == 0) {

            swal("¡Seleccione su departamento!", "", "warning");
        }


    }
}

//****************Función para restablecer el borde de los inputs cuando su valor sea correcto*******************
function boordeInput() {
    var Precio = document.getElementsByClassName("input-Precio");
    var NumPedidos = document.getElementsByClassName("input-cantidad");

    for (let i = 0; i < NumPedidos.length; i++) {

        if (NumPedidos[i].value > 0 || NumPedidos[i].value == 0) {
            NumPedidos[i].style.borderColor = 'DimGray';
        }
        if (Precio[i].value > 0 && Precio[i].disabled == false) {
            Precio[i].style.backgroundColor = 'PaleTurquoise';
        }
    }
}
//*******************************Restablecer el color de borde de los inputs cuando el modal se sierra*****************************
function restablecerBordesInput() {
    var Precio = document.getElementsByClassName("input-Precio");
    var NumPedidos = document.getElementsByClassName("input-cantidad");

    for (let i = 0; i < NumPedidos.length; i++) {

        NumPedidos[i].style.borderColor = 'DimGray';
        Precio[i].style.backgroundColor = 'White';
    }
}

//*************************************************************************************************
//----------------------Guardar datos de los pedidos-----------------------------------------------

function GuardarPedidoExterno() {

    //----------Guardar los inputs de manera individual en la Base de datos--------------------
    var NumPedidos = document.getElementsByClassName("input-cantidad");

    var NomArticulos = document.getElementsByClassName("input-Articulo");

    var UnidadM = document.getElementsByClassName("input-Unidad");

    var Precio = document.getElementsByClassName("input-Precio");

    for (let i = 0; i < NumPedidos.length; i++) {
        if (NumPedidos[i].value >= 1 && NomArticulos[i].value && UnidadM[i].value && Precio[i].value > 0) {


            var IdPedidosExternos = sessionStorage.getItem('IdPedidosExternos');
            var IdProveedor = document.getElementById("cmbProveedor").value;
            var TempProvedor = document.getElementById("cmbProveedor");
            var Proveedor = TempProvedor.options[TempProvedor.selectedIndex].text;

            var Correo = document.getElementById("TxtCorreo").value;
            var RFC = document.getElementById("TxtRFC").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            var NumeroPedido = document.getElementById("TxtNumPedido").value;
            var NumPedidoProveedor = document.getElementById("TxtNumPedidoProve").value;
            var Fecha = document.getElementById("TxtFechaSistema").value;

            var UsoCFDI = document.getElementById("TxtUsoCFDI").value;
            var Direccion = document.getElementById("TxtDireccion").value;

            var IdArea = document.getElementById("cmbArea").value;
            var TempArea = document.getElementById("cmbArea");
            var Area = TempArea.options[TempArea.selectedIndex].text;
            //------------------------Guarda el nombre del artículo solicitado----------------------------------
            var Articulo = NomArticulos[i].value;
            //------------------------Guarda la cantidad de artículos solicitados----------------------------------
            var CantidadSolicitada = NumPedidos[i].value;
            //------------------------Guarda la unidad media de los artículos solicitados----------------------------------
            var Unidad = UnidadM[i].value;
            //------------------------Guarda el precio unitario de los artículos solicitados----------------------------------
            var PrecioUnitario = Precio[i].value;
            //-------------------------------------------------------------------------------------------------------------
            var frm = new FormData();
            frm.append("IdPedidosExternos", IdPedidosExternos);
            frm.append("IdProveedor", IdProveedor);
            frm.append("Proveedor", Proveedor);
            frm.append("Correo", Correo);
            frm.append("RFC", RFC);
            frm.append("Telefono", Telefono);
            frm.append("Articulo", Articulo);
            frm.append("NumeroPedido", NumeroPedido);
            frm.append("NumPedidoProveedor", NumPedidoProveedor);
            frm.append("CantidadSolicitada", CantidadSolicitada);
            frm.append("Unidad", Unidad);
            frm.append("PrecioUnitario", PrecioUnitario);
            frm.append("Fecha", Fecha);
            frm.append("UsoCFDI", UsoCFDI);
            frm.append("IdArea", IdArea);
            frm.append("Area", Area);
            frm.append("Direccion", Direccion);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/ExistenciasG/GuardarPedidoExterno",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡El pedido ya exixste!", "", "warning");
                    }
                    else {
                        restablecerBordesInput();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });

        }
    }
    //-----Mensaje de confirmación-----------------------
    swal("Su pedido se generó correctamente!", "", "success");



}

//---------Función para marcar los campos como obigatorios--------------------------------------------------------
function CamposObligatorios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}
//-----------------------------------Llenar el comobobox de proveedores------------------------------------------------------
function LlenarCMCProveedores() {
    $.get("/ExistenciasG/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });

}
//-----------------------------------Llenar el comobobox de proveedores------------------------------------------------------
function LlenarCMCProveedoresPre() {
    $.get("/ExistenciasG/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedorPre"));
    });

}

//----------------Combobox de las áreas------------------------
function LlenarCMCArea() {
    $.get("/GLOBAL/BDAreas", function (data) {
        llenarCombo(data, document.getElementById("cmbArea"));
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

//*********************************************************************************************************************************

//------------- Función que crea el segundo grid para desplegar que se despliega por numero de compra-----------------------------
function Desplegar2(no, ID) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');

    }
    else {

        $.get("/ExistenciasG/ConsultaNumCompra/?No=" + no, function (Data) {
            var dos = "";
            //---Encabezado del grid---------
            dos += "<hr class='solid3'>";
            dos += "<div class='row'>";
            dos += "<div class='col-sm'>NoCompra</div>";
            dos += "<div class='col-sm'>Artículo</div>";
            dos += "<div class='col-sm'>Fecha de Ingreso</div>";
            dos += "<div class='col-sm'>Unidad de medida</div>";
            dos += "<div class='col-sm'>Precio_Unitario</div>";
            dos += "</div>";
            dos += "<hr class='solid3'>";

            for (var i = 0; i < Data.length; i++) {

                //----Cuerpo del grid-------------
                dos += "<div class='row'>";
                dos += "<div class='col-sm'>" + Data[i].NoCompra + "</div>";
                dos += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
                dos += "<div class='col-sm'>" + Data[i].FechaIngreso + "</div>";
                dos += "<div class='col-sm'>" + Data[i].Unidad + "</div>";
                dos += "<div class='col-sm'>" + Data[i].PrecioUnitario + "</div>";
                dos += "</div>";
            }
            dos += "</div>";
            dos += "</br>";
            dos += "</br>";

            let numero = "desplegable2" + no + ID;
            document.getElementById(numero).innerHTML = dos;
        });
    }
}

//************************************************************************************************************
//******************Función que determina el siguiente número de pedido general*****************************************
function ConsultaSiguientePedido() {
    $.get("/ExistenciasG/ConsultaPedidosDecendiente", function (Data) {
        SiguientePedido(Data);

    }
    );
}
function SiguientePedido(Data) {

    let NumeroPedido = Data.NumeroPedido;
    let ArrayNumeroPedido = NumeroPedido.split(',');

    var ultimoElemento = ArrayNumeroPedido[ArrayNumeroPedido.length - 1]
    document.getElementById("TxtNumPedido").value = ultimoElemento;

}
//******************Función que determina el siguiente número de pedido por proveedor********************************

function ConsultaSiguientePedidoPrveedor(id) {
    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/ExistenciasG/ConsultaNumPedidoProveedor/?ID=" + id, function (Data) {


            let numPedidoProve = Data.numPedidoProve;
            let ArraynumPedidoProve = numPedidoProve.split(',');


            var ultimo = ArraynumPedidoProve[ArraynumPedidoProve.length - 1]
            document.getElementById("TxtNumPedidoProve").value = ultimo;

        });
    }
}

//-----------------------------------------------------------------------------------------
//----------------Abrir modal Proveedor--------------------------------------------------------
function abrirModalPresu(id) {
    LlenarCMCProveedoresPre();
    LimpiarCampos();


    if (id == 0) {
        sessionStorage.setItem('IDG', '0');

    }
    else {

        $.get("/ExistenciasG/ConsultaProveedorModal/?Id=" + id, function (Data) {
            document.getElementById("cmbProveedorPre").value = Data[0].IdProveedores;
            //---Muestra los artículos que le pertenecen a ese proveedor----
            verArticulos(id);

        });
    }
}

//-------------------------------------------------------------------------------------------------

function verArticulos(id) {
    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/ExistenciasG/ConsultaIdProveedorArticulos/?IdPro=" + id, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticuloPre = "";
            TablaArticuloPre += "<div class='row row-cols-auto'>";
            TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticuloPre += "<label>Artículos</label>";
            TablaArticuloPre += "</div>";
            TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticuloPre += "<label>Precio_Unitario</label>";
            TablaArticuloPre += "</div>";
            TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticuloPre += "<label>Cantidad_Requerida</label>";
            TablaArticuloPre += "</div>";
            TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticuloPre += "<label>Total_por_art.</label>";
            TablaArticuloPre += "</div>";

            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let IDA = Data.IDA;
            let ArrayIDA = IDA.split(',');
            let Unidad = Data.Unidad;
            let ArrayUnidad = Unidad.split(',');
            let Precio = Data.Precio;
            let ArrayPrecio = Precio.split(',');




            for (var i = 0; i < ArrayArticulo.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor---------------------------

                TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticuloPre += "<label>"
                TablaArticuloPre += "<input  class='input-Articulos sinborde ' disabled name='" + ArrayUnidad[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticuloPre += "</label>"
                TablaArticuloPre += "</div>";
                //-------Crea la lista de los precios por artículo---------------------------------------------------------------
                TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticuloPre += "<input onkeyup='boordeInputG()' class='input-Precios sinborde ' disabled    value='" + ArrayPrecio[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticuloPre += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticuloPre += "<input type='number' onkeyup='costo();costosart(); comprobar();boordeInputG();LimpiarPres();' class='input-cantidades   redondeado'   id='" + ArrayIDA[i] + "'  value='' ><span class='help-block text-muted small-font'></span>";
                TablaArticuloPre += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticuloPre += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticuloPre += "<input type='number'  class='input-subtotal limpiaPres  redondeado' disabled    value='' ><span class='help-block text-muted small-font'></span>";
                TablaArticuloPre += "</div>";
            
           
            }
            TablaArticuloPre += "</div>";
            TablaArticuloPre += "</div>";
            document.getElementById("TblArticulosPre").innerHTML = TablaArticuloPre;
        });
    }
}
//----------------------------------------------------------------------------------------------------
function costo() {

    var cantidad = document.getElementsByClassName("input-cantidades");
    var Precio = document.getElementsByClassName("input-Precios");
    var total = 0;
    for (let i = 0; i < cantidad.length; i++) {

        if (cantidad[i].value > 0 && Precio[i].value > 0) {

            var sum = (cantidad[i].value) * (Precio[i].value);
            total = total + sum;
        }

    }
    document.getElementById("TxtTotal").value = total;
}

//-----------------------------------------------------------------------------------------------------------
function costosart() {

    var cantidad = document.getElementsByClassName("input-cantidades");
    var Precio = document.getElementsByClassName("input-Precios");
    var totalar = document.getElementsByClassName("input-subtotal");


    var total = 0;
    for (let i = 0; i < cantidad.length; i++) {

        if (cantidad[i].value > 0 && Precio[i].value > 0) {

            var sum = (cantidad[i].value) * (Precio[i].value);
            totalar[i].value = sum;
        }

    }
 
}

//-----------------------------------------------------------------------------------------------------------
function comprobar() {

    var Precio = document.getElementsByClassName("input-Precios");
    var NumPedidos = document.getElementsByClassName("input-cantidades");

    var contador = 0;
    var contadorPrecio = 0;

    for (let i = 0; i < NumPedidos.length; i++) {

        if (Precio[i].value == 0) {

            Precio[i].disabled = false;
            Precio[i].style.backgroundColor = 'PaleTurquoise';
        }

        if (Precio[i].value < 0 && NumPedidos[i].value > 0 || Precio[i].value > 0 && NumPedidos[i].value > 0 || Precio[i].value == 0 && NumPedidos[i].value > 0 || Precio[i].value < 0 && NumPedidos[i].value < 0 || Precio[i].value > 0 && NumPedidos[i].value < 0 || Precio[i].value == 0 && NumPedidos[i].value < 0) {

            contador++;
        }
        if (Precio[i].value > 0 && NumPedidos[i].value > 0) {

            contadorPrecio++;
        }
    }

        for (let i = 0; i < NumPedidos.length; i++) {
            if (NumPedidos[i].value < 0) {

                NumPedidos[i].style.borderColor = 'Red';
                swal("¡El número no puede ser igual o inferiror a cero!", "Verifique los datos ingresados", "warning");
            }
            if (NumPedidos[i].value > 0 && Precio[i].value == 0 || Precio[i].value < 0 || NumPedidos[i].value > 0 && Precio[i].value < 0) {

                Precio[i].style.backgroundColor = 'Red';
            }
            if (NumPedidos[i].value < 0 && Precio[i].value < 0) {

                NumPedidos[i].style.borderColor = 'Red';
                Precio[i].style.backgroundColor = 'Red';

            }
            if (NumPedidos[i].value > 0 && Precio[i].value <= 0) {

                swal("¡El precio unitario no puede ser igual o inferior a cero!", "Verifique los datos ingresados", "warning");
            }
        }

    
}

//-----------------------------------------------------------------------
//****************Función para restablecer el borde de los inputs cuando su valor sea correcto*******************
function boordeInputG() {
    var Precio = document.getElementsByClassName("input-Precios");
    var NumPedidos = document.getElementsByClassName("input-cantidades");

    for (let i = 0; i < NumPedidos.length; i++) {

        if (NumPedidos[i].value > 0 || NumPedidos[i].value == 0) {
            NumPedidos[i].style.borderColor = 'DimGray';
        }
        if (Precio[i].value > 0 && Precio[i].disabled == false) {
            Precio[i].style.backgroundColor = 'PaleTurquoise';
        }
    }
}
//--------------------------------------------------------------
function LimpiarPres() {
    var controlesTXT = document.getElementsByClassName("limpiaPres");

    var NumPedidos = document.getElementsByClassName("input-cantidades");
    var totalar = document.getElementsByClassName("input-subtotal");

    for (var i = 0; i < controlesTXT.length; i++) {

        if (NumPedidos[i].value == 0) {
            totalar[i].value = "";
        }
    }
}


//-------------------------------------------------------------------------------------------------------------------------------------------------
//******************************************************************************************************************************************
function ImprimirPres() {

    consultaFecha();

    var NumPedidos = document.getElementsByClassName("input-cantidades");
    var totalar = document.getElementsByClassName("input-subtotal");
    var Nombre = document.getElementsByClassName("input-Articulos");
    var costos = document.getElementsByClassName("input-Precios");

    document.getElementById("TxtProveedor").value ;



    var dos = "";



    dos += "<div style='width: 100%'>"
    dos += "<div {NM_CSS_FUN_CAB} style='height:11px; display: inline; border-width:0px; '></div>"
    dos += "<div style='height:37px; background-color:#FFFFFF; border-width:0px 0px 1px 0px;  border-style: dashed; border-color:#ddd; display: inline'>"
    dos += "<table style='width:100%; border-collapse:collapse; padding:0;'>"
    dos += "<thead>"
    dos += "<tr align='left'>"
    dos += "<th >Artículo</th>"
    dos += "<th >Unidad_Medida</th>"
    dos += "<th >Cantidad Solicitada</th>"
    dos += "<th >Precio_Unitario</th>"
    dos += "<th >Total por artículo</th>"
    dos += "</tr>"
    dos += "</thead>"
    dos += "<tbody>"

    for (var i = 0; i < Nombre.length; i++) {

        if (NumPedidos[i].value > 0 && costos[i].value > 0) {
        dos += "<tr>"
        dos += "<td align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Nombre[i].value + "</label></td>"
        dos += "<td  align='left' id='lin1_col1' {NM_CSS_CAB}><label>" + Nombre[i].name + "</label></td>"
        dos += "<td  align='left' id='lin1_col2' {NM_CSS_CAB}><label>" + NumPedidos[i].value + "</label></td>"
        dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + costos[i].value + "</label></td>"
        dos += "<td align='left' id='lin1_col3' {NM_CSS_CAB}>$<label>" + totalar[i].value + "</label></td>"
        dos += "</tr>"
            }
    }
    dos += "<tfoot>"
    dos += "<th></th>"
    dos += "<th></th>"
    dos += "<th></th>"
    dos += "<th style='text-align: center;'>Total</th>"
 //   dos += "<th style='text-align: center;'>$" + total + "</th>"
    dos += "</tfoot>"

    dos += "</tbody>"
    dos += "</table>"
    dos += "</div>";
    dos += "</div>";

    document.getElementById("TblArticulosimpre").innerHTML = dos;
 
}

//----------------------------------------------------------------------
function consultaFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFecha').textContent = fecha;
}