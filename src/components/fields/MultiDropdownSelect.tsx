import { MultiSelect } from 'react-native-element-dropdown';
import { StyleSheet, Text, View } from "react-native";
import { Theme, useThemeAwareObject } from "../theme";
const SelectCommon = (props: any) => {
    const {
        value,
        onChange,
        error,
        required,
        options,
        label,
        placeholder,
        labelKey,
        valueKey,
        disable,
        ...inputProps
    } = props;

    // const { background }: any = useContext(ThemeContext);
    const styles = useThemeAwareObject(createStyles);
    return (
        <View >
            {label && (
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.text}>{label}</Text>
                    {required && <Text style={{ color: 'red' }}>*</Text>}
                </View>
            )}
            <View style={{ marginTop: 10 }}>
                <MultiSelect
                    style={styles.dropdown}
                    containerStyle={{ borderRadius: 10 }}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.icon}
                    itemTextStyle={styles.fildcolor}
                    data={options}
                    searchPlaceholder="Search..."
                    search
                    maxHeight={250}
                    labelField={labelKey}
                    valueField={valueKey}
                    placeholder={placeholder}
                    value={value ? value : []}
                    onChange={(e: any) => {
                        onChange(e);
                    }}
                    disable={disable}
                    {...inputProps}
                />
                {error && <Text style={{ color: 'red' }}>{error.message}</Text>}
            </View>
        </View>
    );
};

export default SelectCommon;

export const createStyles = (theme: Theme) => {
    return StyleSheet.create({
        dropdown: {
            height: 40,
            borderColor: theme.color.greyColor,
            borderWidth: 1,
            backgroundColor: theme.color.cardBackground,
            borderRadius: 5,
        },
        placeholderStyle: {
            fontSize: 16,
            marginLeft: 10,
            color: theme.color.whiteColor
        },
        selectedTextStyle: {
            fontSize: 16,
            marginLeft: 10,
            color: theme.color.whiteColor
        },
        icon: {
            width: 20,
            height: 20,
        },
        inputSearchStyle: {
            height: 40,
            fontSize: 16,
        },
        fildcolor: {
            color: theme.color.greyColor
        },
        text: {
            color: theme.color.whiteColor,
            fontSize: 16
        },
        selectedStyle: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 14,
            backgroundColor: 'white',
            shadowColor: '#000',
            marginTop: 8,
            marginRight: 12,
            paddingHorizontal: 12,
            paddingVertical: 8,
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,

            elevation: 2,
        },
        textSelectedStyle: {
            marginRight: 5,
            fontSize: 16,
        },
        item: {
            padding: 17,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        }
    })
}