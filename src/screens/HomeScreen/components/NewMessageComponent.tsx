import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text,TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import {dbRealTime} from '../../../configs/firebaseConfig'
import handlerSetValues from 'react';
import { push, ref, set } from 'firebase/database';
//crear interfaz de props
interface Props{
  showModalMessage:boolean;
  setShowModalMessage: Function;
}
//interfas de formulario de mensajes
interface FormMessage{
  to: string;
  subject:string;
  message:string;
}
export const NewMessageComponent = ({showModalMessage, setShowModalMessage}: Props) => {
  const[forMessage, setFormMessage]=useState<FormMessage>({
    to:'',
    subject:'',
    message:'',
  })
  //funcion cambiar los datos del formulario
  const handlerSetValues=(key: string, value: string)=>{
      setFormMessage({...forMessage, [key]:value })
  }
  //guardar los mensajes
  const handlerSaveMessage = async()=>{
    if(!forMessage.to || !forMessage.subject || !forMessage.message){
      return;
    }
    //console.log(forMessage);
    //Almacenar los datos en db
    //1.Crear la referencia a la base de datos-nombre Tabla
    const dbRef = ref(dbRealTime, 'messages');
    //2. crear coleccion - mensajes
    const saveMessage = push(dbRef);
    //guardar mensajes
    try{
      await set(saveMessage, forMessage);
      //limpiar el formulario
      setFormMessage({
        message:'',
        subject:'',
        to:''
      })
    }catch (ex){
      console.log(ex)
    }
    setShowModalMessage(false);
  }
  return (
    <Portal>
        <Modal visible={showModalMessage} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant='headlineMedium'>Nuevo Mensaje</Text>
            <View style={styles.iconEnd}>
                <IconButton 
                icon='close-circle-outline'
                size={30}
                onPress={()=>{
                  setShowModalMessage(false)
                }}/>          
            </View>
          </View>
          <Divider/>
          < TextInput
            label='Para'
            mode='outlined'
            onChangeText={(value)=>handlerSetValues('to',value)}
          />
          < TextInput
            label='Asunto'
            mode='outlined'
            onChangeText={(value)=>handlerSetValues('subject', value)}
          />
          < TextInput
            label='Mensaje'
            mode='outlined'
            numberOfLines={7}
            onChangeText={(value)=>handlerSetValues('message', value)}
          />
          <Button mode='contained' onPress={handlerSaveMessage}>Enviar</Button>
        </Modal>
    </Portal>
  )
}
