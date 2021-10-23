LlenarCMB();

var imagen64;
CrearAcordeonPagina();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonPagina() {
    $.get("/Pagina/ConsultaPaginas", function (Data) {
        AcordeonPagina(Data, document.getElementById("accordion"));
    });
    imagen64 = getBase64Image(document.getElementById("PBFoto"));
}//Acordeón proveedores
function AcordeonPagina(Data, CtrlProveedores) {
    var CodigoHTMLPagina = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLPagina += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLPagina += "<div class='card m-b-0 border-top'>";
        } //Obtener los registros de la base de datos para mostrarlo en el accordión
        CodigoHTMLPagina += "<div class='card-header' id='heading" + Data[i].IdPagina + "'>";
        CodigoHTMLPagina += "<h5 class='mb-0'>";
        CodigoHTMLPagina += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdPagina + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdPagina + "' class='collapsed'>";
        CodigoHTMLPagina += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLPagina += "<span >" + Data[i].Mensaje + "</span>";
        CodigoHTMLPagina += "</a>";
        CodigoHTMLPagina += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLPagina += "<div id='collapse" + Data[i].IdPagina + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLPagina += "<div class='card-body'>";
        CodigoHTMLPagina += "<div class='row'>";
        CodigoHTMLPagina += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Mensaje: </strong>" + Data[i].Accion + "</div>";
        CodigoHTMLPagina += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Controlador: </strong>" + Data[i].Controlador + "</div>";
        CodigoHTMLPagina += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Icono: </strong>" + Data[i].Icono + "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "<div class='row'>";
        CodigoHTMLPagina += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Descripcion: </strong>" + Data[i].Descripcion + "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLPagina += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdPagina + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHTMLPagina += "<button class='btn btn-danger' onclick='EliminarPagina(" + Data[i].IdPagina + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
        CodigoHTMLPagina += "</div>";
    }
    CtrlProveedores.innerHTML = CodigoHTMLPagina;
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
        sessionStorage.setItem('IdPagina', 0);
    }
    else {
        $.get("/Pagina/ConsultaPag/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdPagina', Data[0].IdPagina);     //Variable de sesión
            document.getElementById("TxtAccion").value = Data[0].Accion;
            document.getElementById("TxtMensaje").value = Data[0].Mensaje;
            document.getElementById("TxtControlador").value = Data[0].Controlador;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;
            document.getElementById("cmbTipo").value = Data[0].Tipo;
            document.getElementById("cmbPadre").value = Data[0].Padre;
            document.getElementById("TxtIconos").value = Data[0].Icono;
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


function LlenarCMB() {
 
    $.get("/Pagina/BDPagina", function (data) {
        llenarCombo(data, document.getElementById("cmbPadre"), true);
    });
}




function llenarComboPaginas(data, control, primerElemento) {
    var contenido = "";
    if (primerElemento == true) {
        contenido += "<option value=''>--Seleccione--</option>";
    }
    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Mensaje + "</option>";
    }
    control.innerHTML = contenido;
}




function llenarCombo(data, control) {
    var contenido = "";
    contenido += "<option value='0'>--Seleccione--</option>";

    for (var i = 0; i < data.length; i++) {
        contenido += "<option value='" + data[i].ID + "'>" + data[i].Mensaje + "</option>";
    }
    control.innerHTML = contenido;
}
//Guarda los cambios y altas de los proveedores
function GuardarPagina() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdPagina = sessionStorage.getItem('IdPagina');
            var Accion = document.getElementById("TxtAccion").value;
            var Mensaje = document.getElementById("TxtMensaje").value;

            var Controlador = document.getElementById("TxtControlador").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;
          
           // var Padre = document.getElementById("cmbTipo").value;
            var Icono = document.getElementById("TxtIconos").value;
            var frm = new FormData();
            frm.append("IdPagina", IdPagina);
            frm.append("Accion", Accion);
            frm.append("Mensaje", Mensaje);
            frm.append("Controlador", Controlador);
            frm.append("Descripcion", Descripcion);
            frm.append("Icono", Icono);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Pagina/GuardarPagina",
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
                        CrearAcordeonPagina();
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
function EliminarPagina(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Pagina/EliminarPagina/?IdPagina=" + id, function (DatoPagina) {
            if (DatoPagina == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se elimino correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                CrearAcordeonPagina();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}








