import React, { useState } from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import book_image from '../assets/book_emoji.png';


const HomeScreen = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View style={styles.container}>
            <View style={styles.screenWrapper}>
                <Text
                    style={styles.title}>Engravo<Image
                        source={book_image}
                        style={styles.book_image} />
                </Text>

                <View style={styles.buttonStyle}>

                    <Pressable onPress={() => setModalVisible(true)}>
                        <Text style={styles.instructionsButton}>Show Instructions</Text>
                    </Pressable>

                    <TouchableOpacity
                        title="Notes Screen"
                        style={styles.button}
                        onPress={() => navigation.navigate('Notes')}>
                        <Text>My Notes</Text>
                    </TouchableOpacity>
                </View>


                <Image
                    source={{ uri: 'https://citweb.lethbridgecollege.ab.ca/MobileApp/happy-face.png' }} // Replace 'https://example.com/image.jpg' with the actual image URL
                    style={styles.image}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Instructions:</Text>
                        <View style={styles.instructionsContainer}>
                            <Text style={styles.instructionsItem}>1. To add a note, click the taskbar and press the plus button to add it to your list.</Text>
                            <Text style={styles.instructionsItem}>2. Long press on a task to delete it.</Text>
                            <Text style={styles.instructionsItem}>3. Tap on a task to edit it.</Text>
                        </View>
                        <Pressable onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </Pressable>
                    </View>
                </Modal>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED'
    },
    screenWrapper: {
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignItems: 'center'

    },
    instructions: {
        marginBottom: 10,
        fontSize: 16,
    },
    instructionsContainer: {
        marginBottom: 20,
    },
    instructionsItem: {
        fontSize: 16,
        marginBottom: 10,
    },
    instructionsButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#55BCF6',
        borderRadius: 5,
        textAlign: 'center',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#55BCF6',
        borderRadius: 5,
        marginHorizontal: 10,
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#55BCF6',
        borderRadius: 5,
        textAlign: 'center',
    },
    buttonStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10,
        alignItems: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 20,
    },
    book_image: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default HomeScreen;