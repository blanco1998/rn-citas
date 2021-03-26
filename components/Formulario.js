import moment from 'moment'
import React, {useState} from 'react'
import {Text, StyleSheet, View, TextInput, Button, Alert, ScrollView} from 'react-native'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import 'moment/locale/es'
import shortid from 'shortid'
moment.locale('es')


const Formulario = ({citas, setCitas, guardarMostrarForm}) => {

    const [paciente, guardarPaciente] = useState('')
    const [propietario, guardarPropietario] = useState('')
    const [telefono, guardartelefono] = useState('')
    const [sintomas, guardarSintomas] = useState('')

    //DATE
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
    const [fecha, guardarFecha] = useState('')
    //TIME
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false)
    const [hora, guardarHora] = useState('')
    
    const showDatePicker = () => {
        setDatePickerVisibility(true)
    }

    const hideDatePicker = () => {
        setDatePickerVisibility(false)
    }
    
    const handleConfirmDate = (date) => {
        finalDate = `${moment(date).format('dddd DD').toUpperCase()} DE ${moment(date).format('MMMM, YYYY').toUpperCase()}`
        guardarFecha(finalDate)
        hideDatePicker()
    }

    const showTimePicker = () => {
        setTimePickerVisibility(true)
    }

    const hideTimePicker = () => {
        setTimePickerVisibility(false)
    }

    const handleConfirmTime = (time) => {
        guardarHora(moment(time).format('hh:mm a'))
        hideTimePicker()
    }

    //CREAR
    const crearNuevaCita = () => {

        var invalid = false
        var text
        
        if(paciente.trim() === ''){
            invalid = true
            text = 'Paciente'
        }else if(propietario.trim() === ''){
            invalid = true
            text = 'Propietario'
        }else if(telefono.trim() === ''){
            invalid = true
            text = 'Telefono'
        } else if(fecha.trim() === ''){
            invalid = true
            text = 'Fecha'
        }else if(hora.trim() === ''){
            invalid = true
            text = 'Hora'
        }else if(sintomas.trim() === ''){
            invalid = true
            text = 'Sintomas'
        }

        if(invalid == true){
            mostrarAlerta(text)
            return
        }

        //crear nueva
        
        const cita = {paciente, propietario, telefono, fecha, hora, sintomas}
        cita.id = shortid.generate()
        const nuevo = [...citas, cita]
        setCitas(nuevo)

        guardarMostrarForm(false)
    }

    const mostrarAlerta = (inputOpt) => {
        Alert.alert(
            'Formulario Inválido',
            `'${inputOpt}' incompleto`,
            [{
                text: 'OK'
            }]
        )
    }

    return (
        <>
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente:</Text>
                    <TextInput style={styles.input}
                    onChangeText={ (text) => guardarPaciente(text) }
                    />
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Dueño:</Text>
                    <TextInput style={styles.input}
                    onChangeText={ (text) => guardarPropietario(text) }
                    />
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <TextInput style={styles.input}
                    onChangeText={ (text) => guardartelefono(text) }
                    />
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Fecha: {fecha}</Text>
                    <Button title="Seleccionar fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirmDate}
                        onCancel={hideDatePicker}
                        locale='es_ES'
                    />
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Hora: {hora}</Text>
                    <Button title="Seleccionar hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmTime}
                        onCancel={hideTimePicker}
                        locale='es_ES'
                    />
                </View>
                <View style={styles.group}>
                    <Text style={styles.label}>Síntomas:</Text>
                    <TextInput style={styles.input}
                    onChangeText={ (text) => guardarSintomas(text) }
                    />
                </View>
                <View style={styles.bottom}>
                    <Button title="Crear" onPress={() => crearNuevaCita()}/>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    formulario: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
    },  

    label:{
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
    },

    input: {
        height: 40,
        borderColor: '#E1E1E1',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
    },

    group: {
        marginVertical: 10
    },

    bottom: {
        marginVertical: 30
    },

})

export default Formulario