import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { Message } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

//Interface props
interface Props {
    message: Message;
}

export const MessageCardComponent = ({message}: Props) => {

    const navigation=useNavigation();

    return (
        <View style={styles.routeMessage}>
            <View>
                <Text variant='labelLarge'>Para: {message.to} </Text>
                <Text variant='bodyMedium'>Asunto: {message.subject}</Text>
            </View>
            <View style={styles.iconEnd}>
                <IconButton
                    icon="email-open"
                    size={25}
                    onPress={() => navigation.dispatch(CommonActions.navigate({name:'Detail', params:{message}}))}
                />
            </View>
        </View>
    )
}