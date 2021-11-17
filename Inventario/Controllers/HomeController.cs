using System;
using System.Collections.Generic;
using System.Web.Mvc;
using System.Xml;
using Inventario.Models;

namespace Inventario.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Home()
        {
            //return View();
            if (TempData["employeeData"] == null)
            {
                ViewBag.ShowList = false;
                return View();
            }
            else
            {
                List<UsersVM> empList = (List<UsersVM>)TempData["employeeData"];
                ViewBag.ShowList = true;
                return View(empList);
            }
        }
        [HttpPost]
        public ActionResult UploadXML()
        {
            try
            {
                List<UsersVM> empList = new List<UsersVM>();
                var xmlFile = Request.Files[0];
                if (xmlFile != null && xmlFile.ContentLength > 0)
                {
                    XmlDocument xmlDocument = new XmlDocument();
                    xmlDocument.Load(xmlFile.InputStream);
                    XmlNodeList empNodes = xmlDocument.SelectNodes("Employee/emp");
                    foreach (XmlNode emp in empNodes)
                    {
                        empList.Add(new UsersVM()
                        {
                            Id = Convert.ToInt32(emp["id"].InnerText),
                            Name = emp["name"].InnerText,
                            Gender = emp["gender"].InnerText,
                            Mobile = emp["mobile"].InnerText
                        });
                    }
                    TempData["employeeData"] = empList;
                }
                return RedirectToAction("Home");
            }
            catch (Exception ex)
            {
                return RedirectToAction("Home");
            }
        }
    }
}