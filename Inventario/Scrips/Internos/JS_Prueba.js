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
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<label>"
        CodigoHtmlArticuloComp += "<button title='Clic para desplegar' class='btn btn-outline-primary' onclick='Desplegar(" + ArrayId[i] + ")' type='button' data-toggle='collapse' data-target='#desplegable" + ArrayId[i] + "' aria-expanded='false' aria-controls='desplegable(" + ArrayId[i] + ")'><i class='fas fa-angle-down'></i></button>"; 
        CodigoHtmlArticuloComp += "</label>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        //------------------------Despliega el segundo grid----------------------------------------------------------
        CodigoHtmlArticuloComp += "<div class='row'>";
        CodigoHtmlArticuloComp += "<div class='col'><div id='desplegable" + ArrayId[i] + "' class='collapse'></div></div>";
        CodigoHtmlArticuloComp += "</div>";
        //---------------------------------------Termina----------------------------------------------------------------------------
    }
    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;

}

//----------------------------Crea el grid a desplegar con el botón con la funciíon de desplegar------------------------------------
function Desplegar(id) {

    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Prueba/ConsultaCompra/?Id=" + id, function (Data) {
            var uno = "";
            //---Encabezado del grid---------
            uno += "<hr class='solid4'>";
            uno += "<div class='row'>";
            uno += "<div class='col-sm'>ID</div>";
            uno += "<div class='col-sm'>Artículo</div>";
            uno += "<div class='col-sm'>NoCompra </div>";
            uno += "<div class='col-sm'>Clave</div>";
            uno += "</div>";
            uno += "<hr class='solid4'>";
            for (var i = 0; i < Data.length; i++) {
             
                //----Cuerpo del grid-------------
                uno += "<div class='row'>";
                uno += "<div class='col-sm'>" + Data[i].IdArticulo + "</div>";
                uno += "<div class='col-sm'>" + Data[i].Articulo + "</div>";
                uno += "<div class='col-sm'>" + Data[i].NoCompra + "</div>";
                uno += "<div class='col-sm'>" + Data[i].ClaveProveedor + "</div>";
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

