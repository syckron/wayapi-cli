#!/usr/bin/env node
// wayapi-cli/src/app.tsx
import { render, Text, Box, useInput, useApp, useStdout } from 'ink';
import { parseJsonSafely } from './utils/typeGuards.js';
import type { Mode, ModeContents, Contents, Info, PayLoadStatus } from './types/types.js';
import RequestForm from './components/RequestForm.js';
import Content from './components/Content.js';
import MethodSelector from './components/MethodSelector.js';
import EditForm from './components/EditForm.js';
import { request } from './services/api.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [mode, setMode] = useState<Mode>("url");
    const [modeContent, setModeContent] = useState<ModeContents>("body");
    const [method, setMethod] = useState<string>("GET");
    const [urlInput, setUrlInput] = useState<string>("");
    const [requestTrigger, setRequestTrigger] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [postBody, setPostBody] = useState<string>("");
    const [contentForEdit, setContentForEdit] = useState<string>("");
    const [infos, setInfos] = useState<Info>({
        status: null, time: null
    });
    const [content, setContent] = useState<Contents>({
        body: null, headers: null
    });
    const [payloadStatus, setPayloadStatus] = useState<PayLoadStatus>({
        valid: null,
        message: ""
    });
    
    const { exit } = useApp();
    const { stdout } = useStdout();

    const maxWidth = 90;
    const currentWidth = stdout ? Math.min(stdout.columns, maxWidth) : maxWidth;
    
    useInput((input, key) => {
        if (key.escape) exit();
    
        if (mode === "content") {
            if (input === "1") setModeContent("body");
            if (input === "2") setModeContent("headers");
        }
    
        if (key.tab) {
            setMode(m => {
                if (m === "url") return "method";
                if (m === "method") return "body";
                if (m === "body") return "content";
                return "url";
            });
        };
    });

    useEffect(() => {
        if (!urlInput || !["PUT", "PATCH"].includes(method)) return;
    
        const timer = setTimeout(async () => {
            try {
                const { body } = await request("GET", urlInput);
                setContentForEdit(JSON.stringify(body, null, 2));
            } catch (err) {
                setContentForEdit("");
            }
        }, 1000);
    
        return () => clearTimeout(timer);
    }, [urlInput, method]);
    
    const handleSubmit = (val: string) => {
        setUrlInput(val);
        setRequestTrigger(prev => prev + 1);
    }
    
    const handleGetContent = (contentPost: string) => {
        setPostBody(contentPost);
    }
    
    useEffect(() => {
        if (requestTrigger === 0 || !urlInput) return;
        
        const manageApi = async () => {
            setLoading(true);
            
            try {
                let bodyToSend: any = undefined;

                if (["POST", "PUT", "PATCH"].includes(method) && postBody) {
                    const parseResult = parseJsonSafely(postBody);
                
                    if (parseResult.success) {
                        bodyToSend = parseResult.data;
                        setPayloadStatus({
                            valid: true,
                            message: "✓ Valid JSON"
                        });
                    } else {
                        bodyToSend = postBody;
                        setPayloadStatus({
                            valid: false,
                            message: "X Invalid JSON\n⚠ sent as text (RAW)"
                        });
                    }
                }
                
                const { body, status, time, headers } = await request(
                    method, 
                    urlInput, 
                    bodyToSend
                );
                
                setContent({ body, headers });
                setInfos({ status, time });
                
            } catch (err: unknown) {
                if (axios.isAxiosError(err)) {
                    const errorMessage = err.response?.data?.message ?? err.message;
                    setInfos({
                        status: err.response?.status ?? null,
                        time: null
                    });
                    setContent({ 
                        body: `API Error: ${errorMessage}`, 
                        headers: null 
                    });
                } else if (err instanceof Error) {
                    setInfos({ status: null, time: null });
                    setContent({ 
                        body: `Error: ${err.message}`, 
                        headers: null 
                    });
                } else {
                    setContent({ 
                        body: "Unexpected error", 
                        headers: null 
                    });
                }
            } finally {
                setLoading(false);
            }
        }
        
        manageApi();
    }, [requestTrigger]);
    
    useEffect(() => {
        if (!["POST", "PUT", "PATCH"].includes(method)) {
            setPayloadStatus({
                valid: null,
                message: ""
            });
        }
    }, [method]);
    
    return (
        <Box width="100%" justifyContent="center" paddingX={1}>
            <Box 
                width={currentWidth} 
                gap={1} 
                borderStyle="round" 
                borderColor="cyan" 
                flexDirection="column"
            >
                <RequestForm onSubmit={handleSubmit} onChange={setUrlInput} isActive={mode === "url"} />
                
                <Box flexDirection="column">
                    <Text dimColor>
                        Tab to switch • {mode.toUpperCase()} | ESC - Exit {loading && "| Loading..."}
                    </Text>
                    <MethodSelector onChange={setMethod} isActive={mode === "method"} />
                </Box>

                {["POST", "PUT", "PATCH"].includes(method) && (
                    <EditForm key={method} onGetContent={handleGetContent} contentForEdit={contentForEdit} isActive={mode === "body"} />
                )}
                
                <Content 
                    content={content} 
                    infos={infos} 
                    modeContent={modeContent} 
                    isActive={mode === "content"} 
                    payloadStatus={payloadStatus} 
                />
            </Box>
        </Box>
    );
}

render(<App />);
