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
        *  Ingresa saldo a la cuenta y lo actualiza.
        *  @Param operaciones, detalles de la persona que permiten ingresar saldo a la cuenta.
        *  @return string con el mensaje de lo que se hizo y muestra el nuevo saldo en la cuenta.
        */
        public string IngresarSaldo(OperacionesCuenta operaciones)
        {
            decimal saldoTotal = 0;
            try
            {
                using (dbHomeBank db = new dbHomeBank())
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
                        oOperacion.destino = oCuenta.cbu.ToString();
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
         * Verifica el saldo en la cuenta de la persona.
         * @Param id, id de la persona a comprobar.
         * @return false si no tiene, true si tiene saldo.
         */
        public bool SaldoIsOk(int id)
        {
            bool haySaldo = false;
            try
            {
                using(dbHomeBank db = new dbHomeBank())
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
        * @Param operaciones, detalles de la persona que permiten retirar saldo de su cuenta.
        * @return string, devuelve el monto que retiró de la persona de su cuenta.
        * @throw new Excepcion(), en caso de no poder retirar dinero de la cuenta.
        */
        public string RetirarDinero(OperacionesCuenta operaciones)
        {
            decimal saldoTotal = 0;
            if (SaldoIsOk(operaciones.Id))
            {
                try
                {
                    using (dbHomeBank db = new dbHomeBank())
                    {

                        // Busco al cliente por medio del Id para realizar la operacion.
                        /*
                        Cuentas elCLiente = db.Cuentas.Find(id);                        
                        elCLiente.saldoPesos -= monto;      // Se resta el monto ingresado al saldo del cliente y se lo actualiza.
                        db.Cuentas.Add(elCLiente); */         //  Se agrega el cambio a la BD del correspondiente cliente

                        // Lo siguiente es otra forma de hacer, otro camino, quizas mas largo en tiempo.
                        Cuentas oCuenta = db.Cuentas.Where(d => d.idCliente == operaciones.Id).FirstOrDefault();
                        // Llamo la tabla Cuentas, busco el contexto y lo guardo en una variable.
                        if(operaciones.Monto <= oCuenta.saldoPesos)
                        {
                            Debug.WriteLine("acá guardo los datos modificados");
                            oCuenta.saldoPesos -= operaciones.Monto;
                            var oOperacion = new Operaciones();
                            oOperacion.idCuenta = operaciones.Id;
                            oOperacion.montoPesos = operaciones.Monto;
                            oOperacion.nombreOperacion = "Retiro";
                            oOperacion.destino = oCuenta.cbu.ToString();
                            oOperacion.fecha = DateTime.Now;

                            db.Operaciones.Add(oOperacion);
                            db.Entry(oCuenta).State = System.Data.Entity.EntityState.Modified;
                            db.SaveChanges();
                            saldoTotal = (decimal)oCuenta.saldoPesos;
                            return saldoTotal.ToString();
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
                using (dbHomeBank db = new dbHomeBank())
                {
                    Cuentas elCLiente = db.Cuentas.Where(d => d.idCliente == operaciones.Id).FirstOrDefault(); ;
                    throw new Exception("No se ha podido realizar la transaccion, el monto a retirar es mayor al saldo que ud. tiene.\n" +
                                        "Su monto actual es de $" + elCLiente.saldoPesos);
                }

            }

            return saldoTotal.ToString();
        }

        /*
         * Transferencia de saldo entre dos cuentas.
         * @Param transferencia, detalles de la transferencia a realizar por la persona en su cuenta.
         * @return string, devuelve el saldo transferido en tipi 'string'
        */
        public string TransferirDinero(Transferencia transferencia)
        {
            decimal saldoTotal = 0;
            Cuentas CuentaDestino = new Cuentas();
            if (SaldoIsOk(transferencia.Id))
            {
                try
                {
                    using (dbHomeBank db = new dbHomeBank())
                    {
                        Cuentas oCuenta = db.Cuentas.Where(d => d.idCliente == transferencia.Id).FirstOrDefault();
                        //Cuentas CuentaDestino = new Cuentas();
                        if (transferencia.Monto <= oCuenta.saldoPesos)
                        {
                            Debug.WriteLine("acá guardo los datos modificados");
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
                                 CuentaDestino = db.Cuentas.Where(d => d.cbu.ToString().Equals(transferencia.Cbu)).FirstOrDefault();
                                 CuentaDestino.saldoPesos += transferencia.Monto;
                                
                            }
                            oOperacion.destino = CuentaDestino.cbu.ToString();
                            oOperacion.fecha = DateTime.Now;

                            var oReciboTransferencia = new Operaciones();
                            oReciboTransferencia.idCuenta = CuentaDestino.idCuenta;
                            oReciboTransferencia.montoPesos = transferencia.Monto;
                            oReciboTransferencia.nombreOperacion = "Transferencia";
                            oReciboTransferencia.destino = oCuenta.cbu.ToString();
                            oReciboTransferencia.fecha = DateTime.Now;

                            db.Operaciones.Add(oReciboTransferencia);

                            db.Operaciones.Add(oOperacion);
                            db.Entry(oCuenta).State = System.Data.Entity.EntityState.Modified;
                            db.SaveChanges();
                            saldoTotal = (decimal)oCuenta.saldoPesos;
                            
                        }
                    }
                    return saldoTotal.ToString();
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
                using (dbHomeBank db = new dbHomeBank())
                {
                    Cuentas elCLiente = db.Cuentas.Find(transferencia.Id);
                    throw new Exception("No se ha podido realizar la transaccion, el monto a retirar es mayor al saldo que ud. tiene.\n" +
                                        "Su monto actual es de $" + elCLiente.saldoPesos);
                }
            }            
        }

        /*
        * Muestra el saldo actual, cbu, cvu, alias y las ultimas 10 operaciones de la cuenta de la persona.
        * @Param id, id de la persona que verá sus datos de la cuenta.
        * @return DatosOperaciones, devuelve los datos antes mencionados .
        */
        public DatosOperaciones MostrarSaldo(int id)
        {
            // Se declaran  y crean objetos que guaradarán los datos requeridos. Estos se buscan en la BD.            
            DatosOperaciones mostrarCuenta = null;
            OperCuenta detalleCuenta;
            ICollection<OperCuenta> colecOperaciones = new List<OperCuenta>();
            ICollection<Operaciones> cuentaOper;
            List<Operaciones> operDeLaCuenta = new List<Operaciones>();
            Operaciones[] arrayOperaciones = new Operaciones[10];

            try
            {
                using (dbHomeBank db = new dbHomeBank())
                {
                    // Busco la cuenta del cliente por medio del id ingresado para luego ver sus datos.

                    Cuentas cuenta = db.Cuentas.Where(d => d.idCliente == id).FirstOrDefault(); // Llamo la tabla Cuentas, busco el id del cliente correspondiente a la cuenta y la guardo.
                    cuentaOper = cuenta.Operaciones;                                        // Almaceno la coleccion de las operaciones de la cuenta.
                   
                    // Recorro todas las operaciones y guardo las de la correspondiente cuenta.
                    foreach (Operaciones lasOperaciones in cuentaOper)
                    {
                        if (cuenta.idCuenta == lasOperaciones.idCuenta)
                        {
                            operDeLaCuenta.Add(lasOperaciones);
                        }
                    }

                    int descartarOper = Math.Abs(operDeLaCuenta.Count() - 10);
                    int cont = 1, cont2 = 0;
                    
                    // Se copian las ultimas operaciones de la cuenta a un arreglo.
                    if (operDeLaCuenta.Count() <= 10)
                    {
                        foreach (Operaciones operPerCount in operDeLaCuenta)
                        {
                            arrayOperaciones[cont2] = operPerCount;
                            cont2++;                          
                        }
                    }
                    if(operDeLaCuenta.Count() > 10)
                    {
                        foreach (Operaciones operPerCount in operDeLaCuenta)
                        {
                            if (cont > descartarOper)
                            {
                                arrayOperaciones[cont2] = operPerCount;
                                cont2++;
                            }
                            cont++;
                        }                                                
                    }
                    int i = 0;
                    // Se recorre el arreglo para crear los objetos de las operaciones de la correspondiente cuenta.
                    foreach (Operaciones operaccion in arrayOperaciones)
                    {
                        if(i < cont2)
                        {
                            // Se asignan las propiedades de las operaciones de la cuenta por medio de las creaciones de los objetos de tipo OperCuenta
                            // que se añdiran a una coleccion.
                            detalleCuenta = new OperCuenta(operaccion.idOperacion, operaccion.idCuenta, operaccion.nombreOperacion,
                                                           operaccion.destino, (decimal)operaccion.montoPesos, operaccion.fecha);

                            colecOperaciones.Add(detalleCuenta);  // Esta línea se puede simplificar.
                        }
                        i++;
                    }

                    db.SaveChanges();
                    // Se asignan las propiedades de los datos que se requieren a la cuenta y se devuelve el objeto creado con los datos requeridos.
                    mostrarCuenta = new DatosOperaciones(cuenta.cbu.ToString(), cuenta.alias, (decimal)cuenta.saldoPesos, cuenta.cvu.ToString(), colecOperaciones);
                }                
            }
            catch (Exception fail)
            {
                Debug.Fail(fail.Message);
            }

            return mostrarCuenta;
        }

        /*
         * Giro que hace la persona sobre su cuenta. 
         * @Param id, id de la persona que hara el giro sobre su cuenta.
         * @return decimal, devuelve el saldo mas un 10% del saldo que tenia en su cuenta. Se resta y el saldo en la cuenta es negativo.
        */
        public decimal GirarDinero(int id)
        {
            decimal saldoAGirar = 0;
            try
            {
                using (dbHomeBank db = new dbHomeBank())
                {
                    Cuentas laCuenta = db.Cuentas.Where(d => d.idCliente == id).FirstOrDefault();         // Llamo la tabla Cuentas, busco el id del objeto y la guardo.
                    saldoAGirar = (decimal)(laCuenta.saldoPesos + ((laCuenta.saldoPesos * 10) / 100));    // Monto que se gira.
                    laCuenta.saldoPesos -= saldoAGirar;                                                   // Se resta el monto girado al saldo.
                    Operaciones operGiro = new Operaciones();
                    operGiro.montoPesos = saldoAGirar;
                    operGiro.idCuenta = id;
                    operGiro.nombreOperacion = "Giro al descubierto";
                    operGiro.fecha = DateTime.Now;
                    operGiro.destino = laCuenta.cbu.ToString();
                    db.Operaciones.Add(operGiro);
                    db.Entry(laCuenta).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();                                                               // Se guardan los cambios
                }
            }
            catch (Exception fail)
            {
                Debug.WriteLine(fail.Message);
            }

            return saldoAGirar;
        }
    }
}