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
            string Fecha = "";
            string Stock = "";//Suma del stock atcual
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
                                       IdExistenciaAlmacenG = ExistenciaAlmacenG.IdExistenciaAlmacenG
                                   };
            if (ConsultaArticulo.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long tem4 = 0;
                long pedi = ConsultaArticulo.Count();
                foreach (var numero in ConsultaArticulo)
                {
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(1) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
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
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1)
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
                                       Proveedor = CompraInterno.Proveedor
                                   };
            if (ConsultaArticulo.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long tem4 = 0;
                long pedi = ConsultaArticulo.Count();
                foreach (var numero in ConsultaArticulo)
                {
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
                     .Select(p => new
                     {
                         fechaIngreso = p.FechaDeIngreso,
                         ExitenciaActual = p.stockActual,
                     });
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
        //Visualizar el archivo de los pedidos
        public JsonResult ConsultaAceptarPedido(long Id, long No)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join Tienda in InvBD.Tienda
                           on Compra.IdSitio equals Tienda.IdTienda
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where ExistAlm.NoPedidoG.Equals(No) && Compra.IdAsignacion.Equals(1) && Compra.EstatusPedido.Equals(0)
                            select new
                            {
                                IdPedidosInternos = ExistAlm.IdCompraInterno,
                                NumeroPedido = ExistAlm.NoPedidoG,
                                NumPedidoProveedor = Compra.NoPedidoProveedor,
                                NoCompraProveedor = Compra.NoPedido,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = Compra.IdProveedor,
                                Proveedor = Compra.Proveedor,
                                IdTienda = Compra.IdSitio,
                                IdArticulo = ExistAlm.IdArticulo,
                                Articulo = ExistAlm.Articulo,
                                Fecha = Compra.FechaIngreso,
                                Telefono = areas.Telefono,
                                Correo = areas.Correo,
                                Area = areas.Nombre,
                                Localidad = Tienda.Localidad,
                                Direccion = Tienda.Direccion
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }
        ///////////----------------------------------Mostrar los articulos en el modal aceptar pedido----------------------
        public JsonResult ConsultaTablaArtAceptarPedidos(long IdCompInt, long idS)
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
           
            var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
                          join Compra in InvBD.CompraInterno
                      on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                          join areas in InvBD.Areas
                      on Compra.IdProveedor equals areas.IdAreas
                          where Compra.IdSitio.Equals(idS) && ExistAlm.IdCompraInterno.Equals(IdCompInt) && Compra.IdAsignacion.Equals(1) && Compra.EstatusPedido.Equals(0) && ExistAlm.ExitenciaActual >= 0
                          orderby ExistAlm.IdArticulo
                          select new
                          {
                              IdCompraInterno = ExistAlm.IdCompraInterno,
                              Articulo = ExistAlm.Articulo,
                              NumeroPedido = ExistAlm.NoPedidoG,
                              NumPedidoProveedor = Compra.NoPedidoProveedor,
                              nombres = ExistAlm.Articulo,
                              IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                              IdArticulo = ExistAlm.IdArticulo,
                              Tipo = ExistAlm.TipoDeOperacion,
                              IdProveedor = Compra.IdProveedor,
                              Proveedor = Compra.Proveedor,
                              tiendas = Compra.IdSitio,
                              Nombre = ExistAlm.Articulo,
                              FechaDeIngreso = Compra.FechaIngreso,
                              stockActual = ExistAlm.ExitenciaInicial,
                              IdAsignacion = Compra.IdAsignacion,
                              IdSitio = Compra.IdSitio,
                          };

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
                        NoPedido += numero.Articulo + ",";
                        IdAsignacion += numero.IdArticulo + ",";
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
                        NomTienda += numero.tiendas + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        NumeroPedido += numero.NumeroPedido + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        Nombre += numero.Nombre + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        tem1 = numero.Articulo;
                        tem2 = (int)numero.IdArticulo;
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
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                NomTienda += "0" + ",";
                Stock += " " + ",";
                IdArticulo += "0" + ",";
                NumeroPedido += "0" + ",";
                Fechas += "0" + ",";
                Nombre += "0" + ",";
                IdExistenciaAlmacenG += "0" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
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
        //Consulta de la función desplegar una sola vez los articulos repetidos por el Id de compraInterna
        public JsonResult ConsultaArtOficina(long idCompraInt, long idS)
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

            var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
                          join Compra in InvBD.CompraInterno
                      on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                          join areas in InvBD.Areas
                      on Compra.IdProveedor equals areas.IdAreas
                          where Compra.IdCompraInterno.Equals(idCompraInt) && Compra.IdAsignacion.Equals(1) && Compra.IdSitio.Equals(idS) && Compra.EstatusPedido.Equals(1)
                          orderby ExistAlm.IdArticulo
                          select new
                          {
                              IdCompraInterno = ExistAlm.IdCompraInterno,
                              Articulo = ExistAlm.Articulo,
                              NumeroPedido = ExistAlm.NoPedidoG,
                              NumPedidoProveedor = Compra.NoPedidoProveedor,
                              nombres = ExistAlm.Articulo,
                              IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                              IdArticulo = ExistAlm.IdArticulo,
                              Tipo = ExistAlm.TipoDeOperacion,
                              IdProveedor = Compra.IdProveedor,
                              Proveedor = Compra.Proveedor,
                              tiendas = Compra.IdSitio,
                              Nombre = ExistAlm.Articulo,
                              FechaDeIngreso = Compra.FechaIngreso,
                              stockActual = ExistAlm.ExitenciaActual,
                              IdAsignacion = Compra.IdAsignacion,
                              IdSitio = Compra.IdSitio,
                          };

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
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                IdSitio += "0" + ",";
                NomTienda += "0" + ",";
                Stock += " " + ",";
                IdArticulo += "0" + ",";
                NumeroPedido += "0" + ",";
                Fechas += "0" + ",";
                Nombre += "0" + ",";
                IdExistenciaAlmacenG += "0" + ",";
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
        //Visualizar el archivo de los pedidos aceptados
        public JsonResult ConsultaPedidosAceptados(long Id, long No)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join Tienda in InvBD.Tienda
                           on Compra.IdSitio equals Tienda.IdTienda
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where ExistAlm.NoPedidoG.Equals(No) && Compra.IdAsignacion.Equals(1) && Compra.EstatusPedido.Equals(1)
                            select new
                            {
                                IdPedidosInternos = ExistAlm.IdCompraInterno,
                                NumeroPedido = ExistAlm.NoPedidoG,
                                NumPedidoProveedor = Compra.NoPedidoProveedor,
                                NoCompraProveedor = Compra.NoPedido,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = Compra.IdProveedor,
                                Proveedor = Compra.Proveedor,
                                IdTienda = Compra.IdSitio,
                                IdArticulo = ExistAlm.IdArticulo,
                                Articulo = ExistAlm.Articulo,
                                Fecha = Compra.FechaIngreso,
                                Telefono = areas.Telefono,
                                Correo = areas.Correo,
                                Area = areas.Nombre,
                                Localidad = Tienda.Localidad,
                                Direccion = Tienda.Direccion
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }
        //visualizar art de pedidos aceptados
        public JsonResult ConsultaTablaArtPedidosAceptados(long IdCompInt, long idS)
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
            var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
                          join Compra in InvBD.CompraInterno
                      on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                          join areas in InvBD.Areas
                      on Compra.IdProveedor equals areas.IdAreas
                          where Compra.IdSitio.Equals(idS) && ExistAlm.IdCompraInterno.Equals(IdCompInt) && Compra.IdAsignacion.Equals(1) && Compra.EstatusPedido.Equals(1) && ExistAlm.ExitenciaActual >= 0
                          orderby ExistAlm.IdArticulo
                          select new
                          {
                              IdCompraInterno = ExistAlm.IdCompraInterno,
                              Articulo = ExistAlm.Articulo,
                              NumeroPedido = ExistAlm.NoPedidoG,
                              NumPedidoProveedor = Compra.NoPedidoProveedor,
                              nombres = ExistAlm.Articulo,
                              IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                              IdArticulo = ExistAlm.IdArticulo,
                              Tipo = ExistAlm.TipoDeOperacion,
                              IdProveedor = Compra.IdProveedor,
                              Proveedor = Compra.Proveedor,
                              tiendas = Compra.IdSitio,
                              Nombre = ExistAlm.Articulo,
                              FechaDeIngreso = Compra.FechaIngreso,
                              stockActual = ExistAlm.ExitenciaInicial,
                              IdAsignacion = Compra.IdAsignacion,
                              IdSitio = Compra.IdSitio,
                          };

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
                        NoPedido += numero.Articulo + ",";
                        IdAsignacion += numero.IdArticulo + ",";
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
                        NomTienda += numero.tiendas + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        NumeroPedido += numero.NumeroPedido + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        Nombre += numero.Nombre + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        tem1 = numero.Articulo;
                        tem2 = (int)numero.IdArticulo;
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
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                NomTienda += "0" + ",";
                Stock += " " + ",";
                IdArticulo += "0" + ",";
                NumeroPedido += "0" + ",";
                Fechas += "0" + ",";
                Nombre += "0" + ",";
                IdExistenciaAlmacenG += "0" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
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
        //-----Consulta para Mostrar el stock general de los articulos en el modal de devoluciones----
        public JsonResult ConsultaStockArticulos(long IDTienda, long IdArt)
        {
            string id = "";
            string NoPedido = "";
            string Fecha = "";
            string Stock = "";
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
                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(1) && CompraInterno.IdAsignacion.Equals(1) && ExistenciaAlmacenG.IdArticulo.Equals(IdArt)
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
                                       IdExistenciaAlmacenG = ExistenciaAlmacenG.IdExistenciaAlmacenG
                                   };
            if (ConsultaArticulo.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long tem4 = 0;
                long pedi = ConsultaArticulo.Count();
                foreach (var numero in ConsultaArticulo)
                {
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(1) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
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
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1)
            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }

        //---------------------------Mostrar los articulos disponibles en la tienda con stock mayor a 0 para realizar mov.Usado 
        public JsonResult ConsultaPedidosUs(long idS)
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
            var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
                          join Compra in InvBD.CompraInterno
                      on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                          join areas in InvBD.Areas
                      on Compra.IdProveedor equals areas.IdAreas
                          where Compra.IdSitio.Equals(idS) && Compra.IdAsignacion.Equals(1) && Compra.EstatusPedido.Equals(1) && ExistAlm.ExitenciaActual > 0
                          orderby ExistAlm.IdArticulo
                          select new
                          {
                              IdCompraInterno = ExistAlm.IdCompraInterno,
                              Articulo = ExistAlm.Articulo,
                              NumeroPedido = ExistAlm.NoPedidoG,
                              NumPedidoProveedor = Compra.NoPedidoProveedor,
                              nombres = ExistAlm.Articulo,
                              IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                              IdArticulo = ExistAlm.IdArticulo,
                              Tipo = ExistAlm.TipoDeOperacion,
                              IdProveedor = Compra.IdProveedor,
                              Proveedor = Compra.Proveedor,
                              tiendas = Compra.IdSitio,
                              Nombre = ExistAlm.Articulo,
                              FechaDeIngreso = Compra.FechaIngreso,
                              stockActual = ExistAlm.ExitenciaActual,
                              IdAsignacion = Compra.IdAsignacion,
                              IdSitio = Compra.IdSitio,
                          };

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
                        NoPedido += numero.Articulo + ",";
                        IdAsignacion += numero.IdArticulo + ",";
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
                        NomTienda += numero.tiendas + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        NumeroPedido += numero.NumeroPedido + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        Nombre += numero.Nombre + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        tem1 = numero.Articulo;
                        tem2 = (int)numero.IdArticulo;
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
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                NomTienda += "0" + ",";
                Stock += " " + ",";
                IdArticulo += "0" + ",";
                NumeroPedido += "0" + ",";
                Fechas += "0" + ",";
                Nombre += "0" + ",";
                IdExistenciaAlmacenG += "0" + ",";
            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
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

        ///Realizar el movimiento usado////////
        public JsonResult ConsultaMovimientoUsado(string DatosArticulos)
        {
            string[] Articulos = DatosArticulos.Split(',');
            string[] Articulos2 = DatosArticulos.Split('/');
            int consulta = 0;

            for (int i = 0; 1 < Articulos.GetLength(0); i++)
            {
                string[] IdArticulo = Articulos[i].Split(':');
                string[] IdTienda = Articulos[i].Split('/');
                string[] Cantidad = Articulos2[i].Split(':');

                int resultado = 0;

                var ConsultaIDArticulo = from ExistAlm in InvBD.ExistenciaAlmacenG
                                         join Compra in InvBD.CompraInterno
                                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                                         where ExistAlm.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && Compra.IdSitio.Equals(Convert.ToInt32(IdTienda[1])) && Compra.IdAsignacion.Equals(1) && (ExistAlm.ExitenciaActual > 0) && Compra.EstatusPedido.Equals(1)
                                         orderby Compra.NoPedido
                                         select new
                                         {
                                             IdCompraInterno = ExistAlm.IdCompraInterno,
                                             IdArticulo = ExistAlm.IdArticulo,
                                             Articulo = ExistAlm.Articulo,
                                             ExitenciaActual = ExistAlm.ExitenciaActual,
                                             Observaciones = ExistAlm.Observaciones,
                                             IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                                             IdCompraExterna = ExistAlm.IdCompra,
                                             ExitenciaAct = ExistAlm.ExitenciaActual,
                                             IdSitio = Compra.IdSitio,
                                             Sitio = Compra.Sitio
                                         };

                var IdDeTienda = IdTienda[1];

                Double Diferencia = Convert.ToInt32(Cantidad[1]);
                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompraInterno);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);
                    long IdExistenciaAlmacenG = Convert.ToInt32(con.IdExistenciaAlmacenG);
                    long IdCompraExterna = Convert.ToInt32(con.IdCompraExterna);
                    long IdSitio = Convert.ToInt32(con.IdSitio);
                    //String Sitio = Convert.ToInt32(con.Sitio);
                    if (Diferencia > 0)
                    {
                        Double ExistenciaActual = 0;
                        Double CantidadAct = 0;

                        if (con.ExitenciaAct == Diferencia)
                        {
                            Diferencia = 0;
                            ExistenciaActual = 0;
                            CantidadAct = (double)con.ExitenciaAct;
                        }
                        else if (con.ExitenciaAct > Diferencia)
                        {

                            CantidadAct = Diferencia;
                            ExistenciaActual = (Double)con.ExitenciaAct - Diferencia;
                            Diferencia = 0;
                        }
                        else
                        {
                            Diferencia = Diferencia - (Double)con.ExitenciaAct;
                            ExistenciaActual = 0;
                            CantidadAct = (double)con.ExitenciaAct;

                        }
                        consulta = GuardarExistenciaActMovUsado((long)con.IdExistenciaAlmacenG, (long)con.IdCompraExterna, (long)con.IdArticulo, (string)con.Articulo, ExistenciaActual, CantidadAct, (long)con.IdSitio, (String)con.Sitio);
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
        public int GuardarExistenciaActMovUsado(long IdExistencia, long IDCompraExt, long IDArticulo, string Articulo, double ExistenciaActual, double CantidadAct, long IdSitio, String Sitio)
        {
            int nregistradosAfectados = 0;
            var cons = GuardarMovimientoUsado((long)IdExistencia, (long)IDArticulo, (long)IDCompraExt, (double)CantidadAct, (string)Articulo, (long)IdSitio, (String)Sitio);
            int consulta = 0;

            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(IdExistencia) && p.IdArticulo.Equals(IDArticulo)).First();
            mpag.ExitenciaActual = ExistenciaActual;

            InvBD.SubmitChanges();

            nregistradosAfectados = 1;
            return nregistradosAfectados;
        }
        //----------------------------------------------------------------------------------------------------------------
        //Obtener la fecha de manera automática
        public static DateTime Today { get; }
        public int GuardarMovimientoUsado(long IdExistencia, long IDArticulo, long IDCompraExt, double CantidadAct, string Articulo, long IdSitio, String Sitio)
        {
            int nregistradosAfectados = 0;

            MovimientosTienda com = new MovimientosTienda();
            com.IdExistencia = IdExistencia;
            com.IdCompra = IDCompraExt;
            com.Movimiento = "Usados";
            DateTime thisDay = DateTime.Today;

            com.Fecha = (thisDay.ToString());
            com.Cantidad = CantidadAct;
            com.IdArticulo = IDArticulo;
            com.Articulo = Articulo;
            com.Estatus = 1;
            com.IdAsignacion = 1;
            com.IdSitio = IdSitio;
            com.Sitio = Sitio;
            InvBD.MovimientosTienda.InsertOnSubmit(com);
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;//Se pudo realizar
            return nregistradosAfectados;
        }
        //-----------------------Consulta los artículos por ID de artículo y IDCompra para restar la cantidad aprobada----------------- 
        public JsonResult ConsultaStockArticulo(string DatosArticulos)
        {
            string[] Articulos = DatosArticulos.Split(',');
            string[] Articulos2 = DatosArticulos.Split('/');
            int consulta = 0;
            for (int i = 0; 1 < Articulos.GetLength(0); i++)
            {
                string[] IdArticulo = Articulos[i].Split(':');
                string[] IdTienda = Articulos[i].Split('/');
                string[] Cantidad = Articulos2[i].Split(':');
                int resultado = 0;
                var ConsultaIDArticulo = from ExistAlm in InvBD.ExistenciaAlmacenG
                                         join Compra in InvBD.CompraInterno
                                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                                         where ExistAlm.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && Compra.IdAsignacion.Equals(1) && Compra.IdSitio.Equals(Convert.ToInt32(IdTienda[1])) && (ExistAlm.ExitenciaActual > 0) && Compra.EstatusPedido.Equals(1)
                                         orderby Compra.FechaIngreso
                                         select new
                                         {
                                             IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                                             IdCompra = ExistAlm.IdCompra,
                                             IdCompraInterno = ExistAlm.IdCompraInterno,
                                             ExistenciaInicial = ExistAlm.ExitenciaInicial,
                                             ExistenciaActual = ExistAlm.ExitenciaActual,
                                             IdArticulo = ExistAlm.IdArticulo,
                                             Articulo = ExistAlm.Articulo,
                                             ExitenciaAct = ExistAlm.ExitenciaActual,
                                             NoPedidoG = ExistAlm.NoPedidoG,
                                             Observaciones = ExistAlm.Observaciones
                                         };

                var Observacion = Articulos[1];
                var IdDeTienda = IdTienda[1];
                Double Diferencia = Convert.ToInt32(Cantidad[1]);
                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompra);
                    long IdCompraInterno = Convert.ToInt32(con.IdCompraInterno);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);
                    long IdExistenciaAlmacenG = Convert.ToInt32(con.IdExistenciaAlmacenG);
                    long ExistenciaInicial = Convert.ToInt32(con.ExistenciaInicial);
                    long ExitenciaAct = Convert.ToInt32(con.ExitenciaAct);
                    int NoPedidoG = Convert.ToInt32(con.NoPedidoG);
                    if (Diferencia > 0)
                    {
                        Double ExistenciaActual = 0;
                        Double CantidadAct = 0;
                        if (con.ExitenciaAct == Diferencia)
                        {
                            Diferencia = 0;
                            ExistenciaActual = 0;
                            CantidadAct = (double)con.ExitenciaAct;
                        }
                        else if (con.ExitenciaAct > Diferencia)
                        {

                            CantidadAct = Diferencia;
                            ExistenciaActual = (Double)con.ExitenciaAct - Diferencia;
                            Diferencia = 0;
                        }
                        else
                        {
                            Diferencia = Diferencia - (Double)con.ExitenciaAct;
                            ExistenciaActual = 0;
                            CantidadAct = (double)con.ExitenciaAct;
                        }
                        consulta = GuardarNStock((long)con.IdExistenciaAlmacenG, (long)con.IdCompraInterno, (long)con.IdArticulo, (string)con.Articulo, ExistenciaActual, CantidadAct, Observacion, ExistenciaInicial, IDCompras, NoPedidoG);
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
        public int GuardarNStock(long IdExistenciaAlmacenG, long IdCompraInterno, long IdArticulo, String Articulo, double ExistenciaActual, double CantidadAct, String Observacion, long ExistenciaInicial, long IDCompras, int NoPedidoG)
        {
            int nregistradosAfectados = 0;
            var cons = GuardarMovimientoDev((long)IdExistenciaAlmacenG, (long)IdCompraInterno, (long)IdArticulo, (string)Articulo, (double)ExistenciaActual, (double)CantidadAct, (string)Observacion, ExistenciaInicial, IDCompras, NoPedidoG);
            int consulta = 0;
            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(IdExistenciaAlmacenG) && p.IdArticulo.Equals(IdArticulo)).First();
            mpag.ExitenciaActual = ExistenciaActual;
            InvBD.SubmitChanges();//Guarda los datos en la Base de datos
            nregistradosAfectados = 1;
            return nregistradosAfectados;
        }

        public int GuardarMovimientoDev(long IdExistenciaAlmacenG, long IdCompraInterno, long IdArticulo, string Articulo, double ExistenciaActual, double CantidadAct, string Observacion, long ExistenciaInicial, long IDCompras, int NoPedidoG)
        {
            int nregistradosAfectados = 0;
            ExistenciaAlmacenG com = new ExistenciaAlmacenG();
            com.IdCompra = IDCompras;
            com.IdCompraInterno = IdCompraInterno;
            com.ExitenciaInicial = ExistenciaInicial;
            com.ExitenciaActual = -CantidadAct;
            com.NoPedidoG = NoPedidoG;
            com.IdArticulo = IdArticulo;
            com.Articulo = Articulo;
            com.TipoDeOperacion = "Devolucion";
            com.Observaciones = Observacion;
            InvBD.ExistenciaAlmacenG.InsertOnSubmit(com);
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;//Se pudo realizar
            return nregistradosAfectados;
        }

        ///--------------
        public JsonResult ConsultaArticulosOficina(long IDTienda)
        {
            string id = "";
            string NoPedido = "";
            string Fecha = "";
            string Stock = "";
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
                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.IdAsignacion.Equals(2) && CompraInterno.EstatusPedido.Equals(1) && ExistenciaAlmacenG.ExitenciaActual >= 0
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
                                       IdExistenciaAlmacenG = ExistenciaAlmacenG.IdExistenciaAlmacenG
                                   };
            if (ConsultaArticulo.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;
                long tem3 = 0;
                long tem4 = 0;
                long pedi = ConsultaArticulo.Count();
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
    }
}




