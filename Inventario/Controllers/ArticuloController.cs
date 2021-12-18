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
    public class ArticuloController : Controller
    {

        //conexion con DB
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
                    p.IdProveedor,
                    p.Proveedor,
                    p.Categoria,
                    p.NombreProveedor,
                    p.PrecioUnitarioPromedio,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveSAT,
                    p.Fecha,
                    p.FechaSistema,
                    p.Unidad,
                    p.Area,
                    p.Marca,
                    p.Estatus,
                });
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }
//--------------------------------Consulta los artículos por ID-------------------------------------------
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
                    p.IdProveedor,
                    p.Proveedor,
                    p.Categoria,
                    p.NombreProveedor,
                    p.PrecioUnitarioPromedio,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveSAT,
                    p.Fecha,
                    p.FechaSistema,
                    p.Unidad,
                    p.Area,
                    p.Marca,
                    p.Estatus

                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
        //--------------------------------------------------------------------------------------------------------
        //Guardar los datos de la compra
        public int GuardarArticulo(Articulos DatosArticulo)
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
                int nveces = InvBD.Articulos.Where(p => p.NombreEmpresa.Equals(DatosArticulo.NombreEmpresa)
                && p.NombreProveedor.Equals(DatosArticulo.NombreProveedor)
                && p.IdProveedor.Equals(DatosArticulo.IdProveedor)
                && p.Proveedor.Equals(DatosArticulo.Proveedor)
                && p.IdUnidadDeMedida.Equals(DatosArticulo.IdUnidadDeMedida)
                && p.Unidad.Equals(DatosArticulo.Unidad)
                && p.IdMarca.Equals(DatosArticulo.IdMarca)
                && p.Marca.Equals(DatosArticulo.Marca)
                && p.IdAreas.Equals(DatosArticulo.IdAreas)
                && p.Area.Equals(DatosArticulo.Area)
                && p.IdCategorias.Equals(DatosArticulo.IdCategorias)
                && p.Categoria.Equals(DatosArticulo.Categoria)
                && p.PrecioUnitarioPromedio.Equals(DatosArticulo.PrecioUnitarioPromedio)
                && p.Descripcion.Equals(DatosArticulo.Descripcion)
                && p.UnidadSAT.Equals(DatosArticulo.UnidadSAT)
                && p.ClaveSAT.Equals(DatosArticulo.ClaveSAT)
                && p.Fecha.Equals(DatosArticulo.Fecha)
                && p.FechaSistema.Equals(DatosArticulo.FechaSistema)).Count();


                if (nveces == 0)
                {
                    Articulos obj = InvBD.Articulos.Where(p => p.IdArticulos.Equals(id)).First();

                    obj.NombreEmpresa = DatosArticulo.NombreEmpresa;
                    obj.NombreProveedor = DatosArticulo.NombreProveedor;
                    obj.IdProveedor = DatosArticulo.IdProveedor;
                    obj.Proveedor = DatosArticulo.Proveedor;
                    obj.IdUnidadDeMedida = DatosArticulo.IdUnidadDeMedida;
                    obj.Unidad = DatosArticulo.Unidad;
                    obj.IdMarca = DatosArticulo.IdMarca;
                    obj.Marca = DatosArticulo.Marca;
                    obj.IdAreas = DatosArticulo.IdAreas;
                    obj.Area = DatosArticulo.Area;
                    obj.IdCategorias = DatosArticulo.IdCategorias;
                    obj.Categoria = DatosArticulo.Categoria;
                    obj.PrecioUnitarioPromedio = DatosArticulo.PrecioUnitarioPromedio;
                    obj.Descripcion = DatosArticulo.Descripcion;
                    obj.UnidadSAT = DatosArticulo.UnidadSAT;
                    obj.ClaveSAT = DatosArticulo.ClaveSAT;
                    obj.Fecha = DatosArticulo.Fecha;
                    obj.FechaSistema = DatosArticulo.FechaSistema;
      
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


        //----------------------------------------------------------------------------------------------
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

        //---------------------------Consulta para obetener los proveedores y generar el checkbox-------------------------------------
        public JsonResult ConsultaProveedores()
        {
            var proveedores = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                   p.IdProveedores,
                   p.Nombre,

                });
            return Json(proveedores, JsonRequestBehavior.AllowGet);
        }


    }

}
