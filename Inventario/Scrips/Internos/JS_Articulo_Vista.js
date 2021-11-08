
ConsultaArticulo();
function ConsultaArticulo() {
    $.get("/Bonificaciones/ConsultaArticulos", function (Data) {
        CrearDivArticulo(Data);
    }
    );
}
function CrearDivArticulo(Data) {
    var CodigoHtmlArticulo = "";
    CodigoHtmlArticulo += "<div id='container'>";
    CodigoHtmlArticulo += "<section id='contenedor_follow'>";
    CodigoHtmlArticulo += "<hr class='solid'>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>ID</div> "
    CodigoHtmlArticulo += "<div class='icono flexbox'>Nombre Empresa</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Fecha</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Precio Unitario Promedio</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Descripcion</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Acción</div>"
    CodigoHtmlArticulo +="<hr class='solid'>"
    CodigoHtmlArticulo += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlArticulo += "<div>";
        CodigoHtmlArticulo += "<div class='row row-cols-auto '>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].IdArticulos + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].NombreEmpresa + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].Fecha + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].PrecioUnitarioPromedio + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].Descripcion + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<label>"
        CodigoHtmlArticulo += "<button title='Desplegar para mostrar' class='btn btn-warning' style='cursor:s-resize' onClick='Alternar2(seccion2)' ><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlArticulo += "</label>"
        CodigoHtmlArticulo += "<label>"
        CodigoHtmlArticulo += "<button title='Desplegar para mostrar' class='btn btn-info' style='cursor:s-resize' onClick='Alternar(seccion1)' ><i class='fas fa-angle-down'></i></button>";
        CodigoHtmlArticulo += "</label>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "</div>";
    }

    document.getElementById("container").innerHTML = CodigoHtmlArticulo;
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

ConsultaArticulos();
function ConsultaArticulos() {
    $.get("/Compra/ConsultasCompras", function (Data) {
        CrearDiArticulo(Data);
    }
    );
}
function CrearDiArticulo(Data) {
    var CodigoHtmlCompra = "";
    CodigoHtmlCompra += "<div  id='contenedor2'>";
    CodigoHtmlCompra += "<section id='contenedor_follow'>";
    CodigoHtmlCompra += "<hr class='solid3'>"
    CodigoHtmlCompra += "<div class='icono flexbox'>ID</div> "
    CodigoHtmlCompra += "<div class='icono flexbox'>Fecha de ingreso</div>"
    CodigoHtmlCompra += "<div class='icono flexbox'>Existencia actual</div>"
    CodigoHtmlCompra += "<div class='icono flexbox'>Coste</div>"
    CodigoHtmlCompra += "<div class='icono flexbox'>Acción</div>"
    CodigoHtmlCompra += "<hr class='solid3'>"
    CodigoHtmlCompra += "<div>";


    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlCompra += "<div>";
        CodigoHtmlCompra += "<div class='row row-cols-auto'>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].IdCompra + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].FechaDeIngreso + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col '>" + Data[i].ExitenciaActual + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col '>" + Data[i].Coste + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col '>"
        CodigoHtmlCompra += "<label>"
        CodigoHtmlCompra += "<button title='Desplegar para mostrar' class='btn btn-outline-primary' onclick='editarModal(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-angle-down'></i></button>";
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
    CodigoHtmlAlmacen += "<div class='icono flexbox'>ID</div> "
    CodigoHtmlAlmacen += "<div class='icono flexbox'>TipoDeOperacion</div>"
    CodigoHtmlAlmacen += "<div class='icono flexbox'>TipoDeOperacion</div>"
    CodigoHtmlAlmacen += "<div class='icono flexbox'>Acción</div>"
    CodigoHtmlAlmacen += "<hr class='solid4'>"
    CodigoHtmlAlmacen += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlAlmacen += "<div>";
        CodigoHtmlAlmacen += "<div class='row row-cols-auto'>";
        CodigoHtmlAlmacen += "<div class='col'>"
        CodigoHtmlAlmacen += "<div class='col'>" + Data[i].IdExistenciaAlmacenG + "</div>"
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "<div class='col'>"
        CodigoHtmlAlmacen += "<div class='col'>" + Data[i].TipoDeOperacion + "</div>"
        CodigoHtmlAlmacen += "</div>";
        CodigoHtmlAlmacen += "<div class='col'>"
        CodigoHtmlAlmacen += "<div class='col'>" + Data[i].TipoDeOperacion + "</div>"
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