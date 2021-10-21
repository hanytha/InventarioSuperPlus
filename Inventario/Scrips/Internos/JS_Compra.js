ConsultaCompras();
function ConsultaCompras() {
    $.get("/Compra/ConsultaCompras", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra  += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaCompra  += "<thead><tr><th>Método de pago</th><th>Acción</thead>";
    CodigoHtmlTablaCompra  += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra  += "<tr>";
        CodigoHtmlTablaCompra  += "<td>" + Data[i].MetodoDePago + "</td>";

        CodigoHtmlTablaCompra  += "<td>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarCompras(" + Data[i].IdCompra + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaCompra  += "</td>";
        CodigoHtmlTablaCompra  += "</tr>";
    }
    CodigoHtmlTablaCompra  += "</tbody>";
    CodigoHtmlTablaCompra  += "</table>";
    document.getElementById("tabla").innerHTML = CodigoHtmlTablaCompra ;
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
        sessionStorage.setItem('IDMetodoP', '0');
    }
    else {

        $.get("/Compra/ConsultaCompra/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDMetodoP', Data[0].IdCompra);

            document.getElementById("TxtMetodoDePago").value = Data[0].MetodoDePago;
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
function GuardarCompra() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdCompra = sessionStorage.getItem('IDMetodoP')
            var MetodoDePago = document.getElementById("TxtMetodoDePago").value;

            var frm = new FormData();
            frm.append("IdCompra", IdCompra);
            frm.append("MetodoDePago", MetodoDePago);
            frm.append("Estatus", 1);

            $.ajax({
                type: "POST",
                url: "/Compra/GuardarCompra",
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
                        ConsultaCompras();
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
function EliminarCompras(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Compra/EliminarCompra/?Id=" + id, function (DatoCompra) {
            if (DatoCompra == 1) {
                alert("Se elimino correctamente");
                ConsultaCompras();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


//----------------Validación Formulario Compra-------------------------
function validarFormularioCompra() {

    var TxtMetodoDePago = document.getElementById('TxtMetodoDePago').value;

    //Test campo obligatorio
    if (TxtMetodoDePago == null || TxtMetodoDePago.length == 0 || /^\s+$/.test(TxtMetodoDePago)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }

    return true;
}

