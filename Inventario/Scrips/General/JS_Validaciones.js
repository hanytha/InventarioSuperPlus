﻿//------------------Validar proveedor-------------

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
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }
    //Test correo
    if (!(/\S+@\S+\.\S+/.test(Txtcorreo))) {
        alert('ERROR: Debe escribir un correo válido');
        return false;
    }

    //Test campo obligatorio
    if (TxtRazonSocial == null || TxtRazonSocial.length == 0 || /^\s+$/.test(TxtRazonSocial)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtRazonSocial');
        return false;
    }

    //Test edad
    if (TxtClaveInterbancaria == null || TxtClaveInterbancaria.length == 0 || isNaN(TxtClaveInterbancaria)) {
        alert('ERROR: Debe ingresar una edad TxtClaveInterbancaria');
        return false;
    }

    //Test edad
    if (TxtCodigoPostal == null || TxtCodigoPostal.length == 0 || isNaN(TxtCodigoPostal)) {
        alert('ERROR: Debe ingresar una edad TxtCodigoPostal');
        return false;
    }
    //Test comboBox
    if (cmbEstado == null || cmbEstado == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box cmbEstado');
        return false;
    }
    //Test comboBox
    if (cmbMunicipio == null || cmbMunicipio == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box cmbMunicipio');
        return false;
    }
    //Test comboBox
    if (cmbLocalidad == null || cmbLocalidad == 0) {
        alert('ERROR: Debe seleccionar una opcion del combo box cmbLocalidad');
        return false;
    }
    //Test campo obligatorio
    if (TxtRFC == null || TxtRFC.length == 0 || /^\s+$/.test(TxtRFC)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco TxtRFC');
        return false;
    }
    //Test campo obligatorio
    if (TxtDireccion == null || TxtDireccion.length == 0 || /^\s+$/.test(TxtDireccion)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco TxtRFC TxtDireccion');
        return false;
    }
    //Test edad
    if (TxtTelefono == null || TxtTelefono.length == 0 || isNaN(TxtTelefono)) {
        alert('ERROR: Debe ingresar una edad TxtTelefono');
        return false;
    }

    //Test campo obligatorio
    if (TxtBanco == null || TxtBanco.length == 0 || /^\s+$/.test(TxtBanco)) {
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco TxtBanco');
        return false;
    }


    //Test edad
    if (TxtNumeroDeCuenta == null || TxtNumeroDeCuenta.length == 0 || isNaN(TxtNumeroDeCuenta)) {
        alert('ERROR: Debe ingresar una edad TxtNumeroDeCuenta');
        return false;
    }

    //Test edad
    if (TxtUsoCFDI == null || TxtUsoCFDI.length == 0 || isNaN(TxtUsoCFDI)) {
        alert('ERROR: Debe ingresar una TxtUsoCFDI');
        return false;
    }


    //Test campo obligatorio
    if (TxtNomenclatura == null || TxtNomenclatura.length == 0 || /^\s+$/.test(TxtNomenclatura)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtNomenclatura');
        return false;
    }
    //Test campo obligatorio
    if (TxtDescripcion == null || TxtDescripcion.length == 0 || /^\s+$/.test(TxtDescripcion)) {
        alert('ERROR: El campo nombre no debe ir vacío TxtDescripcion');
        return false;
    }


    return true;
}