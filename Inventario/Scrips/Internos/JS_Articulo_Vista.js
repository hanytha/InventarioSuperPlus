
ConsultaArticulo();
function ConsultaArticulo() {
    $.get("/Prueba/ConsultaCompras", function (Data) {
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
    CodigoHtmlArticulo += "<div class='icono flexbox'>Existencia Actual</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Fecha Ingreso</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Costo</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Costo</div>"
    CodigoHtmlArticulo += "<div class='icono flexbox'>Acción</div>"
    CodigoHtmlArticulo +="<hr class='solid'>"
    CodigoHtmlArticulo += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlArticulo += "<div>";
        CodigoHtmlArticulo += "<div class='row row-cols-auto '>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].IdCompra + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].ExitenciaActual + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].FechaDeIngreso + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].Coste + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col '>" + Data[i].Coste + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<label>"
        CodigoHtmlArticulo += "<button title='Desplegar para mostrar' class='btn btn-outline-primary' onclick='editarModal(" + Data[i].IdArticulos + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-angle-down'></i></button>";
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

//--------------------------------------------------------------------------------------------------

ConsultaArticulos();
function ConsultaArticulos() {
    $.get("/Articulo/ConsultaArticulos", function (Data) {
        CrearDiArticulo(Data);
    }
    );
}
function CrearDiArticulo(Data) {
    var CodigoHtmlCompra = "";
    CodigoHtmlCompra += "<div id='contenedor2'>";
    CodigoHtmlCompra += "<section id='contenedor_follow'>";
    CodigoHtmlCompra += "<hr class='solid2'>"
    CodigoHtmlCompra += "<div class='icono flexbox'>ID</div> "
    CodigoHtmlCompra += "<div class='icono flexbox'>Metodo DePago</div>"
    CodigoHtmlCompra += "<div class='icono flexbox'>NoCompra</div>"
    CodigoHtmlCompra += "<div class='icono flexbox'>NoCompra</div>"
    CodigoHtmlCompra += "<div class='icono flexbox'>Acción</div>"
    CodigoHtmlCompra += "<hr class='solid2'>"
    CodigoHtmlCompra += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlCompra += "<div>";
        CodigoHtmlCompra += "<div class='row row-cols-auto'>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].IdArticulos + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].NombreEmpresa + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].Fecha + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
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
    CodigoHtmlAlmacen += "<hr class='solid3'>"
    CodigoHtmlAlmacen += "<div class='icono flexbox'>ID</div> "
    CodigoHtmlAlmacen += "<div class='icono flexbox'>TipoDeOperacion</div>"
    CodigoHtmlAlmacen += "<div class='icono flexbox'>TipoDeOperacion</div>"
    CodigoHtmlAlmacen += "<div class='icono flexbox'>Acción</div>"
    CodigoHtmlAlmacen += "<hr class='solid3'>"
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


//Logo
var btnFoto = document.getElementById("BtnFoto");
btnFoto.onchange = function (e) {
    var file = document.getElementById("BtnFoto").files[0];
    var reader = new FileReader();
    if (reader != null) {
        reader.onloadend = function () {
            var img = document.getElementById("PBFoto");
            img.src = reader.result;
        }
    }
    reader.readAsDataURL(file);
}

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