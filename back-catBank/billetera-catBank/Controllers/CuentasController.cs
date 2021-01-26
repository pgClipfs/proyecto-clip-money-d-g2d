using AngularMVCProject.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace AngularMVCProject.Controllers
{
    [RoutePrefix("api/cuentas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CuentasController : ApiController
    {
        // GET

        /*
         * Verifica saldo.
         * @Param id, id de la persona a comprobar saldo.
         * @return false si no tiene, true si tiene saldo.
         */
        [HttpGet]
        [Route("saldoisok")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult SaldoIsOk(int id)
        {
            GestorCuentas isOkSaldo = new GestorCuentas();
            if (isOkSaldo.SaldoIsOk(id))
            {
                return Ok();
            }
            return NotFound();
        }

        /*
        * Muestra el saldo actual, cbu, cvu, alias y las ultimas 10 operaciones de la cuenta de la persona.
        * @Param id, id de la persona que verá sus datos de la cuenta.
        * @return DatosOperaciones, devuelve el listado que se mencionó antes.
        */
        [HttpGet]
        [Route("mostrarsaldo")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public DatosOperaciones MostrarSaldo(int id)
        {
            GestorCuentas mostrar = new GestorCuentas();
            return mostrar.MostrarSaldo(id);
        }

        /*  
        *  Ingresa monto a la cuenta, lo suma y la actualiza. Solicitud incorrecta si el monto es negativo o 
        *  si el id es 0 o negativo.
        *  @Param operaciones, objeto OperacionesCuenta cuyas propiedades permiten operar sobre la cuenta.
        *  @return IHttpActionResult. Satisfactorio si se pudo realizar la operacion.
        */
        [HttpPut]
        [Route("ingresarsaldo")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult IngresarSaldo(OperacionesCuenta operaciones)
        {
            try
            {
                if (operaciones.Id <= 0)
                {
                    return BadRequest();
                }
                if (operaciones.Monto <= 0)
                {
                    return BadRequest();
                }
            }
            catch (Exception fail)
            {
                Debug.WriteLine(fail.Message);
            }

            GestorCuentas saldo = new GestorCuentas();
            string agregado = saldo.IngresarSaldo(operaciones);
            if (agregado.Equals("0"))
            {
                return BadRequest();
            }
            else
            {
                return Ok(agregado);
            }
            
        }

        /*
        *  Retira dinero de la cuenta. Se resta el saldo de la persona. Si el monto a retirar 
        *  es mayor al que se tiene devuelve solicitud incorrecta.
        *  @Param operaciones, objeto OperacionesCuenta cuyas propiedades permiten operar sobre la cuenta.
        *  @return IHttpActionResult, devuelve resultado satisfactorio si se pudo realizar. Caso contrario, es incorrecta la solicitud.
        *  @throw new Excepcion(), en caso de no poder retirar dinero de la cuenta.
        */
        [HttpPut]
        [Route("retirardinero")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult RetirarDinero(OperacionesCuenta operaciones)
        {
            if (operaciones.Id <= 0)
            {
                return BadRequest();
            }
            if (operaciones.Monto <= 0)
            {
                return BadRequest();
            }

            GestorCuentas saldoARetirar = new GestorCuentas();
            string retirado = saldoARetirar.RetirarDinero(operaciones);
            if (retirado.Equals("0"))
            {
                return BadRequest();
            } else
            {
                return Ok(retirado);
            }            
        }

        /*
         * Realiza transferencia en pesos entre dos cuentas.
         * @Param transferencia, detalles para poder efectuar la transferencia entre dos cuentas.
         * @return IHttpActionResult, devuelve resultado satisfactorio si se pudo realizar. Caso contrario, es incorrecta la solicitud.
        */
        [HttpPut]
        [Route("transferencia")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult TransferirDinero(Transferencia transferencia)
        {
            if (transferencia.Id <= 0)
            {
                return BadRequest();
            }
            if (transferencia.Monto <= 0)
            {
                return BadRequest();
            }

            GestorCuentas saldoARetirar = new GestorCuentas();
            string retirado = saldoARetirar.TransferirDinero(transferencia);
            if (retirado.Equals("0"))
            {
                return BadRequest();
            }
            else
            {
                return Ok(retirado);
            }
        }

        /*
         * Giro que hace la persona sobre su cuenta. Retira todo su saldo mas un 10% de este. Si el saldo es <= 0 no se puede realizar.
         * @Param id, id de la persona que hara el giro sobre su cuenta.
         * @return IHttpActionResult, devuelve resultado satisfactorio si se pudo realizar. Caso contrario, es incorrecta la solicitud.
       */
        [HttpPut]
        [Route("agirar")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public IHttpActionResult Agirar(int id)
        {
            bool check = true;
            try
            {
                using (dbHomeBank db = new dbHomeBank())   // Contexto de BD.
                {
                    Cuentas laCuenta = db.Cuentas.Where(d => d.idCliente == id).FirstOrDefault();    // Llamo la tabla Cuentas, busco el idCliente del objeto y la guardo.
                    if (laCuenta.saldoPesos <= 0)                                                   // Se comprueba si la cuenta tiene saldo negativo. No se reliza el giro si es 0 o negativo.
                    {
                        check = false;
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            if (check)
            {
                GestorCuentas girar = new GestorCuentas();
                return Ok(girar.GirarDinero(id).ToString());
            }
            return BadRequest();
        }
    }
}
