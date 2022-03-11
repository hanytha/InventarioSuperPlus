using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class Lider
    {

        public static List<long> IdPedidosInternos { get; set; }
        public static List<long> NumeroPedido { get; set; }
        public static List<string> Proveedor { get; set; }
        public static List<string> Fecha { get; set; }
        public static List<long> IdSitio { get; set; }
    }
}