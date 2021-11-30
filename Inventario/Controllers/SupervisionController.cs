
using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Inventario.Controllers
{

    public class SupervisionController : Controller
    {
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
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

                    // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
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
                    int nveces = InvBD.Supervision.Where(p => p.TipoSupervicion.Equals(DatosSupervicion.TipoSupervicion) && p.nombreUsuario.Equals(DatosSupervicion.nombreUsuario) && p.Tienda.Equals(DatosSupervicion.Tienda)).Count();
                    if (nveces == 0)
                    {
                        Supervision obj = InvBD.Supervision.Where(p => p.IdSupervision.Equals(id)).First();
                        obj.TipoSupervicion = DatosSupervicion.TipoSupervicion;
                        obj.Tienda = DatosSupervicion.Tienda;
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

public ActionResult SucursalesSupervision()
        {
            return View();
        }
        public int CargarSucursalesXSupervision()
        {
            int Encontrados = 0;
            string[] Sucursales = Accesos.Tiendas.Split('#');
            TiendasSupervision.IdTienda = new List<long>();

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
                TiendasSupervision.IdTienda.Add(Tienda.IdTienda);
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


     
    }
}