import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/Register';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';


const Stack = createStackNavigator();
//Interface - rutas
interface Routes{
  name: string,
  screen:()=> JSX.Element;
}
//Arreglo que contiene las rutas cuando el usuario no esta autenticado
const routesNoAuth: Routes[]=[
  {name: "Login", screen: LoginScreen},
  {name: "Register", screen: RegisterScreen}
];
//Arreglo que contiene las rutas cuando el usuario esta autenticado
const routeAuth: Routes[]=[
  {name: "Home", screen: HomeScreen}
];
export const StackNavigator =() => {
  //hook useState: verifica si esta autenticado o no
  const [isAuth, setIsAuth] = useState<boolean>(false)
  //useState Carga Inicial
  const [isLoading, setisLoading] = useState<Boolean>(false)
  //use Effect verificar si esta auth
  useEffect(()=>{
    setisLoading(true);
    onAuthStateChanged(auth, (user)=>{
      //validar si está autenticado
      if(user){
        //console.log(user)
        setIsAuth(true);
      }
      setisLoading(true);;
    })
  })
  return (
    <Stack.Navigator>
      {
        !isAuth ?
        routesNoAuth.map((item, index)=>(
          <Stack.Screen key={index} name={item.name} options={{headerShown: false}} component={item.screen} />
        ))
        :
        routeAuth.map((item, index)=>(
          <Stack.Screen key={index} name={item.name} options={{headerShown: false}} component={item.screen} />
        ))
      }
    </Stack.Navigator>
  );
}