BloquearCTRL();
//-----------------------Crea el grid con las consultas de la tabla artículo y compra--------------------------
ConsultaArticuloComp();
function ConsultaArticuloComp() {
    $.get("/Prueba/ConsultaArticulos", function (Data) {
        CrearArticuloComp(Data);
    });

}

function CrearArticuloComp(Data) {
    var CodigoHtmlArticuloComp = "";
    CodigoHtmlArticuloComp += "<div id='contenedor1'>";
    CodigoHtmlArticuloComp += "<hr class='solid'>";
    CodigoHtmlArticuloComp += "<div class='row'>";
    CodigoHtmlArticuloComp += "<div class='col-sm'>ID</div>";
    CodigoHtmlArticuloComp += "<div class='col-sm'>Artículo</div>";
    CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha Ingreso</div>";
    CodigoHtmlArticuloComp += "<div class='col-sm'>Stock</div>";
    CodigoHtmlArticuloComp += "<div class='col-sm'>Costo</div>";
    CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
    CodigoHtmlArticuloComp += "</div>";
    CodigoHtmlArticuloComp += "<hr class='solid'>";
    CodigoHtmlArticuloComp += "</div>";


    let id = Data.id;
    let ArrayId = id.split(',');
    let Nombre = Data.Nombre;
    let Arraynombre = Nombre.split(',');
    let Fechas = Data.Fechas;
    let Arrayfechas = Fechas.split(',');
    let Stock = Data.Stock;
    let Arraystock = Stock.split(',');
    let Costos = Data.Costos;
    let Arraycostos = Costos.split(',');


    for (var i = 0; i < (ArrayId, Arraynombre, Arrayfechas, Arraystock, Arraycostos).length; i++) {

        CodigoHtmlArticuloComp += "<div>";
        CodigoHtmlArticuloComp += "<div class='row'>";
        CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayId[i] + "</div>";
        CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraynombre[i] + "</div>";
        CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfechas[i] + "</div>";
        CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraystock[i] + "</div>";
        CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraycostos[i] + "</div>";
        //-----------------Botón para desplegar la primera tabla--------------
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<label>"
        CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayId[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayId[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayId[i] + ")'><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlArticuloComp += "</label>";
        CodigoHtmlArticuloComp += "</div>";
        //-------------Termina----------------------------------------
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        //------------------------Despliega primer grid-----------------------------------------------------------------------
        CodigoHtmlArticuloComp += "<div class='row'>";
        CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayId[i] + "' class='collapse'></div></div>";
        CodigoHtmlArticuloComp += "</div>";
        //---------------------------------------Termina----------------------------------------------------------------------------
    }
    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;

}
//*********************************************************************************************************************************
//*********************************************************************************************************************************
//----------------------------Crea el grid a desplegar con el botón con la función de desplegar------------------------------------
function Desplegar(id) {
    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {
        $.get("/Prueba/ConsultaCompraJoinProveedor/?Id=" + id, function (Data) {
            var uno = "";
            //---Encabezado del grid---------
            uno += "<hr class='solid4'>";
            uno += "<div class='row'>";
            uno += "<div class='col-sm'>NoCompra</div>";
            uno += "<div class='col-sm'>Artículo</div>";
            uno += "<div class='col-sm'>Fecha de Ingreso</div>";
            uno += "<div class='col-sm'>Costo</div>";
            uno += "<div class='col-sm'>Proveedor</div>";
            uno += "<div class='col-sm'>Acción</div>";
            uno += "</div>";
            uno += "<hr class='solid4'>";

            for (var i = 0; i < Data.length; i++) {
                //----Cuerpo del grid-------------
                uno += "<div class='row'>";
                uno += "<div class='col-sm'>" + Data[i].NoCompra + "</div>";
                uno += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
                uno += "<div class='col-sm'>" + Data[i].FechaDeIngreso + "</div>";
                uno += "<div class='col-sm'>" + Data[i].Coste + "</div>";
                //-----------------------------Abre el modal deacuerdo con el proveedor---------------------------------------------------
                uno += "<div class='col-sm'><button style='background-color:white; border:none;' onclick='abrirModal(" + Data[i].IdProveedor + ")' data-toggle='modal' data-target='#ModalProveedor'>" + Data[i].Proveedor + "</button></div>";
                //-----------------Botón para desplegar la segunda tabla--------------------------------------------
                uno += "<div class='col-sm'>"
                uno += "<label>"
                uno += "<button  title='Clic para desplegar Artículos de la misma compra' class='btn btn-outline-warning' onclick='Desplegar2(" + Data[i].NoCompra + ")' type='button' data-toggle='collapse' data-target='#desplegable2" + Data[i].NoCompra + "' aria-expanded='false' aria-controls='desplegable2(" + Data[i].NoCompra +")'><i class='fas fa-angle-down'></i></button>";
                uno += "</label>"
                uno += "</div>";
                //-------------------Termina-------------------------
                uno += "</div>";
                //--------------------Se inserta la segunda tabla atravez de su id---------------------
                uno += "<div class='row'>";
                uno += "<div class='col'><div id='desplegable2" + Data[i].NoCompra + "' class='collapse'></div></div>";
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
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//----------------Abrir modal Proveedor--------------------------------------------------------
function abrirModal(id) {
    LlenarCMCProveedores();
    LimpiarCampos();
    if (id == 0) {
        sessionStorage.setItem('IDG', '0');

    }
    else {

        $.get("/Prueba/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            document.getElementById("TxtRFC").value = Data[0].RFC;
            document.getElementById("TxtClabe").value = Data[0].Clabe;
            document.getElementById("TxtCorreo").value = Data[0].Correo;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtUsoCFDI").value = Data[0].UsoCFDI;
            document.getElementById("TxtDireccion").value = Data[0].Direccion;
            //---Muestra los artículos que le pertenecen a ese proveedor----
            MostrarArticulos(id);
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

        $.get("/Prueba/ConsultaIdPro/?IdPro=" + id, function (Data) {
       //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";

            for (var i = 0; i < Data.length; i++) {
    //-------Crea los chex-box-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input type='checkbox' class='checkbox-articulos' id='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'>" + Data[i].NombreEmpresa + "</span>";
                TablaArticulo += "</div>";
                //-------Crea los input-------------------------------------------------------------------------
                TablaArticulo += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos  + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
} 
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//----------------------Guardar datos de los pedidos-----------------------------------------------

function GuardarPedidoExterno() {

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

                    var Correo = document.getElementById("TxtCorreo").value;
                    var RFC = document.getElementById("TxtRFC").value;
                    var Telefono = document.getElementById("TxtTelefono").value;
                    var Clabe = document.getElementById("TxtClabe").value;
                    var NumeroPedido = document.getElementById("TxtNumPedido").value;
                    var Fecha = document.getElementById("TxtFechaSistema").value;

                    var UsoCFDI = document.getElementById("TxtUsoCFDI").value;
                    var Direccion = document.getElementById("TxtDireccion").value;
                    //------------------------Guarda checkbox de los artículos seleccionados----------------------------------
                    var Articulo = ChevPedidos[i].id;
                    //------------------------Guarda la cantidad de artículos solicitados----------------------------------
                    var CantidadSolicitada = NumPedidos[i].value;
                    //------------------------------------------------------------------------------------------------------
                    var frm = new FormData();
                    frm.append("IdPedidosExternos", IdPedidosExternos);
                    frm.append("IdProveedor", IdProveedor);
                    frm.append("Proveedor", Proveedor);
                    frm.append("Correo", Correo);
                    frm.append("RFC", RFC);
                    frm.append("Telefono", Telefono);
                    frm.append("Clabe", Clabe);
                    frm.append("Articulo", Articulo);
                    frm.append("NumeroPedido", NumeroPedido);
                    frm.append("CantidadSolicitada", CantidadSolicitada);
                    frm.append("Fecha", Fecha);
                    frm.append("UsoCFDI", UsoCFDI);
                    frm.append("Direccion", Direccion);
                    frm.append("Estatus", 1);
                    $.ajax({
                        type: "POST",
                        url: "/Prueba/GuardarPedidoExterno",
                        data: frm,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            if (data == 0) {
                                alert("Ocurrio un error");
                            }
                            else if (data == -1) {
                                alert("Ya existe el perfil");
                            }

                        }
                    });

                }
            }
            //-----Mensaje de confirmación-----------------------
            alert("Se guardaron los datos correctamente");
        }
    }

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
    $.get("/Prueba/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
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
//*********************************************************************************************************************************
//------------- Función que crea el segundo grid para desplegar que se despliega por numero de compra-----------------------------
function Desplegar2(no) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Prueba/ConsultaNumCompra/?No=" + no, function (Data) {
            var dos = "";
            //---Encabezado del grid---------
            dos += "<hr class='solid3'>";
            dos += "<div class='row'>";
            dos += "<div class='col-sm'>NoCompra</div>";
            dos += "<div class='col-sm'>Artículo</div>";
            dos += "<div class='col-sm'>Fecha de Ingreso</div>";
            dos += "<div class='col-sm'>Unidad de medida</div>";
            dos += "<div class='col-sm'>Costo</div>";
            dos += "</div>";
            dos += "<hr class='solid3'>";

            for (var i = 0; i < Data.length; i++) {

                //----Cuerpo del grid-------------
                dos += "<div class='row'>";
                dos += "<div class='col-sm'>" + Data[i].NoCompra + "</div>";
                dos += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
                dos += "<div class='col-sm'>" + Data[i].FechaDeIngreso + "</div>";
                dos += "<div class='col-sm'>" + Data[i].Unidad + "</div>";
                dos += "<div class='col-sm'>" + Data[i].Coste + "</div>";
                dos += "</div>";
            }
            dos += "</div>";
            dos += "</br>";
            dos += "</br>";

            let numero = "desplegable2" + no;
            document.getElementById(numero).innerHTML = dos;
        });
    }
}

//************************************************************************************************************
//*******************************Función que determina el siguiente número de pedido*****************************************************
function ConsultaSiguientePedido() {
    $.get("/Prueba/ConsultaPedidosDecendiente", function (Data) {
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

