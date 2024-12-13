using Library.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Model.Query
{
    public class GetNoteQuery
    {
        //public Guid Id { get; set; }
        public Guid UserId { get; set; }    
        public NoteType Type { get; set; }
    }
}
