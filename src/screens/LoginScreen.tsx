import React, { useState } from 'react'
import { View } from 'react-native'
import { styles } from '../theme/styles'
import { PaperProvider, Text, TextInput, Button, Snackbar  } from 'react-native-paper'
import handlerSetValues from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';
interface MessageSnackBar{
    visible: boolean;
    message: string;
    color: string;
}
interface formLogin{
    email: string;
    password: string;
}
export const LoginScreen = () => {
    //hook cambiar el estado del formulario
    const [formLogin, setFormLogin] = useState<formLogin>({
        email:'',
        password:''
    })
    //Visualizart u ocultar el mensaje
    const [showMessage, setShowMessage] = useState<MessageSnackBar>({
        visible: false,
        message: '',
        color: '#ffff',
    });
    //hook visualizar contraseña
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true)
    //hook navigation
    const navigation = useNavigation()
    //funcion cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string)=>{
        setFormLogin({...formLogin,[key]: value})
    }
    //funcion enviar
    const handlerFormLogin = async () =>{
        //Validar los datos del formulario
        if (!formLogin.email || !formLogin.password){
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos',
                color: '#8f0e2a'
            });
            return;
        }
        //console.log(formLogin);
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                formLogin.email,
                formLogin.password
            );
            console.log(response)
        } catch (ex) {
            //console.log(ex);
            setShowMessage({
                visible: true,
                message: 'Usuario y/o contraseña incorrecta',
                color: '#8f0e2a'
            });
        }
    }
    return (
        <View style={styles.root}>
            <Text style={styles.text} >
                Inicia Sesión
            </Text>
            <TextInput
            mode="outlined"
            label="correo"
            placeholder="Escribe tu correo"
            style={styles.inputs}
            onChangeText={(value)=>handlerSetValues('email', value)}
            >
            </TextInput>
            <TextInput 
            mode="outlined"
            label="contraseña"
            placeholder="Escribe tu contraseña" 
            secureTextEntry={hiddenPassword}
            right={<TextInput.Icon icon="eye" onPress={()=>setHiddenPassword(!hiddenPassword)}/>}
            style={styles.inputs}
            onChangeText={(value)=>handlerSetValues('password', value)}
            >
            </TextInput>
            <Button style={styles.button}mode="contained" onPress={handlerFormLogin}>
                Register
            </Button>
            <Text style={styles.textRedirect}
            onPress={()=>navigation.dispatch(CommonActions.navigate({name: 'Register'}))}>
                No tienes una cuenta? Registrate Ahora
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
