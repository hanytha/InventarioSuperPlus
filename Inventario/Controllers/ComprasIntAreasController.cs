using Inventario.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    //Lamar al método de seguridad
    [Seguridad]

    public class ComprasIntAreasController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();

        // GET: ComprasIntAreas
        public ActionResult ComprasIntAreas()
        {
            return View();
        }
    }
}