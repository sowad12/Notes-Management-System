using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Common.ViewModels
{
    public class ApiExceptionViewModel
    {
        public ApiExceptionViewModel(int StatusCode, string Message, string Details)
        {
            this.StatusCode = StatusCode;
            this.Message = Message;
            this.Details = Details;
        }
        public int StatusCode { get; set; }
        public string Message { get; set; }
        public string Details { get; set; }
    }
}
