import { useEffect, useRef, useState } from "react";

import {
  createChatWebSocketUrls,
  isChatErrorMessage,
  isChatReceivedMessage,
  useIssueChatWsToken,
} from "@/features/chat";
import type {
  ChatConnectionStatus,
  ChatErrorMessage,
  ChatReceivedMessage,
  ChatSendMessagePayload,
} from "@/features/chat";

type UseChatWebSocketParams = {
  enabled?: boolean;
  onErrorMessage?: (message: ChatErrorMessage) => void;
  onMessage?: (message: ChatReceivedMessage) => void;
};

export const useChatWebSocket = ({
  enabled = true,
  onErrorMessage,
  onMessage,
}: UseChatWebSocketParams) => {
  const socketRef = useRef<WebSocket | null>(null);
  const onErrorMessageRef = useRef(onErrorMessage);
  const onMessageRef = useRef(onMessage);
  const [status, setStatus] = useState<ChatConnectionStatus>("idle");
  const { mutateAsync: issueWsToken } = useIssueChatWsToken();

  useEffect(() => {
    onErrorMessageRef.current = onErrorMessage;
    onMessageRef.current = onMessage;
  }, [onErrorMessage, onMessage]);

  useEffect(() => {
    if (!enabled) {
      setStatus("idle");
      socketRef.current?.close();
      socketRef.current = null;
      return;
    }

    let isActive = true;
    let socket: WebSocket | null = null;

    const connectSocket = (urls: string[], index: number) => {
      const webSocketUrl = urls[index];

      if (!webSocketUrl) {
        setStatus("error");
        return;
      }

      socket = new WebSocket(webSocketUrl);
      socketRef.current = socket;
      bindSocketEvents(socket, urls, index);
    };

    const bindSocketEvents = (nextSocket: WebSocket, urls: string[], index: number) => {
      let hasOpened = false;

      nextSocket.onopen = () => {
        hasOpened = true;
        setStatus("open");
      };

      nextSocket.onmessage = (event) => {
        let parsedMessage: unknown;

        try {
          parsedMessage = JSON.parse(String(event.data));
        } catch {
          return;
        }

        if (isChatErrorMessage(parsedMessage)) {
          onErrorMessageRef.current?.(parsedMessage);
          return;
        }

        if (isChatReceivedMessage(parsedMessage)) {
          onMessageRef.current?.(parsedMessage);
        }
      };

      nextSocket.onerror = () => {};

      nextSocket.onclose = () => {
        if (!isActive) {
          return;
        }

        if (!hasOpened && urls[index + 1]) {
          connectSocket(urls, index + 1);
          return;
        }

        setStatus(hasOpened ? "closed" : "error");
      };
    };

    const connect = async () => {
      setStatus("connecting");

      try {
        const { wsToken } = await issueWsToken();

        if (!isActive) {
          return;
        }

        const webSocketUrls = createChatWebSocketUrls(wsToken);

        if (webSocketUrls.length === 0) {
          throw new Error("WebSocket URL could not be created.");
        }

        connectSocket(webSocketUrls, 0);
      } catch {
        setStatus("error");
      }
    };

    void connect();

    return () => {
      isActive = false;
      socket?.close();

      if (socketRef.current === socket) {
        socketRef.current = null;
      }
    };
  }, [enabled, issueWsToken]);

  const sendMessage = (payload: ChatSendMessagePayload) => {
    if (socketRef.current?.readyState !== WebSocket.OPEN) {
      return false;
    }

    socketRef.current.send(JSON.stringify(payload));
    return true;
  };

  return {
    sendMessage,
    status,
  };
};
