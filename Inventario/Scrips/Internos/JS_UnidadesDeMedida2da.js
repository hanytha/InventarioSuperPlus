
ConsultaUnidadDeMedida();
function ConsultaUnidadDeMedida() {
    $.get("/UnidadMedida/ConsultaUnidadDeMedidas", function (Data) {
        CrearTablaUnidadDeMedida(Data);
    }
    );
}
function CrearTablaUnidadDeMedida(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra += "<div class='table-responsive'>";
    CodigoHtmlTablaCompra += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaCompra += "<thead>";
    CodigoHtmlTablaCompra += "<tr>";
    CodigoHtmlTablaCompra += "<th>Unidad de Medida</th>";
    CodigoHtmlTablaCompra += "</tr>";
    CodigoHtmlTablaCompra += "</thead>";
    CodigoHtmlTablaCompra += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra += "<tr>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Unidad + "</td>";
        CodigoHtmlTablaCompra += "</td>";
        CodigoHtmlTablaCompra += "</tr>";
    }
    CodigoHtmlTablaCompra += "</tbody>";
    CodigoHtmlTablaCompra += "</table>";
    document.getElementById("tablaUnidadMedida").innerHTML = CodigoHtmlTablaCompra;
}


//---------------limpiar campos
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
function GuardarUnidadDeMedida() {
    if (CamposObligatoriosUnidades() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdUnidadDeMedida = sessionStorage.getItem('IDUnidad')
            var Unidad = document.getElementById("TxtUnidad").value;

            var frm = new FormData();
            frm.append("IdUnidadDeMedida", IdUnidadDeMedida);
            frm.append("Unidad", Unidad);
            frm.append("Estatus", 1);

            $.ajax({
                type: "POST",
                url: "/UnidadMedida/GuardarUnidadDeMedida",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡La unidad de medición ya existe!", "", "warning");
                    }
                    else {
                        swal("La unidad de medición se registró exitosamente!", "", "success");
                        ConsultaUnidadDeMedida();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}

//marca los campos obligatorios
function CamposObligatoriosUnidades() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("ObligatoriosUnidades");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}
