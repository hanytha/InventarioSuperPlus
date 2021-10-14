using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class CompraController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: MetodoPago
        public ActionResult Compra()
        {
            return View();
        }
        public JsonResult ConsultaCompras()
        {
            var Compras = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.MetodoDePago
                });
            return Json(Compras, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaCompra(long Id)
        {
            var Compra = InvBD.Compra.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.MetodoDePago
                });
            return Json(Compra, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarCompra(Compra DatosCompra)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosCompra.Id;
            if (id.Equals(0))
            {
                int nveces = InvBD.Compra.Where(p => p.MetodoDePago.Equals(DatosCompra.MetodoDePago)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Compra.InsertOnSubmit(DatosCompra);
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
                int nveces = InvBD.Compra.Where(p => p.MetodoDePago.Equals(DatosCompra.MetodoDePago)).Count();
                if (nveces == 0)
                {
                    Compra obj = InvBD.Compra.Where(p => p.Id.Equals(id)).First();
                    obj.MetodoDePago = DatosCompra.MetodoDePago;
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
        public int EliminarCompra(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Compra compr = InvBD.Compra.Where(p => p.Id.Equals(Id)).First();
                compr.Estatus = 0;//Cambia el estatus en 0
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