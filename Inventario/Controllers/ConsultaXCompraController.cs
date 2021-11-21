using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Lamar al método de seguridad
    [Seguridad]
    public class ConsultaXCompraController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: ConsultaXCompra
        public ActionResult compr()
        {
            return View();
        }
        public JsonResult ConsultaCategorias()
        {
            var Categorias = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdCompra,
                    p.NoCompra,
                    p.IdArticulo,
                });
            return Json(Categorias, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaCategoria(long Id)
        {
            var Categoria = InvBD.Compra.Where(p => p.IdCompra.Equals(Id) && p.IdArticulo.Equals(p.IdArticulo))
                .Select(p => new
                {
                    p.IdCompra,
                    p.NoCompra,
                    p.IdArticulo,
                });
            return Json(Categoria, JsonRequestBehavior.AllowGet);
        }
    }
}
