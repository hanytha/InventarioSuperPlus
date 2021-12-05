using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloAlmacenG
    {
        public static List<long> IdExistenciaAlmacenG { get; set; }

        public static List<long> NoPedido { get; set; }
        //public static List<string> FechaDeIngreso { get; set; }
        public static List<long> FechaDeIngreso { get; set; }
        public static List<long> ExitenciaInicial { get; set; }
        public static List<long> IdAsignacion { get; set; }
        public static List<long> IdSitio { get; set; }
        public static List<long> IdArticulo { get; set; }
       
    }
}