
LlenarCMBPrin();
LlenarCMSupervicion();
LlenarCMSupervisor();
CrearAcordeonTienda();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonTienda() {
    $.get("/Tienda/ConsultaTiendas", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonTienda(Data, document.getElementById("accordion"));
    });
}
function AcordeonTienda(Data, CtrlAlmacen) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 list-group list-group-flush  mb-1'>";
        }

        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdTienda + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a data-toggle='collapse' data-target='#collapse" + Data[i].IdTienda + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdTienda + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";

        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdTienda + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";

        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre de el Supervisor de Tienda: </strong>" + Data[i].NombreS + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre de el lider de tienda: </strong>" + Data[i].LNombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado1: </strong>" + Data[i].E1Nombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado2: </strong>" + Data[i].E2Nombre + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado3: </strong>" + Data[i].E3Nombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre Axuliar1: </strong>" + Data[i].A1Nombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre Auxiliar2: </strong>" + Data[i].A2Nombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre Auxiliar3: </strong>" + Data[i].A3Nombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Estado: </strong>" + Data[i].Estado + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Municipio + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Localidad: </strong>" + Data[i].Localidad + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Supervición: </strong>" + Data[i].Unombre + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + Data[i].Direccion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>CP: </strong>" + Data[i].CP + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Calle: </strong>" + Data[i].Calle + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Hora de aperturta: </strong>" + Data[i].HApertura + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Hora de cierre: </strong>" + Data[i].HCierre + "</div>";
        CodigoHTMLAreas += "</div>";

        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdTienda + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarTienda(" + Data[i].IdTienda + ",this)' ><i class='far fa-trash-alt'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlAlmacen.innerHTML = CodigoHTMLAreas;
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
        sessionStorage.setItem('IDTiend', '0');

    }
    else {

        $.get("/Tienda/ConsultaTienda/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDTiend', Data[0].IdTienda);
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("cmbSupervisor").value = Data[0].IdSupervisor;

            //Mostrar el Estado, Municipio y localidad registrado al inicio y permitir cambiarlo
            document.getElementById("cmbEstado").value = Data[0].IdEstado;
            $.get("/GLOBAL/BDMunicipio/?IDE=" + Data[0].IdEstado, function (Municipios) {
                llenarCombo(Municipios, document.getElementById("cmbMunicipio"));
                document.getElementById("cmbMunicipio").value = Data[0].IdMunicipio;
            });
            $.get("/GLOBAL/BDLocalidades/?IDM=" + Data[0].IdMunicipio, function (Localidades) {
                llenarCombo(Localidades, document.getElementById("cmbLocalidad"));
                document.getElementById("cmbLocalidad").value = Data[0].IdLocalidad;
            });

            document.getElementById("TxtDireccion").value = Data[0].Direccion;
            document.getElementById("TxtCalle").value = Data[0].Calle;
            document.getElementById("TxtCodigoPostal").value = Data[0].CP;
            document.getElementById("TxtNumeroTelefono").value = Data[0].Telefono;
            document.getElementById("TxtHoraApertura").value = Data[0].HApertura;
            document.getElementById("TxtHoraCierre").value = Data[0].HCierre;
            document.getElementById("cmbSupervision").value = Data[0].IdSupervision;

            document.getElementById("TxtLider").value = Data[0].LNombre;
            document.getElementById("TxtEncargado1").value = Data[0].E1Nombre;
            document.getElementById("TxtEncargado2").value = Data[0].E2Nombre;
            document.getElementById("TxtEncargado3").value = Data[0].E3Nombre;
            document.getElementById("TxtAux1").value = Data[0].A1Nombre;
            document.getElementById("TxtAux2").value = Data[0].A2Nombre;
            document.getElementById("TxtAux3").value = Data[0].A3Nombre;

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

//llenar los combos Principales
function LlenarCMBPrin() {
    $.get("/GLOBAL/BDEstado", function (data) {
        llenarCombo(data, document.getElementById("cmbEstado"));
    });

}

//event Change index Estados para llenar el combobox Municipios
var IDE = document.getElementById("cmbEstado");
IDE.addEventListener("change", function () {
    $.get("/GLOBAL/BDMunicipio/?IDE=" + IDE.value, function (data) {
        llenarCombo(data, document.getElementById("cmbMunicipio"));
    });
});
//event Change index Municipio para llenar el combo box Municipios 
var IDM = document.getElementById("cmbMunicipio");
IDM.addEventListener("change", function () {
    $.get("/GLOBAL/BDLocalidades/?IDM=" + IDM.value, function (data) {
        llenarCombo(data, document.getElementById("cmbLocalidad"));
    });
});


function LlenarCMSupervicion() {
    $.get("/GLOBAL/BDSupervicion", function (data) {
        llenarCombo(data, document.getElementById("cmbSupervision"));
    });
}



function LlenarCMSupervisor() {
    $.get("/GLOBAL/BDSupervisor", function (data) {
        llenarCombo(data, document.getElementById("cmbSupervisor"));
    });
}


//funcion general para llenar los select
function llenarCombo(data, control) {

    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
    }
    control.innerHTML = contenido;
}




//Guarda los cambios y altas de las áreas
function GuardarTienda() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdTienda = sessionStorage.getItem('IDTiend');
            var Nombre = document.getElementById("TxtNombre").value;

            var IdSupervisor = document.getElementById("cmbSupervisor").value;
            var TempSupervisor = document.getElementById("cmbSupervisor");
            var NombreS = TempSupervisor.options[TempSupervisor.selectedIndex].text;

            var IdEstado = document.getElementById("cmbEstado").value;
            var TempEdo = document.getElementById("cmbEstado");
            var Estado = TempEdo.options[TempEdo.selectedIndex].text;
            var IdMunicipio = document.getElementById("cmbMunicipio").value;
            var TempMuni = document.getElementById("cmbMunicipio");
            var Municipio = TempMuni.options[TempMuni.selectedIndex].text;
            var IdLocalidad = document.getElementById("cmbLocalidad").value;
            var TempLoca = document.getElementById("cmbLocalidad");
            var Localidad = TempLoca.options[TempLoca.selectedIndex].text;

            var Direccion = document.getElementById("TxtDireccion").value;
            var Calle = document.getElementById("TxtCalle").value;
            var CP = document.getElementById("TxtCodigoPostal").value;
            var Telefono = document.getElementById("TxtNumeroTelefono").value;
            var HApertura = document.getElementById("TxtHoraApertura").value;
            var HCierre = document.getElementById("TxtHoraCierre").value;
            var IdSupervision = document.getElementById("cmbSupervision").value;
            var TempSuper = document.getElementById("cmbSupervision");
            var Unombre = TempSuper.options[TempSuper.selectedIndex].text;
            var LNombre = document.getElementById("TxtLider").value;
            var E1Nombre = document.getElementById("TxtEncargado1").value;
            var E2Nombre = document.getElementById("TxtEncargado2").value;
            var E3Nombre = document.getElementById("TxtEncargado3").value;
            var A1Nombre = document.getElementById("TxtAux1").value;
            var A2Nombre = document.getElementById("TxtAux2").value;
            var A3Nombre = document.getElementById("TxtAux3").value;
            var frm = new FormData();
            frm.append("IdTienda", IdTienda);
            frm.append("Nombre", Nombre);
            frm.append("NombreS", NombreS);
            frm.append("IdSupervisor", IdSupervisor);
            frm.append("IdEstado", IdEstado);
            frm.append("Estado", Estado);
            frm.append("IdMunicipio", IdMunicipio);
            frm.append("Municipio", Municipio);
            frm.append("IdLocalidad", IdLocalidad);
            frm.append("Localidad", Localidad);
            frm.append("Direccion", Direccion);
            frm.append("Calle", Calle);
            frm.append("CP", CP);
            frm.append("Telefono", Telefono);
            frm.append("HApertura", HApertura);
            frm.append("HCierre", HCierre);
            frm.append("IdSupervision", IdSupervision);
            frm.append("Unombre", Unombre);
            frm.append("LNombre", LNombre);
            frm.append("E1Nombre", E1Nombre);
            frm.append("E2Nombre", E2Nombre);
            frm.append("E3Nombre", E3Nombre);
            frm.append("A1Nombre", A1Nombre);
            frm.append("A2Nombre", A2Nombre);
            frm.append("A3Nombre", A3Nombre);



            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Tienda/GuardarTienda",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡La tienda ya existe!", "", "warning");
                    }
                    else {
                        swal("La tienda se registró exitosamente!", "", "success");
                        CrearAcordeonTienda();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
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
function EliminarTienda(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Tienda/EliminarTienda/?Id=" + id, function (DatoTienda) {
            if (DatoTienda == 1) {
                swal("La tienda se eliminó exitosamente!", "", "success");
                CrearAcordeonTienda();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}

