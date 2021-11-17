MostrarPerfiles();
function MostrarPerfiles() {
    $.get("/Perfiles/ConsultaPefiles", function (Data) {
        CrearPaginas_Perfiles(Data);
    }
    );
}
/*

CrearAcordeonPerfil();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonPerfil() {
    $.get("/Perfiles/ConsultaPefiles", function (Data) {
        AcordeonPerfil(Data, document.getElementById("accordion"));
    });
}//Acordeón proveedores
function AcordeonPerfil(Data, CtrlPerfiles) {
    var CodigoHTMLPerfil = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLPerfil += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLPerfil += "<div class='card m-b-0 border-top'>";
        } //Obtener los registros de la base de datos para mostrarlo en el accordión
        CodigoHTMLPerfil += "<div class='card-header' id='heading" + Data[i].IdPerfilDeUsuario + "'>";
        CodigoHTMLPerfil += "<h5 class='mb-0'>";
        CodigoHTMLPerfil += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdPerfilDeUsuario + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdPerfilDeUsuario + "' class='collapsed'>";
        CodigoHTMLPerfil += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLPerfil += "<span >" + Data[i].Perfil + "</span>";
        CodigoHTMLPerfil += "</a>";
        CodigoHTMLPerfil += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLPerfil += "<div id='collapse" + Data[i].IdPerfilDeUsuario + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLPerfil += "<div class='card-body'>";
        CodigoHTMLPerfil += "<div class='row'>";
        CodigoHTMLPerfil += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nivel: </strong>" + Data[i].Nivel + "</div>";
        CodigoHTMLPerfil += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Permisos: </strong>" + Data[i].Permisos + "</div>";
        CodigoHTMLPerfil += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Comentarios: </strong>" + Data[i].Comentarios + "</div>";
        CodigoHTMLPerfil += "</div>";
        CodigoHTMLPerfil += "</div>";
        CodigoHTMLPerfil += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLPerfil += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdPerfilDeUsuario + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHTMLPerfil += "<button class='btn btn-danger' onclick='EliminarPerfil(" + Data[i].IdPerfilDeUsuario + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLPerfil += "</div>";
        CodigoHTMLPerfil += "</div>";
        CodigoHTMLPerfil += "</div>";
        CodigoHTMLPerfil += "</div>";
        CodigoHTMLPerfil += "</div>";
        CodigoHTMLPerfil += "</div>";
    }
    CtrlPerfiles.innerHTML = CodigoHTMLPerfil;
}*/
function CrearPaginas_Perfiles(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra += "<table id='tablas' class='table table table-sm' >";
    CodigoHtmlTablaCompra += " <thead class='thead-dark'><tr><th>Perfil</th><th>Nivel</th><th>Comentarios</th><th>Acción</thead>";
    CodigoHtmlTablaCompra += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra += "<tr>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Perfil + "</td>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Nivel + "</td>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Comentarios + "</td>";
        CodigoHtmlTablaCompra += "<td>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='abrirModal(" + Data[i].IdPerfilDeUsuario + ")' data-toggle='modal' data-target='#ModalSystem_Perfil'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarPerfil(" + Data[i].IdPerfilDeUsuario + ",this)'><i class='fas fa-eraser'></i></button>";
        CodigoHtmlTablaCompra += "</td>";
        CodigoHtmlTablaCompra += "</tr>";
    }
    CodigoHtmlTablaCompra += "</tbody>";
    CodigoHtmlTablaCompra += "</table>";
    document.getElementById("Paginas_Perfiles").innerHTML = CodigoHtmlTablaCompra;
}
//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    MostrarPaginas();
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IdPerfilDeUsuario', 0);
    }
    else {
        $.get("/Perfiles/ConsultaPerfil/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdPerfilDeUsuario', Data[0].IdPerfilDeUsuario);     //Variable de sesión
            document.getElementById("TxtPerfil").value = Data[0].Perfil;
            document.getElementById("TxtNivel").value = Data[0].Nivel;
            document.getElementById("TblPaginas").value = Data[0].Permisos;
            //Se recorre el checkbox de permisos, separando las opciones concatenadas y se activan las casillas guardados
            var activar = Data[0].Permisos.split('#');
            var ChevPermisos = document.getElementsByClassName("checkbox-area");
            for (let j = 0; j < activar.length; j++) {
                for (let i = 0; i < ChevPermisos.length; i++) {
                    if (ChevPermisos[i].id == activar[j]) {
                        ChevPermisos[i].checked = true;
                        break;
                    }
                }
            }
            document.getElementById("TxtComentarios").value = Data[0].Comentarios;
        });
    }
}
//Guarda los cambios y altas de los proveedores
function GuardarPerfil() {
    if (CamposObligatorios() == true) {
        var ChevPermisos = document.getElementsByClassName("checkbox-area");
        let seleccionados = "";
        for (let i = 0; i < ChevPermisos.length; i++) {
            if (ChevPermisos[i].checked == true) {
                seleccionados += ChevPermisos[i].id;
                seleccionados += "#";
            }
        }
        if (seleccionados == "") {
            alert("Rellene el checkbox");
        } else {
            if (confirm("¿Desea aplicar los cambios?") == 1) {
                var IdPerfilDeUsuario = sessionStorage.getItem('IdPerfilDeUsuario');
                var Perfil = document.getElementById("TxtPerfil").value;
                var Nivel = document.getElementById("TxtNivel").value;
                //  Se recorre el checkbox de permisos para buscar las casillas seleccionadas, se separan con "#" y se guardan en la base de datos
                var ChevPermisos = document.getElementsByClassName("checkbox-area");
                let seleccionados = "";
                for (let i = 0; i < ChevPermisos.length; i++) {
                    if (ChevPermisos[i].checked == true) {
                        seleccionados += ChevPermisos[i].id;
                        seleccionados += "#";
                    }
                }
                var Permisos = seleccionados.substring(0, seleccionados.length - 1);
                var Comentarios = document.getElementById("TxtComentarios").value;
                var frm = new FormData();
                frm.append("IdPerfilDeUsuario", IdPerfilDeUsuario);
                frm.append("Perfil", Perfil);
                frm.append("Nivel", Nivel);
                frm.append("Permisos", Permisos);
                frm.append("Comentarios", Comentarios);
                frm.append("Estatus", 1);
                $.ajax({
                    type: "POST",
                    url: "/Perfiles/GuardarPerfil",
                    data: frm,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == 0) {
                            //alert("Ocurrio un error");

                            alert("Ocurrio un error");

                        }
                        else if (data == -1) {
                            alert("Ya existe el perfil");
                        }
                        else {
                            alert("Se ejecuto correctamente");
                            MostrarPerfiles();
                            document.getElementById("btnCancelar").click();
                        }
                    }
                });
            }
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
function EliminarPerfil(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Perfiles/EliminarPerfil/?Id=" + id, function (DatoPagina) {
            if (DatoPagina == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se elimino correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                MostrarPerfiles();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}
function MostrarPaginas() {
    $.get("/Pagina/BDPagina", function (Paginas) {
        var codigoHtmlPagina = "";
        codigoHtmlPagina += "<div class='row'>";
        for (var i = 0; i < Paginas.length; i++) {
            codigoHtmlPagina += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            codigoHtmlPagina += "<input type='checkbox' class = 'checkbox-area' id='" + Paginas[i].ID + "' ><span class='help-block text-muted small-font' >" + Paginas[i].Descripcion + "</span>";
            codigoHtmlPagina += "</div>";
        }
        codigoHtmlPagina += "</div>";
        document.getElementById("TblPaginas").innerHTML = codigoHtmlPagina;
    });
}

