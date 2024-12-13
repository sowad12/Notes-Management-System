using Core.Common.ViewModels;
using System.Net;

namespace Core.Common.ViewModels
{
    public class CustomExceptionViewModel : FailResponseViewModel
    {
        public CustomExceptionViewModel(string message = "error", HttpStatusCode code = HttpStatusCode.BadRequest)
        {
            Status = new StatusViewModel
            {
                Code = code,
                Message = message
            };
        }

    }
}
