//ConsultaArticulos();
BloquearCTRL();
LlenarCMCategoria();
LlenarCMCUnidad();
//LlenarCMCArea();
LlenarCMCMarca();
LlenarCMCImpuesto();


//--------------------Limpia la información y carga la informacion de Artículos---------------------
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    MostrarProveedores();
    consultaFecha();
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre

        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Articulo/ConsultaArticulo/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDArt', Data[0].IdArticulos);
            document.getElementById("TxtNombreEmpresa").value = Data[0].NombreEmpresa;
            document.getElementById("TxtNombreProveedor").value = Data[0].NombreProveedor;

            //------------------------muestra los checkbox guardados -----------------------------------
            var activar = Data[0].Proveedor.split('#');
            var ChevProveedor = document.getElementsByClassName("checkbox-proveedor");
            for (let j = 0; j < activar.length; j++) {
                for (let i = 0; i < ChevProveedor.length; i++) {
                    if (ChevProveedor[i].id == activar[j]) {
                        ChevProveedor[i].checked = true;
                        break;
                    }
                }
            }
            //--------------------------------------------------------------------------------------
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;
            document.getElementById("cmbCategoria").value = Data[0].IdCategorias;
            document.getElementById("cmbUnidad").value = Data[0].IdUnidadDeMedida;
            document.getElementById("TxtUnidadSAT").value = Data[0].UnidadSAT;
            document.getElementById("TxtClaveSAT").value = Data[0].ClaveSAT;
            document.getElementById("TxtFecha").value = Data[0].Fecha;
            document.getElementById("TxtFechaIngreso").value = Data[0].FechaSistema;
            document.getElementById("cmbArea").value = Data[0].IdAreas;
            document.getElementById("cmbMarca").value = Data[0].IdMarca;
            document.getElementById("cmbImpuesto").value = Data[0].IdImpuesto;
            document.getElementById("TxtClaveCoversion").value = Data[0].Conversion;

        });
    }
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


//-------------Guarda los cambios y altas de los proveedores---------------------------------------
function GuardarArticulo() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdArticulos = sessionStorage.getItem('IDArt');
            var NombreEmpresa = document.getElementById("TxtNombreEmpresa").value;
            var NombreProveedor = document.getElementById("TxtNombreProveedor").value;

            //--------------------Guarda los checkebox seleccionados-----------------------------------------
            var ChevProveedor = document.getElementsByClassName("checkbox-proveedor");
            let seleccionados = "";
            for (let i = 0; i < ChevProveedor.length; i++) {
                if (ChevProveedor[i].checked == true) {
                    seleccionados += ChevProveedor[i].id;
                    seleccionados += "#";
                }
            }
            var Proveedor = seleccionados.substring(0, seleccionados.length - 1);
            //----------------------------------------------------------------------------------------
            var Descripcion = document.getElementById("TxtDescripcion").value;

            var IdCategorias = document.getElementById("cmbCategoria").value;
            var TempCategoria = document.getElementById("cmbCategoria");
            var Categoria = TempCategoria.options[TempCategoria.selectedIndex].text;
            var IdUnidadDeMedida = document.getElementById("cmbUnidad").value;
            var TempMedida = document.getElementById("cmbUnidad");
            var Unidad = TempMedida.options[TempMedida.selectedIndex].text;

            var UnidadSAT = document.getElementById("TxtUnidadSAT").value;
            var ClaveSAT = document.getElementById("TxtClaveSAT").value;
            var Fecha = document.getElementById("TxtFecha").value;
            var FechaSistema = document.getElementById("TxtFechaIngreso").value;
            var Conversion = document.getElementById("TxtClaveCoversion").value;

            var IdAreas = document.getElementById("cmbArea").value;
            var TempArea = document.getElementById("cmbArea");
            var Area = TempArea.options[TempArea.selectedIndex].text;
            var IdMarca = document.getElementById("cmbMarca").value;
            var TempMarca = document.getElementById("cmbMarca");
            var Marca = TempMarca.options[TempMarca.selectedIndex].text;

            var IdImpuesto = document.getElementById("cmbImpuesto").value;
            var TempImpues = document.getElementById("cmbImpuesto");
            var Impuesto = TempImpues.options[TempImpues.selectedIndex].text;

            var frm = new FormData();
            frm.append("IdArticulos", IdArticulos);
            frm.append("NombreEmpresa", NombreEmpresa);

            frm.append("Proveedor", Proveedor);
            frm.append("NombreProveedor", NombreProveedor);
            frm.append("Descripcion", Descripcion);
            frm.append("IdCategorias", IdCategorias);
            frm.append("Categoria", Categoria);
            frm.append("IdUnidadDeMedida", IdUnidadDeMedida);
            frm.append("Unidad", Unidad);
            frm.append("UnidadSAT", UnidadSAT);
            frm.append("ClaveSAT", ClaveSAT);
            frm.append("Fecha", Fecha);
            frm.append("FechaSistema", FechaSistema);
            frm.append("Conversion", Conversion);
            frm.append("IdAreas", IdAreas);
            frm.append("Area", Area);
            frm.append("IdMarca", IdMarca);
            frm.append("Marca", Marca);
            frm.append("IdImpuesto", IdImpuesto);
            frm.append("Impuesto", Impuesto);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Articulo/GuardarArticulo",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡El artículo ya existe!", "", "warning");
                    }
                    else {
                        //-----Mensaje de confirmación-----------------------
                        swal("El artículo se registró exitosamente!", "", "success");
                        consultaFecha();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
    actulizar();
}

//--------------------------------------------------------------------------------

function actulizar() {
    window.location.reload();
}
//---------------marca los campos obligatorios------------------------
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
//-----------cambia el Estatus de 1 a 0------------------
function EliminarArticulo(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Articulo/EliminarArticulo/?Id=" + id, function (DatoArt) {
            if (DatoArt == 1) {
                swal("El artículo se eliminó exitosamente!", "", "success");
                consultaFecha();
            } else {
                swal("¡Ocurrio un error!", "", "danger");
            }
        });
    }
    actulizar();
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

function LlenarCMCImpuesto() {
    $.get("/GLOBAL/BDImpuesto", function (data) {
        llenarCombo(data, document.getElementById("cmbImpuesto"));
    });
}



function LlenarCMCArea() {
    $.get("/GLOBAL/Areas", function (data) {
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

//------------------------Consulta fecha------------------------------------------
function consultaFecha() {
    var f = new Date();
    fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    document.getElementById('TxtFechaIngreso').value = fecha;
}