using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloSubAreas
    {
        public static List<long> IdAreas { get; set; }
        public static List<string> Nombre { get; set; }
        public static List<long> IDUsuario { get; set; }
        public static List<string> UNombre { get; set; }
        public static List<string> Correo { get; set; }
        public static List<long> Telefono { get; set; }
        public static List<string> Carpeta { get; set; }
    }
}