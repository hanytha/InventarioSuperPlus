
ConsultaCompras();
LlenarCMBProveedor();
BloquearCTRL();
function ConsultaCompras() {
    $.get("/Compra/ConsultasCompras", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaPedidos = "";
    CodigoHtmlTablaPedidos += "<br />"
    CodigoHtmlTablaPedidos += "<div class='input-group mb-3 float-right '>";

    CodigoHtmlTablaPedidos += "<input  style='border-style:  outset; border-width: 3px;   border-color:mediumturquoise;     border-radius: 8px;   background-color:mintcream;' class='form-control col-md-3 light-table-filter'  data-table='order-table' type='text'  placeholder='Search....'>";

    CodigoHtmlTablaPedidos += "<span  class='input-group-text' style='border-style:  outset; border-width: 3px; border-color:mediumturquoise;   border-radius: 8px; '  id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPedidos += "</div>";
    CodigoHtmlTablaPedidos += "<div class='table-responsive'>";
    CodigoHtmlTablaPedidos += "<table class='table-info table table-bordered order-table'>";
    CodigoHtmlTablaPedidos += "<thead>";
    CodigoHtmlTablaPedidos += "<tr>";
    CodigoHtmlTablaPedidos += "<th>Núm_Compra</th>";
    CodigoHtmlTablaPedidos += "<th>Proveedor</th>";
    CodigoHtmlTablaPedidos += "<th>Fecha de Ingreso</th>";
    CodigoHtmlTablaPedidos += "<th>Opciones</th>";
    CodigoHtmlTablaPedidos += "</tr>";
    CodigoHtmlTablaPedidos += "</thead>";
    CodigoHtmlTablaPedidos += "<tbody>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaPedidos += "<tr>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].NoCompra + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].Proveedor + "</td>";
        CodigoHtmlTablaPedidos += "<td>" + Data[i].FechaDeIngreso + "</td>";
        CodigoHtmlTablaPedidos += "<td>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-info' style='width: 28px; height: 28px;' onclick='abrirModal(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaPedidos += "<button class='btn btn-danger' style='width: 28px; height: 28px;' onclick='EliminarCompra(" + Data[i].IdCompra + ",this)'><i class='far fa-trash-alt'></i></button>";

        CodigoHtmlTablaPedidos += "</td>";
        CodigoHtmlTablaPedidos += "</tr>";
    }
    CodigoHtmlTablaPedidos += "</tbody>";
    CodigoHtmlTablaPedidos += "</table>";
    document.getElementById("tablaCompras").innerHTML = CodigoHtmlTablaPedidos;
}


//------------Limpia la información y carga la informacion de la compra------------------------
function abrirModal(id) {//la clase  Obligatorio
    ConsultaSiguientePedido();

    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        CalcularFecha();
        sessionStorage.setItem('IDExt', '0');

    }
    else {

        $.get("/Compra/ConsultaCompra/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDExt', Data[0].IdCompra);
            document.getElementById("TxtFechaDeIngreso").value = Data[0].FechaDeIngreso;
            document.getElementById("TxtNoCompra").value = Data[0].NoCompra;
            document.getElementById("TxtNoCompraPro").value = Data[0].NoCompraProveedor;
            document.getElementById("TxtMetodo").value = Data[0].MetodoDePago;
            document.getElementById("TxtCosto").value = Data[0].Coste;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
        });
    }
}

//*********************************************************************************************
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

        $.get("/Compra/ConsultaArticuloxIdProveedor/?IdPro=" + id, function (Data) {
            ConsultaSiguienteCompraPrveedor(id);
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
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar ' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-Unidad sinborde limpiar redondeado' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].Unidad + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-impuesto sinborde limpiar redondeado' disabled  style='width:45px;'  id='" + Data[i].IdArticulos + "'  value='" + Data[i].Impuesto + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' onkeyup='sumar();' class='input-Precio monto redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";

            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}


//------------------limpiar campos-------------------------------
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

}


//-------------------------------Función ------------------------------------------------
function verificar() {
    var cantidad = document.getElementsByClassName("input-cantidad");
    var Precio = document.getElementsByClassName("input-Precio");
    var contador = 0;
    var contadorCantidad = 0;
    var contadorbonificacion = 0;
    for (let i = 0; i < cantidad.length; i++) {

        //----Cuenta todos los inputs con un valor

        if (cantidad[i].value > 0 && Precio[i].value == 0 || cantidad[i].value == 0 && Precio[i].value > 0 || cantidad[i].value > 0 && Precio[i].value > 0) {

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
    if (contador == contadorCantidad && contador >= 1) {
        GuardarCompra("Compra");

    }
    else if (contador == contadorbonificacion && contador >= 1) {
        GuardarCompra("Bonificación");
       
    }
    else {
        swal("¡Datos incorrectos!", "", "warning");

        //***************************
        CamposObligatorios();
        //**********************Marca el borde del input que este falatante de datos*********************************
            changeBGColor();
            function changeBGColor() {
                var cols = document.getElementsByClassName('input-cantidad');
                var precio = document.getElementsByClassName('input-Precio');

                for (i = 0; i < cols.length; i++) {

                    if (cantidad[i].value == 0 && Precio[i].value > 0) {
                        cols[i].style.borderColor = 'red';

                    }
                    if (cantidad[i].value > 0 && Precio[i].value == 0) {
                        precio[i].style.borderColor = 'orange';
                    }
                }
            }
        

        //**********************************************************
    }
}



//---------Guarda los cambios y altas de los proveedores en la tabla de compra------------------------------------
function GuardarCompra(movimiento) {


        if (confirm("¿Desea aplicar los cambios?") == 1) {

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

            var MetodoDePago = document.getElementById("TxtMetodo").value;
            var FechaDeIngreso = document.getElementById("TxtFechaDeIngreso").value;
            var Coste = document.getElementById("TxtCosto").value;
            var TipoOperacion = movimiento;

            var frm = new FormData();
            frm.append("IdCompra", IdCompra);
            frm.append("NoCompra", NoCompra);
            frm.append("NoCompraProveedor", NoCompraProveedor);
            frm.append("IdProveedor", IdProveedor);
            frm.append("Proveedor", Proveedor);
            frm.append("MetodoDePago", MetodoDePago);
            frm.append("FechaDeIngreso", FechaDeIngreso);
            frm.append("TipoOperacion", TipoOperacion);
            frm.append("Coste", Coste);


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
                        swal("¡La compra ya existe!", "", "warning");
                    }
                    else {
                        //-----Mensaje de confirmación-----------------------
                        alert("los datos se guardaron correctamente");

                        GuardarDatosArticuloCompra(data);

                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//----------------------Guardar datos de los pedidos-----------------------------------------------
function GuardarDatosArticuloCompra(IdCompra) {

    //----------Guardar los inputs de manera individual en la Base de datos--------------------
    var cantidad = document.getElementsByClassName("input-cantidad");

    var NomArticulos = document.getElementsByClassName("input-Articulo");

    var UnidadM = document.getElementsByClassName("input-Unidad");

    var Precio = document.getElementsByClassName("input-Precio");

    var impuestos = document.getElementsByClassName("input-impuesto");


    for (let i = 0; i < cantidad.length; i++) {

        //----asigna un valor de 0 cuando los precios son null para poder guardar las bonificaciones

        if (Precio[i].value == "") {
            Precio[i].value = 0;

        }

        if (cantidad[i].value >= 1 && NomArticulos[i].value && UnidadM[i].value && Precio[i].value && impuestos[i].value) {


            var IdExistenciaCompra = sessionStorage.getItem('IDExt');
            var NoCompra = document.getElementById("TxtNoCompra").value;

            //------------------------Guarda el nombre del artículo solicitado----------------------------------
            var Articulo = NomArticulos[i].value;
            //------------------------Guarda la cantidad de artículos solicitados----------------------------------
            var StockActual = cantidad[i].value;
            //------------------------Guarda la unidad media de los artículos solicitados----------------------------------
            var Unidad = UnidadM[i].value;
            //------------------------Guarda el precio unitario de los artículos solicitados----------------------------------
            var PrecioUnitario = Precio[i].value;
            //------------------------Guarda el Impuesto de los artículos solicitados----------------------------------
            var Impuesto = impuestos[i].value;
            //-------------------------------------------------------------------------------------------------------------
            var frm = new FormData();
            frm.append("IdExistenciaCompra", IdExistenciaCompra);
            frm.append("IdCompra", IdCompra);
            frm.append("StockActual", StockActual);
            frm.append("Articulo", Articulo);
            frm.append("Unidad", Unidad);
            frm.append("NoCompra", NoCompra);
            frm.append("Impuesto", Impuesto);
            frm.append("PrecioUnitario", PrecioUnitario);

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
                        swal("¡El pedido ya exixste!", "", "warning");
                    }
                    else {

                        ConsultaCompras();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });

        }
    }

    //-----Mensaje de confirmación-----------------------
    swal("Su compra se guardó exitosamente!", "", "success");



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


//----------Función para sumar los input de precio---------------------------------
function sumar() {

    var total = 0;

    $(".monto").each(function () {

        if (isNaN(parseFloat($(this).val()))) {

            total += 0;

        } else {

            total += parseFloat($(this).val());

        }

    });

    //alert(total);

    document.getElementById("TxtCosto").value = total;
}

//------------Funcion que calcula la fecha del sistema------------------------
function CalcularFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaDeIngreso').value = fecha;

}