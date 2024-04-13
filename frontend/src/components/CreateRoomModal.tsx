import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonModal,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useRef, useState} from "react";
import {OverlayEventDetail} from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import {useConnectionContext} from "../ConnectionProvider";
import toast from "react-hot-toast";

export const CreateRoomModal = () => {
    const modal = useRef<HTMLIonModalElement>(null);
    const input = useRef<HTMLIonInputElement>(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const {createRoom} = useConnectionContext();

    function confirm() {
        modal.current?.dismiss(input.current?.value, 'confirm');
    }

    function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
        if (ev.detail.role === 'confirm') {
            createRoom(name, description);
            toast.success("Creating")
        }
    }

  return (
      <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
              <IonToolbar>
                  <IonButtons slot="start">
                      <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
                  </IonButtons>
                  <IonTitle>Create new room</IonTitle>
                  <IonButtons slot="end">
                      <IonButton strong={true} onClick={() => confirm()}>
                          Create
                      </IonButton>
                  </IonButtons>
              </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
              <IonItem>
                  <IonInput
                      label="Name"
                      labelPlacement="stacked"
                      ref={input}
                      type="text"
                      placeholder="Name of room"
                      value={name}
                      onIonChange={(e) => setName(e.detail.value ? e.detail.value : "")}
                  />
              </IonItem>
              <IonItem>
                  <IonInput
                      label="Description"
                      labelPlacement="stacked"
                      ref={input}
                      type="text"
                      placeholder="Description of room"
                      value={description}
                      onIonChange={(e) => setDescription(e.detail.value ? e.detail.value : "")}
                  />
              </IonItem>
          </IonContent>
      </IonModal>
  )
}