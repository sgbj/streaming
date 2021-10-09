using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Streaming.Models;

namespace Streaming.Hubs;

public class ChatHub : Hub
{
    private readonly UserManager<ApplicationUser> _userManager;

    public ChatHub(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task JoinChannel(string channelName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, channelName);
    }

    [Authorize]
    public async Task SendMessage(string channelName, string message)
    {
        var user = await _userManager.FindByIdAsync(Context.UserIdentifier);
        await Clients.Group(channelName).SendAsync("ReceiveMessage", user.UserName, message);
    }
}
