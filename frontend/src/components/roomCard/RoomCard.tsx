import React from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import {Link} from "react-router-dom";
import {card} from "../../types";

function RoomCard({id, name, description}:card) {
    return (
        <IonCard>
            <IonCardHeader>
                <IonCardTitle>{name}</IonCardTitle>
                <IonCardSubtitle>{description}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <Link to={"/room/"+id}><IonButton>Connect</IonButton></Link>
            </IonCardContent>
        </IonCard>
    )
}
export default RoomCard;