ConsultaArticulos();
BloquearCTRL();
LlenarCMCategoria();
LlenarCMCUnidad();
LlenarCMCArea();
LlenarCMCMarca();

//---------------Crea una tabla de todos los artículos de la BD---------------
function ConsultaArticulos() {
    $.get("/Articulo/ConsultaArticulos", function (Data) {
        CrearTablaArticulos(Data);
    }
    );
}
function CrearTablaArticulos(Data) {
    var CodigoHtmlTablaArticulos = "";
    CodigoHtmlTablaArticulos += "<div class='input-group mb-3 float-right '>";

    CodigoHtmlTablaArticulos += "<input  style='border-style:  outset; border-width: 3px;  border-color:mediumaquamarine;     border-radius: 8px;   background-color:mintcream;' class='form-control col-md-3 light-table-filter'  data-table='order-table' type='text'  placeholder='Search....'>";

    CodigoHtmlTablaArticulos += "<span  class='input-group-text' style='border-style:  outset; border-width: 3px; border-color:mediumaquamarine;   border-radius: 8px; '  id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaArticulos += "</div>";
    CodigoHtmlTablaArticulos += "<div class='table-responsive'>";
    CodigoHtmlTablaArticulos += "<table class='table-success table table-bordered order-table'>";
    CodigoHtmlTablaArticulos += "<thead>";
    CodigoHtmlTablaArticulos += "<tr>";
    CodigoHtmlTablaArticulos += "<th>Artículo</th>";
    CodigoHtmlTablaArticulos += "<th>Clasificación</th>";
    CodigoHtmlTablaArticulos += "<th>Área</th>";
    CodigoHtmlTablaArticulos += "<th></th>";
    CodigoHtmlTablaArticulos += "<th>Unidad de medición</th>";
    CodigoHtmlTablaArticulos += "<th>Fecha_Ingreso</th>";
    CodigoHtmlTablaArticulos += "</tr>";
    CodigoHtmlTablaArticulos += "</thead>";
    CodigoHtmlTablaArticulos += "<tbody>";


    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaArticulos += "<tr>";
        CodigoHtmlTablaArticulos += "<td>" + Data[i].NombreEmpresa + "</td>";
        CodigoHtmlTablaArticulos += "<td>" + Data[i].Categoria + "</td>";
        CodigoHtmlTablaArticulos += "<td colspan='2'>" + Data[i].Area + "</td>";
        CodigoHtmlTablaArticulos += "<td>" + Data[i].Unidad + "</td>";
        CodigoHtmlTablaArticulos += "<td>" + Data[i].FechaSistema + "</td>";
        CodigoHtmlTablaArticulos += "</tr>";
    }
    CodigoHtmlTablaArticulos += "</tbody>";
    CodigoHtmlTablaArticulos += "</table>";
    document.getElementById("tablaArticulos").innerHTML = CodigoHtmlTablaArticulos;
}



//-------------------------Generar la tabla de los checkbox de proveedores-------------------------

function MostrarProveedores() {
    $.get("/Articulo/ConsultaProveedores", function (InfoProveedor) {
        var CodigoHtmlProveedor = "";
        CodigoHtmlProveedor += "<div class='row'>";
        for (var i = 0; i < InfoProveedor.length; i++) {
            CodigoHtmlProveedor += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            CodigoHtmlProveedor += "<input type='checkbox' class='checkbox-proveedor' id='" + InfoProveedor[i].IdProveedores + "' ><span class='help-block text-muted small-font'>" + InfoProveedor[i].Nombre + "</span>";
            CodigoHtmlProveedor += "</div>";
        }
        CodigoHtmlProveedor += "</div>";
        document.getElementById("TblProveedores").innerHTML = CodigoHtmlProveedor;
    });
}

//---------------------------------------Termina-------------------------------------------------
//limpiar campos
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

function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}


//----------Consultas para obtener los datos de los combobox----------------
function LlenarCMCategoria() {
    $.get("/GLOBAL/BDCategorias", function (data) {
        llenarCombo(data, document.getElementById("cmbCategoria"));
    });
}

function LlenarCMCUnidad() {
    $.get("/GLOBAL/BDUnidadesMedida", function (data) {
        llenarCombo(data, document.getElementById("cmbUnidad"));
    });
}



function LlenarCMCArea() {
    $.get("/GLOBAL/BDAreas", function (data) {
        llenarCombo(data, document.getElementById("cmbArea"));
    });
}


function LlenarCMCMarca() {
    $.get("/GLOBAL/BDMarcas", function (data) {
        llenarCombo(data, document.getElementById("cmbMarca"));
    });
}


//----------funcion general para llenar los select---------------------------
function llenarCombo(data, control) {

    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}

