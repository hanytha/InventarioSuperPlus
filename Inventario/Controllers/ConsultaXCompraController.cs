using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ConsultaXCompraController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: ConsultaXCompra
        public ActionResult compr()
        {
            return View();
        }
        public JsonResult ConsultaComprasArt()
        {
            string Id = "";
            string Clave = "";
            string Numero = "";
            string Idcom = "";
            var ConsultaArticulo = InvBD.Compra.Where(p => p.Estatus.Equals(1))
            .Select(p => new
            {
                id = p.IdCompra,
                NCompra = p.NoCompra,
                Clave = p.ClaveProveedor
            });
            foreach (var art in ConsultaArticulo)
            {
                Clave += art.NCompra + ",";
                Numero += art.Clave + ",";
                Id += art.id + ",";


                var consultaCom = InvBD.Compra.Where(p => p.IdCompra.Equals(art.id) && p.IdArticulo > 0)
                    .Select(p => new
                    {
                        IdArt = p.IdArticulo
                    });
                int cont = 0;
                int UltimoReg = consultaCom.Count() - 1;
                foreach (var com in consultaCom)

                if (cont == UltimoReg)
                {
                        Idcom += com.IdArt + ",";
                }
            }
            var Resultado = new { Id = Id.Substring(0, Id.Length - 1), Clave = Clave.Substring(0, Clave.Length - 1), Numero = Numero.Substring(0, Numero.Length - 1), Idcom = Idcom.Substring(0, Idcom.Length - 1) };
            return Json(Resultado, JsonRequestBehavior.AllowGet);
        }
        
    }

}
