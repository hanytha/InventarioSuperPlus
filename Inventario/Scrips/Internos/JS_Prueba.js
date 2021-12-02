
//-----------------------Crea el grid con las consultas de la tabla artículos y compra---------------------------------------------------
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
//----------------------------Crea el grid a desplegar con el botón con la funciíon de desplegar------------------------------------
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
                uno += "<button title='Clic para desplegar Artículos de la misma compra' class='btn btn-outline-warning' onclick='Desplegar2(" + Data[i].NoCompra + ")' type='button' data-toggle='collapse' data-target='#desplegable2" + Data[i].NoCompra + "' aria-expanded='false' aria-controls='desplegable2(" + Data[i].NoCompra + ")'><i class='fas fa-angle-down'></i></button>";
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

            let compraArticulo = "desplegable" + id ;
            document.getElementById(compraArticulo).innerHTML = uno;
        }); 
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//----------------Abrir modal Proveedor--------------------------------------------------------
function abrirModal(id) {
    cmbProveedor();


    if (id == 0) {
        sessionStorage.setItem('IDG', '0');

    }
    else {
      
        $.get("/Prueba/ConsultaComJoinProveedor/?Id=" + id, function (Data) {     
            document.getElementById("cmbProveedor").value = id;
            document.getElementById("TxtCorreo").value = Data[0].Correo;
            document.getElementById("TxtRFC").value = Data[0].RFC;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtClabe").value = Data[0].Clabe;
    
            MostrarArticulos(id);
        });
    }
}
//-------------------Crear los chex-box de artículos por ID  de proveedor------------------------
//***************************************************
    function MostrarArticulos(id) {

        if (id == 0) {
            sessionStorage.setItem('IDt', '0');
        }
        else {

            $.get("/Prueba/ConsultaArtProveedores/?IdP=" + id, function (Data) {
                var TablaArticulo = "";
                TablaArticulo += "<div class='row'>";

                for (var i = 0; i < Data.length; i++) {
                //-------Crea los chex-box------------------------------------------------
                    TablaArticulo += "<ul class='list-group'>"
                    TablaArticulo += "<li class='list-group-item '>";
                    TablaArticulo += "<input type='checkbox' class='heckbox-articulos' id='" + Data[i].ID + "' ><span class='help-block text-muted small-font'>" + Data[i].Nombre + "</span>";
                    TablaArticulo += "</li>";
                //-------Crea el combobox para seleccionar la unidad de medida----------------------
                    TablaArticulo += "<li class='list-group-item'>";
                    TablaArticulo += "<select><option>-Seleccione-</option><option></optio>Paquete(s)<option></optio>Litro(s)<option></optio>Metro(s)</select>";
                    TablaArticulo += "</li>";
               //----------Crea los input para determinar la cantidad-------------------------------
                    TablaArticulo += "<li class='list-group-item'>";
                    TablaArticulo += "<label>";
                    TablaArticulo += "<input type='number' class='heckbox-articulos redondeado' id='" + Data[i].ID + "' ><span class='help-block text-muted small-font'></span>";
                    TablaArticulo += "</label>";
                    TablaArticulo += "</li>";
                    TablaArticulo += "</ul>";
                }
                TablaArticulo += "</div>";
                document.getElementById("TblArticulos").innerHTML = TablaArticulo;
            });
        }
    }
//-----------------------------------Llenar el comobobox de proveedores------------------------------------------------------
function cmbProveedor() {
    $.get("/Prueba/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });

    //funcion general para llenar los select
    function llenarCombo(data, control) {
        var contenido = "";
        contenido += "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
        }
        control.innerHTML = contenido;
    }
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

//-----------------------------limpiar campos---------------------
function LimpiarCamposSub() {
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    var controlesSLT = document.getElementsByClassName("limpiarSelect");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
    }
}