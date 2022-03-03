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
        //Guardar los datos
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
        //-----Consulta para Mostrar el stock general de los articulos en la tienda del lider----
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
        public JsonResult ConsultaArticulosAceptar(long IDTienda)
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
            string Proveedor = "";
            string IdExistenciaAlmacenG = "";
            var ConsultaArticulo = from CompraInterno in InvBD.CompraInterno
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on CompraInterno.IdCompraInterno equals ExistenciaAlmacenG.IdCompraInterno
                                   where CompraInterno.IdSitio.Equals(IDTienda) && CompraInterno.IdAsignacion.Equals(2) && CompraInterno.EstatusPedido.Equals(0)
                                   select new
                                   {
                                       id = ExistenciaAlmacenG.IdArticulo,
                                       NoPedido = ExistenciaAlmacenG.NoPedidoG,
                                       IdCmpraInt = ExistenciaAlmacenG.IdCompraInterno,
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

        public JsonResult ConsultaArticuloModal(long id)
        {
            var ConsultaArticulo = from CompraInterno in InvBD.CompraInterno
                                   join ExistenciaAlmacenG in InvBD.ExistenciaAlmacenG
                                   on CompraInterno.IdCompraInterno equals ExistenciaAlmacenG.IdCompraInterno
                                   where ExistenciaAlmacenG.IdExistenciaAlmacenG.Equals(id)
                                   select new
                                   {
                                       Nombre = ExistenciaAlmacenG.Articulo,
                                       IdArticulo = ExistenciaAlmacenG.IdArticulo,
                                       NoPedido = CompraInterno.NoPedido,
                                       IdProveedor = CompraInterno.IdProveedor
                                   };
            return Json(ConsultaArticulo, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ConsultaArticulo(long Id)
        {
            string id = "";
            string Nombre = "";
            string NombreProveedor = "";
            string Fechas = "";
            string Stock = "";
            string Costos = "";

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
                        stockActual = p.ExitenciaActual
                    });

                if (consultaFecha.Count() > 0)
                {
                    int UltimoReg = consultaFecha.Count() - 1;
                    int cont = 0;
                    int SumaStock = 0;
                    foreach (var comp in consultaFecha)
                    {

                        SumaStock = (int)(SumaStock + comp.stockActual);
                        if (cont == 0)
                        {
                        }
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
                                     IdArticulo = ExistenciAAlmacen.IdArticulo,
                                     id = ExistenciAAlmacen.IdArticulo,
                                     IdCmpraInt = ExistenciAAlmacen.IdCompraInterno,
                                     IdSitio = CompraInterno.IdSitio,
                                     Tiendas = CompraInterno.Sitio,
                                     stockActual = ExistenciAAlmacen.ExitenciaActual,
                                     IdAsignacion = CompraInterno.IdAsignacion,
                                     IdExistenciaAlmacenG = ExistenciAAlmacen.IdExistenciaAlmacenG,
                                 };
            return Json(ExistenciaAlmG, JsonRequestBehavior.AllowGet);
        }

        //Consulta de la función desplegar una sola vez los articulos repetidos por el Id de compraInterna en TiendasSupervisi+on y TiendasLider
        public JsonResult ConsultaArtTiendaLider(long idCompraInt, long idS)
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
                          where Compra.IdCompraInterno.Equals(idCompraInt) && Compra.IdAsignacion.Equals(2) && Compra.IdSitio.Equals(idS) && Compra.EstatusPedido.Equals(1)
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
                                ExitenciaActual = ExistAlm.ExitenciaActual
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }

        //Consulta de proveedores en la tabla existenciaAlmacenGeneral
        public JsonResult ConsultaComJoinProveedor(long Id)
        {
            var ExistAlmG = from Art in InvBD.Articulos
                            join areas in InvBD.Areas
                        on Art.IdAreas equals areas.IdAreas
                            where Art.IdAreas.Equals(Id)
                            select new
                            {
                                Articulo = Art.NombreEmpresa,
                                IdArticulo = Art.IdArticulos,
                                IdProveedor = areas.IdAreas,
                                Proveedor = areas.Nombre
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
            string Fecha = "";
            string Stock = "";
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
                foreach (var numero in ConsultaArticulo)
                {
                    var consultaFecha = ConsultaArticulo.Where(p => p.id.Equals(numero.id) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(IdPro)).OrderBy(p => p.NoPedido)
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
        public int GuardarPedidoInterno(PedidosInternos DatosPedidoInterno)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosPedidoInterno.IdPedidosInternos;
            if (id.Equals(0))
            {
                int nveces = InvBD.PedidosInternos.Where(p => p.NumeroPedido.Equals(DatosPedidoInterno.NumeroPedido)).Count();

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

        //------------------Supervision2da------------------------------------
        public ActionResult Supervision2da()
        {
            return View();
        }

        public ActionResult TiendaLider()
        {
            return View();
        }
        public void CargarTiendasAdm()
        {
            TiendasSupervision TiendasSupervision = new TiendasSupervision();
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
            var Tiendas = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
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
            foreach (var Tienda in Tiendas)
            {
                TiendasSupervision.IDTienda.Add(Tienda.IdTienda);
                TiendasSupervision.Nombre.Add(Tienda.Nombre);
                TiendasSupervision.LNombre.Add(Tienda.LNombre);
                TiendasSupervision.Estado.Add(Tienda.Estado);
                TiendasSupervision.Municipio.Add(Tienda.Municipio);
                TiendasSupervision.Localidad.Add(Tienda.Localidad);
                TiendasSupervision.Calle.Add(Tienda.Calle);
                TiendasSupervision.CP.Add(Tienda.CP);
                TiendasSupervision.Telefono.Add(Tienda.Telefono);
                TiendasSupervision.Estatus.Add(Convert.ToInt32(Tienda.Estatus));
            }
        }

        public int CargarTiendas()
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
        public JsonResult ConsultaPedidosArticulos(long id, long no)
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
                             Fecha = Compra.FechaIngreso,
                         };
            return Json(numero, JsonRequestBehavior.AllowGet);
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
                          where Compra.IdSitio.Equals(idS) && ExistAlm.IdCompraInterno.Equals(IdCompInt) && Compra.IdAsignacion.Equals(2) && Compra.EstatusPedido.Equals(0) && ExistAlm.ExitenciaActual >= 0
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
        ///---------------------Visualizar el formato de pedidos
        public JsonResult ConsultaTablaArtPedidos(long IdCompInt, long idS)
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
                          where Compra.IdSitio.Equals(idS) && ExistAlm.IdCompraInterno.Equals(IdCompInt) && Compra.EstatusPedido.Equals(1) && ExistAlm.ExitenciaActual >= 0
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

                    var consultaFecha = Pedidos.Where(p => p.IdArticulo.Equals(numero.IdArticulo) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdCompraInterno.Equals(IdCompInt) && p.IdSitio.Equals(idS)).OrderBy(p => p.IdArticulo)
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
        //Visualizar el archivo de los pedidos aceptados
        public JsonResult ConsultaAceptarPedido(long Id, long No)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join Tienda in InvBD.Tienda
                           on Compra.IdSitio equals Tienda.IdTienda
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where ExistAlm.NoPedidoG.Equals(No) && Compra.IdAsignacion.Equals(2) && Compra.EstatusPedido.Equals(0)
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
                                Tienda = Tienda.Nombre,
                                Localidad = Tienda.Localidad,
                                Direccion = Tienda.Direccion
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }

        public JsonResult VerPedido(long Id, long No)
        {
            var ExistAlmG = from ExistAlm in InvBD.ExistenciaAlmacenG
                            join Compra in InvBD.CompraInterno
                        on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                            join Tienda in InvBD.Tienda
                           on Compra.IdSitio equals Tienda.IdTienda
                            join areas in InvBD.Areas
                        on Compra.IdProveedor equals areas.IdAreas
                            where ExistAlm.NoPedidoG.Equals(No) && Compra.IdAsignacion.Equals(2) && Compra.EstatusPedido.Equals(1)
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
                                Tienda = Tienda.Nombre,
                                Localidad = Tienda.Localidad,
                                Direccion = Tienda.Direccion
                            };
            return Json(ExistAlmG, JsonRequestBehavior.AllowGet);
        }

        public int Guardar(CompraInterno AceptarPedido)
        {
            int Afectados = 0;
            //try
            //{
            long id = AceptarPedido.IdCompraInterno;
            if (id.Equals(0))
            {
                int nveces = InvBD.CompraInterno.Count();
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
                CompraInterno obj = InvBD.CompraInterno.Where(p => p.IdCompraInterno.Equals(id)).First();
                obj.NoPedido = AceptarPedido.NoPedido;
                obj.EstatusPedido = AceptarPedido.EstatusPedido;
                obj.Usuario = AceptarPedido.Usuario;
                InvBD.SubmitChanges();
                Afectados = 1;
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
                 && p.IdArticulo.Equals(DatosUsados.IdArticulo)
                 && p.Movimiento.Equals(DatosUsados.Movimiento)
                 && p.Fecha.Equals(DatosUsados.Fecha)
                  && p.Cantidad.Equals(DatosUsados.Cantidad)
                 && p.Fecha.Equals(DatosUsados.Fecha)
                 ).Count();
                if (nveces == 0)
                {
                    MovimientosTienda obj = InvBD.MovimientosTienda.Where(p => p.IdMovimiento.Equals(id)).First();
                    obj.IdExistencia = DatosUsados.IdExistencia;
                    obj.IdArticulo = DatosUsados.IdArticulo;
                    obj.Movimiento = DatosUsados.Movimiento;
                    obj.Movimiento = DatosUsados.Movimiento;
                    obj.Cantidad = DatosUsados.Cantidad;
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
                int nveces = InvBD.ExistenciaAlmacenG.Count();
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
                ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG.Equals(id)).First();
                obj.Observaciones = AceptarPedido.Observaciones;
                obj.TipoDeOperacion = AceptarPedido.TipoDeOperacion;
                obj.ExitenciaActual = AceptarPedido.ExitenciaActual;
                InvBD.SubmitChanges();
                Afectados = 1;
            }

            return Afectados;
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
                                         where ExistAlm.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && Compra.IdAsignacion.Equals(2) && Compra.IdSitio.Equals(Convert.ToInt32(IdTienda[1])) && (ExistAlm.ExitenciaActual > 0) && Compra.EstatusPedido.Equals(1)
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
            //try
            //{
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
            nregistradosAfectados = 1;
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
                                         where ExistAlm.IdArticulo.Equals(Convert.ToInt32(IdArticulo[0])) && Compra.IdAsignacion.Equals(2) && Compra.IdSitio.Equals(Convert.ToInt32(IdTienda[1])) && (ExistAlm.ExitenciaActual > 0) && Compra.EstatusPedido.Equals(1)
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
            com.IdAsignacion = 2;
            com.IdSitio = IdSitio;
            com.Sitio = Sitio;
            InvBD.MovimientosTienda.InsertOnSubmit(com);
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;
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
            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.ExitenciaActual = NExistencia;
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;
            return nregistradosAfectados;
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
                          where Compra.IdSitio.Equals(idS) && Compra.IdAsignacion.Equals(2) && Compra.EstatusPedido.Equals(1) && ExistAlm.ExitenciaActual > 0
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

        public JsonResult NuevaConsultaUsado(long Id)
        {

            string IdSitios = "";
            string IdCompraInternos = "";
            string IdArticulos = "";
            string Articulos = "";
            string NoPedidoGs = "";
            string IdExistenciaAlmacenG = "";
            string Stock = "";
            string NoPedido = "";
            string IdAsignacion = "";
            string IdTienda = "";
            string NomTienda = "";
            string IdArticulo = "";
            string NumeroPedido = "";
            string Fechas = "";
            string Nombre = "";
            var ConsultaUsado = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(Id))
                 .Select(p => new
                 {
                     IdSitio = p.IdSitio,
                     IdCompraInterno = p.IdCompraInterno

                 });
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
                    var ConsultaUsadoss = InvBD.ExistenciaAlmacenG.Where(p => p.IdExistenciaAlmacenG > (1)).OrderBy(p => p.IdCompraInterno)
                       .Select(p => new
                       {
                           pedido = p.Articulo,
                           asignacion = p.IdArticulo,
                           tiendas = p.ExitenciaActual,
                           IdArticulo = p.IdArticulo,
                           NumeroPedido = p.NoPedidoG,
                           Nombre = p.Articulo,
                           Fechas = p.ExitenciaInicial,
                           IdExistenciaAlmacenG = p.IdExistenciaAlmacenG,
                       });
                    int SumaStock = 0;
                    foreach (var numero in ConsultaUsadoss)
                    {
                        if (contador == 0)
                        {
                            tem1 = numero.pedido;
                            tem2 = (int)numero.asignacion;
                            NoPedido += numero.pedido + ",";
                            IdAsignacion += numero.asignacion + ",";
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
                            NomTienda += numero.tiendas + ",";
                            IdArticulo += numero.IdArticulo + ",";
                            NumeroPedido += numero.NumeroPedido + ",";
                            Fechas += numero.Fechas + ",";
                            Nombre += numero.Nombre + ",";
                            IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
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
                NoPedido += "0" + ",";
                IdAsignacion += "0" + ",";
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
                NomTienda = NomTienda.Substring(0, NomTienda.Length - 1),
                IdArticulo = IdArticulo.Substring(0, IdArticulo.Length - 1),
                NumeroPedido = NumeroPedido.Substring(0, NumeroPedido.Length - 1),
                Fechas = Fechas.Substring(0, Fechas.Length - 1),
                Nombre = Nombre.Substring(0, Nombre.Length - 1),
                IdExistenciaAlmacenG = IdExistenciaAlmacenG.Substring(0, IdExistenciaAlmacenG.Length - 1)
            };
            return Json(cons, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaArticulosUsadosMov(long IDTienda)
        {

            string IdSitios = "";
            string IdCompraInternos = "";
            string IdArticulos = "";
            string Articulos = "";
            string NoPedidoGs = "";
            string IdExistenciaAlmacenG = "";
            string Stock = "";
            var ConsultaUsado = InvBD.CompraInterno.Where(p => p.IdSitio.Equals(IDTienda))
                 .Select(p => new
                 {
                     IdSitio = p.IdSitio,
                     IdCompraInterno = p.IdCompraInterno

                 });
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
                            IdExistenciaAlmacenG += usado.idIdExistenciaAlmacenG + ",";
                            int UltimoReg = ConsultaUsadoss.Count() - 1;
                            int cont = 0;
                            foreach (var comparacion in ConsultaUsadoss)
                            {
                                SumaStock = (int)(SumaStock + comparacion.StockActual);
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
        public JsonResult ConsultaStockArticuloUsadoSuper(string DatosArticulos)
        {
            string[] Articulos = DatosArticulos.Split(',');
            string[] Articulos2 = DatosArticulos.Split('/');
            int consulta = 0;
            for (int i = 0; i < Articulos.GetLength(0); i++)
            {
                string[] IdArticulo = Articulos[i].Split(':');
                string[] IdTienda = Articulos[i].Split('/');
                string[] Cantidad = Articulos2[i].Split(':');
                int resultado = 0;
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
            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.ExitenciaActual = NExistencia;
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;
            return nregistradosAfectados;
        }
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
            var Pedidos = from ExistAlm in InvBD.ExistenciaAlmacenG
                          join Compra in InvBD.CompraInterno
                      on ExistAlm.IdCompraInterno equals Compra.IdCompraInterno
                          join areas in InvBD.Areas
                      on Compra.IdProveedor equals areas.IdAreas
                          where Compra.IdSitio > 0 && Compra.EstatusPedido.Equals(1)
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
                        NumeroPedido += numero.Pedido + ",";
                        IdAsignacion += numero.IdAsignacion + ",";
                        IdTienda += numero.IdTienda + ",";
                        Nombre += numero.nombres + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                    }
                    if (numero.IdCompraInterno != tem1 || numero.Pedido != tem2)
                    {
                        NumeroPedido += numero.nombres + ",";
                        IdAsignacion += numero.IdAsignacion + ",";
                        IdTienda += numero.IdTienda + ",";
                        Nombre += numero.nombres + ",";
                        IdArticulo += numero.IdArticulo + ",";
                        Fechas += numero.FechaDeIngreso + ",";
                        IdExistenciaAlmacenG += numero.IdExistenciaAlmacenG + ",";
                        tem1 = (int)numero.IdCompraInterno;
                        tem2 = (int)numero.Pedido;
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
            ExistenciaAlmacenG mpag = InvBD.ExistenciaAlmacenG.Where(p => p.IdCompraInterno.Equals(ID) && p.IdArticulo.Equals(IDA)).First();
            mpag.ExitenciaActual = NExistencia;
            InvBD.SubmitChanges();
            nregistradosAfectados = 1;
            return nregistradosAfectados;
        }
        ////---------------------------Visualizar Pedidos-----------------------------------------------
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

            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1) && p.IdSitio.Equals(IDTienda) && p.IdAsignacion.Equals(2)).OrderByDescending(p => p.IdPedidosInternos)
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
        //-----------------Visualizar pedidos realizados--------
        //Consulta de la función desplegar una sola vez los articulos repetidos por el Id de compraInterna en TiendasSupervisi+on y TiendasLider
        public JsonResult ConsultaArtPedidos(long idCompraInt, long idS)
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
            var Pedidos = InvBD.PedidosInternos.Where(p => IdSitio.Equals(idS))
               .Select(p => new
               {
                   NumeroPedido = p.NumeroPedido,
                   IdAsignacion = p.IdAsignacion,
                   //Idtienda = p.IdCompraInterno,
                   IdSitio = p.IdSitio,
                   tiendas = p.Sitio,
                   IdArticulo = p.IdArticulo,
                   Nombre = p.Articulo,
                   Articulo = p.Articulo,
                   Fechas = p.Fecha,
                   stockActual = p.CantidadSolicitada,
                   //IdExistenciaAlmacenG = p.IdExistenciaAlmacenG,


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
                    var consultaFecha = Pedidos.Where(p => p.IdArticulo.Equals(numero.IdArticulo) && p.stockActual > 0 && p.IdAsignacion.Equals(2) && p.IdSitio.Equals(idS)).OrderBy(p => p.IdArticulo)
             .Select(p => new
             {
                 fechaIngreso = p.Fechas,
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
                        Fechas += numero.Fechas + ",";
                        Nombre += numero.Nombre + ",";
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
                        Fechas += numero.Fechas + ",";
                        Nombre += numero.Nombre + ",";
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
                Nombre = Nombre.Substring(0, Nombre.Length - 1)
            };

            return Json(consulta, JsonRequestBehavior.AllowGet);
        }
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
            var Pedidos = InvBD.PedidosInternos.Where(p => p.Estatus.Equals(1) && p.NumeroPedido.Equals(idCompraInt) && p.IdSitio.Equals(idS) && p.IdAsignacion.Equals(2)).OrderBy(p => p.IdPedidosInternos)
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
                          where Compra.IdSitio.Equals(idS) && ExistAlm.IdCompraInterno.Equals(IdCompInt) && Compra.IdAsignacion.Equals(2) && Compra.EstatusPedido.Equals(1) && ExistAlm.ExitenciaActual >= 0
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
        public ActionResult PedidosTienda()
        {
            return View();
        }
        public ActionResult AceptarPedidos()
        {
            return View();
        }
    }
}




