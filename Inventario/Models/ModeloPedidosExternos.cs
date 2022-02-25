using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloPedidosExternos
    {
        public static List<long> IdArea { get; set; }
        public static List<long> NoPedidoG { get; set; }
        public static List<long> NoPedidoPro { get; set; }
        public static List<string> ProveedorE { get; set; }
        public static List<string> Area { get; set; }
        public static List<string> Fecha { get; set; }
    }
}