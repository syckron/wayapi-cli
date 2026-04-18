// wayapi-cli/src/components/Content.tsx
import { Box, Text } from 'ink';
import type { Contents, Info, ModeContents, PayLoadStatus, JsonValue } from '../types/types.js';
import JsonViewer from './JsonViewer.js';

type ContentProps = {
    content: Contents;
    infos: Info;
    modeContent: ModeContents;
    isActive: boolean;
    payloadStatus: PayLoadStatus;
};

const Content = ({
    content,
    infos,
    modeContent,
    isActive,
    payloadStatus
}: ContentProps) => {

    const renderBody = (body: JsonValue | string | null) => {
        if (!body) return <Text dimColor>No content</Text>;

        if (typeof body === "string") {
            return <Text>{body}</Text>;
        }

        return <JsonViewer data={body} />;
    };

    const renderHeaders = (headers: Record<string, string> | null) => {
        if (!headers) return <Text dimColor>No headers</Text>;

        return <JsonViewer data={headers} />;
    };

    return (
        <Box flexDirection="column" borderStyle="round" borderColor={isActive ? "green" : "gray"} padding={1}>
            
            <Box justifyContent="space-between">
                <Text>
                    Status: {infos.status ?? "-"}
                </Text>
                <Text>
                    Time: {infos.time ? `${infos.time}ms` : "-"}
                </Text>
            </Box>

            {payloadStatus.message && (
                <Text color={payloadStatus.valid ? "green" : "red"}>
                    {payloadStatus.message}
                </Text>
            )}

            <Box marginTop={1}>
                <Text dimColor>
                    {modeContent === "body" ? "[1] Body" : " 1  Body"} |{" "}
                    {modeContent === "headers" ? "[2] Headers" : " 2  Headers"}
                </Text>
            </Box>

            <Box marginTop={1}>
                {modeContent === "body"
                    ? renderBody(content.body)
                    : renderHeaders(content.headers)
                }
            </Box>

        </Box>
    );
};

export default Content;