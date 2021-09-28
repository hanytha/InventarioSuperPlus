
AcordeonProveedores();
//Crea el acordeón e inserta (los registros de la base de datos)
function AcordeonProveedores() {
    $.get("/Proveedores/ConsultaProveedores", function (RegistrosProveedores) {
        //Accordeon(RegistrosProveedores, document.getElementById("accordion"));
        otro(RegistrosProveedores, document.getElementById("accordion"));
    });
}
function otro(RegistrosProveedores, CtrlProveedores) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < RegistrosProveedores.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + RegistrosProveedores[i].Id + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + RegistrosProveedores[i].Id + "' aria-expanded='false' aria-controls='collapse" + RegistrosProveedores[i].Id + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + RegistrosProveedores[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + RegistrosProveedores[i].Id + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + RegistrosProveedores[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + RegistrosProveedores[i].GiroDelProveedor + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + RegistrosProveedores[i].Municipio + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Cuenta Interbancaria: </strong>" + RegistrosProveedores[i].CuentaInterbancaria + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Código Postal: </strong>" + RegistrosProveedores[i].CodigoPostal + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Estado: </strong>" + RegistrosProveedores[i].Estado + "</div>";
      //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + RegistrosProveedores[i].Direccion + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        //CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12'><strong>Dirección</strong></div >";
        //CodigoHTMLAreas += "</div>";
        //CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>RFC: </strong>" + RegistrosProveedores[i].RFC + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + RegistrosProveedores[i].Direccion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + RegistrosProveedores[i].Localidad + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + RegistrosProveedores[i].Telefono + "</div>";

       // CodigoHTMLAreas += "</div>";
       // CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Banco: </strong>" + RegistrosProveedores[i].Banco + "</div>";

        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + RegistrosProveedores[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Número de Cuenta: </strong>" + RegistrosProveedores[i].NumeroDeCuenta + "</div>";

        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>UsoCFDI: </strong>" + RegistrosProveedores[i].UsoCFDI + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nomenclatura: </strong>" + RegistrosProveedores[i].Nomenclatura + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Descripción: </strong>" + RegistrosProveedores[i].Descripcion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Logo: </strong>" + RegistrosProveedores[i].Logo + "</div>";
        CodigoHTMLAreas += "</div>";
        //CodigoHTMLAreas += "<button class='btn btn-info' onclick='MostrarOcultar(" + RegistrosProveedores[i].ID + ")'><i id='BtnMO" + RegistrosProveedores[i].Id + "' class='fas fa-chevron-circle-down'></i></button></div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='AbrirMProveedores(" + RegistrosProveedores[i].Id + ")' data-toggle='modal' data-target='#ModalTiendas'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarProveedores(" + RegistrosProveedores[i].Id + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlProveedores.innerHTML = CodigoHTMLAreas;
}

//Limpia la información y carga la informacion del proveedor
function AbrirMProveedores(id) {//la clase AreaObligatorio
    var controlesObligatorio = document.getElementsByClassName("AreaObligatorio");
    for (var i = 0; i < controlesObligatorio.length; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("border-danger");//Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        Limpiar();

    }
    else {
        $.get("/Proveedores/ConsultaProveedores/?Id=" + Id, function (DatosProveedor) {
            document.getElementById("TxtId").value = DatosProveedor[0].Id;
            document.getElementById("TxtNombre").value = DatosProveedor[0].Nombre;
            document.getElementById("TxtCorreo").value = DatosProveedor[0].Correo;
            document.getElementById("TxtGiroDelProveedor").value = DatosProveedor[0].GiroDelProveedor;
            document.getElementById("TxtCuentaInterbancaria").value = DatosProveedor[0].CuentaInterbancaria;
            document.getElementById("TxtCodigoPostal").value = DatosProveedor[0].CodigoPostal;
            document.getElementById("cmbEstado").value = DatosProveedor[0].Estado;
            document.getElementById("cmbMunicipio").value = DatosProveedor[0].Municipio;
            document.getElementById("cmbLocalidad").value = DatosProveedor[0].Localidad;
            document.getElementById("TxtRFC").value = DatosProveedor[0].RFC;
            document.getElementById("TxtDireccion").value = DatosProveedor[0].Direccion;
            document.getElementById("TxtTelefono").value = DatosProveedor[0].Telefono;
            document.getElementById("TxtBanco").value = DatosProveedor[0].Banco;
            document.getElementById("TxtNumeroDeCuenta").value = DatosProveedor[0].NumeroDeCuenta;
            document.getElementById("TxtUsoCFDI").value = DatosProveedor[0].UsoCFDI;
            document.getElementById("TxtNomenclatura").value = DatosProveedor[0].Nomenclatura;
            document.getElementById("TxtDescripcion").value = DatosProveedor[0].Descripcion;
            document.getElementById("TxtLogo").value = DatosProveedor[0].Logo;
        });
    }


}

//Guarda los cambios y altas de las áreas
function GuardarProveedor() {
    if (Obligatorios("Proveedor") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var Id = document.getElementById("TxtId").value;
            var Nombre = document.getElementById("TxtNombre").value;
            var Correo = document.getElementById("Txtcorreo").value;
            var GiroDelProveedor = document.getElementById("TxtGiroDelProveedor").value;
            var CuentaInterbancaria = document.getElementById("TxtCuentaInterbancaria").value;
            var CodigoPostal = document.getElementById("TxtCodigoPostal").value;
            var Estado = document.getElementById("TxtEstado").value;
            var Municipio = document.getElementById("TxtMunicipio").value;
            var Localidad = document.getElementById("TxtLocalidad").value;
            var RFC = document.getElementById("RFC").value;
            var Direccion = document.getElementById("TxtDireccion").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            
            ///var temUser = document.getElementById("cmbEncargado");
            //var UNombre = temUser.options[temUser.selectedIndex].text;

            var Banco = document.getElementById("TxtBanco").value;
            var NumeroDeCuenta = document.getElementById("TxtNumeroDeCuenta").value;
            var UsoCFDI = document.getElementById("TxtUsoCFDI").value;
            var Nomenclatura = document.getElementById("TxtNomenclatura").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;
            var Logo = document.getElementById("TxtLogo").value;
            var frm = new FormData();
            frm.append("Id", Id);
            frm.append("Nombre", Nombre);
            frm.append("Correo", Correo);
            frm.append("GiroDelProveedor", GiroDelProveedor);
            frm.append("CuentaInterbancaria", CuentaInterbancaria);
            frm.append("CodigoPostal", CodigoPostal);
            frm.append("Estado", GiroDelProveedor);
            frm.append("Municipio", Municipio);
            frm.append("CodigoPostal", CodigoPostal);
            frm.append("RFC", RFC);
            frm.append("Direccion", Direccion);
            frm.append("Telefono", Telefono);
            frm.append("Banco", Banco);
            frm.append("NumeroDeCuenta", NumeroDeCuenta);
            frm.append("UsoCFDI", UsoCFDI);
            frm.append("Nomenclatura", Nomenclatura);
            frm.append("Descripcion", Descripcion);
            frm.append("Logo", Logo);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Proveedores/Proveedores",
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
                        AcordeonProveedores();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}

//"Elimina" el área cambia el Estatus
function EliminarProveedores(id) {
    if (confirm("¿Desea eliminar el registo?") == 1) {

        $.get("/Proveedores/EliminarProveedor/?Id=" + id, function (DatoProveedor) {
            if (DatoProveedor == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonAreas();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}