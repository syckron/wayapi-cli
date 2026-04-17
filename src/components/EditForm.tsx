// wayapi-cli/src/components/EditForm.tsx
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';
import { useState, useEffect } from 'react';

interface Props {
    onGetContent: (postContent: string) => void;
    contentForEdit: string;
    isActive: boolean;
}

const EditForm = ({ onGetContent, contentForEdit, isActive }: Props) => {
    const [value, setValue] = useState<string>("");
    const [fullValue, setFullValue] = useState<string>("");
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [error, setError] = useState<string>("");

    const MAX_LINES = 20;

    useInput((input, key) => {
        if (!isActive) return;

        if (key.downArrow) {
            setIsExpanded(true);
            setValue(fullValue);
        }

        if (key.upArrow) {
            setIsExpanded(false);
            setValue(
                fullValue
                    .split('\n')
                    .slice(0, MAX_LINES)
                    .join('\n')
            );
        }
    });

    useEffect(() => {
        if (!isActive) {
            setIsExpanded(false);
        }
    }, [isActive]);

    useEffect(() => {
        if (!contentForEdit) return;

        const lines = contentForEdit.split('\n');

        setFullValue(contentForEdit);

        if (lines.length > MAX_LINES) {
            setValue(lines.slice(0, MAX_LINES).join('\n'));
            setIsExpanded(false);
        } else {
            setValue(contentForEdit);
            setIsExpanded(true);
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
        }, 200);

        return () => clearTimeout(timer);
    }, [value]);

    const borderColor =
        isValid === null ? "green" :
        isValid ? "green" : "red";

    return (
        <Box flexDirection="column" width="100%" alignItems="center">

            <Box marginBottom={1}>
                {isValid === true && <Text color="green">✓ ok</Text>}
                {isValid === false && <Text color="red">X {error}</Text>}
                {isValid === null && <Text dimColor>...</Text>}
            </Box>

            <Box width="100%" borderColor={borderColor} borderStyle="round">
                <TextInput
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        setFullValue(newValue);
                        onGetContent(newValue);
                    }}
                    onSubmit={onGetContent}
                    placeholder='{"example": true}'
                    focus={isActive}
                />
            </Box>

            {fullValue.split('\n').length > MAX_LINES && (
                <Text dimColor>
                    {isExpanded ? "↑ Collapse" : "↓ Expand"}
                </Text>
            )}

        </Box>
    );
};

export default EditForm;