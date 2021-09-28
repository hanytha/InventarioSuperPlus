using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ArticuloController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Articulo
        public ActionResult Articulo()
        {
            return View();
        }
        public JsonResult ConsultaArticulos()
        {
            var articulos = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Nombre1,
                    p.Nombre2,
                    p.EstadoInicial,
                    p.Stock,
                    p.IdPedido,
                    p.IdExistencias,
                    p.IdTienda,
                    p.IdUnidadDeMedida,
                    p.IdAreas,
                    p.IdMarca, 
                    p.IdCategorias,
                    p.IdImpuesto,
                    p.ExistenciaActual,
                    p.UnidadDeMedida,
                    p.TipoDeExistencia,
                    p.Categorias,
                    p.NombreProveedor,
                    p.Marca,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveProveedor,
                    p.ClaveSAT,
                    p.PrecioUnitario,
                    p.Importe,
                    p.Imagen,
                    p.Estatus,
                });
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaArticulo(long Id)
        {
            var articulo = InvBD.Articulos.Where(p => p.Estatus.Equals(Id))
                .Select(p => new
                {
                    p.Nombre1,
                    p.Nombre2,
                    p.EstadoInicial,
                    p.Stock,
                    p.IdPedido,
                    p.IdExistencias,
                    p.IdTienda,
                    p.IdUnidadDeMedida,
                    p.IdAreas,
                    p.IdMarca,
                    p.IdCategorias,
                    p.IdImpuesto,
                    p.ExistenciaActual,
                    p.UnidadDeMedida,
                    p.TipoDeExistencia,
                    p.Categorias,
                    p.NombreProveedor,
                    p.Marca,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveProveedor,
                    p.ClaveSAT,
                    p.PrecioUnitario,
                    p.Importe,
                    p.Imagen,
                    p.Estatus,
                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
    }
}