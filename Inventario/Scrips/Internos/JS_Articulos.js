
CrearAcordeonArticulos();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonArticulos() {
    $.get("/Articulo/ConsultaArticulos", function (DatosArticulo) {
        //Accordeon(DatosArticulo, document.getElementById("accordion"));
        AcordeonArticulos(DatosArticulo, document.getElementById("accordion"));
    });
}
function AcordeonArticulos(DatosArticulo, CtrlArticulos) {
    var CodigoHTMLArticulos = "";
    for (var i = 0; i < DatosArticulo.length; i++) {
        if (i < 1) {
            CodigoHTMLArticulos += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLArticulos += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLArticulos += "<div class='card-header' id='heading" + DatosArticulo[i].Id + "'>";
        CodigoHTMLArticulos += "<h5 class='mb-0'>";
        CodigoHTMLArticulos += "<a  data-toggle='collapse' data-target='#collapse" + DatosArticulo[i].Id + "' aria-expanded='false' aria-controls='collapse" + DatosArticulo[i].Id + "' class='collapsed'>";
        //CodigoHTMLArticulos += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLArticulos += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLArticulos += "<span >" + DatosArticulo[i].Nombre1 + "</span>";
        CodigoHTMLArticulos += "</a>";
        CodigoHTMLArticulos += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLArticulos += "<div id='collapse" + DatosArticulo[i].Id + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLArticulos += "<div class='card-body'>";
        CodigoHTMLArticulos += "<div class='row'>";
        CodigoHTMLArticulos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre2: </strong>" + DatosArticulo[i].Nombre2 + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + DatosArticulo[i].EstadoInicial + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Stock: </strong>" + DatosArticulo[i].Stock + "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "<div class='row'>";
        CodigoHTMLArticulos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Cuenta Interbancaria: </strong>" + DatosArticulo[i].ExistenciaActual + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Código Postal: </strong>" + DatosArticulo[i].UnidadDeMedida + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Categorias: </strong>" + DatosArticulo[i].Categorias + "</div>";
        //  CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosArticulo[i].Marca + "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "<div class='row'>";
        //CodigoHTMLArticulos += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Dirección</strong></div >";
        //CodigoHTMLArticulos += "</div>";
        //CodigoHTMLArticulos += "<div class='row'>";
        CodigoHTMLArticulos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>NombreProveedor: </strong>" + DatosArticulo[i].NombreProveedor + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosArticulo[i].Marca + "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "<div class='row'>";

        // CodigoHTMLArticulos += "</div>";
        // CodigoHTMLArticulos += "<div class='row'>";

        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "<div class='row'>";
        CodigoHTMLArticulos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosArticulo[i].Descripcion + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Unidad SAT: </strong>" + DatosArticulo[i].UnidadSAT + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Clave SAT: </strong>" + DatosArticulo[i].ClaveSAT + "</div>";

        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "<div class='row'>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>PrecioUnitario: </strong>" + DatosArticulo[i].PrecioUnitario + "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "<div class='row'>";
        CodigoHTMLArticulos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Descripción: </strong>" + DatosArticulo[i].Importe + "</div>";
        CodigoHTMLArticulos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Imagen: </strong>" + DatosArticulo[i].Imagen + "</div>";
        CodigoHTMLArticulos += "</div>";
        //CodigoHTMLArticulos += "<button class='btn btn-info' onclick='MostrarOcultar(" + DatosArticulo[i].ID + ")'><i id='BtnMO" + DatosArticulo[i].Id + "' class='fas fa-chevron-circle-down'></i></button></div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLArticulos += "<button class='btn btn-success' onclick='AbrirMArticulos(" + DatosArticulo[i].Id + ")' data-toggle='modal' data-target='#Articulos'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLArticulos += "<button class='btn btn-danger' onclick='EliminarArticulos(" + DatosArticulo[i].Id + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "</div>";
        CodigoHTMLArticulos += "</div>";
    }
    CtrlArticulos.innerHTML = CodigoHTMLArticulos;
}

//Limpia la información y carga la informacion del proveedor
function AbrirMArticulos(id) {//la clase ArticuloObligatorio
    var controlesObligatorio = document.getElementsByClassName("ArticuloObligatorio");
    for (var i = 0; i < controlesObligatorio.length; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("border-danger");//Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        Limpiar();
    }
    else {
        $.get("/Articulos/ConsultaArticulos/?Id=" + Id, function (DatosArticulo) {
            document.getElementById("TxtId").value = DatosArticulo[0].Id;
            document.getElementById("TxtNombre1").value = DatosArticulo[0].Nombre1;
            document.getElementById("TxtNombre2").value = DatosArticulo[0].Nombre2;
            document.getElementById("TxtEstadoInicial").value = DatosArticulo[0].EstadoInicial;
            document.getElementById("TxtExistenciaActual").value = DatosArticulo[0].ExistenciaActual;
            document.getElementById("TxtUnidadDeMedida").value = DatosArticulo[0].UnidadDeMedida;
            document.getElementById("cmbCategorias").value = DatosArticulo[0].Categorias;
            document.getElementById("TxtNombreProveedor").value = DatosArticulo[0].NombreProveedor;
            document.getElementById("TxtMarca").value = DatosArticulo[0].Marca;
            document.getElementById("TxtDescripcion").value = DatosArticulo[0].Descripcion;
            document.getElementById("TxtUnidadSAT").value = DatosArticulo[0].UnidadSAT;
            document.getElementById("TxtClaveProveedor").value = DatosArticulo[0].ClaveProveedor;
            document.getElementById("TxtClaveSAT").value = DatosArticulo[0].ClaveSAT;
            document.getElementById("TxtUsoCFDI").value = DatosArticulo[0].UsoCFDI;
            document.getElementById("TxtPrecioUnitario").value = DatosArticulo[0].PrecioUnitario;
            document.getElementById("TxtImporte").value = DatosArticulo[0].Importe;
            document.getElementById("TxtImagen").value = DatosArticulo[0].Imagen;
        });
    }


}

//Guarda los cambios y altas de las áreas
function GuardarProveedor() {
    if (Obligatorios("Proveedor") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var Id = document.getElementById("TxtId").value;
            var Nombre1 = document.getElementById("TxtNombre1").value;
            var Nombre2 = document.getElementById("TxtNombre2").value;
            var EstadoInicial = document.getElementById("TxtEstadoInicial").value;
            var ExistenciaActual = document.getElementById("TxtExistenciaActual").value;
            var UnidadDeMedida = document.getElementById("TxtUnidadDeMedida").value;
            var Categorias = document.getElementById("TxtCategorias").value;
            var Stock = document.getElementById("TxtStock").value;
            var Importe = document.getElementById("TxtImporte").value;
            var NombreProveedor = document.getElementById("NombreProveedor").value;
            var Marca = document.getElementById("TxtMarca").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;

            ///var temUser = document.getElementById("cmbEncargado");
            //var UNombre1 = temUser.options[temUser.selectedIndex].text;

            var ClaveProveedor = document.getElementById("TxtClaveProveedor").value;
            var ClaveSAT = document.getElementById("TxtClaveSAT").value;
            var UsoCFDI = document.getElementById("TxtUsoCFDI").value;
            var PrecioUnitario = document.getElementById("TxtPrecioUnitario").value;
            var Importe = document.getElementById("TxtImporte").value;
            var Imagen = document.getElementById("TxtImagen").value;
            var frm = new FormData();
            frm.append("Id", Id);
            frm.append("Nombre1", Nombre1);
            frm.append("Nombre2", Nombre2);
            frm.append("EstadoInicial", EstadoInicial);
            frm.append("ExistenciaActual", ExistenciaActual);
            frm.append("UnidadDeMedida", UnidadDeMedida);
            frm.append("Categorias", EstadoInicial);
            frm.append("Stock", Stock);
            frm.append("categorias", Categorias);
            frm.append("NombreProveedor", NombreProveedor);
            frm.append("Marca", Marca);
            frm.append("Descripcion", Descripcion);
            frm.append("ClaveProveedor", ClaveProveedor);
            frm.append("ClaveSAT", ClaveSAT);
            frm.append("UsoCFDI", UsoCFDI);
            frm.append("PrecioUnitario", PrecioUnitario);
            frm.append("Importe", Importe);
            frm.append("Imagen", Imagen);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Articulos/GuardarArticulo",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el Articulo");
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
//"Elimina" el área cambia el Estatus
//"Elimina" el área cambia el Estatus
function EliminarArticulos(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Articulo/EliminarArticulo/?Id=" + id, function (DatoArticulo) {
            if (DatoArticulo == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonArticulos();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


