using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class DatosOperaciones
    {
        private string Cbu, Alias, Cvu;
        private decimal SaldoPesos;
        private ICollection<OperCuenta> OperCuenta;


        public DatosOperaciones(string cbu, string alias, decimal saldoPesos, string cvu, ICollection<OperCuenta> operaciones)
        {
            this.Cbu = cbu;
            this.Alias = alias;
            this.SaldoPesos = saldoPesos;
            this.Cvu = cvu;
            this.OperCuenta = operaciones;
        }
        public DatosOperaciones()
        {

        }

        public string cbu { get => Cbu; set => Cbu = value; }
        public string alias { get => Alias; set => Alias = value; }
        public decimal saldoPesos { get => SaldoPesos; set => SaldoPesos = value; }
        public string cvu { get => Cvu; set => Cvu = value; }
        public ICollection<OperCuenta> OPerCuenta { get => OperCuenta; set => OperCuenta = value; }
    }
}
