LlenarCMBPUnidad();
LlenarCMCompra();
CrearAcordeonBonificaciones();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonBonificaciones() {
    $.get("/Bonificaciones/ConsultaBonificaciones", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonBonificaciones(Data, document.getElementById("accordion"));
    });
}
function AcordeonBonificaciones(Data, CtrlBonis) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdBonificaciones + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdBonificaciones + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdBonificaciones + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].NombreArticulo + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdBonificaciones + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Unidad de medida: </strong>" + Data[i].UnidadDeMedida + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Tipo de bonificación: </strong>" + Data[i].TipoBonificacion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Cantidad: </strong>" + Data[i].Cantidad + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre de el proveedor: </strong>" + Data[i].NombreProveedor + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Marca: </strong>" + Data[i].MarcaArticulo + "</div>";
        CodigoHTMLAreas += "</div>";

        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdBonificaciones + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarBonificacion(" + Data[i].IdBonificaciones + ",this)' ><i class='far fa-trash-alt'></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlBonis.innerHTML = CodigoHTMLAreas;
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
        sessionStorage.setItem('IDBonificacion', '0');

    }
    else {

        $.get("/Bonificaciones/ConsultaBonificacion/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDBonificacion', Data[0].IdBonificaciones);
            document.getElementById("TxtNombre").value = Data[0].NombreArticulo;
            document.getElementById("TxtCantidad").value = Data[0].Cantidad;
            document.getElementById("cmbUnidadM").value = Data[0].IdUnidadDeMedida;
            document.getElementById("cmbCompra").value = Data[0].IdCompra;
            document.getElementById("TxtNombreP").value = Data[0].NombreProveedor;
            document.getElementById("TxtMarca").value = Data[0].MarcaArticulo;

        });
    }
}




//Guarda los cambios y altas de las áreas
function GuardarBonificacion() {
    if (CamposObligatorios("obligatorio") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdBonificaciones = sessionStorage.getItem('IDBonificacion');
            var NombreArticulo = document.getElementById("TxtNombre").value;
            var Cantidad = document.getElementById("TxtCantidad").value;
            var IdUnidadDeMedida = document.getElementById("cmbUnidadM").value;
            var TempEdo = document.getElementById("cmbUnidadM");
            var UnidadDeMedida = TempEdo.options[TempEdo.selectedIndex].text;

            var IdCompra = document.getElementById("cmbCompra").value;
            var TempMuni = document.getElementById("cmbCompra");
            var Compra = TempMuni.options[TempMuni.selectedIndex].text;

            var NombreProveedor = document.getElementById("TxtNombreP").value;
            var MarcaArticulo = document.getElementById("TxtMarca").value;


            var frm = new FormData();
            frm.append("IdBonificaciones", IdBonificaciones);
            frm.append("NombreArticulo", NombreArticulo);
            frm.append("Cantidad", Cantidad);
            frm.append("IdUnidadDeMedida", IdUnidadDeMedida);
            frm.append("UnidadDeMedida", UnidadDeMedida);
            frm.append("IdCompra", IdCompra);
            frm.append("Compra", Compra);
            frm.append("NombreProveedor", NombreProveedor);
            frm.append("MarcaArticulo", MarcaArticulo);

            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Bonificaciones/GuardarBonificacion",
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
                        CrearAcordeonBonificaciones();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
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
function EliminarBonificacion(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Bonificaciones/EliminarBonificacion/?Id=" + id, function (DatoBonificacion) {
            if (DatoBonificacion == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonBonificaciones();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


function LlenarCMBPUnidad() {
    $.get("/GLOBAL/BDUnidadesMedida", function (data) {
        llenarCombo(data, document.getElementById("cmbUnidadM"));
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

    }


function LlenarCMCompra() {
    $.get("/GLOBAL/BDCompra", function (data) {
        llenarCombo(data, document.getElementById("cmbCompra"));
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

}

