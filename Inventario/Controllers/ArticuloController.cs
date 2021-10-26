using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ArticuloController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Articulo
        public ActionResult Articulo()
        {
            return View();
        }
        public JsonResult ConsultaArticulos()
        {
            var articulos = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdArticulos,
                    p.NombreEmpresa,
                    p.IdUnidadDeMedida,
                    p.IdAreas,
                    p.IdMarca,
                    p.IdCategorias,
                    p.NombreProveedor,
                    p.PrecioUnitarioPromedio,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveSAT,
                    p.Fecha,
                    p.Logo

                });
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaArticulo(long Id)
        {
            var articulo = InvBD.Articulos.Where(p => p.IdArticulos.Equals(Id))
                .Select(p => new
                {
                    p.IdArticulos,
                    p.NombreEmpresa,
                    p.IdUnidadDeMedida,
                    p.IdAreas,
                    p.IdMarca,
                    p.IdCategorias,
                    p.NombreProveedor,
                    p.PrecioUnitarioPromedio,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveSAT,
                    p.Fecha,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Logo.ToArray()),


                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarArticulo(Articulos DatosArticulo, string cadF)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosArticulo.IdArticulos;
            if (id.Equals(0))
            {
                int nveces = InvBD.Articulos.Where(p => p.NombreEmpresa.Equals(DatosArticulo.NombreEmpresa)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Articulos.InsertOnSubmit(DatosArticulo);
                    DatosArticulo.Logo = Convert.FromBase64String(cadF);
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
                int nveces = InvBD.Articulos.Where(p => p.NombreEmpresa.Equals(DatosArticulo.NombreEmpresa) && p.NombreProveedor.Equals(DatosArticulo.NombreProveedor) && p.PrecioUnitarioPromedio.Equals(DatosArticulo.PrecioUnitarioPromedio) && p.Descripcion.Equals(DatosArticulo.Descripcion) && p.UnidadSAT.Equals(DatosArticulo.UnidadSAT) && p.ClaveSAT.Equals(DatosArticulo.ClaveSAT)  &&p.Fecha.Equals(DatosArticulo.Fecha) && p.Logo.Equals(DatosArticulo.Logo)).Count();
                if (nveces == 0)
                {
                    Articulos obj = InvBD.Articulos.Where(p => p.IdArticulos.Equals(id)).First();
                    obj.NombreEmpresa = DatosArticulo.NombreEmpresa;
                    obj.NombreProveedor = DatosArticulo.NombreProveedor;
                    obj.PrecioUnitarioPromedio = DatosArticulo.PrecioUnitarioPromedio;
                    obj.Descripcion = DatosArticulo.Descripcion;
                    obj.UnidadSAT = DatosArticulo.UnidadSAT;
                    obj.ClaveSAT = DatosArticulo.ClaveSAT;
                    obj.Fecha = DatosArticulo.Fecha;
                    obj.Logo = Convert.FromBase64String(cadF);


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
        public int EliminarArticulo(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Articulos articul = InvBD.Articulos.Where(p => p.IdArticulos.Equals(Id)).First();
                articul.Estatus = 0;//Cambia el estatus en 0
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
