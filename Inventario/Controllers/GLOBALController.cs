﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventario.Models;

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
                    ID = p.IdAreas,
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
            // Consulta de todas las subareas activas que pertenezcan a dicha area para mostrarlo en el combo dependiendo de la área que se seleccione
            var datos = InvBD.SubAreas.Where(p => p.Estatus.Equals(1) &&  p.IdArea.Equals(IDA))
                .Select(p => new
                {
                    ID = p.IdSubAreas,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Estados
        public void BDEstados()
        {

            Estados estado = new Estados();//inicializar
            Estados.idEstado = new List<int>();
            Estados.nombre = new List<string>();

            var datos = InvBD.estados.Where(p => p.activo.Equals(1))
                .Select(p => new
                {
                    ID = p.id,
                    Nombre = p.nombre
                });
            foreach (var edos in datos)
            {
                Estados.idEstado.Add(edos.ID);
                Estados.nombre.Add(edos.Nombre);
            }

        }


        public JsonResult BDTienda()
        {
            var datos = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdTienda,
                     Nombre= p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDPagina()
        {
            var datos = InvBD.Pagina.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdPagina,
                    Descripcion = p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }



        //consulta Municipio
        public JsonResult BDMunicipio(int IDE)
        {
            var datos = InvBD.municipios.Where(p => p.activo.Equals(1) && p.estado_id.Equals(IDE))
                .Select(p => new
                {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Localidades
        public JsonResult BDLocalidades(int IDM)
        {
            var datos = InvBD.localidades.Where(p => p.activo.Equals(1) && p.municipio_id.Equals(IDM))
                .Select(p => new
                {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }


        //Consulta Paginas




        //consulta Tiendas
        public JsonResult BDTiendas()
        {
            var datos = InvBD.Tienda.Where(p => p.Estado.Equals(1))
             
                .Select(p => new
                {
                    ID = p.IdTienda,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }




        //consulta Supervición
        public JsonResult BDSupervicion()
        {
            var datos = InvBD.Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdSupervision,
                    Nombre = p.TipoSupervicion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }





        //consulta Tiendas
        public JsonResult BDUnidadesMedida()
        {
            var datos = InvBD.UnidadDeMedida.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdUnidadDeMedida,
                   Nombre= p.Unidad
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}

   