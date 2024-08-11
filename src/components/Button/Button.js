import React from 'react'
import { Text, TouchableOpacity } from 'react-native';
import styles from "./Button.style"

function Button({name,onPress,customButton,customTexT}){
    return (
        <TouchableOpacity style={[customButton ,styles.button]}  onPress={onPress}>
            <Text style={customTexT} >{name} </Text>
        </TouchableOpacity>
    )
}


export default Button;