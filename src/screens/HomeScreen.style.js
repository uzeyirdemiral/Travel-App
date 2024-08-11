import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"rgb(255 ,255 ,255)"
    },
    home_scroll:{
        marginTop:24
    },
    avatar:{
        marginHorizontal:20,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginBottom:40
    },
    avatar_text:{
        fontWeight:"700",
        color:'rgb(64, 64, 64)'
    },
    search_bar:{
        marginHorizontal:20,
        marginBottom:16
    },
    search_container:{
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:'rgb(245,245,245)',
        borderRadius:9999,
        padding:16,
        marginLeft:8,
        paddingLeft:24
    },
    search_input:{
        flex:1,
        fontSize:16,
        lineHeight:24,
        marginBottom:4,
        paddingLeft:4,
        letterSpacing:0.4
    },
    categories:{
        marginBottom:16
    }
})