using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;
using System.Security.Claims;

namespace AngularMVCProject.Models
{
    public class GestorPersonas
    {
        public bool getUserByUsername(Token token, string claims)
        {

            if (token != null)
            {
                return true;
            } else
            {
                return false;
            }
        }
        public int AgregarPersona(Persona nueva)
        {
            //string StrConn = ConfigurationManager.ConnectionStrings["dbHomeBank"].ToString();
            string StrConn = "Data Source=AR-IT02462\\SQLEXPRESS01;Initial Catalog=dbHomeBank;Integrated Security=True";

            int id=0;
            int dni = 0;

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                try
                {
                    conn.Open();

                    SqlCommand comm = conn.CreateCommand();
                    comm.CommandText = "pa_insertar_cliente";
                    comm.CommandType = System.Data.CommandType.StoredProcedure;
                    comm.Parameters.Add(new SqlParameter("@Nombre", nueva.Nombre));
                    comm.Parameters.Add(new SqlParameter("@Apellido", nueva.Apellido));
                    comm.Parameters.Add(new SqlParameter("@Dni", nueva.Dni));
                    comm.Parameters.Add(new SqlParameter("@Pais", nueva.Pais));
                    comm.Parameters.Add(new SqlParameter("@Localidad", nueva.Localidad));
                    comm.Parameters.Add(new SqlParameter("@Mail", nueva.Mail));
                    comm.Parameters.Add(new SqlParameter("@Telefono", nueva.Telefono));
                    comm.Parameters.Add(new SqlParameter("@Usuario", nueva.Usuario));
                    comm.Parameters.Add(new SqlParameter("@Pass", nueva.Pass));


                    id = Convert.ToInt32(comm.ExecuteScalar());
                }
                catch(System.InvalidOperationException e)
                {
                    Console.WriteLine(e);
                }
            }
            return id;
        }

        public List<Persona> ObtenerPersonas()
        {
            List<Persona> lista = new List<Persona>();
            //string strConn = "Server=AR-IT02462\\SQLEXPRESS01,1433;Database=dbHomeBank;User Id=mari;Password=Login1234;";
            string strConn = "Data Source=AR-IT02462\\SQLEXPRESS01;Initial Catalog=dbHomeBank;Integrated Security=True";


            using (SqlConnection conn = new SqlConnection(strConn))


            {
                    conn.Open();

                    SqlCommand comm = conn.CreateCommand();
                    comm.CommandText = "pa_mostrar_clientes";
                    comm.CommandType = System.Data.CommandType.StoredProcedure;

                    SqlDataReader dr = comm.ExecuteReader();
                    while (dr.Read())
                    {
                        int id = dr.GetInt32(0);
                        string nombre = dr.GetString(1).Trim();
                        string apellido = dr.GetString(2).Trim();
                        string dni = dr.GetString(9).Trim();
                        string pais = dr.GetInt32(3).ToString();
                        string localidad = dr.GetString(4).Trim();
                        string mail = dr.GetString(5).Trim();
                        string telefono = dr.GetString(6).Trim();
                        string usuario = dr.GetString(8).Trim();
                        string pass = dr.GetString(7).Trim();

                    Persona p = new Persona(id, nombre, apellido, pais, localidad, mail, telefono, pass, usuario, dni);
                    lista.Add(p);
                    }

                    dr.Close();
            }

            return lista;
        }

        public void Eliminar(int id)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                conn.Open();

                SqlCommand comm = new SqlCommand("eliminar_persona", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@Id", id));

                comm.ExecuteNonQuery();
            }

        }
        
        public Persona ObtenerPorId(int id)
        {
            Persona p = null;
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            { 
                conn.Open();

                SqlCommand comm = new SqlCommand("obtener_persona", conn);
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@id", id));

                SqlDataReader dr = comm.ExecuteReader();
                if (dr.Read())
                {
                    string nombre = dr.GetString(1);
                    string apellido = dr.GetString(2);
                    string dni = dr.GetString(9).Trim();
                    string pais = dr.GetString(3).Trim();
                    string localidad = dr.GetString(4).Trim();
                    string mail = dr.GetString(5).Trim();
                    string telefono = dr.GetString(6).Trim();
                    string pass = dr.GetString(7).Trim();
                    string usuario = dr.GetString(8).Trim();

                    p = new Persona(id, nombre, apellido, pais, localidad, mail, telefono, pass, usuario, dni);
                }

                dr.Close();
            }

            return p;

        }

        public void ModificarPersona(DatosAModificar modificar)
        {
            using( Models.dbHomeBank db= new Models.dbHomeBank()){
                var oUser = db.Clientes.Where(d => d.idCliente== modificar.Id).FirstOrDefault();
                if (modificar.Localidad != null)
                {
                    oUser.localidad = modificar.Localidad;
                    db.Entry(oUser).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }
                if (modificar.Pais != null)
                {
                    oUser.pais = modificar.Pais;
                    db.Entry(oUser).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }
                if (modificar.Mail != null)
                {
                    oUser.mail = modificar.Mail;
                    db.Entry(oUser).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }
                if (modificar.Telefono != null)
                {
                    oUser.telefono = modificar.Telefono;
                    db.Entry(oUser).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                }

            }
            //string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            //using (SqlConnection conn = new SqlConnection(StrConn))
            //{ 
            //    conn.Open();

            //    SqlCommand comm = conn.CreateCommand();
            //    comm.CommandText = "modificar_persona";
            //    comm.CommandType = System.Data.CommandType.StoredProcedure;
            //    comm.Parameters.Add(new SqlParameter("@Nombre", p.Nombre));
            //    comm.Parameters.Add(new SqlParameter("@Apellido", p.Apellido));
            //    comm.Parameters.Add(new SqlParameter("@Id", p.Id));

            //    comm.ExecuteNonQuery();
                
                
            //}
        }
    }
}
