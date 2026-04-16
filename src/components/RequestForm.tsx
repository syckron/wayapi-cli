// wayapi-cli/src/components/RequesForm.tsx
import TextInput from 'ink-text-input';
import { Box, Text } from 'ink';
import { useState } from 'react';

interface Props {
    onSubmit: (url: string) => void;
    onChange: (url: string) => void;
    isActive: boolean;
}

const RequestForm = ({ onSubmit, onChange, isActive }: Props) => {
    const [value, setValue] = useState<string>("");

    return (
        <Box gap={1} borderStyle="round" borderColor="white">
            <Text color="green">URL:</Text>
            {isActive ? (
                <TextInput
                    value={value}
                    onChange={(v) => {
                        setValue(v);
                        onChange(v);
                    }}
                    onSubmit={onSubmit}
                    placeholder="Url here."
                />
            ) : (
                <Text dimColor>{value || "Url here."}</Text>
            )}
        </Box>
    )
}

export default RequestForm;