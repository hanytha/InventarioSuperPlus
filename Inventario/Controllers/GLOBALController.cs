using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Inventario.Models;

namespace Inventario.Controllers
{
    public class GLOBALController : Controller
    {
        //DCISPlusDataContext InvBD = new DCISPlusDataContext();
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        //Consulta de las áreas activas(1)
        // GET: GLOBAL
        public JsonResult BDAreas()
        {
            var datos = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdAreas,
                    p.Nombre,
                    p.UNombre,
                    p.Correo,
                    p.Telefono,
                    p.Carpeta
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta SubAreas
        public JsonResult BDSubAreas(long IDA)
        {
            // Consulta de todas las subareas activas que pertenezcan a dicha area para mostrarlo en el combo dependiendo de la área que se seleccione
            var datos = InvBD.SubAreas.Where(p => p.Estatus.Equals(1) && p.IdArea.Equals(IDA))
                .Select(p => new
                {
                    ID = p.IdSubAreas,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Estados
        public void BDEstados()
        {

            Estados estado = new Estados();//inicializar
            Estados.idEstado = new List<int>();
            Estados.nombre = new List<string>();

            var datos = InvBD.estados.Where(p => p.activo.Equals(1))
                .Select(p => new
                {
                    ID = p.id,
                    Nombre = p.nombre
                });
            foreach (var edos in datos)
            {
                Estados.idEstado.Add(edos.ID);
                Estados.nombre.Add(edos.Nombre);
            }

        }


        public JsonResult BDTienda()
        {
            var datos = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdTienda,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDPagina()
        {
            var datos = InvBD.Pagina.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdPagina,
                    Descripcion = p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDProveedor()
        {
            var datos = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdProveedores,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDProveedorExist()
        {
            var datos = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdAreas,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDArtEx(int IDP)
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1) && p.IdAreas.Equals(IDP))
                .Select(p => new
                {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            return Json(datos, JsonRequestBehavior.AllowGet);

        }

        //consulta Municipio
        public JsonResult BDMunicipio(int IDE)
        {
            var datos = InvBD.municipios.Where(p => p.activo.Equals(1) && p.estado_id.Equals(IDE))
                .Select(p => new
                {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Localidades
        public JsonResult BDLocalidades(int IDM)
        {
            var datos = InvBD.localidades.Where(p => p.activo.Equals(1) && p.municipio_id.Equals(IDM))
                .Select(p => new
                {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }


        //consulta Tiendas
        public JsonResult BDTiendas()
        {
            var datos = InvBD.Tienda.Where(p => p.Estado.Equals(1))

                .Select(p => new
                {
                    ID = p.IdTienda,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        //consulta Tiendas
        public JsonResult BDUnidadesMedida()
        {
            var datos = InvBD.UnidadDeMedida.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdUnidadDeMedida,
                    Nombre = p.Unidad
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Supervición
        public JsonResult BDSupervicion()
        {
            var datos = InvBD.Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdSupervision,
                    Nombre = p.TipoSupervicion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }



        public JsonResult BDArticulos()
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDArticulosxNombreEmpresa()
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta Tiendas
        public JsonResult BDImpuesto()
        {
            var datos = InvBD.Impuesto.Where(p => p.Estatus.Equals(1))
                .Select(p => new {

                    ID = p.IdImpuesto,
                    Nombre = p.Impuestos

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }



        //consulta Estados
        public JsonResult BDEstado()
        {
            var datos = InvBD.estados.Where(p => p.activo.Equals(1))
                .Select(p => new {
                    ID = p.id,
                    Nombre = p.nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDSupervisor()
        {
            var datos = InvBD.Supervisor.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdSupervisor,
                    Nombre = p.Nombre

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDCategorias()
        {
            var datos = InvBD.Categorias.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdCategorias,
                    Nombre = p.Tipo

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDCompras()
        {
            var datos = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdCompra,
                    Nombre = p.NoCompra

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDMarcas()

        {
            var datos = InvBD.Marca.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdMarca,
                    Nombre = p.Nombre

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDTMovimientos()

        {
            var datos = InvBD.TipoDeMovimientos.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdMovimientos,
                    Nombre = p.TipoDeMovimiento

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta 
        public JsonResult BDCompra()

        {
            var datos = InvBD.Compra.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdCompra,
                    Nombre = p.MetodoDePago

                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }


        public JsonResult BDPaginas()
        {
            // Consulta de todas las paginas activas
            var datos = InvBD.Pagina.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdPagina,
                    Nombre = p.Descripcion
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        public JsonResult BDPerfiles(long IDPAG)
        {
            // Consulta de todas los paginas activas que pertenezcan a dicho perfil para mostrar la pagina dependiendo del perfil al que pertenezca
            var datos = InvBD.PerfilDeUsuario.Where(p => p.Estatus.Equals(1) && p.IdPagina.Equals(IDPAG))
                .Select(p => new
                {
                    ID = p.IdPerfilDeUsuario,
                    Nombre = p.Perfil
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //consulta los Usuarios activos, recibe el usuario y la contraseña y los compara para poder acceder
        public JsonResult BDUsuarios(long Usuario, long Password)
        {
            var datos = InvBD.Usuarios.Where(p => p.Estatus.Equals(1) && p.Usuario.Equals(Usuario) && p.Password.Equals(Password))
                .Select(p => new {
                    ID = p.IdUsuarios,
                    p.Usuario,
                    p.Password,
                    p.IdPerfil,
                    p.LvlPerfil
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        //Consulta (combo de proveedores en SucursalesSupervisión)
        public JsonResult BDPro()
        {
            var datos = InvBD.Proveedores.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdProveedores,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BDProv()
        {
            var datos = InvBD.Proveedores.Where(p => p.Nombre.Equals("Almacén General") && p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdProveedores,
                    Nombre = p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BDArt(int IDP)
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1) && p.IdProveedor.Equals(IDP))
                .Select(p => new
                {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            return Json(datos, JsonRequestBehavior.AllowGet);

        }

    
        public JsonResult BDUnidadM(int IDAR)
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1) && p.IdArticulos.Equals(IDAR))
                .Select(p => new
                {
                    ID = p.IdUnidadDeMedida,
                    Nombre = p.Unidad
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BDMarca(int IDART)
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1) && p.IdArticulos.Equals(IDART))
                .Select(p => new
                {
                    ID = p.IdMarca,
                    Nombre = p.Marca
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
     
        public JsonResult BDArticulosEmpresa()
        {
            var datos = InvBD.Articulos.Where(p => p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }

        //Consulta para obtener todas las superviciones  al seleccionar la opcion 2(Tienda) en Usuarios
        public JsonResult BDSupervision()
        {
            var DatosSupervisiones = InvBD.Supervision.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdSupervision,
                    Nombre = p.TipoSupervicion
                });
            return Json(DatosSupervisiones, JsonRequestBehavior.AllowGet);
        }

        //Consulta para el combo de proveedores en pedidosInternos-sucursalesSupervision
        public JsonResult Areas()
        {
            var DatosDepartamento = InvBD.Areas.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdAreas,
                    Nombre = p.Nombre
                });
            return Json(DatosDepartamento, JsonRequestBehavior.AllowGet);
        }

        //Consulta para obtener todas las tiendas al seleccionar la opcion 1(Tienda) en Usuarios
        public JsonResult BDTiendaSuper()
        {
            var datos = InvBD.Tienda.Where(p => p.Estatus.Equals(1))
                .Select(p => new
                {
                    ID = p.IdTienda,
                    p.Nombre
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
        public JsonResult BDArtProvAlm()
        {
            var datos = InvBD.Articulos.Where(p => p.Proveedor.Equals("Almacén General") && p.Estatus.Equals(1))
                .Select(p => new {
                    ID = p.IdArticulos,
                    Nombre = p.NombreEmpresa
                });
            return Json(datos, JsonRequestBehavior.AllowGet);
        }
    }
}






