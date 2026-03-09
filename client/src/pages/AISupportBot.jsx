import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  addUserMessage,
  getConversationLogs
} from "../redux/aiChatbotSlice.js";
import { Send } from "lucide-react";

function getSessionId() {
  let session = localStorage.getItem("chatSessionId");

  if (!session) {
    session = crypto.randomUUID();
    localStorage.setItem("chatSessionId", session);
  }

  return session;
}

export default function AISupportBot() {

  const dispatch = useDispatch();
  const { messages, logs, loading } = useSelector((state) => state.chat);
  const [newMessage, setNewMessage] = useState("");

  const sessionId = getSessionId();

  useEffect(() => {
    dispatch(getConversationLogs(sessionId));
  }, [dispatch, sessionId]);

  const handleSendMessage = () => {

    if (!newMessage.trim()) return;

    const userMessage = {
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    dispatch(addUserMessage(userMessage));

    dispatch(
      sendMessage({
        message: newMessage,
        sessionId
      })
    );

    setNewMessage("");
  };

  return (
    <div className="p-4 sm:p-6">

      <div className="mb-4 sm:mb-6">
        <h1 className="text-xl sm:text-2xl font-semibold">
          AI WhatsApp Support Bot
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Monitor and manage AI support conversations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        <div className="flex flex-col h-[36rem] sm:h-[38rem] bg-white shadow rounded-lg">

          <div className="border-b p-3 sm:p-4 font-semibold">
            Live Chat
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 bg-gray-50">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg max-w-xs ${
                    msg.sender === "user"
                      ? "bg-gray-200"
                      : "bg-green-600 text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <p className="text-sm text-gray-500">
                AI is typing...
              </p>
            )}

          </div>

          <div className="p-3 sm:p-4 border-t flex gap-2">

            <input
              className="border rounded w-full px-3 py-2 text-sm sm:text-base"
              placeholder="Type message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && handleSendMessage()
              }
            />

            <button
              onClick={handleSendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center"
            >
              <Send size={16} />
            </button>

          </div>
        </div>

        <div className="bg-white shadow rounded-lg flex flex-col">

          <div className="border-b p-3 sm:p-4 font-semibold">
            Conversation Logs
          </div>

          <div className="p-3 sm:p-4 overflow-x-auto">

            <table className="w-full text-sm sm:text-base border border-gray-200 border-collapse">

              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="py-2 px-2 border-r">Date</th>
                  <th className="py-2 px-2 border-r">Customer Message</th>
                  <th className="py-2 px-2 border-r">AI Response</th>
                  <th className="py-2 px-2">Priority</th>
                </tr>
              </thead>

              <tbody>
                {logs.map((log) => (
                  <tr key={log._id} className="border-b">

                    <td className="py-2 px-2 border-r">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>

                    <td className="py-2 px-2 border-r">
                      {log.customerMessage}
                    </td>

                    <td className="py-2 px-2 border-r">
                      {log.aiResponse?.startsWith("{")
                        ? JSON.parse(log.aiResponse).reply
                        : log.aiResponse}
                    </td>

                    <td className="py-2 px-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          log.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100"
                        }`}
                      >
                        {log.priority}
                      </span>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </div>
  );
}