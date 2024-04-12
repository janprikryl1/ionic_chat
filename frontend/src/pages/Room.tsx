import {useParams} from "react-router";
import {
    IonButton,
    IonButtons,
    IonContent, IonFooter,
    IonHeader, IonInfiniteScroll, IonInput, IonItem, IonList,
    IonMenu, IonMenuButton,
    IonMenuToggle,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useEffect, useState} from "react";
import Message from "../components/message/Message";
import toast from "react-hot-toast";
import {useConnectionContext} from "../ConnectionProvider";
import {Link} from "react-router-dom";

function Room({name}: {name: string}) {
    const {id} = useParams();
    const [newMessageText, setNewMessageText] = useState("");
    const {messages, rooms, loadAllMessages, sendMessage, connectedNewUser, selectedRoom, setSelectedRoom} = useConnectionContext();
    const selectedRoomItem = id ? rooms.find((r) => r.id === parseInt(id)) : null;

    useEffect(() => {
        if (id) {
            setSelectedRoom(parseInt(id));
            connectedNewUser(name);
            loadAllMessages();
        }
    }, [id, name, selectedRoom]);

    useEffect(() => {
        toast.success('Rooms loaded');
    }, []);

    const handleSendMessage = () => {
        if (selectedRoomItem?.id) {
            sendMessage(newMessageText, name);
            setNewMessageText("");
        }

    }

    if (!selectedRoomItem) {
        return null
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
                            <Link to="/"><IonButton>Go bak</IonButton></Link>
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
                    <IonContent>
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
                                <IonInput placeholder="Zpráva" value={newMessageText} onIonChange={(e) => setNewMessageText(e.detail.value ? e.detail.value : "")}></IonInput>
                                <IonButton onClick={handleSendMessage}>Send</IonButton>
                            </IonItem>
                        </IonToolbar>
                    </IonFooter>
                </IonPage>
            </>
        )
    }
}
export default Room;