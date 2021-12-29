

ConsultaUnidadDeMedida();
function ConsultaUnidadDeMedida() {
    $.get("/UnidadMedida/ConsultaUnidadDeMedidas", function (Data) {
        CrearTablaUnidadDeMedida(Data);
    }
    );
}
function CrearTablaUnidadDeMedida(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaCompra += "<thead class='thead-dark'><tr><th>Unidad de Medida</th><th>Acción</thead>";
    CodigoHtmlTablaCompra += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra += "<tr>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Unidad + "</td>";

        CodigoHtmlTablaCompra += "<td>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdUnidadDeMedida + ")' data-toggle='modal' data-target='#ModalUnidad'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarUnidadDeMedida(" + Data[i].IdUnidadDeMedida + ",this)'><i class='far fa-trash-alt'></i></button>";

        CodigoHtmlTablaCompra += "</td>";
        CodigoHtmlTablaCompra += "</tr>";
    }
    CodigoHtmlTablaCompra += "</tbody>";
    CodigoHtmlTablaCompra += "</table>";
    document.getElementById("tablaUnidadMedida").innerHTML = CodigoHtmlTablaCompra;
}


//Limpia la información y carga la informacion de la compra
function editarModal(id) {//la clase AreaObligatorio
    var controlesObligatorio = document.getElementsByClassName("ObligatoriosUnidades");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        controlesObligatorio[i].parentNode.classList.remove("border-danger");//Cambia los bordes lo las casillas a color rojo
    }
    if (id == 0) {

        LimpiarCampos();
        sessionStorage.setItem('IDUnidad', '0');
    }
    else {

        $.get("/UnidadMedida/ConsultaUnidadDeMedida/?Id=" + id, function (Data) {

            sessionStorage.setItem('IDUnidad', Data[0].IdUnidadDeMedida);
            document.getElementById("TxtUnidad").value = Data[0].Unidad;
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
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el MetodoDePago");
                    }
                    else {
                        alert("Se ejecuto correctamente");
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

//"Elimina" la compra cambia el Estatus
function EliminarUnidadDeMedida(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/UnidadMedida/EliminarUnidadDeMedida/?Id=" + id, function (DatoUni) {
            if (DatoUni == 1) {
                alert("Se elimino correctamente");
                ConsultaUnidadDeMedida();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}

