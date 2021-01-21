using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.Entity.Validation;

namespace AngularMVCProject.Models
{
    public class GestorCuentas
    {

        //Metodos, funciones de la 'Persona' por medio de la clase 'GestorCuenta'.

        /*  
        *  Ingresa monto a la cuenta y actualiza el saldo de dicha cuenta.
        *  @Param monto, id. monto a sumar en la cuenta; id de la persona
        *  @return string con el mensaje de lo que se hizo y muestra el nuevo saldo en la cuenta.
        */
        public string IngresarSaldo(OperacionesCuenta operaciones)
        {
            decimal saldoTotal = 0;
            try
            {
                using (Models.dbHomeBank db = new Models.dbHomeBank())
                {
                    var oCuenta = db.Cuentas.Where(d => d.idCliente == operaciones.Id).FirstOrDefault();
                    //var oCbu = oCuenta.cbu;
                    if (operaciones.Monto > 0)
                    {
                        oCuenta.saldoPesos += operaciones.Monto;
                        saldoTotal = (decimal)oCuenta.saldoPesos;
                        var oOperacion = new Operaciones();
                        oOperacion.idCuenta = operaciones.Id;
                        oOperacion.montoPesos = operaciones.Monto;
                        oOperacion.nombreOperacion = "Depósito";
                        oOperacion.destino = oCuenta.cbu;
                        oOperacion.fecha = System.DateTime.Now;
                        
                        db.Operaciones.Add(oOperacion);
                        db.Entry(oCuenta).State = System.Data.Entity.EntityState.Modified;
                        // db.Entry(Cliente).State = System.Data.Entity.EntityState.Modified;  //Es para hacer el update, se le dice al EF
                        // que el objeto tuvo una modificacion.
                        db.SaveChanges();
                    }// Se guardan los cambios en la BD.
                }
            }
            catch (Exception fail)
            {
                Debug.WriteLine(fail.Message);
            }

            return  Convert.ToString(saldoTotal);
        }

        /*
         * Verifica el saldo en la cuenta.
         * @Param id, id de la persona a comprobar.
         * @return false si no tiene, true si tiene saldo.
         */
        public bool SaldoIsOk(int id)
        {
            bool haySaldo = false;
            try
            {
                using(Models.dbHomeBank db = new Models.dbHomeBank())
                {
                    // Busco el Id en la BD. Primero llamo la tabla Cuentas, busco el contexto.
                    var Cliente = db.Cuentas;
                    foreach (var buscoIDCliente in Cliente)
                    {
                        int esteID = buscoIDCliente.idCliente;
                        // Se comprueba el Id ingresado con el de la tabla Cuentas.
                        if (id == esteID)
                        {
                            // Se comprueba el saldo del cliente.
                            if (buscoIDCliente.saldoPesos <= 0)
                            {
                                Debug.WriteLine("ud no tiene saldo o debe (pague su deuda Sr " + buscoIDCliente.alias + "!!).");
                                break;
                            }
                            haySaldo = true;
                            Debug.WriteLine("Su saldo es de: $" + buscoIDCliente.saldoPesos);
                            break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine(ex.Message);
            }
            return haySaldo;
        }

        /*
        * Retira dinero de la cuenta de la persona y actualiza su saldo.
        * @Param id de la persona; monto monto a retirar.
        * @return monto, devuelve el monto que retiró de la persona de su cuenta.
        */
        public string RetirarDinero(OperacionesCuenta operaciones)
        {
            decimal saldoTotal = 0;
            if (SaldoIsOk(operaciones.Id))
            {
                try
                {
                    using (Models.dbHomeBank db = new Models.dbHomeBank())
                    {

                        // Busco al cliente por medio del Id para realizar la operacion.
                        /*
                        Cuentas elCLiente = db.Cuentas.Find(id);                        
                        elCLiente.saldoPesos -= monto;      // Se resta el monto ingresado al saldo del cliente y se lo actualiza.
                        db.Cuentas.Add(elCLiente); */         //  Se agrega el cambio a la BD del correspondiente cliente

                        // Lo siguiente es otra forma de hacer, otro camino, quizas mas largo en tiempo.
                        var oCuenta = db.Cuentas.Where(d => d.idCliente == operaciones.Id).FirstOrDefault();
                        // Llamo la tabla Cuentas, busco el contexto y lo guardo en una variable.
                        if(operaciones.Monto <= oCuenta.saldoPesos)
                        {
                            System.Diagnostics.Debug.WriteLine("acá guardo los datos modificados");
                            oCuenta.saldoPesos -= operaciones.Monto;
                            var oOperacion = new Operaciones();
                            oOperacion.idCuenta = operaciones.Id;
                            oOperacion.montoPesos = operaciones.Monto;
                            oOperacion.nombreOperacion = "Retiro";
                            oOperacion.destino = oCuenta.cbu;
                            oOperacion.fecha = System.DateTime.Now;

                            db.Operaciones.Add(oOperacion);
                            db.Entry(oCuenta).State = System.Data.Entity.EntityState.Modified;
                            db.SaveChanges();
                            saldoTotal = (decimal)oCuenta.saldoPesos;
                            return Convert.ToString(saldoTotal);
                        }
                        //foreach (var verSaldo in cuentas)
                        //{
                        //    int suID = verSaldo.idCliente;
                        //    if (operaciones.Id == suID)
                        //    {
                        //        verSaldo.saldoPesos -= operaciones.Monto;
                        //        db.Cuentas.Add(verSaldo);
                        //        break;
                        //    }
                        //}

                        //db.Entry(cuentas).State = System.Data.Entity.EntityState.Modified;  //Es para hacer el update, se le dice al EF
                        // que el objeto tuvo una modificacion.
                        
                    }
                }
                catch (Exception fail)
                {
                    Debug.WriteLine(fail.Message);
                }
            }
            else
            {
                using (Models.dbHomeBank db = new Models.dbHomeBank())
                {
                    Cuentas elCLiente = db.Cuentas.Find(operaciones.Id);
                    throw new Exception("No se ha podido realizar la transaccion, el monto a retirar es mayor al saldo que ud. tiene.\n" +
                                        "Su monto actual es de $" + elCLiente.saldoPesos);
                }

            }

            return Convert.ToString(saldoTotal);
        }
        public string TransferirDinero(Transferencia transferencia)
        {
            decimal saldoTotal = 0;
            Cuentas CuentaDestino = new Cuentas();
            if (SaldoIsOk(transferencia.Id))
            {
                try
                {
                    using (Models.dbHomeBank db = new Models.dbHomeBank())
                    {
                        var oCuenta = db.Cuentas.Where(d => d.idCliente == transferencia.Id).FirstOrDefault();
                        //Cuentas CuentaDestino = new Cuentas();
                        if (transferencia.Monto <= oCuenta.saldoPesos)
                        {
                            System.Diagnostics.Debug.WriteLine("acá guardo los datos modificados");
                            oCuenta.saldoPesos -= transferencia.Monto;
                            var oOperacion = new Operaciones();
                            oOperacion.idCuenta = transferencia.Id;
                            oOperacion.montoPesos = transferencia.Monto;
                            oOperacion.nombreOperacion = "Transferencia";
                            
                            if (transferencia.Alias != null)
                            {
                                CuentaDestino = db.Cuentas.Where(d => d.alias == transferencia.Alias).FirstOrDefault();
                                CuentaDestino.saldoPesos += transferencia.Monto;
                                
                            }
                            if (transferencia.Cbu != null)
                            {
                                 CuentaDestino = db.Cuentas.Where(d => d.cbu == transferencia.Cbu).FirstOrDefault();
                                 CuentaDestino.saldoPesos += transferencia.Monto;
                                
                            }
                            oOperacion.destino = CuentaDestino.cbu;
                            oOperacion.fecha = System.DateTime.Now;

                            var oReciboTransferencia = new Operaciones();
                            oReciboTransferencia.idCuenta = CuentaDestino.idCuenta;
                            oReciboTransferencia.montoPesos = transferencia.Monto;
                            oReciboTransferencia.nombreOperacion = "Transferencia";
                            oReciboTransferencia.destino = oCuenta.cbu;
                            oReciboTransferencia.fecha = System.DateTime.Now;

                            db.Operaciones.Add(oReciboTransferencia);

                            db.Operaciones.Add(oOperacion);
                            db.Entry(oCuenta).State = System.Data.Entity.EntityState.Modified;
                            db.SaveChanges();
                            saldoTotal = (decimal)oCuenta.saldoPesos;
                            
                        }
                    }
                    return Convert.ToString(saldoTotal);
                }
                catch (DbEntityValidationException e)
                {
                    foreach (var eve in e.EntityValidationErrors)
                    {
                        System.Diagnostics.Debug.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                            eve.Entry.Entity.GetType().Name, eve.Entry.State);
                        foreach (var ve in eve.ValidationErrors)
                        {
                            System.Diagnostics.Debug.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                                ve.PropertyName, ve.ErrorMessage);
                        }
                    }
                    throw;
                }
            }
            else
            {
                using (Models.dbHomeBank db = new Models.dbHomeBank())
                {
                    Cuentas elCLiente = db.Cuentas.Find(transferencia.Id);
                    throw new Exception("No se ha podido realizar la transaccion, el monto a retirar es mayor al saldo que ud. tiene.\n" +
                                        "Su monto actual es de $" + elCLiente.saldoPesos);
                }

            }

            
        }

        /*
        * Muestra el saldo actual de la persona.
        * @Param id de la persona que verá su saldo.
        * @return mostrar, devuelve el saldo actual de la persona.
        */
        public decimal MostrarSaldo(int id)
        {
            decimal mostrar = 0;
            try
            {
                using (Models.dbHomeBank db = new Models.dbHomeBank())
                {
                    // Busco al cliente por medio del Id para realizar la operacion.

                    var cuentas = db.Cuentas;           // Llamo la tabla Cuentas, busco el contexto y lo guardo en una variable.
                    foreach (var verSaldo in cuentas)
                    {
                        int suID = verSaldo.idCliente;
                        if (id == suID)
                        {
                            mostrar = (decimal)verSaldo.saldoPesos;
                            break;
                        }
                    }
                }
            }
            catch (Exception fail)
            {
                Debug.WriteLine(fail.Message);
            }
            return mostrar;

        }
    }
}