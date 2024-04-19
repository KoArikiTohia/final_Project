import React, { useState, useEffect, useRef } from 'react';
import { Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tasks from '../components/Tasks';

const NotesScreen = () => {
    const [task, setTask] = useState('');
    const [taskItems, setTaskItems] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null); // Create a ref for the input field

    useEffect(() => {
        // Load tasks from AsyncStorage when component mounts
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem('tasks');
            if (storedTasks !== null) {
                setTaskItems(JSON.parse(storedTasks));
            }
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    };

    const saveTasks = async (tasks) => {
        try {
            await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Error saving tasks:', error);
        }
    };

    const handleTasks = () => {
        if (task.trim() !== '') {
            const updatedTasks = [...taskItems, task];
            setTaskItems(updatedTasks);
            saveTasks(updatedTasks); // Save tasks to AsyncStorage
            setTask('');
            setShowInput(false); // Hide the input field after adding a task
        }
    };

    const deleteTask = (index) => {
        let itemsCopy = [...taskItems];
        itemsCopy.splice(index, 1);
        setTaskItems(itemsCopy);
        saveTasks(itemsCopy); // Save tasks to AsyncStorage
    };

    const editTask = (index, newText) => {
        let itemsCopy = [...taskItems];
        itemsCopy[index] = newText;
        setTaskItems(itemsCopy);
        saveTasks(itemsCopy); // Save tasks to AsyncStorage
    };

    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.title}>My Notes</Text>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.item}>
                        {taskItems.map((item, index) => (
                            <Tasks
                                key={item}
                                text={item}
                                onDelete={() => deleteTask(index)}
                                onEdit={(newText) => editTask(taskItems.indexOf(item), newText)} // Pass the task text and its index
                            />
                        ))}
                    </View>
                </ScrollView>
            </View>
            {!showInput && (
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => {
                        setShowInput(true);
                        inputRef?.current?.focus(); // Focus on the input field when "+" button is pressed
                    }}
                >
                    <Text style={styles.addText}>+</Text>
                </TouchableOpacity>
            )}
            {showInput && (
                <View style={styles.writeTaskWrapper}>
                    <TextInput
                        ref={inputRef} // Assign the ref to the input field
                        style={styles.input}
                        placeholder="Write a task"
                        value={task}
                        onChangeText={setTask}
                        onSubmitEditing={handleTasks} // Handle task submission when user presses Enter
                        autoFocus // Auto focus on the input field when it's shown
                    />
                    <TouchableOpacity onPress={handleTasks}>
                        <View style={styles.addWrapper}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED'
    },
    taskWrapper: {
        paddingTop: 25,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    item: {
        marginTop: 30,
    },
    writeTaskWrapper: {
        position: 'absolute',
        bottom: 60,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 60,
        borderColor: '#C0C0C0',
        borderWidth: 1,
        width: 250,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#C0C0C0',
        borderWidth: 1,
    },
    addText: {
        fontSize: 24,
    },
});

export default NotesScreen;
