import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import handlerSetValues from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';
//Interface - formulario registro
interface FormRegister{
    email: string;
    password: string;
}
//Interface - Snackbar message
interface MessageSnackBar{
    visible: boolean;
    message: string;
    color: string;
}
export const RegisterScreen = () => {
    //hook useState: cambiar el estado del formulario
    const [formRegister, setRegister] = useState<FormRegister>({
        email:'',
        password:''
    });
     //hook visualizar contraseña
     const [hiddenPassword, setHiddenPassword] = useState<boolean>(true)
    //Visualizart u ocultar el mensaje
    const [showMessage, setShowMessage] = useState<MessageSnackBar>({
        visible: false,
        message: '',
        color: '#ffff',
    });
    //funcion para cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) =>{
        setRegister({...formRegister, [key]:value })
    }
    //hook navigation
    const navigation = useNavigation()
    //funcion para enviar y crear al usuario
    const handlerFormRegister = async() =>{
        //validar que existe datos en el formulario
        if(!formRegister.email || !formRegister.password){
            setShowMessage({visible: true,
                message: 'Completa todos los campos',
                color: '#8f0e2a'
            });
            return;
        }
        //console.log(formRegister);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password,
            );
            setShowMessage({
                visible:true,
                message: 'Registro exitoso',
                color: '#2e7821'
            });
            //console.log(response)
        } catch (ex) {
            setShowMessage({
                visible:true,
                message: 'No se logró registrar. Intentalo más tarde',
                color: '#8f0e2a'
            })
            console.log(ex);
        }
    }
        
  return (
    <View style={styles.root}>
        <Text style={styles.text} >
            Registro
        </Text>
        <TextInput
        mode="outlined"
        label="correo"
        placeholder="Escribe tu correo"
        style={styles.inputs}
        onChangeText={(value)=>handlerSetValues('email', value)}>
        </TextInput>
        <TextInput 
        mode="outlined"
        label="contraseña"
        placeholder="Escribe tu contraseña" 
        secureTextEntry={hiddenPassword}
        style={styles.inputs}
        right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}>
        </TextInput>
        <Button style={styles.button}mode="contained" onPress={handlerFormRegister}>
            Register
        </Button>
        <Text style={styles.textRedirect}
            onPress={()=>navigation.dispatch(CommonActions.navigate({name: 'Login'}))}>
                Ya tienes una cuenta? Inicia Sesión Ahora
            </Text>
        <Snackbar
        visible={showMessage.visible}
        onDismiss={()=>setShowMessage({...showMessage, visible: false})}
        style={{backgroundColor: showMessage.color}}
        >
        {showMessage.message}
      </Snackbar>
    </View>
  )
}
