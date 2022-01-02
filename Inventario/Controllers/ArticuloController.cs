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
            var articulos = InvBD.Articulos.Where(p => p.Estatus.Equals(1)).OrderBy(p => p.FechaSistema)
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
<<<<<<< HEAD
=======
                    //p.Logo,
>>>>>>> alma
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
<<<<<<< HEAD
                    p.Estatus
=======
                    p.Estatus,
                    //FOTOMOSTRAR = Convert.ToBase64String(p.Logo.ToArray()),
>>>>>>> alma

                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
        //------------------------------------------------------------------------------------------------------------------------
        public JsonResult ConsultaArticuloXProveedor()
        {
            string IdArticulos = "";
            string NombreEmpresa = "";
            string IdUnidadDeMedida = "";
            string IdAreas = "";
            string IdMarca = "";
            string IdCategorias = "";
            string IdProveedor = "";
            string Proveedor = "";
            string Categoria = "";
            string NombreProveedor = "";
            string PrecioUnitarioPromedio = "";
            string Descripcion = "";
            string UnidadSAT = "";
            string ClaveSAT = "";
            string Fecha = "";
            string FechaSistema = "";
            string Unidad = "";
            string Area = "";
            string Marca = "";


            var articuloss = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    IdArticulos = p.IdArticulos,
                    NombreEmpresa = p.NombreEmpresa,
                    IdUnidadDeMedida = p.IdUnidadDeMedida,
                    IdAreas = p.IdAreas,
                    IdMarca = p.IdMarca,
                    IdCategorias = p.IdCategorias,
                    IdProveedor = p.IdProveedor,
                    Proveedor = p.Proveedor,
                    Categoria = p.Categoria,
                    NombreProveedor = p.NombreProveedor,
                    PrecioUnitarioPromedio = p.PrecioUnitarioPromedio,
                    Descripcion = p.Descripcion,
                    UnidadSAT = p.UnidadSAT,
                    ClaveSAT = p.ClaveSAT,
                    Fecha = p.Fecha,
                    FechaSistema = p.FechaSistema,
                    Unidad = p.Unidad,
                    Area = p.Area,
                    Marca = p.Marca,

                });
            foreach (var pro in articuloss)
            {
                IdArticulos += pro.IdArticulos + ",";
                NombreEmpresa += pro.NombreEmpresa + ",";
                IdUnidadDeMedida += pro.IdUnidadDeMedida + ",";
                IdAreas += pro.IdAreas + ",";
                IdMarca += pro.IdMarca + ",";
                IdCategorias += pro.IdCategorias + ",";
                IdProveedor += pro.IdProveedor + ",";

                //string[] nombre = pro.Proveedor.Split('#');

                //foreach (var uno in articuloss)
                //{
      
                //}

                Proveedor += pro.Proveedor + ",";
                Categoria += pro.Categoria + ",";
                NombreProveedor += pro.NombreProveedor + ",";
                PrecioUnitarioPromedio += pro.PrecioUnitarioPromedio + ",";
                Descripcion += pro.Descripcion + ",";
                UnidadSAT += pro.UnidadSAT + ",";
                ClaveSAT += pro.ClaveSAT + ",";
                Fecha += pro.Fecha + ",";
                FechaSistema += pro.FechaSistema + ",";
                Unidad += pro.Unidad + ",";
                Area += pro.Area + ",";
                Marca += pro.Marca + ",";

            }
            var Resultado = new {
                IdArticulos = IdArticulos.Substring(0, IdArticulos.Length - 1),
                NombreEmpresa = NombreEmpresa.Substring(0, NombreEmpresa.Length - 1),
                IdUnidadDeMedida = IdUnidadDeMedida.Substring(0, IdUnidadDeMedida.Length - 1),
                IdAreas = IdAreas.Substring(0, IdAreas.Length - 1),
                IdMarca = IdMarca.Substring(0, IdMarca.Length - 1),
                IdCategorias = IdCategorias.Substring(0, IdCategorias.Length - 1),
                IdProveedor = IdProveedor.Substring(0, IdProveedor.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                Categoria = Categoria.Substring(0, Categoria.Length - 1),
                NombreProveedor = NombreProveedor.Substring(0, NombreProveedor.Length - 1),
                PrecioUnitarioPromedio = PrecioUnitarioPromedio.Substring(0, PrecioUnitarioPromedio.Length - 1),
                Descripcion = Descripcion.Substring(0, Descripcion.Length - 1),
                UnidadSAT = UnidadSAT.Substring(0, UnidadSAT.Length - 1),
                ClaveSAT = ClaveSAT.Substring(0, ClaveSAT.Length - 1),
                Fecha = Fecha.Substring(0, Fecha.Length - 1),
                FechaSistema = FechaSistema.Substring(0, FechaSistema.Length - 1),
                Unidad = Unidad.Substring(0, Unidad.Length - 1),
                Area = Area.Substring(0, Area.Length - 1),
                Marca = Marca.Substring(0, Marca.Length - 1) };

            return Json(Resultado, JsonRequestBehavior.AllowGet);
        }
        //------------------------------------------------------------------------------------------------------------------------
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
<<<<<<< HEAD
=======
                    //DatosArticulo.Logo = Convert.FromBase64String(cadF);
>>>>>>> alma
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
<<<<<<< HEAD
                && p.FechaSistema.Equals(DatosArticulo.FechaSistema)).Count();


=======
                && p.FechaSistema.Equals(DatosArticulo.FechaSistema)
                && p.IdUnidadDeMedida.Equals(DatosArticulo.IdUnidadDeMedida)
                && p.IdAreas.Equals(DatosArticulo.IdAreas)
                && p.IdMarca.Equals(DatosArticulo.IdMarca)).Count();
>>>>>>> alma
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
<<<<<<< HEAD
      
=======
                    obj.IdUnidadDeMedida = DatosArticulo.IdUnidadDeMedida;
                    obj.Unidad = DatosArticulo.Unidad;
                    obj.IdAreas = DatosArticulo.IdAreas;
                    obj.Area = DatosArticulo.Area;
                    obj.IdMarca = DatosArticulo.IdMarca;
                    obj.Marca = DatosArticulo.Marca;
                    //obj.Logo = Convert.FromBase64String(cadF);
>>>>>>> alma
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

//----------------Retorna las otras vistas de artículos--------------------------
        // GET: Articulo
        public ActionResult Articulo2do()
        {
            return View();
        }

        // GET: Articulo
        public ActionResult Articulo3ro()
        {
            return View();
        }
//-------------Termina------------------------------------------
    }

}
