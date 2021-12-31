﻿ConsultaImpuesto();
function ConsultaImpuesto() {
    $.get("/Impuestos/ConsultaImpuestos", function (Data) {
        CrearTablaImpuesto(Data);
    }
    );
}
function CrearTablaImpuesto(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra += "<div class='table-responsive'>";
    CodigoHtmlTablaCompra += "<table class='table-primary table table-bordered order-table'>";
    CodigoHtmlTablaCompra += "<thead>";
    CodigoHtmlTablaCompra += "<tr>";
    CodigoHtmlTablaCompra += "<th>Impuesto</th>";
    CodigoHtmlTablaCompra += "<th>Porcentaje</th>";
    CodigoHtmlTablaCompra += "<th>Acción</th>";
    CodigoHtmlTablaCompra += "</tr>";
    CodigoHtmlTablaCompra += "</thead>";
    CodigoHtmlTablaCompra += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra += "<tr>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Impuestos + "</td>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Porcentaje + "</td>";

        CodigoHtmlTablaCompra += "<td>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdImpuesto + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompra += "</td>";
        CodigoHtmlTablaCompra += "</tr>";
    }
    CodigoHtmlTablaCompra += "</tbody>";
    CodigoHtmlTablaCompra += "</table>";
    document.getElementById("tablaImpuesto").innerHTML = CodigoHtmlTablaCompra;
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
//Limpia la información y carga la informacion de la compra
function editarModal(id) {//la clase AreaObligatorio
    var controlesObligatorio = document.getElementsByClassName("ObligatoriosImpuestos");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("border-danger");//Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {

        LimpiarCampos();
        sessionStorage.setItem('IDImpuest', '0');
    }
    else {

        $.get("/Impuestos/ConsultaImpuesto/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDImpuest', Data[0].IdImpuesto);
            document.getElementById("TxtImpuesto").value = Data[0].Impuestos;
            document.getElementById("TxtPorcentaje").value = Data[0].Porcentaje;
        });
    }
}


//Guarda los cambios y altas de los impuestos
function GuardarImpuesto() {
    if (CamposObligatoriosImpuestos() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdImpuesto = sessionStorage.getItem('IDImpuest')
            var Impuestos = document.getElementById("TxtImpuesto").value;
            var Porcentaje = document.getElementById("TxtPorcentaje").value;

            var frm = new FormData();
            frm.append("IdImpuesto", IdImpuesto);
            frm.append("Impuestos", Impuestos);
            frm.append("Porcentaje", Porcentaje);
            frm.append("Estatus", 1);

            $.ajax({
                type: "POST",
                url: "/Impuestos/GuardarImpuesto",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        swal("¡Ocurrio un error!", "", "danger");
                    }
                    else if (data == -1) {
                        swal("¡El impuesto ya existe!", "", "warning");
                    }
                    else {
                        swal("El impuesto se registró exitosamente!", "", "success");
                        ConsultaImpuesto();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}

//marca los campos obligatorios
function CamposObligatoriosImpuestos() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("ObligatoriosImpuestos");
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


