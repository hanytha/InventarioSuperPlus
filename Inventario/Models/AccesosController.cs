using System;
using System.Collections.Generic;

namespace Inventario.Models
{

        public class Accesos
        {
            public static string Perfil { get; set; }
            public static List<string> Accion { get; set; }
            public static List<string> Controlador { get; set; }
            public static List<string> Mensaje { get; set; }
            public static List<string> Icono { get; set; }
            public static long Id { get; set; } 
            public static string Nombre { get; set; }
            public static string ApellidosP { get; set; }
            public static string ApellidosM { get; set; }
            
            public static string NArea { get; set; }
            public static string NSArea { get; set; }

            public static long IDAsignacion { get; set; }
            public static string Asignacion { get; set; }
            public static string Foto { get; set; }
        }

}