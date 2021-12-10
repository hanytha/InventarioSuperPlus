//const f = new Date();


//function Usuarios_X_Tienda(IDTienda) {
//    $.get("/Usuario/UsuariosXTienda/?IDTienda=" + IDTienda, function (PersonalTienda) {
//        if (PersonalTienda.lenght != 0) {
//            llenarComboPersonal(PersonalTienda, document.getElementById("cmbIDUsuario"), sessionStorage.getItem('IDUsuario'), sessionStorage.getItem('Nombre'));
//            document.getElementById("cmbIDUsuario").value = sessionStorage.getItem('IDUsuario');
//        }
//    });
//}
////combo personal por tienda
//function llenarComboPersonal(Datos, control, IDExtra, NombreExtra) {
//    var contenido = "";
//    contenido += "<option value='0'>--Seleccione--</option>";
//    for (var i = 0; i < Datos.length; i++) {
//        contenido += "<option value='" + Datos[i].ID + "'>" + Datos[i].Nombre + "</option>";
//    }
//    if (IDExtra != "") {
//        contenido += "<option value='" + IDExtra + "'>" + NombreExtra + "</option>";
//    }
//    control.innerHTML = contenido;
//}
//function Limpiar() {
//    var ControlesTXT = document.getElementsByClassName("limpiar");
//    for (var i = 0; i < ControlesTXT.length; i++) {
//        ControlesTXT[i].value = "";
//    }
//    var ControlesSLT = document.getElementsByClassName("SelectCLS");
//    for (var i = 0; i < ControlesSLT.length; i++) {
//        document.getElementById(ControlesSLT[i].id).value = 0;
//    }
//}
////funcion general para llenar los select
//function llenarCombo(DAtos, control) {
//    var contenido = "";
//    contenido += "<option value='0'>--Seleccione--</option>";
//    for (var i = 0; i < DAtos.length; i++) {
//        contenido += "<option value='" + DAtos[i].ID + "'>" + DAtos[i].Nombre + "</option>";
//    }
//    control.innerHTML = contenido;
//}


////----------Tabla------------////

//-----------------------Crea el grid con las consultas de la tabla artículos por tienda---------------------------------------------------

//////////////////////////////////

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
            CodigoHtmlArticuloComp += "<div class='col-sm'>No. Pedido</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Artículo</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha Ingreso</div>";
            CodigoHtmlArticuloComp += "<div class='col-sm'>Stock</div>";
            //CodigoHtmlArticuloComp += "<div class='col-sm'>Costo</div>";
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

                //CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraycostos[i] + "</div>";
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
            CodigoHtmlArticuloComp += "</div>";
            CodigoHtmlArticuloComp += "</br>";
            CodigoHtmlArticuloComp += "</br>";

            let contenedor1 = "contenedor1" + IDTienda;
            document.getElementById(contenedor1).innerHTML = CodigoHtmlArticuloComp;

        });


    }

}
/////////////////////////////////////////////

//function ConsultaArticuloComp(IDTienda) {
//    $.get("/Supervision/ConsultaArticulos/?IDTienda=" + IDTienda, function (Data) {
//        CrearArticuloComp(Data);
//    });

//}
//function CrearArticuloComp(Data) {

//    var CodigoHtmlArticuloComp = "";

//    CodigoHtmlArticuloComp += "<div id='contenedor1'>";
//    CodigoHtmlArticuloComp += "<hr class='solid'>";
//    CodigoHtmlArticuloComp += "<div class='row'>";
//    CodigoHtmlArticuloComp += "<div class='col-sm'>ID</div>";
//    CodigoHtmlArticuloComp += "<div class='col-sm'>Artículo</div>";
//    CodigoHtmlArticuloComp += "<div class='col-sm'>Fecha Ingreso</div>";
//    CodigoHtmlArticuloComp += "<div class='col-sm'>Stock</div>";
//    //CodigoHtmlArticuloComp += "<div class='col-sm'>Costo</div>";
//    CodigoHtmlArticuloComp += "<div class='col-sm'>Acción</div>";
//    CodigoHtmlArticuloComp += "</div>";
//    CodigoHtmlArticuloComp += "<hr class='solid'>";
//    CodigoHtmlArticuloComp += "</div>";


//    let id = Data.id;
//    let ArrayId = id.split(',');
//    let Nombre = Data.Nombre;
//    let Arraynombre = Nombre.split(',');
//    let Fechas = Data.Fechas;
//    let Arrayfechas = Fechas.split(',');
//    let Stock = Data.Stock;
//    let Arraystock = Stock.split(',');
//    //let Costos = Data.Costos;
//    //let Arraycostos = Costos.split(',');

   
//        for (var i = 0; i < ArrayId.length; i++) {

//            CodigoHtmlArticuloComp += "<div>";
//            CodigoHtmlArticuloComp += "<div class='row'>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>" + ArrayId[i] + "</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraynombre[i] + "</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arrayfechas[i] + "</div>";
//            CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraystock[i] + "</div>";

//            //CodigoHtmlArticuloComp += "<div class='col-sm'>" + Arraycostos[i] + "</div>";
//            //-----------------Botón para desplegar la primera tabla--------------
//            CodigoHtmlArticuloComp += "<div class='col'>"
//            CodigoHtmlArticuloComp += "<label>"
//            CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayId[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayId[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayId[i] + ")'><i class='fas fa-angle-down'></i></button>";
//            CodigoHtmlArticuloComp += "</label>";
//            CodigoHtmlArticuloComp += "</div>";
//            //-------------Termina----------------------------------------
//            CodigoHtmlArticuloComp += "</div>";
//            CodigoHtmlArticuloComp += "</div>";
//            //------------------------Despliega primer grid-----------------------------------------------------------------------
//            CodigoHtmlArticuloComp += "<div class='row'>";
//            CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayId[i] + "' class='collapse'></div></div>";
//            CodigoHtmlArticuloComp += "</div>";
//            //---------------------------------------Termina----------------------------------------------------------------------------
//        }
  
//    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;
    
//}

//----------------------------Crea el grid a desplegar con el botón con la funciíon de desplegar------------------------------------
function Desplegar(id) {

    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Supervision/ConsultaExistenciaAlmGJoinProveedor/?Id=" + id, function (Data) {
            var DespXArt = "";
            //---Encabezado del grid---------
            DespXArt += "<hr class='solid4'>";
            DespXArt += "<div class='row'>";
            DespXArt += "<div class='col-sm'>NoPedido</div>";
            DespXArt += "<div class='col-sm'>Artículo</div>";
            DespXArt += "<div class='col-sm'>Fecha de Ingreso</div>";
            DespXArt += "<div class='col-sm'>Costo</div>";
            DespXArt += "<div class='col-sm'>Proveedor</div>";
            DespXArt += "<div class='col-sm'>Acción</div>";
            DespXArt += "</div>";
            DespXArt += "<hr class='solid4'>";



            for (var i = 0; i < Data.length; i++) {
                //----Cuerpo del grid-------------
                DespXArt += "<div class='row'>";
                DespXArt += "<div class='col-sm'>" + Data[i].NoPedido + "</div>";
                DespXArt += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
                DespXArt += "<div class='col-sm'>" + Data[i].FechaDeIngreso + "</div>";
                DespXArt += "<div class='col-sm'>" + Data[i].Coste + "</div>";
                //-----------------------------Abre el modal deacuerdo con el proveedor---------------------------------------------------
                DespXArt += "<div class='col-sm'><button style='background-color:white; border:none;' onclick='abrirModal(" + Data[i].IdProveedor + ")' data-toggle='modal' data-target='#ModalProveedor'>" + Data[i].Proveedor + "</button></div>";
                //-----------------Botón para desplegar la segunda tabla--------------------------------------------
                DespXArt += "<div class='col-sm'>"
                DespXArt += "<label>"
                DespXArt += "<button title='Clic para desplegar Artículos de la misma compra' class='btn btn-outline-warning' onclick='Desplegar2(" + Data[i].NoPedido + ")' type='button' data-toggle='collapse' data-target='#desplegable2" + Data[i].NoPedido + "' aria-expanded='false' aria-controls='desplegable2(" + Data[i].NoPedido + ")'><i class='fas fa-angle-down'></i></button>";
                DespXArt += "</label>"
                DespXArt += "</div>";
                //-------------------Termina-------------------------
                DespXArt += "</div>";
                //--------------------Se inserta la segunda tabla atravez de su id---------------------
                DespXArt += "<div class='row'>";
                DespXArt += "<div class='col'><div id='desplegable2" + Data[i].NoPedido + "' class='collapse'></div></div>";
                DespXArt += "</div>";
            }
            DespXArt += "</div>";
            DespXArt += "</br>";
            DespXArt += "</br>";

            let compraArticulo = "desplegable" + id;
            document.getElementById(compraArticulo).innerHTML = DespXArt;
        });
    }
}



//------------- Función que crea el segundo grid para desplegar que se despliega por numero de pedido-----------------------------
function Desplegar2(no) {
    if (no == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Supervision/ConsultaNumPedido/?No=" + no, function (Data) {
            var DespXPedido = "";
            //---Encabezado del grid---------
            DespXPedido += "<hr class='solid3'>";
            DespXPedido += "<div class='row'>";
            DespXPedido += "<div class='col-sm'>NoPedido</div>";
            DespXPedido += "<div class='col-sm'>Artículo</div>";
            DespXPedido += "<div class='col-sm'>Fecha de Ingreso</div>";
            DespXPedido += "<div class='col-sm'>Unidad de medida</div>";
            DespXPedido += "<div class='col-sm'>Costo</div>";
            DespXPedido += "</div>";
            DespXPedido += "<hr class='solid3'>";

            for (var i = 0; i < Data.length; i++) {

                //----Cuerpo del grid-------------
                DespXPedido += "<div class='row'>";
                DespXPedido += "<div class='col-sm'>" + Data[i].NoPedido + "</div>";
                DespXPedido += "<div class='col-sm'>" + Data[i].NombreEmpresa + "</div>";
                DespXPedido += "<div class='col-sm'>" + Data[i].FechaDeIngreso + "</div>";
                DespXPedido += "<div class='col-sm'>" + Data[i].Unidad + "</div>";
                DespXPedido += "<div class='col-sm'>" + Data[i].Coste + "</div>";
                DespXPedido += "</div>";
            }
            DespXPedido += "</div>";
            DespXPedido += "</br>";
            DespXPedido += "</br>";

            let numero = "desplegable2" + no;
            document.getElementById(numero).innerHTML = DespXPedido;
        });

    }
}



//----------------Abrir modal Proveedor--------------------------------------------------------
function abrirModal(id) {
    LlenarCMCProveedores();
    LimpiarCampos();
    if (id == 0) {
        sessionStorage.setItem('IDG', '0');
    }
    else {

        $.get("/Supervision/ConsultaComJoinProveedor/?Id=" + id, function (Data) {
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            //document.getElementById("cmbTipoTienda").value = Data[0].IdSitio;
            document.getElementById("TxtCorreo").value = Data[0].Correo;
            //document.getElementById("TxtRFC").value = Data[0].RFC;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            //document.getElementById("TxtClabe").value = Data[0].Clabe;
            MostrarArticulos(id);
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

//************************************************************************************************
//-------------------Crear los chex-box de artículos por ID  de proveedor------------------------
function MostrarArticulos(id) {

    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Supervision/ConsultaArtProveedores/?IdP=" + id, function (Data) {

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
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado' id='" + ArrayID[i] + "' ><span class='help-block text-muted small-font '></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
            }
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//----------------------Guardar datos de los pedidos-----------------------------------------------
function GuardarPedidoExterno() {

    if (confirm("¿Desea aplicar los cambios?") == 1) {
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
        //------------------------Guarda checkbox de los artículos seleccionados----------------------------------
        var ChevPedidos = document.getElementsByClassName("checkbox-articulos");
        let seleccionados = "";
        for (let i = 0; i < ChevPedidos.length; i++) {
            if (ChevPedidos[i].checked == true) {
                seleccionados += ChevPedidos[i].id;
                seleccionados += "#";
            }
        }
        var Articulo = seleccionados.substring(0, seleccionados.length - 1);
        //------------------------Guarda la cantidad de artículos solicitados----------------------------------
        var NumPedidos = document.getElementsByClassName("input-cantidad");
        let llenar = "";
        for (let i = 0; i < NumPedidos.length; i++) {
            if (NumPedidos[i].value >= 1) {
                llenar += NumPedidos[i].value;
                llenar += "#";
            }
        }
        var CantidadSolicitada = llenar.substring(0, llenar.length - 1);
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
                else {
                    alert("Se guardaron los datos correctamente.");

                    document.getElementById("btnCancelarPerfil").click();
                }
            }
        });
    }
}
//-----------------------------------Llenar el comobobox de proveedores------------------------------------------------------
function LlenarCMCProveedores() {
    $.get("/Supervision/BDProveedor", function (data) {
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
