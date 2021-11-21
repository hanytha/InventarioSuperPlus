

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
        CodHtml += "<button class='btn btn-primary' onclick='abrirModalConf(" + data[i].IdConfiguracion + "," + data[i].IdConfiguracion + ")' data-toggle='modal' data-target='#Configuracion'><i class='fas fa-edit'></i></button> ";

        CodHtml += "<button class='btn btn-danger' onclick='EliminarConfiguracion(" + data[i].IdConfiguracion + "," + data[i].IdConfiguracion + ",this)'><i class='fas fa-eraser'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
}



//Foto
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
//Limpia la información y carga la informacion del usuario
function abrirModalConf(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdConfiguracion', '0');

    }
    else {

        $.get("/Configuracion/ConsultaConfiguracion/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdConfiguracion', Data[0].IdConfiguracion);

            document.getElementById("TxtRFC").value = Data[0].RFC;
            document.getElementById("TxtNombreEmpresa").value = Data[0].NombreEmpresa;
            document.getElementById("TxtMisión").value = Data[0].Vision;
            document.getElementById("TxtVisión").value = Data[0].Mision;
            document.getElementById("TxtValores").value = Data[0].Valores;

            document.getElementById("TxtDireccion").value = Data[0].Direccion;

            document.getElementById("TxtDireccionHost").value = Data[0].DireccionHost;

            document.getElementById("TxtPuerto").value = Data[0].Puerto;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtSesionAbierta").value = Data[0].SesionAbierta;

            document.getElementById("PBFoto").src = "data:image/png;base64," + Data[0].FOTOMOSTRAR;
            document.getElementById("TxtLogo").value = Data[0].LogoTexto;
            document.getElementById("TxtSerCorreo").value = Data[0].SerCorreo;
            document.getElementById("TxtSerCorreoPuerto").value = Data[0].SerCorreoPort;
            document.getElementById("TxtSerUser").value = Data[0].SerCorreoUser;

            document.getElementById("TxtSerPass").value = Data[0].SerCorreoPass;
            document.getElementById("TxtDireccionWeB").value = Data[0].DirWeb;
            document.getElementById("TxtTipo").value = Data[0].Tipo;
            document.getElementById("TxtDato1").value = Data[0].Dato1;
            document.getElementById("TxtDato2").value = Data[0].Dato2;

            document.getElementById("TxtDato3").value = Data[0].Dato4;
            document.getElementById("TxtDato4").value = Data[0].Descripcion;

        });
    }
}

