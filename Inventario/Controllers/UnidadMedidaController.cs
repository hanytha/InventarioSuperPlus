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
    public class UnidadMedidaController : Controller
    {//conexion con DB

        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: UnidadMedida
        public ActionResult UnidadMedida()
        {
            return View();
        }
        public JsonResult ConsultaUnidadDeMedidas()
        {
            var medidas = InvBD.UnidadDeMedida.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdUnidadDeMedida,
                    p.Unidad
                });
            return Json(medidas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaUnidadDeMedida(long Id)
        {
            var medida = InvBD.UnidadDeMedida.Where(p => p.IdUnidadDeMedida.Equals(Id))

                .Select(p => new
                {
                    p.IdUnidadDeMedida,
                    p.Unidad
                });
            return Json(medida, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarUnidadDeMedida(UnidadDeMedida DatosMedidas)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosMedidas.IdUnidadDeMedida;
            if (id.Equals(0))
            {
                int nveces = InvBD.UnidadDeMedida.Where(p => p.Unidad.Equals(DatosMedidas.Unidad)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.UnidadDeMedida.InsertOnSubmit(DatosMedidas);
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
                int nveces = InvBD.UnidadDeMedida.Where(p => p.Unidad.Equals(DatosMedidas.Unidad)).Count();
                if (nveces == 0)
                {
                    UnidadDeMedida obj = InvBD.UnidadDeMedida.Where(p => p.IdUnidadDeMedida.Equals(id)).First();
                    obj.Unidad = DatosMedidas.Unidad;
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
        public int EliminarUnidadDeMedida(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                UnidadDeMedida medida = InvBD.UnidadDeMedida.Where(p => p.IdUnidadDeMedida.Equals(Id)).First();
                medida.Estatus = 0;//Cambia el estatus en 0
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
