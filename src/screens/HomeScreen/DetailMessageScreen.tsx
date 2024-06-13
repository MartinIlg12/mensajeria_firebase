
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Message } from './HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime } from '../../configs/firebaseConfig';

export const DetailMessageScreen = () => {
    //hook para capturar los parametros mediante navegación
    const route = useRoute();
    //@ts-ignore
    const { message } = route.params;
    //console.log(message);

    //hook useState: manipular el formulario
    const [editFormMessage, setEditFormMessage] = useState<Message>({
        id: '',
        to: '',
        subject: '',
        message: ''
    })

    //hook useEffect: Mostrar la información recibida en el formulario
    useEffect(() => {
        setEditFormMessage(message)
    }, [])

    //hook navegación
    const navigation = useNavigation();

    //Funición: cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        setEditFormMessage({ ...editFormMessage, [key]: value })
    }

    //Función actualizar la data del mensaje
    const handlerUpdateMessage = async () => {
        //1. Referencia a al BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' + editFormMessage.id)
        //2. Actualizar data
        await update(dbRef, { message: editFormMessage.message })
        navigation.goBack();
    }

    //Función eliminar la data del mensaje
    const handlerDeleteMessage = async () => {
        //1. Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' + editFormMessage.id)
        //2. Eliminar data
        await remove(dbRef);
        navigation.goBack();
    }

    return (
        <View style={styles.rootDetail}>
            <View>
                <Text variant='headlineSmall'>Asunto: {editFormMessage.subject}</Text>
                <Divider />
            </View>
            <View>
                <Text variant='bodyLarge'>Para: {editFormMessage.to}</Text>
                <Divider />
            </View>
            <View style={{ gap: 20 }}>
                <Text style={styles.textDeatil}>Mensaje</Text>
                <TextInput
                    value={editFormMessage.message}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(value) => handlerSetValues('message', value)} />
            </View>
            <Button
                mode='contained'
                icon='email-sync'
                onPress={handlerUpdateMessage}>Actualizar</Button>
            <Button
                mode='contained'
                icon='email-remove'
                onPress={handlerDeleteMessage}>Eliminar</Button>
        </View>
    )
}
