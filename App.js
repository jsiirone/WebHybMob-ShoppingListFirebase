import { StatusBar } from 'expo-status-bar';
import { Button, ScrollView, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
import { firestore, collection, addDoc, ITEMS, query, onSnapshot, orderBy, serverTimestamp, doc, deleteDoc } from './firebase/Config.js';
import { useState, useEffect } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Appbar } from 'react-native-paper';


export default function App() {
  const [newItem, setNewItem] = useState('')
  const [items, setItems] = useState([])

  const save = async () => {
    const docRef = await addDoc(collection(firestore, ITEMS), {
      text: newItem,
      created: serverTimestamp()
    }).catch(error => console.log(error))
    setNewItem('')
  }

  const handledelete = async (itemid) => {
    await deleteDoc(doc(firestore, ITEMS, itemid))
  }

  useEffect(() => {
    const q = query(collection(firestore, ITEMS), orderBy('created', 'asc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempitems = []
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        tempitems.push({ ...doc.data(), id: doc.id })
      })
      setItems(tempitems)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const renderItem = ({ item }) => (
    <View style={styles.items}>
      <Text style={styles.itemstext}>{item.text}</Text>
      <TouchableOpacity onPress={() => handledelete(item.id)}>
        <Ionicons name="trash" size={16} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaProvider>
      <Appbar.Header mode='small' >
        <Appbar.Content title="Shopping list" />
      </Appbar.Header>

      <SafeAreaView style={styles.container}>
        <View style={styles.form}>
          <TextInput
            placeholder='Add new item...'
            value={newItem}
            onChangeText={text => setNewItem(text)}
          />
          <Button
            title="Save"
            onPress={save}
          />
        </View>
        <FlatList
          data={items}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 8
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  itemstext: {
    fontSize: 16,
  }
});
