CrearAcordeonArticulos(); 
function CrearAcordeonArticulos() {
    $.get("/Articulo/ConsultaArticulos", function (Art) {
        var CodHTML = "";
        for (var i = 0; i < Art.length; i++) {
            CodHTML += "<button onclick='myFunction(dep" + Art[i].Id + ")' class='w3-btn w3-block w3-black w3-left-align'>" + Art[i].Nombre1 + "</button>";
            CodHTML += "<div id='dep" + Art[i].Id + "' class='w3-container w3-hide'>";
            CodHTML += "<h4>Nombre1 :" + Art[i].Nombre1 +"</h4>";
            CodHTML += "<h4>Nombre2:" + Art[i].Nombre2+"</h4>" ;
            CodHTML += "<h4>Estado Inicial:" + Art[i].EstadoInicial+"</h4>" ;
            CodHTML += "<h4>Stock:" + Art[i].Stock + "</h4>";
            CodHTML += "<h4>ExistenciaActual:" + Art[i].ExistenciaActual + "</h4>";
            CodHTML += "<h4>Carpeta:" + Art[i].UnidadDeMedida + "</h4>";
            CodHTML += "<h4>Tipo de Existencia:" + Art[i].TipoDeExistencia+ "</h4>";
            CodHTML += "<h4>Categoría:" + Art[i].Categorias + "</h4>";
            CodHTML += "<h4>Nombre del proveedor :" + Art[i].NombreProveedor + "</h4>";
            CodHTML += "<h4>Marca:" + Art[i].Marca + "</h4>";
            CodHTML += "<h4>Descripcion:" + Art[i].Descripcion + "</h4>";
            CodHTML += "<h4>Unidad SAT:" + Art[i].UnidadSAT + "</h4>";
            CodHTML += "<h4>ClaveProveedor:" + Art[i].ClaveProveedor + "</h4>";
            CodHTML += "<h4>Clave SAT :" + Art[i].ClaveSAT + "</h4>";
            CodHTML += "<h4>Precio unitario:" + Art[i].PrecioUnitario + "</h4>";
            CodHTML += "<h4>Importe :" + Art[i].Importe + "</h4>";
            CodHTML += "<h4>Imagen:" + Art[i].Imagen + "</h4>";
            CodHTML += "</div>";
        }
        document.getElementById("accordion").innerHTML = CodHTML;
    });
}






AcordeonArticulos();
//Crea el acordeón e inserta (los registros de la base de datos)
function AcordeonArticulos() {
    $.get("/Articulo/ConsultaArticulos", function (RegistrosArticulos) {
        //Accordeon(RegistrosArticulos, document.getElementById("accordion"));
        otro(RegistrosArticulos, document.getElementById("accordion"));
    });
}
function otro(RegistrosArticulos, CtrlProveedores) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < RegistrosArticulos.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + RegistrosArticulos[i].Id + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + RegistrosArticulos[i].Id + "' aria-expanded='false' aria-controls='collapse" + RegistrosArticulos[i].Id + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + RegistrosArticulos[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + RegistrosArticulos[i].Id + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + RegistrosArticulos[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + RegistrosArticulos[i].GiroDelProveedor + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Cuenta Interbancaria: </strong>" + RegistrosArticulos[i].CuentaInterbancaria + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Código Postal: </strong>" + RegistrosArticulos[i].CodigoPostal + "</div>";
        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + RegistrosArticulos[i].Direccion + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        //CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Dirección</strong></div >";
        //CodigoHTMLAreas += "</div>";
        //CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>RFC: </strong>" + RegistrosArticulos[i].RFC + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + RegistrosArticulos[i].Direccion + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + RegistrosArticulos[i].Telefono + "</div>";
        // CodigoHTMLAreas += "</div>";
        // CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Banco: </strong>" + RegistrosArticulos[i].Banco + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + RegistrosArticulos[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Número de Cuenta: </strong>" + RegistrosArticulos[i].NumeroDeCuenta + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + RegistrosArticulos[i].UsoCFDI + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nomenclatura: </strong>" + RegistrosArticulos[i].Nomenclatura + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Descripción: </strong>" + RegistrosArticulos[i].Descripcion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Logo: </strong>" + RegistrosArticulos[i].Logo + "</div>";
        CodigoHTMLAreas += "</div>";

        //CodigoHTMLAreas += "<button class='btn btn-info' onclick='MostrarOcultar(" + RegistrosArticulos[i].ID + ")'><i id='BtnMO" + RegistrosArticulos[i].Id + "' class='fas fa-chevron-circle-down'></i></button></div>";
        CodigoHTMLAreas += "</div>";

        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='AbrirModalTienda(" + RegistrosArticulos[i].Id + ")' data-toggle='modal' data-target='#ModalTiendas'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarTienda(" + RegistrosArticulos[i].Id + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlProveedores.innerHTML = CodigoHTMLAreas;
}
