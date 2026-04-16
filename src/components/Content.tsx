// wayapi-cli/src/components/Context.tsx
import { Box, Text } from 'ink';
import Infos, { type InfosProps } from './Infos.js';
import { type Contents } from '../app.js';

type ModeContents = "body" | "headers";


interface Props {
    content: Contents;
    infos: InfosProps["infos"];
    modeContent: ModeContents;
    isActive: boolean;
    payloadStatus: {
        valid: boolean | null;
        message: string;
    };
}

const Content = ({ content, infos, modeContent, isActive, payloadStatus }: Props) => {
    const display = modeContent === "body" ? content.body : content.headers;
    
    const displayText = (() => {
        if (!display) return "--";
        
        if (typeof display === 'string') {
            return display;
        }
        
        try {
            return JSON.stringify(display, null, 2);
        } catch {
            return "Erro ao formatar conteúdo";
        }
    })();

    return (
        <Box alignItems="center" flexDirection="column">
            {payloadStatus.valid !== null && (
                <Box marginBottom={1}>
                    <Text color={payloadStatus.valid ? "green" : "red"}>
                        {payloadStatus.message}
                    </Text>
                </Box>
            )}
            <Box width="100%" flexDirection="column">
                <Infos infos={infos} modeContent={modeContent} isActive={isActive} />
                <Box borderStyle="round" borderColor="blue">
                    <Text>{displayText}</Text>
                </Box>
            </Box>
        </Box>
    );
}

export default Content;