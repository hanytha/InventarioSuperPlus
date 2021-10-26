using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class SupervisorController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: Departamentos
        public ActionResult Supervisor()
        {
            return View();
        }
        //
        //
        //consulta general
        public JsonResult ConsultaSupervisores()
        {
            var supervisores = InvBD.Supervisor.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdSupervisor,
                    p.Nombre,
                    p.ApellidoP,
                    p.ApellidoM,
                    p.Telefono,
                    p.Correo,
                    p.IdSupervision,
                    p.TipoSupervision
                });
            return Json(supervisores, JsonRequestBehavior.AllowGet);
        }

        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaSupervisor(long Id)
        {
            var supervisor = InvBD.Supervisor.Where(p => p.IdSupervisor.Equals(Id) && p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdSupervisor,
                    p.Nombre,
                    p.ApellidoP,
                    p.ApellidoM,
                    p.Telefono,
                    p.Correo,
                    p.IdSupervision,
                    p.TipoSupervision
                });
            return Json(supervisor, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarSupervisor(Supervisor DatosSupervisor)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosSupervisor.IdSupervisor;
            if (id.Equals(0))
            {
                int nveces = InvBD.Supervisor.Where(p => p.Nombre.Equals(DatosSupervisor.Nombre)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.Supervisor.InsertOnSubmit(DatosSupervisor);
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
                int nveces = InvBD.Supervisor.Where(p => p.Nombre.Equals(DatosSupervisor.Nombre) && p.ApellidoP.Equals(DatosSupervisor.ApellidoP) && p.ApellidoM.Equals(DatosSupervisor.ApellidoM) && p.Telefono.Equals(DatosSupervisor.Telefono) && p.Correo.Equals(DatosSupervisor.Correo) && p.IdSupervision.Equals(DatosSupervisor.IdSupervision)).Count();
                if (nveces == 0)
                {
                    Supervisor obj = InvBD.Supervisor.Where(p => p.IdSupervisor.Equals(id)).First();
                    obj.Nombre = DatosSupervisor.Nombre;
                    obj.ApellidoP = DatosSupervisor.ApellidoP;
                    obj.ApellidoM = DatosSupervisor.ApellidoM;
                    obj.Telefono = DatosSupervisor.Telefono;
                    obj.Correo = DatosSupervisor.Correo;
                    obj.IdSupervision = DatosSupervisor.IdSupervision;
                    obj.TipoSupervision = DatosSupervisor.TipoSupervision;
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
        public int EliminarSupervisor(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Supervisor super = InvBD.Supervisor.Where(p => p.IdSupervisor.Equals(Id)).First();
                super.Estatus = 0;//Cambia el estatus en 0
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

