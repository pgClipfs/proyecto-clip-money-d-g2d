using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class OperacionesCuenta
    {
        private int ID;
        private decimal monto;

        public OperacionesCuenta(int id, decimal monto)
        {
            this.ID = id;
            this.monto = monto;
        }

        public int Id { get => ID; set => ID = value; }
        public decimal Monto { get => monto; set => monto = value; }
    }
}