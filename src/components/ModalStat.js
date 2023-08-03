import React from 'react'
import { Modal, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native'
import { MODEL_COLORS } from '../models/modelColors'

const ModalStat = ({ modalVisible, _handleClose, statistics, titleExercise, _showDate }) => {
 
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        > 
            <View style={styles.container}> 
                <View style={styles.viewBody}>
                    <View style={styles.contentView}>
                        <Text style={styles.title}>{titleExercise}</Text>
                        <ScrollView>
                            {titleExercise && statistics.filter(statistic => statistic._id.exercise.toLowerCase() === titleExercise.toLowerCase()).map(statistic => (
                                <View key={statistic._id.date}>
                                    <Text style={{ marginTop:10, textAlign:"center" }}>{_showDate(statistic._id.date)}</Text>
                                    <Text style={{ textAlign:"center"}}>{statistic.totalWeight}kg</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.buttonCancel} onPress={_handleClose}>
                            <Text style={styles.textButton}>Fermer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalStat

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    viewBody: {
        backgroundColor:MODEL_COLORS.light, 
        padding: 20, 
        borderRadius: 10,
        height:"100%",
        width: '100%', // pour 80% de la largeur de l'écran
    },
    contentView: {
        flexGrow: 1,
        alignItems: 'center', // pour centrer le contenu horizontalement
        justifyContent: 'center' // pour centrer le contenu verticalement
    },
    viewButton: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom: 10,
        marginTop:20
    },
    buttonAdd: {
        backgroundColor:MODEL_COLORS.main, // votre couleur ici
        padding: 10,
        borderRadius: 5,
        marginTop:20
    },
    buttonCancel: {
        backgroundColor:MODEL_COLORS.orange, // votre couleur ici
        padding: 10,
        borderRadius: 5,
        marginTop:20
    },
    textButton: {
        fontSize:18,
        color:"white"
    },
    input: {
        borderWidth:1,
        borderColor:"#A9A9A9",
        width:220,
        paddingLeft:10,
        marginTop:20
    },
    textInput: {
        marginTop:20,
        // color:"#808080",
        fontSize:20
    },
    title:{ 
        fontSize:30,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginBottom:20,
        textAlign:'center',
    },
})