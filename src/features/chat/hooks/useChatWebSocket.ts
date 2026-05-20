import { useEffect, useRef, useState } from "react";

import { useIssueChatWsToken } from "@/features/chat/hooks/useIssueChatWsToken";
import type {
  ChatConnectionStatus,
  ChatErrorMessage,
  ChatReceivedMessage,
  ChatSendMessagePayload,
} from "@/features/chat/types";
import {
  createChatWebSocketUrls,
  isChatErrorMessage,
  isChatReceivedMessage,
} from "@/features/chat/utils/webSocket";

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

      console.info("[chat] Connecting WebSocket.", { url: webSocketUrl });
      socket = new WebSocket(webSocketUrl);
      socketRef.current = socket;
      bindSocketEvents(socket, webSocketUrl, urls, index);
    };

    const bindSocketEvents = (
      nextSocket: WebSocket,
      webSocketUrl: string,
      urls: string[],
      index: number,
    ) => {
      let hasOpened = false;

      nextSocket.onopen = () => {
        hasOpened = true;
        console.info("[chat] WebSocket connected.", { url: webSocketUrl });
        setStatus("open");
      };

      nextSocket.onmessage = (event) => {
        let parsedMessage: unknown;

        try {
          parsedMessage = JSON.parse(String(event.data));
        } catch (error) {
          console.error("[chat] Failed to parse WebSocket message.", error);
          return;
        }

        if (isChatErrorMessage(parsedMessage)) {
          console.error("[chat] WebSocket server error.", parsedMessage);
          onErrorMessageRef.current?.(parsedMessage);
          return;
        }

        if (isChatReceivedMessage(parsedMessage)) {
          console.info("[chat] WebSocket message received.", parsedMessage);
          onMessageRef.current?.(parsedMessage);
        }
      };

      nextSocket.onerror = () => {
        console.error("[chat] WebSocket connection error.", { url: webSocketUrl });
      };

      nextSocket.onclose = (event) => {
        console.info("[chat] WebSocket closed.", {
          code: event.code,
          reason: event.reason,
          url: webSocketUrl,
          wasClean: event.wasClean,
        });

        if (!isActive) {
          return;
        }

        if (!hasOpened && urls[index + 1]) {
          const fallbackUrl = urls[index + 1];
          console.info("[chat] Retrying WebSocket with fallback URL.", { url: fallbackUrl });
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
      } catch (error) {
        console.error("[chat] Failed to connect WebSocket.", error);
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
      console.warn("[chat] Cannot send message because WebSocket is not open.", {
        readyState: socketRef.current?.readyState,
      });
      return false;
    }

    console.info("[chat] Sending WebSocket message.", payload);
    socketRef.current.send(JSON.stringify(payload));
    return true;
  };

  return {
    sendMessage,
    status,
  };
};
