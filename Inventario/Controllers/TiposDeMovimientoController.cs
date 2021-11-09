using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class TiposDeMovimientoController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: TiposDeMovimiento
        public ActionResult TiposDeMovimiento()
        {
            return View();
        }
        public JsonResult ConsultaTiposDeMovimientos()
        {
            var movimientos = InvBD.TipoDeMovimientos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdMovimientos,
                    p.IdArticulos,
                    p.TipoDeMovimiento,
                    p.Descripcion,
                    p.Estatus,

                });
            return Json(movimientos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaTipoDeMovimiento(long Id)
        {
            var movimiento = InvBD.TipoDeMovimientos.Where(p => p.IdMovimientos.Equals(Id))
                .Select(p => new
                {
                    p.IdMovimientos,
                    p.IdArticulos,
                    p.TipoDeMovimiento,
                    p.Descripcion,
                    p.Estatus,

                });
            return Json(movimiento, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarTipoDeMovimiento(TipoDeMovimientos DatosMovimiento)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosMovimiento.IdMovimientos;
            if (id.Equals(0))
            {
                int nveces = InvBD.TipoDeMovimientos.Where(p => p.TipoDeMovimiento.Equals(DatosMovimiento.TipoDeMovimiento)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.TipoDeMovimientos.InsertOnSubmit(DatosMovimiento);
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
                int nveces = InvBD.TipoDeMovimientos.Where(p => p.TipoDeMovimiento.Equals(DatosMovimiento.TipoDeMovimiento) && p.Descripcion.Equals(DatosMovimiento.Descripcion) ).Count();
                if (nveces == 0)
                {
                    TipoDeMovimientos obj = InvBD.TipoDeMovimientos.Where(p => p.IdMovimientos.Equals(id)).First();
                    obj.TipoDeMovimiento = DatosMovimiento.TipoDeMovimiento;
                    obj.Descripcion = DatosMovimiento.Descripcion;

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
        public int EliminarTipoDeMovimiento(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                TipoDeMovimientos tipoM = InvBD.TipoDeMovimientos.Where(p => p.IdMovimientos.Equals(Id)).First();
                tipoM.Estatus = 0;//Cambia el estatus en 0
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