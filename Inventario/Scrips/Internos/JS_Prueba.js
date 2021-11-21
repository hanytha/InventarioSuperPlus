ConsultaArticuloComp();
function ConsultaArticuloComp() {
    $.get("/Prueba/ConsultaArticulos", function (Data) {
        CrearArticuloComp(Data);
    });

}

function CrearArticuloComp(Data) {
    var CodigoHtmlArticuloComp = "";
    CodigoHtmlArticuloComp += "<div id='contenedor1'>";
    CodigoHtmlArticuloComp += "<section id='contenedor_follow'>";
    CodigoHtmlArticuloComp += "<hr class='solid'>";
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>ID</div> "
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Nombre Empresa</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Fecha de ingreso</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Stock</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Costo</div>"
    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono '>Acción</div>";
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
    let Arraycostos = Costos.split(',');


    for (var i = 0; i < (ArrayId, Arraynombre, Arrayfechas, Arraystock, Arraycostos).length; i++) {

        CodigoHtmlArticuloComp += "<div>";
        CodigoHtmlArticuloComp += "<div class='row row-cols-auto '>"
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + ArrayId[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraynombre[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col  Cell'>" + Arrayfechas[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraystock[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Arraycostos[i] + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<label>"
        CodigoHtmlArticuloComp += "<a onclick='return Desplegar(this);' href='javascript:void(0);'><button title='Desplegar para mostrar' class='btn btn-outline-primary'>Dsplegar</button></a>";
        CodigoHtmlArticuloComp += "<div style='display: none;'><div class='container'style='height: 50vh; width: 1200px;'><table border='1'><tbody><tr><td ></td><th>A</th><th>B</th></tr><tr><th>1</th><td>"+ ArrayId[i] +"</td><td>B1</td></tr><tr><th>2</th><td>A2</td><td>B2</td></tr></tbody></table></div></div>";
        CodigoHtmlArticuloComp += "</label>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
    }
    document.getElementById("contenedor1").innerHTML = CodigoHtmlArticuloComp;

}

//-------------------------------
function Desplegar(cual) {
    var c = cual.nextSibling;
    if (c.style.display == 'none') {
        c.style.display = 'block';
    } else {
        c.style.display = 'none';
    }
    return false;
}
//----------------------------------
//ConsultaArticuloCompra();
//function ConsultaArticuloCompra() {
//    $.get("/ArticuloVista/ConsultaArticulos", function (Data) {
//        CrearArticuloCompra(Data);
//    });

//}

//function CrearArticuloCompra(Data) {
//    var CodigoHtmlArticuloComp = "";
//    CodigoHtmlArticuloComp += "<div id='contenedor8'>";
//    CodigoHtmlArticuloComp += "<section id='contenedor_follow'>";
//    CodigoHtmlArticuloComp += "<hr class='solid'>";
//    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>ID</div> "
//    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono'>Nombre Empresa</div>"
//    CodigoHtmlArticuloComp += "<div class='col-3 Heading icono '>Acción</div>";
//    CodigoHtmlArticuloComp += "<hr class='solid'>"
//    CodigoHtmlArticuloComp += "<div>";


//    let IdComXart = Data.IdComXart;
//    let ArrayIdComXart = IdComXart.split(',');
//    let Nombres = Data.Nombres;
//    let ArrayNombres = Nombres.split(',');

//    for (var i = 0; i < (ArrayIdComXart, ArrayNombres).length; i++) {

//        CodigoHtmlArticuloComp += "<div>";
//        CodigoHtmlArticuloComp += "<div class='row row-cols-auto '>"
//        CodigoHtmlArticuloComp += "<div class='col'>"
//        CodigoHtmlArticuloComp += "<div class='col Cell'>" + IdComXart[i] + "</div>"
//        CodigoHtmlArticuloComp += "</div>";
//        CodigoHtmlArticuloComp += "<div class='col'>"
//        CodigoHtmlArticuloComp += "<div class='col Cell'>" + ArrayNombres[i] + "</div>"
//        CodigoHtmlArticuloComp += "</div>";
     
//        CodigoHtmlArticuloComp += "<div class='col'>"
//        CodigoHtmlArticuloComp += "<label>"
//        CodigoHtmlArticuloComp += "<a onclick='return Desplegar(this);' href='javascript:void(0);'><button title='Desplegar para mostrar' class='btn btn-outline-primary'>Dsplegar</button></a><div style='display: none;'><div class='container'style='height: 30vh; width: 1200px;'><div id='tabla'><p>unonuon</p></di></div>"
//        CodigoHtmlArticuloComp += "</label>"
//        CodigoHtmlArticuloComp += "</div>";
//        CodigoHtmlArticuloComp += "</div>";
//        CodigoHtmlArticuloComp += "</div>";
//        CodigoHtmlArticuloComp += "</div>";
//        CodigoHtmlArticuloComp += "</div>";
//        CodigoHtmlArticuloComp += "</div>";
//    }
//    document.getElementById("contenedor8").innerHTML = CodigoHtmlArticuloComp;

//}
//---------------------------Funcion para desplegar Tabla----------------------------------------------------

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
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>Nombre</div> "
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>LNombre</div>"
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>E1 Nombre</div>"
    CodigoHtmlCompra += "<div class='icono flexbox Heading'>Télefono</div>"
    CodigoHtmlCompra += "<hr class='solid3'>"
    CodigoHtmlCompra += "<div>";
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
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "</div>";

    }

    document.getElementById("contenedor2") = CodigoHtmlCompra;
}


/*
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

*/

//---------------------------------------------------------------------------------

//---------------------------------------------------------------------------------

ConsultaMarcas();
function ConsultaMarcas() {
    $.get("/Marca/ConsultaMarcas", function (Data) {
        CrearTablaMarcas(Data);
    }
    );
}
function CrearTablaMarcas(Data) {
    var CodigoHtmlTablaMarcas = "";
    CodigoHtmlTablaMarcas += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaMarcas += "<thead><tr><th>Nombre</th><th>Acción</thead>";
    CodigoHtmlTablaMarcas += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaMarcas += "<tr>";
        CodigoHtmlTablaMarcas += "<td>" + Data[i].Nombre + "</td>";

        CodigoHtmlTablaMarcas += "<td>";
        CodigoHtmlTablaMarcas += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdMarca + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaMarcas += "<button class='btn btn-danger' onclick='EliminarMarca(" + Data[i].IdMarca + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaMarcas += "</td>";
        CodigoHtmlTablaMarcas += "</tr>";
    }
    CodigoHtmlTablaMarcas += "</tbody>";
    CodigoHtmlTablaMarcas += "</table>";
    document.getElementById("tabla").innerHTML = CodigoHtmlTablaMarcas;
}


//---------------------------------------------------
