using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class PruebaController : Controller
    {
        //DCISPlusDataContext InvBD = new DCISPlusDataContext();
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Prueba
        public ActionResult Prueba()
        {
            return View();
        }
        public JsonResult ConsultaCompras()
        {
            //string totall="";
      
            var compra = InvBD.Compra.Where(p => p.Estatus.Equals(1)&& p.ExitenciaActual >0).OrderBy(p => p.FechaDeIngreso)
                .Select(p => new
                {
                    p.IdCompra,
         /*total=*/ p.ExitenciaActual,
                    p.FechaDeIngreso,
                    p.Coste,

                });

            //foreach (var comp in compra)
            //{
            //    if(comp.total>=1)
            //    {
            //        totall += comp.total + ",";
            //    }
            //}
            return Json(compra, JsonRequestBehavior.AllowGet);
        }


    }
}