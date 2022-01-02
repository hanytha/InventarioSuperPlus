
CrearAcordeonProveedores();
function CrearAcordeonProveedores() {
    $.get("/Proveedores/ConsultaSupervisores", function (data) {
        AcordeonProveedores(data, document.getElementById("accordion"));
    });
}
//Crea la información basica de las insidencias
function AcordeonProveedores(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].IdProveedores + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].IdProveedores + ");' data-toggle='collapse' data-target='#collapse" + data[i].IdProveedores + "' aria-expanded='false' aria-controls='collapse" + data[i].IdProveedores + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        //CodHtml += "<i class='m-r-5 fas fa-clipboard-list' style='font - size: 100px; color: red;' aria-hidden='true'></i>";

        CodHtml += "<span >" + data[i].Nombre + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].IdProveedores + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Banco: </strong>" + data[i].Banco + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + data[i].Telefono + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>ClaveInterbancaria: </strong>" + data[i].ClaveInterbancaria + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Correo: </strong>" + data[i].Correo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>NumeroDeCuenta: </strong>" + data[i].NumeroDeCuenta + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'></div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Estado: </strong>" + data[i].Estado + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + data[i].UsoCFDI + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + data[i].Municipio + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>RFC: </strong>" + data[i].RFC + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + data[i].Localidad + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>RazonSocial: </strong>" + data[i].RazonSocial + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Direccion: </strong>" + data[i].Direccion + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Descripcion: </strong>" + data[i].Descripcion + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>CodigoPostal: </strong>" + data[i].CodigoPostal + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}
