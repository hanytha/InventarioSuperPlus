CrearAcordeonExistenciasAlmacen();
//Crea el acordeón e inserta (los registros de la base de datos)
function CrearAcordeonExistenciasAlmacen() {
    $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacenes", function (Data) {
        //Accordeon(DatosProveedor, document.getElementById("accordion"));
        AcordeonExistenciasAlmacen(Data, document.getElementById("accordion"));
    });
}
function AcordeonExistenciasAlmacen(Data, CtrlAlmacen) {
    var CodigoHTMLAreas = "";
    for (var i = 0; i < Data.length; i++) {
        if (i < 1) {
            CodigoHTMLAreas += "<div class='card m-b-0'>";
        }
        else {
            CodigoHTMLAreas += "<div class='card m-b-0 border-top'>";
        }
        CodigoHTMLAreas += "<div class='card-header' id='heading" + Data[i].Id + "'>";
        CodigoHTMLAreas += "<h5 class='mb-0'>";
        CodigoHTMLAreas += "<a  data-toggle='collapse' data-target='#collapse" + Data[i].Id + "' aria-expanded='false' aria-controls='collapse" + Data[i].Id + "' class='collapsed'>";
        //CodigoHTMLAreas += "<i class='m-r-5 mdi mdi-store' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<i class='m-r-5 fas fa-clipboard-list' aria-hidden='true'></i>";
        CodigoHTMLAreas += "<span >" + Data[i].NoPedido + "</span>";
        CodigoHTMLAreas += "</a>";
        CodigoHTMLAreas += "</h5>";
        //En el data-parent se modifica para que se de un solo clic y se oculten los demás
        CodigoHTMLAreas += "<div id='collapse" + Data[i].Id + "' class='collapse' aria-labelledby='headingOne' data-parent='#collapse' style=''>";
        CodigoHTMLAreas += "<div class='card-body'>";
        CodigoHTMLAreas += "<div class='row'>";
        CodigoHTMLAreas += "<div class='col-md-5 col-sm-6 col-xs-6'><strong>Correo: </strong>" + Data[i].ExitenciaInicial + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Giro del Proveedor: </strong>" + Data[i].ExitenciaActual + "</div>";
        CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Municipio: </strong>" + Data[i].Coste + "</div>";
        CodigoHTMLAreas += "</div>";

        //  CodigoHTMLAreas += "<div class='col-md-7 col-sm-6 col-xs-6'><strong>Dirección: </strong>" + DatosProveedor[i].Direccion + "</div>";


        //CodigoHTMLAreas += "<button class='btn btn-info' onclick='MostrarOcultar(" + DatosProveedor[i].ID + ")'><i id='BtnMO" + DatosProveedor[i].Id + "' class='fas fa-chevron-circle-down'></i></button></div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "<div class='col-md-12 col-sm-12 col-xs-12 align-self-end'>";
        CodigoHTMLAreas += "<button class='btn btn-success' onclick='abrirModal(" + Data[i].Id + ")' data-toggle='modal' data-target='#dialogo1'><i class='fas fa-edit'></i></button> ";
        CodigoHTMLAreas += "<button class='btn btn-danger' onclick='EliminarExistenciasG(" + Data[i].Id + ",this)' ><i class='fas fa-eraser'></i></button>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
        CodigoHTMLAreas += "</div>";
    }
    CtrlAlmacen.innerHTML = CodigoHTMLAreas;
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
        sessionStorage.setItem('IDGeneral', '0');
      
    }
    else {

        $.get("/ExistenciaAlmacen/ConsultaExistenciaAlmacen/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDGeneral', Data[0].Id);
            document.getElementById("TxtNumCompra").value = Data[0].NoPedido;
            document.getElementById("TxtExistenciaInicial").value = Data[0].ExitenciaInicial;
            document.getElementById("TxtExistenciaActual").value = Data[0].ExitenciaActual;
            document.getElementById("TxtCosto").value = Data[0].Coste;

           
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
function GuardarAlmacen() {
    if (CamposObligatorios() == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var Id = sessionStorage.getItem('IDGeneral');
            var NoPedido = document.getElementById("TxtNumCompra").value;
            var ExitenciaInicial = document.getElementById("TxtExistenciaInicial").value;
            var ExitenciaActual = document.getElementById("TxtExistenciaActual").value;
            var Coste = document.getElementById("TxtCosto").value;

            var frm = new FormData();
            frm.append("Id", Id);
            frm.append("NoPedido", NoPedido);
            frm.append("ExitenciaInicial", ExitenciaInicial);
            frm.append("ExitenciaActual", ExitenciaActual);
            frm.append("Coste", Coste);
            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/ExistenciaAlmacen/GuardarAlmacen",
                data: frm,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == 0) {
                        alert("Ocurrio un error");
                    }
                    else if (data == -1) {
                        alert("Ya existe el proveedor");
                    }
                    else {
                        alert("Se ejecuto correctamente");
                        CrearAcordeonExistenciasAlmacen();
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
function EliminarExistenciasG(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/ExistenciaAlmacen/EliminarAlmacen/?Id=" + id, function (DatoExistecia) {
            if (DatoExistecia == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonExistenciasAlmacen();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}

