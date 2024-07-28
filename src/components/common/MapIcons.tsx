

import { useAppSelector } from '@store/index'
import { themeSelector } from '@store/reducers/theme.reducer'
import { styles } from '@themes/index'
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import EText from './EText'


export const AgentIcon = (props: any) => {
    const { current } = useAppSelector(themeSelector)
    return (
        <Fontisto name="person" style={props.style ?? { fontSize: 25 }} color={current.new_primary} />
    )
}
export const AgentBikeIcon = (props: any) => {
    const { current } = useAppSelector(themeSelector)
    return (
        <MaterialCommunityIcons name="motorbike" style={props.style ?? { fontSize: 25 }} color={current.redColor} />
    )
}
export const CallOutText = (props: any) => {
    const { current } = useAppSelector(themeSelector)
    return (
        <ScrollView >
            <EText>{props.title}</EText>
        </ScrollView>
    )
}
