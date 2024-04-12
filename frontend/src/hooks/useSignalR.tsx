import { HttpTransportType, HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {apiUrl} from "../constatants";
import {card, message} from "../types";

export const useSignalR = () => {
    const [connection, setConnection] = useState<HubConnection>();
    const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
    const [rooms, setRooms] = useState<card[]>([]);
    const [messages, setMessages] = useState<message[]>([]);

    useEffect(() => {
        const connect = new HubConnectionBuilder()
            .withUrl(apiUrl, {
                skipNegotiation: true,
                transport: HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build();
        setConnection(connect);
    }, []);

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    void connection.send('LoadAllRooms');
                    connection.on('AllRooms', (rooms: string) => {console.log(rooms)
                        const room_list = JSON.parse(rooms) as card[];
                        setRooms(room_list);
                        return;
                    });
                    connection.on('OldMessages', (room: number, messages: string) => {console.log(messages)
                        //toast.error("Room doesn't exists anymore");
                        if (selectedRoom === room) {
                            const message_list = JSON.parse(messages) as message[];
                            setMessages(message_list);
                            return;
                        }
                    });

                    connection.on('New message', (message: string, author: string, room: number) => {
                        if (selectedRoom == room) {
                            const m: message = {author: author, text: message};
                            setMessages([...messages, m]);
                            return;
                        }
                    });

                    connection.on('RoomCreated', (roomId: number, title: string, description: string) => {
                        const room:card = {name: title, description: description, id:roomId};
                        if (room && rooms?.length) {
                            setRooms([...rooms, room]);
                        } else {
                            setRooms([room]);
                        }

                    });

                    connection.on('UserConeected', (nickname: string, roomId: number) => {
                       const m: message = {author:'sys', text:'Připojil se nový uživatel '+nickname};
                        setMessages([...messages, m]);
                    });

                })
                .catch((error) => {
                    console.log(error);
                    toast('Error while loading');
                });
        }
    }, [connection]);

    return { connection, rooms, messages, selectedRoom, setSelectedRoom };
};
