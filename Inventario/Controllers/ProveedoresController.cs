using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class ProveedoresController : Controller
    {//conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Proveedores
        public ActionResult Proveedores()
        {
            return View();
        }
        public JsonResult ConsultaProveedores()
        {//Consulta general
            var proveedores = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Correo,
                    p.GiroDelProveedor,
                    p.CuentaInterbancaria,
                    p.CodigoPostal,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.RFC,
                    p.Direccion,
                    p.Telefono,
                    p.Banco,
                    p.NumeroDeCuenta,
                    p.UsoCFDI,
                    p.Nomenclatura,
                    p.Descripcion,
                    p.Logo
                });
            return Json(proveedores, JsonRequestBehavior.AllowGet);
        }
        public JsonResult ConsultaProveedor(long Id)
        {//Consulta específico mediante ID
            var proveedor = InvBD.Proveedores.Where(p => p.Estatus.Equals(Id))
                .Select(p => new
                {
                    p.Id,
                    p.Nombre,
                    p.Correo,
                    p.GiroDelProveedor,
                    p.CuentaInterbancaria,
                    p.CodigoPostal,
                    p.Estado,
                    p.Municipio,
                    p.Localidad,
                    p.RFC,
                    p.Direccion,
                    p.Telefono,
                    p.Banco,
                    p.NumeroDeCuenta,
                    p.UsoCFDI,
                    p.Nomenclatura,
                    p.Descripcion,
                    p.Logo
                }); 
            return Json(proveedor, JsonRequestBehavior.AllowGet);
        }

        public int GuardarProveedor(Proveedores DatosProveedores)
        {
            int Afectados = 0;
            try
            {//Capturar el error(Try)
                long idProveedor = DatosProveedores.Id;
                //Valida el Id si es igual a 0, se crea un nuevo registro
                if (idProveedor.Equals(0))
                {
                    //Valida que no exista otro registro con los mismos datos
                    int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedores.Nombre) && p.Correo.Equals(DatosProveedores.Correo) && p.GiroDelProveedor.Equals(DatosProveedores.GiroDelProveedor) && p.CuentaInterbancaria.Equals(DatosProveedores.CuentaInterbancaria) && p.CodigoPostal.Equals(DatosProveedores.CodigoPostal) && p.RFC.Equals(DatosProveedores.RFC) && p.Direccion.Equals(DatosProveedores.Direccion) && p.Telefono.Equals(DatosProveedores.Telefono) && p.Banco.Equals(DatosProveedores.Banco) && p.NumeroDeCuenta.Equals(DatosProveedores.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedores.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedores.Nomenclatura)).Count();
                    if (nveces == 0)
                    {//mas de un registro
                        InvBD.Proveedores.InsertOnSubmit(DatosProveedores);//Insertar la informacion en la tabla
                        InvBD.SubmitChanges();//Validar que se deba guardar los cambios
                        Afectados = 1;//retornar un valor si se pudo o no guardar los registros
                    }
                    else
                    {
                        Afectados = -1;//Manda el mensaje de que se pudo guardar el mensaje
                    }
                }//si el valor es diferente a 0
                else
                {//Hace la comparacion y Solo se ejecuta cuando hay cambios
                    int nveces = InvBD.Proveedores.Where(p => p.Nombre.Equals(DatosProveedores.Nombre) && p.Id.Equals(DatosProveedores.Id) && p.Correo.Equals(DatosProveedores.Correo) && p.GiroDelProveedor.Equals(DatosProveedores.GiroDelProveedor) && p.CuentaInterbancaria.Equals(DatosProveedores.CuentaInterbancaria) && p.CodigoPostal.Equals(DatosProveedores.CodigoPostal) && p.RFC.Equals(DatosProveedores.RFC) && p.Direccion.Equals(DatosProveedores.Direccion) && p.Telefono.Equals(DatosProveedores.Telefono) && p.Banco.Equals(DatosProveedores.Banco) && p.NumeroDeCuenta.Equals(DatosProveedores.NumeroDeCuenta) && p.UsoCFDI.Equals(DatosProveedores.UsoCFDI) && p.Nomenclatura.Equals(DatosProveedores.Nomenclatura)).Count();
                    if (nveces == 0)
                    {//Realiza la consulta de los datos comparados y regresa solo el primer valor encontrado(first)
                        Proveedores obj = InvBD.Proveedores.Where(p => p.Id.Equals(idProveedor)).First();
                        //Se ponen todos los datos que se pueden modificar por el usuario, se toman los datos y se reemplazan
                        obj.Nombre = DatosProveedores.Nombre;
                        //obj.Id = DatosProveedores.Id;
                        obj.Correo = DatosProveedores.Correo;
                        obj.GiroDelProveedor = DatosProveedores.GiroDelProveedor;
                        obj.CuentaInterbancaria = DatosProveedores.CuentaInterbancaria;
                        obj.CodigoPostal = DatosProveedores.CodigoPostal;
                        obj.RFC = DatosProveedores.RFC;
                        obj.Direccion = DatosProveedores.Direccion;
                        obj.Telefono = DatosProveedores.Telefono;
                        obj.Banco = DatosProveedores.Banco;
                        obj.NumeroDeCuenta = DatosProveedores.NumeroDeCuenta;
                        obj.UsoCFDI = DatosProveedores.UsoCFDI;
                        obj.Nomenclatura = DatosProveedores.Nomenclatura;
                        obj.Descripcion = DatosProveedores.Descripcion;
                        obj.Logo = DatosProveedores.Logo;
                        InvBD.SubmitChanges();//Guardadr los cambios en la tabla
                        Afectados = 1;//Se pudo realizar los cambios
                    }
                    else
                    {
                        Afectados = -1;//Para marcar un error
                    }
                }
            }
            catch (Exception ex)
            {
                Afectados = 0;//No se pudo realizar ninguna cambio si es 0(en caso de un error)
            }
            return Afectados;
        }
        public int EliminarProveedor(long idProveedor)
        {
            int nregistradosAfectados = 0;
            try
            {//Consulta los datos y el primer Id que encuentra  lo compara
                Proveedores Prvdr = InvBD.Proveedores.Where(p => p.Id.Equals(idProveedor)).First();
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
