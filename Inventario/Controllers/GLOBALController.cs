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

<<<<<<< HEAD
=======

        public JsonResult BDTienda()
        {
            var datos = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdTienda,
                    Nombre = p.Nombre
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



>>>>>>> alma
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



<<<<<<< HEAD
        //consulta Tiendas

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
        //consulta Tiendas
        public JsonResult BDTienda()
        {
            var datos = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdTienda,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tiendas
        public JsonResult BDImpuesto()
=======

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



        public JsonResult BDArticulos()
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdArticulos,
                    Nombre = p.NombreProveedor
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        //consulta Unidades de medida
        public JsonResult BDUnidadesMedida()
>>>>>>> alma
        {
            var datos = InvBD.Impuesto.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
<<<<<<< HEAD
                    ID = p.IdImpuesto,
                    Nombre = p.Impuestos
        
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
        public JsonResult BDCompra()
        {
            var datos = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdCompra,
               
                  
=======
                    ID = p.IdUnidadDeMedida,
                    Nombre = p.Unidad
>>>>>>> alma
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

<<<<<<< HEAD


        //consulta Estados
        public JsonResult BDEstado()
        {
            var datos = InvBD.estados.Where(p => p.activo.Equals(1))
                .Select(p => new {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDSupervisor()
        {
            var datos = InvBD.Supervisor.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdSupervisor,
                    Nombre= p.Nombre

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDCategorias()
        {
            var datos = InvBD.Categorias.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdCategorias,
                    Nombre = p.Tipo

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDCompras()
        {
            var datos = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdCompra,
                    Nombre = p.NoCompra

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDMarcas()
=======
        public JsonResult BDMarca()
>>>>>>> alma
        {
            var datos = InvBD.Marca.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdMarca,
                    Nombre = p.Nombre
<<<<<<< HEAD

=======
>>>>>>> alma
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

    }
}

