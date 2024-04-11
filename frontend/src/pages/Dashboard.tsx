import React, {ChangeEvent, useState} from "react";
import {
    InputChangeEventDetail,
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

function Dashboard () {
    const [rooms, setRooms] = useState<card[]>([{id:1, title:"a", desription:"b"}]);

    const [name, setName] = useState("");
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

                {name !== "" ? rooms?.map((room) => (
                    <RoomCard id={room.id} title={room.title} desription={room.desription} key={room.id}/>
                )) : null}

            </IonContent>
        </IonPage>
    )
}

export default Dashboard;