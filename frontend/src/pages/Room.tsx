import { useParams } from "react-router";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonInfiniteScroll,
    IonInput,
    IonItem,
    IonList,
    IonMenu,
    IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, { useEffect, useRef } from "react";
import Message from "../components/message/Message";
import toast from "react-hot-toast";
import { useConnectionContext } from "../ConnectionProvider";
import { Link } from "react-router-dom";

function Room({ name }: { name: string }) {
    const { id } = useParams();
    const messageRef = useRef<HTMLIonInputElement>(null); // Typování refu na HTMLIonInputElement
    const { messages, rooms, loadAllMessages, sendMessage, connectedNewUser, selectedRoom, setSelectedRoom } = useConnectionContext();
    const selectedRoomItem = id ? rooms.find((r) => r.id === parseInt(id)) : null;
    const contentRef = useRef<HTMLIonContentElement>(null);

    useEffect(() => {
        if (id) {
            setSelectedRoom(parseInt(id));
        }
    }, [id, selectedRoom, setSelectedRoom]);

    useEffect(() => {
        connectedNewUser(name);
        loadAllMessages();
        toast.success('Rooms loaded');
    }, [selectedRoom]);

    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.scrollToBottom(1);
        }
    }, [messages]);

    const handleSendMessage = () => {
        if (selectedRoomItem?.id && messageRef.current && messageRef.current.value) { // Ověření existence hodnoty
            sendMessage(messageRef.current.value as string, name);
            messageRef.current.value = ""; // Vynulování hodnoty pole po odeslání zprávy
        }
    };

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLIonInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    if (!selectedRoomItem) {
        return null;
    } else {
        return (
            <>
                <IonMenu contentId="main-content">
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Settings</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent className="ion-padding">
                        <IonMenuToggle>
                            <p>{selectedRoomItem.description}</p>
                            <Link to="/"><IonButton>Go back</IonButton></Link> {/* Opravený text tlačítka */}
                        </IonMenuToggle>
                    </IonContent>
                </IonMenu>

                <IonPage id="main-content">
                    <IonHeader>
                        <IonToolbar>
                            <IonButtons slot="start">
                                <IonMenuButton />
                            </IonButtons>
                            <IonTitle>{selectedRoomItem.name}</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent ref={contentRef}>
                        <IonInfiniteScroll>
                            <IonList>
                                {messages.map((message, index) => (
                                    <Message key={index} author={message.author} text={message.text} />
                                ))}
                            </IonList>
                        </IonInfiniteScroll>
                    </IonContent>
                    <IonFooter>
                        <IonToolbar>
                            <IonItem>
                                <IonInput placeholder="Message" onKeyDown={handleKeyPressed} ref={messageRef}></IonInput>
                                <IonButton onClick={handleSendMessage}>Send</IonButton>
                            </IonItem>
                        </IonToolbar>
                    </IonFooter>
                </IonPage>
            </>
        );
    }
}
export default Room;
