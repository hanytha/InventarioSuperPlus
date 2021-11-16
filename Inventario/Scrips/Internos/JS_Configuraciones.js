

CrearAcordeonProveedores();
function CrearAcordeonProveedores() {
    $.get("/Configuracion/ConsultaConfiguraciones", function (IncidenciasArea) {
        AcordeonProveedores(IncidenciasArea, document.getElementById("AcordeonConfiguracion"));
    });
}

//Crea la información basica de las insidencias
function AcordeonProveedores(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].IdConfiguracion + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].IdConfiguracion + ");' data-toggle='collapse' data-target='#collapse" + data[i].IdConfiguracion + "' aria-expanded='false' aria-controls='collapse" + data[i].IdConfiguracion + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + data[i].NombreEmpresa + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].IdConfiguracion + "' class='collapse' aria-labelledby='headingOne' data-parent='#AcordeonConfiguracion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>RFC: </strong>" + data[i].RFC + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Vision: </strong>" + data[i].Vision + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Mision: </strong>" + data[i].Mision + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Valores: </strong>" + data[i].Valores + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Direccion: </strong>" + data[i].Direccion + "</div>";


        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Tipo: </strong>" + data[i].Tipo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Dato2: </strong>" + data[i].Dato2 + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'></div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + data[i].Telefono + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + data[i].DireccionHost + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Mision: </strong>" + data[i].Puerto + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Logo: </strong>" + data[i].Logo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>LogoTexto: </strong>" + data[i].LogoTexto + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Dato3: </strong>" + data[i].Dato3 + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Dato4: </strong>" + data[i].Dato4 + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>SesionAbierta: </strong>" + data[i].SesionAbierta + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>SerCorreo: </strong>" + data[i].SerCorreo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>SerCorreoPort: </strong>" + data[i].SerCorreoPort + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>SerCorreoUser: </strong>" + data[i].SerCorreoUser + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>SerCorreoPass: </strong>" + data[i].SerCorreoPass + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>DirWeb: </strong>" + data[i].DirWeb + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<button class='btn btn-primary' onclick='abrirModal(" + data[i].IdConfiguracion + "," + data[i].IdConfiguracion + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarConfiguracion(" + data[i].IdConfiguracion + "," + data[i].IdConfiguracion + ",this)'><i class='fas fa-eraser'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}


