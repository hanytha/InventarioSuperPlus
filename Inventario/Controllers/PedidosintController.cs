
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
    public class PedidosintController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Pedidosint
        public ActionResult Pedidosint()
        {
            PedidosintController pedidosInternos = new PedidosintController();
            pedidosInternos.ConsultaPedidosNumeroPedidoRa();
            return View();
        }
<<<<<<< HEAD
        public JsonResult ConsultaPedidosInternos()
        {
            var pedidosInt = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.CantidadSolicitada,
                   // p.CantidadAprobada,
                  //  p.Tipo,
                    p.Proveedor,
                    //p.IdUnidadDeMedida,
                    //p.UnidadDeMedida,
                    //p.IdMarca,
                    //p.Marca,
                    p.IdSitio,
                    p.Sitio,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha
                });
            return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        }


        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaPedidoInterno(long Id)
        {
            var pedidosInt = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    p.NumeroPedido,
                    p.NumPedidoProveedor,
                    p.CantidadSolicitada,
                   // p.CantidadAprobada,
                   // p.Tipo,
                    p.IdProveedor,
                    p.Proveedor,
                    //p.IdUnidadDeMedida,
                    //p.UnidadDeMedida,
                    //p.IdMarca,
                    //p.Marca,
                    p.IdSitio,
                    p.Sitio,
                    p.IdArticulo,
                    p.Articulo,
                    p.Fecha
                });
            return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        }

        //Cosulta los pedidos por número de compra
        //public JsonResult ConsultaPedidoXnum(long Num)
        //{
        //    var numero = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Num) && p.Estatus.Equals(1))
=======
        //public JsonResult ConsultaPedidosInternos()
        //{
        //    var pedidosInt = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            p.IdPedidosInternos,
        //            p.NumeroPedido,
        //            p.CantidadSolicitada,
        //            p.CantidadAprobada,
        //            p.Tipo,
        //            //p.IdUnidadDeMedida,
        //            //p.UnidadDeMedida,
        //            //p.IdMarca,
        //            //p.Marca,
        //            p.IdTienda,
        //            p.Tienda,
        //            p.IdArticulo,
        //            p.Articulo,
        //            p.Fecha
        //        });
        //    return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        //}

        ////Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        //public JsonResult ConsultaPedidoInterno(long Id)
        //{
        //    var pedidosInt = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id) && p.Estatus.Equals(1))
>>>>>>> anabel2
        //        .Select(p => new
        //        {
        //            p.IdPedidosInternos,
        //            p.NumeroPedido,
        //            p.CantidadSolicitada,
<<<<<<< HEAD
        //            p.Tipo,
        //            p.IdProveedor,
        //            p.Proveedor,
        //            p.NumPedidoProveedor,
=======
        //            p.CantidadAprobada,
        //            p.Tipo,
        //            //p.IdUnidadDeMedida,
        //            //p.UnidadDeMedida,
        //            //p.IdMarca,
        //            //p.Marca,
>>>>>>> anabel2
        //            p.IdTienda,
        //            p.Tienda,
        //            p.IdArticulo,
        //            p.Articulo,
        //            p.Fecha
<<<<<<< HEAD

        //        });
        //    return Json(numero, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult ConsultaPedidoXnum(long Num)
        {
            var numero = from proveedor in InvBD.Areas
                                 join pedido in InvBD.PedidosInternos
                             on proveedor.IdAreas equals pedido.IdProveedor
                         join tienda in InvBD.Tienda
                           on pedido.IdSitio equals tienda.IdTienda
                         where pedido.NumeroPedido.Equals(Num) && pedido.Estatus.Equals(1)
                                 select new
                                 {
                                     IdPedidosInternos = pedido.IdPedidosInternos,
                                     NumeroPedido = pedido.NumeroPedido,
                                     CantidadSolicitada = pedido.CantidadSolicitada,
                                     
                                     IdProveedor = proveedor.IdAreas,
                                     Proveedor = proveedor.Nombre,
                                     Direccion= tienda.Direccion,
                                     NumPedidoProveedor = pedido.NumeroPedido,
                                     IdTienda = pedido.IdSitio,
                                     Tienda = pedido.Sitio,
                                     IdArticulo = pedido.IdArticulo,
                                     Fecha = pedido.Fecha,
                                     Correo = proveedor.Correo,
                                     Telefono = proveedor.Telefono,
                                 };
            return Json(numero, JsonRequestBehavior.AllowGet);
        }
        //***********consulta obtener los artículos y sus demas caracteristicas por número de pedido*********
        public JsonResult ConsultaPedidosArticuos(long Pedi)
        {
            var numero = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Pedi) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Articulo,
                    p.CantidadSolicitada,
                    //p.PrecioUnitario,
                    //p.Unidad
                });
            return Json(numero, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarPedidoInterno(PedidosInternos DatosPedidoInterno)
        {
            int Afectados = 0;
            try
            {
            long id = DatosPedidoInterno.IdPedidosInternos;
            if (id.Equals(0))
            {
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)).Count();

                //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.PedidosInternos.InsertOnSubmit(DatosPedidoInterno);
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
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)
                && p.CantidadSolicitada.Equals(DatosPedidoInterno.CantidadSolicitada)
                 //  && p.CantidadAprobada.Equals(DatosPedidoInterno.CantidadAprobada)
                //   && p.Tipo.Equals(DatosPedidoInterno.Tipo)
                     //&& p.IdUnidadDeMedida.Equals(DatosPedidoInterno.IdUnidadDeMedida)
                     // && p.UnidadDeMedida.Equals(DatosPedidoInterno.UnidadDeMedida)
                     //  && p.IdMarca.Equals(DatosPedidoInterno.IdMarca)
                     //   && p.Marca.Equals(DatosPedidoInterno.Marca)
                     && p.IdSitio.Equals(DatosPedidoInterno.IdSitio)
                      && p.Sitio.Equals(DatosPedidoInterno.Sitio)
                       && p.IdArticulo.Equals(DatosPedidoInterno.IdArticulo)
                        && p.Articulo.Equals(DatosPedidoInterno.Articulo)
                          && p.Fecha.Equals(DatosPedidoInterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosInternos obj = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(id)).First();
                    //obj.NumeroPedido = DatosPedidoInterno.NumeroPedido;
                    obj.CantidadSolicitada = DatosPedidoInterno.CantidadSolicitada;
                 //   obj.CantidadAprobada = DatosPedidoInterno.CantidadAprobada;
                  //  obj.Tipo = DatosPedidoInterno.Tipo;
                    //obj.IdUnidadDeMedida = DatosPedidoInterno.IdUnidadDeMedida;
                    //obj.UnidadDeMedida = DatosPedidoInterno.UnidadDeMedida;
                    //obj.IdMarca = DatosPedidoInterno.IdMarca;
                    //obj.Marca = DatosPedidoInterno.Marca;
                    obj.IdSitio = DatosPedidoInterno.IdSitio;
                    obj.IdArticulo = DatosPedidoInterno.IdArticulo;
                    obj.Articulo = DatosPedidoInterno.Articulo;
                    obj.Fecha = DatosPedidoInterno.Fecha;
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



        //Eliminar Compra
        public int EliminarPedidoInterno(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                PedidosInternos PedidosInternos = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id)).First();
                PedidosInternos.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }


        public JsonResult ConsultaPedidosArticulosTienda(long Pedi)
        {
            var numero = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Pedi) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Articulo,
                    p.CantidadSolicitada
                });
            return Json(numero, JsonRequestBehavior.AllowGet);
        }

        public void ConsultaPedidosNumeroPedidoRa()
        {
            ModeloPedidosExternos modeloPedidosExternos = new ModeloPedidosExternos();
            ModeloPedidosExternos.IdArea = new List<long>();
            ModeloPedidosExternos.NoPedidoG = new List<long>();
            ModeloPedidosExternos.NoPedidoPro = new List<long>();
            ModeloPedidosExternos.Area = new List<string>();
            ModeloPedidosExternos.ProveedorE = new List<string>();
            ModeloPedidosExternos.Fecha = new List<string>();

            string NoPedido = "";
            string NoProvedor = "";
            string Proveedor = "";
            string fecha = "";
            string Area = "";
            string IDArea = "";


            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1)).OrderByDescending(p => p.IdPedidosInternos)
               .Select(p => new
               {
                   pedido = p.NumeroPedido,
                   IdProveedor = p.IdProveedor,
                   proveedors = p.Proveedor,
                   fecha = p.Fecha,
                   noProve = p.NumPedidoProveedor,
                   depa = p.Sitio,
                   IDDepa = p.IdSitio,
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
                        fecha += numero.fecha + ",";
                        Area += numero.depa + ",";
                        IDArea += numero.IDDepa + ",";



                    }
                    if (numero.pedido != tem1 || numero.noProve != tem2)
                    {
                        NoPedido += numero.pedido + ",";
                        NoProvedor += numero.noProve + ",";
                        Proveedor += numero.proveedors + ",";
                        fecha += numero.fecha + ",";
                        Area += numero.depa + ",";
                        IDArea += numero.IDDepa + ",";


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
                NoPedido += "0" + ",";
                NoProvedor += "0" + ",";
                Proveedor += "0" + ",";
                fecha += "0" + ",";
                Area += "0" + ",";
                IDArea += "0" + ",";

            }
            var consulta = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                NoProvedor = NoProvedor.Substring(0, NoProvedor.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                fecha = fecha.Substring(0, fecha.Length - 1),
                Area = Area.Substring(0, Area.Length - 1),
                IDArea = IDArea.Substring(0, IDArea.Length - 1),
            };

            string[] NoPedidosG = NoPedido.Substring(0, NoPedido.Length - 1).Split(',');
            string[] NoProvedores = NoProvedor.Substring(0, NoProvedor.Length - 1).Split(',');
            string[] IDAreas = IDArea.Substring(0, IDArea.Length - 1).Split(',');
            string[] Proveedores = Proveedor.Substring(0, Proveedor.Length - 1).Split(',');
            string[] Departamento = Area.Substring(0, Area.Length - 1).Split(',');
            string[] Fechas = fecha.Substring(0, fecha.Length - 1).Split(',');

            for (int i = 0; i < NoPedidosG.GetLength(0); i++)
            {
                ModeloPedidosExternos.ProveedorE.Add(Proveedores[i]);
                ModeloPedidosExternos.Area.Add(Departamento[i]);
                ModeloPedidosExternos.Fecha.Add(Fechas[i]);
                ModeloPedidosExternos.NoPedidoG.Add(Convert.ToInt32(NoPedidosG[i]));
                ModeloPedidosExternos.NoPedidoPro.Add(Convert.ToInt32(NoProvedores[i]));
                ModeloPedidosExternos.IdArea.Add(Convert.ToInt32(IDAreas[i]));
            }
        }

        public ActionResult Pedido2da()
        {
            return View();
        }
=======
        //        });
        //    return Json(pedidosInt, JsonRequestBehavior.AllowGet);
        //}
        ////Guardar los datos de la compra
        //public int GuardarPedidoInterno(PedidosInternos DatosPedidoInterno)
        //{
        //    int Afectados = 0;
        //    //try
        //    //{
        //    long id = DatosPedidoInterno.IdPedidosInternos;
        //    if (id.Equals(0))
        //    {
        //        int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)).Count();

        //        //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
        //        if (nveces == 0)
        //        {
        //            InvBD.PedidosInternos.InsertOnSubmit(DatosPedidoInterno);
        //            InvBD.SubmitChanges();
        //            Afectados = 1;
        //        }
        //        else
        //        {
        //            Afectados = -1;
        //        }
        //    }
        //    else
        //    {
        //        int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)
        //        && p.CantidadSolicitada.Equals(DatosPedidoInterno.CantidadSolicitada)
        //           && p.CantidadAprobada.Equals(DatosPedidoInterno.CantidadAprobada)
        //           && p.Tipo.Equals(DatosPedidoInterno.Tipo)
        //             //&& p.IdUnidadDeMedida.Equals(DatosPedidoInterno.IdUnidadDeMedida)
        //             // && p.UnidadDeMedida.Equals(DatosPedidoInterno.UnidadDeMedida)
        //             //  && p.IdMarca.Equals(DatosPedidoInterno.IdMarca)
        //             //   && p.Marca.Equals(DatosPedidoInterno.Marca)
        //             && p.IdTienda.Equals(DatosPedidoInterno.IdTienda)
        //              && p.Tienda.Equals(DatosPedidoInterno.Tienda)
        //               && p.IdArticulo.Equals(DatosPedidoInterno.IdArticulo)
        //                && p.Articulo.Equals(DatosPedidoInterno.Articulo)
        //                  && p.Fecha.Equals(DatosPedidoInterno.Fecha)).Count();
        //        if (nveces == 0)
        //        {
        //            PedidosInternos obj = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(id)).First();
        //            //obj.NumeroPedido = DatosPedidoInterno.NumeroPedido;
        //            obj.CantidadSolicitada = DatosPedidoInterno.CantidadSolicitada;
        //            obj.CantidadAprobada = DatosPedidoInterno.CantidadAprobada;
        //            obj.Tipo = DatosPedidoInterno.Tipo;
        //            //obj.IdUnidadDeMedida = DatosPedidoInterno.IdUnidadDeMedida;
        //            //obj.UnidadDeMedida = DatosPedidoInterno.UnidadDeMedida;
        //            //obj.IdMarca = DatosPedidoInterno.IdMarca;
        //            //obj.Marca = DatosPedidoInterno.Marca;
        //            obj.IdTienda = DatosPedidoInterno.IdTienda;
        //            obj.IdArticulo = DatosPedidoInterno.IdArticulo;
        //            obj.Articulo = DatosPedidoInterno.Articulo;
        //            obj.Fecha = DatosPedidoInterno.Fecha;
        //            InvBD.SubmitChanges();
        //            Afectados = 1;
        //        }
        //        else
        //        {
        //            Afectados = -1;
        //        }
        //    }
        //    //}
        //    //catch (Exception ex)
        //    //{
        //    //    Afectados = 0;
        //    //}
        //    return Afectados;
        //}



        ////Eliminar Compra
        //public int EliminarPedidoInterno(long Id)
        //{
        //    int nregistradosAfectados = 0;
        //    try
        //    {//Consulta los datos y el primer Id que encuentra  lo compara
        //        PedidosInternos PedidosInternos = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id)).First();
        //        PedidosInternos.Estatus = 0;//Cambia el estatus en 0
        //        InvBD.SubmitChanges();//Guarda los datos en la Base de datos
        //        nregistradosAfectados = 1;//Se pudo realizar
        //    }
        //    catch (Exception ex)
        //    {
        //        nregistradosAfectados = 0;
        //    }
        //    return nregistradosAfectados;
        //}
        //public ActionResult Pedido2da()
        //{
        //    return View();
        //}
>>>>>>> anabel2
    }
}

