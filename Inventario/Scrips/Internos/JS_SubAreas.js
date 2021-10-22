
//Limpia la información y carga la informacion del proveedor
function abrirModalSub(id) {//la clase  Obligatorio
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {//recorre
        //Cambia los bordes lo las casillas a color rojo
        //controlesObligatorio[i].parentNode.classList.remove("border-danger");
        controlesObligatorio[i].parentNode.classList.remove("error"); //Cambia los bordes lo las casillas a color rojo

    }
    if (id == 0) {
        LimpiarCampos();
        sessionStorage.setItem('IDSb', '0');

    }
    else {

        $.get("/Subarea/ConsultaSubArea/?Id=" + id, function (Data) {
            //Obtener los datos de los proveedores para permitir editar
            sessionStorage.setItem('IDSb', Data[0].IdSubAreas);
            document.getElementById("TxtNombre").value = Data[0].Nombre;
            document.getElementById("TxtNumero").value = Data[0].NoSubArea;
            document.getElementById("TxtNombre1").value = Data[0].NEncargado1;
            document.getElementById("TxtTelefono1").value = Data[0].TelefonoE1;
            document.getElementById("TxtCorreo1").value = Data[0].CorreoE1;
            document.getElementById("TxtNombre2").value = Data[0].NEncargado2;
            document.getElementById("TxtTelefono2").value = Data[0].TelefonoE2;
            document.getElementById("TxtCorreo2").value = Data[0].CorreoE2;
            document.getElementById("TxtNombre3").value = Data[0].NEncargado3;
            document.getElementById("TxtTelefono3").value = Data[0].TelefonoE3;
            document.getElementById("TxtCorreo3").value = Data[0].CorreoE3;


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
function GuardarSubarea() {
    if (CamposObligatorios("SubArea") == true) {
        if (confirm("¿Desea aplicar los cambios?") == 1) {
            var IdSubAreas = sessionStorage.getItem('IDSb');
            var Nombre = document.getElementById("TxtNombre").value;
            var NoSubArea = document.getElementById("TxtNumero").value;
            var NEncargado1 = document.getElementById("TxtNombre1").value;
            var TelefonoE1 = document.getElementById("TxtTelefono1").value;
            var CorreoE1 = document.getElementById("TxtCorreo1").value;
            var NEncargado2 = document.getElementById("TxtNombre2").value;
            var TelefonoE2 = document.getElementById("TxtTelefono2").value;
            var CorreoE2 = document.getElementById("TxtCorreo2").value;
            var NEncargado3 = document.getElementById("TxtNombre3").value;
            var TelefonoE3 = document.getElementById("TxtTelefono3").value;
            var CorreoE3 = document.getElementById("TxtCorreo3").value;

            var frm = new FormData();
            frm.append("IdSubAreas", IdSubAreas);
            frm.append("Nombre", Nombre);
            frm.append("NoSubArea", NoSubArea);
            frm.append("NEncargado1", NEncargado1);
            frm.append("TelefonoE1", TelefonoE1);
            frm.append("CorreoE1", CorreoE1);
            frm.append("NEncargado2", NEncargado2);
            frm.append("TelefonoE2", TelefonoE2);
            frm.append("CorreoE2", CorreoE2);
            frm.append("NEncargado3", NEncargado3);
            frm.append("TelefonoE3", TelefonoE3);
            frm.append("CorreoE3", CorreoE3);

            frm.append("Estatus", 1);
            $.ajax({
                type: "POST",
                url: "/Subarea/GuardarSubarea",
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
                        CrearAcordeonSubAreas();
                        document.getElementById("btnCancelar").click();
                    }
                }
            });
        }
    }
}

//marca los campos obligatorios
function CamposObligatorios(clase) {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName(clase);
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
function EliminarSubarea(id) {
    if (confirm("¿Desea eliminar el registro?") == 1) {

        $.get("/Subarea/EliminarSubarea/?Id=" + id, function (DatoSub) {
            if (DatoSub == 1) {
                alert("Se elimino correctamente");
                CrearAcordeonSubAreas();
            } else {
                alert("Ocurrio un error");
            }
        });
    }
}


