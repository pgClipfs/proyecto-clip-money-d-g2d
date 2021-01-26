using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class OperCuenta
    {
        private int idOperacion, idCuenta;
        private string nombreOperacion, destino;
        private decimal montoPesos;
        private DateTime  fecha;

        public OperCuenta(int idOperacion, int idCuenta, string nombreOperacion, string destino, decimal montoPesos, DateTime fecha)
        {
            this.idOperacion = idOperacion;
            this.idCuenta = idCuenta;
            this.nombreOperacion = nombreOperacion;
            this.destino = destino;
            this.montoPesos = montoPesos;
            this.fecha = fecha;
        }
        public int IdOperacion { get => idOperacion; set => idOperacion = value; }
        public string NombreOperacion { get => nombreOperacion; set => nombreOperacion = value; }
        public decimal MontoPesos { get => montoPesos; set => montoPesos = value; }        
        public string Destino { get => destino; set => destino = value; }
        public DateTime Fecha { get => fecha; set => fecha = value; }
        public int IdCuenta { get => idCuenta; set => idCuenta = value; }
    }
}