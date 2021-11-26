using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloPedidoExtPrueba
    {
        public static List<long> IdPedidosExternos { get; set; }
        public static List<int> NumeroPedido { get; set; }
        public static List<long> IdProveedor { get; set; }
        public static List<string> Proveedor { get; set; }
        public static List<string> Fecha { get; set; }
    }
}