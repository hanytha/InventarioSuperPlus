LlenarCMBPSupervicion();
<<<<<<< HEAD
=======

>>>>>>> alma
CrearAcordeonSupervisores();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonSupervisores() {
    $.get("/Supervisor/ConsultaSupervisores", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonSupervisores(Data, document.getElementById("accordion"));
    });
}
function AcordeonSupervisores(Data, CtrlBonis) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdSupervisor + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdSupervisor + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdSupervisor + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].Nombre + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdSupervisor + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
<<<<<<< HEAD
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Apellido Paterno: </strong>" + Data[i].ApellidoP + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Apellido Materno: </strong>" + Data[i].ApellidoM + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Télefono : </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Correo : </strong>" + Data[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Tipo de supervición: </strong>" + Data[i].TipoSupervision + "</div>";
        CodigoHTMLAreas += "</div>";
=======
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].ApellidoP + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].ApellidoM + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Telefono + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Correo + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].TipoSupervision + "</div>";
        CodigoHTMLAreas += "</div>";

>>>>>>> alma
        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdSupervisor + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarSupervisor(" + Data[i].IdSupervisor + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlBonis.innerHTML = CodigoHTMLAreas;
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
                alert("Se elimino correctamente");
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
<<<<<<< HEAD

    //funcion general para llenar los select
    function llenarCombo(data, control) {
        var contenido = "";
        contenido += "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
        }
        control.innerHTML = contenido;
    }
=======
>>>>>>> alma

    //funcion general para llenar los select
    function llenarCombo(data, control) {
        var contenido = "";
        contenido += "<option value='0'>--Seleccione--</option>";

<<<<<<< HEAD
}

=======
        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
        }
        control.innerHTML = contenido;
    }
>>>>>>> alma


}
