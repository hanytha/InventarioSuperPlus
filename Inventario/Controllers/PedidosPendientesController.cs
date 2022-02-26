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
            PedidosPendientesController pendientesArea = new PedidosPendientesController();
            pendientesArea.ConsultaPedidosNumeroPedidoArea();
            return View();
        }
        //****************************************************************************************************************************
        ////----------------------Mostrar los pedidos por proveedor en razor-----------------------------------------------------

        public void ConsultaPedidosNumeroPedidoArea()
        {
            ModeloPendientesArea modeloPedidosPendientes = new ModeloPendientesArea();
            ModeloPendientesArea.NumeroPedido = new List<long>();
            ModeloPendientesArea.NumeroPedidoProve = new List<long>();
            ModeloPendientesArea.IdAsignacion = new List<long>();
            ModeloPendientesArea.IdSitio = new List<long>();
            ModeloPendientesArea.IdProveedor = new List<long>();
            ModeloPendientesArea.Sitio = new List<string>();

            string NoPedido = "";
            string IdAsignacion = "";
            string IdTienda = "";
            string NomTienda = "";
            string IDProveedor = "";
            string NoPedidoProve = "";

            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1)).OrderBy(p => p.NumeroPedido)
                .Select(p => new
                {
                    pedido = p.NumeroPedido,
                    pedidoPro = p.NumPedidoProveedor,
                    asignacion = p.IdAsignacion,
                    Idtienda = p.IdSitio,
                    tiendas = p.Sitio,
                    IDProveedores = p.IdProveedor,
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
                        IDProveedor += numero.IDProveedores + ",";
                        NoPedidoProve += numero.pedidoPro + ",";

                    }
                    if (numero.pedido != tem1 || numero.asignacion != tem2 || numero.Idtienda != tem3)
                    {
                        NoPedido += numero.pedido + ",";
                        IdAsignacion += numero.asignacion + ",";
                        IdTienda += numero.Idtienda + ",";
                        NomTienda += numero.tiendas + ",";
                        IDProveedor += numero.IDProveedores + ",";
                        NoPedidoProve += numero.pedidoPro + ",";


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
                IDProveedor += "0" + ",";
                NoPedidoProve += "0" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
                IdTienda = IdTienda.Substring(0, IdTienda.Length - 1),
                NomTienda = NomTienda.Substring(0, NomTienda.Length - 1),
                IDProveedor = IDProveedor.Substring(0, IDProveedor.Length - 1),
                NoPedidoProve = NoPedidoProve.Substring(0, NoPedidoProve.Length - 1)

            };

            string[] NoPedidos = NoPedido.Substring(0, NoPedido.Length - 1).Split(',');
            string[] IDAsignaciones = IdAsignacion.Substring(0, IdAsignacion.Length - 1).Split(',');
            string[] IDTiendas = IdTienda.Substring(0, IdTienda.Length - 1).Split(',');
            string[] NOMTiendas = NomTienda.Substring(0, NomTienda.Length - 1).Split(',');
            string[] IDProveedores = IDProveedor.Substring(0, IDProveedor.Length - 1).Split(',');
            string[] NoPProveedor = NoPedidoProve.Substring(0, NoPedidoProve.Length - 1).Split(',');

            for (int i = 0; i < NoPedidos.GetLength(0); i++)
            {
                ModeloPendientesArea.Sitio.Add(NOMTiendas[i]);
                ModeloPendientesArea.NumeroPedido.Add(Convert.ToInt32(NoPedidos[i]));
                ModeloPendientesArea.IdAsignacion.Add(Convert.ToInt32(IDAsignaciones[i]));
                ModeloPendientesArea.IdSitio.Add(Convert.ToInt32(IDTiendas[i]));
                ModeloPendientesArea.IdProveedor.Add(Convert.ToInt32(IDProveedores[i]));
                ModeloPendientesArea.NumeroPedidoProve.Add(Convert.ToInt32(NoPProveedor[i]));
            }

        }


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
                && p.EstatusPedido.Equals(DatosCompra.EstatusPedido)

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
                    obj.EstatusPedido = DatosCompra.EstatusPedido;

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
        //-----------------------Consulta los artículos por ID de artículo y IDCompra para restar la cantidad aprobada-----------------

        public JsonResult ConsultaStockArticulo(string DatosArticulos)
        {

            // string[] Articulos = DatosArticulos.Split('/');
            string[] Articulos = DatosArticulos.Substring(0, DatosArticulos.Length - 1).Split('/');
            int consulta = 0;

            for (int i = 0; i < Articulos.GetLength(0); i++)
            {
                string[] Cantidad = Articulos[i].Split(':');

                int resultado = 0;

                var ConsultaIDArticulo = InvBD.ComprasArticulos.Where(p => p.IdArticulo.Equals(Convert.ToInt32(Cantidad[0])) && p.StockActual > 0).OrderBy(p => p.NoCompra)
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
                        Double NCantidad = 0;

                        if (con.StockActual == Diferencia)
                        {
                            Diferencia = 0;
                            NExistencia = 0;
                            NCantidad = (double)con.StockActual;
                        }
                        else if (con.StockActual > Diferencia)
                        {
                            NCantidad = Diferencia;
                            NExistencia = (Double)con.StockActual - Diferencia;
                            Diferencia = 0;
                            
                        }
                        else
                        {
                            Diferencia = Diferencia - (Double)con.StockActual;
                            NExistencia = 0;
                            NCantidad = (double)con.StockActual;
                        }

                        consulta = GuardarNStock((long)con.IdCompra, (long)con.IdArticulo, NExistencia, NCantidad, (string)con.Articulo);
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

        //---------Guardar el nuevo Stock en la tabla de comprasArticulos----------------------
        public int GuardarNStock(long ID, long IDA, double NExistencia, double NCantidad, string Articulo)
        {
            int nregistradosAfectados = 0;

           var con = ConsultaArt((long)ID, (long)IDA, (double) NCantidad, (string)Articulo);

            ComprasArticulos mpag = InvBD.ComprasArticulos.Where(p => p.IdCompra.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.StockActual = NExistencia;
            InvBD.SubmitChanges();

            nregistradosAfectados = 1;
            return nregistradosAfectados;

           
        }

        //------------------------------------------------------------------------------------------------------------


        public JsonResult ConsultaArt(long ID, long IDA, double NCantidad, string Articulo)

        {


            var articulo = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(0)).OrderByDescending(p => p.IdCompraInterno)
                .Select(p => new
                {
                    p.IdCompraInterno,
                    p.NoPedido,


                });
            var contador = 0;
            foreach (var b in articulo)
            {
                contador++;

                if (contador == 1)
                {
                    var IdCompra = ID;
                    var IdCompraInterno = b.IdCompraInterno;
                    var NoPedidoG = b.NoPedido;
                    var ExitenciaInicial = NCantidad;
                    var NomArticulo = Articulo;
                    var cons = GuardarCom((long)IdCompra,(long) IDA, (long)IdCompraInterno, (int)NoPedidoG, (double)ExitenciaInicial, (string)NomArticulo);
                }
            }


            return Json(articulo, JsonRequestBehavior.AllowGet);
        }

        //----------------------------------------------------------------------------------------------------------------

        public int GuardarCom(long IdCompra,long IDA, long IdCompraInterno, int NoPedidoG, double ExitenciaInicial, string NomArticulo)
        {
            int nregistradosAfectados = 0;

            ExistenciaAlmacenG com = new ExistenciaAlmacenG();
            com.IdCompra = IdCompra;
            com.IdCompraInterno = IdCompraInterno;
            com.NoPedidoG = NoPedidoG;
            com.ExitenciaInicial = ExitenciaInicial;
            com.ExitenciaActual = ExitenciaInicial;
            com.IdArticulo = IDA;
            com.Articulo = NomArticulo;
            InvBD.ExistenciaAlmacenG.InsertOnSubmit(com);
            InvBD.SubmitChanges();//Guarda los datos en la Base de datos
            nregistradosAfectados = 1;//Se pudo realizar
            return nregistradosAfectados;
        }



        //************************************************************************************************************************
        //-----------------------------Consulta los pedidos por número de comra para cambiar el estatus--------------------------------
        public JsonResult ConsultaOcultar(long No)

        {
            var articulo = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(No))
                .Select(p => new
                {
                    p.NumeroPedido,
                    p.IdArticulo,
                    p.Articulo,

                });
            foreach (var b in articulo)
            {
                OcultarPeidos((long)b.NumeroPedido, (long)b.IdArticulo);
            }
            return Json(articulo, JsonRequestBehavior.AllowGet);
        }
        //----------------------Cambia el estatus de los pedidos solventados en la tabla de pedidos internos--------------------
        public int OcultarPeidos(long No, long ID)
        {
            int nregistradosAfectados = 0;

                PedidosInternos mpag = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(No) && p.IdArticulo.Equals(ID)).First();
                mpag.Estatus = 0;
                InvBD.SubmitChanges();
                nregistradosAfectados = 1;

            return nregistradosAfectados;
        }
        //--------------Termina------------------------------------------------

    }
}