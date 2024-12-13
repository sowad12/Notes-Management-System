using Core.Common.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.ViewModels
{
    public class FailResponseViewModel : ResponseViewModel
    {
        public FailResponseViewModel(string message = "error", HttpStatusCode code = HttpStatusCode.NoContent)
        {
            Status = new StatusViewModel
            {
                Code = code,
                Message = message
            };
        }

        public string[] Exceptions { get; set; }
    }
}
