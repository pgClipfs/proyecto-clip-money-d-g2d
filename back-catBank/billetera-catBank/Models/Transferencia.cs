using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class Transferencia
    {
        private int id;
        private decimal monto;
        private string alias;
        private string cbu;

        public Transferencia(int id, decimal monto, string alias, string cbu)
        {
            this.id = id;
            this.monto = monto;
            this.alias = alias;
            this.cbu = cbu;
        }

        public int Id { get => id; set => id = value; }
        public decimal Monto { get => monto; set => monto = value; }

        public string Alias { get => alias; set => alias = value; }

        public string Cbu { get => cbu; set => cbu = value; }
    }
}