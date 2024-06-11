import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Divider, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Message } from './HomeScreen'
import handlerSetValues from 'react';
import { dbRealTime } from '../../configs/firebaseConfig'
import { ref, update } from 'firebase/database'
export const DetailMessageScreen = () => {
    //hook parametros mediante navegacion
    const route=useRoute();
    //@ts-ignore
    const {message}= route.params;
    //console.log(message);
    //hook use state: manipular el formulario
    const [editForm, setEditForm] = useState<Message>({
        id:'',
        to:'',
        subject:'',
        message:''
    })
    //hook use State: Mostar la informacion resivida en el formulario
    useEffect(() => {
        setEditForm(message)
    }, [])
    //hook navegacion
    const navigation = useNavigation();
    //cambiar datos de formularios
    const handlerSetValues=(key: string, value: string)=>{
        setEditForm({...editForm, [key]:value})
    }
    //actualizar el mensaje
    const handlerUpdateMessage= async ()=>{
        const dbRef =ref(dbRealTime, 'messages/'+editForm.id)
        await update(dbRef,{message: editForm.message, subject : editForm.subject})
        navigation.goBack();
    }
    
  return (
    <View style={styles.rootDetail}>
        <View>
        <Text style={styles.textDeatil} variant='headlineLarge'>Asunto: </Text>
            <TextInput
            value={editForm.subject}
            onChangeText={(value)=>handlerSetValues('subject', value)}
            />
        </View>
        <View>
            <Text variant='headlineSmall'>Para: {editForm.to}</Text>
            <Divider/>
        </View>
        <View style={{gap:20}}>
            <Text style={styles.textDeatil} variant='headlineLarge'>Mensaje: </Text>
            <TextInput
            value={editForm.message}
            multiline={true}
            numberOfLines={7}
            onChangeText={(value)=>handlerSetValues('message', value)}
            />
        </View>
        <Button mode='contained' icon={'email-sync'} onPress={handlerUpdateMessage}>Actualizar</Button>
        <Button mode='contained' icon={'email-remove'} onPress={()=>{}}>Eliminar</Button>
    </View>
  )
}
