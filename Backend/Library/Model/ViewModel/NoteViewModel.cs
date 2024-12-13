using Library.Model.Command;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Library.Model.ViewModel
{
    public class NoteViewModel:NoteCommand
    {
        public Guid Id { get; set; } = Guid.NewGuid();
    }
}
