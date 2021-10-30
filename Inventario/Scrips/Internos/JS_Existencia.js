LlenarCMBImpuesto();
CrearAcordeonExistencia();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonExistencia() {
    $.get("/Compra/ConsultasCompras", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonExistencia(Data, document.getElementById("accordion"));
    });
}
function AcordeonExistencia(Data, CtrlExt) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].IdCompra + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].IdCompra + "' aria-expanded='false' aria-controls='collapse" + Data[i].IdCompra + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].NoCompra + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdCompra + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre de el lider de tienda: </strong>" + Data[i].ClaveProveedor + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre encargado1: </strong>" + Data[i].MetodoDePago + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre encargado2: </strong>" + Data[i].FechaDeIngreso + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado3: </strong>" + Data[i].ExitenciaInicial + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre Axuliar1: </strong>" + Data[i].FechaFinal + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre Auxiliar2: </strong>" + Data[i].ExitenciaActual + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre Auxiliar3: </strong>" + Data[i].Coste + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre Auxiliar3: </strong>" + Data[i].Impuesto + "</div>";
        CodigoHTMLAreas += "</div>";
        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarCompra(" + Data[i].IdCompra + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlExt.innerHTML = CodigoHTMLAreas;
}



//Limpia la información y carga la informacion del proveedor
function abrirModal(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDExt', '0');

    }
    else {

        $.get("/Compra/ConsultaCompra/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDExt', Data[0].IdCompra);
            document.getElementById("TxtNoCompra").value = Data[0].NoCompra;
            document.getElementById("TxtMetodo").value = Data[0].MetodoDePago;
            document.getElementById("TxtClaveProveedor").value = Data[0].ClaveProveedor;
            document.getElementById("TxtFechaDeIngreso").value = Data[0].FechaDeIngreso;
            document.getElementById("TxtFechaFinal").value = Data[0].FechaFinal;
            document.getElementById("TxtExitenciaInicial").value = Data[0].ExitenciaInicial;
            document.getElementById("TxtExitenciaActual").value = Data[0].ExitenciaActual;
            document.getElementById("TxtCoste").value = Data[0].Coste;
            document.getElementById("cmbImpuesto").value = Data[0].IdImpuesto;
           
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


//Guarda los cambios y altas de las áreas
function GuardarCompra() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdCompra = sessionStorage.getItem('IDExt');
            var NoCompra = document.getElementById("TxtNoCompra").value;
            var MetodoDePago = document.getElementById("TxtMetodo").value;
            var ClaveProveedor = document.getElementById("TxtClaveProveedor").value;
            var FechaDeIngreso = document.getElementById("TxtFechaDeIngreso").value;
            var FechaFinal = document.getElementById("TxtFechaFinal").value;
            var ExitenciaInicial = document.getElementById("TxtExitenciaInicial").value;
            var ExitenciaActual = document.getElementById("TxtExitenciaActual").value;
            var Coste = document.getElementById("TxtCoste").value;

            var IdImpuesto = document.getElementById("cmbImpuesto").value;
            var TempEdo = document.getElementById("cmbImpuesto");
            var Impuesto = TempEdo.options[TempEdo.selectedIndex].text;

            var frm = new FormData();
            frm.append("IdCompra", IdCompra);
            frm.append("NoCompra", NoCompra);
            frm.append("MetodoDePago", MetodoDePago);
            frm.append("ClaveProveedor", ClaveProveedor);
            frm.append("FechaDeIngreso", FechaDeIngreso);
            frm.append("FechaFinal", FechaFinal);
            frm.append("ExitenciaInicial", ExitenciaInicial);
            frm.append("ExitenciaActual", ExitenciaActual);
            frm.append("Coste", Coste);
            frm.append("IdImpuesto", IdImpuesto);
            frm.append("Impuesto", Impuesto);


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
                        alert("Ya existe el número de compra");
                    }
                    else {
                        alert("Se ejecuto correctamente");

                        CrearAcordeonExistencia();
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



//"Elimina" el área cambia el Estatus
function EliminarCompra(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Compra/EliminarCompra/?Id=" + id, function (DatoTienda) {
            if (DatoTienda == 1) {
                alert("Se elimino correctamente");

                CrearAcordeonExistencia();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}

function LlenarCMBImpuesto() {
    $.get("/GLOBAL/BDImpuesto", function (data) {
        llenarCombo(data, document.getElementById("cmbImpuesto"));
    });

    //funcion general para llenar los select
    function llenarCombo(data, control) {
        var contenido = "";
        contenido += "<option value='0'>--Seleccione--</option>";

        for (var i = 0; i < data.length; i++) {
            contenido += "<option value='" + data[i].ID + "'>" + data[i].Nombre + "</option>";
        }
        control.innerHTML = contenido;
    }


}