import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import MarkdownRenderer from "./MarkdownRenderer.jsx";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

function MessageBubble({ msg }) {
  const role = msg?.role || null;
  const content = msg?.content || null;
  const context = msg?.context || null;

  const isUser = role === "user";
  const isAssistant = role === "assistant";

  if (!isUser && !isAssistant) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isUser ? "flex-end" : "flex-start",
        alignItems: "flex-start",
        mb: 1,
      }}
    >
      {isAssistant && (
        <Avatar
          sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            width: 32,
            height: 32,
            mr: 1,
            mt :2.5,
          }}
        >
          <SmartToyIcon />
        </Avatar>
      )}

      <Box
        sx={{
          maxWidth: "75%",
          px: 2,
          py: 1,
          borderRadius: 2,
          bgcolor: isUser ? "gray_color.main" : "background.default",
          color: isUser ? "gray_color.contrastText" : "black",
        }}
      >
        <Typography variant="body1" sx={{ color: isUser ? "gray_color.contrastText" : "black" }}>
          {/* <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown> */}
          <MarkdownRenderer markdown={content} />
        </Typography>

        {context && context.files && context.files.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 0,
            }}
          >
            {context.files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "100px",
                  height: "100px",
                  borderRadius: 1,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <a
                  href={file.fileData.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none" }}
                >
                  {file.fileData.resourcetype === "ImageFile" ? (
                    <Box
                      component="img"
                      src={file.fileData.file}
                      alt={`File Preview ${index}`}
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <Typography
                        variant="body2"
                        sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word", // Gère les mots longs
                        wordBreak: "break-word", // Permet de casser les mots si nécessaire
                        maxWidth: "100%", // Empêche le débordement horizontal
                        }}
                    >
                      {file.fileData.title}
                    </Typography>
                  )}
                </a>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {isUser && (
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            color: "secondary.contrastText",
            width: 32,
            height: 32,
            ml: 1,
          }}
        >
          <PersonIcon />
        </Avatar>
      )}
    </Box>
  );
}

export default MessageBubble;
