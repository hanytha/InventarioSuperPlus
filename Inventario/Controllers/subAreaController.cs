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
    public class SubareaController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Subarea
        public ActionResult Subarea()
        {
            return View();
        }
        public JsonResult ConsultaSubAreas()
        {
            var subareas = InvBD.SubAreas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdSubAreas,
                    p.IdArea,
                    p.Area,
                    p.Nombre,
                    p.UNombre,
                    p.NoSubArea,
                    p.NEncargado1,
                    p.TelefonoE1,
                    p.CorreoE1,
                    p.NEncargado2,
                    p.TelefonoE2,
                    p.CorreoE2,
                    p.NEncargado3,
                    p.TelefonoE3,
                    p.CorreoE3
                });
            return Json(subareas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultasSubAreasXAreas(long idArea)
        {
            var subareas = InvBD.SubAreas.Where(p => p.Estatus.Equals(1)&&p.IdArea.Equals(idArea))
                .Select(p => new
                {
                    p.IdSubAreas,
                    p.IdArea,
                    p.Area,
                    p.Nombre,
                    p.UNombre,
                    p.NoSubArea,
                    p.NEncargado1,
                    p.TelefonoE1,
                    p.CorreoE1,
                    p.NEncargado2,
                    p.TelefonoE2,
                    p.CorreoE2,
                    p.NEncargado3,
                    p.TelefonoE3,
                    p.CorreoE3

                });
            return Json(subareas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSubArea(long id)
        {
            var subarea = InvBD.SubAreas.Where(p => p.IdSubAreas.Equals(id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdSubAreas,
                    p.IdArea,
                    p.Area,
                    p.Nombre,
                    p.UNombre,
                    p.NoSubArea,
                    p.NEncargado1,
                    p.TelefonoE1,
                    p.CorreoE1,
                    p.NEncargado2,
                    p.TelefonoE2,
                    p.CorreoE2,
                    p.NEncargado3,
                    p.TelefonoE3,
                    p.CorreoE3
                });
            return Json(subarea, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarSubarea(SubAreas DatosSub)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosSub.IdSubAreas;
            if (id.Equals(0))
            {
                int nveces = InvBD.SubAreas.Where(p => p.Nombre.Equals(DatosSub.Nombre)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.SubAreas.InsertOnSubmit(DatosSub);
                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
            else
            {
                int nveces = InvBD.SubAreas.Where(p => p.Nombre.Equals(DatosSub.Nombre)
                && p.IdArea.Equals(DatosSub.IdArea) 
                && p.NoSubArea.Equals(DatosSub.NoSubArea)
                && p.UNombre.Equals(DatosSub.UNombre)
                && p.NEncargado1.Equals(DatosSub.NEncargado1) 
                && p.TelefonoE1.Equals(DatosSub.TelefonoE1)
                && p.CorreoE1.Equals(DatosSub.CorreoE1) 
                && p.NEncargado2.Equals(DatosSub.NEncargado2) 
                && p.TelefonoE2.Equals(DatosSub.TelefonoE2) 
                && p.CorreoE2.Equals(DatosSub.CorreoE2) 
                && p.NEncargado3.Equals(DatosSub.NEncargado3) 
                && p.TelefonoE3.Equals(DatosSub.TelefonoE3) 
                && p.CorreoE3.Equals(DatosSub.CorreoE3)).Count();
                if (nveces == 0)
                {
                    SubAreas obj = InvBD.SubAreas.Where(p => p.IdSubAreas.Equals(id)).First();
                    obj.Nombre = DatosSub.Nombre;
                    obj.IdArea = DatosSub.IdArea;
                    obj.Area = DatosSub.Area;
                    obj.NoSubArea = DatosSub.NoSubArea;
                    obj.UNombre = DatosSub.UNombre;
                    obj.NEncargado1 = DatosSub.NEncargado1;
                    obj.TelefonoE1 = DatosSub.TelefonoE1;
                    obj.CorreoE1 = DatosSub.CorreoE1;
                    obj.NEncargado2 = DatosSub.NEncargado2;
                    obj.TelefonoE2 = DatosSub.TelefonoE2;
                    obj.CorreoE2 = DatosSub.CorreoE2;
                    obj.NEncargado3 = DatosSub.NEncargado3;
                    obj.TelefonoE3 = DatosSub.TelefonoE3;
                    obj.CorreoE3 = DatosSub.CorreoE3;


                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
            //}
            //catch (Exception ex)
            //{
            //    Afectados = 0;
            //}
            return Afectados;
        }



        //Eliminar Compra
        public int EliminarSubarea(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                SubAreas almacenG = InvBD.SubAreas.Where(p => p.IdSubAreas.Equals(Id)).First();
                almacenG.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }

    }
}