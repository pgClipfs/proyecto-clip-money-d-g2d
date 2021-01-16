using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
	public class GestorCuenta
	{
		public bool ActivarCuenta(activarCuenta activarCuenta)
        {
			try
            {
				using (Models.dbHomeBank db = new Models.dbHomeBank())
				{
					var oCuenta = new Cuentas();
					oCuenta.cbu = "353665876543";
					oCuenta.alias = activarCuenta.Alias;
					oCuenta.saldoPesos = 0;
					oCuenta.cvu = "353665876543";
					oCuenta.idCliente = activarCuenta.Id;
					oCuenta.estado = true;

					
					db.Cuentas.Add(oCuenta);
					db.SaveChanges();
				}
			} catch (Exception ex)
            {
				throw new Exception(ex.Message);
			}
				


				return true;
        }
	}
}