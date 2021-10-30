
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
        CodigoHTMLAreas += "<span >" + Data[i].MetodoDePago + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].IdCompra + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre de el lider de tienda: </strong>" + Data[i].ClaveProveedor + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre encargado1: </strong>" + Data[i].NoCompra + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre encargado2: </strong>" + Data[i].FechaDeIngreso + "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre encargado3: </strong>" + Data[i].ExitenciaInicial + "</div>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Nombre Axuliar1: </strong>" + Data[i].FechaFinal + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre Auxiliar2: </strong>" + Data[i].ExitenciaActual + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Nombre Auxiliar3: </strong>" + Data[i].Coste + "</div>";
     
        CodigoHTMLAreas += "</div>";
        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].IdCompra + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarTienda(" + Data[i].IdCompra + ",this)' ><i class='fas fa-eraser'></i></button>";
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
        sessionStorage.setItem('IDTiend', '0');

    }
    else {

        $.get("/Tienda/ConsultaTienda/?Id=" + id, function (Data) {
            sessionStorage.setItem('IDTiend', Data[0].IdTienda);
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("TxtCodigoPostal").value = Data[0].CP;
            document.getElementById("TxtNumeroTelefono").value = Data[0].Telefono;
            document.getElementById("TxtHoraApertura").value = Data[0].HApertura;
            document.getElementById("TxtHoraCierre").value = Data[0].HCierre;
            document.getElementById("cmbSupervision").value = Data[0].IdSupervision;
            document.getElementById("TxtAux1").value = Data[0].A1Nombre;
            document.getElementById("TxtAux2").value = Data[0].A2Nombre;
            document.getElementById("TxtAux3").value = Data[0].A3Nombre;
           
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
function GuardarTienda() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdTienda = sessionStorage.getItem('IDTiend');
            var Nombre = document.getElementById("TxtNombre").value;
            var CP = document.getElementById("TxtCodigoPostal").value;
            var Telefono = document.getElementById("TxtNumeroTelefono").value;
            var HApertura = document.getElementById("TxtHoraApertura").value;
            var HCierre = document.getElementById("TxtHoraCierre").value;
            var IdSupervision = document.getElementById("cmbSupervision").value;
            var TempSuper = document.getElementById("cmbSupervision");
            var Unombre = TempSuper.options[TempSuper.selectedIndex].text;  
            var LNombre = document.getElementById("TxtLider").value;
            var E1Nombre = document.getElementById("TxtEncargado1").value;
            var E2Nombre = document.getElementById("TxtEncargado2").value;
            var E3Nombre = document.getElementById("TxtEncargado3").value;
            var A1Nombre = document.getElementById("TxtAux1").value;
            var A2Nombre = document.getElementById("TxtAux2").value;
            var A3Nombre = document.getElementById("TxtAux3").value;
            var frm = new FormData();
            frm.append("IdTienda", IdTienda);
            frm.append("Nombre", Nombre);
            frm.append("Unombre", Unombre);
            frm.append("LNombre", LNombre);
            frm.append("E1Nombre", E1Nombre);
            frm.append("E2Nombre", E2Nombre);
            frm.append("E3Nombre", E3Nombre);
            frm.append("A1Nombre", A1Nombre);
            frm.append("A2Nombre", A2Nombre);
            frm.append("A3Nombre", A3Nombre);



            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Tienda/GuardarTienda",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el Tienda");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        CrearAcordeonTienda();
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
function EliminarTienda(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Tienda/EliminarTienda/?Id=" + id, function (DatoTienda) {
            if (DatoTienda == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonTienda();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}

