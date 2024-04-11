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
import React, {useState} from "react";
import Message from "../components/message/Message";
import {message} from "../types";

function Room() {
    const {id} = useParams();
    const [title, setTitle] = useState("Title");
    const [description, setDescription] = useState("Description");
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState<message[]>([{author:"Jan Přikryl", text:"Ahoj"}]);
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
                    <p>{description}</p>
                    <IonButton>To do</IonButton>
                </IonMenuToggle>
            </IonContent>
        </IonMenu>

    <IonPage id="main-content">
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{title}</IonTitle>
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
                    <IonInput placeholder="send"></IonInput>
                    <IonButton>Send</IonButton>
                </IonItem>
            </IonToolbar>
        </IonFooter>
    </IonPage>
        </>
    )
}
export default Room;