import React, {useState} from 'react';
import {
  LayoutAnimation,
  Platform,
  UIManager,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Plus from '../../assets/images/plus.svg';
import CustomText from '../CustomText';
import Separator from './Separator';

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const Accordion = ({
  data = [
    {
      title: 'Product Details',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempor volutpat odio, at dignissim mauris finibus eget. Aenean velit eros, hendrerit at rutrum quis, lacinia eu nibh.',
    },
    {
      title: 'Shipping & Returns',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempor volutpat odio, at dignissim mauris finibus eget. Aenean velit eros, hendrerit at rutrum quis, lacinia eu nibh.',
    },
  ],
}) => {
  const [expandedAccordions, setExpandedAccordions] = useState([]);

  const toggleAccordion = index => {
    setExpandedAccordions(prevState =>
      prevState.includes(index)
        ? prevState.filter(item => item !== index)
        : [...prevState, index],
    );
  };

  return data.map((item, index) => {
    const expanded = expandedAccordions.includes(index);
    const toggleExpanded = () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      toggleAccordion(index);
    };

    return (
      <View key={index}>
        <Separator/>
        <TouchableOpacity
          style={styles.accordContainer}
          onPress={toggleExpanded}>
          <CustomText style={styles.title}>{item.title}</CustomText>
          {expanded ? (
            <Plus height={24} width={24} />
          ) : (
            <Plus height={35} width={40} />
          )}
        </TouchableOpacity>
        {expanded && <Text>{item.body}</Text>}
      </View>
    );
  });
};

export default Accordion;

const styles = {
  accordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Inter',
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  body: {
    fontFamily: 'Inter',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 15,
  },
};
