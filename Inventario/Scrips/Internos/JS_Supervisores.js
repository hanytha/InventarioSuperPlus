
CrearAcordeonSupervisores();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonSupervisores() {
    $.get("/Supervisor/ConsultaSupervisores", function (Data) {
        AcordeonSupervisores(Data, document.getElementById("accordion"));
    });

}//Acordeón proveedores
function AcordeonSupervisores(Data, CtrlSupervisores) {
    var CodigoHTMLSupervisor = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLSupervisor += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLSupervisor += "<div class='card m-b-0 border-top'>";
        } //Obtener los registros de la base de datos para mostrarlo en el accordión
        CodigoHTMLSupervisor += "<div class='card-header' id='heading" + Data[i].IdSupervisor + "'>";
        CodigoHTMLSupervisor += "<h5 class='mb-0'>";
        CodigoHTMLSupervisor += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdSupervisor + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdSupervisor + "' class='collapsed'>";
        CodigoHTMLSupervisor += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLSupervisor += "<span >" + Data[i].Nombre + "</span>";
        CodigoHTMLSupervisor += "</a>";
        CodigoHTMLSupervisor += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLSupervisor += "<div id='collapse" + Data[i].IdSupervisor + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLSupervisor += "<div class='card-body'>";
        CodigoHTMLSupervisor += "<div class='row'>";
        CodigoHTMLSupervisor += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>ApellidoP: </strong>" + Data[i].ApellidoP + "</div>";
        CodigoHTMLSupervisor += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>ApellidoM: </strong>" + Data[i].ApellidoM + "</div>";
        CodigoHTMLSupervisor += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Telefono: </strong>" + Data[i].Telefono + "</div>";
 
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "<div class='row'>";
        CodigoHTMLSupervisor += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].Correo + "</div>";
        CodigoHTMLSupervisor += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>TipoSupervision: </strong>" + Data[i].TipoSupervision + "</div>";
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLSupervisor += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdSupervisor + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHTMLSupervisor += "<button class='btn btn-danger' onclick='EliminarSupervisor(" + Data[i].IdSupervisor + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "</div>";
        CodigoHTMLSupervisor += "</div>";
    }
    CtrlSupervisores.innerHTML = CodigoHTMLSupervisor;
}

//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdSupervisor', 0);
    }
    else {
        $.get("/Supervisor/ConsultaSupervisor/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdSupervisor', Data[0].IdSupervisor);     //Variable de sesión
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("TxtApellidoP").value = Data[0].ApellidoP;
            document.getElementById("TxtApellidoM").value = Data[0].ApellidoM;
            document.getElementById("TxtTelefono").value = Data[0].Telefono;
            document.getElementById("TxtCorreo").value = Data[0].Correo;
            document.getElementById("cmbSupervision").value = Data[0].TipoSupervision;
        });
    }
}
//limpiar campos
function LimpiarCampos() {
    //Limpiar la casilla de texto
    var controlesTXT = document.getElementsByClassName("limpiar");
    for (var i = 0; i < controlesTXT.length; i++) {
        controlesTXT[i].value = "";
    }//Limpiar el campo de select
    var controlesSLT = document.getElementsByClassName("limpiarSelect");
    for (var i = 0; i < controlesSLT.length; i++) {
        controlesSLT[i].value = "0";
    }
}
//Guarda los cambios y altas de los proveedores
function GuardarSupervisores() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdSupervisor = sessionStorage.getItem('IdSupervisor');
            var Nombre = document.getElementById("TxtNombre").value;
            var ApellidoP = document.getElementById("TxtApellidoP").value;
            var ApellidoM = document.getElementById("TxtApellidoM").value;

            var Telefono = document.getElementById("TxtTelefono").value;
            var Correo = document.getElementById("TxtCorreo").value;
            var TipoSupervision = document.getElementById("cmbSupervision").value;
            var frm = new FormData();
            frm.append("IdSupervisor", IdSupervisor);
            frm.append("Nombre", Nombre);
            frm.append("ApellidoP", ApellidoP);
            frm.append("ApellidoM", ApellidoM);
            frm.append("Telefono", Telefono);
            frm.append("Correo", Correo);
            frm.append("TipoSupervision", TipoSupervision);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Supervisor/GuardarSupervisor",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {

                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el supervidor");
                    }
                    else {
                        alert("Se ejecutó correctamente");
                        CrearAcordeonSupervisores();
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
            controlesObligatorio[i].classList.add("border-danger");
        }
        else {
            controlesObligatorio[i].classList.remove("border-danger");

        }
    }
    return exito;
}
//"Elimina" el área cambia el Estatus
function EliminarSupervisor(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Supervisor/EliminarSupervisor/?IdSupervisor=" + id, function (DatoSupervisor) {
            if (DatoSupervisor == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se eliminó correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                CrearAcordeonSupervisores();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}








