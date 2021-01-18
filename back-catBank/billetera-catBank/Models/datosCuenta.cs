using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class datosCuenta
    {
        private string Cbu, Alias, Cvu, IdCliente;
        private decimal SaldoPesos;
        private bool Estado;

        public datosCuenta(string cbu, string alias, decimal saldoPesos, string cvu, string idCliente, bool estado)
        {
            this.Cbu = cbu;
            this.Alias = alias;
            this.SaldoPesos = saldoPesos;
            this.Cvu = cvu;
            this.IdCliente = idCliente;
            this.Estado = estado;
        }
        public datosCuenta()
        {

        }

        public string cbu { get => Cbu; set => Cbu = value; }
        public string alias { get => Alias; set => Alias = value; }
        public decimal saldoPesos { get => SaldoPesos; set => SaldoPesos = value; }
        public string cvu { get => Cvu; set => Cvu = value; }
        public string idCliente { get => IdCliente; set => IdCliente = value; }
        public bool estado { get => Estado; set => Estado = value; }
    }
}