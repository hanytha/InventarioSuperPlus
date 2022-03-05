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
    public class CategoriaController : Controller
    {

        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Categoria
        public ActionResult Categoria()
        {
            return View();
        }
        public JsonResult ConsultaCategorias()
        {
            var Categorias = InvBD.Categorias.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdCategorias,
                    p.Tipo
                });
            return Json(Categorias, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaCategoria(long Id)
        {
            var Categoria = InvBD.Categorias.Where(p => p.IdCategorias.Equals(Id))
                .Select(p => new
                {
                    p.IdCategorias,
                    p.Tipo
                });
            return Json(Categoria, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarCategoria(Categorias DatosCategoria)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosCategoria.IdCategorias;
            if (id.Equals(0))
            {
                int nveces = InvBD.Categorias.Where(p => p.Tipo.Equals(DatosCategoria.Tipo)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Categorias.InsertOnSubmit(DatosCategoria);
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
                int nveces = InvBD.Categorias.Where(p => p.Tipo.Equals(DatosCategoria.Tipo)).Count();
                if (nveces == 0)
                {
                    Categorias obj = InvBD.Categorias.Where(p => p.IdCategorias.Equals(id)).First();
                    obj.Tipo = DatosCategoria.Tipo;
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
        public int EliminarCategoria(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Categorias catego = InvBD.Categorias.Where(p => p.IdCategorias.Equals(Id)).First();
                catego.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }

        //---------------------------------------------------------------------------------------------------------------------------

        public JsonResult ConsultaNot()
        {
            var compras = InvBD.ComprasArticulos.Where(p => p.Estatus.Equals(1) && p.StockActual <= 5)
                .Select(p => new
                {
                    p.Articulo,
                    p.StockActual

                }); ;
            return Json(compras, JsonRequestBehavior.AllowGet);
        }


        //-----------------------------------------Retorna las demas vistas de categoría----------------------------------------------
        // GET: Categoria
        public ActionResult Categoria2da()
        {
            return View();
        }
        // GET: Categoria
        public ActionResult Categoria3ra()
        {
            return View();
        }
        //----------------Termina------------------------------------------------------
    }
}