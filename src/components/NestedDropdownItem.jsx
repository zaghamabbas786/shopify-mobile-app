import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import DropDownIcon from '../assets/images/dropdown.svg'; // Import your SVG icon

const NestedDropdownItem = ({item, onPressItem}) => {
  const [expanded, setExpanded] = useState(false);
  const hasNestedItems = item.items && item.items.length > 0;

  const handleTitlePress = () => {
    onPressItem(item);
  };

  const handleContainerPress = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handleContainerPress} style={styles.item}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={handleTitlePress}
            style={styles.titleTouchable}>
            <Text style={styles.itemText}>{item.title}</Text>
          </TouchableOpacity>
        </View>
        {hasNestedItems && <DropDownIcon width={15} height={15} />}
      </TouchableOpacity>
      {expanded && hasNestedItems && (
        <FlatList
          data={item.items}
          renderItem={({item}) => (
            <NestedDropdownItem item={item} onPressItem={onPressItem} />
          )}
          keyExtractor={(nestedItem, index) =>
            nestedItem.title || index.toString()
          }
          style={styles.nestedList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingLeft: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // Ensure the title container takes up remaining space
  },
  itemText: {
    fontSize: 16,
  },
  arrowContainer: {
    marginLeft: 10,
  },
  nestedList: {
    paddingLeft: 10,
  },
});

export default React.memo(NestedDropdownItem);
