using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class Token
    {
        private string token;

        public string Jwt { get => token; set => token = value; }
    }
}