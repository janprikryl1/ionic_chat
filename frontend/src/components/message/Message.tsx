import {IonAvatar, IonItem, IonLabel} from "@ionic/react";
import {message} from "../../types";
import style from "./message.module.scss";

function Message({author, text}:message) {
    return (
        <IonItem>
            {author ? (
                <>
                    <IonAvatar slot="start">
                        <img alt={author} src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                    </IonAvatar>
                    <small className={style.message}>{author}</small>
                </>
            ):null}
            <IonLabel>{text}</IonLabel>
        </IonItem>
    )
}

export default Message;