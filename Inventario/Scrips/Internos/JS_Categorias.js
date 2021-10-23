ConsultaCategorias();
function ConsultaCategorias() {
    $.get("/Categoria/ConsultaCategorias", function (Data) {
        CrearTablaCategorias(Data);
    }
    );
}
function CrearTablaCategorias(Data) {
    var CodigoHtmlTablaCategoria = "";
    CodigoHtmlTablaCategoria  += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaCategoria += "<thead class='thead-dark'><tr><th>Clasificación</th><th>Acción</thead>";
    CodigoHtmlTablaCategoria  += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCategoria  += "<tr>";
        CodigoHtmlTablaCategoria  += "<td>" + Data[i].Tipo + "</td>";

        CodigoHtmlTablaCategoria  += "<td>";
        CodigoHtmlTablaCategoria += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdCategorias + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCategoria += "<button class='btn btn-danger' onclick='EliminarCategoria(" + Data[i].IdCategorias + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaCategoria  += "</td>";
        CodigoHtmlTablaCategoria  += "</tr>";
    }
    CodigoHtmlTablaCategoria  += "</tbody>";
    CodigoHtmlTablaCategoria  += "</table>";
    document.getElementById("tablaCategoria").innerHTML = CodigoHtmlTablaCategoria ;
}


//Limpia la información y carga la informacion de la compra
function editarModal(id) {//la clase AreaObligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("border-danger");//Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {

        LimpiarCampos();
        sessionStorage.setItem('IDCategoria', '0');
    }
    else {

        $.get("/Categoria/ConsultaCategoria/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDCategoria', Data[0].IdCategorias);

            document.getElementById("TxtClasificacion").value = Data[0].Tipo;
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

//Guarda los cambios y altas de las compras
function GuardarCategoria() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdCategorias = sessionStorage.getItem('IDCategoria')
            var Tipo = document.getElementById("TxtClasificacion").value;

            var frm = new FormData();
            frm.append("IdCategorias", IdCategorias);
            frm.append("Tipo", Tipo);
            frm.append("Estatus", 1);

            $.ajax({
                type: "POST",
                url: "/Categoria/GuardarCategoria",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe la clasificación");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        ConsultaCategorias();
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
            controlesObligatorio[i].classList.remove("error");
        }
    }
    return exito;
}

//"Elimina" la compra cambia el Estatus
function EliminarCategoria(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Categoria/EliminarCategoria/?Id=" + id, function (DatoCategoria) {
            if (DatoCategoria == 1) {
                alert("Se elimino correctamente");
                ConsultaCategorias();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}




