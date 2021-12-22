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
    public class ExistenciasController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Existencias
        public ActionResult Existencias()
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
                    //p.Logo,
                    p.Estatus,
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
                    //FOTOMOSTRAR = Convert.ToBase64String(p.Logo.ToArray()),

                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }

        //Guardar los datos del proveedor
        public int GuardarArticulo(Articulos DatosArticulo, string cadF)
        {
            int Afectados = 0;

            long id = DatosArticulo.IdArticulos;
            if (id.Equals(0))
            {
                //Guardar el proveedor cuando no exista uno con el mismo nombre en la base de datos
                int nveces = InvBD.Articulos.Where(p => p.NombreEmpresa.Equals(DatosArticulo.NombreEmpresa)).Count();
                if (nveces == 0)
                {
                    //DatosArticulo.Logo = Convert.FromBase64String(cadF);
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
                && p.IdCategorias.Equals(DatosArticulo.IdCategorias)
                && p.Descripcion.Equals(DatosArticulo.Descripcion)
                && p.PrecioUnitarioPromedio.Equals(DatosArticulo.PrecioUnitarioPromedio)
                && p.UnidadSAT.Equals(DatosArticulo.UnidadSAT)
                && p.ClaveSAT.Equals(DatosArticulo.ClaveSAT)
                && p.Fecha.Equals(DatosArticulo.Fecha)
                && p.FechaSistema.Equals(DatosArticulo.FechaSistema)
                && p.IdUnidadDeMedida.Equals(DatosArticulo.IdUnidadDeMedida)
                && p.IdAreas.Equals(DatosArticulo.IdAreas)
                && p.IdMarca.Equals(DatosArticulo.IdMarca)).Count();
                if (nveces == 0)
                {
                    Articulos obj = InvBD.Articulos.Where(p => p.IdArticulos.Equals(id)).First();
                    obj.NombreEmpresa = DatosArticulo.NombreEmpresa;
                    obj.IdCategorias = DatosArticulo.IdCategorias;
                    obj.Categoria = DatosArticulo.Categoria;
                    obj.NombreProveedor = DatosArticulo.NombreProveedor;
                    obj.Descripcion = DatosArticulo.Descripcion;
                    obj.PrecioUnitarioPromedio = DatosArticulo.PrecioUnitarioPromedio;
                    obj.UnidadSAT = DatosArticulo.UnidadSAT;
                    obj.ClaveSAT = DatosArticulo.ClaveSAT;
                    obj.Fecha = DatosArticulo.Fecha;
                    obj.FechaSistema = DatosArticulo.FechaSistema;
                    obj.IdUnidadDeMedida = DatosArticulo.IdUnidadDeMedida;
                    obj.Unidad = DatosArticulo.Unidad;
                    obj.IdAreas = DatosArticulo.IdAreas;
                    obj.Area = DatosArticulo.Area;
                    obj.IdMarca = DatosArticulo.IdMarca;
                    obj.Marca = DatosArticulo.Marca;
                    //obj.Logo = Convert.FromBase64String(cadF);

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

