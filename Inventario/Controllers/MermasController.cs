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

    public class MermasController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Mermas
        public ActionResult Mermas()
        {
            MermasController mermas = new MermasController();
            mermas.ConsultaCompraInternaJoinExistenciasAlmacen();
            return View();
        }

        public void ConsultaCompraInternaJoinExistenciasAlmacen()
        {

            ModeloMermas modeloMermas = new ModeloMermas();
            ModeloMermas.IdCompraInterno = new List<long>();
            ModeloMermas.IdProveedor = new List<long>();
            ModeloMermas.Proveedor = new List<string>();

            ModeloMermas.IdExistenciaAlmacenG = new List<long>();
            ModeloMermas.IdCompra = new List<long>();
            ModeloMermas.IdArticulo = new List<long>();
            ModeloMermas.ExitenciaInicial = new List<long>();
            ModeloMermas.ExitenciaActual = new List<long>();
            ModeloMermas.NoPedidoG = new List<long>();
            ModeloMermas.Articulo = new List<string>();
            ModeloMermas.TipoDeOperacion = new List<string>();
            ModeloMermas.Observaciones = new List<string>();

            var merma = from comprs in InvBD.CompraInterno
                          join exist in InvBD.ExistenciaAlmacenG
                      on comprs.IdCompraInterno equals exist.IdCompraInterno
                          where comprs.EstatusPedido.Equals(1)&& exist.TipoDeOperacion.Equals("DEVOLUCION")
                          orderby exist.IdCompraInterno
                          select new
                          {
                              IdProveedor = comprs.IdProveedor,
                              Proveedor = comprs.Proveedor,
                              IdCompra = exist.IdCompra,
                              IdCompraInterno = exist.IdCompraInterno,
                              IdArticulo = exist.IdArticulo,
                              Articulo = exist.Articulo,
                              ExitenciaInicial = exist.ExitenciaInicial,
                              ExitenciaActual = exist.ExitenciaActual,
                              NoPedidoG = exist.NoPedidoG,
                              Observaciones = exist.Observaciones,
                              TipoDeOperacion = exist.TipoDeOperacion,
                              IdExistenciaAlmacenG = exist.IdExistenciaAlmacenG,

                          };
            foreach (var mer in merma)
            {
                ModeloMermas.IdCompraInterno.Add((long)mer.IdCompraInterno);
                ModeloMermas.IdProveedor.Add((long)mer.IdProveedor);
                ModeloMermas.Proveedor.Add(mer.Proveedor);

                ModeloMermas.IdExistenciaAlmacenG.Add((long)mer.IdExistenciaAlmacenG);
                ModeloMermas.IdCompra.Add((long)mer.IdCompra);
                ModeloMermas.IdArticulo.Add((long)mer.IdArticulo);
                ModeloMermas.ExitenciaInicial.Add((long)mer.ExitenciaInicial);
                ModeloMermas.ExitenciaActual.Add((long)mer.ExitenciaActual);
                ModeloMermas.NoPedidoG.Add((long)mer.NoPedidoG);
                ModeloMermas.Articulo.Add(mer.Articulo);
                ModeloMermas.TipoDeOperacion.Add(mer.TipoDeOperacion);
                ModeloMermas.Observaciones.Add(mer.Observaciones);
            }

        }

        //------------------------------------------------------------------------------------------------------------------------
        public JsonResult ConsultaArticuloM(long Id)
        {
            var Categoria = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(Id))
                .Select(p => new
                {
                    p.IdExistenciaAlmacenG,
                    p.IdArticulo,
                    p.IdCompra,
                    p.IdCompraInterno,
                    p.NoPedidoG,
                    p.Articulo,
                    p.TipoDeOperacion,
                    p.Observaciones,
                    p.ExitenciaActual,
                    p.ExitenciaInicial,

                });
            return Json(Categoria, JsonRequestBehavior.AllowGet);
        }

    }
}