
CrearAcordeonDepartamentos();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonDepartamentos() {
    $.get("/Departamentos/ConsultaDepartamentos", function (DatosDepartamentos) {
        //Accordeon(DatosDepartamentos, document.getElementById("accordion"));
        AcordeonDepartamentos(DatosDepartamentos, document.getElementById("accordion"));
    });
}
function AcordeonDepartamentos(DatosDepartamentos, CtrlDepartamentos) {
    var CodigoHTMLDepartamentos = "";
    for (var i = 0; i < DatosDepartamentos.length; i++) {
        if (i < 1) {
            CodigoHTMLDepartamentos += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLDepartamentos += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLDepartamentos += "<div class='card-header' id='heading" + DatosDepartamentos[i].Id + "'>";
        CodigoHTMLDepartamentos += "<h5 class='mb-0'>";
        CodigoHTMLDepartamentos += "<a  data-toggle='collapse' data-target='#collapse" + DatosDepartamentos[i].Id + "' aria-expanded='false' aria-controls='collapse" + DatosDepartamentos[i].Id + "' class='collapsed'>";
        //CodigoHTMLDepartamentos += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLDepartamentos += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLDepartamentos += "<span >" + DatosDepartamentos[i].Nombre + "</span>";
        CodigoHTMLDepartamentos += "</a>";
        CodigoHTMLDepartamentos += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLDepartamentos += "<div id='collapse" + DatosDepartamentos[i].Id + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLDepartamentos += "<div class='card-body'>";
        CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UNombre: </strong>" + DatosDepartamentos[i].UNombre + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Correo: </strong>" + DatosDepartamentos[i].Correo + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Telefono: </strong>" + DatosDepartamentos[i].Telefono + "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Cuenta Interbancaria: </strong>" + DatosDepartamentos[i].   
            
            + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Código Postal: </strong>" + DatosDepartamentos[i].CodigoPostal + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Estado: </strong>" + DatosDepartamentos[i].Estado + "</div>";
        //  CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosDepartamentos[i].Direccion + "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "<div class='row'>";
        //CodigoHTMLDepartamentos += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Dirección</strong></div >";
        //CodigoHTMLDepartamentos += "</div>";
        //CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>RFC: </strong>" + DatosDepartamentos[i].RFC + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosDepartamentos[i].Direccion + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + DatosDepartamentos[i].Localidad + "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosDepartamentos[i].Telefono + "</div>";

        // CodigoHTMLDepartamentos += "</div>";
        // CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Banco: </strong>" + DatosDepartamentos[i].Banco + "</div>";

        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + DatosDepartamentos[i].Telefono + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Número de Cuenta: </strong>" + DatosDepartamentos[i].NumeroDeCuenta + "</div>";

        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + DatosDepartamentos[i].UsoCFDI + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nomenclatura: </strong>" + DatosDepartamentos[i].Nomenclatura + "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "<div class='row'>";
        CodigoHTMLDepartamentos += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Descripción: </strong>" + DatosDepartamentos[i].Descripcion + "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Logo: </strong>" + DatosDepartamentos[i].Logo + "</div>";
        CodigoHTMLDepartamentos += "</div>";
        //CodigoHTMLDepartamentos += "<button class='btn btn-info' onclick='MostrarOcultar(" + DatosDepartamentos[i].ID + ")'><i id='BtnMO" + DatosDepartamentos[i].Id + "' class='fas fa-chevron-circle-down'></i></button></div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLDepartamentos += "<button class='btn btn-success' onclick='AbrirMProveedores(" + DatosDepartamentos[i].Id + ")' data-toggle='modal' data-target='#Proveedores'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLDepartamentos += "<button class='btn btn-danger' onclick='EliminarProveedores(" + DatosDepartamentos[i].Id + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "</div>";
        CodigoHTMLDepartamentos += "</div>";
    }
    CtrlDepartamentos.innerHTML = CodigoHTMLDepartamentos;
}
