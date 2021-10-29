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
        public void ConsultaDepartamentos()
        {
            string Id = "";
            string nombre = "";
            string fecha = "";
            String Stock = "";
            String costo = "";


            var articulo = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            foreach (var art in articulo)
            {

                Id += art.ID + ",";
                nombre += art.Nombre + ",";

                var ufecha = InvBD.Compra.Where(p => p.IdArticulo.Equals(art.ID)).OrderByDescending(p => p.FechaDeIngreso)
                .Select(p => new
                {

                });

            }
        }
    }
}