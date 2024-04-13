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
                    connection.on('AllRooms', (rooms: string) => {
                        const room_list = JSON.parse(rooms) as card[];
                        setRooms(room_list);
                        return;
                    });


                    connection.on('RoomCreated', (roomId: number, title: string, description: string) => {
                        const room:card = {name: title, description: description, id:roomId};
                        setRooms(prevRooms => [...prevRooms, room]);
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast('Error while loading');
                });
        }
    }, [connection]);

    useEffect(() => {
        if (connection) {
            connection.on('OldMessages', (room: number, messages: string) => {
                if (selectedRoom === room) {
                    const message_list = JSON.parse(messages);
                    setMessages(message_list);
                }
            });

            connection.on('New message', (author: string, text: string, room: number) => {
                if (selectedRoom === room) {
                    const message: message = {author:author, text:text};
                    setMessages(prevMessages => [...prevMessages, message]);
                    return;
                }
            });

            connection.on('UserConeected', (nickname: string, roomId: number) => {
                if (selectedRoom === roomId) {
                    const m: message = {author:'sys', text:'Připojil se nový uživatel '+nickname};
                    setMessages(prevMessages => [...prevMessages, m]);
                }
            });
        }
    }, [connection, selectedRoom]);

    return { connection, rooms, messages, selectedRoom, setSelectedRoom };
};
