MostrarPaginas();
var imagen64;
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
        sessionStorage.setItem('IdPerfilDeUsuario', 0);
    }
    else {
        $.get("/Perfiles/ConsultaPerfil/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IdPerfilDeUsuario', Data[0].IdPerfilDeUsuario);     //Variable de sesión
            document.getElementById("TxtPerfil").value = Data[0].Perfil;
            document.getElementById("TxtNivel").value = Data[0].Nivel;
            document.getElementById("TxtPermisos").value = Data[0].Permisos;
            document.getElementById("TxtComentarios").value = Data[0].Comentarios;
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
function GuardarPerfil() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdPerfilDeUsuario = sessionStorage.getItem('IdPerfilDeUsuario');
            var Perfil = document.getElementById("TxtPerfil").value;
            var Nivel = document.getElementById("TxtNivel").value;
            var Permisos = document.getElementById("TxtPermisos").value;
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
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el proveedor");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        CrearAcordeonPerfil();
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
function EliminarPerfil(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {
        $.get("/Perfiles/EliminarPerfil/?IdPerfilDeUsuario=" + id, function (DatoPagina) {
            if (DatoPagina == 1) {
                // alert("Se eliminó correctamente");
                Swal.fire(
                    'Deleted!',
                    'Se elimino correctamente.',
                    'success'
                )
                //  confirmarEliminar();
                CrearAcordeonPerfil();
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
            CodigoHTMLPerfil += "<div class='col-md-6 col-sm-12 col-xs-12 justify-content-end'>";
            CodigoHTMLPagina += "<input type='checkbox' class = 'checkbox-area' id='" + Paginas[i].ID + "' ><span class='help-block text-muted small-font'>" + Paginas[i].Descripcion + "</span>";
            CodigoHTMLPagina += "</div>";
        }
        CodigoHTMLPagina += "</div>";
        document.getElementById("divPagina").innerHTML = codigoHtmlPagina;
    });
}





