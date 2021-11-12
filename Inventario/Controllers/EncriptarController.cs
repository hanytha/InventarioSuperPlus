using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Inventario.Controllers
{
    public class EncriptarController : Controller
    {
        class program
        {
            static void Main(string[] args)
            {
                using (InventarioBDDataContext InvBD = new InventarioBDDataContext())
                {
                    Models.Encriptar Usuarios = new Models.Encriptar();
                    Usuarios.Usuario = "Usr";
123                    //InvBD.Usuarios.add(Usuarios);
                    //var Usuario =from d in InvBD;

                }
            }
        }


    }
}

