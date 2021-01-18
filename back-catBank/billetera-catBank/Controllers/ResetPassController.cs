using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading;
using AngularMVCProject.Models;
using System.Web.Http.Cors;

namespace AngularMVCProject.Controllers
{
    [AllowAnonymous]
    [RoutePrefix("api/startReset")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ResetPassController : ApiController
    {
        [HttpGet]
        [Route("echoping")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult EchoPing()
        {
            return Ok(true);
        }

        [HttpPost]
        [Route("startRecovery")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult startRecovery(Recovery recovery)
        {
            if (recovery == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            GestorRecovery saveToken = new GestorRecovery();
            bool checkMail = saveToken.StartRecovery(recovery);
            if (checkMail)
            {
                System.Diagnostics.Debug.WriteLine("mail checkeado");
                    return Ok("Mail verificado");
            } else
            {
                return Unauthorized();
            }
        }

        [HttpPost]
        [Route("resetPass")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult resetPass(NewPass newPass)
        {
            if (newPass == null)
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            GestorRecovery resetPass = new GestorRecovery();
            bool changePass = resetPass.Recovery(newPass);
            if (changePass)
            {
                System.Diagnostics.Debug.WriteLine("cambió el pass");
                return Ok("Contraseña modificada");
            }
            else
            {
                return Unauthorized();
            }
        }



        //    if (login == null)
        //        throw new HttpResponseException(HttpStatusCode.BadRequest);

        //    GestorLogin gLogin = new GestorLogin();
        //    Console.WriteLine("loguado");

        //    bool isCredentialValid = gLogin.ValidarLogin(login);

        //    if (isCredentialValid)
        //    {
        //        Console.WriteLine("es válido");
        //        var token = TokenGenerator.GenerateTokenJwt(login.Username);
        //        return Ok(token);
        //    }
        //    else
        //    {
        //        Console.WriteLine("no es válido");
        //        return Unauthorized();
        //    }

    }
}