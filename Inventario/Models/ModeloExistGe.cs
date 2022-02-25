using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloExistGe
    {
        public static List<long> IdArticulos { get; set; }
        public static List<string> NombreEmpresa { get; set; }
        public static List<long> IdAreas { get; set; }
        public static List<string> Area { get; set; }

        public static List<long> IdCompra { get; set; }
        public static List<string> FechaIngreso { get; set; }
        public static List<long> StockActual { get; set; }
        public static List<long> PrecioUnitario { get; set; }
    }
}