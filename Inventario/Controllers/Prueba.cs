using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class Prueba : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Proveedores
        public ActionResult Proveedores()
        {
            return View();
        }
        public JsonResult ConsultaProveedores()
        {
            var proveedores = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Nombre,
                    p.Correo,
                    p.RazonSocial,
                    p.ClaveInterbancaria,
                    p.CodigoPostal,
                    p.RFC,
                    p.Direccion,
                    p.Telefono,
                    p.Banco,
                    p.NumeroDeCuenta,
                    p.UsoCFDI,
                    p.Nomenclatura,
                    p.Descripcion,
                    p.Logo
                });
            return Json(proveedores, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaProveedor(long Id)
        {
            var proveedor = InvBD.Proveedores.Where(p => p.Estatus.Equals(Id))
                .Select(p => new
                {
                    p.Nombre,
                    p.Correo,
                    p.RazonSocial,
                    p.ClaveInterbancaria,
                    p.CodigoPostal,
                    p.IdEstado,
                    p.RFC,
                    p.Direccion,
                    p.Telefono,
                    p.Banco,
                    p.NumeroDeCuenta,
                    p.UsoCFDI,
                    p.Nomenclatura,
                    p.Descripcion,
                    p.Logo
                });
            return Json(proveedor, JsonRequestBehavior.AllowGet);
        }
    }

}
