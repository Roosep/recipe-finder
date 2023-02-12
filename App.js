import { useState } from 'react';
import { Alert, StyleSheet, Text, View, Image, FlatList, TextInput, Button} from 'react-native';

export default function App() {
  const [filter, setFilter] = useState("");
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + filter)
    .then(response => response.json())
    .then(data => setRecipes(data.meals))
    .catch(error => {
      Alert.alert("Error", error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };
  
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item, index) => item.idMeal}
        renderItem={({item}) =>
        <View>
          <Text style={{fontSize: 17}}>{item.strMeal}</Text>
          <Image source={{uri: item.strMealThumb}}
          style={{width: 50, height: 50}}/>
        </View>}
        data={recipes}
        ItemSeparatorComponent={listSeparator} 
      />

      <TextInput style={{fontSize: 18, width: 200}} 
      placeholder="Filter"
      value={filter}
      onChangeText={text => setFilter(text)}/>
      <Button title='Find' onPress={getRecipes} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
