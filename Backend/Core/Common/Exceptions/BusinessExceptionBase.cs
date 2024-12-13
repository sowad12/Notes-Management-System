
using Core.Common.ViewModels;
using System.Net;


namespace Core.Common.Exceptions
{
    public abstract class BusinessExceptionBase:Exception
    {
        public HttpStatusCode StatusCode { get; private set; }

        public BusinessExceptionBase(HttpStatusCode statusCode) : this(string.Empty, statusCode)
        { }

        public BusinessExceptionBase(string message, HttpStatusCode statusCode) : base(message)
        {
            StatusCode = statusCode;
        }

        public abstract FailResponseViewModel EmitResult(string message);
    }
}
