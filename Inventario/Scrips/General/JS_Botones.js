//<<<<<<< HEAD
//ï»¿//Confirmacion para cerrar el modal de registro
////Cuadro de diÃ¡logo de confirmaciÃ³n en JavaScript
//function confirmarAccesoURL() {
//    return confirm("Â¿EstÃ¡ seguro que desea salir de modal?");
//=======
///*import $ from 'jquery';
//import ParsleyUtils from './utils';

//var requirementConverters = {
//    string: function (string) {
//        return string;
//    },
//    integer: function (string) {
//        if (isNaN(string))
//            throw 'Requirement is not an integer: "' + string + '"';
//        return parseInt(string, 10);
//    },
//    number: function (string) {
//        if (isNaN(string))
//            throw 'Requirement is not a number: "' + string + '"';
//        return parseFloat(string);
//    },
//    reference: function (string) { // Unused for now
//        var result = $(string);
//        if (result.length === 0)
//            throw 'No such reference: "' + string + '"';
//        return result;
//    },
//    boolean: function (string) {
//        return string !== 'false';
//    },
//    object: function (string) {
//        return ParsleyUtils.deserializeValue(string);
//    },
//    regexp: function (regexp) {
//        var flags = '';

//        // Test if RegExp is literal, if not, nothing to be done, otherwise, we need to isolate flags and pattern
//        if (/^\/.*\/(?:[gimy]*)$/.test(regexp)) {
//            // Replace the regexp literal string with the first match group: ([gimy]*)
//            // If no flag is present, this will be a blank string
//            flags = regexp.replace(/.*\/([gimy]*)$/, '$1');
//            // Again, replace the regexp literal string with the first match group:
//            // everything excluding the opening and closing slashes and the flags
//            regexp = regexp.replace(new RegExp('^/(.*?)/' + flags + '$'), '$1');
//        } else {
//            // Anchor regexp:
//            regexp = '^' + regexp + '$';
//        }
//        return new RegExp(regexp, flags);
//    }
//};

//var convertArrayRequirement = function (string, length) {
//    var m = string.match(/^\s*\[(.*)\]\s*$/);
//    if (!m)
//        throw 'Requirement is not an array: "' + string + '"';
//    var values = m[1].split(',').map(ParsleyUtils.trimString);
//    if (values.length !== length)
//        throw 'Requirement has ' + values.length + ' values when ' + length + ' are needed';
//    return values;
//};

//var convertRequirement = function (requirementType, string) {
//    var converter = requirementConverters[requirementType || 'string'];
//    if (!converter)
//        throw 'Unknown requirement specification: "' + requirementType + '"';
//    return converter(string);
//};

//var convertExtraOptionRequirement = function (requirementSpec, string, extraOptionReader) {
//    var main = null;
//    var extra = {};
//    for (var key in requirementSpec) {
//        if (key) {
//            var value = extraOptionReader(key);
//            if ('string' === typeof value)
//                value = convertRequirement(requirementSpec[key], value);
//            extra[key] = value;
//        } else {
//            main = convertRequirement(requirementSpec[key], string);
//        }
//    }
//    return [main, extra];
//};

//// A Validator needs to implement the methods `validate` and `parseRequirements`

//var ParsleyValidator = function (spec) {
//    $.extend(true, this, spec);
//};

//ParsleyValidator.prototype = {
//    // Returns `true` iff the given `value` is valid according the given requirements.
//    validate: function (value, requirementFirstArg) {
//        if (this.fn) { // Legacy style validator

//            if (arguments.length > 3)  // If more args then value, requirement, instance...
//                requirementFirstArg = [].slice.call(arguments, 1, -1);  // Skip first arg (value) and last (instance), combining the rest
//            return this.fn.call(this, value, requirementFirstArg);
//        }

//        if ($.isArray(value)) {
//            if (!this.validateMultiple)
//                throw 'Validator `' + this.name + '` does not handle multiple values';
//            return this.validateMultiple(...arguments);
//        } else {
//            if (this.validateNumber) {
//                if (isNaN(value))
//                    return false;
//                arguments[0] = parseFloat(arguments[0]);
//                return this.validateNumber(...arguments);
//            }
//            if (this.validateString) {
//                return this.validateString(...arguments);
//            }
//            throw 'Validator `' + this.name + '` only handles multiple values';
//        }
//    },

//    // Parses `requirements` into an array of arguments,
//    // according to `this.requirementType`
//    parseRequirements: function (requirements, extraOptionReader) {
//        if ('string' !== typeof requirements) {
//            // Assume requirement already parsed
//            // but make sure we return an array
//            return $.isArray(requirements) ? requirements : [requirements];
//        }
//        var type = this.requirementType;
//        if ($.isArray(type)) {
//            var values = convertArrayRequirement(requirements, type.length);
//            for (var i = 0; i < values.length; i++)
//                values[i] = convertRequirement(type[i], values[i]);
//            return values;
//        } else if ($.isPlainObject(type)) {
//            return convertExtraOptionRequirement(type, requirements, extraOptionReader);
//        } else {
//            return [convertRequirement(type, requirements)];
//        }
//    },
//    // Defaults:
//    requirementType: 'string',

//    priority: 2

//};

//export default ParsleyValidator;
//*/


////Función para regresar el formulario del modal al inicio al presionar el botón cancelar////
(function () {
    var template = null
    $('.modal').on('show.bs.modal', function (event) {
        if (template == null) {//Valores nulos
            template = $(this).html()

        } else {
            $(this).html(template)
            //Recetear el formulario iniciando del paso 1
            $(document).ready(function () {
                var current = 1, current_step, next_step, steps;
                steps = $("fieldset").length;
                $(".next").click(function () {
                    current_step = $(this).parent();
                    next_step = $(this).parent().next();
                    next_step.show();
                    current_step.hide();
                    setProgressBar(++current);
                });
                $(".previous").click(function () {
                    current_step = $(this).parent();
                    next_step = $(this).parent().prev();
                    next_step.show();
                    current_step.hide();
                    setProgressBar(--current);
                });
                setProgressBar(current);
                // Cambiar la acción de la barra de progreso
                function setProgressBar(curStep) {
                    var percent = parseFloat(100 / steps) * curStep;
                    percent = percent.toFixed();
                    $(".progress-bar")
                        .css("width", percent + "%")
                        .html(percent + "%");
                }
                //Termina Recetear el formulario
            });
        }
        // Cargar nuevamente el combo box de Estado, Municipio y Localidad al volver a empezar el proceso del formulario

        //event Change index Estados para llenar el combobox Municipios
        var IDE = document.getElementById("cmbEstado");
        IDE.addEventListener("change", function () {
            $.get("/GLOBAL/BDMunicipio/?IDE=" + IDE.value, function (data) {
                llenarCombo(data, document.getElementById("cmbMunicipio"));
            });
        });
        //event Change index Municipio para llenar el combo box Municipios 
        var IDM = document.getElementById("cmbMunicipio");
        IDM.addEventListener("change", function () {
            $.get("/GLOBAL/BDLocalidades/?IDM=" + IDM.value, function (data) {
                llenarCombo(data, document.getElementById("cmbLocalidad"));
            });
        });


    })
})()
//Deshabilitar el clic externo para el modal del formulario.
jQuery(document).ready(function () {
    jQuery('[data-toggle="modal"]').each(function () {
        jQuery(this).attr('data-backdrop', 'static');
        jQuery(this).attr('data-keyboard', 'false');
    });
});


//function confirmarAccesoURL() {
//    return confirm("¿Está seguro que desea salir de modal?");

//}
