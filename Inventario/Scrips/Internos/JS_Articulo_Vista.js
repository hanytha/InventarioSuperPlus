ConsultaArticuloComp();
function ConsultaArticuloComp() {
    $.get("/Articulo/ConsultaArticulos", function (Data) {
        CrearArticuloComp(Data);
    }
    );
}

function CrearArticuloComp(Data) {
    var CodigoHtmlArticuloComp = "";
    CodigoHtmlArticuloComp += "<div id='contenedor4'>";
    CodigoHtmlArticuloComp += "<section id='contenedor_follow'>";
    CodigoHtmlArticuloComp += "<hr class='solid'>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>ID</div> "
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Nombre Empresa</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Fecha de ingreso</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Stock</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Costo</div>"
    CodigoHtmlArticuloComp += "<div class='icono flexbox Heading ml-auto'>Acción</div>"
    CodigoHtmlArticuloComp += "<hr class='solid'>"
    CodigoHtmlArticuloComp += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlArticuloComp += "<div>";
        CodigoHtmlArticuloComp += "<div class='row row-cols-auto '>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Data[i].IdArticulos + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Data[i].NombreEmpresa + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Data[i].FechaDeIngreso + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Data[i].ExitenciaActual + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col'>"
        CodigoHtmlArticuloComp += "<div class='col Cell'>" + Data[i].Coste + "</div>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "<div class='col Cell'>"
        CodigoHtmlArticuloComp += "<label>"
        CodigoHtmlArticuloComp += "<button title='Desplegar para mostrar' class='btn btn-warning' style='cursor:s-resize' onClick='Alternar2(seccion2)' ><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlArticuloComp += "</label>"
        CodigoHtmlArticuloComp += "<label>"
        CodigoHtmlArticuloComp += "<button title='Desplegar para mostrar' class='btn btn-info' style='cursor:s-resize' onClick='Alternar(seccion1)' ><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlArticuloComp += "</label>"
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";
        CodigoHtmlArticuloComp += "</div>";

    }
    document.getElementById("contenedor4").innerHTML = CodigoHtmlArticuloComp;

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

//--------------------------------------------------------------------------------------------------


//---------------------------------------------------------------------------------------------


//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Articulo/ConsultaArticulo/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDArt', Data[0].IdArticulos);
            document.getElementById("TxtNombreEmpresa").value = Data[0].NombreEmpresa;
            document.getElementById("TxtNombreProveedor").value = Data[0].NombreProveedor;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;
            document.getElementById("cmbCategoria").value = Data[0].IdCategorias;
            document.getElementById("TxtPrecioUnitarioPromedio").value = Data[0].PrecioUnitarioPromedio;
            document.getElementById("TxtUnidadSAT").value = Data[0].UnidadSAT;
            document.getElementById("TxtClaveSAT").value = Data[0].ClaveSAT;
            document.getElementById("TxtFecha").value = Data[0].Fecha;
            document.getElementById("PBFoto").src = "data:image/png;base64," + Data[0].FOTOMOSTRAR;

        });
    }
}