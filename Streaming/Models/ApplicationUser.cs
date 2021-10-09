using Microsoft.AspNetCore.Identity;

namespace Streaming.Models;

public class ApplicationUser : IdentityUser
{
    public ApplicationUser()
    {
        StreamKey = Guid.NewGuid().ToString();
    }

    public string StreamKey { get; set; }
    public string? StreamId { get; set; }
}
