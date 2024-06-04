import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, Snackbar, Text, TextInput } from 'react-native-paper'
import { styles } from '../theme/styles'
import handlerSetValues from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
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
    })
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
        placeholder="Escribe tu contraseña" secureTextEntry
        style={styles.inputs}
        onChangeText={(value)=>handlerSetValues('password', value)}>
        </TextInput>
        <Button style={styles.button}mode="contained" onPress={handlerFormRegister}>
            Register
        </Button>
        <Snackbar
        visible={showMessage}
        onDismiss={()=>setShowMessage(false)}
        style={{backgroundColor:'#8f0e2a'}}
        >
        Completa todos los campos
      </Snackbar>
    </View>
  )
}
