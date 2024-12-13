using Library.Model.Command;
using Library.Model.Query;

namespace Api.Manager.Interface
{
    public interface INoteManager
    {
        Task<dynamic> GetNotes(GetNoteQuery getNoteQuery);
        Task<dynamic> CreateNote(NoteCommand noteCommand);
        Task<dynamic> FilterNotes(FilterNoteQuery query);
        Task<dynamic> DeleteNoteById(Guid id);

    }
}
