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
                    p.Id,
                    p.Nombre1,
                    p.Nombre2,
                    p.EstadoInicial,
                    p.NombreProveedor,
                    p.Stock,
                    p.IdEntradas,
                    p.IdTienda,
                    p.IdUnidadDeMedida,
                    p.IdAreas,
                    p.IdMarca,
                    p.IdCategorias,
                    p.IdProveedor,
                    p.ExistenciaActual,
                    p.UnidadDeMedida,
                    p.Categorias,
                    p.Marca,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveProveedor,
                    p.ClaveSAT,
                    p.PrecioUnitario,
                    p.Importe,
                    p.Imagen,
                    p.Fecha,
                    p.Estatus,

                });
            return Json(articulos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaArticulo(long Id)
        {
            var articulo = InvBD.Articulos.Where(p => p.Estatus.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.Nombre1,
                    p.Nombre2,
                    p.EstadoInicial,
                    p.NombreProveedor,
                    p.Stock,
                    p.IdEntradas,
                    p.IdTienda,
                    p.IdUnidadDeMedida,
                    p.IdAreas,
                    p.IdMarca,
                    p.IdCategorias,
                    p.IdProveedor,
                    p.ExistenciaActual,
                    p.UnidadDeMedida,
                    p.Categorias,
                    p.Marca,
                    p.Descripcion,
                    p.UnidadSAT,
                    p.ClaveProveedor,
                    p.ClaveSAT,
                    p.PrecioUnitario,
                    p.Importe,
                    p.Imagen,
                    p.Estatus,
                    p.Fecha
                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }

        public int GuardarArticulo(Articulos DatosArticulo)
        {
            int Afectados = 0;
            try
            {
                long id = DatosArticulo.Id;
                if (id.Equals(0))
                {
                    int nveces = InvBD.Articulos.Where(p => p.Nombre1.Equals(DatosArticulo.Nombre1) && p.Nombre2.Equals(DatosArticulo.Nombre2) && p.EstadoInicial.Equals(DatosArticulo.EstadoInicial) && p.NombreProveedor.Equals(DatosArticulo.NombreProveedor) && p.ExistenciaActual.Equals(DatosArticulo.ExistenciaActual) && p.UnidadDeMedida.Equals(DatosArticulo.UnidadDeMedida) && p.Categorias.Equals(DatosArticulo.Categorias) && p.NombreProveedor.Equals(DatosArticulo.NombreProveedor) && p.Marca.Equals(DatosArticulo.Marca) && p.Descripcion.Equals(DatosArticulo.Descripcion) && p.Marca.Equals(DatosArticulo.Marca) && p.UnidadSAT.Equals(DatosArticulo.UnidadSAT) && p.ClaveProveedor.Equals(DatosArticulo.ClaveProveedor) && p.ClaveSAT.Equals(DatosArticulo.ClaveSAT) && p.PrecioUnitario.Equals(DatosArticulo.PrecioUnitario) && p.Importe.Equals(DatosArticulo.Importe) && p.Imagen.Equals(DatosArticulo.Imagen)).Count();
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
                    int nveces = InvBD.Articulos.Where(p => p.Nombre1.Equals(DatosArticulo.Nombre1) && p.Nombre2.Equals(DatosArticulo.Nombre2) && p.EstadoInicial.Equals(DatosArticulo.EstadoInicial) && p.NombreProveedor.Equals(DatosArticulo.NombreProveedor) && p.ExistenciaActual.Equals(DatosArticulo.ExistenciaActual) && p.UnidadDeMedida.Equals(DatosArticulo.UnidadDeMedida) && p.Categorias.Equals(DatosArticulo.Categorias) && p.NombreProveedor.Equals(DatosArticulo.NombreProveedor) && p.Marca.Equals(DatosArticulo.Marca) && p.Descripcion.Equals(DatosArticulo.Descripcion) && p.Marca.Equals(DatosArticulo.Marca) && p.UnidadSAT.Equals(DatosArticulo.UnidadSAT) && p.ClaveProveedor.Equals(DatosArticulo.ClaveProveedor) && p.ClaveSAT.Equals(DatosArticulo.ClaveSAT) && p.PrecioUnitario.Equals(DatosArticulo.PrecioUnitario) && p.Importe.Equals(DatosArticulo.Importe) && p.Imagen.Equals(DatosArticulo.Imagen)).Count();
                    if (nveces == 0)
                    {
                        Articulos obj = InvBD.Articulos.Where(p => p.Id.Equals(id)).First();
                        obj.Nombre1 = DatosArticulo.Nombre1;
                        //obj.Id = DatosArticuloes.Id;
                        obj.Nombre2 = DatosArticulo.Nombre2;
                        obj.EstadoInicial = DatosArticulo.EstadoInicial;
                        obj.Stock = DatosArticulo.Stock;
                        obj.ExistenciaActual = DatosArticulo.ExistenciaActual;
                        obj.UnidadDeMedida = DatosArticulo.UnidadDeMedida;
                        obj.Categorias = DatosArticulo.Categorias;
                        obj.NombreProveedor = DatosArticulo.NombreProveedor;
                        obj.Marca = DatosArticulo.Marca;
                        obj.Descripcion = DatosArticulo.Descripcion;
                        obj.UnidadSAT = DatosArticulo.UnidadSAT;
                        obj.ClaveProveedor = DatosArticulo.ClaveProveedor;
                        obj.PrecioUnitario = DatosArticulo.PrecioUnitario;
                        obj.Imagen = DatosArticulo.Imagen;
                        InvBD.SubmitChanges();
                        Afectados = 1;
                    }
                    else
                    {
                        Afectados = -1;
                    }
                }
            }
            catch (Exception ex)
            {
                Afectados = 0;
            }
            return Afectados;
        }


        public int EliminarArticulo(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Articulos Prvdr = InvBD.Articulos.Where(p => p.Id.Equals(Id)).First();
                Prvdr.Estatus = 0;//Cambia el estatus en 0
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
