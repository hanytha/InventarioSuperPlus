﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ExistenciaAlmacenController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: ExistenciaAlmacen
        public ActionResult ExistenciaAlmacen()
        {
            return View();
        }
        public JsonResult ConsultaExistenciaAlmacenes()
        {
            var Almacenes = InvBD.ExistenciaAlmacenG.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.IdExistencias,
                    p.NoPedido,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeOperacion,
                });
            return Json(Almacenes, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaExistenciaAlmacen(long Id)
        {
            var almacen = InvBD.ExistenciaAlmacenG.Where(p => p.Id.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.IdExistencias,
                    p.NoPedido,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeOperacion,

                });
            return Json(almacen, JsonRequestBehavior.AllowGet);
        }
        //Guardar los datos de la compra
        public int GuardarAlmacen(ExistenciaAlmacenG DatosAlmacen)
        {
            int Afectados = 0;
            //try
            //{
            long id = DatosAlmacen.Id;
            if (id.Equals(0))
            {
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido)).Count();

                // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                if (nveces == 0)
                {
                    InvBD.ExistenciaAlmacenG.InsertOnSubmit(DatosAlmacen);
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
                int nveces = InvBD.ExistenciaAlmacenG.Where(p => p.NoPedido.Equals(DatosAlmacen.NoPedido) && p.ExitenciaInicial.Equals(DatosAlmacen.ExitenciaInicial) && p.ExitenciaActual.Equals(DatosAlmacen.ExitenciaActual) && p.Coste.Equals(DatosAlmacen.Coste)).Count();
                if (nveces == 0)
                {
                    ExistenciaAlmacenG obj = InvBD.ExistenciaAlmacenG.Where(p => p.Id.Equals(id)).First();
                    obj.NoPedido = DatosAlmacen.NoPedido;
                    obj.ExitenciaInicial = DatosAlmacen.ExitenciaInicial;
                    obj.ExitenciaActual = DatosAlmacen.ExitenciaActual;
                    obj.Coste = DatosAlmacen.Coste;

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
        public int EliminarAlmacen(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                ExistenciaAlmacenG almacenG = InvBD.ExistenciaAlmacenG.Where(p => p.Id.Equals(Id)).First();
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
    }
}