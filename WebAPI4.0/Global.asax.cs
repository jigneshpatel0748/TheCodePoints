using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using System.Web.SessionState;
using WebAPI4._0.App_Start;

namespace WebAPI4._0
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);
        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {
            if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            {
                HttpContext.Current.Response.Flush();
            }

            string[] allowedOrigin = new string[] { "http://localhost:4200", "http://localhost:2052" };
            var origin = HttpContext.Current.Request.Headers["Origin"];
            if (origin != null && allowedOrigin.Contains(origin))
            {
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", origin);
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Credentials", "true");
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "Content-Type");
                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

                //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers", "*");
                //HttpContext.Current.Response.AddHeader("Content-Type", "application/json");


                //      < add name = "Access-Control-Allow-Origin" value = "http://localhost:4200" />
                //< add name = "Access-Control-Allow-Credentials" value = "true" />
                //   < add name = "Access-Control-Allow-Headers" value = "Content-Type" />
                //      < add name = "Access-Control-Allow-Methods" value = "GET, POST, PUT, DELETE, OPTIONS" />

            }

           

            //HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
            //if (HttpContext.Current.Request.HttpMethod == "OPTIONS")
            //{
            //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Methods",
            //                 "GET, POST, PUT, DELETE");
            //    HttpContext.Current.Response.AddHeader("Access-Control-Allow-Headers",
            //                 "Content-Type, Accept");
            //    HttpContext.Current.Response.End();
            //}

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}