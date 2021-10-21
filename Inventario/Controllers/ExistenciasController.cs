﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ExistenciasController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Existencias
        public ActionResult Existencias()
        {
            return View();
        }
        public JsonResult ConsultaExistencias()
        {
            var existencia = InvBD.Existencia.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.IdExistencia,
                    p.IdArticulos,
                    p.NoCompra,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeExistencia,
                    p.Logo,
                    p.Estatus,
                });
            return Json(existencia, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaExistencia(long Id)
        {
            var existencia = InvBD.Existencia.Where(p => p.IdExistencia.Equals(Id))
                .Select(p => new
                {

                    p.IdExistencia,
                    p.IdArticulos,
                    p.NoCompra,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeExistencia,
                    p.Logo,
                    p.Estatus,

                });
            return Json(existencia, JsonRequestBehavior.AllowGet);
        }

        //Esta consulta se ocupa en abrirModal para cargar los registros según el id del registro encontrado para cargar los datos en el modal
        public JsonResult ConsultaExis(long Id)
        {
            var existencias = InvBD.Existencia.Where(p => p.IdExistencia.Equals(Id))
                .Select(p => new
                {
                    p.IdExistencia,
                    p.IdArticulos,
                    p.NoCompra,
                    p.FechaDeIngreso,
                    p.ExitenciaInicial,
                    p.FechaFinal,
                    p.ExitenciaActual,
                    p.Coste,
                    p.TipoDeExistencia,
                    p.Logo,
                    p.Estatus,
                    FOTOMOSTRAR = Convert.ToBase64String(p.Logo.ToArray()),

                });
            return Json(existencias, JsonRequestBehavior.AllowGet);
        }

        //Guardar los datos del proveedor
        public int GuardarExistencia(Existencia DatosExistencia, string cadF)
        {
            int Afectados = 0;
            try
            {
                long id = DatosExistencia.IdExistencia;

                if (id.Equals(0))
                {
                    //Guardar el proveedor cuando no exista uno con el mismo nombre en la base de datos
                    int nveces = InvBD.Existencia.Where(p => p.NoCompra.Equals(DatosExistencia.NoCompra)).Count();
                    // int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedor.Nombre) && p.Correo.Equals(DatosProveedor.Correo) && p.RazonSocial.Equals(DatosProveedor.RazonSocial) && p.ClaveInterbancaria.Equals(DatosProveedor.ClaveInterbancaria) && p.CodigoPostal.Equals(DatosProveedor.CodigoPostal) && p.RFC.Equals(DatosProveedor.RFC) && p.Direccion.Equals(DatosProveedor.Direccion) && p.Telefono.Equals(DatosProveedor.Telefono) && p.Banco.Equals(DatosProveedor.Banco) && p.NumeroDeCuenta.Equals(DatosProveedor.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedor.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedor.Nomenclatura)).Count();
                    if (nveces == 0)
                    {
                        DatosExistencia.Logo = Convert.FromBase64String(cadF);
                        InvBD.Existencia.InsertOnSubmit(DatosExistencia);
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
                    int nveces = InvBD.Existencia.Where(p => p.NoCompra.Equals(DatosExistencia.NoCompra) && p.ExitenciaInicial.Equals(DatosExistencia.ExitenciaInicial) && p.ExitenciaActual.Equals(DatosExistencia.ExitenciaActual) && p.Coste.Equals(DatosExistencia.Coste) && p.TipoDeExistencia.Equals(DatosExistencia.TipoDeExistencia) && p.Logo.Equals(DatosExistencia.Logo)).Count();
                    if (nveces == 0)
                    {
                        Existencia obj = InvBD.Existencia.Where(p => p.IdExistencia.Equals(id)).First();
                        obj.NoCompra = DatosExistencia.NoCompra;
                        obj.ExitenciaInicial = DatosExistencia.ExitenciaInicial;
                        obj.ExitenciaActual = DatosExistencia.ExitenciaActual;
                        obj.Coste = DatosExistencia.Coste;
                        obj.TipoDeExistencia = DatosExistencia.TipoDeExistencia;
                        obj.Logo = Convert.FromBase64String(cadF);
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

        public int EliminarExistencias(long Id)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Existencia existen = InvBD.Existencia.Where(p => p.IdExistencia.Equals(Id)).First();
                existen.Estatus = 0;//Cambia el estatus en 0
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