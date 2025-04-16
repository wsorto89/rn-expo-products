import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TextInput, View } from 'react-native';
import SmartButton from '@/components/ui/smart-button';
import { Colors } from '@/constants/colors';
import BadgeContainer from '@/components/ui/badge-container';
import { Dispatch, SetStateAction } from 'react';

type ProductListFiltersProps = {
  filterText: string;
  setFilterText: Dispatch<SetStateAction<string>>;
  handleOpenDrawer: () => void;
  filterCount: number;
};

/**
 * @description controls the filter, has a filter textfield input and a button to open up the filter drawer
 * @param {string} filterText - text that is used to filter out results based on title
 * @param {Dispatch<SetStateAction<string>>} setFilterText - sets the filter text
 * @param {() => void} handleOpenDrawer - opens the filter drawer
 * @param {number} filterCount - count used to display how many filters are active
 */
const ProductListFilters = ({
  filterText,
  setFilterText,
  handleOpenDrawer,
  filterCount,
}: ProductListFiltersProps) => {
  return (
    <View style={styles.row}>
      <TextInput
        value={filterText}
        onChangeText={setFilterText}
        placeholder={'Search products...'}
        style={styles.textFilter}
      />
      <BadgeContainer count={filterCount} containerStyles={{ marginRight: 8 }}>
        <SmartButton onPress={handleOpenDrawer} accessibilityLabel={'filter'}>
          <Ionicons name="filter" size={32} color={Colors.text} />
        </SmartButton>
      </BadgeContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  textFilter: {
    borderWidth: 2,
    borderRadius: 4,
    paddingLeft: 8,
    backgroundColor: Colors.foreground,
    color: Colors.text,
    flex: 1,
    marginLeft: 12,
  },
});

export default ProductListFilters;
