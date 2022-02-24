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
                          where comprs.EstatusPedido.Equals(1)&& exist.TipoDeOperacion.Equals("Devolucion")&& exist.ExitenciaActual < 0
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
            var Categoria = from comprs in InvBD.CompraInterno
                            join exist in InvBD.ExistenciaAlmacenG
                        on comprs.IdCompraInterno equals exist.IdCompraInterno
                            where exist.IdExistenciaAlmacenG.Equals(Id) && comprs.EstatusPedido.Equals(1) 
                            orderby exist.NoPedidoG
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
            return Json(Categoria, JsonRequestBehavior.AllowGet);
        }

        //-------------------------Guardar la devolución en mermas-----------------------------------

        public int GuardarMerma(MermasGeneral DatosMerma)
        {
            int Afectados = 0;


                    InvBD.MermasGeneral.InsertOnSubmit(DatosMerma);
                    InvBD.SubmitChanges();
                    Afectados = 1;
               
               
            
            return Afectados;
        }
        //-----------------------------------------------------------------
        public void ConsultaDevolución(long Id)
        {
            var devolucion = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(Id) && p.ExitenciaActual < 0)
                .Select(p => new
                {
                    
                    p.IdExistenciaAlmacenG,
                    p.TipoDeOperacion,


                });
            foreach (var g in devolucion)
            {
                Devolucion((long)g.IdExistenciaAlmacenG);
            }
 
        }
        //------------------------------------------------------------
        public int Devolucion(long IDE)
        {
            int nregistradosAfectados = 0;

            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(IDE)).First();
            mpag.TipoDeOperacion = "DEVOLUCION-ACEPTADA";
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;

            return nregistradosAfectados;
        }
        //--------------------------------------------------------------------------------------------------------------------------------------

        public JsonResult ConsultaStockArticulo(string DatosArticulos)
        {

            // string[] Articulos = DatosArticulos.Split('/');
            string[] Articulos = DatosArticulos.Split(':',',','/');

            int consulta = 0;

                int resultado = 0;

                var ConsultaIDArticulo = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(Convert.ToInt32(Articulos[1])) && p.IdCompra.Equals(Convert.ToInt32(Articulos[0]))).OrderBy(p => p.IdCompra)
                .Select(p => new
                {
                    p.IdCompra,
                    p.IdArticulo,
                    p.Articulo,
                    p.StockActual,
                    p.ExistenciaInicial,

                });

                Double Diferencia = Convert.ToInt32(Articulos[2]);
                Double IDExistencia = Convert.ToInt32(Articulos[3]);

                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompra);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);
                  
                

                    if (Diferencia > 0)
                    {
                        Double NExistencia = 0;

                    NExistencia = (double)Diferencia + (double) con.StockActual;

                        consulta = GuardarNStock((long)con.IdCompra, (long)con.IdArticulo, NExistencia, IDExistencia);
                        if (consulta == 0)
                        {
                            break;
                        }
                    }
                    else
                    {
                        break;
                    }
                }

            return Json(consulta, JsonRequestBehavior.AllowGet);

        }

        //---------Guardar el nuevo Stock en la tabla de comprasArticulos----------------------
        public int GuardarNStock(long ID, long IDA, double NExistencia, double IDExistencia)
        {
            int nregistradosAfectados = 0;

            var consul = ConsultaOcultar((long)IDA, (double)IDExistencia);

            ComprasArticulos mpag = InvBD.ComprasArticulos.Where(p => p.IdCompra.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.StockActual = NExistencia;
            InvBD.SubmitChanges();

            nregistradosAfectados = 1;
            return nregistradosAfectados;

        }
        //----------------------------------------------------------------------------------------------------------------------------------------
        public JsonResult ConsultaOcultar(long IDA, double IDExistencia)

        {
            var articulo = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(IDExistencia) && p.IdArticulo.Equals(IDA) && p.TipoDeOperacion.Equals("Devolucion"))
                .Select(p => new
                {
                    p.IdArticulo,
                    p.IdCompra,
                    p.TipoDeOperacion,
                    p.IdExistenciaAlmacenG,
                });
            foreach (var b in articulo)
            {
                OcultarPeidos((long)b.IdArticulo, (long)b.IdExistenciaAlmacenG);
            }
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
        //-------------------------------------------------------------------------------------------------------------------------------------
        public int OcultarPeidos(long ID, long IDE)
        {
            int nregistradosAfectados = 0;

            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(IDE) && p.IdArticulo.Equals(ID)).First();
            mpag.TipoDeOperacion = "DEVOLUCION-ACEPTADA";
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;

            return nregistradosAfectados;
        }
        //-------------------------------------------------------------------------------------------------------------------------------------

    }
}