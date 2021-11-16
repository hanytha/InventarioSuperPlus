LlenarCMBPSupervicion();



CrearAcordeonSupervisores();
function CrearAcordeonSupervisores() {
    $.get("/Supervisor/ConsultaSupervisores", function (IncidenciasArea) {
        AcordeonSupervisores(IncidenciasArea, document.getElementById("accordion"));
    });
}

//Crea la información basica de las insidencias
function AcordeonSupervisores(data, IDo) {
    var CodHtml = "";
    for (var i = 0; i < data.length; i++) {
        if (i < 1) {
            CodHtml += "<div class='card m-b-0'>";
        }
        else {
            CodHtml += "<div class='card m-b-0 border-top'>";
        }
        CodHtml += "<div class='card-header' id='heading" + data[i].IdSupervisor + "'>";
        CodHtml += "<h5 class='mb-0'>";
        CodHtml += "<a onclick='MostrarProcedimientos(" + data[i].IdSupervisor + ");' data-toggle='collapse' data-target='#collapse" + data[i].IdSupervisor + "' aria-expanded='false' aria-controls='collapse" + data[i].IdSupervisor + "' class='collapsed'>";
        CodHtml += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodHtml += "<span >" + data[i].Nombre + "</span>";
        CodHtml += "</a>";
        CodHtml += "</h5>";
        CodHtml += "<div id='collapse" + data[i].IdSupervisor + "' class='collapse' aria-labelledby='headingOne' data-parent='#accordion' style=''>";
        CodHtml += "<div class='card-body'>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Apellido paterno: </strong>" + data[i].ApellidoP + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Apellido Materno: </strong>" + data[i].ApellidoM + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'></div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Teléfono: </strong>" + data[i].Telefono + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Correo: </strong>" + data[i].Correo + "</div>";
        CodHtml += "<div class='col-md-6 col-sm-6 col-xs-6'><strong>Tipo de Supervision: </strong>" + data[i].TipoSupervision + "</div>";
        CodHtml += "</div>";
        CodHtml += "<div class='row'>";
        CodHtml += "<div class='col-md-9 col-sm-9 col-xs-9'><strong>Posibles soluciones: </strong></div >";
        CodHtml += "</div >";

        CodHtml += "<button class='btn btn-primary' onclick='AbrirModalIncidencia(" + data[i].IdSupervisor + "," + data[i].IdSupervisor + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodHtml += "<button class='btn btn-danger' onclick='EliminarSupervisor(" + data[i].IdSupervisor + "," + data[i].IdSupervisor + ",this)'><i class='fas fa-eraser'></i></button>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
        CodHtml += "</div>";
    }
    IDo.innerHTML = CodHtml;
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
            document.getElementById("cmbSupervicion").value = Data[0].IdSupervision;
        });
    }
}

//Guarda los cambios y altas de los proveedores
function GuardarSupervisor() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdSupervisor = sessionStorage.getItem('IdSupervisor');
            var Nombre = document.getElementById("TxtNombre").value;
            var ApellidoP = document.getElementById("TxtApellidoP").value;
            var ApellidoM = document.getElementById("TxtApellidoM").value;
            var Telefono = document.getElementById("TxtTelefono").value;
            var Correo = document.getElementById("TxtCorreo").value;
            var IdSupervision = document.getElementById("cmbSupervicion").value;
            var TempEdo = document.getElementById("cmbSupervicion");
            var TipoSupervision = TempEdo.options[TempEdo.selectedIndex].text;

            var frm = new FormData();
            frm.append("IdSupervisor", IdSupervisor);
            frm.append("Nombre", Nombre);
            frm.append("ApellidoP", ApellidoP);
            frm.append("ApellidoM", ApellidoM);
            frm.append("Telefono", Telefono);
            frm.append("Correo", Correo);
            frm.append("IdSupervision", IdSupervision);
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

        $.get("/Supervisor/EliminarSupervisor/?Id=" + id, function (DatoSupervisor) {
       


            if (DatoSupervisor == 1) {

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



function LlenarCMBPSupervicion() {
    $.get("/GLOBAL/BDSupervicion", function (data) {
        llenarCombo(data, document.getElementById("cmbSupervicion"));
    });

    //funcion general para llenar los select
    function llenarCombo(data, control) {
        var contenido = "";
        contenido += "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
        }
        control.innerHTML = contenido;
    }


}
