using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloCompra
    {
        public static List<long> IdCompra { get; set; }
        public static List<long> IdArea { get; set; }
        public static List<long> NoCompra { get; set; }
        public static List<string> Proveedor { get; set; }
        public static List<string> NomArea { get; set; }
        public static List<string> TipoOperacion { get; set; }
        public static List<string> FechaDeIngreso { get; set; }

    }
}