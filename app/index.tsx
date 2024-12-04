import {StatusBar} from "expo-status-bar";
import {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {TimerCountdown} from "./components/TimerCountdown";
import {TimerMode} from "./components/TimerMode";
import {TimerToggle} from "./components/TimerToggle";
import {SessionSettings} from "./components/SessionSettings";

export default function App() {
    const [focusDuration, setFocusDuration] = useState<number>(0.1);
    const [breakDuration, setBreakDuration] = useState<number>(0.1);
    const [timerCount, setTimerCount] = useState<number>(focusDuration * 60 * 1000);
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
    const [timerMode, setTimerMode] = useState<"Focus" | "Break">("Focus");
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

    useEffect(() => {
        if (timerCount <= 0) {
            setTimerMode(timerMode === "Focus" ? "Break" : "Focus");
            setTimerCount((timerMode === "Focus" ? breakDuration : focusDuration) * 60 * 1000);
            stopCountDown();
        }
    }, [timerCount]);

    const startCountDown = () => {
        setIsTimerRunning(true);
        const id = setInterval(() => setTimerCount((prev) => prev - 1000), 1000);
        setIntervalId(id);
    };

    const stopCountDown = () => {
        setIsTimerRunning(false);
        if (intervalId) {
            clearInterval(intervalId);
        }
        setIntervalId(null);
    };

    // Handle simple changes for focus and break duration
    const handleDurationChange = (type: "focus" | "break", text: string) => {
        const newDuration = parseFloat(text);
        if (!isNaN(newDuration) && newDuration >= 0) {
            if (type === "focus") {
                setFocusDuration(newDuration);
                if (timerMode === "Focus") setTimerCount(newDuration * 60 * 1000);
            } else {
                setBreakDuration(newDuration);
                if (timerMode === "Break") setTimerCount(newDuration * 60 * 1000);
            }
        }
    };

    return (
        <View
            style={{
                ...styles.container,
                ...{backgroundColor: timerMode === "Break" ? "#2a9d8f" : "#d95550"},
            }}
        >
            <StatusBar style="auto"/>
            <TimerMode timerMode={timerMode}/>
            <SessionSettings
                focusDuration={focusDuration}
                breakDuration={breakDuration}
                onFocusDurationChange={(text) => handleDurationChange("focus", text)}
                onBreakDurationChange={(text) => handleDurationChange("break", text)}
            />
            <TimerToggle
                startCountDownHandler={startCountDown}
                isTimerRunning={isTimerRunning}
                setIsTimerRunning={setIsTimerRunning}
                stopCountDownHandler={stopCountDown}
            />
            <TimerCountdown countDownDate={new Date(timerCount)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
