using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Model.Response
{
    public class LoginResponse
    {
        public Guid Id  { get; set; }
        public string Email { get; set; }   
        public string Token { get; set; }   
    }
}
