using AngularMVCProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AngularMVCProject.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/cuenta")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class cuentaController : ApiController
    {
        [HttpPost]
        [Route("activarCuenta")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult ActivarCuenta(activarCuenta activarCuenta)
        {
            GestorCuenta activacion = new GestorCuenta();
            bool activada = activacion.ActivarCuenta(activarCuenta);
            System.Diagnostics.Debug.WriteLine("activo la cuenta");
            return Ok("cuenta activada");
        }
    }
}
