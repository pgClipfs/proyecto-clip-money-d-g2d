using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class DatosAModificar
    {
        private int id;
        private string pais, localidad, mail, telefono;

        public DatosAModificar(int id, string pais, string localidad, string mail, string telefono)
        {
            this.id = id;
            this.pais = pais;
            this.localidad = localidad;
            this.mail = mail;
            this.telefono = telefono;
        }

        public int Id { get => id; set => id = value; }
        public string Pais { get => pais; set => pais = value; }
        public string Localidad { get => localidad; set => localidad = value; }
        public string Mail { get => mail; set => mail = value; }
        public string Telefono { get => telefono; set => telefono = value; }

    }
}