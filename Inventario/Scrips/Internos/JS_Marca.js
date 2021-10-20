ConsultaMarcas();
function ConsultaMarcas() {
    $.get("/Marca/ConsultaMarcas", function (Data) {
        CrearTablaMarcas(Data);
    }
    );
}
function CrearTablaMarcas(Data) {
    var CodigoHtmlTablaMarcas = "";
    CodigoHtmlTablaMarcas  += "<table id='tablas' class='table table table-sm'>";
    CodigoHtmlTablaMarcas  += "<thead><tr><th>Nombre</th><th>Acción</thead>";
    CodigoHtmlTablaMarcas  += "<tbody>";
    for (var i = 0; i < Data.length; i++) {
        CodigoHtmlTablaMarcas  += "<tr>";
        CodigoHtmlTablaMarcas  += "<td>" + Data[i].Nombre + "</td>";

        CodigoHtmlTablaMarcas  += "<td>";
        CodigoHtmlTablaMarcas += "<button class='btn btn-primary' onclick='editarModal(" + Data[i].IdMarca + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button>";
        CodigoHtmlTablaMarcas += "<button class='btn btn-danger' onclick='EliminarMarca(" + Data[i].IdMarca + ",this)'><i class='fas fa-eraser'></i></button>";

        CodigoHtmlTablaMarcas  += "</td>";
        CodigoHtmlTablaMarcas  += "</tr>";
    }
    CodigoHtmlTablaMarcas += "</tbody>";
    CodigoHtmlTablaMarcas  += "</table>";
    document.getElementById("tabla").innerHTML = CodigoHtmlTablaMarcas ;
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
        sessionStorage.setItem('IDMarca', '0');
    }
    else {

        $.get("/Marca/ConsultaMarca/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDMarca', Data[0].IdMarca);

            document.getElementById("TxtNombre").value = Data[0].Nombre;
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
function GuardarMarca() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdMarca = sessionStorage.getItem('IDMarca')
            var Nombre = document.getElementById("TxtNombre").value;

            var frm = new FormData();
            frm.append("IdMarca", IdMarca);
            frm.append("Nombre", Nombre);
            frm.append("Estatus", 1);

            $.ajax({
                type: "POST",
                url: "/Marca/GuardarMarca",
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
                        ConsultaMarcas();
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
function EliminarMarca(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Marca/EliminarMarca/?Id=" + id, function (DatoMarca) {
            if (DatoMarca == 1) {
                alert("Se elimino correctamente");
                ConsultaMarcas();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}




