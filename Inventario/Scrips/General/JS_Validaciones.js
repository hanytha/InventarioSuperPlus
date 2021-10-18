
//------------------Validar proveedor-------------
function validarFormularioProveedor() {

    var TxtNombre = document.getElementById('TxtNombre').value;
    var Txtcorreo = document.getElementById('Txtcorreo').value;
    var TxtRazonSocial = document.getElementById('TxtRazonSocial').value;
    var TxtClaveInterbancaria = document.getElementById('TxtClaveInterbancaria').value;
    var TxtCodigoPostal = document.getElementById('TxtCodigoPostal').value;
    var cmbEstado = document.getElementById('cmbEstado').selectedIndex;
    var cmbMunicipio = document.getElementById('cmbMunicipio').selectedIndex;
    var cmbLocalidad = document.getElementById('cmbLocalidad').selectedIndex;
    var TxtRFC = document.getElementById('TxtRFC').value;
    var TxtDireccion = document.getElementById('TxtDireccion').value;
    var TxtTelefono = document.getElementById('TxtTelefono').value;
    var TxtBanco = document.getElementById('TxtBanco').value;
    var TxtNumeroDeCuenta = document.getElementById('TxtNumeroDeCuenta').value;
    var TxtUsoCFDI = document.getElementById('TxtUsoCFDI').value;
    var TxtNomenclatura = document.getElementById('TxtNomenclatura').value;
    var TxtDescripcion = document.getElementById('TxtDescripcion').value;

    //Test campo obligatorio
    if (TxtNombre == null || TxtNombre.length == 0 || /^\s+$/.test(TxtNombre)) {
        alert('ERROR: El campo nombre es obligatorio');
        return false;
    }
    //correo
    if (!(/\S+@\S+\.\S+/.test(Txtcorreo))) {
        alert('ERROR: Debe escribir un correo válido');

        return false;
    }
 
    //RazonSocial
    if (TxtRazonSocial == null || TxtRazonSocial.length == 0 || /^\s+$/.test(TxtRazonSocial)) {
        alert('ERROR: El campo RazonSocial  es obligatorio');
        return false;
    }

    //ClaveInterbancaria
    if (TxtClaveInterbancaria == null || TxtClaveInterbancaria.length == 0 || isNaN(TxtClaveInterbancaria)) {
        alert('ERROR: El campo ClaveInterbancaria es obligatorio');
        return false;
    }

    //Test edad
    if (TxtCodigoPostal == null || TxtCodigoPostal.length == 0 || isNaN(TxtCodigoPostal)) {
        alert('ERROR: El campo CodigoPostal es obligatorio');
        return false;
    }
    //Test comboBox
    if (cmbEstado == null || cmbEstado == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box cmbEstado');
        return false;
    }
    //Test comboBox
    if (cmbMunicipio == null || cmbMunicipio == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box Municipio');
        return false;
    }
    //Test comboBox
    if (cmbLocalidad == null || cmbLocalidad == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box Localidad');
        return false;
    }
    //Test campo obligatorio
    if (TxtRFC == null || TxtRFC.length == 0 || /^\s+$/.test(TxtRFC)) {
        alert('ERROR: El campo RFC es obligatorio');
        return false;
    }
    //Test campo obligatorio
    if (TxtDireccion == null || TxtDireccion.length == 0 || /^\s+$/.test(TxtDireccion)) {
        alert('ERROR: El campo Direccion es obligatorio');
        return false;
    }
    //Test edad
    if (TxtTelefono == null || TxtTelefono.length == 0 || isNaN(TxtTelefono)) {
        alert('ERROR: El campo Telefono es obligatorio');
        return false;
    }

    //Test campo obligatorio
    if (TxtBanco == null || TxtBanco.length == 0 || /^\s+$/.test(TxtBanco)) {
        alert('ERROR: El campo Banco es obligatorio');
        return false;
    }


    //Test edad
    if (TxtNumeroDeCuenta == null || TxtNumeroDeCuenta.length == 0 || isNaN(TxtNumeroDeCuenta)) {
        alert('ERROR: El campo Numero de cuenta es obligatorio');
        return false;
    }

    //Test edad
    if (TxtUsoCFDI == null || TxtUsoCFDI.length == 0 || isNaN(TxtUsoCFDI)) {
        alert('ERROR: El campo UsoCFDI es obligatorio');
        return false;
    }


    //Test campo obligatorio
    if (TxtNomenclatura == null || TxtNomenclatura.length == 0 || /^\s+$/.test(TxtNomenclatura)) {
        alert('ERROR: El campo Nomenclatura es obligatorio');
        return false;
    }
    //Test campo obligatorio
    if (TxtDescripcion == null || TxtDescripcion.length == 0 || /^\s+$/.test(TxtDescripcion)) {
        alert('ERROR: El campo Descripcion es obligatorio');
        return false;
    }
    //el formulario se envia

}

