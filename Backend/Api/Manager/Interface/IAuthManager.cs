using Library.Model.Command;
using Library.Model.ViewModel;

namespace Api.Manager.Interface
{
    public interface IAuthManager
    {
        Task<dynamic> Register(RegisterCommand registerModel);
        Task<dynamic> Login(LoginCommand loginModel);
        Task<bool> Logout();
    }
}
