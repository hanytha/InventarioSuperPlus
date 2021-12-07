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
