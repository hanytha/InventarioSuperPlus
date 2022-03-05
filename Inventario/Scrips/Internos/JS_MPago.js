ConsultaCategorias();
function ConsultaCategorias() {
    $.get("/MPago/ConsultaPagos", function (Data) {
        CrearTablaCategorias(Data);
    }
    );
}
function CrearTablaCategorias(Data) {
    var CodigoHtmlTablaCategoria = "";
    CodigoHtmlTablaCategoria = "<br />";
    CodigoHtmlTablaCategoria += "<div class='table-responsive'>";
    CodigoHtmlTablaCategoria += "<table class='table-info table table-bordered order-table'>";
    CodigoHtmlTablaCategoria += "<thead>";
    CodigoHtmlTablaCategoria += "<tr>";
    CodigoHtmlTablaCategoria += "<th>Método de pago</th>";
    CodigoHtmlTablaCategoria += "<th>Descripción de pago</th>";
    CodigoHtmlTablaCategoria += "<th>Acción</th>";
    CodigoHtmlTablaCategoria += "</tr>";
    CodigoHtmlTablaCategoria += "</thead>";
    CodigoHtmlTablaCategoria += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCategoria += "<tr>";
        CodigoHtmlTablaCategoria += "<td>" + Data[i].MetodoPago1 + "</td>";
        CodigoHtmlTablaCategoria += "<td>" + Data[i].Descripcion + "</td>";

        CodigoHtmlTablaCategoria += "<td>";
        CodigoHtmlTablaCategoria += "<button class='btn btn-info' onclick='editarModal(" + Data[i].IdMetodoPago + ")' data-toggle='modal' data-target='#ModalCategoria'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCategoria += "<button class='btn btn-danger' onclick='EliminarMPago(" + Data[i].IdMetodoPago + ",this)'><i class='far fa-trash-alt'></button>";

        CodigoHtmlTablaCategoria += "</td>";
        CodigoHtmlTablaCategoria += "</tr>";
    }
    CodigoHtmlTablaCategoria += "</tbody>";
    CodigoHtmlTablaCategoria += "</table>";
    document.getElementById("tablaCategoria").innerHTML = CodigoHtmlTablaCategoria;
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
        sessionStorage.setItem('IdMetodoPago', '0');
    }
    else {

        $.get("/MPago/ConsultaPago/?Id=" + id, function (Data) {
            sessionStorage.setItem('IdMetodoPago', Data[0].IdMetodoPago);

            document.getElementById("TxtMPago").value = Data[0].MetodoPago1;
            document.getElementById("TxtDescripcion").value = Data[0].Descripcion;

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
function GuardarMPago() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdMetodoPago = sessionStorage.getItem('IdMetodoPago')
            var MetodoPago1 = document.getElementById("TxtMPago").value;
            var Descripcion = document.getElementById("TxtDescripcion").value;

            var frm = new FormData();
            frm.append("IdMetodoPago", IdMetodoPago);
            frm.append("MetodoPago1", MetodoPago1);
            frm.append("Descripcion", Descripcion);
            frm.append("Estatus", 1);

            $.ajax({
                type: "POST",
                url: "/MPago/GuardarMPago",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡El método de pago ya existe!", "", "warning");
                    }
                    else {
                        swal("El método de pago se registró exitosamente!", "", "success");
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
function EliminarMPago(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/MPago/EliminarMPago/?Id=" + id, function (DatoCategoria) {
            if (DatoCategoria == 1) {
                swal("El método de pago se eliminó exitosamente!", "", "success");
                ConsultaCategorias();
            } else {
                swal("¡Ocurrio un error!", "", "danger");
            }
        });
    }
}




