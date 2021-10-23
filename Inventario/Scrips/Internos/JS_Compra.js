ConsultaCompras();
function ConsultaCompras() {
    $.get("/Compra/ConsultaCompras", function (Data) {
        CrearTablaCompras(Data);
    }
    );
}
function CrearTablaCompras(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra  += "<table id='tablas' class='table'>";
    CodigoHtmlTablaCompra += "<thead class='thead-dark'><tr><th>Método de pago</th><th>Acción</thead>";
    CodigoHtmlTablaCompra  += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra  += "<tr>";
        CodigoHtmlTablaCompra  += "<td>" + Data[i].MetodoDePago + "</td>";

        CodigoHtmlTablaCompra  += "<td>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='editarModalCompra(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#ModalCompra'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarCompras(" + Data[i].IdCompra + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaCompra  += "</td>";
        CodigoHtmlTablaCompra  += "</tr>";
    }
    CodigoHtmlTablaCompra  += "</tbody>";
    CodigoHtmlTablaCompra  += "</table>";
    document.getElementById("tablaCompra").innerHTML = CodigoHtmlTablaCompra ;
}


//Limpia la información y carga la informacion de la compra
function editarModalCompra(id) {//la clase AreaObligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatoriox");
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
function LimpiarCampos(clase) {
    var controlesTXT = document.getElementsByClassName(clase);
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
    if (CamposObligatoriosX() == true) {
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

//verifica que los campos obligatorios tengas datos
function CamposObligatoriosX() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatoriox");
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


//----------------------------------------Impuesto-------------------------------------
ConsultaImpuesto();
function ConsultaImpuesto() {
    $.get("/Impuestos/ConsultaImpuestos", function (Data) {
        CrearTablaImpuesto(Data);
    }
    );
}
function CrearTablaImpuesto(Data) {
    var CodigoHtmlTablaCompra = "";
    CodigoHtmlTablaCompra += "<table id='tablas' class='table table table-sm' >";
    CodigoHtmlTablaCompra += " <thead class='thead-dark'><tr><th>Impuesto</th><th>Porcentaje</th><th>Acción</thead>";
    CodigoHtmlTablaCompra += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaCompra += "<tr>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Impuestos + "</td>";
        CodigoHtmlTablaCompra += "<td>" + Data[i].Porcentaje + "</td>";

        CodigoHtmlTablaCompra += "<td>";
        CodigoHtmlTablaCompra += "<button class='btn btn-primary' onclick='editarModalImpuestos(" + Data[i].IdImpuesto + ")' data-toggle='modal' data-target='#ModalImpuesto'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarImpuesto(" + Data[i].IdImpuesto + ",this)'><i class='fas fa-eraser'></i></button>";

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
function editarModalImpuestos(id) {//la clase AreaObligatorio
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
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el MetodoDePago");
                    }
                    else {
                        alert("Se ejecuto correctamente");
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

//"Elimina" la compra cambia el Estatus
function EliminarImpuesto(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Impuestos/EliminarImpuesto/?Id=" + id, function (DatoImpu) {
            if (DatoImpu == 1) {
                alert("Se elimino correctamente");
                ConsultaImpuesto();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}






//----------------------Unidades de medida-----------------------------------------------------
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
        CodigoHtmlTablaCompra += "<button class='btn btn-danger' onclick='EliminarUnidadDeMedida(" + Data[i].IdUnidadDeMedida + ",this)'><i class='fas fa-eraser'></i></button>";

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
