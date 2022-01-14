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

    public class VPedidosIntController : Controller
    {
        // GET: VPedidosInt
        public ActionResult VPedidosInt()
        {
            return View();
        }

    }
}