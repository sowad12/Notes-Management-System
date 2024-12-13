using Api.Manager.Interface;
using Core.Common.Exceptions;
using Library.Enums;
using Library.Model.Command;
using Library.Model.Query;
using Library.Model.ViewModel;

namespace Api.Manager.Implementation
{
    public class NoteManager : INoteManager
    {
        private readonly IFileManager _fileManager;
        public NoteManager(IFileManager fileManager)
        {
            _fileManager = fileManager;
        }
        public async Task<dynamic> CreateNote(NoteCommand noteCommand)
        {
            var notes = await _fileManager.ReadJson<NoteViewModel>(FilePathType.Notes.ToString());
            var note = new NoteViewModel()
            {
                UserId = noteCommand.UserId,
                Type = noteCommand.Type,
                NoteText = noteCommand.NoteText,
                Url = noteCommand.Url,
                InputDate = noteCommand.InputDate,
                IsComplete = noteCommand.IsComplete
            };
            notes.Add(note);
            var res = await _fileManager.SaveJson<NoteViewModel>(notes, FilePathType.Notes.ToString());
            if (res)
            {
                return note;
            }
            throw new CustomException("failed to save note", System.Net.HttpStatusCode.InternalServerError);

        }

        public async Task<dynamic> DeleteNoteById(Guid id)
        {
            var notes = await _fileManager.ReadJson<NoteViewModel>(FilePathType.Notes.ToString());
            var res = notes.Where(x => x.Id!=id).ToList();
                  
            var isDelete = await _fileManager.SaveJson<NoteViewModel>(res, FilePathType.Notes.ToString());
            
            if (isDelete)
            {
                return "note delete successfully ";
            }
            throw new CustomException("failed to delete", System.Net.HttpStatusCode.InternalServerError);
           
        }

        public async Task<dynamic> FilterNotes(FilterNoteQuery query)
        {
       
            DateTime startDate = DateTime.MinValue;
            DateTime endDate = DateTime.MaxValue;

            if (query.DateType == DateType.Today)
            {
                startDate = DateTime.Now.Date;
                endDate = startDate.AddDays(1);
            }
            else if (query.DateType == DateType.Week)
            {
                // Adjust to start from Saturday
                int currentDayOfWeek = (int)DateTime.Now.DayOfWeek; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
                int daysToSaturday = (currentDayOfWeek + 1) % 7;    // Distance to the last Saturday
                startDate = DateTime.Now.Date.AddDays(-daysToSaturday); // Go back to the last Saturday
                endDate = startDate.AddDays(7); 
            }

            else if (query.DateType == DateType.Month)
            {
                startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                endDate = startDate.AddMonths(1);
            }

            var notes = await _fileManager.ReadJson<NoteViewModel>(FilePathType.Notes.ToString());
            var res = notes.Where(x => x.UserId == query.UserId &&
                                       x.Type == query.Type &&
                                       x.InputDate >= startDate &&
                                       x.InputDate < endDate);

            return res;
        }


        public async Task<dynamic> GetNotes(GetNoteQuery getNoteQuery)
        {
            var notes = await _fileManager.ReadJson<NoteViewModel>(FilePathType.Notes.ToString());
            var res = notes.Where(x => x.UserId == getNoteQuery.UserId && x.Type == getNoteQuery.Type);
            return res;
            
        }
    }
}
