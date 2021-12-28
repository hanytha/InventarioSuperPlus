using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class ExistenciaAlmacenController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: ExistenciaAlmacen
        public ActionResult ExistenciaAlmacen()
        {
            return View();
        }
        public JsonResult ConsultaExistenciaAlmacenes()
        {
            var Almacenes = InvBD.ExistenciaAlmacenG
                .Select(p => new
                {
                    p.IdExistenciaAlmacenG,
                    p.IdCompra,
                    p.NoPedido,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeOperacion,
                    p.IdAsignacion,
                    p.IdSitio,
                    p.IdArticulo,
                    p.NombreEmpresa,
                    p.IdProveedor
                });
            return Json(Almacenes, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaExistenciaAlmacen(long Id)
        {
            var Almacenes = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(Id))
                .Select(p => new
                {
                    p.IdExistenciaAlmacenG,
                    p.IdCompra,
                    p.NoPedido,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeOperacion,
                    p.IdAsignacion,
                    p.IdSitio,
                    p.IdArticulo,
                    p.NombreEmpresa,
                    p.IdProveedor
                });
            return Json(Almacenes, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la Existencia
        public int GuardarAlmacen(ExistenciaAlmacenG DatosAlmacen)
        {
            int Afectados = 0;
            try
            {
                long id = DatosAlmacen.IdExistenciaAlmacenG;
                if (id.Equals(0))
                {
                    //int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)).Count();
                    int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)
                      && p.ExitenciaInicial.Equals(DatosAlmacen.ExitenciaInicial)
                    && p.IdCompra.Equals(DatosAlmacen.IdCompra)
                    && p.ExitenciaActual.Equals(DatosAlmacen.ExitenciaActual)
                    && p.FechaDeIngreso.Equals(DatosAlmacen.FechaDeIngreso)
                    //&& p.FechaFinal.Equals(DatosAlmacen.FechaFinal)
                    && p.Coste.Equals(DatosAlmacen.Coste)
                    && p.TipoDeOperacion.Equals(DatosAlmacen.TipoDeOperacion)
                    && p.IdAsignacion.Equals(DatosAlmacen.IdAsignacion)
                    && p.IdSitio.Equals(DatosAlmacen.IdSitio)
                    && p.IdArticulo.Equals(DatosAlmacen.IdArticulo)
                    && p.NombreEmpresa.Equals(DatosAlmacen.NombreEmpresa)
                    && p.IdProveedor.Equals(DatosAlmacen.IdProveedor)
                    && p.Coste.Equals(DatosAlmacen.Coste)
                    ).Count();
                    if (nveces == 0)
                    {
                        InvBD.ExistenciaAlmacenG.InsertOnSubmit(DatosAlmacen);
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
                    int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)
                    && p.ExitenciaInicial.Equals(DatosAlmacen.ExitenciaInicial)
                    && p.IdCompra.Equals(DatosAlmacen.IdCompra)
                    && p.ExitenciaActual.Equals(DatosAlmacen.ExitenciaActual)
                    && p.FechaDeIngreso.Equals(DatosAlmacen.FechaDeIngreso)
                     && p.Coste.Equals(DatosAlmacen.Coste)
                    && p.TipoDeOperacion.Equals(DatosAlmacen.TipoDeOperacion)
                    && p.IdAsignacion.Equals(DatosAlmacen.IdAsignacion)
                    && p.IdSitio.Equals(DatosAlmacen.IdSitio)
                      && p.IdArticulo.Equals(DatosAlmacen.IdArticulo)
                    && p.NombreEmpresa.Equals(DatosAlmacen.NombreEmpresa)
                    && p.IdProveedor.Equals(DatosAlmacen.IdProveedor)
                    && p.Coste.Equals(DatosAlmacen.Coste)).Count();
                    if (nveces == 0)
                    {
                        ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
                        obj.IdCompra = DatosAlmacen.IdCompra;
                        obj.NoPedido = DatosAlmacen.NoPedido;
                        obj.ExitenciaInicial = DatosAlmacen.ExitenciaInicial;
                        obj.ExitenciaActual = DatosAlmacen.ExitenciaActual;
                        obj.FechaDeIngreso = DatosAlmacen.FechaDeIngreso;
                        obj.TipoDeOperacion = DatosAlmacen.TipoDeOperacion;
                        obj.Coste = DatosAlmacen.Coste;
                        obj.IdAsignacion = DatosAlmacen.IdAsignacion;
                        obj.IdSitio = DatosAlmacen.IdSitio;
                        obj.IdArticulo = DatosAlmacen.IdArticulo;
                        obj.NombreEmpresa = DatosAlmacen.NombreEmpresa;
                        obj.IdProveedor = DatosAlmacen.IdProveedor;
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

        //Eliminar Existencia
        //public int EliminarAlmacen(long Id)
        //{
        //    int nregistradosAfectados = 0;
        //    try
        //    {//Consulta los datos y el primer Id que encuentra  lo compara
        //        ExistenciaAlmacenG almacenG = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(Id)).First();
        //        almacenG.Estatus = 0;//Cambia el estatus en 0
        //        InvBD.SubmitChanges();//Guarda los datos en la Base de datos
        //        nregistradosAfectados = 1;//Se pudo realizar
        //    }
        //    catch (Exception ex)
        //    {
        //        nregistradosAfectados = 0;
        //    }
        //    return nregistradosAfectados;
        //}
    }
}
