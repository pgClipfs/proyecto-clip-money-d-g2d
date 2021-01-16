using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class activarCuenta
    {
        private string  alias;
        private int id;

        public activarCuenta(int id, string alias)
        {
            this.id = id;
            this.alias = alias;
        }

        public int Id { get => id; set => id = value; }
        public string Alias { get => alias; set => alias = value; }
    }
}