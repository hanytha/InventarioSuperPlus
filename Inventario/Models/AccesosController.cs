using System;
using System.Collections.Generic;

namespace Inventario.Models
{

    public class Accesos
    {

        //Modelo que se ocupa para mostrar las paginas según los perfiles
        public static string Perfil { get; set; }
        public static long NIvel { get; set; }
        public static List<string> Accion { get; set; }
        public static List<string> Controlador { get; set; }
        public static List<string> Mensaje { get; set; }
        public static List<string> Icono { get; set; }

        public static long Id { get; set; }
        public static string CURP { get; set; }
        public static string Nombre { get; set; }
        public static string ApellidosP { get; set; }
        public static string ApellidosM { get; set; }

        public static string Usuario { get; set; }
        public static string Foto { get; set; }
        public static string FechaDeNacimiento { get; set; }

        public static long? IdEstado { get; internal set; }
        public static long? IdMunicipio { get; internal set; }
        public static long? IdLocalidad { get; internal set; }
        public static string RFC { get; set; }
        public static string NoSS { get; set; }
        public static string Correo { get; set; }
        public static string Telefono { get; set; }

        public static long? IdPerfil { get; internal set; }

        public static string LvlPerfil { get; set; }
        public static string FechaIngreso { get; set; }
        public static string Password { get; set; }
        public static string Estado { get; set; }
        public static string Municipio { get; set; }
        public static string Localidad { get; set; }

        public static long? IdArea { get; internal set; }
        public static string NArea { get; set; }
        public static string NSArea { get; set; }

        public static long IDAsignacion { get; set; }
        public static string Asignacion { get; set; }
        public static string Tiendas { get; set; }
        public static string CManejador { get; set; }
        public static string CPlataforma { get; set; }
        public static long IDSitio { get; set; }
        public static string Sitio { get; set; }
        public static long? IdSubArea { get; internal set; }

        public static long IdSupervision { get; set; }

        public static string Descripcion { get; set; }
    }

}