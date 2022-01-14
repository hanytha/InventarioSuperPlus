using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class VPedidos
    {
        public static List<long> IdPedidosInternos { get; set; }

        public static List<string> NumeroPedido { get; set; }
        public static List<string> NumPedidoProveedor { get; set; }
        public static List<string> CantidadSolicitada { get; set; }
        public static List<string> IdAsignacion { get; set; }
        public static List<string> IdTienda { get; set; }
        public static List<string> Tienda { get; set; }
        public static List<string> IdArticulo { get; set; }
        public static List<string> Articulo { get; set; }
        public static List<string> IdProveedor { get; set; }
        public static List<string> Proveedor { get; set; }
        public static List<string> UnidadMedida { get; set; }
        public static List<string> Fecha { get; set; }

    }
} 