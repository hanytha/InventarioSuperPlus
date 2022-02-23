using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloMermas
    {
        public static List<long> IdCompraInterno { get; set; }
        public static List<long> IdProveedor { get; set; }
        public static List<string> Proveedor { get; set; }


        public static List<long> IdExistenciaAlmacenG { get; set; }
        public static List<long> IdCompra { get; set; }
        public static List<long> IdArticulo { get; set; }
        public static List<long> ExitenciaInicial { get; set; }
        public static List<long> ExitenciaActual { get; set; }
        public static List<long> NoPedidoG { get; set; }
        public static List<string> TipoDeOperacion { get; set; }
        public static List<string> Articulo { get; set; }
        public static List<string> Observaciones { get; set; }


    }
}