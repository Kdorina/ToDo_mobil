import React , {useState} from 'react';
import { ScrollView, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ToDo from './components/ToDo';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>

    <ScrollView contentContainer={{ flexGrow: 1}}
    keyboardTaps='handle'>

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>ToDo listám</Text>
        <View style={styles.items}>
          {/* this is where the tasks will go */}
          {
            taskItems.map((item, index)=>{
              return (
                <TouchableOpacity  key={index}  onPress={() => completeTask(index)}>
                <ToDo text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      </ScrollView>

    {/* Lista írás */}
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding" : "height"}
    style={styles.writeListWrapper}>
      <TextInput style={styles.input} placeholder={'Teendőim...'} value={task} onChangeText={text =>setTask(text)} />
      <TouchableOpacity onPress={() => handleAddTask()}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0DBFB',
   
  }, 
  tasksWrapper:{
    paddingTop: 80,
    paddingHorizontal: 20,
    maxHeight:200
  },

  sectionTitle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  items:{
    marginTop: 30
  },
  writeListWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  input:{
  paddingVertical:15,
  paddingHorizontal:15,
  backgroundColor: 'white',
  borderRadius: 60,
  borderColor:'#c0c0c0',
  borderWidth: 1,
  width:250,
  fontFamily: 'Helvetica'

  },
  addWrapper:{
    width:60,
    height: 60,
    borderRadius:60,
    // borderRadius: 20,
    backgroundColor: '#FFC107',
    justifyContent: 'center',
    alignItems:'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
    
  },
  addText:{
  }
});
