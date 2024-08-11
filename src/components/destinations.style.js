import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        marginHorizontal:16,
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap"
    },
    destination:{
        display:"flex",
        justifyContent:"flex-end",
        position:"relative",
        padding:16,
        paddingVertical:24,
        marginTop:8,
        marginBottom:20
    },
    des_image:{
        position:"absolute"
    },
    des_linear:{
        position:"absolute",
        bottom:0,
    },
    des_button:{
        position:"absolute",
        top:4,
        right:12,
        borderRadius:9999,
        padding:12,
    },
    des_title:{
        color:'rgb(255 ,255 ,255)',
        fontWeight:"600"
    },
    des_description:{
        color:'rgb(255 ,255 ,255)',
    }
})