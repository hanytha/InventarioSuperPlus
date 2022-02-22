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

    public class MermasController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Mermas
        public ActionResult Mermas()
        {
            return View();
        }

        public JsonResult ConsultaCompraInternaJoinExistenciasAlmacen()
        {
            var compras = from comprs in InvBD.CompraInterno
                          join exist in InvBD.ExistenciaAlmacenG
                      on comprs.IdCompraInterno equals exist.IdCompraInterno
                          where comprs.EstatusPedido.Equals(1)
                          orderby exist.IdCompraInterno
                          select new
                          {
                              IdProveedor = comprs.IdProveedor,
                              Proveedor = comprs.Proveedor,
                              IdCompra = exist.IdCompra,
                              IdCompraInterno = exist.IdCompraInterno,
                              IdArticulo = exist.IdArticulo,
                              Articulo = exist.Articulo,
                              ExitenciaInicial = exist.ExitenciaInicial,
                              ExitenciaActual = exist.ExitenciaActual,
                              Observaciones = exist.Observaciones,
                              TipoDeOperacion = exist.TipoDeOperacion

                          };


            return Json(compras, JsonRequestBehavior.AllowGet);

        }


    }
}