using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class GLOBALController : Controller
    {
        //DCISPlusDataContext InvBD = new DCISPlusDataContext();
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        //Consulta de las áreas activas(1)
        // GET: GLOBAL
        public JsonResult BDAreas()
        {
            var datos = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.Id,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta SubAreas
        public JsonResult BDSubAreas(long IDA)
        {
            var datos = InvBD.SubAreas.Where(p => p.Estatus.Equals(1) && p.Id.Equals(IDA))
                .Select(p => new {
                    ID = p.Id,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Estados
        public JsonResult BDEstados()
        {
            var datos = InvBD.estados.Where(p => p.activo.Equals(1))
                .Select(p => new {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Municipio
        public JsonResult BDMunicipio(int IDE)
        {
            var datos = InvBD.municipios.Where(p => p.activo.Equals(1) && p.estado_id.Equals(IDE))
                .Select(p => new {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Localidades
        public JsonResult BDLocalidades(int IDM)
        {
            var datos = InvBD.localidades.Where(p => p.activo.Equals(1) && p.municipio_id.Equals(IDM))
                .Select(p => new {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tiendas
        public JsonResult BDTiendas()
        {
            var datos = InvBD.Tienda.Where(p => p.estados.Equals(1))
                .Select(p => new {
                    ID = p.Id,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}