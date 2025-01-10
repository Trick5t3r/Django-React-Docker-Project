import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import ChatHeader from "../components/ChatHeader.jsx";
import ChatBox from "../components/chatBoxSession/ChatBox.jsx";
import MessageInput from "../components/MessageInput.jsx";
import DrawerSideBar from "../components/sidebardrawer/DrawerSideBar.jsx";
import DrawerContext from "../components/contextDrawer/DrawerContext.jsx";
import api from "../api";


function ChatPage() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [permanentOpen, setPermanentOpen] = useState(true);
    const [contextOpen, setContextOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentSession, setCurrentSession] = useState(null);
    const chatBoxRef = useRef(null);
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [messageInputHeight, setMessageInputHeight] = useState({ width: 0, height: 0 });
    const contextfilesref = useRef(null);

    const handleMessageInputHeight = (size) => {
        setMessageInputHeight(size); // Gerer la taille dynamique du message input
    };

    useEffect(() => {
        if (headerRef.current) {
            const height = headerRef.current.getBoundingClientRect().height;
            setHeaderHeight(height);
        }
    }, []);

    useEffect(() => {
        if (currentSession) {
            api.get(`/api/chatsessions/${currentSession}/`)
                .then((res) => res.data)
                .then((data) => {
                    setMessages(data.messages);
                })
                .catch((err) => alert("Error loading session messages: " + err));
        }
    }, [currentSession]);

    const handleDrawerToggle = () => {
        if (!mobileOpen) {
            setContextOpen(false); // Close context drawer when sidebar opens
        }if (!permanentOpen) {
            setContextOpen(false); // Close context drawer when sidebar opens
        }
        setMobileOpen(!mobileOpen);
        setPermanentOpen(!permanentOpen);
    };

    const handleContextToggle = (open) => {
        if (!contextOpen) {
            setPermanentOpen(contextOpen); // Close sidebar when context drawer opens
        }
        //setContextOpen(!contextOpen);
        setContextOpen(open);
    };

    const handleSendMessage = (input) => {
        const newMessage = { role: "user", content: input.message, context: {files: input.files} };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        api.patch(`/api/chatsessions/${currentSession}/`, {
            messages: [newMessage],
        })
            .then((res) => {
                if (res.status === 200) {
                    return api.get(`/api/chatsessions/${currentSession}/`);
                } else {
                    throw new Error("Failed to update the session.");
                }
            })
            .then((res) => res.data)
            .then((data) => {
                setMessages(data.messages);
                if(contextfilesref.current){
                    contextfilesref.current.fetchFiles();
                }
            })
            .catch((err) => {
                alert("Error updating the session: " + err);
                setMessages((prevMessages) =>
                    prevMessages.filter((msg) => msg !== newMessage)
                );
            });
    };

    const handleUploadFile = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("sessionid", currentSession);
    
        // Déterminer le type de ressource en fonction de l'extension du fichier
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let resourceType;
    
        if (["png", "jpg", "jpeg", "bmp", "tiff"].includes(fileExtension)) {
            resourceType = "ImageFile";
        } else if (["pdf"].includes(fileExtension)) {
            resourceType = "PDFFile";
        } else if (["xls", "xlsx"].includes(fileExtension)) {
            resourceType = "ExcelFile";
        } else if (["mp3", "wav"].includes(fileExtension)) {
            resourceType = "AudioFile";
        } else if (["mp4", "avi", "mov"].includes(fileExtension)) {
            resourceType = "VideoFile";
        } else {
            resourceType = "OtherFile";
        }
    
        formData.append("resourcetype", resourceType); // Ajoute le champ resourcetype
    
        return api.post(`/api/fileupload/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                if (res.status === 201) {
                    return res.data; // Retourne les données de la réponse
                } else {
                    throw new Error("Failed to upload file.");
                }
            })
            .catch((err) => {
                alert("Error uploading file: " + err.message);
                throw err; // Propager l'erreur pour une gestion ultérieure
            });
    };
    

    const refreshSession = () => {
        if (currentSession) {
            api.get(`/api/chatsessions/${currentSession}/`)
                .then((res) => res.data)
                .then((data) => {
                    setMessages(data.messages);
                    if (chatBoxRef.current) {
                        chatBoxRef.current.scrollToBottom();
                    }
                })
                .catch((err) => alert("Erreur lors du rafraîchissement de la session : " + err));
        }
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <ChatHeader ref={headerRef} onMenuClick={handleDrawerToggle} />
            <DrawerSideBar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
                headerHeight={headerHeight}
                currentSession={currentSession}
                setCurrentSession={setCurrentSession}
                refreshSession={refreshSession}
                setMessages={setMessages}
                permanentOpen={permanentOpen}
                setPermanentOpen={setPermanentOpen}
            />
            <DrawerContext isOpen={contextOpen} handleContextToggle={handleContextToggle} chatsessionId={currentSession} ref={contextfilesref}/>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 2,
                    width: "100%",
                    height: "100%",
                    position: "relative",
                }}
            >
                <Toolbar />
                <ChatBox ref={chatBoxRef} messages={messages} sidebarOpen = {permanentOpen} contextOpen={contextOpen} messageinputHeight={messageInputHeight}/>
                {currentSession && (
                    <MessageInput onSend={handleSendMessage} onUploadFile={handleUploadFile} sessionId={currentSession} sidebarOpen = {permanentOpen} contextOpen={contextOpen} onHeightChange={handleMessageInputHeight} />
                )}
            </Box>
        </Box>
    );
}

export default ChatPage;
