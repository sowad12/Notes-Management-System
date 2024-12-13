using Library.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Model.Command
{
    public class NoteCommand
    {
        public Guid UserId { get; set; }
        public NoteType Type { get; set; }  
        public string? NoteText { get; set; }  
        public string? Url { get; set; }  
        public DateTime? InputDate { get; set; }  
        public bool IsComplete { get; set; }
    }

}
