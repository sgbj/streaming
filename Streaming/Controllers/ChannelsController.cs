using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Streaming.Data;
using Streaming.Models;
using System.Security.Claims;

namespace Streaming.Controllers;

[ApiController]
[Route("[controller]")]
public class ChannelsController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly StreamingOptions _options;

    public ChannelsController(ApplicationDbContext db, IOptions<StreamingOptions> options)
    {
        _db = db;
        _options = options.Value;
    }

    [Authorize]
    [HttpGet("streamkey")]
    public async Task<IActionResult> GetStreamKey()
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var user = await _db.Users.FindAsync(userId);
        return Ok(new { user.StreamKey });
    }

    [HttpGet("live")]
    public async Task<IActionResult> GetLiveChannels()
    {
        return Ok(await _db.Users
            .Where(u => u.StreamId != null)
            .Select(u => new
            {
                u.UserName,
                u.StreamId
            })
            .ToListAsync());
    }

    [HttpGet("{userName}")]
    public async Task<IActionResult> GetChannel(string userName)
    {
        return await _db.Users
            .Select(u => new
            {
                u.UserName,
                u.StreamId
            })
            .FirstOrDefaultAsync(u => u.UserName == userName)
            is object value ? Ok(value) : NotFound();
    }

    [HttpPost("publish")]
    public async Task<IActionResult> Publish()
    {
        var streamKey = Request.Form["name"].FirstOrDefault();
        var user = _db.Users.FirstOrDefault(u => u.StreamKey == streamKey);

        if (user is null)
        {
            return Unauthorized();
        }

        user.StreamId = Guid.NewGuid().ToString();
        await _db.SaveChangesAsync();

        return Redirect(user.StreamId);
    }

    [HttpPost("publish_done")]
    public async Task<IActionResult> PublishDone()
    {
        var streamKey = Request.Form["name"].FirstOrDefault();
        var user = _db.Users.FirstOrDefault(u => u.StreamKey == streamKey);

        if (user is null)
        {
            return Unauthorized();
        }

        if (user.StreamId is null)
        {
            return NotFound();
        }

        user.StreamId = null;
        await _db.SaveChangesAsync();

        return Ok();
    }
}
