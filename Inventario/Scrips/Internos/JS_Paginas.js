BloquearCTRL();
//MostrarPaginas();
//function MostrarPaginas() {
//    $.get("/Configuracion/BDPaginas", function (InfPaginas) {
//        CrearTablaPaginas(InfPaginas);
//    }
//    );
//}
////Inserta la tabla de las páginas
//function CrearTablaPaginas(InfPaginas) {
//    var CodigoHtmlTablaPagina = "";
//    CodigoHtmlTablaPagina += "<table id='tablas' class='table'>";
//    CodigoHtmlTablaPagina += "<thead><tr><th>Mensaje</th><th>Accion</th><th>Controlador</th><th>Icono</th><th>Opciones</th></tr></thead>";
//    CodigoHtmlTablaPagina += "<tbody>";
//    for (var i = 0; i < InfPaginas.length; i++) {
//        CodigoHtmlTablaPagina += "<tr>";
//        CodigoHtmlTablaPagina += "<td>" + InfPaginas[i].Nombre + "</td>";
//        CodigoHtmlTablaPagina += "<td>" + InfPaginas[i].Accion + "</td>"
//        CodigoHtmlTablaPagina += "<td> " + InfPaginas[i].Controlador + "</td>"
//        CodigoHtmlTablaPagina += "<td><i class='" + InfPaginas[i].Icono + "'></i></td> ";
//        CodigoHtmlTablaPagina += "<td>";
//        CodigoHtmlTablaPagina += "<button id='BtnAbrirMPag' class='btn btn-primary' onclick='AModalPaginas(" + InfPaginas[i].ID + ")' data-toggle='modal' data-target='#ModalSystem_Pagina' ><i class='fas fa-edit'></i></button>";
//        CodigoHtmlTablaPagina += "<button class='btn btn-danger' onclick='EliminarPagina(" + InfPaginas[i].ID + ",this)'><i class='fas fa-eraser'></i></button>";
//        CodigoHtmlTablaPagina += "</td>";
//        CodigoHtmlTablaPagina += "</tr>";
//    }
//    CodigoHtmlTablaPagina += "</tbody>";
//    CodigoHtmlTablaPagina += "</table>";
//    document.getElementById("Paginas").innerHTML = CodigoHtmlTablaPagina;
//}
MostrarPaginas();
function MostrarPaginas() {
    $.get("/Configuracion/BDPaginas", function (Data) {
        CrearTablaPaginas(Data);
    }
    );
}
function CrearTablaPaginas(Data) {
    var CodigoHtmlTablaPagina = "";
    CodigoHtmlTablaPagina += "<div class='input-group mb-3 float-right '>";
    CodigoHtmlTablaPagina += "<input  class='form-control col-md-4 light-table-filter' data-table='order-table' type='text' placeholder='Buscar..'>"
    CodigoHtmlTablaPagina += "<span  class='input-group-text' id='basic-addon1'><i class='fas fa-search'></i></span>";
    CodigoHtmlTablaPagina += "</div>";
    CodigoHtmlTablaPagina += "<div class='table-responsive'>";
    CodigoHtmlTablaPagina += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaPagina += "<thead>";
    CodigoHtmlTablaPagina += "<tr>";
    CodigoHtmlTablaPagina += "<th>Mensaje</th>";
    CodigoHtmlTablaPagina += "<th>Accion</th>";
    CodigoHtmlTablaPagina += "<th>Controlador</th>";
    CodigoHtmlTablaPagina += "<th>Ícono</th>";
    CodigoHtmlTablaPagina += "<th>Opciones</th>";
    CodigoHtmlTablaPagina += "</tr>";
    CodigoHtmlTablaPagina += "</thead>";
    CodigoHtmlTablaPagina += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaPagina += "<tr>";
        CodigoHtmlTablaPagina += "<td>" + Data[i].Nombre + "</td>";
        CodigoHtmlTablaPagina += "<td>" + Data[i].Accion + "</td>";
        CodigoHtmlTablaPagina += "<td>" + Data[i].Controlador + "</td>";
        CodigoHtmlTablaPagina += "<td><i class='" + Data[i].Icono + "'style='font - size: 100px; color: dodgerblue;'></i></td> ";
        CodigoHtmlTablaPagina += "<td>";
        CodigoHtmlTablaPagina += "<button class='btn btn-primary' onclick='AModalPaginas(" + Data[i].ID + ")' data-toggle='modal' data-target='#ModalSystem_Pagina'><i class='fas fa-edit'></i></button> ";
        CodigoHtmlTablaPagina += "<button class='btn btn-danger' onclick='EliminarPagina(" + Data[i].ID + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHtmlTablaPagina += "</td>";
        CodigoHtmlTablaPagina += "</tr>";
    }
    CodigoHtmlTablaPagina += "</tbody>";
    CodigoHtmlTablaPagina += "</table>";
    document.getElementById("Paginas").innerHTML = CodigoHtmlTablaPagina;
}
function BloquearCTRL() {
    var CTRL = document.getElementsByClassName("bloquear");
    for (var i = 0; i < CTRL.length; i++) {
        $("#" + CTRL[i].id).attr('disabled', 'disabled');
    }
}
//limpia y llenas los campor del modal si es para la edición
function AModalPaginas(ID) {
    var controlesObligatorio = document.getElementsByClassName("PaginaObligatorio");
    var ncontroles = controlesObligatorio.length;
    Limpiar();
    for (var i = 0; i < ncontroles; i++) {
        controlesObligatorio[i].parentNode.classList.remove("border-danger");
    }
    if (ID == 0) {
        sessionStorage.setItem('IdPag', '0');
    }
    else {
        $.get("/Configuracion/BDPagina/?ID=" + ID, function (DatosPagina) {
            //document.getElementById("TxtIDPagina").value = DatosPagina[0].ID;
            sessionStorage.setItem('IdPag', DatosPagina[0].ID);
            document.getElementById("TxtMensaje").value = DatosPagina[0].Nombre;
            document.getElementById("TxtAccion").value = DatosPagina[0].Accion;
            document.getElementById("TxtControlador").value = DatosPagina[0].Controlador;
            document.getElementById("TxtIcono").value = DatosPagina[0].Icono;
            document.getElementById("TxtDescripcion").value = DatosPagina[0].Descripcion;
        });
    }
}
//Guarda los cambios o la nuevas áreas
function GuardarPagina() {
    if (ObligatoriosPagina() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdPagina = sessionStorage.getItem('IdPag');
            //var IDPagina = document.getElementById("TxtIDPagina").value;
            var Mensaje = document.getElementById("TxtMensaje").value;
            var Accion = document.getElementById("TxtAccion").value;
            var Controlador = document.getElementById("TxtControlador").value;
            var Icono = document.getElementById("TxtIcono").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;
            var frm = new FormData();
            frm.append("IdPagina", IdPagina);
            frm.append("Mensaje", Mensaje);
            frm.append("Accion", Accion);
            frm.append("Controlador", Controlador);
            frm.append("Icono", Icono);
            frm.append("Descripcion", Descripcion);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Configuracion/GuardarPagina",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrió un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe la página");
                    }
                    else {
                        alert("Se guardaron los datos correctamente.");
                        MostrarPaginas();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}
//verifica que los campos obligatorios tengas datos
function ObligatoriosPagina() {
    let exito = true;
    let CtrlObligatorio = document.getElementsByClassName("PaginaObligatorio");
    for (let i = 0; i < CtrlObligatorio.length; i++) {
        if (CtrlObligatorio[i].value == "") {
            exito = false;
            //CtrlObligatorio[i].classList.remove("border");
            CtrlObligatorio[i].classList.add("border-danger");
        }
        else {
            CtrlObligatorio[i].classList.remove("border-danger");
            //CtrlObligatorio[i].classList.add("border");
        }
    }
    return exito;
}
//"Elimina" el área cambia el Estatus
function EliminarPagina(id) {
    if (confirm("¿Desea eliminar el registo?") == 1) {
        $.get("/Configuracion/EliminarPagina/?IdPagina=" + id, function (Pagina) {
            if (Pagina == 1) {
                Swal.fire(
                    'Deleted!',
                    'Se eliminó correctamente.',
                    'success'
                )
                MostrarPaginas();
            } else {
                alert("Ocurrió un error");
            }
        });
    }
}
//****************************************************************************************************************************************************************************************************
function Limpiar() {
    var controles = document.getElementsByClassName("limpiar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}