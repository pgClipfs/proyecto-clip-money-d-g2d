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
    /// <summary>
    /// Creo que debe entrar como parametro el usuario de la cuenta para identificarla y hacer las operaciones en esa cuenta. 
    /// </summary>
    [RoutePrefix("api/cuentas")]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CuentasController : ApiController
    {
        // GET
        /*
         * Verifica saldo.
         * @Param id, id de la persona a comprobar.
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
        * Muestra el saldo actual de la persona.
        * @Param id, id de la persona.
        * @return saldo, devuelve el saldo actual de la persona.
        */
        [HttpGet]
        [Route("mostrarsaldo")]
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public decimal MostrarSaldo(int id)
        {
            GestorCuentas mostrar = new GestorCuentas();
            return mostrar.MostrarSaldo(id);
        }

        /*  
        *  Ingresa monto a la cuenta, lo suma y la actualiza. Lanza excepcion si el monto es negativo y 
        *  si el id es 0 o negativo.
        *  @Param monto, monto a sumar en la cuenta; id, es el id de la persona
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
        *  es mayor al que se tiene lanza excepcion. 
        *  @Param monto, es el monto a retirar; id, es el id de la persona.
        *  @return monto, es el monto a retirar. 
        *  @throw new Exception();
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


    }
}
