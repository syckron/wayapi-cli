// wayapi-cli/src/components/EditForm.tsx
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';
import { useState, useEffect } from 'react';

interface Props {
    onGetContent: (postContent: string) => void;
    contentForEdit: string;
    isActive: boolean;
}

const EditForm = ({ onGetContent, contentForEdit, isActive }: Props) => {
    const [value, setValue] = useState<string>("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        if (contentForEdit) {
            setValue(contentForEdit);
        }
    }, [contentForEdit]);

    useEffect(() => {
        if (!value) {
            setIsValid(null);
            setError("");
            return;
        }

        const timer = setTimeout(() => {
            try {
                JSON.parse(value);

                setIsValid(true);
                setError("");
            } catch (err: any) {
                setIsValid(false);

                let message = err.message;

                if (message.includes("Unexpected token")) {
                    message = "Syntax error (unexpected token)";
                } else if (message.includes("Unexpected end")) {
                    message = "Incomplete JSON (Something is missing to close.)";
                }

                setError(message);
            }
        }, 3500);

        return () => clearTimeout(timer);
    }, [value]);

    const borderColor =
        isValid === null ? "green" :
        isValid ? "green" : "red";

    return (
        <Box flexDirection="column" width="100%" alignItems="center">
            
            <Box marginBottom={1}>
                {isValid === true && (
                    <Text color="green">✓ ok</Text>
                )}
                {isValid === false && (
                    <Text color="red">X {error}</Text>
                )}
                {isValid === null && (
                    <Text dimColor>...</Text>
                )}
            </Box>

            <Box width="100%" borderColor={borderColor} borderStyle="round">
                {isActive ? (
                    <TextInput
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                            onGetContent(newValue);
                        }}
                        onSubmit={onGetContent}
                        placeholder='{"example": true}'
                    />
                ) : (
                    <Text dimColor>{value || "Body Here."}</Text>
                )}
            </Box>
        </Box>
    );
};

export default EditForm;