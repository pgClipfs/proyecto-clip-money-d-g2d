using System;
using System.Collections.Generic;
using System.Data.Entity.Validation;
using System.Linq;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Mvc;

namespace AngularMVCProject.Models
{
    public class GestorRecovery : Controller
    {
        string urlDomain = "http://localhost:4200/";
        public bool StartRecovery(Recovery recovery)
        {
            Models.Recovery model = new Models.Recovery();
            try
            {
                string token = GetSha256(Guid.NewGuid().ToString());
                using (Models.dbEntityToken db = new Models.dbEntityToken())
                {
                    var oUser = db.Clientes.Where(d => d.mail == recovery.Mail).FirstOrDefault();
                    if (oUser != null)
                    {
                        oUser.token = token;
                        db.Entry(oUser).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();

                        //enviar el mail
                        SendEmail(oUser.mail, token);
                        return true;
                    } else
                    {
                        return false;
                    }
                }
                
            } catch (DbEntityValidationException e)
            {
                foreach (var eve in e.EntityValidationErrors)
                {
                    System.Diagnostics.Debug.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                        eve.Entry.Entity.GetType().Name, eve.Entry.State);
                    foreach (var ve in eve.ValidationErrors)
                    {
                        System.Diagnostics.Debug.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                    }
                }
                throw;
            }
        }

        public bool Recovery( Models.NewPass newPass)
        {
            try
            {
                using (Models.dbEntityToken db= new Models.dbEntityToken())
                {
                    var oUser = db.Clientes.Where(d => d.token == newPass.Token).FirstOrDefault();
                    if (oUser != null)
                    {
                        oUser.pass = newPass.Password;
                        oUser.token = null;
                        db.Entry(oUser).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                        return true;
                    } else
                    {
                        return false;
                    }
                }
            } catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        #region HELPERS
        private string GetSha256(string str)
        {
            SHA256 sha256 = SHA256Managed.Create();
            ASCIIEncoding encoding = new ASCIIEncoding();
            byte[] stream = null;
            StringBuilder sb = new StringBuilder();
            stream = sha256.ComputeHash(encoding.GetBytes(str));
            for (int i = 0; i < stream.Length; i++) sb.AppendFormat("{0:x2}", stream[i]);
            return sb.ToString();
        }

        private void SendEmail(string EmailDestino, string token)
        {
            string EmailOrigen = "catBankBusiness@gmail.com";
            string Contraseña = "catBank2020";
            string url = urlDomain+"newPass/"+token;

            MailMessage oMailMessage = new MailMessage(EmailOrigen, EmailDestino, "Recupero de contraseña",
                "<tr><td style='padding:0;font-family:Segoe UI Semibold, Arial,sans-serif;font-size:17px;color:#707070'>Cuenta CatBank</td></tr>"+
                "<tr><td style='padding:0;padding-top:25px;font-family:Segoe UI,Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a'>Usa este Link para restablecer la contraseña de la cuenta de CatBank <span style='font-family:Segoe UI Bold,Segoe UI Semibold,Segoe UI,Helvetica Neue Medium,Arial,sans-serif;font-size:14px;font-weight:bold;color:#2a2a2a'>Mail del cliente</span></td></tr>" +
                "<tr><td style='padding:0;padding-top:25px;font-family:Segoe UI,Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a'>Este es tu Link: <span style='font-family:Segoe UI Bold,Segoe UI Semibold,Segoe UI,Helvetica Neue Medium,Arial,sans-serif;font-size:14px;font-weight:bold;color:#2a2a2a'><a style='color:#2672ec;text-decoration:none' href='" + url + "' cursor: pointer; target='_blank'>[Cambiar contraseña]</a></span></td></tr>" +
                "<tr><td style='padding:0;padding-top:25px;font-family:Segoe UI,Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a'>Gracias,</td></tr>"+
                "<tr><td style='padding:0;font-family:Segoe UI,Tahoma,Verdana,Arial,sans-serif;font-size:14px;color:#2a2a2a'>El equipo CatBank</td></tr>");

            oMailMessage.IsBodyHtml = true;

            SmtpClient oSmtpClient = new SmtpClient("smtp.gmail.com");
            oSmtpClient.UseDefaultCredentials = false;
            oSmtpClient.Port = 587;
            oSmtpClient.Credentials = new System.Net.NetworkCredential(EmailOrigen, Contraseña);
            oSmtpClient.EnableSsl = true;

            oSmtpClient.Send(oMailMessage);
            oSmtpClient.Dispose();
        }
        #endregion
    }
}
