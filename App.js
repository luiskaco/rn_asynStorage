import React, {useState, useEffect} from 'react';

import {
  TextInput,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {

  const [ inputTexto, setInputTexto] = useState('');
  const [ nombrestorage , setnombrestorage] = useState('');


  useEffect(() => {
    // Obteener daotos
    obtenerDatosStorage();
  }, [])


  // Guardar en el storage

  const guardarDatos = async () => {
       if(inputTexto.trim() === ''){
         
           console.log( ` No puede quedar vacios ` );
           return ;
       }


       try {
         // Guardando ene l storage
         await AsyncStorage.setItem('nombre', inputTexto);
         setnombrestorage(inputTexto);
   
       } catch (error) {
         console.log(error);
       }
       
  }


  // Obtener ls datos

  const obtenerDatosStorage = async () => {
      try {
          const nombre = await AsyncStorage.getItem('nombre');
          setnombrestorage(nombre);
      } catch (error) {
        console.log(error);
      }
  }


  const eliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre')
      setnombrestorage('');
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
      <View style={styles.contenedor}>

        { nombrestorage ? <Text>Hola: {nombrestorage}</Text> : null}
        


        <TextInput  
           placeholder="Escribe tu nombre"
           style={styles.input}
            onChangeText={texto => setInputTexto(texto)}
           />

        <Button 
            title="Guardar"
            color="green"
            onPress={() =>  guardarDatos()}
         
        />

        { nombrestorage ? (

                <TouchableHighlight style={styles.btnEliminar}
                  onPress={() => eliminarDatos() }
                
                >
                  <Text style={styles.textoEliminar}>Eliminar Nombre &times;</Text>
                </TouchableHighlight>

        ) : null }


      </View>

    </>
  );
};

const styles = StyleSheet.create({
    contenedor:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    input:{
      borderColor:'#666',
      color:"#000",
      borderBottomWidth: 1,
      width: 300,
      height: 40
    },
    btnEliminar:{
        backgroundColor: 'red',
        marginTop:20,
        padding:10
    },
    textoEliminar:{
        color:'#fff',
        fontWeight:'bold',
        textAlign:'center',
        textTransform:'uppercase',
        width:300
    }
});

export default App;
