using backendapi.Models;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using NuGet.Protocol;
using System;

namespace backend;

public class RoomHub : Hub
{
    private readonly RoomContext dbContext;

    public RoomHub(RoomContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public async Task ConnectedNewUser(string nickname, long roomId)
    {
        String info = "Připojit se uživatel "+nickname;
        Message message = new Message("", info, roomId);
        dbContext.Add(message);

        await dbContext.SaveChangesAsync();
        await Clients.All.SendAsync("UserConeected", nickname, roomId);
    }

    public async Task CreateRoom(string name, string description)
    {
        Room room = new Room(name, description);
        dbContext.Add(room);
        await dbContext.SaveChangesAsync();
        await Clients.All.SendAsync("RoomCreated", room.id, name, description);
    }

    public async Task SendMessage(string messageText, string author, int roomId)
    {
        Message message = new Message(author, messageText, roomId);
        dbContext.Add(message);
        await dbContext.SaveChangesAsync();
        await Clients.All.SendAsync("New message", author, messageText, roomId);
    }

    public async Task LoadAllRooms()
    {
        List<Room> rooms = dbContext.Rooms.ToList();
        await Clients.Caller.SendAsync("AllRooms", rooms.ToJson());
    }

    public async Task LoadOldMessages(long roomId)
    {
        List<Message> messages = dbContext.Messages.Where(m => m.roomId == roomId).ToList();
        await Clients.Caller.SendAsync("OldMessages", roomId, JsonConvert.SerializeObject(messages));
    }
}
