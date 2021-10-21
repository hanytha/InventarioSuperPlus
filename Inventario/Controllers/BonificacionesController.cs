using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class BonificacionesController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Bonificaciones
        public ActionResult Bonificaciones()
        {
            return View();
        }
        public JsonResult ConsultaBonificaciones()
        {
            var bonificaciones = InvBD.Bonificaciones.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdBonificaciones,
                    p.NombreArticulo,
                    p.IdUnidadDeMedida,
                    p.UnidadDeMedida,
                    p.IdCompra,
                    p.Cantidad,
                    p.NombreProveedor,
                    p.MarcaArticulo,
                    p.Estatus,

                });
            return Json(bonificaciones, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaBonificacion(long Id)
        {
            var bonificacion = InvBD.Bonificaciones.Where(p => p.IdBonificaciones.Equals(Id))
                .Select(p => new
                {
                    p.IdBonificaciones,
                    p.NombreArticulo,
                    p.IdUnidadDeMedida,
                    p.UnidadDeMedida,
                    p.IdCompra,
                    p.Cantidad,
                    p.NombreProveedor,
                    p.MarcaArticulo,
                    p.Estatus,

                });
            return Json(bonificacion, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarBonificacion(Bonificaciones DatosBonificacion)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosBonificacion.IdBonificaciones;
            if (id.Equals(0))
            {
                int nveces = InvBD.Bonificaciones.Where(p => p.NombreArticulo.Equals(DatosBonificacion.NombreArticulo)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Bonificaciones.InsertOnSubmit(DatosBonificacion);
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
                int nveces = InvBD.Bonificaciones.Where(p => p.NombreArticulo.Equals(DatosBonificacion.NombreArticulo) && p.IdUnidadDeMedida.Equals(DatosBonificacion.IdUnidadDeMedida) && p.Cantidad.Equals(DatosBonificacion.Cantidad) && p.NombreProveedor.Equals(DatosBonificacion.NombreProveedor)&&p.MarcaArticulo.Equals(DatosBonificacion.MarcaArticulo)).Count();
                if (nveces == 0)
                {
                   Bonificaciones obj = InvBD.Bonificaciones.Where(p => p.IdBonificaciones.Equals(id)).First();
                    obj.NombreArticulo = DatosBonificacion.NombreArticulo;
                    obj.IdUnidadDeMedida = DatosBonificacion.IdUnidadDeMedida;
                    obj.UnidadDeMedida = DatosBonificacion.UnidadDeMedida;
                    obj.Cantidad = DatosBonificacion.Cantidad;
                    obj.NombreProveedor = DatosBonificacion.NombreProveedor;
                    obj.MarcaArticulo = DatosBonificacion.MarcaArticulo;
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
        public int EliminarBonificacion(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Bonificaciones bonis = InvBD.Bonificaciones.Where(p => p.IdBonificaciones.Equals(Id)).First();
                bonis.Estatus = 0;//Cambia el estatus en 0
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