
CrearAcordeonConfiguraciones();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonConfiguraciones() {
    $.get("/Configuracion/ConsultaConfiguraciones", function (DatosConfiguracion) {
        //Accordeon(DatosConfiguracion, document.getElementById("accordion"));
        AcordeonConfiguraciones(DatosConfiguracion, document.getElementById("accordion"));
    });
}
function AcordeonConfiguraciones(DatosConfiguracion, CtrlConfiguracion) {
    var CodigoHTMLConfiguracion = "";
    for (var i = 0; i < DatosConfiguracion.length; i++) {
        if (i < 1) {
            CodigoHTMLConfiguracion += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLConfiguracion += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLConfiguracion += "<div class='card-header' id='heading" + DatosConfiguracion[i].Id + "'>";
        CodigoHTMLConfiguracion += "<h5 class='mb-0'>";
        CodigoHTMLConfiguracion += "<a  data-toggle='collapse' data-target='#collapse" + DatosConfiguracion[i].Id + "' aria-expanded='false' aria-controls='collapse" + DatosConfiguracion[i].Id + "' class='collapsed'>";
        //CodigoHTMLConfiguracion += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLConfiguracion += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLConfiguracion += "<span >" + DatosConfiguracion[i].NombreEmpresa + "</span>";
        CodigoHTMLConfiguracion += "</a>";
        CodigoHTMLConfiguracion += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLConfiguracion += "<div id='collapse" + DatosConfiguracion[i].Id + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLConfiguracion += "<div class='card-body'>";
        CodigoHTMLConfiguracion += "<div class='row'>";
        CodigoHTMLConfiguracion += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>RFC: </strong>" + DatosConfiguracion[i].RFC + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Vision: </strong>" + DatosConfiguracion[i].Vision + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Mision: </strong>" + DatosConfiguracion[i].Mision + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Valores: </strong>" + DatosConfiguracion[i].Valores + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Direccion: </strong>" + DatosConfiguracion[i].Direccion + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Telefono: </strong>" + DatosConfiguracion[i].Telefono + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>DireccionHost: </strong>" + DatosConfiguracion[i].DireccionHost + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Puerto: </strong>" + DatosConfiguracion[i].Puerto + "</div>";
         CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Logo: </strong>" + DatosConfiguracion[i].Logo + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>LogoTexto: </strong>" + DatosConfiguracion[i].LogoTexto + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>Sesion Abierta: </strong>" + DatosConfiguracion[i].SesionAbierta + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-12 col-sm-6 col-xs-6'><strong>SerCorreo: </strong>" + DatosConfiguracion[i].SerCorreo + "</div>";
 
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>SerCorreoPort: </strong>" + DatosConfiguracion[i].SerCorreoPort + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>SerCorreoUser: </strong>" + DatosConfiguracion[i].SerCorreoUser + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>SerCorreoPass: </strong>" + DatosConfiguracion[i].SerCorreoPass + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>DirWeb: </strong>" + DatosConfiguracion[i].DirWeb + "</div>";

        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Tipo: </strong>" + DatosConfiguracion[i].Tipo + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Dato2: </strong>" + DatosConfiguracion[i].Dato2 + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Dato3: </strong>" + DatosConfiguracion[i].Dato3 + "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dato4: </strong>" + DatosConfiguracion[i].Dato4 + "</div>";
        CodigoHTMLConfiguracion += "</div>";
        CodigoHTMLConfiguracion += "</div>";
        CodigoHTMLConfiguracion += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLConfiguracion += "<button class='btn btn-success' onclick='AbrirMProveedores(" + DatosConfiguracion[i].Id + ")' data-toggle='modal' data-target='#Proveedores'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLConfiguracion += "<button class='btn btn-danger' onclick='EliminarConfiguaciones(" + DatosConfiguracion[i].Id + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLConfiguracion += "</div>";
        CodigoHTMLConfiguracion += "</div>";
        CodigoHTMLConfiguracion += "</div>";
        CodigoHTMLConfiguracion += "</div>";
        CodigoHTMLConfiguracion += "</div>";
        CodigoHTMLConfiguracion += "</div>";
    }
    CtrlConfiguracion.innerHTML = CodigoHTMLConfiguracion;
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
        $.get("/Proveedores/ConsultaProveedor/?Id=" + Id, function (DatosConfiguracion) {
            document.getElementById("TxtId").value = DatosConfiguracion[0].Id;
            document.getElementById("TxtRFC").value = DatosConfiguracion[0].RFC;
            document.getElementById("TxtVision").value = DatosConfiguracion[0].Vision;
            document.getElementById("TxtMision").value = DatosConfiguracion[0].Mision;
            document.getElementById("TxtPuerto").value = DatosConfiguracion[0].Puerto;
            document.getElementById("TxtSerCorreoPort").value = DatosConfiguracion[0].SerCorreoPort;
            document.getElementById("cmbPuertoHost").value = DatosConfiguracion[0].PuertoHost;
            document.getElementById("cmbValores").value = DatosConfiguracion[0].Valores;
            document.getElementById("cmbTipoTexto").value = DatosConfiguracion[0].TipoTexto;
            document.getElementById("TxtRFC").value = DatosConfiguracion[0].RFC;
            document.getElementById("TxtPuerto").value = DatosConfiguracion[0].Puerto;
            document.getElementById("TxtSerCorreoPort").value = DatosConfiguracion[0].SerCorreoPort;
            document.getElementById("TxtSerCorreo").value = DatosConfiguracion[0].SerCorreo;
            document.getElementById("TxtSerCorreoUser").value = DatosConfiguracion[0].SerCorreoUser;
            document.getElementById("TxtSerCorreoPass").value = DatosConfiguracion[0].SerCorreoPass;
            document.getElementById("TxtDireccionHost").value = DatosConfiguracion[0].DireccionHost;
            document.getElementById("TxtDirWeb").value = DatosConfiguracion[0].DirWeb;
            document.getElementById("TxtTipo").value = DatosConfiguracion[0].Tipo;
        });
    }


}

//Guarda los cambios y altas de las áreas
function GuardarProveedor() {
    if (Obligatorios("Proveedor") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var Id = document.getElementById("TxtId").value;
            var RFC = document.getElementById("TxtRFC").value;
            var Vision = document.getElementById("TxtVision").value;
            var Mision = document.getElementById("TxtMision").value;
            var Puerto = document.getElementById("TxtPuerto").value;
            var SerCorreoPort = document.getElementById("TxtSerCorreoPort").value;

            var PuertoHost = document.getElementById("TxtPuertoHost").value;
            var Valores = document.getElementById("TxtValores").value;
            var TipoTexto = document.getElementById("TxtTipoTexto").value;
            var RFC = document.getElementById("RFC").value;
            var Puerto = document.getElementById("TxtPuerto").value;
            var SerCorreoPort = document.getElementById("TxtSerCorreoPort").value;

            ///var temUser = document.getElementById("cmbEncargado");
            //var URFC = temUser.options[temUser.selectedIndex].text;

            var SerCorreo = document.getElementById("TxtSerCorreo").value;
            var SerCorreoUser = document.getElementById("TxtSerCorreoUser").value;
            var SerCorreoPass = document.getElementById("TxtSerCorreoPass").value;
            var DireccionHost = document.getElementById("TxtDireccionHost").value;
            var DirWeb = document.getElementById("TxtDirWeb").value;
            var Tipo = document.getElementById("TxtTipo").value;
            var frm = new FormData();
            frm.append("Id", Id);
            frm.append("RFC", RFC);
            frm.append("Vision", Vision);
            frm.append("Mision", Mision);
            frm.append("Puerto", Puerto);
            frm.append("SerCorreoPort", SerCorreoPort);
            frm.append("PuertoHost", Mision);
            frm.append("Valores", Valores);
            frm.append("SerCorreoPort", SerCorreoPort);
            frm.append("RFC", RFC);
            frm.append("Puerto", Puerto);
            frm.append("SerCorreoPort", SerCorreoPort);
            frm.append("SerCorreo", SerCorreo);
            frm.append("SerCorreoUser", SerCorreoUser);
            frm.append("SerCorreoPass", SerCorreoPass);
            frm.append("DireccionHost", DireccionHost);
            frm.append("DirWeb", DirWeb);
            frm.append("Tipo", Tipo);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Proveedores/GuardarProveedor",
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
                        CrearAcordeonConfiguraciones();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}
//"Elimina" el área cambia el Estatus
function EliminarConfiguaciones(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Configuracion/EliminarProveedor/?Id=" + id, function (DatoProveedor) {
            if (DatoProveedor == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonConfiguraciones();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}

