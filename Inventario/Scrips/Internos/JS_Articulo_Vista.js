 var imagen64;
LlenarCMCategoria();

ConsultaArticulo();
function ConsultaArticulo() {
    $.get("/Articulo/ConsultaArticulos", function (Data) {
        CrearDivArticulo(Data);
    }
    );
}
function CrearDivArticulo(Data) {
    var CodigoHtmlArticulo = "";
    CodigoHtmlArticulo += "<div id='container'>";
    CodigoHtmlArticulo += "<section id='contenedor_follow'>";
    CodigoHtmlArticulo += "<hr class='solid'>"
    CodigoHtmlArticulo += "<div class='icono'>ID</div> "
    CodigoHtmlArticulo += "<div class='icono'>Nombre</div>"
    CodigoHtmlArticulo += "<div class='icono'>Fecha</div>"
    CodigoHtmlArticulo += "<div class='icono'>Costo</div>"
    CodigoHtmlArticulo += "<div class='icono'>Stock</div>"
    CodigoHtmlArticulo +="<hr class='solid'>"
    CodigoHtmlArticulo += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlArticulo += "<div>";
        CodigoHtmlArticulo += "<div class='row row-cols-auto'>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].IdArticulos + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreEmpresa + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
        CodigoHtmlArticulo += "</div>";
        CodigoHtmlArticulo += "<div class='col'>"
        CodigoHtmlArticulo += "<div class='col'>" + Data[i].NombreProveedor + "</div>"
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

ConsultaComprass();
function ConsultaComprass() {
    $.get("/Compra/ConsultasCompras", function (Data) {
        CrearDivCompra(Data);
    }
    );
}
function CrearDivCompra(Data) {
    var CodigoHtmlCompra = "";
    CodigoHtmlCompra += "<div id='contenedor2'>";
    CodigoHtmlCompra += "<section id='contenedor_follow'>";
    CodigoHtmlCompra += "<hr class='solid2'>"
    CodigoHtmlCompra += "<div class='icono'>ID</div> "
    CodigoHtmlCompra += "<div class='icono'>MetodoDePago</div>"
    CodigoHtmlCompra += "<div class='icono'>NoCompra</div>"
      CodigoHtmlCompra += "<div class='icono'>NoCompra</div>"
    CodigoHtmlCompra += "<hr class='solid2'>"
    CodigoHtmlCompra += "<div>";

    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlCompra += "<div>";
        CodigoHtmlCompra += "<div class='row row-cols-auto'>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].IdCompra + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].MetodoDePago + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].NoCompra + "</div>"
        CodigoHtmlCompra += "</div>";
        CodigoHtmlCompra += "<div class='col'>"
        CodigoHtmlCompra += "<div class='col'>" + Data[i].ExitenciaInicial + "</div>"
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
    CodigoHtmlAlmacen += "<div class='icono'>ID</div> "
    CodigoHtmlAlmacen += "<div class='icono'>TipoDeOperacion</div>"
    CodigoHtmlAlmacen += "<div class='icono'>TipoDeOperacion</div>"

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
//limpiar campos
function LimpiarCampos() {
    //Limpiar la casilla de texto
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }
    //Limpiar las imágenes
    var controlesImg = document.getElementsByClassName("limpiarImg");
    for (var i = 0; i < controlesImg.length; i++) {
        controlesImg[i].value = null;
    }
}


//Guarda los cambios y altas de los proveedores
function GuardarArticulo() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdArticulos = sessionStorage.getItem('IDArt');
            var NombreEmpresa = document.getElementById("TxtNombreEmpresa").value;
            var NombreProveedor = document.getElementById("TxtNombreProveedor").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;

            var IdCategorias = document.getElementById("cmbCategoria").value;
            var TempSupervisor = document.getElementById("cmbCategoria");
            var Categoria = TempSupervisor.options[TempSupervisor.selectedIndex].text;  

            var PrecioUnitarioPromedio = document.getElementById("TxtPrecioUnitarioPromedio").value;
            var UnidadSAT = document.getElementById("TxtUnidadSAT").value;
            var ClaveSAT = document.getElementById("TxtClaveSAT").value;
            var Fecha = document.getElementById("TxtFecha").value;

            var Logo = document.getElementById("PBFoto").src.replace("data:image/png;base64,", "");  ///////////-------->
            if (Logo.endsWith('png')) {
                Logo = imagen64.replace("data:image/png;base64,", "");
            }
            var frm = new FormData();
            frm.append("IdArticulos", IdArticulos);
            frm.append("NombreEmpresa", NombreEmpresa);
            frm.append("NombreProveedor", NombreProveedor);
            frm.append("Descripcion", Descripcion);
            frm.append("IdCategorias", IdCategorias);
            frm.append("Categoria", Categoria);
            frm.append("PrecioUnitarioPromedio", PrecioUnitarioPromedio);
            frm.append("UnidadSAT", UnidadSAT);
            frm.append("ClaveSAT", ClaveSAT);
            frm.append("Fecha", Fecha);
            frm.append("cadF", Logo);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Articulo/GuardarArticulo",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el proveedor");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        CrearAcordeonArticulos();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}


//marca los campos obligatorios
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
//"Elimina" el área cambia el Estatus
function EliminarArticulo(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Articulo/EliminarArticulo/?Id=" + id, function (DatoArt) {
            if (DatoArt == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonArticulos();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


function LlenarCMCategoria() {
    $.get("/GLOBAL/BDCategorias", function (data) {
        llenarCombo(data, document.getElementById("cmbCategoria"));
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

