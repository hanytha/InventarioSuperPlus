using System;
using Inventario.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Lamar al método de seguridad
    [Seguridad]

    public class MPagoController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: MPago
        public ActionResult MPago()
        {
            return View();
        }
        public JsonResult ConsultaPagos()
        {
            var pagos = InvBD.MetodoPago.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdMetodoPago,
                    p.MetodoPago1,
                    p.Descripcion,
                });
            return Json(pagos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaPago(long Id)
        {
            var pago = InvBD.MetodoPago.Where(p => p.IdMetodoPago.Equals(Id))
                .Select(p => new
                {
                    p.IdMetodoPago,
                    p.MetodoPago1,
                    p.Descripcion,
                });
            return Json(pago, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarMPago(MetodoPago Datospago)
        {
            int Afectados = 0;
            //try
            //{
            long id = (long)Datospago.IdMetodoPago;
            if (id.Equals(0))
            {
                int nveces = InvBD.MetodoPago.Where(p => p.MetodoPago1.Equals(Datospago.MetodoPago1)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.MetodoPago.InsertOnSubmit(Datospago);
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
                int nveces = InvBD.MetodoPago.Where(p => p.MetodoPago1.Equals(Datospago.MetodoPago1)).Count();
                if (nveces == 0)
                {
                    MetodoPago obj = InvBD.MetodoPago.Where(p => p.IdMetodoPago.Equals(id)).First();
                    obj.MetodoPago1 = Datospago.MetodoPago1;
                    obj.Descripcion = Datospago.Descripcion;
                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
            return Afectados;
        }



        //Eliminar Compra
        public int EliminarMPago(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                MetodoPago mpag = InvBD.MetodoPago.Where(p => p.IdMetodoPago.Equals(Id)).First();
                mpag.Estatus = 0;//Cambia el estatus en 0
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