// wayapi-cli/src/components/Infos.tsx
import { Box, Text } from 'ink';

export interface InfosProps {
    infos: {
        status: number | string | null;
        time: number | string | null;
    },
    modeContent: "body" | "headers";
    isActive: boolean;
}

const Infos = ({ infos, modeContent, isActive }: InfosProps) => {
    return (
        <Box gap={2} alignItems="center" width="100%" justifyContent="space-between">
            <Box gap={1}>
                <Box borderStyle="round" borderColor="white">
                    <Text>Status: {infos.status ?? '--'}</Text>
                </Box>
    
                <Box borderStyle="round" borderColor="white">
                    <Text>Time: {infos.time ? `${infos.time}ms` : '--'}</Text>
                </Box>
            </Box>

            <Box gap={1}>
                <Text
                    bold={modeContent === "body"}
                    color={modeContent === "body" ? "#4AAD52" : "#507255"}
                    dimColor={!isActive}
                >
                    [1] Body
                </Text>
            
                <Text
                    bold={modeContent === "headers"}
                    color={modeContent === "headers" ? "#4AAD52" : "#507255"}
                    dimColor={!isActive}
                >
                    [2] Headers
                </Text>
            </Box>
        </Box>
    );
};

export default Infos;
