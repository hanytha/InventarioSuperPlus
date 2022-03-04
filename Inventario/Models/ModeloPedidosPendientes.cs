using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloPedidosPendientes
    {
        public static List<long> NumeroPedido { get; set; }
        public static List<long> IdAsignacion { get; set; }
        public static List<long> IdSitio { get; set; }
        public static List<string> Sitio { get; set; }
        public static List<long> IdProveedor { get; set; }
    }
}