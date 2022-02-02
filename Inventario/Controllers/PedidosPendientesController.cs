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

    public class PedidosPendientesController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: PedidosPendientes
        public ActionResult PedidosPendientes()
        {
            return View();
        }
        //****************************************************************************************************************************
        //****************************Consulta de pedidos internos***********************************************************

        public JsonResult ConsultaPedidosNumeroPedido()
        {
            string NoPedido = "";
            string IdAsignacion = "";
            string IdTienda = "";
            string NomTienda = "";

            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1)).OrderBy(p => p.NumeroPedido)
               .Select(p => new
               {
                   pedido = p.NumeroPedido,
                   asignacion = p.IdAsignacion,
                   Idtienda = p.IdSitio,
                   tiendas = p.Sitio,

               });
            if (Pedidos.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long pedi = Pedidos.Count();

                foreach (var numero in Pedidos)
                {
                    if (contador == 0)
                    {
                        tem1 = numero.pedido;
                        tem2 = (int)numero.asignacion;
                        tem3 = (int)numero.Idtienda;

                        NoPedido += numero.pedido + ",";
                        IdAsignacion += numero.asignacion + ",";
                        IdTienda += numero.Idtienda + ",";
                        NomTienda += numero.tiendas + ",";

                    }
                    if (numero.pedido != tem1 || numero.asignacion != tem2 || numero.Idtienda != tem3)
                    {
                        NoPedido += numero.pedido + ",";
                        IdAsignacion += numero.asignacion + ",";
                        IdTienda += numero.Idtienda + ",";
                        NomTienda += numero.tiendas + ",";

                        tem1 = numero.pedido;
                        tem2 = (int)numero.asignacion;
                        tem3 = (int)numero.Idtienda;

                        contador++;
                    }
                    else
                    {
                        contador++;
                    }
                }
            }
            else
            {
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                IdTienda += "0" + ",";
                NomTienda += "0" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
                IdTienda = IdTienda.Substring(0, IdTienda.Length - 1),
                NomTienda = NomTienda.Substring(0, NomTienda.Length - 1)
            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }

        //*************************************************************************************************************
        //--------------------------------Consulta los artículos por ID-------------------------------------------
        public JsonResult ConsultaPedidoXNumero(long Num)
        {
            var articulo = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num))
                .Select(p => new
                {
                    p.NumeroPedido,
                    p.NumPedidoProveedor,
                    p.CantidadSolicitada,
                    p.IdAsignacion,
                    p.IdSitio,
                    p.Sitio,
                    p.IdArticulo,
                    p.Articulo,
                    p.IdProveedor,
                    p.Proveedor,
                    p.Fecha,

                });
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }

        //*****************Consulta los articulos por pedidos y su stock en la tabala de comprasArticulos*************************

        public JsonResult ConsultaPedidosNumero(long Num)
        {
            string solicitada = "";
            string IdArticulo = "";
            string Articulo = "";
            string stock = "";
            string NoPedidoG = "";

            var pedidosNum = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    solicitada = p.CantidadSolicitada,
                    articulo = p.Articulo,
                    IdArticulo = p.IdArticulo,
                    sitio = p.NumeroPedido,

                });

            if (pedidosNum.Count() > 0)
            {
                foreach (var ped in pedidosNum)
                {
                    IdArticulo += ped.IdArticulo + ",";
                    Articulo += ped.articulo + ",";
                    solicitada += ped.solicitada + ",";
                    NoPedidoG += ped.sitio + ",";

                    var consultaStock = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(ped.IdArticulo))
                        .Select(p => new
                        {
                            stock = p.StockActual,

                        });

                    int SumaStock = 0;

                    foreach (var com in consultaStock)
                    {
                        SumaStock = (int)(SumaStock + com.stock);
                    }
                    stock += SumaStock + ",";
                }
            }
            else
            {
                IdArticulo += "0" + ",";
                Articulo += "0" + ",";
                solicitada += "0" + ",";
                stock += "0" + ",";
                NoPedidoG += "0" + ",";

            }

            var compras = new
            {
                solicitada = solicitada.Substring(0, solicitada.Length - 1),
                Articulo = Articulo.Substring(0, Articulo.Length - 1),
                IdArticulo = IdArticulo.Substring(0, IdArticulo.Length - 1),
                stock = stock.Substring(0, stock.Length - 1),
                NoPedidoG = NoPedidoG.Substring(0, NoPedidoG.Length - 1)
            };
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
        //**************************************************************************
        //***********************Función para guardar los datos del proveedor en compra interno*****************************
        public long GuardarProveedorInterno(CompraInterno DatosCompra)
        {
            long Afectados = 0;
            long id = DatosCompra.IdCompraInterno;
            if (id.Equals(0))
            {
                int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(DatosCompra.NoPedido)
                  //&& p.NoPedidoProveedor.Equals(DatosCompra.NoPedidoProveedor)
                  //&& p.IdProveedor.Equals(DatosCompra.IdProveedor)
                  //&& p.Proveedor.Equals(DatosCompra.Proveedor)
                  //&& p.FechaIngreso.Equals(DatosCompra.FechaIngreso)
                  //&& p.IdSitio.Equals(DatosCompra.IdSitio)
                  //&& p.Sitio.Equals(DatosCompra.Sitio)
                  //&& p.IdAsignacion.Equals(DatosCompra.IdAsignacion)

                  ).Count();

                if (nveces == 0)
                {
                    InvBD.CompraInterno.InsertOnSubmit(DatosCompra);
                    InvBD.SubmitChanges();

                    var IdCompra = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(DatosCompra.NoPedido)

             && p.NoPedidoProveedor.Equals(DatosCompra.NoPedidoProveedor)
             && p.IdProveedor.Equals(DatosCompra.IdProveedor)
             && p.Proveedor.Equals(DatosCompra.Proveedor)
             && p.FechaIngreso.Equals(DatosCompra.FechaIngreso)
             && p.IdSitio.Equals(DatosCompra.IdSitio)
             && p.Sitio.Equals(DatosCompra.Sitio)
             && p.IdAsignacion.Equals(DatosCompra.IdAsignacion)

              ).First();
                    Afectados = IdCompra.IdCompraInterno;
                }
                else
                {
                    Afectados = -1;
                }
            }
            else
            {
                int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(DatosCompra.NoPedido)
                && p.NoPedidoProveedor.Equals(DatosCompra.NoPedidoProveedor)
                && p.IdProveedor.Equals(DatosCompra.IdProveedor)
                && p.Proveedor.Equals(DatosCompra.Proveedor)
                && p.FechaIngreso.Equals(DatosCompra.FechaIngreso)
                && p.IdSitio.Equals(DatosCompra.IdSitio)
                && p.Sitio.Equals(DatosCompra.Sitio)
                && p.IdAsignacion.Equals(DatosCompra.IdAsignacion)

                ).Count();
                if (nveces == 0)
                {
                    CompraInterno obj = InvBD.CompraInterno.Where(p => p.IdCompraInterno.Equals(id)).First();
                    obj.NoPedido = DatosCompra.NoPedido;
                    obj.NoPedidoProveedor = DatosCompra.NoPedidoProveedor;
                    obj.IdProveedor = DatosCompra.IdProveedor;
                    obj.Proveedor = DatosCompra.Proveedor;
                    obj.FechaIngreso = DatosCompra.FechaIngreso;
                    obj.IdSitio = DatosCompra.IdSitio;
                    obj.Sitio = DatosCompra.Sitio;
                    obj.IdAsignacion = DatosCompra.IdAsignacion;

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

        //**************Termina********************************************************************************
        //*******************************Guarda los datos en la segunda tabla*************************************************

        public int GuardarArticulosAlmacen(ExistenciaAlmacenG DatosTienda)
        {
            int Afectados = 0;

            long id = (long)DatosTienda.IdExistenciaAlmacenG;
            if (id.Equals(0))
            {
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(DatosTienda.IdExistenciaAlmacenG)).Count();

                if (nveces == 0)
                {
                    InvBD.ExistenciaAlmacenG.InsertOnSubmit(DatosTienda);
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
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(DatosTienda.IdExistenciaAlmacenG)
                && p.IdCompra.Equals(DatosTienda.IdCompra)
                && p.IdCompraInterno.Equals(DatosTienda.IdCompraInterno)
                && p.ExitenciaInicial.Equals(DatosTienda.ExitenciaInicial)
                && p.ExitenciaActual.Equals(DatosTienda.ExitenciaActual)
                && p.IdArticulo.Equals(DatosTienda.IdArticulo)
                && p.Articulo.Equals(DatosTienda.Articulo)
                && p.NoPedidoG.Equals(DatosTienda.NoPedidoG)
                ).Count();


                if (nveces == 0)
                {
                    ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();

                    obj.IdCompra = DatosTienda.IdCompra;
                    obj.IdCompraInterno = DatosTienda.IdCompraInterno;
                    obj.ExitenciaInicial = DatosTienda.ExitenciaInicial;
                    obj.ExitenciaActual = DatosTienda.ExitenciaActual;
                    obj.IdArticulo = DatosTienda.IdArticulo;
                    obj.Articulo = DatosTienda.Articulo;
                    obj.NoPedidoG = DatosTienda.NoPedidoG;

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
        //-----------------------Consulta los números para la resta del stock------------------
        /* public JsonResult ConsultaArticulosId(long ID)
         {
             var articulo = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(ID)).OrderBy(p => p.FechaIngreso)
                 .Select(p => new
                 {
                     p.IdCompra,
                     p.IdArticulo,
                     p.Articulo,
                     p.StockActual,

                 });
             return Json(articulo, JsonRequestBehavior.AllowGet);
         }*/
        //-----------------------------------------Segunda consulta para restar el stock**************

        //public JsonResult ConsultaRestaStock(long ID, ComprasArticulos DatosCompra)
        //{
        //    string IdCompra = "";
        //    string IdArticulo = "";
        //    string Articulo = "";

        //    string StockActual = "";

        //    var consultaStock = from comprs in InvBD.ComprasArticulos
        //                        join almacen in InvBD.ExistenciaAlmacenG
        //                    on comprs.IdArticulo equals almacen.IdArticulo
        //                        where comprs.IdArticulo.Equals(ID)
        //                        select new
        //                        {
        //                            idCompras = comprs.IdCompra,
        //                            idArticulos = comprs.IdArticulo,
        //                            articulos = comprs.Articulo,
        //                            total = comprs.StockActual,
        //                            resta = almacen.ExitenciaActual,

        //                        };

        //    int resultado = 0;
        //    int contador = 0;
        //    int Afectados = 0;

        //    foreach (var consulta in consultaStock)
        //    {

        //        resultado = (int)consulta.total - (int)consulta.resta;

        //        if (resultado <= consulta.total)
        //        {

        //            ComprasArticulos obj = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(ID)).First();
        //            obj.StockActual = DatosCompra.StockActual;
        //            InvBD.SubmitChanges();
        //            Afectados = 1;


        //        }
        //        if (resultado > consulta.total)
        //        {
        //            while (contador == consulta.resta)
        //            {
        //                contador++;
        //            }

        //        }
        //    }

        //    return Json(consultaStock, JsonRequestBehavior.AllowGet);

        //}
        //--------------------------Funcion para restar a los stpck de los articulos----------------------------


        public JsonResult ConsultaStockArticulo(string DatosArticulos)
        {

            string[] Articulos = DatosArticulos.Split('/');
            int consulta = 0;

            for (int i = 0; 1 < Articulos.GetLength(0); i++)
            {
                string[] Cantidad = Articulos[i].Split(':');

                int resultado = 0;

                var ConsultaIDArticulo = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(Convert.ToInt32(Cantidad[0])) && p.StockActual > 0).OrderBy(p => p.FechaIngreso)
                .Select(p => new
                {
                    p.IdCompra,
                    p.IdArticulo,
                    p.Articulo,
                    p.StockActual

                });

                Double Diferencia = Convert.ToInt32(Cantidad[1]);

                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompra);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);

                    if (Diferencia > 0)
                    {
                        Double NExistencia = 0;

                        if (con.StockActual == Diferencia)
                        {
                            Diferencia = 0;
                            NExistencia = 0;
                        }
                        else if (con.StockActual > Diferencia)
                        {

                            NExistencia = (Double)con.StockActual - Diferencia;
                            Diferencia = 0;
                        }
                        else
                        {
                            Diferencia = Diferencia - (Double)con.StockActual;
                            NExistencia = 0;
                        }

                        consulta = GuardarNStock((long)con.IdCompra,(long)con.IdArticulo, NExistencia);
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


            }

            return Json(consulta, JsonRequestBehavior.AllowGet);

        }

        //---------Guardar el nuevo Stock----------------------
        public int GuardarNStock(long ID,long IDA, double NExistencia)
        {
            int nregistradosAfectados = 0;
            //try
            //{
            ComprasArticulos mpag = InvBD.ComprasArticulos.Where(p => p.IdCompra.Equals(ID)&& p.IdArticulo.Equals(IDA)).First();
            mpag.StockActual = NExistencia;//Cambia el estatus en 0
            InvBD.SubmitChanges();//Guarda los datos en la Base de datos
            nregistradosAfectados = 1;//Se pudo realizar
            //}
            //catch (Exception ex)
            //{
            //    nregistradosAfectados = 0;
            //}
            return nregistradosAfectados;
        }




        //----------------------Cambia el estatus de los pedidos solventados--------------------
        public int OcultarPeidos(long No)
        {
            int nregistradosAfectados = 0;
            try
            {
                PedidosInternos mpag = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(No)).First();
                mpag.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
        //--------------Termina------------------------------------------------


    }
}