using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class NewPass
    {
        private string pass,pass2, token;

        public string Token { get => token; set => token = value; }
        public string Password { get => pass; set => pass = value; }


        public string Password2 { get => pass2; set => pass2 = value; }
    }
}