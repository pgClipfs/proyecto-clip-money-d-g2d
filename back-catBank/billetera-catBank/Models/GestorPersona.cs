﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;
using System.Configuration;


namespace AngularMVCProject.Models
{
    public class GestorPersonas
    {
       
        public int AgregarPersona(Persona nueva)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();
            int id=0;

            using (SqlConnection conn = new SqlConnection(StrConn))
            {
                try
                {
                    conn.Open();

                    SqlCommand comm = conn.CreateCommand();
                    comm.CommandText = "pa_insertar_usuario";
                    comm.CommandType = System.Data.CommandType.StoredProcedure;
                    comm.Parameters.Add(new SqlParameter("@Nombre", nueva.Nombre));
                    comm.Parameters.Add(new SqlParameter("@Apellido", nueva.Apellido));

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
            string strConn = "Server=AR-IT02462\\SQLEXPRESS01,1433;Database=dbHomeBank;User Id=mari;Password=Login1234;";
        

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

                        Persona p = new Persona(id, nombre, apellido);
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

                    p = new Persona(id, nombre, apellido);
                }

                dr.Close();
            }

            return p;

        }

        public void ModificarPersona(Persona p)
        {
            string StrConn = ConfigurationManager.ConnectionStrings["BDLocal"].ToString();

            using (SqlConnection conn = new SqlConnection(StrConn))
            { 
                conn.Open();

                SqlCommand comm = conn.CreateCommand();
                comm.CommandText = "modificar_persona";
                comm.CommandType = System.Data.CommandType.StoredProcedure;
                comm.Parameters.Add(new SqlParameter("@Nombre", p.Nombre));
                comm.Parameters.Add(new SqlParameter("@Apellido", p.Apellido));
                comm.Parameters.Add(new SqlParameter("@Id", p.Id));

                comm.ExecuteNonQuery();
                
                
            }
        }
    }
}
