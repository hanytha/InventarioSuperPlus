using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloMermas
    {
        public static List<long> IdMermas { get; set; }
        public static List<long> IdCompra { get; set; }
        public static List<long> IdArticulo { get; set; }
        public static List<long> StockInicial { get; set; }
        public static List<long> StockActual { get; set; }
        public static List<string> Articulo { get; set; }
        public static List<string> Observaciones { get; set; }

    }
}