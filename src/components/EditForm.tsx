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

    useEffect(() => {
        if (contentForEdit) {
            setValue(contentForEdit);
        }
    }, [contentForEdit]);

    return (
        <Box borderColor="green" borderStyle="round">
            {isActive ? (
                <TextInput
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                        onGetContent(newValue);
                    }}
                    onSubmit={onGetContent}
                    placeholder="Write here."
                />
            ) : (
                <Text dimColor>{value || "Body Here."}</Text>
            )}
        </Box>
    );
}

export default EditForm;