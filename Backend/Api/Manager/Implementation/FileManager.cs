using Api.Manager.Interface;
using Library.Model.ViewModel;
using Newtonsoft.Json;
using System.IO;

namespace Api.Manager.Implementation
{
    public class FileManager : IFileManager
    {
        private readonly IWebHostEnvironment _environment;
        private readonly string _filePath;      
        public FileManager(IConfiguration configuration)
        {        
            var projectRoot = Directory.GetParent(AppContext.BaseDirectory)?.Parent?.Parent?.Parent?.FullName;
            if (projectRoot == null)
            {
                throw new Exception("Unable to resolve the project root directory.");
            }        
            _filePath = Path.Combine(projectRoot, configuration["FileStoragePath"]);

            if (!Directory.Exists(_filePath))
            {
                Directory.CreateDirectory(_filePath);
            }
        }

        public async Task<bool> DeleteJson(string filePath)
        {
            try
            {
                string path = Path.Combine(_filePath, "temp", $"{filePath}.json");

                if (System.IO.File.Exists(path))
                {
                    System.IO.File.Delete(path);
                }
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<T>> ReadJson<T>(string filePath)
        {
            try
            {
                string path = Path.Combine(_filePath, "temp", $"{filePath}.json");
                var dataList= new List<T>();
                if (System.IO.File.Exists(path))
                {
                    using (var reader = System.IO.File.OpenText(path))
                    {
                        var fileText = reader.ReadToEnd();
                        dataList = JsonConvert.DeserializeObject<List<T>>(fileText);
                    }
                }
                return dataList;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public async Task<bool> SaveJson<T>(List<T> data, string filePath)
        {
            try
            {

                string directoryPath = Path.Combine(_filePath, "temp");
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath); 
                }

                string path = Path.Combine(directoryPath, $"{filePath}.json");

              
                string jsonString = JsonConvert.SerializeObject(data);

                // Write the JSON string to the file
                File.WriteAllText(path, jsonString); 

                return true;                
            }
            catch
            {
                throw;
            }
     
        }
    }
}
