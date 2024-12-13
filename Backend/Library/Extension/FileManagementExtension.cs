//using Library.Model.ViewModel;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace Library.Extension
//{
//    public static class FileManagementExtension
//    {
//        public static bool IsNumeric(this string str)
//        {
//            if (string.IsNullOrEmpty(str))
//                return false;

//            foreach (char c in str)
//            {
//                if (!char.IsDigit(c))
//                    return false;
//            }
//            return true;
//        }


//        //public void SaveSignupJson(SignupViewModel settings, string fileName)
//        //{
//    bool folderExists2 = Directory.Exists(Path.Combine(_environment.WebRootPath, "temp-user"));
//    if (!folderExists2)
//        Directory.CreateDirectory(Path.Combine(_environment.WebRootPath, "temp-user"));

//    string path = Path.Combine(_environment.WebRootPath, "temp-user", fileName + ".json");
//    _logger.LogError($"Save SignupJson path==>{path}");

//    string jsonString = JsonConvert.SerializeObject(settings);
//    System.IO.File.WriteAllText(fileName, jsonString);

//    //using (var stream = new FileStream(path, FileMode.Create))
//    //{
//    //    string output = JsonConvert.SerializeObject(settings);
//    //    await output.CopyToAsync(stream);
//    //}

//    using (StreamWriter writer = System.IO.File.CreateText(path))
//    {
//        string output = JsonConvert.SerializeObject(settings);
//        writer.Write(output);
//    }
//        //}

//        public static UserViewModel ReadSignupJson(string fileName)
//        {
//            string path = Path.Combine(_environment.WebRootPath, "temp-user", fileName + ".json");
//            UserViewModel signup = new SignupViewModel();
//            if (System.IO.File.Exists(path))
//            {
//                using (var reader = System.IO.File.OpenText(path))
//                {
//                    var fileText = reader.ReadToEnd();
//                    signup = JsonConvert.DeserializeObject<UserViewModel>(fileText);
//                }
//            }
//            return signup;
//        }


//        //public void DeleteSignupJson(string fileName)
//        //{
//        //    string path = Path.Combine(_environment.WebRootPath, "temp-user", fileName + ".json");

//        //    if (System.IO.File.Exists(path))
//        //    {
//        //        System.IO.File.Delete(path);
//        //    }
//        //}
//    }
//}
