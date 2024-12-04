import React from "react";
import {View, Text, StyleSheet} from "react-native";

export type TimerModes = "Focus" | "Break";

type Props = {
    timerMode: TimerModes;
};
export const TimerMode: React.FC<Props> = ({timerMode}) => {
    return (
        <View style={styles.timerCountDownContainer}>
            <Text style={styles.timerCountDownText}>
                {timerMode} Time
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    timerCountDownContainer: {
        alignItems: "center",
        width: "100%",
    },
    timerCountDownText: {
        fontWeight: "600",
        fontSize: 40,
        color: "#fff",
    },
});