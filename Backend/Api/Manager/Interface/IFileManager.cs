using Library.Model.ViewModel;

namespace Api.Manager.Interface
{
    public interface IFileManager
    {
        Task<List<T>> ReadJson<T>(string filePath);
        Task<bool> SaveJson<T>(List<T> data, string filePath);
        Task<bool> DeleteJson(string filePath);
    }
}
