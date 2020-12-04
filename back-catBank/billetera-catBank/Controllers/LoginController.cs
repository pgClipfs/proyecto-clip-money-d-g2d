using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using AngularMVCProject.Models;
using System.Web.Http.Cors;

namespace AngularMVCProject.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/login")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class LoginController : ApiController
    {
        [HttpGet]
        [Route("echoping")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpGet]
        [Route("echouser")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult EchoUser()
        {
            var identity = Thread.CurrentPrincipal.Identity;
            return Ok($" IPrincipal-user: {identity.Name} - IsAuthenticated: {identity.IsAuthenticated}");
        }

        [HttpPost]
        [Route("authenticate")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Authenticate(LoginRequest login)
        {
            if (login == null) 
                throw new HttpResponseException(HttpStatusCode.BadRequest);

            GestorLogin gLogin = new GestorLogin();
            Console.WriteLine("loguado");

            bool isCredentialValid = gLogin.ValidarLogin(login);

            if (isCredentialValid)
            {
                Console.WriteLine("es válido");
                var token = TokenGenerator.GenerateTokenJwt(login.Username);
                return Ok(token);
            }
            else
            {
                Console.WriteLine("no es válido");
                return Unauthorized();
            }
        }
    }
}
