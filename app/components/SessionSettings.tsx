import React from "react";
import {View, Text, TextInput, StyleSheet} from "react-native";

type SessionSettingsProps = {
    focusDuration: number;
    breakDuration: number;
    onFocusDurationChange: (text: string) => void;
    onBreakDurationChange: (text: string) => void;
};

export const SessionSettings: React.FC<SessionSettingsProps> = ({
                                                                    focusDuration,
                                                                    breakDuration,
                                                                    onFocusDurationChange,
                                                                    onBreakDurationChange,
                                                                }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Focus Duration (minutes):</Text>
            <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={focusDuration.toString()}
                onChangeText={onFocusDurationChange}
            />
            <Text style={styles.label}>Break Duration (minutes):</Text>
            <TextInput
                style={styles.input}
                keyboardType="decimal-pad"
                value={breakDuration.toString()}
                onChangeText={onBreakDurationChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        color: "#fff",
        marginBottom: 5,
    },
    input: {
        width: 100,
        borderWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5,
        textAlign: "center",
        marginBottom: 10,
    },
});
