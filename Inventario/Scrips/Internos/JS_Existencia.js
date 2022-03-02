
//ConsultaCompras();
LlenarCMBProveedor();
LlenarCMBMPago();
BloquearCTRL();
//------------Limpia la información y carga la informacion de la compra------------------------
function abrirModal(id) {

    restablecerBordeInput();

    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        CalcularFecha();
        ConsultaSiguientePedido();
        habilitar();
        sessionStorage.setItem('IDExt', '0');

    }
    else {

        $.get("/Compra/ConsultaCompra/?Id=" + id, function (Data) {

            habilitar();

            sessionStorage.setItem('IDExt', Data[0].IdCompra);
            document.getElementById("TxtFechaDeIngreso").value = Data[0].FechaDeIngreso;
            document.getElementById("TxtNoCompra").value = Data[0].NoCompra;
            document.getElementById("TxtNoCompraPro").value = Data[0].NoCompraProveedor;
            document.getElementById("TxtCosto").value = Data[0].Coste;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("cmbMPago").value = Data[0].IdMetodoPago;
            document.getElementById("IDAREA").value = Data[0].IdArea;
            document.getElementById("NAREA").value = Data[0].NomArea;
            MostrarArticulosPorIdCompra(id);
        });
    }
}

//-------------------Crear los chex-box de artículos por ID  de proveedor------------------------
function MostrarArticulos(id) {

    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');

    }
    else {

        $.get("/Compra/ConsultaModalConversion/?IdPro=" + id, function (Data) {
            ConsultaSiguienteCompraPrveedor(id);
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículo</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>ud. Medida</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Impto</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Prec. Unit.</label>";
            TablaArticulo += "</div>";

            let IDArticulo = Data.IDArticulo;
            let ArrayIDArticulo = IDArticulo.split(',');
            let Articulo = Data.Articulo;
            let ArrayArticulo = Articulo.split(',');
            let Unidad = Data.Unidad;
            let ArrayUnidad = Unidad.split(',');
            let Impuesto = Data.Impuesto;
            let ArrayImpuesto = Impuesto.split(',');
            let Conversion = Data.Conversion;
            let ArrayConversion = Conversion.split(',');

            for (var i = 0; i < ArrayIDArticulo.length; i++) {

                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar regresar' disabled name=' " + ArrayIDArticulo[i] + "'  id='" + ArrayIDArticulo[i] + "'  value='" + ArrayArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<select style='width: 100 %' disabled title='La ud. de medida de este artículo es: " + ArrayUnidad[i] + "')'>                <option>--Seleccione--</option></select>"
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input  class='input-impuesto sinborde limpiar redondeado' disabled  style='width:45px;' name='" + ArrayUnidad[i] + "' value='" + ArrayImpuesto[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' onkeyup='costo();BordeInput();' class='input-cantidad redondeado limpiar' id='" + ArrayIDArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' onkeyup='costo(); BordeInput();' class='input-Precio monto redondeado limpiar' id='" + ArrayIDArticulo[i] + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}


//-------------------------------------------------------------------------------------------------------------------------------------------
function Borrar() {

    var regre = document.getElementsByClassName("regresar");
    for (var i = 0; i < regre.length; i++) {

        regre[i].style.display = 'none';
    }

}

//-----------------------------------------------------------limpiar campos---------------------------------------------------------------------------------
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


//--Al ejecytarse el evento onechange------------
function LimpiarCamposIn() {
    var controlesTXT = document.getElementsByClassName("limpiars");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var controlesSLT = document.getElementsByClassName("limpiarSelects");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
    }
}

//--------------------Función---------------------------------------------------
function costo() {

    //------------------------Función para calcular el costo de las compras----------------------------
    var cantidad = document.getElementsByClassName("input-cantidad");
    var Precio = document.getElementsByClassName("input-Precio");
    var total = 0;
    for (let i = 0; i < cantidad.length; i++) {

        if (cantidad[i].value > 0 && Precio[i].value > 0) {

            var sum = (cantidad[i].value) * (Precio[i].value);
            total = total + sum;
        }

    }
    document.getElementById("TxtCosto").value = total;
}
//-------------------------------Función ------------------------------------------------
function verificar() {
    var cantidad = document.getElementsByClassName("input-cantidad");
    var Precio = document.getElementsByClassName("input-Precio");
    var contador = 0;
    var contadorCantidad = 0;
    var contadorbonificacion = 0;

    var pago = document.getElementById("cmbMPago").value;
    var proveedor = document.getElementById("cmbProveedor").value;
    //-----------------------------------------------------------------------
    for (let i = 0; i < cantidad.length; i++) {

        //----Cuenta todos los inputs con un valor

        if (cantidad[i].value > 0 && Precio[i].value == 0 || cantidad[i].value == 0 && Precio[i].value > 0 || cantidad[i].value > 0 && Precio[i].value > 0 || cantidad[i].value < 0 || Precio[i].value < 0) {

            contador++;

        }
        //---Cuenta los input con cantidad y precio que son las compras
        if (cantidad[i].value >= 1 && Precio[i].value > 0) {
            contadorCantidad++;


        }
        //----Cuenta los input que solo tienen cantidad para las bonificaciones
        if (cantidad[i].value > 0 && Precio[i].value == 0) {
            contadorbonificacion++;


        }
    }
    //--determina si es una compra o una bonificación o un error
    if (contador == contadorCantidad && contador >= 1 && pago > 0 && proveedor > 0) {

        //-------------------------------------------------------------------
        swal({
            title: "Desea guardar la Compra?",
            text: "",
            icon: "info",
            buttons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
        })
            .then((willDelete) => {
                if (willDelete) {

                    GuardarCompra("Compra");
                }
            });
        //-----------------------------------------------------------------------------
    }
    else if (contador == contadorbonificacion && contador >= 1 && pago > 0 && proveedor > 0) {
        BordeInputPrecio();
        //-----------------------------------------------------------
        swal({
            title: "Desea guardar la Bonificación?",
            text: "",
            icon: "info",
            buttons: true,
            showCancelButton: true,
            cancelButtonColor: '#d33',
        })
            .then((willDelete) => {
                if (willDelete) {

                    GuardarCompra("Bonificación");
                }
            });
        //---------------------------------------------------------------
    }
    else {
        swal("¡No se han ingresado datos!", "", "warning");

        //**********************Marca el borde del input que este falatante de datos*********************************
        changeBGColor();
        function changeBGColor() {
            var cols = document.getElementsByClassName('input-cantidad');
            var precio = document.getElementsByClassName('input-Precio');

            for (i = 0; i < cols.length; i++) {

                if (cantidad[i].value == 0 && Precio[i].value > 0 || cantidad[i].value < 0 || Precio[i].value < 0 && cantidad[i].value < 0 || cantidad[i].value == 0 && Precio[i].value < 0) {
                    cols[i].style.borderColor = 'red';

                }
                if (cantidad[i].value > 0 && Precio[i].value == 0 || Precio[i].value < 0 && cantidad[i].value == 0 || cantidad[i].value > 0 && Precio[i].value < 0 || cantidad[i].value < 0 && Precio[i].value == 0 || cantidad[i].value < 0 && Precio[i].value < 0) {

                    precio[i].style.borderColor = 'Red';
                }
                if (cantidad[i].value < 0) {
                    swal("¡La cantidad no puede ser igual o inferiror a cero!", "", "warning");
                }
                if (Precio[i].value < 0) {
                    swal("¡El precio no puede ser igual o inferiror a cero!", "", "warning");
                }
                if (cantidad[i].value < 0 && Precio[i].value < 0) {
                    swal("¡Los datos no pueden ser igual o inferirores a cero!", "", "warning");
                }
            }

            if (pago == 0) {

                swal("¡Seleccione un método de pago!", "", "warning");
            }
            if (proveedor == 0) {

                swal("¡Seleccione un proveedor para guardar los datos!", "", "warning");
            }
        }


        //**********************************************************
    }
}


//----Función que  restablece el color del borde de los input cuando los valores ingresados sean validos------------------------
function BordeInput() {

    var cols = document.getElementsByClassName('input-cantidad');
    var precio = document.getElementsByClassName('input-Precio');

    for (i = 0; i < cols.length; i++) {


        if (cols[i].value > 0) {
            cols[i].style.borderColor = 'DimGray';
        }
        if (precio[i].value > 0) {
            precio[i].style.borderColor = 'DimGray';
        }
        if (precio[i].value == 0 && cols[i].value == 0) {

            cols[i].style.borderColor = 'DimGray';
            precio[i].style.borderColor = 'DimGray';
        }

    }
}

//----Función que  restablece el color de borde de los input cuando sean bonificacioones------------------------
function BordeInputPrecio() {

    var precio = document.getElementsByClassName('input-Precio');

    for (i = 0; i < precio.length; i++) {

        precio[i].style.borderColor = 'DimGray';
    }
}


//----Función que  restablece el color de borde de los input------------------------
function restablecerBordeInput() {

    var cols = document.getElementsByClassName('input-cantidad');
    var precio = document.getElementsByClassName('input-Precio');

    for (i = 0; i < cols.length; i++) {

        cols[i].style.borderColor = 'DimGray';
        precio[i].style.borderColor = 'DimGray';
    }
}

//----------------------------------------------------------------------------------------------------------------------
//---------Guarda los cambios y altas de los proveedores en la tabla de compra------------------------------------
function GuardarCompra(movimiento) {

    //-------------Validacion cuando el precio esta en null y lo intercambia por cero para guardarlo en la BD---------------
    if (Coste = document.getElementById("TxtCosto").value == "") {
        Coste = document.getElementById("TxtCosto").value = 0;

    }

    var IdCompra = sessionStorage.getItem('IDExt');
    var NoCompra = document.getElementById("TxtNoCompra").value;
    var NoCompraProveedor = document.getElementById("TxtNoCompraPro").value;

    var IdProveedor = document.getElementById("cmbProveedor").value;
    var TempPro = document.getElementById("cmbProveedor");
    var Proveedor = TempPro.options[TempPro.selectedIndex].text;


    var IdMetodoPago = document.getElementById("cmbMPago").value;
    var TempPago = document.getElementById("cmbMPago");
    var MetodoDePago = TempPago.options[TempPago.selectedIndex].text;



    var FechaDeIngreso = document.getElementById("TxtFechaDeIngreso").value;
    var Coste = document.getElementById("TxtCosto").value;

    var IdArea = document.getElementById("IDAREA").value;
    var NomArea = document.getElementById("NAREA").value;

    var TipoOperacion = movimiento;

    var frm = new FormData();
    frm.append("IdCompra", IdCompra);
    frm.append("NoCompra", NoCompra);
    frm.append("NoCompraProveedor", NoCompraProveedor);
    frm.append("IdProveedor", IdProveedor);
    frm.append("Proveedor", Proveedor);
    frm.append("IdMetodoPago", IdMetodoPago);
    frm.append("MetodoDePago", MetodoDePago);
    frm.append("FechaDeIngreso", FechaDeIngreso);
    frm.append("TipoOperacion", TipoOperacion);
    frm.append("Coste", Coste);
    frm.append("IdArea", IdArea);
    frm.append("NomArea", NomArea);


    frm.append("Estatus", 1);
    $.ajax({
        type: "POST",
        url: "/Compra/GuardarCompra",
        data: frm,
        contentType: false,
        processData: false,
        success: function (data) {
            if (data == 0) {
                swal("¡Ocurrio un error!", "", "danger");
            }
            else if (data == -1) {

                swal("¡Verifique la actualización de sus datos!", "", "warning");

                GuardarDatosArticuloCompra(IdCompra, movimiento);
            }
            else {
                //-----Mensaje de confirmación-----------------------
                alert("los datos se guardaron correctamente");

                //-------GuardarDatosArticuloCompra deacuerdo con la función que le corresponda----------
                if (IdCompra == 0) {

                    GuardarDatosArticuloCompra(data, movimiento);
                    //---guarda el nuevo registro
                }
                else {
                    GuardarDatosArticuloCompra(IdCompra, movimiento);
                    //---guarda las modificaciones de las compras
                }

                document.getElementById("btnCancelar").click();
            }
        }
    });

}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//----------------------Guardar datos de los pedidos-----------------------------------------------
function GuardarDatosArticuloCompra(IdCompras, Tmovimiento) {

    //----------Guardar los inputs de manera individual en la Base de datos--------------------
    var cantidad = document.getElementsByClassName("input-cantidad");

    var NomArticulos = document.getElementsByClassName("input-Articulo");

    //var UnidadM = document.getElementsByClassName("input-Unidad");

    var Precio = document.getElementsByClassName("input-Precio");

    var impuestos = document.getElementsByClassName("input-impuesto");


    for (let i = 0; i < cantidad.length; i++) {

        //----asigna un valor de 0 cuando los precios son null para poder guardar las bonificaciones

        if (Precio[i].value == "") {
            Precio[i].value = 0;

        }
        if (Precio[i].name == "") {
            Precio[i].name = 0;
        }

        if (cantidad[i].value >= 1 && NomArticulos[i].value && Precio[i].value && impuestos[i].value && impuestos[i].name && Precio[i].name && NomArticulos[i].name) {

            var IdExistenciaCompra = Precio[i].name;
            var NoCompra = document.getElementById("TxtNoCompra").value;
            var FechaIngreso = document.getElementById("TxtFechaDeIngreso").value;
            var TipoDeOperacion = Tmovimiento;

            //------------------------Guarda el nombre del artículo solicitado----------------------------------
            var Articulo = NomArticulos[i].value;
            var IdArticulo = NomArticulos[i].name;
            //------------------------Guarda la cantidad de artículos solicitados----------------------------------
            var StockActual = cantidad[i].value;

            var ExistenciaInicial = cantidad[i].value;
            //------------------------Guarda la unidad media de los artículos solicitados----------------------------------
            var Unidad = impuestos[i].name;
            //------------------------Guarda el precio unitario de los artículos solicitados----------------------------------
            var PrecioUnitario = Precio[i].value;
            //------------------------Guarda el Impuesto de los artículos solicitados----------------------------------
            var Impuesto = impuestos[i].value;
            //-------------------------------------------------------------------------------------------------------------
            var frm = new FormData();
            frm.append("IdExistenciaCompra", IdExistenciaCompra);
            frm.append("IdCompra", IdCompras);
            frm.append("StockActual", StockActual);
            frm.append("Articulo", Articulo);
            frm.append("Unidad", Unidad);
            frm.append("NoCompra", NoCompra);
            frm.append("Impuesto", Impuesto);
            frm.append("PrecioUnitario", PrecioUnitario);
            frm.append("TipoDeOperacion", TipoDeOperacion);
            frm.append("ExistenciaInicial", ExistenciaInicial);
            frm.append("FechaIngreso", FechaIngreso);
            frm.append("IdArticulo", IdArticulo);


            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Compra/GuardarDatosArticuloCompra",
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

    //-----Mensaje de confirmación de que la compra o bonificación se guardo exitosamente-----------------------
    CalcularFecha();
    swal("Su " + TipoDeOperacion + " se guardó exitosamente!", "", "success");
  //  actulizar();
}

//-----------------------------------------------------

function actulizar() {
    window.location.reload();
}

//----------marca los campos obligatorios--------------------
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



//-------------------"Elimina" la compra cambia el Estatus de 1 a 0-------------
function EliminarCompra(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Compra/EliminarCompra/?Id=" + id, function (DatoCompra) {
            if (DatoCompra == 1) {
                //    swal("La compra se eliminó exitosamente!", "", "success");
                alert("Se elimino correctamente la compra");
                ConsultaCompras();
            } else {
                swal("¡Ocurrio un error!", "", "danger");
            }
        });
    }
}

//------obtiene los datos de las consultas para llenar los combobox-----------

function LlenarCMBProveedor() {
    $.get("/GLOBAL/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });
}

//------obtiene los datos de las consultas para llenar los combobox-----------

function LlenarCMBMPago() {
    $.get("/GLOBAL/Mpago", function (data) {
        llenarCombo(data, document.getElementById("cmbMPago"));
    });
}

//----------------funcion general para llenar los select------------
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

//******************Función que determina el siguiente número de compra general*****************************************
function ConsultaSiguientePedido() {
    $.get("/Compra/ConsultaPedidosDecendiente", function (Data) {
        SiguientePedido(Data);

    }
    );
}
function SiguientePedido(Data) {

    let NumeroPedido = Data.NumeroPedido;
    let ArrayNumeroPedido = NumeroPedido.split(',');

    var ultimoElemento = ArrayNumeroPedido[ArrayNumeroPedido.length - 1]
    document.getElementById("TxtNoCompra").value = ultimoElemento;

}

//******************Función que determina el siguiente número de compra por proveedor********************************

function ConsultaSiguienteCompraPrveedor(id) {
    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Compra/ConsultaNumPedidoProveedor/?ID=" + id, function (Data) {


            let numPedidoProve = Data.numPedidoProve;
            let ArraynumPedidoProve = numPedidoProve.split(',');


            var ultimo = ArraynumPedidoProve[ArraynumPedidoProve.length - 1]
            document.getElementById("TxtNoCompraPro").value = ultimo;

        });
    }
}

//------------Funcion que calcula la fecha del sistema------------------------
function CalcularFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaDeIngreso').value = fecha;

}

//----------------------Función para ver las compras por id de compra-----------------------------------
function MostrarArticulosPorIdCompra(id) {

    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');

    }
    else {

        $.get("/Compra/ConsultaIdCompraenCompraArts/?Id=" + id, function (Data) {
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Unidad_Medida</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Impuesto</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Precio_Unitario</label>";
            TablaArticulo += "</div>";

            for (var i = 0; i < Data.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar ' disabled name=' " + Data[i].IdArticulo + "'   id='" + Data[i].IdArticulos + "'  value='" + Data[i].Articulo + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input  class='input-Unidad sinborde limpiar redondeado' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].Unidad + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<input  class='input-impuesto sinborde limpiar redondeado' disabled  style='width:45px;'  name='" + Data[i].Unidad + "'  value='" + Data[i].Impuesto + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end regresar '>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='" + Data[i].StockActual + "' onkeyup='costo();' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' name='" + Data[i].ExistenciaInicial + "'><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end regresar'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='" + Data[i].PrecioUnitario + "' onkeyup='costo();' class='input-Precio monto redondeado limpiar' id='" + Data[i].IdArticulos + "' name='" + Data[i].IdExistenciaCompra + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;

            deshabilitar();
        });
    }
}

//-------Función para deshabilitar los inputs en el modal de editar compras-------------------------------

function deshabilitar() {

    var cantidad = document.getElementsByClassName("input-cantidad");
    var Precio = document.getElementsByClassName("input-Precio");
    var provee = document.getElementById("cmbProveedor");
    var metodo = document.getElementById("cmbMPago");
    var boton = document.getElementById("GCompras");

    for (let i = 0; i < cantidad.length; i++) {

        if (cantidad[i].value != cantidad[i].name) {

            for (let i = 0; i < cantidad.length; i++) {

                cantidad[i].disabled = true;
                Precio[i].disabled = true;
                provee.disabled = true;
                metodo.disabled = true;
                boton.disabled = true;
            }
        }
    }

}

//-------Función para habilitar los inputs en el modal de compras-------------------------------
function habilitar() {
    var cantidad = document.getElementsByClassName("input-cantidad");
    var Precio = document.getElementsByClassName("input-Precio");
    var provee = document.getElementById("cmbProveedor");
    var metodo = document.getElementById("cmbMPago");
    var boton = document.getElementById("GCompras");

    cantidad.disabled = false;
    Precio.disabled = false;
    provee.disabled = false;
    metodo.disabled = false;
    boton.disabled = false;
}
