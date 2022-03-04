using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloArticulos
    {
        public static List<string> Articulo { get; set; }
        public static List<string> Area { get; set; }
        public static List<long> PrecioU { get; set; }
        public static List<long> IDArea { get; set; }
        public static List<long> IDArticulo { get; set; }
    }
}