using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class EntradaController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Entrada
        public ActionResult Entrada()
        {
            return View();
        }
        public JsonResult ConsultaEntradas()
        {
            var entradas = InvBD.Entradas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdEntradas,
                    p.NombreArticulo,
                    p.Cantidad,
                });
            return Json(entradas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaEntrada(long Id)
        {
            var entrada = InvBD.Entradas.Where(p => p.IdEntradas.Equals(Id))
                .Select(p => new
                {
                    p.IdEntradas,
                    p.NombreArticulo,
                    p.Cantidad,

                });
            return Json(entrada, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarEntrada(Entradas DatosEntrada)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosEntrada.IdEntradas;
            if (id.Equals(0))
            {
                int nveces = InvBD.Entradas.Where(p => p.NombreArticulo.Equals(DatosEntrada.NombreArticulo)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Entradas.InsertOnSubmit(DatosEntrada);
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
                int nveces = InvBD.Entradas.Where(p => p.NombreArticulo.Equals(DatosEntrada.NombreArticulo)&&p.Cantidad.Equals(DatosEntrada.Cantidad)).Count();
                if (nveces == 0)
                {
                    Entradas obj = InvBD.Entradas.Where(p => p.IdEntradas.Equals(id)).First();
                    obj.NombreArticulo = DatosEntrada.NombreArticulo;
                    obj.Cantidad = DatosEntrada.Cantidad;
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
        public int EliminarEntrada(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Entradas entra = InvBD.Entradas.Where(p => p.IdEntradas.Equals(Id)).First();
                entra.Estatus = 0;//Cambia el estatus en 0
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