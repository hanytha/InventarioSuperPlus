using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ArticuloVistaController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: ArticuloVista
        public ActionResult ArticuloVista()
        {
            return View();
        }
        public void ConsultaArticulos()
        {
            string Id = "";
            string nombre = "";
            string fecha = "";
            String Stock = "";
            String costo = "";


            var ConsultaArticulo = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            foreach (var art in ConsultaArticulo)
            {

                Id += art.ID + ",";
                nombre += art.Nombre + ",";

                var ConsultaUfecha = InvBD.Compra.Where(p => p.IdArticulo.Equals(art.ID)&&p.ExitenciaActual>0).OrderByDescending(p => p.FechaDeIngreso)
                .Select(p => new
                {
                    ultima = p.FechaDeIngreso,
                    total = p.ExitenciaActual,
                    Costo = p.Coste

                });
                string Fecha;
                double Total=0;
                double costos=0;
                int cont = 0;
                int UltimoReg = ConsultaUfecha.Count() - 1;
                
                foreach (var com in ConsultaUfecha)
                {
                    if (cont== UltimoReg)
                    {
                        //fecha =+ ConsultaUfecha. + ",";
                    }
                       
                }


            }
        }
    }
}