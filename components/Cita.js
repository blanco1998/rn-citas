import React from 'react'
import {Text, StyleSheet, View, TouchableHighlight, Button} from 'react-native'

const Cita = ({item, eliminarPaciente}) => {

    const dialogoEliminar = (id, paciente) => {
        console.log(`Eliminando.. [${id} ${paciente}]`)
        eliminarPaciente(id)
    }

    return (
        <View style={styles.cita}>

            <View>
                <Text style={styles.label}>Paciente:</Text>
                <Text>{item.paciente}</Text>
            </View>

            <View>
                <Text style={styles.label}>Propietario:</Text>
                <Text>{item.propietario}</Text>
            </View>

            <View>
                <Text style={styles.label}>Síntoma:</Text>
                <Text>{item.sintomas}</Text>
            </View>

            <View style={styles.mtop}>
                <Button title="Eliminar X"
                    color="#b30900" 
                    onPress={() => dialogoEliminar(item.id, item.paciente)}
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFFFFF',
        borderBottomColor: '#E1E1E1',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        paddingHorizontal: 10,
    },

    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 10,
    },

    text: {
        fontSize: 18,
    },

    mtop: {
        marginVertical: 10,
    }
    
})

export default Cita