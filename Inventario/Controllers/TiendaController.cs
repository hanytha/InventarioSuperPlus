using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class TiendaController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Tienda
        public ActionResult Tienda()
        {
            return View();
        }
        public JsonResult ConsultaTiendas()
        {
            var tiendas = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.IdSupervisor,
                    p.IdSupervision,
                    p.NombreS,
                    p.Unombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.IdEstados,
                    p.Estado,
                    p.IdMunicipios,
                    p.Municipios,
                    p.IdLocalidades,
                    p.Localidades,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.Latitud,
                    p.Longitud,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus,

                });
            return Json(tiendas, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaTienda()
        {
            var tienda = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdTienda,
                    p.Nombre,
                    p.IdSupervisor,
                    p.IdSupervision,
                    p.NombreS,
                    p.Unombre,
                    p.LNombre,
                    p.E1Nombre,
                    p.E2Nombre,
                    p.E3Nombre,
                    p.A1Nombre,
                    p.A2Nombre,
                    p.A3Nombre,
                    p.IdEstados,
                    p.Estado,
                    p.IdMunicipios,
                    p.Municipios,
                    p.IdLocalidades,
                    p.Localidades,
                    p.Calle,
                    p.CP,
                    p.Telefono,
                    p.Latitud,
                    p.Longitud,
                    p.HApertura,
                    p.HCierre,
                    p.Estatus,
                });
            return Json(tienda, JsonRequestBehavior.AllowGet);
        }
     /*
        //Guardar los datos de la compra
        public int GuardarTienda(Tienda DatosTienda)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosTienda.IdTienda;
            if (id.Equals(0))
            {
                int nveces = InvBD.Tienda.Where(p => p.Nombre.Equals(DatosTienda.Nombre)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Tienda.InsertOnSubmit(DatosTienda);
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
                int nveces = InvBD.Tienda.Where(p => p.Nombre.Equals(DatosTienda.Nombre) 
                && p.NombreS.Equals(DatosTienda.NombreS)
                && p.Unombre.Equals(DatosTienda.Unombre) 
                && p.LNombre.Equals(DatosTienda.LNombre)
                && p.E1Nombre.Equals(DatosTienda.E1Nombre)
                && p.E2Nombre.Equals(DatosTienda.E2Nombre) 
                && p.E3Nombre.Equals(DatosTienda.E3Nombre) 
                && p.A1Nombre.Equals(DatosTienda.A1Nombre) 
                && p.A2Nombre.Equals(DatosTienda.A2Nombre) 
                && p.A3Nombre.Equals(DatosTienda.A3Nombre)
                && p.IdEstados.Equals(DatosTienda.IdEstado)
                && p.IdMunicipio.Equals(DatosTienda.IdMunicipio)
                && p.IdLocalidad.Equals(DatosTienda.IdLocalidad)




                && p.CorreoE3.Equals(DatosTienda.CorreoE3)).Count();


                if (nveces == 0)
                {
                    SubAreas obj = InvBD.SubAreas.Where(p => p.IdSubAreas.Equals(id)).First();
                    obj.Nombre = DatosSub.Nombre;
                    obj.IdArea = DatosSub.IdArea;
                    obj.Area = DatosSub.Area;
                    obj.NoSubArea = DatosSub.NoSubArea;
                    obj.NEncargado1 = DatosSub.NEncargado1;
                    obj.TelefonoE1 = DatosSub.TelefonoE1;
                    obj.CorreoE1 = DatosSub.CorreoE1;
                    obj.NEncargado2 = DatosSub.NEncargado2;
                    obj.TelefonoE2 = DatosSub.TelefonoE2;
                    obj.CorreoE2 = DatosSub.CorreoE2;
                    obj.NEncargado3 = DatosSub.NEncargado3;
                    obj.TelefonoE3 = DatosSub.TelefonoE3;
                    obj.CorreoE3 = DatosSub.CorreoE3;


                    InvBD.SubmitChanges();
                    Afectados = 1;
                }
                else
                {
                    Afectados = -1;
                }
            }
            //}
            //catch (Exception ex)
            //{
            //    Afectados = 0;
            //}
            return Afectados;
        }



        //Eliminar Compra
        public int EliminarSubarea(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                SubAreas almacenG = InvBD.SubAreas.Where(p => p.IdSubAreas.Equals(Id)).First();
                almacenG.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
     */
    }
}