import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem, Icon } from 'react-native-elements'
import { map } from "lodash";
import Modal from "../Modal";
import ChangeNameForm from "../Account/AccountOptionsModals/ChangeNameForm";
import ChangeEmailForm from "../Account/AccountOptionsModals/ChangeEmailForm";
import ChangePasswordForm from "../Account/AccountOptionsModals/ChangePasswordForm";

export default function AccountOptions(props) {
    const { userInfo, toastRef, setReloadUserInfo } = props;
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(false);
    const selectComponent = (key) => {
        switch (key) {
            case "Name":
                    setRenderComponent(
                        <ChangeNameForm 
                            name={userInfo.displayName}
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                            setReloadUserInfo={setReloadUserInfo}
                        />
                    );
                    setShowModal(true);
                break;
            case "Email":
                setRenderComponent(
                        <ChangeEmailForm 
                            email={userInfo.email}
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                            setReloadUserInfo={setReloadUserInfo}
                        />
                    )
                setShowModal(true);
                break;
                case "Password":
                    setRenderComponent(
                        <ChangePasswordForm 
                            setShowModal={setShowModal}
                            toastRef={toastRef}
                            setReloadUserInfo={setReloadUserInfo}
                        />
                    )

                    setShowModal(true);
                    break;
                    default: setRenderComponent(null);
                    setShowModal(false);
                break;
        }
        setShowModal(true);
    }
    const menuOptions = generateOptions(selectComponent);

    return (
        <View>
            {map(menuOptions, (menu, index) => (
                <ListItem 
                    key={index} 
                    bottomDivider 
                    onPress={menu.onPress}
                >
                    <Icon name={menu.iconName} type={menu.iconType} color={menu.iconColor} />
                    <ListItem.Content>
                        <ListItem.Title>{menu.title}</ListItem.Title>
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            ))
            }
                {renderComponent && (
                    <Modal isVisible={showModal} setIsVisible={setShowModal}>
                        {renderComponent}
                    </Modal> 
                )}
        </View>
    )
}

function generateOptions(selectComponent) {
    return [
        {
            title: "Cambiar Nombre y Apellido",
            iconType: "material-community",
            iconName: "account-circle",
            iconColor: "#ccc",
            onPress: () => selectComponent("Name")
        },
        {
            title: "Cambiar Email",
            iconType: "material-community",
            iconName: "at",
            iconColor: "#ccc",
            onPress: () => selectComponent("Email")
        },
        {
            title: "Cambiar Contraseña",
            iconType: "material-community",
            iconName: "lock-reset",
            iconColor: "#ccc",
            onPress: () => selectComponent("Password")
        }
    ]
}
const styles = StyleSheet.create({

});