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
    public class Articulo3roController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Articulo3ro
        public ActionResult Articulo3ro()
        {
            return View();
        }
        public JsonResult ConsultaArticulos()
        {
            var articulos = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdArticulos,
                    p.NombreEmpresa,
                    p.IdUnidadDeMedida,
                    p.IdAreas,
                    p.IdMarca,
                    p.IdCategorias,
                    p.IdProveedor,
                    p.Proveedor,
                    p.Categoria,
                    p.NombreProveedor,
                    p.PrecioUnitarioPromedio,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveSAT,
                    p.Fecha,
                    p.FechaSistema,
                    p.Unidad,
                    p.Area,
                    p.Marca,
                    p.Estatus,
                });
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }
        //---------------------------Consulta para obetener los proveedores y generar el checkbox-------------------------------------
        public JsonResult ConsultaProveedores()
        {
            var proveedores = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdProveedores,
                    p.Nombre,

                });
            return Json(proveedores, JsonRequestBehavior.AllowGet);
        }

    }
}