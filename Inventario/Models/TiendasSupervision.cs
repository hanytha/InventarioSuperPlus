using System.Collections.Generic;

namespace Inventario.Models
{
    public class TiendasSupervision
    {
        public static List<long> IdTienda { get; set; }
        public static List<string> Nombre { get; set; }
        public static List<string> LNombre { get; set; }
        public static List<string> E1Nombre { get; set; }
        public static List<string> E2Nombre { get; set; }
        public static List<string> E3Nombre { get; set; }
        public static List<string> A1Nombre { get; set; }
        public static List<string> A2Nombre { get; set; }
        public static List<string> A3Nombre { get; set; }
        public static List<string> Estado { get; set; }
        public static List<string> Municipio { get; set; }
        public static List<string> Localidad { get; set; }
        public static List<string> Calle { get; set; }
        public static List<long> CP { get; set; }
        public static List<long> Telefono { get; set; }
       
        public static List<string> HApertura { get; set; }
        public static List<string> HCierre { get; set; }
      
        public static List<int> Estatus { get; set; }
    }
}