using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{

    public class Recovery
    {
        private string mail;
        
        public string Mail { get => mail; set => mail = value; }
        
    }
}