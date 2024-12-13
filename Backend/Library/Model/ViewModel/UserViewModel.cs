using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Library.Model.Command;

namespace Library.Model.ViewModel
{
    public class UserViewModel : RegisterCommand
    {
        public Guid Id { get; set; } = Guid.NewGuid();

    }
}
