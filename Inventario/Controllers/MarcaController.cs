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
    public class MarcaController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Marca
        public ActionResult Marca()
        {
            return View();
        }
        public JsonResult ConsultaMarcas()
        {
            var Marcas = InvBD.Marca.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdMarca,
                    p.Nombre,
                });
            return Json(Marcas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaMarca(long Id)
        {
            var Marca = InvBD.Marca.Where(p => p.IdMarca.Equals(Id))
                .Select(p => new
                {
                    p.IdMarca,
                    p.Nombre,
                });
            return Json(Marca, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarMarca(Marca DatosMarca)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosMarca.IdMarca;
            if (id.Equals(0))
            {
                int nveces = InvBD.Marca.Where(p => p.Nombre.Equals(DatosMarca.Nombre)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Marca.InsertOnSubmit(DatosMarca);
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
                int nveces = InvBD.Marca.Where(p => p.Nombre.Equals(DatosMarca.Nombre)).Count();
                if (nveces == 0)
                {
                    Marca obj = InvBD.Marca.Where(p => p.IdMarca.Equals(id)).First();
                    obj.Nombre = DatosMarca.Nombre;
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
        public int EliminarMarca(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Marca mar = InvBD.Marca.Where(p => p.IdMarca.Equals(Id)).First();
                mar.Estatus = 0;//Cambia el estatus en 0
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