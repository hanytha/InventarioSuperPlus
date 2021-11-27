using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Inventario.Models
{
    public class ModeloPagina
    {  //Modelo que se ocupa para crear el menú de opciones de manera dinámica mediante Razor
        public static List<long> IdPagina { get; set; }
        public static List<string> Mensaje { get; set; }
        public static List<long> Accion { get; set; }
        public static List<string> Controlador { get; set; }
        public static List<string> Icono { get; set; }
        public static List<long> Descripcion { get; set; }



    }

}