using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class Persona
    {
        private int id;
        private string nombre, apellido, dni, pais, localidad, mail, telefono, pass, usuario;

        public Persona()
        {
        }

        public Persona(int id, string nombre, string apellido, string dni, string pais, string localidad,
                         string mail, string telefono, string pass, string usuario)
        {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.dni = dni;
            this.pais = pais;
            this.localidad = localidad;
            this.mail = mail;
            this.telefono = telefono;
            this.pass = pass;
            this.usuario = usuario;
        }

        public int Id
        {
            get
            {
                return id;
            }
            set
            {
                id = value;
            }
        }
        public string Nombre { get => nombre; set => nombre = value; }
        public string Apellido { get => apellido; set => apellido = value; }
        public string Dni { get => dni; set => dni = value; }
        public string Pais { get => pais; set => pais = value; }
        public string Localidad { get => localidad; set => localidad = value; }
        public string Mail { get => mail; set => mail = value; }
        public string Telefono { get => telefono; set => telefono = value; }
        public string Pass { get => pass; set => pass = value; }
        public string Usuario { get => usuario; set => usuario = value; }
    }
}