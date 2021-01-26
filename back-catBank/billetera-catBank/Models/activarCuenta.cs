using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class activarCuenta
    {

        private string alias;
        private int id;

        public activarCuenta(int id, string alias)
        {
            this.id = id;
            this.alias = alias;
        }

        public int Id { get => id; set => id = value; }
        public string Alias { get => alias; set => alias = value; }

        // Clase escrita para resolver el requerimieto de activar la cuenta por medio de las fotos del dni, id y alias.

        //private string alias, FotoDniFrente, FotoDniDorso;
        //private int id;

        //public activarCuenta(int id, string alias, string fotoFrente, string fotoDorso)
        //{
        //    this.id = id;
        //    this.alias = alias;
        //    this.FotoDniFrente = fotoFrente;
        //    this.FotoDniDorso = fotoDorso;
        //}

        //public int Id { get => id; set => id = value; }
        //public string Alias { get => alias; set => alias = value; }
        //public string ImDniFrente { get => FotoDniFrente; set => FotoDniFrente = value; }
        //public string ImDniDorso { get => FotoDniDorso; set => FotoDniDorso = value; }
    }
}