using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ConfiguracionController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Configuracion
        public ActionResult Configuracion()
        {
            return View();
        }
        public JsonResult ConsultaConfiguraciones()
        {
            var configuraciones = InvBD.Configuracion.Where(p => p.Estatus.Equals(1))
              .Select(p => new
                {
                    p.RFC,
                    p.NombreEmpresa,
                    p.Vision,
                    p.Mision,
                    p.Valores,
                    p.Direccion,
                    p.Telefono,
                    p.DireccionHost,
                    p.Puerto,
                    p.Logo,
                    p.LogoTexto,
                    p.SesionAbierta,
                    p.SerCorreo,
                    p.SerCorreoPort,
                    p.SerCorreoUser,
                    p.SerCorreoPass,
                    p.DirWeb,
                    p.Tipo,
                    p.Dato2,
                    p.Dato3,
                    p.Dato4
                });
            return Json(configuraciones, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaConfiguracion(long Id)
        {
            var configuracion = InvBD.Configuracion.Where(p => p.IdConfiguracion.Equals(Id))
                  .Select(p => new
                {
                      p.RFC,
                      p.NombreEmpresa,
                      p.Vision,
                      p.Mision,
                      p.Valores,
                      p.Direccion,
                      p.Telefono,
                      p.DireccionHost,
                      p.Puerto,
                      p.Logo,
                      p.LogoTexto,
                      p.SesionAbierta,
                      p.SerCorreo,
                      p.SerCorreoPort,
                      p.SerCorreoUser,
                      p.SerCorreoPass,
                      p.DirWeb,
                      p.Tipo,
                      p.Dato2,
                      p.Dato3,
                      p.Dato4
                  });
            return Json(configuracion, JsonRequestBehavior.AllowGet);
        }
        public int GuardarConfiguracion(Configuracion DatosConfiguracion)
        {
            int Afectados = 0;
            try
            {
                long id = DatosConfiguracion.IdConfiguracion;
                if (id.Equals(0))
                {
                    int nveces = InvBD.Configuracion.Where(p => p.RFC.Equals(DatosConfiguracion.RFC) && p.NombreEmpresa.Equals(DatosConfiguracion.NombreEmpresa) && p.Mision.Equals(DatosConfiguracion.Mision) && p.Vision.Equals(DatosConfiguracion.Vision) && p.Valores.Equals(DatosConfiguracion.Valores) && p.Direccion.Equals(DatosConfiguracion.Direccion) && p.Telefono.Equals(DatosConfiguracion.Telefono) && p.DireccionHost.Equals(DatosConfiguracion.DireccionHost) && p.Puerto.Equals(DatosConfiguracion.Puerto) && p.Logo.Equals(DatosConfiguracion.Logo) && p.LogoTexto.Equals(DatosConfiguracion.LogoTexto) && p.SesionAbierta.Equals(DatosConfiguracion.SesionAbierta) && p.SerCorreo.Equals(DatosConfiguracion.SerCorreo) && p.SerCorreoPort.Equals(DatosConfiguracion.SerCorreoPort) && p.SerCorreoPass. Equals(DatosConfiguracion.SerCorreoPass) && p.DirWeb.Equals(DatosConfiguracion.DirWeb) && p.DirWeb.Equals(DatosConfiguracion.DirWeb) && p.Tipo.Equals(DatosConfiguracion.Tipo) && p.Dato2.Equals(DatosConfiguracion.Dato2) && p.Dato3.Equals(DatosConfiguracion.Dato3) && p.Dato4.Equals(DatosConfiguracion.Dato4)).Count();
                    if (nveces == 0)
                    {
                        InvBD.Configuracion.InsertOnSubmit(DatosConfiguracion);
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
                    int nveces = InvBD.Configuracion.Where(p => p.RFC.Equals(DatosConfiguracion.RFC) && p.NombreEmpresa.Equals(DatosConfiguracion.NombreEmpresa) && p.Mision.Equals(DatosConfiguracion.Mision) && p.Vision.Equals(DatosConfiguracion.Vision) && p.Valores.Equals(DatosConfiguracion.Valores) && p.Direccion.Equals(DatosConfiguracion.Direccion) && p.Telefono.Equals(DatosConfiguracion.Telefono) && p.DireccionHost.Equals(DatosConfiguracion.DireccionHost) && p.Puerto.Equals(DatosConfiguracion.Puerto) && p.Logo.Equals(DatosConfiguracion.Logo) && p.LogoTexto.Equals(DatosConfiguracion.LogoTexto) && p.SesionAbierta.Equals(DatosConfiguracion.SesionAbierta) && p.SerCorreo.Equals(DatosConfiguracion.SerCorreo) && p.SerCorreoPort.Equals(DatosConfiguracion.SerCorreoPort) && p.SerCorreoPass.Equals(DatosConfiguracion.SerCorreoPass) && p.DirWeb.Equals(DatosConfiguracion.DirWeb) && p.DirWeb.Equals(DatosConfiguracion.DirWeb) && p.Tipo.Equals(DatosConfiguracion.Tipo) && p.Dato2.Equals(DatosConfiguracion.Dato2) && p.Dato3.Equals(DatosConfiguracion.Dato3) && p.Dato4.Equals(DatosConfiguracion.Dato4)).Count();
                    if (nveces == 0)
                    {
                        Configuracion obj = InvBD.Configuracion.Where(p => p.IdConfiguracion.Equals(id)).First();
               
                        obj.RFC = DatosConfiguracion.RFC;
                        obj.NombreEmpresa = DatosConfiguracion.NombreEmpresa;
                        //obj.Id = DatosConfiguraciones.Id;
                        obj.Vision = DatosConfiguracion.Vision;
                        obj.Mision = DatosConfiguracion.Mision;
                        obj.Valores = DatosConfiguracion.Valores;
                        obj.Direccion = DatosConfiguracion.Direccion;
                        obj.Telefono = DatosConfiguracion.Telefono;
                        obj.DireccionHost = DatosConfiguracion.DireccionHost;
                        obj.Puerto = DatosConfiguracion.Puerto;
                        obj.Logo = DatosConfiguracion.Logo;
                        obj.LogoTexto = DatosConfiguracion.LogoTexto;
                        obj.SesionAbierta = DatosConfiguracion.SesionAbierta;
                        obj.SerCorreo = DatosConfiguracion.SerCorreo;
                        obj.SerCorreoPort = DatosConfiguracion.SerCorreoPort;
                        obj.SerCorreoUser = DatosConfiguracion.SerCorreoUser;
                        obj.SerCorreoPass = DatosConfiguracion.SerCorreoPass;
                        obj.DirWeb = DatosConfiguracion.DirWeb;
                        obj.Tipo = DatosConfiguracion.Tipo;
                        obj.Dato2 = DatosConfiguracion.Dato2;
                        obj.Dato3 = DatosConfiguracion.Dato3;
                        obj.Dato4 = DatosConfiguracion.Dato4;
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


        public int EliminarProveedor(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Configuracion Prvdr = InvBD.Configuracion.Where(p => p.IdConfiguracion.Equals(Id)).First();
                Prvdr.Estatus = 0;//Cambia el estatus en 0
                InvBD.SubmitChanges();//Guarda los datos en la Base de datos
                nregistradosAfectados = 1;//Se pudo realizar
            }
            catch (Exception ex)
            {
                nregistradosAfectados = 0;
            }
            return nregistradosAfectados;
        }
    }

}
