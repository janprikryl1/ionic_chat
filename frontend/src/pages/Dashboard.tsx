import React, {ChangeEvent, useState} from "react";
import {
    InputChangeEventDetail, IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {card} from "../types";
import RoomCard from "../components/roomCard/RoomCard";
import {useConnectionContext} from "../ConnectionProvider";

function Dashboard({ name, setName }: { name: string, setName: (newName: string) => void }) {
    const {rooms} = useConnectionContext();

    const handleNameChange = (e:CustomEvent<InputChangeEventDetail>) => {
        if (typeof e.detail.value === "string") {
            setName(e.detail.value);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Chat with ionic, dotnet</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonItem>
                    <IonInput label="Your name" value={name} onIonChange={handleNameChange}></IonInput>
                </IonItem>

                {rooms?.map((room: card, index) => (
                    <RoomCard id={room.id} name={room.name} description={room.description} key={index}/>
                ))}

                <IonButton disabled>Create room</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default Dashboard;