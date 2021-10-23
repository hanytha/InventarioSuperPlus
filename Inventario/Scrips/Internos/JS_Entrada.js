ConsultaEntradas();
function ConsultaEntradas() {
    $.get("/Entrada/ConsultaEntradas", function (Data) {
        CrearTablaEntradas(Data);
    }
    );
}
function CrearTablaEntradas(Data) {
    var CodigoHtmlTablaEntradas = "";
    CodigoHtmlTablaEntradas  += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaEntradas += "<thead><tr><th>Nombre Artículo</th><th>Cantidad</th><th>Acción</thead>";
    CodigoHtmlTablaEntradas  += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaEntradas  += "<tr>";
        CodigoHtmlTablaEntradas += "<td>" + Data[i].NombreArticulo + "</td>";
        CodigoHtmlTablaEntradas += "<td>" + Data[i].Cantidad + "</td>";

        CodigoHtmlTablaEntradas  += "<td>";
        CodigoHtmlTablaEntradas += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdEntradas + ")' data-toggle='modal' data-target='#ModalEntrada'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaEntradas += "<button class='btn btn-danger' onclick='EliminarEntrada(" + Data[i].IdEntradas + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaEntradas  += "</td>";
        CodigoHtmlTablaEntradas  += "</tr>";
    }
    CodigoHtmlTablaEntradas += "</tbody>";
    CodigoHtmlTablaEntradas  += "</table>";
    document.getElementById("tablaEntrada").innerHTML = CodigoHtmlTablaEntradas ;
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
        sessionStorage.setItem('IDEntra', '0');
    }
    else {

        $.get("/Entrada/ConsultaEntrada/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDEntra', Data[0].IdEntradas);

            document.getElementById("TxtNombreAr").value = Data[0].NombreArticulo;
            document.getElementById("TxtCantidad").value = Data[0].Cantidad;
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
function GuardarEntrada() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdEntradas = sessionStorage.getItem('IDEntra')
            var NombreArticulo = document.getElementById("TxtNombreAr").value;
            var Cantidad = document.getElementById("TxtCantidad").value;

            var frm = new FormData();
            frm.append("IdEntradas", IdEntradas);
            frm.append("NombreArticulo", NombreArticulo);
            frm.append("Cantidad", Cantidad);
            frm.append("Estatus", 1);

            $.ajax({
                type: "POST",
                url: "/Entrada/GuardarEntrada",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe Marca");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        ConsultaEntradas();
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
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}

//"Elimina" la compra cambia el Estatus
function EliminarEntrada(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Entrada/EliminarEntrada/?Id=" + id, function (DatoMarca) {
            if (DatoMarca == 1) {
                alert("Se elimino correctamente");
                ConsultaEntradas();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}




