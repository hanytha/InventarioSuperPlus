using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloUsuario
    {
        public static List<long> IdUsuarios { get; set; }
        public static List<string> Usuario { get; set; }
        public static List<long> Password { get; set; }
        public static List<string> IdPerfil { get; set; }
        public static List<string> LvlPerfil { get; set; }
    }


}