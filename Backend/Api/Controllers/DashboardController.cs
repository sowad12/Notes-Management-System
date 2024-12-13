using Api.Manager.Interface;
using Core.Common.Extensions;
using Library.Model.Command;
using Library.Model.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    [ApiController]
    [ApiVersion("1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly INoteManager _noteManager;
        public DashboardController(INoteManager noteManager)
        {
            _noteManager=noteManager;
        }

        [HttpGet("get-notes")]
        public async Task<IActionResult> GetNotes([FromQuery] GetNoteQuery getNoteQuery)
        {
            var res = await _noteManager.GetNotes(getNoteQuery).AsSuccess();
            return Ok(res);
        }

        [HttpGet("filter-notes")]
        public async Task<IActionResult> FilterNotes([FromQuery] FilterNoteQuery query)
        {
            var res = await _noteManager.FilterNotes(query).AsSuccess();
            return Ok(res);
        }


        [HttpPost("create-note")]
        public async Task<IActionResult> CreateNote([FromBody] NoteCommand  noteCommand)
        {
            var res = await _noteManager.CreateNote(noteCommand).AsCreated();
            return Ok(res);
        }

        [HttpDelete("delete-note/{id}")]
        public async Task<IActionResult> DeleteNote([FromRoute] Guid id)
        {
            var res = await _noteManager.DeleteNoteById(id).AsSuccess();
            return Ok(res);
        }



    }
}
