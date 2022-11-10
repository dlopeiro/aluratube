import React from "react";

export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { alert("you have to set me first!") },
    toggleMode: () => { alert("you have to set me first!") }
});

export default function ColorModeProvider(props) {
    const [mode, setMode] = React.useState(props.initialMode);

    function toggleMode() {
        if(mode === "dark") setMode("light");
        if(mode === "light") setMode("dark");
    };

    return (
        // why is this being overruled?
        <ColorModeContext.Provider value={{ mode: mode, setMode: setMode, toggleMode: toggleMode }}>
            {props.children}
        </ColorModeContext.Provider>
    );
}
