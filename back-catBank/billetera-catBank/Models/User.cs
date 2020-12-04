using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AngularMVCProject.Models
{
    public class User
    {
        private string userName;
        private string token;

        public User(string userName, string token)
        {
            this.userName = userName;
            this.token = token;
        }

        public string UserName { get => userName; set => userName = value; }
        public string Token { get => token; set => token = value; }
    }
}