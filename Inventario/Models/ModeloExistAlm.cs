using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloExistAlm
    {
        public static List<long> IdExistenciaAlmacenG { get; set; }

      

        public static List<long> NoPedido { get; set; }
        public static List<string> FechaDeIngreso { get; set; }
        public static List<long> ExitenciaInicial { get; set; }
        public static List<string> FechaFinal { get; set; }
        public static List<long> ExitenciaActual { get; set; }
        public static List<long> Coste { get; set; }
        public static List<string> TipoDeOperacion { get; set; }
        public static List<string> NombreEmpresa { get; set; }
        public static List<long> IdCompra { get; set; }
        public static List<long> IdAsignacion { get; set; }
        public static List<long> IdSitio { get; set; }
        public static List<long> IdArticulo { get; set; }
        public static object Nombre { get; internal set; }
    }
}