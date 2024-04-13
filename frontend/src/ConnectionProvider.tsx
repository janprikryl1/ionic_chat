import {FC, ReactNode, createContext, useContext} from 'react';
import {useSignalR} from "./hooks/useSignalR";
import toast from "react-hot-toast";
import {card, message} from "./types";


export type ConnectionContext = {
    rooms: card[],
    messages: message[],
    loadAllMessages: () => void;
    sendMessage: (messageText: string, author: string) => void;
    createRoom: (title: string, description: string) => void;
    connectedNewUser: (nickname: string) => void;
    selectedRoom: number | null;
    setSelectedRoom: (newRoom: number) => void;
};

const ConnectionProvicerContext = createContext<ConnectionContext | undefined>(undefined);

type Props = {
    children: ReactNode;
};

export const ConnectionProvider: FC<Props> = ({ children }) => {
    const { connection, rooms, messages, selectedRoom, setSelectedRoom } = useSignalR();

    const loadAllMessages = async () => {
        if (connection) {
            try {
                void connection.send('LoadOldMessages', selectedRoom);
            } catch (error) {
                console.log(error);
                toast.error("Error while loading messages. Check internet connection");
            }
        }
    };

    const sendMessage = async (messageText: string, author: string) => {
        if (connection) {
            try {
                void connection.send('SendMessage', messageText, author, selectedRoom);
            } catch (error) {
                console.log(error);
                toast.error("Error while reciving old messages");
            }
        }
    }

    const createRoom = async (name: string, description: string) => {
        if (connection) {
            try {
                void connection.send('CreateRoom', name, description);
            } catch (error) {
                console.log(error);
                toast.error("Error while creating room");
            }
        }
    }

    const connectedNewUser = async (nickname: string) => {
        if (connection) {
            try {
                void connection.send('ConnectedNewUser', nickname, selectedRoom);
            } catch (error) {
                console.log(error);
                toast.error("Error while connecting to room.");
            }
        }
    }


    const value: ConnectionContext = {
        rooms,
        messages,
        loadAllMessages,
        sendMessage,
        createRoom,
        connectedNewUser,
        selectedRoom,
        setSelectedRoom
    };

    return <ConnectionProvicerContext.Provider value={value}>{children}</ConnectionProvicerContext.Provider>;
};

export function useConnectionContext() {
    const projectsScreensPage = useContext(ConnectionProvicerContext);
    if (!projectsScreensPage) {
        throw new Error('useContextProvider must be used with ProjectsScreenPageContext');
    }
    return projectsScreensPage;
}
