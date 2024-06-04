import React from "react";
import { PaperProvider } from "react-native-paper";
import { RegisterScreen } from "./src/screens/Register";
const App = ()=>{
  return(
    <PaperProvider>
      <RegisterScreen/>
    </PaperProvider>
  )
}
export default App;