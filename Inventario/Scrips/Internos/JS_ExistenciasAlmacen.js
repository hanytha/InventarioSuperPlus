LlenarCMBPrin();
BloquearCTRL();
LlenarCMBCompra();
CrearExistenciasAlmacen();
function CrearExistenciasAlmacen() {
    $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacenes", function (Data) {
        CrearTablaExistenciasAlmacen(Data);
    }
    );
}
function CrearTablaExistenciasAlmacen(Data) {
    var CodigoHtmlExistenciasAlmacen = "";
    CodigoHtmlExistenciasAlmacen += "<div class='input-group mb-3 float-right '>";
    CodigoHtmlExistenciasAlmacen += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>"
    CodigoHtmlExistenciasAlmacen += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlExistenciasAlmacen += "</div>";
    CodigoHtmlExistenciasAlmacen += "<div class='table-responsive'>";
    CodigoHtmlExistenciasAlmacen += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlExistenciasAlmacen += "<thead>";
    CodigoHtmlExistenciasAlmacen += "<tr>";
    CodigoHtmlExistenciasAlmacen += "<th>Número de pedido</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Fecha</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Operación</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Artículo</th>";
    CodigoHtmlExistenciasAlmacen += "<th>Opciones</th>";
    CodigoHtmlExistenciasAlmacen += "</tr>";
    CodigoHtmlExistenciasAlmacen += "</thead>";
    CodigoHtmlExistenciasAlmacen += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlExistenciasAlmacen += "<tr>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].NoPedido + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].FechaDeIngreso + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].TipoDeOperacion + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>" + Data[i].NombreEmpresa + "</td>";
        CodigoHtmlExistenciasAlmacen += "<td>";
        CodigoHtmlExistenciasAlmacen += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdExistenciaAlmacenG + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        //CodigoHtmlExistenciasAlmacen += "<button class='btn btn-danger' onclick='EliminarExistenciasG(" + Data[i].IdArticulos + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHtmlExistenciasAlmacen += "</td>";
        CodigoHtmlExistenciasAlmacen += "</tr>";
    }
    CodigoHtmlExistenciasAlmacen += "</tbody>";
    CodigoHtmlExistenciasAlmacen += "</table>";
    document.getElementById("TablaExistencia").innerHTML = CodigoHtmlExistenciasAlmacen;
}
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
        sessionStorage.setItem('IdExistenciaAlmacenG', '0');
    }
    else {
        $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacen/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdExistenciaAlmacenG', Data[0].IdExistenciaAlmacenG);
            document.getElementById("TxtNumCompra").value = Data[0].NoPedido;
            document.getElementById("cmbProveedor").value = Data[0].IdProveedor;
            $.get("/GLOBAL/BDArtEx/?IDP=" + Data[0].IdProveedor, function (Proveedor) {
                llenarCombo(Proveedor, document.getElementById("cmbArticulo"));
                document.getElementById("cmbArticulo").value = Data[0].IdArticulo;
            });
            //document.getElementById("TxtExistenciaInicial").value = Data[0].ExitenciaInicial;
            document.getElementById("TxtExistenciaActual").value = Data[0].ExitenciaActual;
            document.getElementById("TxtFechaSistema").value = Data[0].FechaDeIngreso;
            document.getElementById("TxtTipoOperacion").value = Data[0].TipoDeOperacion;
            //document.getElementById("cmbCompra").value = Data[0].IdCompra;
            document.getElementById("TxtFechaSistema").value = Data[0].FechaDeIngreso;
            //document.getElementById("TxtCosto").value = Data[0].Coste;
            document.getElementById("cmbAsignacion").value = Data[0].IdAsignacion;
            Sitio(Data[0].IdAsignacion, Data[0].IdSitio);
        });
    }
}
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
//Guarda los cambios y altas de las áreas
function GuardarAlmacen() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdExistenciaAlmacenG = sessionStorage.getItem('IdExistenciaAlmacenG');
            //var NoPedido = document.getElementById("TxtNumCompra").value;

            var IdArticulo = document.getElementById("cmbArticulo").value;
            var TempArticulo = document.getElementById("cmbArticulo");
            var NombreEmpresa = TempArticulo.options[TempArticulo.selectedIndex].text;
            //var ExitenciaInicial = document.getElementById("TxtExistenciaInicial").value;
            //var ExitenciaActual = document.getElementById("TxtExistenciaActual").value;
            var TipoDeOperacion = document.getElementById("TxtTipoOperacion").value;
            //var IdCompra = document.getElementById("cmbCompra").value;
            //var FechaDeIngreso = document.getElementById("TxtFechaSistema").value;
            //var Coste = document.getElementById("TxtCosto").value;
            var IdAsignacion = document.getElementById("cmbAsignacion").value;
            //var IdProveedor = document.getElementById("cmbProveedor").value;
            //var TempProveedor = document.getElementById("cmbProveedor");
            //var Proveedor = TempProveedor.options[TempProveedor.selectedIndex].text;
            var IdSitio = document.getElementById("cmbSitio").value;
            var frm = new FormData();
            frm.append("IdExistenciaAlmacenG", IdExistenciaAlmacenG);
            //frm.append("NoPedido", NoPedido);
            //frm.append("ExitenciaInicial", ExitenciaInicial);
            //frm.append("ExitenciaActual", ExitenciaActual);
            //frm.append("FechaDeIngreso", FechaDeIngreso);
            frm.append("TipoDeOperacion", TipoDeOperacion);
            //frm.append("IdCompra", IdCompra);
            //frm.append("Coste", Coste);
            frm.append("IdAsignacion", IdAsignacion);
            //frm.append("IdProveedor", IdProveedor);
            //frm.append("Proveedor", Proveedor);
            frm.append("IdSitio", IdSitio);
            frm.append("IdArticulo", IdArticulo);
            frm.append("NombreEmpresa", NombreEmpresa);
            //frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/ExistenciaAlmacen/GuardarAlmacen",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        Swal.fire(
                            '',
                            'Ocurrió un error',
                            'danger'
                        )
                    }
                    else if (data == -1) {
                        Swal.fire(
                            '',
                            'Ya existe el proveedor',
                            'warning'
                        )
                    }
                    else {
                        Swal.fire(
                            '¡GUARDADO!',
                            'Se guardó correctamente.',
                            'success'
                        )
                        GuardarDatosArticuloCompra(data);
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}


function GuardarDatosArticuloCompra(IdCompra) {

    if (CamposObligatorios() == true) {


        //----------Guardar los inputs de manera individual en la Base de datos--------------------
        var cantidad = document.getElementsByClassName("input-cantidad");

        var NomArticulos = document.getElementsByClassName("input-Articulo");

        var UnidadM = document.getElementsByClassName("input-Unidad");

        //var Precio = document.getElementsByClassName("input-Precio");

        //var impuestos = document.getElementsByClassName("input-impuesto");

        for (let i = 0; i < cantidad.length; i++) {
            if (cantidad[i].value >= 1 && NomArticulos[i].value && UnidadM[i].value) {


                var IdCompraInterno = sessionStorage.getItem('IDExt');
                //var NoCompra = document.getElementById("TxtNoCompra").value;

                //------------------------Guarda el nombre del artículo solicitado----------------------------------
                var Articulo = NomArticulos[i].value;
                //------------------------Guarda la cantidad de artículos solicitados----------------------------------
                var StockActual = cantidad[i].value;
                //------------------------Guarda la unidad media de los artículos solicitados----------------------------------
                var Unidad = UnidadM[i].value;
                //-------------------------------------------------------------------------------------------------------------
                var frm = new FormData();
                frm.append("IdCompraInterno", IdCompraInterno);
                //frm.append("IdCompra", IdCompra);
                frm.append("StockActual", StockActual);
                frm.append("Articulo", Articulo);
                frm.append("Unidad", Unidad);
                ////frm.append("NoCompra", NoCompra);
                //frm.append("Impuesto", Impuesto);
                //frm.append("PrecioUnitario", PrecioUnitario);
                frm.append("Estatus", 1);
                $.ajax({
                    type: "POST",
                    url: "/ExistenciaAlmacen/GuardarDatosArticuloCompra",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            '¡GUARDADO!',
                                'Se guardó correctamente.',
                                'success'
                        }
                        else if (data == -1) {
                            swal("¡El pedido ya exixste!", "", "warning");
                        }
                        else {
                            CrearExistenciasAlmacen();
                            document.getElementById("btnCancelar").click();
                        }
                    }
                });

            }
        }
        //-----Mensaje de confirmación-----------------------
        //  swal("Su compra se guardo correctamente!", "", "success");
        alert("los datos se guardaron correctamente");
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
////"Elimina" la Existencia cambia el Estatus
//function EliminarExistenciasG(id) {
//    if (confirm("¿Desea eliminar el registro?") == 1) {

//        $.get("/ExistenciaAlmacen/EliminarAlmacen/?Id=" + id, function (DatoExistecia) {
//            if (DatoExistecia == 1) {
//                alert("Se elimino correctamente");
//                CrearExistenciasAlmacen();
//            } else {
//                alert("Ocurrio un error");
//            }
//        });
//    }
//}
function LlenarCMBCompra() {
    //$.get("/GLOBAL/BDCompras", function (data) {
    //    llenarCombo(data, document.getElementById("cmbCompra"));
    //});
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
var Asigna = document.getElementById("cmbAsignacion");
Asigna.addEventListener("change", function () {
    Sitio(Asigna.value, 0);
});
//(SITIO)Opciones según la selección
function Sitio(IDAsignacion, IDSitio) {
    //Mostrar la opcion oficina al seleccionar la opcion 3(Oficina)
    if (IDAsignacion == 1) {
        $.get("/GLOBAL/Areas", function (DatosDepartamento) {
            if (DatosDepartamento.length !== 0) {
                llenarCombo(DatosDepartamento, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Supervision.");
            }
        });
    }
    //Mostrar todas las tiendas registradas al seleccionar la opcion 1(Tienda)
    else if (IDAsignacion == 2) {
        $.get("/GLOBAL/BDTiendaSuper", function (DatosTiendas) {
            if (DatosTiendas.length !== 0) {
                llenarCombo(DatosTiendas, document.getElementById("cmbSitio"));
                document.getElementById("cmbSitio").value = IDSitio;
            }
            else {
                alert("No hay datos en la tabla Tiendas.");
            }
        });
    }
}
function LlenarCMBPrin() {
    $.get("/GLOBAL/BDCompras", function (data) {
        llenarCombo(data, document.getElementById("cmbCompra"));
    });
    //$.get("/GLOBAL/BDProveedorExist", function (data) {
    //    llenarCombo(data, document.getElementById("cmbProveedor"), true);
    //});
    $.get("/GLOBAL/BDProveedor", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"));
    });
    $.get("/GLOBAL/BDProveedorExist", function (data) {
        llenarCombo(data, document.getElementById("cmbProveedor"), true);
    });
}
var IDP = document.getElementById("cmbProveedor");
IDP.addEventListener("change", function () {
    $.get("/GLOBAL/BDArtEx/?IDP=" + IDP.value, function (data) {
        llenarCombo(data, document.getElementById("cmbArticulo"));
    });
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



function MostrarArticulos(id) {
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        sessionStorage.setItem('IdPedidosExternos', '0');
    }
    else {

        $.get("/Supervision/ConsultaIdPro/?IdPro=" + id, function (Data) {
            SiguientePedidoProveedor(id);
            //-----------------------------------------------------------------------------------
            var TablaArticulo = "";
            TablaArticulo += "<div class='row row-cols-auto'>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Artículos</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>UnidadMedida</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "<label>Cantidad</label>";
            TablaArticulo += "</div>";
            TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
            TablaArticulo += "</div>";

            for (var i = 0; i < Data.length; i++) {
                //-------Crea los input con los nombres de los artículos por proveedor--------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-Articulo sinborde limpiar ' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].NombreEmpresa + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                TablaArticulo += "<div class='col-md-3 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<input  class='input-Unidad sinborde limpiar redondeado' disabled  id='" + Data[i].IdArticulos + "'  value='" + Data[i].Unidad + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</div>";
                //-------Crea la lista de las unidades de medida por artículo-----------------------------------------------
                //TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<input  class='input-impuesto sinborde limpiar redondeado' disabled  style='width:45px;'  id='" + Data[i].IdArticulos + "'  value='" + Data[i].Impuesto + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                TablaArticulo += "<label>"
                TablaArticulo += "<input type='number' value='' class='input-cantidad redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                TablaArticulo += "</label>"
                TablaArticulo += "</div>";
                //-------Crea los input para la cantidad solicitada------------------------------------------------------------
                TablaArticulo += "<div class='col-md-2 col-sm-12 col-xs-12 justify-content-end'>";
                //TablaArticulo += "<label>"
                //TablaArticulo += "<input type='number' value='' class='input-Precio redondeado limpiar' id='" + Data[i].IdArticulos + "' ><span class='help-block text-muted small-font'></span>";
                //TablaArticulo += "</label>"
                TablaArticulo += "</div>";

            }
            TablaArticulo += "</div>";
            TablaArticulo += "</div>";
            document.getElementById("TblArticulos").innerHTML = TablaArticulo;
        });
    }
}

function SiguientePedidoProveedor(id) {
    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/Supervision/ConsultaNumPedidoProveedor/?ID=" + id, function (Data) {


            let numPedidoProve = Data.numPedidoProve;
            let ArraynumPedidoProve = numPedidoProve.split(',');


            var ultimo = ArraynumPedidoProve[ArraynumPedidoProve.length - 1]
            document.getElementById("TxtNumPedidoProveedor").value = ultimo;

        });
    }
}


function ConsultaSiguienteCompraPrveedor(id) {
    if (id == 0) {
        sessionStorage.setItem('IDArt', '0');
    }
    else {

        $.get("/ExistenciaAlmacen/ConsultaNumPedidoProveedor/?ID=" + id, function (Data) {


            let numPedidoProve = Data.numPedidoProve;
            let ArraynumPedidoProve = numPedidoProve.split(',');


            var ultimo = ArraynumPedidoProve[ArraynumPedidoProve.length - 1]
            document.getElementById("TxtNoCompraPro").value = ultimo;

        });
    }
}
