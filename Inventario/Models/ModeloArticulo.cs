using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class Articulo
    {
        public static List<long> IdArticulos { get; set; }
        public static List<long> NombreEmpresa { get; set; }
        public static List<long> IdUnidadDeMedida { get; set; }
        public static List<long> IdAreas { get; set; }
        public static List<long> IdMarca { get; set; }
        public static List<long> IdCategorias { get; set; }
        public static List<long> IdCompra { get; set; }
        public static List<long> Categoria { get; set; }
        public static List<long> NombreProveedor { get; set; }
        public static List<long> PrecioUnitarioPromedio { get; set; }
        public static List<long> Descripcion { get; set; }
        public static List<long> UnidadSAT { get; set; }
        public static List<long> ClaveSAT { get; set; }
        public static List<long> Logo { get; set; }
        public static List<long> Fecha { get; set; }
        public static List<long> FechaSistema { get; set; }
        public static List<long> Unidad { get; set; }
        public static List<long> Area { get; set; }
        public static List<long> Marca { get; set; }
    }
}