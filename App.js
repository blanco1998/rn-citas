/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component, useState } from 'react'

import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Button,
  Platform,
} from 'react-native'

import Cita from './components/Cita'
import Formulario from './components/Formulario'


const App = () => {

  const [mostrar, guardarMostrarForm] = useState(false)

  console.log('Inicio correcto')

  // definir el state de citas
  const [citas, setCitas] = useState([
    { id: "1", paciente: "Gobbers", propietario: "Juan",    sintomas: "No come" },
    { id: "2", paciente: "Moron",   propietario: "Bonnie",  sintomas: "No come" },
    { id: "3", paciente: "Lowe",    propietario: "Andy",    sintomas: "No come" }
  ])

  const eliminarPaciente = id => {
    setCitas( (citasActuales) => {
        return citasActuales.filter( cita => cita.id !== id) //cuando sean diferentes
    })
  }

  //muestra u oculta form
  const mostrarForm = () => {
    guardarMostrarForm(!mostrar)
  }
  
  return (
    <View style={styles.container}>

        <Text style={styles.title}>CITAS VETERINARIAS</Text>

        {mostrar?
          (
            <View style={styles.button}>
              <Button style={styles.button} title="ver citas" onPress={() => mostrarForm()}/>
            </View>
          ) :
          (
            <View style={styles.button}>
              <Button style={styles.button} title="crear cita" onPress={() => mostrarForm()}/>
            </View>
        )}

        <View style={styles.contenido}>

          { mostrar?
          (<>
                <Formulario 
                  citas={citas}
                  setCitas={setCitas}
                  guardarMostrarForm={guardarMostrarForm}
                />
          </>) : 
          (<>
              <FlatList style={styles.listado}
                data = { citas }
                renderItem = { ({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} /> }
                keyExtractor = { cita => cita.id }
              />
          </>)}  

        </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000',
    marginTop: Platform.OS === 'ios' ? 40 : 10,
    marginVertical: 10,
    fontSize: 22,
  },

  subTitle: {
    fontSize: 18,
    marginHorizontal: 10,
  },

  contenido: {
    flex: 1,
  },

  listado: {
    flex: 1,
  },

  button: {
    marginHorizontal: 20,
    marginVertical: 20,
  }

})

export default App;
