using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;
using AngularMVCProject.Models;
using System.Web.Http.Cors;
using System.Security.Claims;

namespace AngularMVCProject.Controllers
{

    [RoutePrefix("api/persona")]
    public class PersonaController : ApiController
    {
        //[Authorize]
        // GET: api/Persona
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IEnumerable<Persona> Get()
        {
            GestorPersonas gPersona = new GestorPersonas();
            return gPersona.ObtenerPersonas();
        }
        //[Route("user")]
        //[EnableCors(origins: "*", headers: "*", methods: "*")]
        //public Persona Get(string token)
        //{
        //    GestorPersonas gPersona = new GestorPersonas();
        //    return gPersona.getUserByUsername(token);
        //}
        [HttpGet]
        [Authorize]
        [Route("customer")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Customer(Token token)
        {
            if (token == null)
                throw new HttpResponseException(HttpStatusCode.Unauthorized);

            ClaimsIdentity claimsIdentity = User.Identity as ClaimsIdentity;

            var claims = claimsIdentity.Claims.FirstOrDefault(x => x.Type.Equals(ClaimTypes.Name)).Value;

            GestorPersonas gPersona = new GestorPersonas();
            bool getAuth = gPersona.getUserByUsername(token, claims);
            if (getAuth == true)
            {
                using (Models.dbEntityToken db = new Models.dbEntityToken())
                {
                    System.Diagnostics.Debug.WriteLine(token.Jwt + "es el token");
                    System.Diagnostics.Debug.WriteLine(claims);
                    var oUser = db.Clientes.Where(d => d.usuario == claims).FirstOrDefault();
                    if (oUser != null)
                    {

                        System.Diagnostics.Debug.WriteLine(oUser);
                    }
                    return Ok(oUser);
                }
            } else
            {
                return BadRequest();
            }
        }

        // POST: api/Persona
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public Persona Post(Persona persona)
        {
            int id;
            GestorPersonas gPersona = new GestorPersonas();
            id=  gPersona.AgregarPersona(persona);
            persona.Id = id;
            return persona;
        }

        // PUT: api/Persona
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Put(DatosAModificar modificar)
        {
            GestorPersonas gPersona = new GestorPersonas();
            gPersona.ModificarPersona(modificar);

        }

        // DELETE: api/Persona/5
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public void Delete(int id)
        {
            GestorPersonas gPersona = new GestorPersonas();
            gPersona.Eliminar(id);

        }
    }
}
