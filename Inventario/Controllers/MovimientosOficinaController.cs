using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class MovimientosOficinaController : Controller
    {
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        public object Datetime { get; private set; }

        // GET: Supervision
        public ActionResult MovimientosOficina()
        {
            return View();
        }
        //Obtener el nombre del area en el modal de pedidos internos
        public JsonResult BDOficina(long Id)
        {
            var datos = InvBD.Areas.Where(p => p.Estatus.Equals(1) && p.IdAreas.Equals(Id))
                .Select(p => new
                {
                    ID = p.IdAreas,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Mostrar los proveedores de los articulos aceptados
        public JsonResult ConsultaArticulos(long IDTienda)
        {

            string id = "";
            string NoPedido = "";
            string Fecha = "";//Es la fecha de la ultima compra reaizada
            string Stock = "";//Es la suma del stock atcual de todas las compras
            string IdSitio = "";
            string IdArticulos = "";
            string Articulo = "";
            string IdCmpraInt = "";
            string IdTienda = "";
            string Sitio = "";
            string IdProveedor = "";
            string Proveedor = "";

            string IdExistenciaAlmacenG = "";
            var ConsultaArticulo = from CompraInterno in InvBD.CompraInterno
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on CompraInterno.IdCompraInterno equals ExistenciaAlmacenG.IdCompraInterno

                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.IdAsignacion.Equals(1) && CompraInterno.EstatusPedido.Equals(1) && ExistenciaAlmacenG.ExitenciaActual >= 0
                                   select new

                                   {
                                       id = ExistenciaAlmacenG.IdArticulo,
                                       NoPedido = CompraInterno.NoPedido,
                                       IdCmpraInt = ExistenciaAlmacenG.IdCompraInterno,
                                       IdProveedor = CompraInterno.IdProveedor,
                                       Proveedor = CompraInterno.Proveedor,
                                       IdSitio = CompraInterno.IdSitio,
                                       Tiendas = CompraInterno.Sitio,
                                       IdArticulo = ExistenciaAlmacenG.IdArticulo,
                                       Articulo = ExistenciaAlmacenG.Articulo,
                                       FechaDeIngreso = CompraInterno.FechaIngreso,
                                       stockActual = ExistenciaAlmacenG.ExitenciaActual,
                                       IdAsignacion = CompraInterno.IdAsignacion,
                                       IdExistenciaAlmacenG = ExistenciaAlmacenG.IdExistenciaAlmacenG,
                                       //EstatusArticulo=ExistenciaAlmacenG.EstatusArticulo
                                   };
            if (ConsultaArticulo.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long tem4 = 0;
                long pedi = ConsultaArticulo.Count();

                // int SumaStock = 0;
                foreach (var numero in ConsultaArticulo)
                {
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
                     .Select(p => new
                     {
                         fechaIngreso = p.FechaDeIngreso,
                         ExitenciaActual = p.stockActual,
                     });

                    if (contador == 0)
                    {
                        tem1 = (int)numero.NoPedido;
                        tem2 = (int)numero.IdCmpraInt;
                        tem3 = (int)numero.IdSitio;
                        id += numero.id + ",";
                        NoPedido += numero.NoPedido + ",";
                        IdCmpraInt += numero.IdCmpraInt + ",";
                        IdSitio += numero.IdSitio + ",";
                        IdArticulos += numero.IdArticulo + ",";
                        Articulo += numero.Articulo + ",";
                        Fecha += numero.FechaDeIngreso + ",";
                        IdProveedor += numero.IdProveedor + ",";
                        Proveedor += numero.Proveedor + ",";

                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        int UltimoReg = consultaFecha.Count() - 1;
                        int cont = 0;
                        int SumaStock = 0;
                        foreach (var comp in consultaFecha)
                        {
                            SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                            if (cont == UltimoReg)
                            {
                                Fecha += comp.fechaIngreso + ",";
                            }
                            cont++;
                        }
                        Stock += SumaStock + ",";
                    }
                    if (numero.NoPedido != tem1 || numero.IdCmpraInt != tem2 || numero.IdSitio != tem3)
                    {
                        tem1 = (int)numero.NoPedido;
                        tem2 = (int)numero.IdCmpraInt;
                        tem3 = (int)numero.IdSitio;

                        id += numero.id + ",";
                        NoPedido += numero.NoPedido + ",";
                        IdCmpraInt += numero.IdCmpraInt + ",";
                        IdSitio += numero.IdSitio + ",";
                        Fecha += numero.FechaDeIngreso + ",";
                        IdProveedor += numero.IdProveedor + ",";
                        Proveedor += numero.Proveedor + ",";
                        IdArticulos += numero.IdArticulo + ",";
                        Articulo += numero.Articulo + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        contador++;

                        int UltimoReg = consultaFecha.Count() - 1;
                        int cont = 0;
                        int SumaStock = 0;
                        foreach (var comp in consultaFecha)
                        {
                            SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                            if (cont == UltimoReg)
                            {
                                Fecha += comp.fechaIngreso + ",";
                            }
                            cont++;
                        }
                        Stock += SumaStock + ",";
                    }
                    else
                    {
                        contador++;
                    }
                }
            }
            else
            {
                id += " " + ",";
                NoPedido += "No hay ningún articulo" + ",";
                IdCmpraInt += " " + ",";
                IdSitio += " " + ",";
                IdArticulos += " " + ",";
                Articulo += " " + ",";
                Fecha += " " + ",";
                Stock += " " + ",";
                IdProveedor += " " + ",";
                Proveedor += " " + ",";
                IdExistenciaAlmacenG += " " + ",";
            }
            var consulta = new
            {
                id = id.Substring(0, id.Length - 1),
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdCmpraInt = IdCmpraInt.Substring(0, IdCmpraInt.Length - 1),
                IdSitio = IdSitio.Substring(0, IdSitio.Length - 1),
                IdArticulos = IdArticulos.Substring(0, IdArticulos.Length - 1),
                Articulo = Articulo.Substring(0, Articulo.Length - 1),
                Fecha = Fecha.Substring(0, Fecha.Length - 1),
                Stock = Stock.Substring(0, Stock.Length - 1),
                IdProveedor = IdProveedor.Substring(0, IdProveedor.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1),

            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }
        //Mostrar los proveedores de los pedidos por aceptar
        public JsonResult ConsultaArticulosAceptar(long IDTienda)
        {

            string id = "";
            string NoPedido = "";
            string Fecha = "";//Es la fecha de la ultima compra reaizada
            string Stock = "";//Es la suma del stock atcual de todas las compras
            string IdSitio = "";
            string IdArticulos = "";
            string Articulo = "";
            string IdCmpraInt = "";
            string IdTienda = "";
            string Sitio = "";
            string Proveedor = "";
            string IdExistenciaAlmacenG = "";
            var ConsultaArticulo = from CompraInterno in InvBD.CompraInterno
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on CompraInterno.IdCompraInterno equals ExistenciaAlmacenG.IdCompraInterno

                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.IdAsignacion.Equals(1) && CompraInterno.EstatusPedido.Equals(0)
                                   select new

                                   {
                                       id = ExistenciaAlmacenG.IdArticulo,
                                       NoPedido = ExistenciaAlmacenG.NoPedidoG,
                                       IdCmpraInt = ExistenciaAlmacenG.IdCompraInterno,
                                       //    Proveedor=CompraInterno.Proveedor,
                                       IdSitio = CompraInterno.IdSitio,
                                       Tiendas = CompraInterno.Sitio,
                                       Articulo = ExistenciaAlmacenG.Articulo,
                                       FechaDeIngreso = CompraInterno.FechaIngreso,
                                       stockActual = ExistenciaAlmacenG.ExitenciaActual,
                                       IdAsignacion = CompraInterno.IdAsignacion,
                                       IdExistenciaAlmacenG = ExistenciaAlmacenG.IdExistenciaAlmacenG,
                                       Proveedor = CompraInterno.Proveedor,
                                       //EstatusArticulo=ExistenciaAlmacenG.EstatusArticulo
                                   };
            if (ConsultaArticulo.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long tem4 = 0;
                long pedi = ConsultaArticulo.Count();

                // int SumaStock = 0;
                foreach (var numero in ConsultaArticulo)
                {
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
                     .Select(p => new
                     {
                         fechaIngreso = p.FechaDeIngreso,
                         ExitenciaActual = p.stockActual,
                     });
                    //SumaStock = (int)(SumaStock + numero.stockActual);
                    //Stock += SumaStock + ",";

                    if (consultaFecha.Count() > 0)
                    {
                        int UltimoReg = consultaFecha.Count() - 1;
                        int cont = 0;
                        int SumaStock = 0;
                        foreach (var comp in consultaFecha)
                        {
                            SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                            if (cont == UltimoReg)
                            {
                                Fecha += comp.fechaIngreso + ",";
                            }
                            cont++;
                        }
                        Stock += SumaStock + ",";

                    }

                    if (contador == 0)
                    {
                        tem1 = (int)numero.NoPedido;
                        tem2 = (int)numero.IdCmpraInt;
                        tem3 = (int)numero.IdSitio;
                        id += numero.id + ",";
                        NoPedido += numero.NoPedido + ",";
                        IdCmpraInt += numero.IdCmpraInt + ",";
                        IdSitio += numero.IdSitio + ",";
                        Articulo += numero.Articulo + ",";
                        Fecha += numero.FechaDeIngreso + ",";
                        Proveedor += numero.Proveedor + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        int UltimoReg = consultaFecha.Count() - 1;
                        int cont = 0;
                        int SumaStock = 0;
                        foreach (var comp in consultaFecha)
                        {
                            SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                            if (cont == UltimoReg)
                            {
                                Fecha += comp.fechaIngreso + ",";
                            }
                            cont++;
                        }
                        Stock += SumaStock + ",";
                    }
                    if (numero.NoPedido != tem1 || numero.IdCmpraInt != tem2 || numero.IdSitio != tem3)
                    {
                        tem1 = (int)numero.NoPedido;
                        tem2 = (int)numero.IdCmpraInt;
                        tem3 = (int)numero.IdSitio;

                        id += numero.id + ",";
                        NoPedido += numero.NoPedido + ",";
                        IdCmpraInt += numero.IdCmpraInt + ",";
                        IdSitio += numero.IdSitio + ",";
                        Fecha += numero.FechaDeIngreso + ",";
                        Articulo += numero.Articulo + ",";
                        Proveedor += numero.Proveedor + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        contador++;

                        int UltimoReg = consultaFecha.Count() - 1;
                        int cont = 0;
                        int SumaStock = 0;
                        foreach (var comp in consultaFecha)
                        {
                            SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                            if (cont == UltimoReg)
                            {
                                Fecha += comp.fechaIngreso + ",";
                            }
                            cont++;
                        }
                        Stock += SumaStock + ",";
                    }
                    else
                    {
                        contador++;
                    }
                }
            }
            else
            {
                id += " " + ",";
                NoPedido += "No hay ningún articulo" + ",";
                IdCmpraInt += " " + ",";
                IdSitio += " " + ",";
                Articulo += " " + ",";
                Fecha += " " + ",";
                Stock += " " + ",";
                Proveedor += " " + ",";
                IdExistenciaAlmacenG += " " + ",";
            }
            var consulta = new
            {
                id = id.Substring(0, id.Length - 1),
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdCmpraInt = IdCmpraInt.Substring(0, IdCmpraInt.Length - 1),
                IdSitio = IdSitio.Substring(0, IdSitio.Length - 1),
                Articulo = Articulo.Substring(0, Articulo.Length - 1),
                Fecha = Fecha.Substring(0, Fecha.Length - 1),
                Stock = Stock.Substring(0, Stock.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1),

            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }

        ////---------------------------Mostrar los datos de los proveedores de los pedidos realizados-----------------------------------------------
        public JsonResult ConsultaArticulosVisualizarPedidos(long IDTienda)
        {
            string NoPedido = "";
            string NoProvedor = "";
            string Proveedor = "";
            string IdProveedor = "";
            string fecha = "";
            string Area = "";
            string IDArea = "";
            string IdSitio = "";
            string id = "";
            string Articulo = "";

            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1) && p.IdSitio.Equals(IDTienda) && p.IdAsignacion.Equals(1)).OrderByDescending(p => p.IdPedidosInternos)
               .Select(p => new
               {
                   pedido = p.NumeroPedido,
                   id = p.IdArticulo,
                   Articulo = p.Articulo,
                   IdProveedor = p.IdProveedor,
                   proveedors = p.Proveedor,
                   fecha = p.Fecha,
                   noProve = p.NumPedidoProveedor,
                   depa = p.Sitio,
                   IDDepa = p.IdSitio,
                   IdSitio = p.IdSitio,
               });
            if (Pedidos.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;

                long pedi = Pedidos.Count();

                foreach (var numero in Pedidos)
                {
                    if (contador == 0)
                    {
                        tem1 = (int)numero.pedido;
                        tem2 = (int)numero.noProve;


                        NoPedido += numero.pedido + ",";
                        NoProvedor += numero.noProve + ",";
                        Proveedor += numero.proveedors + ",";
                        IdProveedor += numero.IdProveedor + ",";
                        fecha += numero.fecha + ",";
                        Area += numero.depa + ",";
                        IDArea += numero.IDDepa + ",";
                        id += numero.id + ",";
                        IdSitio += numero.IdSitio + ",";
                        Articulo += numero.Articulo + ",";


                    }
                    if (numero.pedido != tem1 || numero.noProve != tem2)
                    {
                        NoPedido += numero.pedido + ",";
                        NoProvedor += numero.noProve + ",";
                        Proveedor += numero.proveedors + ",";
                        IdProveedor += numero.IdProveedor + ",";
                        fecha += numero.fecha + ",";
                        Area += numero.depa + ",";
                        IDArea += numero.IDDepa + ",";
                        id += numero.id + ",";
                        IdSitio += numero.IdSitio + ",";
                        Articulo += numero.Articulo + ",";


                        tem1 = (int)numero.pedido;
                        tem2 = (int)numero.noProve;

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
                id += "" + ",";
                IdSitio += "" + ",";
                Articulo += "" + ",";
                IdProveedor += "" + ",";
                NoPedido += "" + ",";
                NoProvedor += "" + ",";
                Proveedor += "No hay pedidos" + ",";
                fecha += "" + ",";
                Area += "" + ",";
                IDArea += "" + ",";
                Articulo += "" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                NoProvedor = NoProvedor.Substring(0, NoProvedor.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                IdProveedor = IdProveedor.Substring(0, IdProveedor.Length - 1),
                fecha = fecha.Substring(0, fecha.Length - 1),
                Area = Area.Substring(0, Area.Length - 1),
                IDArea = IDArea.Substring(0, IDArea.Length - 1),
                id = id.Substring(0, id.Length - 1),
                IdSitio = IdSitio.Substring(0, IdSitio.Length - 1),
                Articulo = Articulo.Substring(0, Articulo.Length - 1)
            };

            return Json(consulta, JsonRequestBehavior.AllowGet);
        }
        //Desplegar los articulos de los proveedores en el accordion de pedidos realizados por area
        public JsonResult ConsultaArtTiendaDespl(long idCompraInt, long idS)
        {
            string NoPedido = "";
            string IdAsignacion = "";
            string IdTienda = "";
            string NomTienda = "";
            string IdArticulo = "";
            string NumeroPedido = "";
            string Fechas = "";
            string Nombre = "";
            string IdExistenciaAlmacenG = "";
            string Stock = "";
            string IdSitio = "";
            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1) && p.NumeroPedido.Equals(idCompraInt) && p.IdSitio.Equals(idS) && p.IdAsignacion.Equals(1)).OrderBy(p => p.IdPedidosInternos)
               .Select(p => new
               {
                   pedido = p.Articulo,
                   asignacion = p.IdArticulo,
                   //Idtienda = p.IdCompraInterno,
                   tiendas = p.Sitio,
                   IdArticulo = p.IdArticulo,
                   NumeroPedido = p.NumeroPedido,
                   Nombre = p.Articulo,
                   FechaDeIngreso = p.Fecha,
                   IdExistenciaAlmacenG = p.IdProveedor,
                   Articulo = p.Articulo,
                   IdSitio = p.IdSitio,
                   stockActual = p.CantidadSolicitada,
                   IdAsignacion = p.IdAsignacion
               });


            if (Pedidos.Count() > 0)
            {
                long contador = 0;
                String tem1 = "";
                long tem2 = 0;
                long tem3 = 0;
                long pedi = Pedidos.Count();

                foreach (var numero in Pedidos)
                {

                    var consultaFecha = Pedidos.Where(p => p.IdArticulo.Equals(numero.IdArticulo) && p.stockActual > 0 && p.IdAsignacion.Equals(1) && p.IdSitio.Equals(idS)).OrderBy(p => p.IdArticulo)
             .Select(p => new
             {
                 fechaIngreso = p.FechaDeIngreso,
                 ExitenciaActual = p.stockActual,
             });

                    if (contador == 0)
                    {
                        tem1 = numero.Articulo;
                        tem2 = (int)numero.IdArticulo;
                        // tem3 = (int)numero.Idtienda;

                        NoPedido += numero.Articulo + ",";
                        IdAsignacion += numero.IdArticulo + ",";
                        IdSitio += numero.IdSitio + ",";
                        NomTienda += numero.tiendas + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        NumeroPedido += numero.NumeroPedido + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        Nombre += numero.Nombre + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";

                        int UltimoReg = consultaFecha.Count() - 1;
                        int cont = 0;
                        int SumaStock = 0;
                        foreach (var comp in consultaFecha)
                        {
                            SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                            if (cont == UltimoReg)
                            {
                                Fechas += comp.fechaIngreso + ",";
                            }
                            cont++;
                        }
                        Stock += SumaStock + ",";
                    }
                    if (numero.Articulo != tem1 || numero.IdArticulo != tem2)
                    {
                        NoPedido += numero.Articulo + ",";
                        IdAsignacion += numero.IdArticulo + ",";
                        IdSitio += numero.IdSitio + ",";
                        NomTienda += numero.tiendas + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        NumeroPedido += numero.NumeroPedido + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        Nombre += numero.Nombre + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        tem1 = numero.Articulo;
                        tem2 = (int)numero.IdArticulo;
                        //tem3 = (int)numero.Idtienda;

                        contador++;

                        int UltimoReg = consultaFecha.Count() - 1;
                        int cont = 0;
                        int SumaStock = 0;
                        foreach (var comp in consultaFecha)
                        {
                            SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                            if (cont == UltimoReg)
                            {
                                Fechas += comp.fechaIngreso + ",";
                            }
                            cont++;
                        }
                        Stock += SumaStock + ",";
                    }
                    else
                    {
                        contador++;
                    }
                }
            }
            else
            {
                NoPedido += " " + ",";
                IdAsignacion += " " + ",";
                IdSitio += " " + ",";
                NomTienda += " " + ",";
                Stock += " " + ",";
                IdArticulo += " " + ",";
                NumeroPedido += " " + ",";
                Fechas += " " + ",";
                Nombre += " " + ",";
                IdExistenciaAlmacenG += " " + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
                IdSitio = IdSitio.Substring(0, IdSitio.Length - 1),
                NomTienda = NomTienda.Substring(0, NomTienda.Length - 1),
                Stock = Stock.Substring(0, Stock.Length - 1),
                IdArticulo = IdArticulo.Substring(0, IdArticulo.Length - 1),
                NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1),
                Fechas = Fechas.Substring(0, Fechas.Length - 1),
                Nombre = Nombre.Substring(0, Nombre.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1)
            };

            return Json(consulta, JsonRequestBehavior.AllowGet);
        }

    }
}




