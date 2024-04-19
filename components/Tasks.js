import React, { useState } from 'react';
import {StyleSheet, TouchableOpacity, Text, TextInput, View} from 'react-native';

const Tasks = ({ text, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleEdit = () => {
        onEdit(editedText);
        setIsEditing(false);
    };

    return (
        <TouchableOpacity
            style={styles.item}
            onPress={() => setIsEditing(true)}
            onLongPress={onDelete}
        >
            <View style={styles.itemLeft}>
                <View style={styles.square}></View>
                {isEditing ? (
                    <TextInput
                        style={styles.input}
                        value={editedText}
                        onChangeText={setEditedText}
                        autoFocus
                        onBlur={handleEdit}
                    />
                ) : (
                    <Text style={styles.itemText}>{text}</Text>
                )}
            </View>
            <View style={styles.circle}></View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        flex: 1,
        marginRight: 15
    },
    circle: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
    },
    input: {
        padding: 0,
        margin: 0,
        flex: 1,
    },
});

export default Tasks;
