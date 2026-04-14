// wayapi-cli/src/components/MethodSelector.tsx
import { useInput, Box, Text } from 'ink';
import { useState } from 'react';

const methods = [
    { label: "GET",    key: "g" },
    { label: "POST",   key: "p" },
    { label: "PUT",    key: "u" },
    { label: "PATCH",  key: "a" },
    { label: "DELETE", key: "d" }
]

interface Props {
    onChange: (method: string) => void;
    isActive: boolean;
}

const MethodSelector = ({ onChange, isActive }: Props) => {
    const [selected, setSelected] = useState("GET");
    
    useInput((input) => {
        const match = methods.find((m) => m.key === input.toLowerCase());
        if (match) {
            setSelected(match.label);
            onChange(match.label)
        }
    }, { isActive });
    
    return (
        <Box gap={2}>
            {methods.map((m) => (
                <Text
                    key={m.label}
                    bold={selected === m.label}
                    color={selected === m.label ? "#4AAD52" : "#507255"}
                    dimColor={!isActive}
                >
                    {m.key.toUpperCase()}:{m.label}
                </Text>
            ))}
        </Box>
    );
}

export default MethodSelector;