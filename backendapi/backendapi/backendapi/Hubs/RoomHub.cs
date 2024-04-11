using backendapi.Models;
using Microsoft.AspNetCore.SignalR;
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
        String info = $"Připojit se uživatel ${nickname}";
        Message message = new Message("", info);
        dbContext.Add(message);

        Room? room = dbContext.Rooms.FirstOrDefault(r => r.Id == roomId);
        if (room != null)
        {
            room.Messages.Add(message);
            dbContext.Update(room);
        }
        await dbContext.SaveChangesAsync();
        await Clients.All.SendAsync("UserConeected", nickname, roomId);
    }

    public async Task CreateRoom(string title, string description)
    {
        Room room = new Room(title, description);
        dbContext.Add(room);
        await dbContext.SaveChangesAsync();
        await Clients.All.SendAsync("Room changed", room.Id, title, description);
    }

    public async Task SendMessage(string messageText, string author, int roomId)
    {
        Message message = new Message(author, messageText);
        Room? room = dbContext.Rooms.FirstOrDefault(r => r.Id == roomId);
        if (room != null)
        {
            room.Messages.Add(message);
            dbContext.Update(room);
        }
        await dbContext.SaveChangesAsync();
        await Clients.All.SendAsync("New message", message, author, roomId);
    }

    public async Task LoadAllRooms()
    {
        List<Room> rooms = dbContext.Rooms.ToList();
        await Clients.Caller.SendAsync("AllRooms", rooms.ToJson());
    }

    public async Task LoadOldMessages(long roomId)
    {
        Room room = dbContext.Rooms.FirstOrDefault(r => r.Id == roomId);
        List<Message> messages = room.Messages.ToList();
        await Clients.Caller.SendAsync("OldMessages", room, messages.ToJson());
    }
}
