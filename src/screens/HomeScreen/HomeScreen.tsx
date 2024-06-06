import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import  firebase, { updateProfile }  from 'firebase/auth';
import { auth } from '../../configs/firebaseConfig';
import handlerSetValues from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { MessageCardComponent } from './components/MessageCardComponent';
//interfaz - formulario del perfil
interface FormUser{
  name: string;
}
//interfaz *- mensajes
interface Message{
  id: string;
  to: string;
  subject: string;
  message: string;
}
export const HomeScreen = () => {
  //hook use state : manipular el formulario del perfil de usuario
  const [formUser, setFormUser] = useState<FormUser>({
    name:'',
  });
  //hook useState: 
  const [message, setMessage] = useState<Message[]>([
    {id:'1', to: 'Martin Ilguan', subject:'Estudiar', message:'Estudiar para el Jueves!'}
  ])
  //hook UseState: capturar la data del usuario logeado
  const [userUth, setUserAuth]=useState<firebase.User | null>(null);
  //useEffect: capturas la datta e¿del usuario
  useEffect(() => {
    setUserAuth(auth.currentUser)
    setFormUser({name: auth.currentUser?.displayName ?? ""})
    //console.log(auth.currentUser)
      },
      [])
  //Hook useState_: Mostrar u ocultar el modal
  const [showModalProfile, setShowModalProfile] = useState<boolean>(false)
  //funcion cambiar valores
  const handlerSetValues=(key: string, value: string)=>{
    setFormUser({...formUser,[key]:value})
  }
  //funcion actualizar la data
  const handlerUpdateUser=async()=>{
    await updateProfile(userUth!,{
      displayName:formUser.name
    })
    setShowModalProfile(false);
  }
  return (
    <>
    <View style={styles.routeHome}>
      <View style={styles.header}>
        <Avatar.Text 
        size={24} label="MI"/>
        <View>
          <Text variant='bodySmall'>Bienvenido</Text>
          <Text variant='labelLarge'>{userUth?.displayName}</Text>
          </View>
          <View style={styles.iconEnd}>
          <IconButton
                icon="account-edit"
                size={30}
                mode='contained'
                onPress={() => {setShowModalProfile(true)}}
                />
          </View>
        </View>
        <View>
              <FlatList
                data={message}
                renderItem={({item}) =><MessageCardComponent/>}
                keyExtractor={item => item.id}
            />
        </View>
    </View>
    <Portal>
        <Modal visible={showModalProfile}  contentContainerStyle={styles.modalProfile}>
          <View style={styles.header}>
            <Text variant='headlineMedium'>Mi perfil</Text>
            <View style={styles.iconEnd}>
              <IconButton icon='close-circle-outline' size={30} onPress={()=>setShowModalProfile(false)}/>
            </View>
          </View>
          <Divider/>
          <TextInput 
          mode='outlined'
          label='Nombre'
          value={formUser.name}
          onChangeText={(value)=>handlerSetValues('name', value)}>
          
          </TextInput><TextInput 
          mode='outlined'
          label='Correo'
          value={userUth?.email!}
          disabled>
          </TextInput>
          <Button mode='contained' onPress={handlerUpdateUser}>
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB 
        style={styles.fabMessage}
        icon="plus"
        onPress={() => console.log('Pressed')}
        />
    </>
  )
}
