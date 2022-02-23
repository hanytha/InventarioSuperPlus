using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
namespace Inventario.Controllers
{
    //Llamar al método de seguridad
    [Seguridad]
    public class SupervisionController : Controller
    {
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        public object Datetime { get; private set; }

        // GET: Supervision
        public ActionResult Supervision()
        {
            return View();
        }
        public JsonResult ConsultaSuperviciones()
        {
            var superviciones = InvBD.Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdSupervision,
                    p.TipoSupervicion,
                    p.IdUsuario,
                    p.IdAreas,
                    p.Tienda,
                    p.nombreUsuario,
                    p.Estatus
                });
            return Json(superviciones, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSupervicion(long Id)
        {
            var supervicion = InvBD.Supervision.Where(p => p.IdSupervision.Equals(Id))
                .Select(p => new
                {
                    p.IdSupervision,
                    Nombre = p.TipoSupervicion,
                    p.TipoSupervicion,
                    p.IdUsuario,
                    p.IdAreas,
                    p.Tienda,
                    p.nombreUsuario,
                    p.Estatus,
                });
            return Json(supervicion, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarSupervicion(Supervision DatosSupervicion)
        {
            int Afectados = 0;
            try
            {
                long id = DatosSupervicion.IdSupervision;
                if (id.Equals(0))
                {
                    int nveces = InvBD.Supervision.Where(p => p.TipoSupervicion.Equals(DatosSupervicion.TipoSupervicion)).Count();

                    if (nveces == 0)
                    {
                        InvBD.Supervision.InsertOnSubmit(DatosSupervicion);
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
                    int nveces = InvBD.Supervision.Where(p => p.TipoSupervicion.Equals(DatosSupervicion.TipoSupervicion) && p.IdUsuario.Equals(DatosSupervicion.IdUsuario) && p.nombreUsuario.Equals(DatosSupervicion.nombreUsuario) && p.Tienda.Equals(DatosSupervicion.Tienda)).Count();
                    if (nveces == 0)
                    {
                        Supervision obj = InvBD.Supervision.Where(p => p.IdSupervision.Equals(id)).First();
                        obj.TipoSupervicion = DatosSupervicion.TipoSupervicion;
                        obj.Tienda = DatosSupervicion.Tienda;
                        obj.IdUsuario = DatosSupervicion.IdUsuario;
                        obj.nombreUsuario = DatosSupervicion.nombreUsuario;
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
        public int EliminarSupervicion(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Supervision Sprv = InvBD.Supervision.Where(p => p.IdSupervision.Equals(Id)).First();
                Sprv.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
        //--------------------Controlador SucursalesSupervision--------------------
        public ActionResult SucursalesSupervision()
        {
            return View();
        }
        public int CargarSucursalesXSupervision()
        {
            int Encontrados = 0;
            string[] Sucursales = Accesos.Tiendas.Split('#');
            TiendasSupervision.IDTienda = new List<long>();
            TiendasSupervision.Nombre = new List<string>();
            TiendasSupervision.LNombre = new List<string>();
            TiendasSupervision.E1Nombre = new List<string>();
            TiendasSupervision.E2Nombre = new List<string>();
            TiendasSupervision.E3Nombre = new List<string>();
            TiendasSupervision.A1Nombre = new List<string>();
            TiendasSupervision.A2Nombre = new List<string>();
            TiendasSupervision.A3Nombre = new List<string>();
            TiendasSupervision.Estado = new List<string>();
            TiendasSupervision.Municipio = new List<string>();
            TiendasSupervision.Localidad = new List<string>();
            TiendasSupervision.Calle = new List<string>();
            TiendasSupervision.CP = new List<long>();
            TiendasSupervision.Telefono = new List<long>();
            TiendasSupervision.HApertura = new List<string>();
            TiendasSupervision.HCierre = new List<string>();
            TiendasSupervision.Estatus = new List<int>();
            for (int i = 0; i < Sucursales.Length; i++)
            {
                var Tienda = InvBD.Tienda.Where(p => p.IdTienda.Equals(Sucursales[i]))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus
                }).First();
                TiendasSupervision.IDTienda.Add(Tienda.IdTienda);
                TiendasSupervision.Nombre.Add(Tienda.Nombre);
                TiendasSupervision.LNombre.Add(Tienda.LNombre);
                if (Tienda.E1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E1Nombre.Add(Tienda.E1Nombre);
                }
                else
                {
                    TiendasSupervision.E1Nombre.Add("");
                }
                if (Tienda.E2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E2Nombre.Add(Tienda.E2Nombre);
                }
                else
                {
                    TiendasSupervision.E2Nombre.Add("");
                }
                if (Tienda.E3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E3Nombre.Add(Tienda.E3Nombre);
                }
                else
                {
                    TiendasSupervision.E3Nombre.Add("");
                }
                if (Tienda.A1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A1Nombre.Add(Tienda.A1Nombre);
                }
                else
                {
                    TiendasSupervision.A1Nombre.Add("");
                }
                if (Tienda.A2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A2Nombre.Add(Tienda.A2Nombre);
                }
                else
                {
                    TiendasSupervision.A2Nombre.Add("");
                }
                if (Tienda.A3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A3Nombre.Add(Tienda.A3Nombre);
                }
                else
                {
                    TiendasSupervision.A3Nombre.Add("");
                }
                TiendasSupervision.Estado.Add(Tienda.Estado);
                TiendasSupervision.Municipio.Add(Tienda.Municipio);
                TiendasSupervision.Localidad.Add(Tienda.Localidad);
                TiendasSupervision.Calle.Add(Tienda.Calle);
                TiendasSupervision.CP.Add(Tienda.CP);
                TiendasSupervision.Telefono.Add(Tienda.Telefono);
                TiendasSupervision.Estatus.Add(Convert.ToInt32(Tienda.Estatus));

                if (Tienda.HApertura != null)
                {
                    TiendasSupervision.HApertura.Add(Tienda.HApertura);
                }
                else
                {
                    TiendasSupervision.HApertura.Add("");

                }
                if (Tienda.HCierre != null)
                {
                    TiendasSupervision.HCierre.Add(Tienda.HCierre);
                }
                else
                {
                    TiendasSupervision.HCierre.Add("");
                }

            }
            return Encontrados;
        }






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

                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(1)
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


        //-----Consulta para Mostrar el stock general de los articulos en la tienda del lider----
        public JsonResult ConsultaStockArticulos(long IDTienda, long IdArt)
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

                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(1) && ExistenciaAlmacenG.IdArticulo.Equals(IdArt)
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
                    //SumaStock = (int)(SumaStock + numero.stockActual);
                    //Stock += SumaStock + ",";

                    //if (consultaFecha.Count() > 0)
                    //{
                    //    int UltimoReg = consultaFecha.Count() - 1;
                    //    int cont = 0;
                    //    int SumaStock = 0;
                    //    foreach (var comp in consultaFecha)
                    //    {
                    //        SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                    //        if (cont == UltimoReg)
                    //        {
                    //            Fecha+= comp.fechaIngreso + ",";
                    //        }
                    //        cont++;
                    //    }
                    //    Stock += SumaStock + ",";

                    //}

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

                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(0)
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



        public JsonResult ConsultaArticuloModal(long id)
        {
            var ConsultaArticulo = from CompraInterno in InvBD.CompraInterno
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on CompraInterno.IdCompraInterno equals ExistenciaAlmacenG.IdCompraInterno

                                   where ExistenciaAlmacenG.IdExistenciaAlmacenG.Equals(id)
                                   select new

                                   {
                                       //id = ExistenciaAlmacenG.IdArticulo,
                                       //NoPedido = ExistenciaAlmacenG.NoPedidoG,
                                       //IdCmpraInt = ExistenciaAlmacenG.IdCompraInterno,
                                       ////    Proveedor=CompraInterno.Proveedor,
                                       //IdSitio = CompraInterno.IdSitio,
                                       //Tiendas = CompraInterno.Sitio,
                                       Nombre = ExistenciaAlmacenG.Articulo,
                                       IdArticulo = ExistenciaAlmacenG.IdArticulo,
                                       NoPedido = CompraInterno.NoPedido,
                                       IdProveedor = CompraInterno.IdProveedor
                                       //stockActual = ExistenciaAlmacenG.ExitenciaActual,
                                       //IdAsignacion = CompraInterno.IdAsignacion,
                                       //IdExistenciaAlmacenG = ExistenciaAlmacenG.IdExistenciaAlmacenG,
                                   };
            return Json(ConsultaArticulo, JsonRequestBehavior.AllowGet);
        }






        public JsonResult ConsultaArticulo(long Id)
        {
            string id = "";
            string Nombre = "";
            string NombreProveedor = "";
            string Fechas = "";//Es la fecha de la ultima compra reaizada
            string Stock = "";//Es la suma del stock atcual de todas las compras
            string Costos = "";//Es el costo de la compra que actualmente se esta consumiendo


            var ConsultaArticulo = from Articulos in InvBD.Articulos
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on Articulos.IdArticulos equals ExistenciaAlmacenG.IdArticulo
                                   join CompraInterno in InvBD.CompraInterno
                                    on ExistenciaAlmacenG.IdCompraInterno equals CompraInterno.IdCompraInterno
                                   where Articulos.IdArticulos.Equals(Id)
                                   select new

                                   {

                                       Id = Articulos.IdArticulos,
                                       IdExistencia = ExistenciaAlmacenG.IdExistenciaAlmacenG,
                                       NoPedido = ExistenciaAlmacenG.NoPedidoG,
                                       nombres = Articulos.NombreEmpresa,
                                       IdArticulos = Articulos.IdArticulos,
                                       Articulo = Articulos.NombreEmpresa,
                                       IdAsignacion = CompraInterno.IdAsignacion,
                                       ExitenciaActual = ExistenciaAlmacenG.ExitenciaActual,
                                       IdSitio = CompraInterno.IdSitio,
                                       NombreProveedor = Articulos.IdAreas,
                                       FechaDeIngreso = CompraInterno.FechaIngreso
                                   };
            foreach (var art in ConsultaArticulo)
            {
                id += art.Id + ",";
                Nombre += art.nombres + ",";
                NombreProveedor += art.nombres + ",";
                var consultaFecha = ConsultaArticulo.Where(p => p.Id.Equals(art.Id) && p.ExitenciaActual > 0).OrderBy(p => p.IdAsignacion)
                    .Select(p => new
                    {
                        fechaIngreso = p.FechaDeIngreso,
                        stockActual = p.ExitenciaActual,
                        //  costo = p.PrecioUnitario,
                    });

                if (consultaFecha.Count() > 0)
                {
                    int UltimoReg = consultaFecha.Count() - 1;
                    int cont = 0;
                    int SumaStock = 0;
                    //inicia
                    //DateTime FultCompra;                
                    foreach (var comp in consultaFecha)
                    {

                        SumaStock = (int)(SumaStock + comp.stockActual);
                        if (cont == 0)
                        {
                            // Costos += comp.costo + ",";
                        }
                        if (cont == UltimoReg)
                        {
                            Fechas += comp.fechaIngreso + ",";
                        }
                        cont++;
                    }
                    Stock += SumaStock + ",";
                    //termina
                }
                else
                {
                    Costos += "0" + ",";

                    Fechas += "2010-08-10" + ",";
                    Stock += "0" + ",";
                }
            }
            var ResultadoId = new { id = id.Substring(0, id.Length - 1), Nombre = Nombre.Substring(0, Nombre.Length - 1), Fechas = Fechas.Substring(0, Fechas.Length - 1), Stock = Stock.Substring(0, Stock.Length - 1), NombreProveedor = NombreProveedor.Substring(0, NombreProveedor.Length - 1) };
            return Json(ResultadoId, JsonRequestBehavior.AllowGet);
        }

        //Obtener las tiendas de la supervisión en SucursalesSupervisión.cshtml-------
        public JsonResult BDSupervisionTiendas()
        {
            var datos = InvBD.Supervision.Where(p => p.IdSupervision.Equals(Accesos.IDSitio) && p.IdUsuario.Equals(Accesos.Id))
                .Select(p => new
                {
                    ID = p.IdSupervision,
                    Nombre = p.TipoSupervicion,
                    p.IdUsuario,
                    p.Tienda
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public void CargarSucursales()
        {
            Sucursales Sucursal = new Sucursales();
            Sucursales.IDTienda = new List<long>();
            Sucursales.NoTienda = new List<long>();
            Sucursales.Nombre = new List<string>();
            Sucursales.LNombre = new List<string>();
            Sucursales.E1Nombre = new List<string>();
            Sucursales.E2Nombre = new List<string>();
            Sucursales.E3Nombre = new List<string>();
            Sucursales.A1Nombre = new List<string>();
            Sucursales.A2Nombre = new List<string>();
            Sucursales.A3Nombre = new List<string>();
            Sucursales.Estado = new List<string>();
            Sucursales.Municipio = new List<string>();
            Sucursales.Localidad = new List<string>();
            Sucursales.Calle = new List<string>();
            Sucursales.CP = new List<long>();
            Sucursales.Telefono = new List<long>();
            Sucursales.Latitud = new List<string>();
            Sucursales.Longitud = new List<string>();
            Sucursales.HApertura = new List<string>();
            Sucursales.HCierre = new List<string>();
            Sucursales.Estatus = new List<int>();
            var Tienda = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
            .Select(p => new
            {
                p.IdTienda,
                p.Nombre,
                p.LNombre,
                p.E1Nombre,
                p.E2Nombre,
                p.E3Nombre,
                p.A1Nombre,
                p.A2Nombre,
                p.A3Nombre,
                p.Estado,
                p.Municipio,
                p.Localidad,
                p.Calle,
                p.CP,
                p.Telefono,
                p.HApertura,
                p.HCierre,
                p.Estatus
            });
            foreach (var Suc in Tienda)
            {
                Sucursales.IDTienda.Add(Suc.IdTienda);
                Sucursales.Nombre.Add(Suc.Nombre);
                Sucursales.LNombre.Add(Suc.LNombre);
                if (Suc.E1Nombre != "--Seleccione--")
                {
                    Sucursales.E1Nombre.Add(Suc.E1Nombre);
                }
                else
                {
                    Sucursales.E1Nombre.Add("");
                }
                if (Suc.E2Nombre != "--Seleccione--")
                {
                    Sucursales.E2Nombre.Add(Suc.E2Nombre);
                }
                else
                {
                    Sucursales.E2Nombre.Add("");
                }
                if (Suc.E3Nombre != "--Seleccione--")
                {
                    Sucursales.E3Nombre.Add(Suc.E3Nombre);
                }
                else
                {
                    Sucursales.E3Nombre.Add("");
                }
                if (Suc.A1Nombre != "--Seleccione--")
                {
                    Sucursales.A1Nombre.Add(Suc.A1Nombre);
                }
                else
                {
                    Sucursales.A1Nombre.Add("");
                }
                if (Suc.A2Nombre != "--Seleccione--")
                {
                    Sucursales.A2Nombre.Add(Suc.A2Nombre);
                }
                else
                {
                    Sucursales.A2Nombre.Add("");
                }
                if (Suc.A3Nombre != "--Seleccione--")
                {
                    Sucursales.A3Nombre.Add(Suc.A3Nombre);
                }
                else
                {
                    Sucursales.A3Nombre.Add("");
                }
                Sucursales.Estado.Add(Suc.Estado);
                Sucursales.Municipio.Add(Suc.Municipio);
                Sucursales.Localidad.Add(Suc.Localidad);
                Sucursales.Calle.Add(Suc.Calle);
                Sucursales.CP.Add(Suc.CP);
                Sucursales.Telefono.Add(Suc.Telefono);
                Sucursales.Estatus.Add(Convert.ToInt32(Suc.Estatus));

                if (Suc.HApertura != null)
                {
                    Sucursales.HApertura.Add(Suc.HApertura);
                }
                else
                {
                    Sucursales.HApertura.Add("");

                }
                if (Suc.HCierre != null)
                {
                    Sucursales.HCierre.Add(Suc.HCierre);
                }
                else
                {
                    Sucursales.HCierre.Add("");
                }
            }
        }
        //Consulta de la tabla de articulos x tienda
        //-----------Consulta los datos por ID del artículo pero en la tabla de existencias almacen G------------------
        public JsonResult ConsultaExistenciaAlmGJoinProveedor(long No, long Id)
        {
            var ExistenciaAlmG = from ExistenciAAlmacen in InvBD.ExistenciaAlmacenG
                                 join CompraInterno in InvBD.CompraInterno
                            on ExistenciAAlmacen.IdCompraInterno equals CompraInterno.IdCompraInterno
                                 join provedor in InvBD.Areas
                             on CompraInterno.IdProveedor equals provedor.IdAreas
                                 join Tienda in InvBD.Tienda
                                   on CompraInterno.IdSitio equals Tienda.IdTienda
                                 where ExistenciAAlmacen.NoPedidoG.Equals(No) && CompraInterno.IdSitio.Equals(Id) && CompraInterno.EstatusPedido.Equals(1)
                                 select new
                                 {
                                     FechaDeIngreso = CompraInterno.FechaIngreso,
                                     NoPedido = CompraInterno.NoPedido,
                                     Articulo = ExistenciAAlmacen.Articulo,
                                     // Coste = ExistenciAAlmacen.PrecioUnitario,
                                     IdArticulo = ExistenciAAlmacen.IdArticulo,
                                     //    IdProveedor = provedor.IdAreas,
                                     //    Proveedor = provedor.Nombre



                                     id = ExistenciAAlmacen.IdArticulo,
                                     // NoPedido = ExistenciAAlmacen.NoPedidoG,
                                     IdCmpraInt = ExistenciAAlmacen.IdCompraInterno,
                                     //    Proveedor=CompraInterno.Proveedor,
                                     IdSitio = CompraInterno.IdSitio,
                                     Tiendas = CompraInterno.Sitio,
                                     //Articulo = ExistenciAAlmacen.Articulo,
                                     // FechaDeIngreso = CompraInterno.FechaIngreso,
                                     stockActual = ExistenciAAlmacen.ExitenciaActual,
                                     IdAsignacion = CompraInterno.IdAsignacion,
                                     IdExistenciaAlmacenG = ExistenciAAlmacen.IdExistenciaAlmacenG,
                                 };
            return Json(ExistenciaAlmG, JsonRequestBehavior.AllowGet);
        }



        public JsonResult ConsultaArtTiendaLider(long No, long Id)
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
            var ConsultaArticulo = from ExistenciAAlmacen in InvBD.ExistenciaAlmacenG
                                   join CompraInterno in InvBD.CompraInterno
                              on ExistenciAAlmacen.IdCompraInterno equals CompraInterno.IdCompraInterno
                                   join provedor in InvBD.Areas
                               on CompraInterno.IdProveedor equals provedor.IdAreas
                                   join Tienda in InvBD.Tienda
                                     on CompraInterno.IdSitio equals Tienda.IdTienda
                                   where ExistenciAAlmacen.IdCompraInterno.Equals(No) && CompraInterno.IdSitio.Equals(Id) && CompraInterno.EstatusPedido.Equals(1)
                                   select new
                                   {
                                       FechaDeIngreso = CompraInterno.FechaIngreso,
                                       NoPedido = CompraInterno.NoPedido,
                                       Articulo = ExistenciAAlmacen.Articulo,
                                       // Coste = ExistenciAAlmacen.PrecioUnitario,
                                       IdArticulo = ExistenciAAlmacen.IdArticulo,
                                       //    IdProveedor = provedor.IdAreas,
                                       //    Proveedor = provedor.Nombre

                                       id = ExistenciAAlmacen.IdArticulo,
                                       // NoPedido = ExistenciAAlmacen.NoPedidoG,
                                       IdCmpraInt = ExistenciAAlmacen.IdCompraInterno,
                                       Proveedor = CompraInterno.Proveedor,
                                       IdSitio = CompraInterno.IdSitio,
                                       Tiendas = CompraInterno.Sitio,
                                       //Articulo = ExistenciAAlmacen.Articulo,
                                       // FechaDeIngreso = CompraInterno.FechaIngreso,
                                       stockActual = ExistenciAAlmacen.ExitenciaActual,
                                       IdAsignacion = CompraInterno.IdAsignacion,
                                       IdExistenciaAlmacenG = ExistenciAAlmacen.IdExistenciaAlmacenG,
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
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2)).OrderBy(p => p.NoPedido)
                        // var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
                        .Select(p => new
                        {
                            fechaIngreso = p.FechaDeIngreso,
                            ExitenciaActual = p.stockActual,
                        });
                    //SumaStock = (int)(SumaStock + numero.stockActual);
                    //Stock += SumaStock + ",";

                    //if (consultaFecha.Count() > 0)
                    //{
                    //    int UltimoReg = consultaFecha.Count() - 1;
                    //    int cont = 0;
                    //    int SumaStock = 0;
                    //    foreach (var comp in consultaFecha)
                    //    {
                    //        SumaStock = (int)(SumaStock + comp.ExitenciaActual);

                    //        if (cont == UltimoReg)
                    //        {
                    //            Fecha+= comp.fechaIngreso + ",";
                    //        }
                    //        cont++;
                    //    }
                    //    Stock += SumaStock + ",";

                    //}

                    if (contador == 0)
                    {
                        tem1 = (int)numero.id;
                        tem2 = (int)numero.IdCmpraInt;
                        tem3 = (int)numero.IdSitio;
                        id += numero.id + ",";
                        NoPedido += numero.NoPedido + ",";
                        IdCmpraInt += numero.IdCmpraInt + ",";
                        IdSitio += numero.IdSitio + ",";
                        IdArticulos += numero.IdArticulo + ",";
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
                    if (numero.id != tem1 || numero.IdCmpraInt != tem2 || numero.IdSitio != tem3)
                    {
                        tem1 = (int)numero.id;
                        tem2 = (int)numero.IdCmpraInt;
                        tem3 = (int)numero.IdSitio;

                        id += numero.id + ",";
                        NoPedido += numero.NoPedido + ",";
                        IdCmpraInt += numero.IdCmpraInt + ",";
                        IdSitio += numero.IdSitio + ",";
                        Fecha += numero.FechaDeIngreso + ",";
                        Proveedor += numero.Proveedor + ",";
                        Articulo += numero.Articulo + ",";
                        IdArticulos += numero.IdArticulo + ",";
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
                IdArticulos = IdArticulos.Substring(0, IdArticulos.Length - 1),
                Fecha = Fecha.Substring(0, Fecha.Length - 1),
                Stock = Stock.Substring(0, Stock.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1),

            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }






        //public JsonResult ConsultaExistenciaAlmGJoinProveedor(long No, long Id)
        //{
        //    var ExistenciaAlmG = from ExistenciAAlmacen in InvBD.ExistenciaAlmacenG
        //                         join provedor in InvBD.Areas
        //                     on ExistenciAAlmacen.IdProveedor equals provedor.IdAreas
        //                         join Tienda in InvBD.Tienda
        //                           on ExistenciAAlmacen.IdSitio equals Tienda.IdTienda
        //                         where ExistenciAAlmacen.NoPedido.Equals(No) && ExistenciAAlmacen.IdSitio.Equals(Id)
        //                         select new
        //                         {
        //                             FechaDeIngreso = ExistenciAAlmacen.FechaDeIngreso,
        //                             NoPedido = ExistenciAAlmacen.NoPedido,
        //                             Articulo = ExistenciAAlmacen.NombreEmpresa,
        //                             Coste = ExistenciAAlmacen.Coste,
        //                             IdArticulo = ExistenciAAlmacen.IdArticulo,
        //                             //    IdProveedor = provedor.IdAreas,
        //                             //    Proveedor = provedor.Nombre
        //                         };
        //    return Json(ExistenciaAlmG, JsonRequestBehavior.AllowGet);
        //}



        //----------------------Lenar el combobox----------------------------
        public JsonResult BDTienda(long Id)
        {
            var datos = InvBD.Tienda.Where(p => p.Estatus.Equals(1) && p.IdTienda.Equals(Id))
                .Select(p => new
                {
                    ID = p.IdTienda,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaSitio(long IdS)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join CompraInterno in InvBD.CompraInterno
                            on ExistAlm.IdCompraInterno equals CompraInterno.IdCompraInterno
                            join provedor in InvBD.Areas
                        on CompraInterno.IdProveedor equals provedor.IdAreas
                            where CompraInterno.IdSitio.Equals(IdS)
                            select new
                            {
                                Articulo = ExistAlm.Articulo,
                                IdArticulo = ExistAlm.IdArticulo,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = provedor.IdAreas,
                                Proveedor = provedor.Nombre,
                                Tienda = CompraInterno.IdSitio,
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Consulta(long Id)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where Compra.IdSitio.Equals(Id)
                            select new
                            {
                                IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                                Articulo = ExistAlm.Articulo,
                                IdArticulo = ExistAlm.IdArticulo,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre,
                                Tienda = Compra.IdSitio,
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultaDevA(long idExist)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where ExistAlm.IdExistenciaAlmacenG.Equals(idExist)
                            select new
                            {
                                IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                                Articulo = ExistAlm.Articulo,
                                IdArticulo = ExistAlm.IdArticulo,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre,
                                Tienda = Compra.IdSitio,
                                ExitenciaActual = ExistAlm.ExitenciaActual,
                                //ExistenciaInicDevolucion = ExistAlm.ExistenciaInicDevolucion,
                                //ExistenciaActDevolucion = ExistAlm.ExistenciaActDevolucion
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult BDNoPedido(long Id)
        //{
        //    var datos = from Art in InvBD.Articulos
        //                    join existenciaAlm in InvBD.ExistenciaAlmacenG
        //              on Art.IdArticulos equals existenciaAlm.IdArticulo
        //                where Art.IdArticulos.Equals(Id)
        //                    select new
        //                    {
        //                        NoPedido = existenciaAlm.NoPedidoG

        //                    };
        //    return Json(datos, JsonRequestBehavior.AllowGet);
        //}

        //Consulta de proveedores en la tabla existenciaAlmacenGeneral
        public JsonResult ConsultaComJoinProveedor(long Id)
        {
            var ExistAlmG = from Art in InvBD.Articulos
                            join areas in InvBD.Areas
                        on Art.IdAreas equals areas.IdAreas

                            //join ExistenciaAlmacen in InvBD.ExistenciaAlmacenG
                            //   on Art.IdArticulos equals ExistenciaAlmacen.IdArticulo

                            where Art.IdAreas.Equals(Id)
                            select new
                            {
                                Articulo = Art.NombreEmpresa,
                                IdArticulo = Art.IdArticulos,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre,
                                //NoPedido = ExistenciaAlmacen.NoPedidoG
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultaArtDev(long Id)
        {
            var ExistAlmG = from Art in InvBD.Articulos
                            join areas in InvBD.Areas
                        on Art.IdAreas equals areas.IdAreas

                            join ExistenciaAlmacen in InvBD.ExistenciaAlmacenG
                               on Art.IdArticulos equals ExistenciaAlmacen.IdArticulo

                            where ExistenciaAlmacen.IdExistenciaAlmacenG.Equals(Id)
                            select new
                            {
                                Nombre = Art.NombreEmpresa,
                                IdArticulo = Art.IdArticulos,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre,
                                NoPedido = ExistenciaAlmacen.NoPedidoG
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }



        public JsonResult BDProveedor()
        {
            var datos = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdAreas,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Combo proveedores en la tabla articulos
        public JsonResult ConsultaIdPro(string IdPro)
        {
            var compra = InvBD.Articulos.Where(p => p.IdAreas.Equals(IdPro) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.NombreEmpresa,
                    p.IdArticulos,
                    p.Unidad
                });
            return Json(compra, JsonRequestBehavior.AllowGet);
        }






        public JsonResult ConsultaArticulosXtienda(string IdPro)
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
            var ConsultaArticulo = from ExistAlm in InvBD.ExistenciaAlmacenG
                                   join Articulos in InvBD.Articulos
                           on ExistAlm.IdArticulo equals Articulos.IdArticulos
                                   //     join CompraArticulos in InvBD.ComprasArticulos
                                   //on ExistAlm.IdArticulo equals CompraArticulos.IdArticulo

                                   join Compra in InvBD.CompraInterno
                               on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                                   join areas in InvBD.Areas
                               on Compra.IdProveedor equals areas.IdAreas
                                   where Compra.IdSitio.Equals(IdPro) && Compra.EstatusPedido.Equals(1)
                                   select new
                                   {
                                       id = ExistAlm.IdArticulo,
                                       IdCmpraInt = ExistAlm.IdCompraInterno,
                                       IdExistencia = ExistAlm.IdExistenciaAlmacenG,
                                       NombreEmpresa = Articulos.NombreEmpresa,
                                       IdArticulos = ExistAlm.IdArticulo,
                                       Tipo = ExistAlm.TipoDeOperacion,
                                       IdProveedor = areas.IdAreas,
                                       Proveedor = areas.Nombre,
                                       Tienda = Compra.IdSitio,
                                       IdSitio = Compra.IdSitio,
                                       NoPedido = Compra.NoPedido,
                                       IdArticulo = ExistAlm.IdArticulo,
                                       Articulo = ExistAlm.Articulo,
                                       FechaDeIngreso = Compra.FechaIngreso,
                                       IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                                       stockActual = ExistAlm.ExitenciaActual,
                                       ExistenciaActDevolucion = ExistAlm.ExitenciaActual,
                                       IdAsignacion = ExistAlm.IdExistenciaAlmacenG
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
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IdPro)).OrderBy(p => p.NoPedido)
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
                        IdArticulos += numero.Articulo + ",";
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
                        IdArticulos += numero.Articulo + ",";
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
                IdArticulos += " " + ",";
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
                IdArticulos = IdArticulos.Substring(0, IdArticulos.Length - 1),
                Fecha = Fecha.Substring(0, Fecha.Length - 1),
                Stock = Stock.Substring(0, Stock.Length - 1),
                Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1),

            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }








        //public JsonResult ConsultaArticulosXtienda(string IdPro)
        //{


        //    var compra = from ExistAlm in InvBD.ExistenciaAlmacenG
        //                 join Articulos in InvBD.Articulos
        //         on ExistAlm.IdArticulo equals Articulos.IdArticulos
        //            //     join CompraArticulos in InvBD.ComprasArticulos
        //            //on ExistAlm.IdArticulo equals CompraArticulos.IdArticulo

        //                 join Compra in InvBD.CompraInterno
        //             on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
        //                 join areas in InvBD.Areas
        //             on Compra.IdProveedor equals areas.IdAreas
        //                 where Compra.IdSitio.Equals(IdPro) && Compra.EstatusPedido.Equals(1)
        //                 select new
        //                 {
        //                     IdExistencia = ExistAlm.IdExistenciaAlmacenG,
        //                     NombreEmpresa = Articulos.NombreEmpresa,
        //                     IdArticulos = ExistAlm.IdArticulo,
        //                     Tipo = ExistAlm.TipoDeOperacion,
        //                     IdProveedor = areas.IdAreas,
        //                     Proveedor = areas.Nombre,
        //                     Tienda = Compra.IdSitio,
        //                   //  PrecioUnitarioPromedio = CompraArticulos.PrecioUnitario,
        //                     ExistenciaActDevolucion = ExistAlm.ExitenciaActual
        //                 };
        //    return Json(compra, JsonRequestBehavior.AllowGet);


        //}


        //    var compra = from ExistAlm in InvBD.ExistenciaAlmacenG
        //                 join Articulos in InvBD.Articulos
        //            on ExistAlm.IdArticulo equals Articulos.IdArticulos
        //                 // join CompraArt in InvBD.ComprasArticulos
        //                 //on Articulos.IdArticulos equals CompraArt.IdArticulo
        //                 join Compra in InvBD.CompraInterno
        //             on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
        //                 join areas in InvBD.Areas
        //             on Compra.IdProveedor equals areas.IdAreas
        //                 where Compra.IdSitio.Equals(IdPro) && Compra.EstatusPedido.Equals(1)
        //                 select new
        //                 {
        //                     IdExistencia = ExistAlm.IdExistenciaAlmacenG,
        //                     NombreEmpresa = ExistAlm.Articulo,
        //                     IdArticulos = ExistAlm.IdArticulo,
        //                     Tipo = ExistAlm.TipoDeOperacion,
        //                     IdProveedor = areas.IdAreas,
        //                     Proveedor = areas.Nombre,
        //                     Tienda = Compra.IdSitio,
        //                     //   PrecioUnitarioPromedio = CompraArt.PrecioUnitario,
        //                     ExistenciaActDevolucion = ExistAlm.ExistenciaActDevolucion
        //                 };
        //        return Json(compra, JsonRequestBehavior.AllowGet);


        //}

        public int GuardarPedidoInterno(PedidosInternos DatosPedidoInterno)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosPedidoInterno.IdPedidosInternos;
            if (id.Equals(0))
            {
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)).Count();

                //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces >= 0)
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
                && p.NumPedidoProveedor.Equals(DatosPedidoInterno.NumPedidoProveedor)
                && p.CantidadSolicitada.Equals(DatosPedidoInterno.CantidadSolicitada)
                 && p.IdArticulo.Equals(DatosPedidoInterno.IdArticulo)
                 && p.Articulo.Equals(DatosPedidoInterno.Articulo)
                 && p.Fecha.Equals(DatosPedidoInterno.Fecha)).Count();
                if (nveces == 0)
                {
                    PedidosInternos obj = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(id)).First();
                    obj.CantidadSolicitada = DatosPedidoInterno.CantidadSolicitada;
                    obj.IdProveedor = DatosPedidoInterno.IdProveedor;
                    obj.Proveedor = DatosPedidoInterno.Proveedor;
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
            //}
            //    catch (Exception ex)
            //    {
            //        Afectados = 0;
            //    }
            return Afectados;
        }



        public JsonResult ConsultaPedidosDecendiente()
        {
            string NumeroPedido = "";
            var pedidosNum = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1) || p.Estatus.Equals(0)).OrderBy(p => p.NumeroPedido)
                .Select(p => new
                {
                    p.IdPedidosInternos,
                    Pedido = p.NumeroPedido,
                });
            //foreach (var ped in pedidosNum)
            //{
            //    int SumaNum = (int)(ped.Pedido + 1);
            //    NumeroPedido += SumaNum + ",";
            //}

            if (pedidosNum.Count() > 0)
            {
                foreach (var num in pedidosNum)
                {
                    int SumaNumero = (int)(num.Pedido + 1);
                    NumeroPedido = SumaNumero + ",";
                }
            }
            else
            {
                NumeroPedido += "1" + ",";
            }
            var compras = new { NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1) };
            return Json(compras, JsonRequestBehavior.AllowGet);
        }
        //Consulta el siguiente número de pedido por proveedor
        public JsonResult ConsultaNumPedidoProveedor(long ID)
        {
            string numPedidoProve = "";
            var numero = InvBD.PedidosInternos.Where(p => p.IdProveedor.Equals(ID))
                .Select(p => new
                {
                    Id = p.IdProveedor,
                    NumeroPProveedor = p.NumPedidoProveedor,
                });
            if (numero.Count() > 0)
            {
                foreach (var num in numero)
                {
                    int SumaNumero = (int)(num.NumeroPProveedor + 1);
                    numPedidoProve = SumaNumero + ",";
                }
            }
            else
            {
                numPedidoProve += "1" + ",";
            }

            var numeros = new { numPedidoProve = numPedidoProve.Substring(0, numPedidoProve.Length - 1) };
            return Json(numeros, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult ConsultaArticulosAceptar(long IDTienda)
        //{
        //    string id = "";
        //    string NoPedido = "";
        //    string Nombre = "";
        //    string Proveedor = "";
        //    string Fechas = "";//Es la fecha de la ultima compra reaizada
        //    string Stock = "";//Es la suma del stock atcual de todas las compras
        //    string IdSitio = "";
        //    string IdArticulos = "";
        //    var ConsultaArticulo = from Articulos in InvBD.Articulos
        //                           join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
        //                           on Articulos.IdArticulos equals ExistenciaAlmacenG.IdArticulo
        //                           join CompraInterno in InvBD.CompraInterno
        //                            on ExistenciaAlmacenG.IdCompraInterno equals CompraInterno.IdCompraInterno
        //                           where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.EstatusPedido.Equals(0)
        //                           select new
        //                           {

        //                               Id = Articulos.IdArticulos,
        //                               IdExistencia = ExistenciaAlmacenG.IdExistenciaAlmacenG,
        //                               NoPedido = ExistenciaAlmacenG.NoPedidoG,
        //                               nombres = Articulos.NombreEmpresa,
        //                               Proveedor = CompraInterno.Proveedor,
        //                               IdArticulos = Articulos.IdArticulos,
        //                               Articulo = Articulos.NombreEmpresa,
        //                               ExitenciaActual = ExistenciaAlmacenG.ExitenciaActual,
        //                               IdAsignacion = CompraInterno.IdAsignacion,
        //                               IdSitio = CompraInterno.IdSitio,
        //                               FechaDeIngreso = CompraInterno.FechaIngreso
        //                           };
        //    foreach (var art in ConsultaArticulo)
        //    {
        //        id += art.Id + ",";
        //        Nombre += art.nombres + ",";
        //        Proveedor += art.Proveedor + ",";
        //        NoPedido += art.NoPedido + ",";
        //        IdSitio += art.IdSitio + ",";
        //        IdArticulos += art.IdArticulos + ",";
        //        var consultaFecha = ConsultaArticulo.Where(p => p.Id.Equals(art.Id) && p.ExitenciaActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.IdArticulos)
        //           .Select(p => new
        //           {
        //               fechaIngreso = p.FechaDeIngreso,
        //               stockActual = p.ExitenciaActual,
        //           });
        //        if (consultaFecha.Count() > 0)
        //        {
        //            int UltimoReg = consultaFecha.Count() - 1;
        //            int cont = 0;
        //            int SumaStock = 0;
        //            foreach (var comp in consultaFecha)
        //            {
        //                SumaStock = (int)(SumaStock + comp.stockActual);

        //                if (cont == UltimoReg)
        //                {
        //                    Fechas += comp.fechaIngreso + ",";
        //                }
        //                cont++;
        //            }
        //            Stock += SumaStock + ",";

        //        }
        //        else
        //        {
        //            Fechas += "2010-08-10" + ",";
        //            Stock += "0" + ",";
        //        }
        //    }
        //    var Resultado = new { id = id.Substring(0, id.Length - 1), Nombre = Nombre.Substring(0, Nombre.Length - 1), Proveedor = Proveedor.Substring(0, Proveedor.Length - 1), NoPedido = NoPedido.Substring(0, NoPedido.Length - 1), IdSitio = IdSitio.Substring(0, IdSitio.Length - 1), Fechas = Fechas.Substring(0, Fechas.Length - 1), Stock = Stock.Substring(0, Stock.Length - 1) };
        //    return Json(Resultado, JsonRequestBehavior.AllowGet);
        //}


        //public JsonResult BDTiposMovimiento()
        //{
        //    var datos = InvBD.TipoDeMovimientos.Where(p => p.Estatus.Equals(1))
        //        .Select(p => new {
        //            ID = p.IdMovimientos,
        //            Nombre = p.TipoDeMovimiento
        //        });
        //    return Json(datos, JsonRequestBehavior.AllowGet);
        //}

        //------------------Supervision2da------------------------------------
        public ActionResult Supervision2da()
        {
            return View();
        }

        public ActionResult TiendaLider()
        {
            return View();
        }

        public int CargarTiendaLider()
        {
            int Encontrados = 0;
            string[] Sucursales = Accesos.Tiendas.Split('#');
            TiendasSupervision.IDTienda = new List<long>();
            TiendasSupervision.Nombre = new List<string>();
            TiendasSupervision.LNombre = new List<string>();
            TiendasSupervision.E1Nombre = new List<string>();
            TiendasSupervision.E2Nombre = new List<string>();
            TiendasSupervision.E3Nombre = new List<string>();
            TiendasSupervision.A1Nombre = new List<string>();
            TiendasSupervision.A2Nombre = new List<string>();
            TiendasSupervision.A3Nombre = new List<string>();
            TiendasSupervision.Estado = new List<string>();
            TiendasSupervision.Municipio = new List<string>();
            TiendasSupervision.Localidad = new List<string>();
            TiendasSupervision.Calle = new List<string>();
            TiendasSupervision.CP = new List<long>();
            TiendasSupervision.Telefono = new List<long>();
            TiendasSupervision.HApertura = new List<string>();
            TiendasSupervision.HCierre = new List<string>();
            TiendasSupervision.Estatus = new List<int>();
            for (int i = 0; i < Sucursales.Length; i++)
            {
                var Tienda = InvBD.Tienda.Where(p => p.IdTienda.Equals(Sucursales[i]))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus
                }).First();
                TiendasSupervision.IDTienda.Add(Tienda.IdTienda);
                TiendasSupervision.Nombre.Add(Tienda.Nombre);
                TiendasSupervision.LNombre.Add(Tienda.LNombre);
                if (Tienda.E1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E1Nombre.Add(Tienda.E1Nombre);
                }
                else
                {
                    TiendasSupervision.E1Nombre.Add("");
                }
                if (Tienda.E2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E2Nombre.Add(Tienda.E2Nombre);
                }
                else
                {
                    TiendasSupervision.E2Nombre.Add("");
                }
                if (Tienda.E3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.E3Nombre.Add(Tienda.E3Nombre);
                }
                else
                {
                    TiendasSupervision.E3Nombre.Add("");
                }
                if (Tienda.A1Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A1Nombre.Add(Tienda.A1Nombre);
                }
                else
                {
                    TiendasSupervision.A1Nombre.Add("");
                }
                if (Tienda.A2Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A2Nombre.Add(Tienda.A2Nombre);
                }
                else
                {
                    TiendasSupervision.A2Nombre.Add("");
                }
                if (Tienda.A3Nombre != "--Seleccione--")
                {
                    TiendasSupervision.A3Nombre.Add(Tienda.A3Nombre);
                }
                else
                {
                    TiendasSupervision.A3Nombre.Add("");
                }
                TiendasSupervision.Estado.Add(Tienda.Estado);
                TiendasSupervision.Municipio.Add(Tienda.Municipio);
                TiendasSupervision.Localidad.Add(Tienda.Localidad);
                TiendasSupervision.Calle.Add(Tienda.Calle);
                TiendasSupervision.CP.Add(Tienda.CP);
                TiendasSupervision.Telefono.Add(Tienda.Telefono);
                TiendasSupervision.Estatus.Add(Convert.ToInt32(Tienda.Estatus));

                if (Tienda.HApertura != null)
                {
                    TiendasSupervision.HApertura.Add(Tienda.HApertura);
                }
                else
                {
                    TiendasSupervision.HApertura.Add("");

                }
                if (Tienda.HCierre != null)
                {
                    TiendasSupervision.HCierre.Add(Tienda.HCierre);
                }
                else
                {
                    TiendasSupervision.HCierre.Add("");
                }

            }
            return Encontrados;
        }



        //public JsonResult ConsultaPedidosArticulos(long Pedi)
        //{
        //    var numero = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(Pedi) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            p.Articulo,
        //            p.CantidadSolicitada,
        //            //p.PrecioUnitario,
        //            //p.Unidad
        //        });
        //    return Json(numero, JsonRequestBehavior.AllowGet);
        //}


        public JsonResult ConsultaPedidosArticulos(long id, long no)
        //{(long Id)
        {
            var numero = from ExistAlm in InvBD.ExistenciaAlmacenG
                         join Compra in InvBD.CompraInterno
                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                         join areas in InvBD.Areas
                     on Compra.IdProveedor equals areas.IdAreas
                         where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
                         select new
                         {
                             IdPedidosInternos = ExistAlm.IdCompraInterno,
                             NumeroPedido = ExistAlm.Articulo,
                             NumPedidoProveedor = Compra.NoPedidoProveedor,
                             Articulo = ExistAlm.Articulo,
                             CantidadSolicitada = ExistAlm.ExitenciaInicial,
                             CantidadAprobada = ExistAlm.ExitenciaActual,
                             Tipo = ExistAlm.TipoDeOperacion,
                             IdProveedor = Compra.IdProveedor,
                             Proveedor = Compra.Proveedor,
                             IdTienda = Compra.IdSitio,
                             IdArticulo = ExistAlm.IdArticulo,
                             //Articulo = ExistAlm.NombreEmpresa,
                             Fecha = Compra.FechaIngreso,
                         };
            return Json(numero, JsonRequestBehavior.AllowGet);
        }

        
        public JsonResult usado(long id, long no)
        //{(long Id)
        {
            var numero = from ExistAlm in InvBD.ExistenciaAlmacenG
                         join Compra in InvBD.CompraInterno
                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                         join areas in InvBD.Areas
                     on Compra.IdProveedor equals areas.IdAreas
                         where Compra.NoPedido.Equals(no)
                         //where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
                         select new
                         {
                             IdPedidosInternos = ExistAlm.IdCompraInterno,
                             NumeroPedido = ExistAlm.Articulo,
                             NumPedidoProveedor = Compra.NoPedidoProveedor,
                             Articulo = ExistAlm.Articulo,
                             CantidadSolicitada = ExistAlm.ExitenciaInicial,
                             CantidadAprobada = ExistAlm.ExitenciaActual,
                             Tipo = ExistAlm.TipoDeOperacion,
                             IdProveedor = Compra.IdProveedor,
                             Proveedor = Compra.Proveedor,
                             IdTienda = Compra.IdSitio,
                             IdArticulo = ExistAlm.IdArticulo,
                             //Articulo = ExistAlm.NombreEmpresa,
                             Fecha = Compra.FechaIngreso,
                         };
            return Json(numero, JsonRequestBehavior.AllowGet);
        }
        //public JsonResult ConsultaAceptarPedido(long Id)
        //{
        //    var pedidosInt = InvBD.PedidosInternos.Where(p => p.IdPedidosInternos.Equals(Id) && p.Estatus.Equals(1))
        //        .Select(p => new
        //        {
        //            p.IdPedidosInternos,
        //            p.NumeroPedido,
        //            p.NumPedidoProveedor,
        //            p.CantidadSolicitada,
        //            p.CantidadAprobada,
        //            p.Tipo,
        //            p.IdProveedor,
        //            p.Proveedor,
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

        public JsonResult ConsultaAceptarPedido(long Id, long No)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join Tienda in InvBD.Tienda
                           on Compra.IdSitio equals Tienda.IdTienda
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where ExistAlm.NoPedidoG.Equals(No)
                            select new
                            {
                                IdPedidosInternos = ExistAlm.IdCompraInterno,
                                NumeroPedido = ExistAlm.NoPedidoG,
                                NumPedidoProveedor = Compra.NoPedidoProveedor,
                                NoCompraProveedor = Compra.NoPedido,
                                // CantidadSolicitada = ExistAlm.CantidadSolicitada,
                                // CantidadAprobada = ExistAlm.CantidadAprobada,
                                Tipo = ExistAlm.TipoDeOperacion,
                                IdProveedor = Compra.IdProveedor,
                                Proveedor = Compra.Proveedor,
                                IdTienda = Compra.IdSitio,
                                IdArticulo = ExistAlm.IdArticulo,
                                Articulo = ExistAlm.Articulo,
                                Fecha = Compra.FechaIngreso,
                                Telefono = areas.Telefono,
                                Correo = areas.Correo,
                                Tienda = Tienda.Nombre,
                                Direccion = Tienda.Direccion
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }


        //public JsonResult ConsultaPedidoXnum(long Id, long No)
        //{
        //    var numero = from proveedor in InvBD.Areas
        //                 join pedido in InvBD.PedidosInternos
        //             on proveedor.IdAreas equals pedido.IdProveedor
        //                 join tienda in InvBD.Tienda
        //                   on pedido.IdTienda equals tienda.IdTienda
        //                 where pedido.NumeroPedido.Equals(Num) && pedido.Estatus.Equals(1)
        //                 select new
        //                 {
        //                     IdPedidosInternos = pedido.IdPedidosInternos,
        //                     NumeroPedido = pedido.NumeroPedido,
        //                     CantidadSolicitada = pedido.CantidadSolicitada,

        //                     IdProveedor = proveedor.IdAreas,
        //                     Proveedor = proveedor.Nombre,
        //                     Direccion = tienda.Direccion,
        //                     NumPedidoProveedor = pedido.NumeroPedido,
        //                     IdTienda = pedido.IdTienda,
        //                     Tienda = pedido.Tienda,
        //                     IdArticulo = pedido.IdArticulo,
        //                     Fecha = pedido.Fecha,
        //                     Correo = proveedor.Correo,
        //                     Telefono = proveedor.Telefono,
        //                 };
        //    return Json(numero, JsonRequestBehavior.AllowGet);
        //}


        public int Guardar(CompraInterno AceptarPedido)
        {
            int Afectados = 0;
            //try
            //{
            long id = AceptarPedido.IdCompraInterno;
            if (id.Equals(0))
            {
                //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(0)).Count();

                int nveces = InvBD.CompraInterno.Count();
                //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.CompraInterno.InsertOnSubmit(AceptarPedido);
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

                //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
                //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(1)).Count();
                //if (nveces == 0)
                //{
                CompraInterno obj = InvBD.CompraInterno.Where(p => p.IdCompraInterno.Equals(id)).First();
                obj.NoPedido = AceptarPedido.NoPedido;
                obj.EstatusPedido = AceptarPedido.EstatusPedido;
                obj.Usuario = AceptarPedido.Usuario;
                //obj.NoCompraProveedor = AceptarPedido.NoCompraProveedor;
                InvBD.SubmitChanges();
                Afectados = 1;
                //}
                //else
                //{
                //    Afectados = -1;
                //}
            }

            return Afectados;
        }

        //----------------Guardar movimiento de  SupervisionTienda------------

        public int GuardarUsados(MovimientosTienda DatosUsados)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosUsados.IdMovimiento;
            if (id.Equals(0))
            {
                int nveces = InvBD.MovimientosTienda.Where(p => p.IdMovimiento.Equals(DatosUsados.IdMovimiento)).Count();

                //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces >= 0)
                {
                    InvBD.MovimientosTienda.InsertOnSubmit(DatosUsados);
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
                int nveces = InvBD.MovimientosTienda.Where(p => p.IdMovimiento.Equals(DatosUsados.IdMovimiento)
                  && p.IdExistencia.Equals(DatosUsados.IdExistencia)
                && p.IdExistencia.Equals(DatosUsados.IdExistencia)
                 //  && p.IdCompra.Equals(DatosUsados.IdCompra)
                 && p.IdArticulo.Equals(DatosUsados.IdArticulo)
                 && p.Movimiento.Equals(DatosUsados.Movimiento)
                 && p.Fecha.Equals(DatosUsados.Fecha)
                  && p.Cantidad.Equals(DatosUsados.Cantidad)
                 //&& p.Costo.Equals(DatosUsados.Costo)
                 && p.Fecha.Equals(DatosUsados.Fecha)
                 ).Count();
                if (nveces == 0)
                {
                    MovimientosTienda obj = InvBD.MovimientosTienda.Where(p => p.IdMovimiento.Equals(id)).First();
                    obj.IdExistencia = DatosUsados.IdExistencia;
                    //    obj.IdCompra = DatosUsados.IdCompra;
                    obj.IdArticulo = DatosUsados.IdArticulo;
                    obj.Movimiento = DatosUsados.Movimiento;
                    obj.Movimiento = DatosUsados.Movimiento;
                    obj.Cantidad = DatosUsados.Cantidad;
                    // obj.Costo = DatosUsados.Costo;
                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
            //}
            //    catch (Exception ex)
            //    {
            //        Afectados = 0;
            //    }
            return Afectados;
        }



        public int GuardarDev(ExistenciaAlmacenG AceptarPedido)
        {
            int Afectados = 0;
            //try
            //{
            long id = AceptarPedido.IdExistenciaAlmacenG;
            if (id.Equals(0))
            {
                //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(0)).Count();

                int nveces = InvBD.ExistenciaAlmacenG.Count();
                //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.ExistenciaAlmacenG.InsertOnSubmit(AceptarPedido);
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

                //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
                //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(1)).Count();
                //if (nveces == 0)
                //{
                ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
                obj.Observaciones = AceptarPedido.Observaciones;
                obj.TipoDeOperacion = AceptarPedido.TipoDeOperacion;
                // obj.ExistenciaInicDevolucion = AceptarPedido.ExistenciaInicDevolucion;
                obj.ExitenciaActual = AceptarPedido.ExitenciaActual;
                // obj.EstatusArticulo = AceptarPedido.EstatusArticulo;
                InvBD.SubmitChanges();
                Afectados = 1;
                //}
                //else
                //{
                //    Afectados = -1;
                //}
            }

            return Afectados;
        }

        //public int GuardarExistenciasAlm(ExistenciaAlmacenG AceptarPedido)
        //{
        //    int Afectados = 0;
        //    //try
        //    //{
        //    long id = AceptarPedido.IdExistenciaAlmacenG;
        //    if (id.Equals(0))
        //    {
        //        //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(0)).Count();

        //        int nveces = InvBD.ExistenciaAlmacenG.Count();
        //        //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
        //        // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
        //        if (nveces == 0)
        //        {
        //            InvBD.ExistenciaAlmacenG.InsertOnSubmit(AceptarPedido);
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

        //        //int nveces = InvBD.CompraInterno.Where(p => p.NoPedido.Equals(AceptarPedido.NoPedido)).Count();
        //        //int nveces = InvBD.CompraInterno.Where(p => p.EstatusPedido.Equals(1)).Count();
        //        //if (nveces == 0)
        //        //{
        //        ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
        //        obj.Observaciones = AceptarPedido.Observaciones;
        //        obj.TipoDeOperacion = AceptarPedido.TipoDeOperacion;
        //        obj.ExistenciaInicDevolucion = AceptarPedido.ExistenciaInicDevolucion;
        //        obj.ExistenciaActDevolucion = AceptarPedido.ExistenciaActDevolucion;
        //        // obj.EstatusArticulo = AceptarPedido.EstatusArticulo;
        //        InvBD.SubmitChanges();
        //        Afectados = 1;
        //        //}
        //        //else
        //        //{
        //        //    Afectados = -1;
        //        //}
        //    }

        //    return Afectados;
        //}

        //public int GuardarDevolucion(ExistenciaAlmacenG DatosDevolucion)
        //{
        //    int Afectados = 0;
        //    //try
        //    //{
        //    long id = DatosDevolucion.IdExistenciaAlmacenG;
        //    if (id.Equals(0))
        //    {
        //        int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(DatosDevolucion.IdExistenciaAlmacenG)).Count();

        //        //  int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosProveedor.NumeroPedido) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
        //        if (nveces >= 0)
        //        {
        //            InvBD.ExistenciaAlmacenG.InsertOnSubmit(DatosDevolucion);
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
        //        int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(DatosDevolucion.IdExistenciaAlmacenG)
        //        && p.IdExistenciaAlmacenG.Equals(DatosDevolucion.IdExistenciaAlmacenG)
        //        && p.IdCompra.Equals(DatosDevolucion.IdCompra)
        //         && p.IdCompraInterno.Equals(DatosDevolucion.IdCompraInterno)
        //         && p.ExitenciaInicial.Equals(DatosDevolucion.ExitenciaInicial)
        //         && p.ExitenciaActual.Equals(DatosDevolucion.ExitenciaActual)
        //         && p.IdArticulo.Equals(DatosDevolucion.IdArticulo)
        //         && p.Articulo.Equals(DatosDevolucion.Articulo)
        //         && p.NoPedidoG.Equals(DatosDevolucion.NoPedidoG)
        //         && p.TipoDeOperacion.Equals(DatosDevolucion.TipoDeOperacion)
        //         && p.Observaciones.Equals(DatosDevolucion.Observaciones)
        //         && p.ExistenciaActDevolucion.Equals(DatosDevolucion.ExistenciaActDevolucion)
        //         && p.ExistenciaInicDevolucion.Equals(DatosDevolucion.ExistenciaInicDevolucion)
        //         ).Count();
        //        if (nveces == 0)
        //        {
        //            ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
        //            obj.IdExistenciaAlmacenG = DatosDevolucion.IdExistenciaAlmacenG;
        //            obj.IdCompra = DatosDevolucion.IdCompra;
        //            obj.IdArticulo = DatosDevolucion.IdArticulo;
        //            obj.IdCompraInterno = DatosDevolucion.IdCompraInterno;
        //            obj.ExitenciaInicial = DatosDevolucion.ExitenciaInicial;
        //            obj.ExitenciaActual = DatosDevolucion.ExitenciaActual;
        //            obj.IdArticulo = DatosDevolucion.IdArticulo;
        //            obj.Articulo = DatosDevolucion.Articulo;
        //            obj.IdArticulo = DatosDevolucion.IdArticulo;
        //            obj.NoPedidoG = DatosDevolucion.NoPedidoG;
        //            obj.TipoDeOperacion = DatosDevolucion.TipoDeOperacion;
        //            obj.Observaciones = DatosDevolucion.Observaciones;
        //            obj.ExistenciaActDevolucion = DatosDevolucion.ExistenciaActDevolucion;
        //            obj.ExistenciaInicDevolucion = DatosDevolucion.ExistenciaInicDevolucion;
        //            InvBD.SubmitChanges();
        //            Afectados = 1;
        //        }
        //        else
        //        {
        //            Afectados = -1;
        //        }
        //    }
        //    //}
        //    //    catch (Exception ex)
        //    //    {
        //    //        Afectados = 0;
        //    //    }
        //    return Afectados;
        //}






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
                //string[] Observaciones = IdArticulo[i].Split(':');

                string[] Cantidad = Articulos2[i].Split(':');

                //string[] prueba2 = IdTienda[i].Split(':');
                int resultado = 0;

                //var ConsultaIDArticulo = InvBD.ExistenciaAlmacenG.Where(p => p.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && p.ExitenciaActual > 0 && p.IdArticulo > 0).OrderBy(p => p.NoPedidoG)
                //    .Select(p => new
                //    {
                //        p.IdCompraInterno,
                //        p.IdArticulo,
                //        p.Articulo,
                //        p.ExitenciaActual,
                //        p.Observaciones


                //    });
                var ConsultaIDArticulo = from ExistAlm in InvBD.ExistenciaAlmacenG
                                         join Compra in InvBD.CompraInterno
                                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                                         where ExistAlm.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && Compra.IdSitio.Equals(Convert.ToInt32(IdTienda[1])) && (ExistAlm.ExitenciaActual > 0) && Compra.EstatusPedido.Equals(1)
                                         orderby Compra.FechaIngreso
                                         select new
                                         {
                                             IdCompra = ExistAlm.IdCompra,
                                             IdCompraInterno = ExistAlm.IdCompraInterno,
                                          ExistenciaInicial=ExistAlm.ExitenciaInicial,
                                             ExistenciaActual=ExistAlm.ExitenciaActual,
                                             IdArticulo = ExistAlm.IdArticulo,
                                             Articulo = ExistAlm.Articulo,
                                             ExitenciaAct = ExistAlm.ExitenciaActual,
                                             NoPedidoG=ExistAlm.NoPedidoG,
                                             Observaciones = ExistAlm.Observaciones
                                         };

                var Observacion = Articulos[1];
                //Double Diferencia = Convert.ToInt32(Cantidad);
                //var IdArt = valor[0];
                var IdDeTienda = IdTienda[1];
                Double Diferencia = Convert.ToInt32(Cantidad[1]);

                //var Observacion = Convert.ToInt64(Observaciones[1]);

                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompraInterno);
                    long IdCompraInterno = Convert.ToInt32(con.IdCompraInterno);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);
                    long ExistenciaInicial = Convert.ToInt32(con.ExistenciaInicial);
                    long ExitenciaAct = Convert.ToInt32(con.ExitenciaAct);
                    long NoPedidoG = Convert.ToInt32(con.NoPedidoG);
                    //long Observaciones = Convert.ToInt32(con.Observaciones);

                    if (Diferencia > 0)
                    {
                        Double ExistenciaActual = 0;
                        Double CantidadAct = 0;
                        //var NExistencia = 0;

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

                        consulta = GuardarNStock((long)con.IdCompraInterno, (long)con.IdArticulo, ExistenciaActual, CantidadAct, Observacion, ExistenciaInicial);
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
        public int GuardarNStock(long IdCompraInterno, long IdArticulo, double ExistenciaActual, double CantidadAct, String Observacion, long ExistenciaInicial)
        {
            int nregistradosAfectados = 0;
            //try
            //{
            var cons = GuardarMovimientoDev((long)IdCompraInterno, (long)IdArticulo, (double)ExistenciaActual, (double)CantidadAct, (string)Observacion, ExistenciaInicial);
            int consulta = 0;
            //ExistenciaAlmacenG mpag = new ExistenciaAlmacenG();
             ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(IdCompraInterno) && p.IdArticulo.Equals(IdArticulo)).First();
            mpag.ExitenciaActual = ExistenciaActual;//Cambia el estatus en 0
            mpag.TipoDeOperacion = "DEVOLUCION";//Cambia el estatus en 0
            mpag.Observaciones = Observacion;
            //InvBD.ExistenciaAlmacenG.InsertOnSubmit(mpag);
            InvBD.SubmitChanges();//Guarda los datos en la Base de datos

            nregistradosAfectados = 1;//Se pudo realizar
                                      //}
                                      //catch (Exception ex)
                                      //{
                                      //    nregistradosAfectados = 0;
                                      //}
            return nregistradosAfectados;
        }

        public int GuardarMovimientoDev(long IdCompraInterno, long IdArticulo, double ExistenciaActual, double CantidadAct, string Observacion, long ExistenciaInicial)
        {
            int nregistradosAfectados = 0;

            ExistenciaAlmacenG com = new ExistenciaAlmacenG();
            com.IdCompraInterno = IdCompraInterno;
     
            com.ExitenciaInicial = ExistenciaInicial;
            com.ExitenciaActual = CantidadAct;
            //DateTime thisDay = DateTime.Today;

            //com.Fecha = (thisDay.ToString());
            //com.Cantidad = CantidadAct;
            com.IdArticulo = IdArticulo;
            //com.Articulo = Articulo;
            //com.Estatus = 1;
            InvBD.ExistenciaAlmacenG.InsertOnSubmit(com);
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;//Se pudo realizar
            return nregistradosAfectados;
        }

        ///USADO////////
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
                                         where ExistAlm.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && Compra.IdSitio.Equals(Convert.ToInt32(IdTienda[1])) && (ExistAlm.ExitenciaActual > 0) && Compra.EstatusPedido.Equals(1)
                                         orderby Compra.NoPedido
                                          //orderby ExistAlm.IdExistenciaAlmacenG
                                         select new
                                         {
                                             IdCompraInterno = ExistAlm.IdCompraInterno,
                                             IdArticulo = ExistAlm.IdArticulo,
                                             Articulo = ExistAlm.Articulo,
                                             ExitenciaActual = ExistAlm.ExitenciaActual,
                                             Observaciones = ExistAlm.Observaciones,
                                             IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                                             IdCompraExterna = ExistAlm.IdCompra,
                                             ExitenciaAct = ExistAlm.ExitenciaActual
                                         };

                var IdDeTienda = IdTienda[1];
   
                Double Diferencia = Convert.ToInt32(Cantidad[1]);
                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompraInterno);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);
                    long IdExistenciaAlmacenG = Convert.ToInt32(con.IdExistenciaAlmacenG);
                    long IdCompraExterna = Convert.ToInt32(con.IdCompraExterna);
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

                        consulta = GuardarExistenciaActMovUsado((long)con.IdExistenciaAlmacenG, (long)con.IdCompraExterna, (long)con.IdArticulo, (string)con.Articulo, ExistenciaActual, CantidadAct);
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
        ///
        public int GuardarExistenciaActMovUsado(long IdExistencia, long IDCompraExt, long IDArticulo, string Articulo, double ExistenciaActual, double CantidadAct)
        {
            int nregistradosAfectados = 0;
            //try
            //{
          
            var cons = GuardarMovimientoUsado((long)IdExistencia, (long)IDArticulo, (long)IDCompraExt, (double)CantidadAct, (string)Articulo);
            int consulta = 0;

            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(IdExistencia) && p.IdArticulo.Equals(IDArticulo)).First();
            mpag.ExitenciaActual = ExistenciaActual;
         
            InvBD.SubmitChanges();

            nregistradosAfectados = 1;//Se pudo realizar
                                      //}
                                      //catch (Exception ex)
                                      //{
                                      //    nregistradosAfectados = 0;
                                      //}
            return nregistradosAfectados;
        }
        //----------------------------------------------------------------------------------------------------------------
        //Obtener la fecha de manera automática
        public static DateTime Today { get; }
        public int GuardarMovimientoUsado(long IdExistencia, long IDArticulo, long IDCompraExt,  double CantidadAct, string Articulo)
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
            InvBD.MovimientosTienda.InsertOnSubmit(com);
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;//Se pudo realizar
            return nregistradosAfectados;
        }


        public int GuardarExt(ExistenciaAlmacenG DatosExistenciaAlmacenG)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosExistenciaAlmacenG.IdExistenciaAlmacenG;
            if (id.Equals(0))
            {
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.IdArticulo.Equals(DatosExistenciaAlmacenG.IdArticulo)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.ExistenciaAlmacenG.InsertOnSubmit(DatosExistenciaAlmacenG);
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
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.IdArticulo.Equals(DatosExistenciaAlmacenG.IdArticulo)).Count();
                if (nveces == 0)
                {
                    ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
                    obj.ExitenciaActual = DatosExistenciaAlmacenG.ExitenciaActual;
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





        //---------------------------Restar pedidos Usados-----------------------------------------------
        public JsonResult ConsultaStockArticuloUsado(string DatosArticulos)
        {

            
            string[] Articulos = DatosArticulos.Substring(0, DatosArticulos.Length - 1).Split('/');
            int consulta = 0;

            for (int i = 0; i < Articulos.GetLength(0); i++)
            {
                string[] Cantidad = Articulos[i].Split(':');

                int resultado = 0;

                var ConsultaIDArticulo = InvBD.ExistenciaAlmacenG.Where(p => p.IdArticulo.Equals(Convert.ToInt32(Cantidad[0])) && p.ExitenciaActual > 0).OrderBy(p => p.NoPedidoG)
                .Select(p => new
                {
                    p.IdCompraInterno,
                    p.IdArticulo,
                    p.Articulo,
                    p.ExitenciaActual

                });

                var Diferencia = Convert.ToInt32(Cantidad[1]);
                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompraInterno);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);


                    if (Diferencia > 0)
                    {
                        var NExistencia = 0;

                        if (con.ExitenciaActual == Diferencia)
                        {
                            Diferencia = 0;
                            NExistencia = 0;
                        }
                        else if (con.ExitenciaActual > Diferencia)
                        {

                            NExistencia = (int)con.ExitenciaActual - Diferencia;
                            Diferencia = 0;
                        }
                        else
                        {
                            Diferencia = Diferencia - (int)con.ExitenciaActual;
                            NExistencia = 0;

                        }

                        consulta = GuardarNStockUsado((long)con.IdCompraInterno, (long)con.IdArticulo, NExistencia);
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
        public int GuardarNStockUsado(long ID, long IDA, double NExistencia)
        {
            int nregistradosAfectados = 0;
            //try
            //{
            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.ExitenciaActual = NExistencia;//Cambia el estatus en 0
            InvBD.SubmitChanges();//Guarda los datos en la Base de datos
            nregistradosAfectados = 1;//Se pudo realizar
            //}
            //catch (Exception ex)
            //{
            //    nregistradosAfectados = 0;
            //}
            return nregistradosAfectados;
        }



        ///////////-------------------------------------------
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
            //var Pedidos = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG>(1)).OrderBy(p => p.IdExistenciaAlmacenG)
            //   .Select(p => new
            //   {
            //       pedido = p.Articulo,
            //       asignacion = p.IdArticulo,
            //       //Idtienda = p.IdCompraInterno,
            //       tiendas = p.ExitenciaActual,
            //       IdArticulo = p.IdArticulo,
            //       NumeroPedido=p.NoPedidoG,
            //       Nombre=p.Articulo,
            //       Fechas = p.ExitenciaInicial,
            //        IdExistenciaAlmacenG = p.IdExistenciaAlmacenG,
            //   });


            var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
                          join Compra in InvBD.CompraInterno
                      on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                          join areas in InvBD.Areas
                      on Compra.IdProveedor equals areas.IdAreas
                          where Compra.IdSitio.Equals(idS) && Compra.EstatusPedido.Equals(1)&& ExistAlm.ExitenciaActual>0
                          orderby ExistAlm.IdArticulo
                          //where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
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
                              //IdArticulo = ExistAlm.IdArticulo,
                              Nombre = ExistAlm.Articulo,
                              //Fechas = Compra.FechaIngreso,
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

                    var consultaFecha = Pedidos.Where(p => p.IdArticulo.Equals(numero.IdArticulo) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(idS)).OrderBy(p => p.IdArticulo)
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
                        //  IdTienda += numero.Idtienda + ",";
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
                        //IdTienda += numero.Idtienda + ",";
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
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                //IdTienda += "0" + ",";
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
                //IdTienda = IdTienda.Substring(0, IdTienda.Length - 1),
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









        public JsonResult NuevaConsultaUsado(long Id)
        {

            string IdSitios = "";
            string IdCompraInternos = "";
            string IdArticulos = "";
            string Articulos = "";
            string NoPedidoGs = "";
            string IdExistenciaAlmacenG = "";
            string Stock = "";//Es la suma del stock atcual de todas las compras


            string NoPedido = "";
            string IdAsignacion = "";
            string IdTienda = "";
            string NomTienda = "";
            string IdArticulo = "";
            string NumeroPedido = "";
            string Fechas = "";
            string Nombre = "";
          //  string IdExistenciaAlmacenG = "";
            var ConsultaUsado = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(Id))
                 .Select(p => new
                 {
                     //NoPedido = p.NoPedido,
                     //IdCmpraInt = p.IdCompraInterno,
                     IdSitio = p.IdSitio,

                     IdCompraInterno = p.IdCompraInterno

                 });
            //    var ConsultaArticulo = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(IDTienda))
            //         .Select(p => new
            //         {
            //             //NoPedido = p.NoPedido,
            //             //IdCmpraInt = p.IdCompraInterno,
            //             IdSitio = p.IdSitio,
            //             IdCompraInterno = p.IdCompraInterno

            if (ConsultaUsado.Count() > 0)
            {
                long contador = 0;
                String tem1 = "";
                long tem2 = 0;

                long pedi = ConsultaUsado.Count();

                foreach (var comp in ConsultaUsado)
                {
                    IdSitios += comp.IdSitio + ",";
                    IdCompraInternos += comp.IdCompraInterno + ",";

                    //   var ConsultaUsadoss = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(comp.IdCompraInterno)).OrderBy(p => p.NoPedidoG)
                    //.Select(p => new
                    //{

                    //    IdCompraInterno = p.IdCompraInterno,
                    //    NoPedidoG = p.NoPedidoG,
                    //    Articulo = p.Articulo,
                    //    IdArticulo = p.IdArticulo,
                    //    StockActual = p.ExitenciaActual,
                    //    idIdExistenciaAlmacenG = p.IdExistenciaAlmacenG
                    //});

                    var ConsultaUsadoss = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG > (1)).OrderBy(p => p.IdCompraInterno)
                       .Select(p => new
                       {
                           pedido = p.Articulo,
                           asignacion = p.IdArticulo,
                           //Idtienda = p.IdCompraInterno,
                           tiendas = p.ExitenciaActual,
                           IdArticulo = p.IdArticulo,
                           NumeroPedido = p.NoPedidoG,
                           Nombre = p.Articulo,
                           Fechas = p.ExitenciaInicial,
                           IdExistenciaAlmacenG = p.IdExistenciaAlmacenG,
                       });


                    //var consultaFecha = InvBD.ExistenciaAlmacenG.Where(p => p.ExitenciaActual>0 ).OrderBy(p => p.NoPedidoG)
                    // .Select(p => new
                    // {
                    //     //fechaIngreso = p.FechaDeIngreso,
                    //     ExitenciaActual = p.ExitenciaActual,
                    // });
                    int SumaStock = 0;
                    foreach (var numero in ConsultaUsadoss)
                    {
                        if (contador == 0)
                        {
                            tem1 = numero.pedido;
                            tem2 = (int)numero.asignacion;
                            // tem3 = (int)numero.Idtienda;

                            NoPedido += numero.pedido + ",";
                            IdAsignacion += numero.asignacion + ",";
                            //  IdTienda += numero.Idtienda + ",";
                            NomTienda += numero.tiendas + ",";
                            IdArticulo += numero.IdArticulo + ",";
                            NumeroPedido += numero.NumeroPedido + ",";
                            Fechas += numero.Fechas + ",";
                            Nombre += numero.Nombre + ",";
                            IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        }
                        if (numero.pedido != tem1 || numero.asignacion != tem2)
                        {

                            tem1 = numero.pedido;
                            tem2 = (int)numero.asignacion;

                            NoPedido += numero.pedido + ",";
                            IdAsignacion += numero.asignacion + ",";
                            //IdTienda += numero.Idtienda + ",";
                            NomTienda += numero.tiendas + ",";
                            IdArticulo += numero.IdArticulo + ",";
                            NumeroPedido += numero.NumeroPedido + ",";
                            Fechas += numero.Fechas + ",";
                            Nombre += numero.Nombre + ",";
                            IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                     
                            //tem3 = (int)numero.Idtienda;

                            contador++;
                        }
                        else
                        {
                            contador++;
                        }
                    }
                }
            }
            else
            {
                //IdCompraInternos += "0" + ",";
                //NoPedidoGs += "0" + ",";

                //Articulos += "0" + ",";
                //IdArticulos += "0" + ",";
                //Stock += "0" + ",";
                //IdExistenciaAlmacenG += "0" + ",";

                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                //IdTienda += "0" + ",";
                NomTienda += "0" + ",";

                IdArticulo += "0" + ",";
                NumeroPedido += "0" + ",";
                Fechas += "0" + ",";
                Nombre += "0" + ",";
                IdExistenciaAlmacenG += "0" + ",";
            }
            var cons = new
            {
                NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
                //IdTienda = IdTienda.Substring(0, IdTienda.Length - 1),
                NomTienda = NomTienda.Substring(0, NomTienda.Length - 1),

                IdArticulo = IdArticulo.Substring(0, IdArticulo.Length - 1),
                NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1),
                Fechas = Fechas.Substring(0, Fechas.Length - 1),
                Nombre = Nombre.Substring(0, Nombre.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1)
            };
            return Json(cons, JsonRequestBehavior.AllowGet);
        }






        //---------------------------------

        public JsonResult ConsultaArticulosUsadosMov(long IDTienda)
        {

            string IdSitios = "";
            string IdCompraInternos = "";
            string IdArticulos = "";
            string Articulos = "";
            string NoPedidoGs = "";
            string IdExistenciaAlmacenG = "";
            string Stock = "";//Es la suma del stock atcual de todas las compras
            var ConsultaUsado = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(IDTienda))
                 .Select(p => new
                 {
                     //NoPedido = p.NoPedido,
                     //IdCmpraInt = p.IdCompraInterno,
                     IdSitio = p.IdSitio,
                
                     IdCompraInterno = p.IdCompraInterno

                 });
            //    var ConsultaArticulo = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(IDTienda))
            //         .Select(p => new
            //         {
            //             //NoPedido = p.NoPedido,
            //             //IdCmpraInt = p.IdCompraInterno,
            //             IdSitio = p.IdSitio,
            //             IdCompraInterno = p.IdCompraInterno

            if (ConsultaUsado.Count() > 0)
            {
                long contador = 0;
                long tem1 = 0;
                long tem2 = 0;

                long pedi = ConsultaUsado.Count();

                foreach (var comp in ConsultaUsado)
                {
                    IdSitios += comp.IdSitio + ",";
                    IdCompraInternos += comp.IdCompraInterno + ",";

                    var ConsultaUsadoss = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(comp.IdCompraInterno)).OrderBy(p => p.NoPedidoG)
                 .Select(p => new
                 {

                     IdCompraInterno = p.IdCompraInterno,
                     NoPedidoG = p.NoPedidoG,
                     Articulo = p.Articulo,
                     IdArticulo = p.IdArticulo,
                         StockActual = p.ExitenciaActual,
                     idIdExistenciaAlmacenG = p.IdExistenciaAlmacenG
                 });

                    //var consultaFecha = InvBD.ExistenciaAlmacenG.Where(p => p.ExitenciaActual>0 ).OrderBy(p => p.NoPedidoG)
                    // .Select(p => new
                    // {
                    //     //fechaIngreso = p.FechaDeIngreso,
                    //     ExitenciaActual = p.ExitenciaActual,
                    // });
                    int SumaStock = 0;
                    foreach (var usado in ConsultaUsadoss)
                    {
                        if (contador == 0)
                        {
                            tem1 = (int)usado.IdCompraInterno;
                            tem2 = (int)usado.NoPedidoG;


                            IdCompraInternos += usado.IdCompraInterno + ",";
                            NoPedidoGs += usado.NoPedidoG + ",";
                            Articulos += usado.Articulo + ",";
                            IdArticulos += usado.IdArticulo + ",";
                            IdExistenciaAlmacenG += usado.idIdExistenciaAlmacenG + ",";
                            int UltimoReg = ConsultaUsadoss.Count() - 1;
                            int cont = 0;
                        
                            foreach (var comparacion in ConsultaUsadoss)
                            {
                                SumaStock = (int)(SumaStock + comparacion.StockActual);

                                //if (cont == UltimoReg)
                                //{
                                //    Fecha += comp.fechaIngreso + ",";
                                //}
                                cont++;
                            }
                            Stock += SumaStock + ",";
                        }
                        if (usado.IdCompraInterno != tem1 || usado.NoPedidoG != tem2)
                        {
                            tem1 = (int)usado.IdCompraInterno;
                            tem2 = (int)usado.NoPedidoG;

                            IdCompraInternos += usado.IdCompraInterno + ",";
                            NoPedidoGs += usado.NoPedidoG + ",";
                            Articulos += usado.Articulo + ",";
                            IdArticulos += usado.IdArticulo + ",";
                            //IdArticulos += usado.IdArticulo + ",";

                            IdExistenciaAlmacenG += usado.idIdExistenciaAlmacenG + ",";
                            int UltimoReg = ConsultaUsadoss.Count() - 1;
                            int cont = 0;

                            foreach (var comparacion in ConsultaUsadoss)
                            {
                                SumaStock = (int)(SumaStock + comparacion.StockActual);

                                //if (cont == UltimoReg)
                                //{
                                //    Fecha += comp.fechaIngreso + ",";
                                //}
                                cont++;
                            }
                            Stock += SumaStock + ",";



                            //contador++;
                        }
                        else
                        {
                            contador++;
                        }
                    }
                }
            }
            else
            {
                IdCompraInternos += "0" + ",";
                NoPedidoGs += "0" + ",";

                Articulos += "0" + ",";
                IdArticulos += "0" + ",";
                Stock += "0" + ",";
                IdExistenciaAlmacenG += "0" + ",";
            }
                var cons = new
                {
                    IdCompraInternos = IdCompraInternos.Substring(0, IdCompraInternos.Length - 1),
                    NoPedidoGs = NoPedidoGs.Substring(0, NoPedidoGs.Length - 1),
                    Articulos = Articulos.Substring(0, Articulos.Length - 1),
                    IdArticulos = IdArticulos.Substring(0, IdArticulos.Length - 1),
                    IdSitios = IdSitios.Substring(0, IdSitios.Length - 1),
                    Stock = Stock.Substring(0, Stock.Length - 1),
                    IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1)
                };
                return Json(cons, JsonRequestBehavior.AllowGet);
            }
        //}






        public JsonResult ConsultaStockArticuloUsadoSuper(string DatosArticulos)
        {


            string[] Articulos = DatosArticulos.Split(',');
            string[] Articulos2 = DatosArticulos.Split('/');
            int consulta = 0;

            for (int i = 0; i < Articulos.GetLength(0); i++)
            {

                string[] IdArticulo = Articulos[i].Split(':');
                string[] IdTienda = Articulos[i].Split('/');
                //string[] Observaciones = IdArticulo[i].Split(':');

                string[] Cantidad = Articulos2[i].Split(':');

                int resultado = 0;

                //var ConsultaIDArticulo = InvBD.ExistenciaAlmacenG.Where(p => p.IdArticulo.Equals(Convert.ToInt32(Cantidad[0])) && p.ExitenciaActual > 0).OrderBy(p => p.NoPedidoG)
                //.Select(p => new
                //{
                //    p.IdCompraInterno,
                //    p.IdArticulo,
                //    p.Articulo,
                //    p.ExitenciaActual

                //});

                var ConsultaIDArticulo = from ExistAlm in InvBD.ExistenciaAlmacenG
                                         join Compra in InvBD.CompraInterno
                                     on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                                         where ExistAlm.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && Compra.IdSitio.Equals(Convert.ToInt32(IdTienda[1])) && (ExistAlm.ExitenciaActual > 0) && Compra.EstatusPedido.Equals(1)
                                         select new
                                         {
                                             IdCompraInterno = ExistAlm.IdCompraInterno,
                                             IdArticulo = ExistAlm.IdArticulo,
                                             Articulo = ExistAlm.Articulo,
                                             ExitenciaActual = ExistAlm.ExitenciaActual,
                                             Observaciones = ExistAlm.Observaciones
                                         };

                var Diferencia = Convert.ToInt32(Cantidad[1]);
                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompraInterno);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);


                    if (Diferencia > 0)
                    {
                        var NExistencia = 0;

                        if (con.ExitenciaActual == Diferencia)
                        {
                            Diferencia = 0;
                            NExistencia = 0;
                        }
                        else if (con.ExitenciaActual > Diferencia)
                        {

                            NExistencia = (int)con.ExitenciaActual - Diferencia;
                            Diferencia = 0;
                        }
                        else
                        {
                            Diferencia = Diferencia - (int)con.ExitenciaActual;
                            NExistencia = 0;

                        }

                        consulta = GuardarNStockUsadoSuper((long)con.IdCompraInterno, (long)con.IdArticulo, NExistencia);
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

        public int GuardarNStockUsadoSuper(long ID, long IDA, double NExistencia)
        {
            int nregistradosAfectados = 0;
            //try
            //{
            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.ExitenciaActual = NExistencia;//Cambia el estatus en 0
            InvBD.SubmitChanges();//Guarda los datos en la Base de datos
            nregistradosAfectados = 1;//Se pudo realizar
            //}
            //catch (Exception ex)
            //{
            //    nregistradosAfectados = 0;
            //}
            return nregistradosAfectados;
        }

        //public JsonResult ConsultaPedidosNumeroPedido( long IDTienda)
        //{
        //    string IdSitios = "";
        //    string IdCompraInternos = "";
        //    string IdArticulos = "";
        //    string Articulos = "";
        //    string NoPedidoGs = "";



        //    var ConsultaArticulo = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(IDTienda))
        //         .Select(p => new
        //         {
        //             //NoPedido = p.NoPedido,
        //             //IdCmpraInt = p.IdCompraInterno,
        //             IdSitio = p.IdSitio,
        //             IdCompraInterno = p.IdCompraInterno

        //         });

        //    if (ConsultaUsado.Count() > 0)
        //    {
        //        long contador = 0;
        //        long tem1 = 0;
        //        long tem2 = 0;

        //        long pedi = ConsultaUsado.Count();

        //        foreach (var usado in ConsultaUsado)
        //        {
        //            if (contador == 0)
        //            {
        //                tem1 = (int)usado.IdCompraInterno;
        //                tem2 = (int)usado.NoPedidoG;


        //                IdCompraInternos += usado.IdCompraInterno + ",";
        //                NoPedidoGs += usado.NoPedidoG + ",";
        //                Articulos += usado.Articulo + ",";
        //                IdArticulos += usado.IdArticulo + ",";

        //            }
        //            if (usado.IdCompraInterno != tem1 || usado.NoPedidoG != tem2)
        //            {
        //                IdCompraInternos += usado.IdCompraInterno + ",";
        //                NoPedidoGs += usado.NoPedidoG + ",";
        //                Articulos += usado.Articulo + ",";
        //                IdArticulos += usado.IdArticulo + ",";

        //                tem1 = (int)usado.IdCompraInterno;
        //                tem2 = (int)usado.NoPedidoG;



        //                contador++;
        //            }
        //            else
        //            {
        //                contador++;
        //            }
        //        }
        //    }
        //    else
        //    {
        //        IdCompraInternos += "0" + ",";
        //        NoPedidoGs += "0" + ",";

        //        Articulos += "0" + ",";
        //        IdArticulos += "0" + ",";
        //    }
        //    var consulta = new
        //    {
        //        IdCompraInternos = IdCompraInternos.Substring(0, IdCompraInternos.Length - 1),
        //        NoPedidoGs = NoPedidoGs.Substring(0, NoPedidoGs.Length - 1),
        //        Articulos = Articulos.Substring(0, Articulos.Length - 1),
        //        IdArticulos = IdArticulos.Substring(0, IdArticulos.Length - 1),
        //        IdSitios = IdSitios.Substring(0, IdSitios.Length - 1)
        //    };
        //    return Json(consulta, JsonRequestBehavior.AllowGet);
        //}


        //public JsonResult ConsultaArticulosUsados(long IDTienda)
        //{

        //    string id = "";
        //    string NoPedido = "";
        //    string Fecha = "";//Es la fecha de la ultima compra reaizada
        //    string Stock = "";//Es la suma del stock atcual de todas las compras
        //    string IdSitio = "";
        //    string IdArticulos = "";
        //    string Articulo = "";
        //    string IdCmpraInt = "";
        //    string IdTienda = "";
        //    string Sitio = "";
        //    string IdProveedor = "";
        //    string Proveedor = "";

        //    string IdExistenciaAlmacenG = "";
        //    var ConsultaArticulo = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
        //         .Select(p => new
        //         {
        //             //NoPedido = p.NoPedido,
        //             //IdCmpraInt = p.IdCompraInterno,
        //            IdSitio=p.IdSitio


        //         });

        //    if (ConsultaArticulo.Count() > 0)
        //    {
        //        long contador = 0;
        //        long tem1 = 0;
        //        long tem2 = 0;
        //        long tem3 = 0;
        //        long tem4 = 0;
        //        long pedi = ConsultaArticulo.Count();

        //        // int SumaStock = 0;
        //        foreach (var numero in ConsultaArticulo)
        //        {
        //            var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IDTienda)).OrderBy(p => p.NoPedido)
        //             .Select(p => new
        //             {
        //                 fechaIngreso = p.FechaDeIngreso,
        //                 ExitenciaActual = p.stockActual,
        //             });

        //            if (contador == 0)
        //            {
        //                tem1 = (int)numero.NoPedido;
        //                tem2 = (int)numero.IdCmpraInt;
        //                tem3 = (int)numero.IdSitio;
        //                id += numero.id + ",";
        //                NoPedido += numero.NoPedido + ",";
        //                IdCmpraInt += numero.IdCmpraInt + ",";
        //                IdSitio += numero.IdSitio + ",";
        //                IdArticulos += numero.IdArticulo + ",";
        //                Articulo += numero.Articulo + ",";
        //                Fecha += numero.FechaDeIngreso + ",";
        //                IdProveedor += numero.IdProveedor + ",";
        //                Proveedor += numero.Proveedor + ",";

        //                IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
        //                int UltimoReg = consultaFecha.Count() - 1;
        //                int cont = 0;
        //                int SumaStock = 0;
        //                foreach (var comp in consultaFecha)
        //                {
        //                    SumaStock = (int)(SumaStock + comp.ExitenciaActual);

        //                    if (cont == UltimoReg)
        //                    {
        //                        Fecha += comp.fechaIngreso + ",";
        //                    }
        //                    cont++;
        //                }
        //                Stock += SumaStock + ",";
        //            }
        //            if (numero.NoPedido != tem1 || numero.IdCmpraInt != tem2 || numero.IdSitio != tem3)
        //            {
        //                tem1 = (int)numero.NoPedido;
        //                tem2 = (int)numero.IdCmpraInt;
        //                tem3 = (int)numero.IdSitio;

        //                id += numero.id + ",";
        //                NoPedido += numero.NoPedido + ",";
        //                IdCmpraInt += numero.IdCmpraInt + ",";
        //                IdSitio += numero.IdSitio + ",";
        //                Fecha += numero.FechaDeIngreso + ",";
        //                IdProveedor += numero.IdProveedor + ",";
        //                Proveedor += numero.Proveedor + ",";
        //                IdArticulos += numero.IdArticulo + ",";
        //                Articulo += numero.Articulo + ",";
        //                IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
        //                contador++;

        //                int UltimoReg = consultaFecha.Count() - 1;
        //                int cont = 0;
        //                int SumaStock = 0;
        //                foreach (var comp in consultaFecha)
        //                {
        //                    SumaStock = (int)(SumaStock + comp.ExitenciaActual);

        //                    if (cont == UltimoReg)
        //                    {
        //                        Fecha += comp.fechaIngreso + ",";
        //                    }
        //                    cont++;
        //                }
        //                Stock += SumaStock + ",";
        //            }
        //            else
        //            {
        //                contador++;
        //            }
        //        }
        //    }
        //    else
        //    {
        //        id += " " + ",";
        //        NoPedido += "No hay ningún articulo" + ",";
        //        IdCmpraInt += " " + ",";
        //        IdSitio += " " + ",";
        //        IdArticulos += " " + ",";
        //        Articulo += " " + ",";
        //        Fecha += " " + ",";
        //        Stock += " " + ",";
        //        IdProveedor += " " + ",";
        //        Proveedor += " " + ",";
        //        IdExistenciaAlmacenG += " " + ",";
        //    }
        //    var consulta = new
        //    {
        //        id = id.Substring(0, id.Length - 1),
        //        NoPedido = NoPedido.Substring(0, NoPedido.Length - 1),
        //        IdCmpraInt = IdCmpraInt.Substring(0, IdCmpraInt.Length - 1),
        //        IdSitio = IdSitio.Substring(0, IdSitio.Length - 1),
        //        IdArticulos = IdArticulos.Substring(0, IdArticulos.Length - 1),
        //        Articulo = Articulo.Substring(0, Articulo.Length - 1),
        //        Fecha = Fecha.Substring(0, Fecha.Length - 1),
        //        Stock = Stock.Substring(0, Stock.Length - 1),
        //        IdProveedor = IdProveedor.Substring(0, IdProveedor.Length - 1),
        //        Proveedor = Proveedor.Substring(0, Proveedor.Length - 1),
        //        IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1),

        //    };
        //    return Json(consulta, JsonRequestBehavior.AllowGet);
        //}





        //public JsonResult ConsultaArticuloUs(long Id)
        //{
        //    string id = "";
        //    string Nombre = "";
        //    string NombreProveedor = "";
        //    string Fechas = "";//Es la fecha de la ultima compra reaizada
        //    string Stock = "";//Es la suma del stock atcual de todas las compras
        //    string Costos = "";//Es el costo de la compra que actualmente se esta consumiendo
        //    string NumeroPedido = "";
        //    string Fecha = "";
        //    string IdExistenciaAlmacenG = "";
        //    var ConsultaArticulo = from ExistAlm in InvBD.ExistenciaAlmacenG
        //                           join Compra in InvBD.CompraInterno
        //                       on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
        //                           join areas in InvBD.Areas
        //                       on Compra.IdProveedor equals areas.IdAreas
        //                           where Compra.IdSitio.Equals(Id) && Compra.EstatusPedido.Equals(1)
        //                           //where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
        //                           select new
        //                           {
        //                               IdPedidosInternos = ExistAlm.IdCompraInterno,
        //                               NumeroPedido = ExistAlm.Articulo,
        //                               NumPedidoProveedor = Compra.NoPedidoProveedor,
        //                               nombres = ExistAlm.Articulo,
        //                               CantidadSolicitada = ExistAlm.ExitenciaInicial,
        //                               CantidadAprobada = ExistAlm.ExitenciaActual,
        //                               Tipo = ExistAlm.TipoDeOperacion,
        //                               IdProveedor = Compra.IdProveedor,
        //                               Proveedor = Compra.Proveedor,
        //                               IdTienda = Compra.IdSitio,
        //                               Id = ExistAlm.IdArticulo,
        //                               IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
        //                               FechaDeIngreso = Compra.FechaIngreso,
        //                               ExitenciaActual= ExistAlm.ExitenciaActual,
        //                               IdAsignacion=Compra.IdAsignacion
        //                           };
        //    foreach (var art in ConsultaArticulo)
        //    {
        //        id += art.Id + ",";
        //        Nombre += art.nombres + ",";
        //        NombreProveedor += art.nombres + ",";
        //        NumeroPedido += art.NumeroPedido + ",";
        //        Fecha += art.NumeroPedido + ",";
        //        IdExistenciaAlmacenG += art.IdExistenciaAlmacenG + ",";
        //        var consultaFecha = ConsultaArticulo.Where(p => p.Id.Equals(art.Id) && p.ExitenciaActual > 0).OrderBy(p => p.IdAsignacion)
        //            .Select(p => new
        //            {
        //                fechaIngreso = p.FechaDeIngreso,
        //                stockActual = p.ExitenciaActual,
        //                //  costo = p.PrecioUnitario,
        //            });

        //        if (consultaFecha.Count() > 0)
        //        {
        //            int UltimoReg = consultaFecha.Count() - 1;
        //            int cont = 0;
        //            int SumaStock = 0;
        //            //inicia
        //            //DateTime FultCompra;                
        //            foreach (var comp in consultaFecha)
        //            {

        //                SumaStock = (int)(SumaStock + comp.stockActual);
        //                if (cont == 0)
        //                {
        //                    // Costos += comp.costo + ",";
        //                }
        //                if (cont == UltimoReg)
        //                {
        //                    Fechas += comp.fechaIngreso + ",";
        //                }
        //                cont++;
        //            }
        //            Stock += SumaStock + ",";
        //            //termina
        //        }
        //        else
        //        {
        //            Costos += "0" + ",";

        //            Fechas += "2010-08-10" + ",";
        //            Stock += "0" + ",";
        //        }
        //    }
        //    var ResultadoId = new { 
        //        id = id.Substring(0, id.Length - 1), 
        //        Nombre = Nombre.Substring(0, Nombre.Length - 1), 
        //        Fechas = Fechas.Substring(0, Fechas.Length - 1), 
        //        Stock = Stock.Substring(0, Stock.Length - 1),
        //        NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1),
        //        Fecha = Fecha.Substring(0, Fecha.Length - 1),
        //        IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1),
        //        NombreProveedor = NombreProveedor.Substring(0, NombreProveedor.Length - 1) };
        //    return Json(ResultadoId, JsonRequestBehavior.AllowGet);
        //}


        public JsonResult ConsultaArticuloUs(long Id)
        {
            string NumeroPedido = "";
            string IdAsignacion = "";
            string IdTienda = "";
            string NomTienda = "";
            string Nombre = "";
            string IdArticulo = "";
            string Fechas = "";
            string IdExistenciaAlmacenG = "";
            //var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
            //                join Compra in InvBD.CompraInterno
            //            on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
            //                join areas in InvBD.Areas
            //            on Compra.IdProveedor equals areas.IdAreas
            //                where Compra.IdSitio.Equals(Id) && Compra.EstatusPedido.Equals(1)
            //                //where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
            //                select new
            //                {
            //                    IdPedidosInternos = ExistAlm.IdCompraInterno,
            //                    IdCompraInterno = ExistAlm.IdCompraInterno,
            //                    NumeroPedido = ExistAlm.Articulo,
            //                    Pedido = ExistAlm.NoPedidoG,
            //                    NumPedidoProveedor = Compra.NoPedidoProveedor,
            //                    nombres = ExistAlm.Articulo,
            //                    CantidadSolicitada = ExistAlm.ExitenciaInicial,
            //                    CantidadAprobada = ExistAlm.ExitenciaActual,
            //                    Tipo = ExistAlm.TipoDeOperacion,
            //                    IdProveedor = Compra.IdProveedor,
            //                    Proveedor = Compra.Proveedor,
            //                    IdTienda = Compra.IdSitio,
            //                    IdArticulo = ExistAlm.IdArticulo,
            //                    IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
            //                    FechaDeIngreso = Compra.FechaIngreso,
            //                    ExitenciaActual = ExistAlm.ExitenciaActual,
            //                    IdAsignacion = Compra.IdAsignacion
            //                };


             var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
                          join Compra in InvBD.CompraInterno
                      on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                          join areas in InvBD.Areas
                      on Compra.IdProveedor equals areas.IdAreas
                          where Compra.IdSitio>0 && Compra.EstatusPedido.Equals(1)
                          //where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
                          select new
                          {
                              IdCompraInterno = ExistAlm.IdCompraInterno,
                              Pedido = ExistAlm.NoPedidoG,
                              NumPedidoProveedor = Compra.NoPedidoProveedor,
                              nombres = ExistAlm.Articulo,
                              IdExistenciaAlmacenG = ExistAlm.IdExistenciaAlmacenG,
                              IdAsignacion = Compra.IdAsignacion,
                              Tipo = ExistAlm.TipoDeOperacion,
                              IdProveedor = Compra.IdProveedor,
                              Proveedor = Compra.Proveedor,
                              IdTienda = Compra.IdSitio,
                              IdArticulo = ExistAlm.IdArticulo,
                              //Articulo = ExistAlm.NombreEmpresa,
                              FechaDeIngreso = Compra.FechaIngreso,
                          };

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
                        tem1 = (int)numero.IdCompraInterno;
                        tem2 = (int)numero.Pedido;
                        //tem3 = (int)numero.IdArticulo;

                        NumeroPedido += numero.Pedido + ",";
                        IdAsignacion += numero.IdAsignacion + ",";
                        IdTienda += numero.IdTienda + ",";
                        Nombre += numero.nombres + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        //Nombre += numero.nombres + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                    }
                    if (numero.IdCompraInterno != tem1 || numero.Pedido != tem2 )
                    {
                        NumeroPedido += numero.nombres + ",";
                        IdAsignacion += numero.IdAsignacion + ",";
                        IdTienda += numero.IdTienda + ",";
                        Nombre += numero.nombres + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                       // Nombre += numero.nombres + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";

                        tem1 = (int)numero.IdCompraInterno;
                        tem2 = (int)numero.Pedido;
                        //tem3 = (int)numero.IdArticulo;

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
                NumeroPedido += "0" + ",";
                IdAsignacion += "0" + ",";
                IdTienda += "0" + ",";
               // NomTienda += "0" + ",";
                Nombre += "0" + ",";
                IdArticulo += "0" + ",";
                Fechas += "0" + ",";
                IdExistenciaAlmacenG += "0" + ",";
            }
            var consulta = new
            {
                NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1),
                IdAsignacion = IdAsignacion.Substring(0, IdAsignacion.Length - 1),
                IdTienda = IdTienda.Substring(0, IdTienda.Length - 1),
                //NomTienda = NomTienda.Substring(0, NomTienda.Length - 1),

                Nombre = Nombre.Substring(0, Nombre.Length - 1),
                IdArticulo = IdArticulo.Substring(0, IdArticulo.Length - 1),
                Fechas = Fechas.Substring(0, Fechas.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1)
            };
            return Json(consulta, JsonRequestBehavior.AllowGet);
        }


        //---------------------------Restar pedidos Usados-----------------------------------------------
        public JsonResult ConsultaStockArticuloUsadoLider(string DatosArticulos)
        {


            string[] Articulos = DatosArticulos.Substring(0, DatosArticulos.Length - 1).Split('/');
            int consulta = 0;

            for (int i = 0; i < Articulos.GetLength(0); i++)
            {
                string[] Cantidad = Articulos[i].Split(':');

                int resultado = 0;

                var ConsultaIDArticulo = InvBD.ExistenciaAlmacenG.Where(p => p.IdArticulo.Equals(Convert.ToInt32(Cantidad[0])) && p.ExitenciaActual > 0).OrderBy(p => p.NoPedidoG)
                .Select(p => new
                {
                    p.IdCompraInterno,
                    p.IdArticulo,
                    p.Articulo,
                    p.ExitenciaActual

                });

                var Diferencia = Convert.ToInt32(Cantidad[1]);
                foreach (var con in ConsultaIDArticulo)
                {
                    long IDCompras = Convert.ToInt32(con.IdCompraInterno);
                    long IDArticulos = Convert.ToInt32(con.IdArticulo);


                    if (Diferencia > 0)
                    {
                        var NExistencia = 0;

                        if (con.ExitenciaActual == Diferencia)
                        {
                            Diferencia = 0;
                            NExistencia = 0;
                        }
                        else if (con.ExitenciaActual > Diferencia)
                        {

                            NExistencia = (int)con.ExitenciaActual - Diferencia;
                            Diferencia = 0;
                        }
                        else
                        {
                            Diferencia = Diferencia - (int)con.ExitenciaActual;
                            NExistencia = 0;

                        }

                        consulta = GuardarNStockUsadoLider((long)con.IdCompraInterno, (long)con.IdArticulo, NExistencia);
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
        public int GuardarNStockUsadoLider(long ID, long IDA, double NExistencia)
        {
            int nregistradosAfectados = 0;
            //try
            //{
            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.ExitenciaActual = NExistencia;//Cambia el estatus en 0
            InvBD.SubmitChanges();//Guarda los datos en la Base de datos
            nregistradosAfectados = 1;//Se pudo realizar
            //}
            //catch (Exception ex)
            //{
            //    nregistradosAfectados = 0;
            //}
            return nregistradosAfectados;
        }



        //public JsonResult MostrarArtUsado(long id)
        ////{(long Id)
        //{
        //    var numero = from ExistAlm in InvBD.ExistenciaAlmacenG
        //                 join Compra in InvBD.CompraInterno
        //             on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
        //                 join areas in InvBD.Areas
        //             on Compra.IdProveedor equals areas.IdAreas
        //                 where Compra.IdSitio.Equals(id) && Compra.EstatusPedido.Equals(1)
        //                 //where ExistAlm.IdArticulo.Equals(id) && ExistAlm.NoPedidoG.Equals(no)
        //                 select new
        //                 {
        //                     IdPedidosInternos = ExistAlm.IdCompraInterno,
        //                     NumeroPedido = ExistAlm.Articulo,
        //                     NumPedidoProveedor = Compra.NoPedidoProveedor,
        //                     Articulo = ExistAlm.Articulo,
        //                     CantidadSolicitada = ExistAlm.ExitenciaInicial,
        //                     CantidadAprobada = ExistAlm.ExitenciaActual,
        //                     Tipo = ExistAlm.TipoDeOperacion,
        //                     IdProveedor = Compra.IdProveedor,
        //                     Proveedor = Compra.Proveedor,
        //                     IdTienda = Compra.IdSitio,
        //                     IdArticulo = ExistAlm.IdArticulo,
        //                     //Articulo = ExistAlm.NombreEmpresa,
        //                     Fecha = Compra.FechaIngreso,
        //                 };
        //    return Json(numero, JsonRequestBehavior.AllowGet);
        //}






        ////---------------------------Usados-----------------------------------------------
        //public ActionResult PedidosOficina()
        //{
        //    return View();
        //}

    }
}




