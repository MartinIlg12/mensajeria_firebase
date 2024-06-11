import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/Register';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { DetailMessageScreen } from '../screens/HomeScreen/DetailMessageScreen';

const Stack = createStackNavigator();

//Interface - Rutas
interface Routes {
    name: string;
    screen: () => JSX.Element;
    headerShow?:boolean;
}

//Arreglo que contiene las rutas cuando el usuario no está autenticado
const routesNoAuth: Routes[] = [
    { name: "Login", screen: LoginScreen },
    { name: "Register", screen: RegisterScreen }
];

//Arreglo que contiene las rutas cuando el usuario está autenticado
const routesAuth: Routes[] = [
    { name: "Home", screen: HomeScreen },
    { name: "Detail", screen: DetailMessageScreen, headerShow:true}
];

export const StackNavigator = () => {
    //hook useState: verifica si está autenticado o no
    const [isAuth, setIsAuth] = useState<boolean>(false);

    //hook useState: controlar la carga inicial
    const [isLoading, setIsLoading] = useState<boolean>(false);

    //hook useEffect: verificar si el usuario está autenticado
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            //Validar si está autenticado
            if (user) {
                //console.log(user);
                setIsAuth(true);
            }
            setIsLoading(false);
        });

    }, []);

    return (
        <>
            {isLoading ? (
                <View style={styles.root}>
                    <ActivityIndicator size={40} />
                </View>
            ) : (
                <Stack.Navigator>
                    {
                        !isAuth ?
                            routesNoAuth.map((item, index) => (
                                <Stack.Screen 
                                key={index} 
                                name={item.name} 
                                options={{ headerShown: false }} 
                                component={item.screen} />
                            ))
                            :
                            routesAuth.map((item, index) => (
                                <Stack.Screen 
                                key={index} 
                                name={item.name} 
                                options={{ headerShown: item.headerShow ?? false }} 
                                component={item.screen} />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    );
}