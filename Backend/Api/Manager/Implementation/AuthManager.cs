using Api.Manager.Interface;
using Api.Service;
using Core.Common.Exceptions;
using Library.Enums;
using Library.Model.Command;
using Library.Model.Response;
using Library.Model.ViewModel;
using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;
using System.IO;
using System.Net;
using System.Reflection;

namespace Api.Manager.Implementation
{
    public class AuthManager : IAuthManager
    {

        private readonly IFileManager _fileManager;
        private readonly JwtService _jwtService;
        public AuthManager(IFileManager fileManager, JwtService jwtService)
        {
            _fileManager = fileManager;
            _jwtService = jwtService;
        }
        public async Task<dynamic> Login(LoginCommand loginModel)
        {
            try
            {
                var users = await _fileManager.ReadJson<UserViewModel>(FilePathType.Users.ToString());
                var user = users.FirstOrDefault(u => u.Email == loginModel.Email && u.Password == loginModel.Password);
                if (user == null)
                {
                    throw new CustomException("Please enter valid creditianls", HttpStatusCode.Unauthorized);    
                }

                var token = await _jwtService.CreateJWT(user);
                var loginReponse = new LoginResponse()
                {
                    Id = user.Id,
                    Email = loginModel.Email,
                    Token = token,
                };
                return loginReponse;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Task<bool> Logout()
        {
            throw new NotImplementedException();
        }

        public async Task<dynamic> Register(RegisterCommand registerModel)
        {
            try
            {
                var users = await _fileManager.ReadJson<UserViewModel>(FilePathType.Users.ToString());

                if (users.Any(u => u.Email == registerModel.Email))
                {
                    throw new CustomException("Email already exists.", HttpStatusCode.BadRequest);
                }
                var user = new UserViewModel()
                {
                    Name = registerModel.Name,
                    Email = registerModel.Email,
                    Password = registerModel.Password,
                    DateOfBirth = registerModel.DateOfBirth,
                };
                users.Add(user);
                var res = await _fileManager.SaveJson<UserViewModel>(users, FilePathType.Users.ToString());
                return user;

            }
            catch (CustomException ex)
            {
                throw;
            }
            catch (Exception ex)
            {

                throw new CustomException("internal server error.", HttpStatusCode.InternalServerError); ;
            }

        }
    }
}
