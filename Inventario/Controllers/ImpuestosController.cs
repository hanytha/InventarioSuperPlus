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
    public class ImpuestosController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Impuestos
        public ActionResult Impuestos()
        {
            return View();
        }
        public JsonResult ConsultaImpuestos()
        {
            var impuestos = InvBD.Impuesto.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdImpuesto,
                    p.Impuestos,
                    p.Porcentaje

                });
            return Json(impuestos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaImpuesto(long Id)
        {
            var impuesto = InvBD.Impuesto.Where(p => p.IdImpuesto.Equals(Id))
                .Select(p => new
                {
                    p.IdImpuesto,
                    p.Impuestos,
                    p.Porcentaje

                });
            return Json(impuesto, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarImpuesto(Impuesto DatosImpuesto)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosImpuesto.IdImpuesto;
            if (id.Equals(0))
            {
                int nveces = InvBD.Impuesto.Where(p => p.Impuestos.Equals(DatosImpuesto.Impuestos)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Impuesto.InsertOnSubmit(DatosImpuesto);
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
                int nveces = InvBD.Impuesto.Where(p => p.Impuestos.Equals(DatosImpuesto.Impuestos) && p.Porcentaje.Equals(DatosImpuesto.IdImpuesto)).Count();
                if (nveces == 0)
                {
                    Impuesto obj = InvBD.Impuesto.Where(p => p.IdImpuesto.Equals(id)).First();
                    obj.Impuestos = DatosImpuesto.Impuestos;
                    obj.Porcentaje = DatosImpuesto.Porcentaje;
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
        public int EliminarImpuesto(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Impuesto impues = InvBD.Impuesto.Where(p => p.IdImpuesto.Equals(Id)).First();
                impues.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }

        //*****************************************************************
        // GET: Impuestos
        public ActionResult Impuestos2do()
        {
            return View();
        }
        //****************************************************
    }
}
