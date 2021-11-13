
ConsultaArticuloComp();
function ConsultaArticuloComp() {
    $.get("/ArticuloVista/ConsultaArticulos", function (Data) {
        CrearArticuloComp(Data);
        });

}

function CrearArticuloComp(Data) {
    var CodigoHtmlArticuloComp = "";
    CodigoHtmlArticuloComp += "<div id='contenedor1'>";
    CodigoHtmlArticuloComp += "<section id='contenedor_follow'>";
    CodigoHtmlArticuloComp += "<hr class='solid'>";
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>ID</div> "
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Nombre Empresa</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Fecha de ingreso</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Stock</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Costo</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Acción</div>";
    CodigoHtmlArticuloComp += "<hr class='solid'>"
    CodigoHtmlArticuloComp += "<div>";

        let id = Data.id;
        let ArrayId = id.split(',');
        let Nombre = Data.Nombre;
        let Arraynombre = Nombre.split(',');
        let Fechas = Data.Fechas;
        let Arrayfechas = Fechas.split(',');
        let Stock = Data.Stock;
        let Arraystock = Stock.split(',');
        let Costos = Data.Costos;
        let Arraycostos = Costos.split(',')

    for (var i = 0; i < (ArrayId && Arraynombre && Arrayfechas && Arraystock && Arraycostos).length; i++) {

        CodigoHtmlArticuloComp += "<div>";
        CodigoHtmlArticuloComp += "<div class='row row-cols-auto '>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + ArrayId[i].id + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraynombre[i].Nombre + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arrayfechas[i].Fechas + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraystock[i].Stock + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraycostos[i].Costos + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";

    }
    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;
   
}

//---------------------------Funcion para desplegar la primera tabla--------------------------------------------------------
function Alternar(Seccion) {
    if (Seccion.style.display == "none") { Seccion.style.display = "" }
    else { Seccion.style.display = "none" }
}
//---------------------------Funcion para desplegar la segunda tabla--------------------------------------------------------
function Alternar2(Seccion2) {
    if (Seccion2.style.display == "none") { Seccion2.style.display = "" }
    else { Seccion2.style.display = "none" }
}
//--------------------------------------------------------------------------------------------------

ConsultaTienda();
function ConsultaTienda() {
    $.get("/Tienda/ConsultaTiendas", function (Data) {
        CrearDivTienda(Data);
    }
    );
}
function CrearDivTienda(Data) {
    var CodigoHtmlCompra = "";
    CodigoHtmlCompra += "<div  id='contenedor2'>";
    CodigoHtmlCompra += "<section id='contenedor_follow'>";
    CodigoHtmlCompra += "<hr class='solid3'>"
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>ID</div> "
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>Fecha de ingreso</div>"
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>Existencia actual</div>"
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>Coste</div>"
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>Acción</div>"
    CodigoHtmlCompra += "<hr class='solid3'>"
    CodigoHtmlCompra += "<div>";


    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlCompra += "<div>";
        CodigoHtmlCompra += "<div class='row row-cols-auto'>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col Cell'>" + Data[i].Nombre + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col Cell'>" + Data[i].LNombre + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col Cell'>" + Data[i].E1Nombre + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col Cell'>" + Data[i].Telefono + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col Cell'>"
        CodigoHtmlCompra += "<label>"
        CodigoHtmlCompra += "<button title='Desplegar para mostrar' class='btn btn-outline-primary' onclick='editarModal(" + Data[i].IdTienda + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlCompra += "</label>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";

    }

    document.getElementById("contenedor2").innerHTML = CodigoHtmlCompra;
}

//--------------------------------------------------------------------------------------------------

ConsultaExistenciaAlmacen();
function ConsultaExistenciaAlmacen() {
    $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacenes", function (Data) {
        CrearDivAlmacen(Data);
    }
    );
}
function CrearDivAlmacen(Data) {
    var CodigoHtmlAlmacen = "";
    CodigoHtmlAlmacen += "<div id='contenedor3'>";
    CodigoHtmlAlmacen += "<section id='contenedor_follow'>";
    CodigoHtmlAlmacen += "<hr class='solid4'>"
    CodigoHtmlAlmacen += "<div class='icono flexbox Heading'>ID</div> "
    CodigoHtmlAlmacen += "<div class='icono flexbox Heading'>TipoDeOperacion</div>"
    CodigoHtmlAlmacen += "<div class='icono flexbox Heading'>TipoDeOperacion</div>"
    CodigoHtmlAlmacen += "<div class='icono flexbox Heading'>Acción</div>"
    CodigoHtmlAlmacen += "<hr class='solid4'>"
    CodigoHtmlAlmacen += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlAlmacen += "<div>";
        CodigoHtmlAlmacen += "<div class='row row-cols-auto'>";
        CodigoHtmlAlmacen += "<div class='col'>"
        CodigoHtmlAlmacen += "<div class='col Cell'>" + Data[i].IdExistenciaAlmacenG + "</div>"
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "<div class='col'>"
        CodigoHtmlAlmacen += "<div class='col Cell'>" + Data[i].TipoDeOperacion + "</div>"
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "<div class='col'>"
        CodigoHtmlAlmacen += "<div class='col Cell'>" + Data[i].TipoDeOperacion + "</div>"
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "<div class='col'>"
        CodigoHtmlAlmacen += "<label>"
        CodigoHtmlAlmacen += "<button title='Desplegar para mostrar' class='btn btn-outline-primary' onclick='editarModal(" + Data[i].IdExistenciaAlmacenG + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlAlmacen += "</label>"
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "</div>";

    }

    document.getElementById("contenedor3").innerHTML = CodigoHtmlAlmacen;
}


