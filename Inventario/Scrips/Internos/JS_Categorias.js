ConsultaCategorias();
function ConsultaCategorias() {
    $.get("/Categoria/ConsultaCategorias", function (Data) {
        CrearTablaCategorias(Data);
    }
    );
}
function CrearTablaCategorias(Data) {
    var CodigoHtmlTablaCategoria = "";
    CodigoHtmlTablaCategoria += "<br />";
    CodigoHtmlTablaCategoria += "<div class='table-responsive'>";
    CodigoHtmlTablaCategoria += "<table class='table-success table table-bordered order-table'>";
    CodigoHtmlTablaCategoria += "<thead>";
    CodigoHtmlTablaCategoria += "<tr>";
    CodigoHtmlTablaCategoria += "<th>Clasificación</th>";
    CodigoHtmlTablaCategoria += "<th>Acción</th>";
    CodigoHtmlTablaCategoria += "</tr>";
    CodigoHtmlTablaCategoria += "</thead>";
    CodigoHtmlTablaCategoria  += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCategoria  += "<tr>";
        CodigoHtmlTablaCategoria  += "<td>" + Data[i].Tipo + "</td>";

        CodigoHtmlTablaCategoria  += "<td>";
        CodigoHtmlTablaCategoria += "<button class='btn btn-success' onclick='editarModal(" + Data[i].IdCategorias + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCategoria += "<button class='btn btn-danger' onclick='EliminarCategoria(" + Data[i].IdCategorias + ",this)'><i class='far fa-trash-alt'></button>";

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
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡La clasificación ya existe!", "", "warning");
                    }
                    else {
                        swal("La clasificación se registró exitosamente!", "", "success");
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
                swal("La clasificación se eliminó exitosamente!", "", "success");
                ConsultaCategorias();
            } else {
                swal("¡Ocurrio un error!", "", "danger");
            }
        });
    }
}



//*******************************************************************************************
//not();
//function not() {

//        $.get("/Categoria/ConsultaNot", function (Data) {
//            CrearTablaCategorias(Data);
//        }
//        );
    
//    function CrearTablaCategorias(Data) {

//        for (var i = 0; i < Data.length; i++) {

//            if (Data[i].StockActual > 0) {
//                Push.create('Advertencia!', {
//                    body: '' + Data[i].Articulo + ' esta por agotarse ',
//                    icon: 'icon.png',

//                });
//            }
//            if (Data[i].StockActual == 0) {

//                Push.create('Advertencia!', {
//                    body: '' + Data[i].Articulo + ' ya no cuenta con stock ',
//                    icon: 'icon.png',

//                });

//            }
//        }

//    }

//}