using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class BonificacionesController : Controller
    {
        //conexion con DB
        InventarioBDDataContext InvBD = new InventarioBDDataContext();
        // GET: Bonificaciones
        public ActionResult Bonificaciones()
        {
            return View();
        }
<<<<<<< HEAD

=======
    
>>>>>>> alma
    }
}