import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import DropdownVector from '../assets/images/dropdownVector.svg'

export default function CustomDropdown({options, onSelect, defaultButtonText}) {
    console.log(options, 'OOOOOOOO');
  return (
    <View style={styles.container}>
       <SelectDropdown
	data={options}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem.label
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item.label
	}}
    defaultButtonText={defaultButtonText}
      buttonStyle={styles.dropdownButton}
      buttonTextStyle={styles.dropdownButtonText}
      dropdownStyle={styles.dropdownContainer}
      rowStyle={styles.dropdownRow}
      rowTextStyle={styles.dropdownRowText}
/>
<View style={styles.vector}>
<DropdownVector width={20} height={20}/>

</View>

    </View>
   
  )
}


const styles = StyleSheet.create({
  container:{
    position:'relative'
  },
  dropdownButton: {
    backgroundColor: 'black',
    // borderRadius: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    // paddingHorizontal: 16,
    // paddingVertical: 12,
    borderBottomColor:'white',
    width:'100%'
    
    
  },
  dropdownButtonText: {
    flexDirection:'row',
    fontSize: 20,
    color:'white',
    textAlign:'left',
    
    
    
    
    
  },
  dropdownContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dropdownRow: {
    // padding: 15,
  },
  dropdownRowText: {
    fontSize: 16,
    color: 'black',
  },
  vector:{
    position:'absolute',
    right:0,
    bottom:10

  }
});