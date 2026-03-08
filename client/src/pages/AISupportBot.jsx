import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  addUserMessage,
  getConversationLogs
} from "../redux/aiChatbotSlice.js";
import { Send } from "lucide-react";

export default function AISupportBot() {

  const dispatch = useDispatch();

  const { messages, logs, loading } = useSelector((state) => state.chat);

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    dispatch(getConversationLogs());
  }, [dispatch]);

  const handleSendMessage = () => {

    if (!newMessage.trim()) return;

    const userMessage = {
      sender: "user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    dispatch(addUserMessage(userMessage));

    // Backend now extracts orderId automatically
    dispatch(
      sendMessage({
        message: newMessage
      })
    );

    setNewMessage("");
  };

  return (
    <div className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          AI WhatsApp Support Bot
        </h1>
        <p className="text-gray-600">
          Monitor and manage AI support conversations
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">

        {/* CHAT PANEL */}

        <div className="bg-white shadow rounded-lg">

          <div className="border-b p-4 font-semibold">
            Live Chat
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">

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
                  className={`px-4 py-2 rounded-lg max-w-xs ${
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

          <div className="p-4 border-t flex gap-2">

            <input
              className="border rounded w-full px-3 py-2"
              placeholder="Type message..."
              value={newMessage}
              onChange={(e) =>
                setNewMessage(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" && handleSendMessage()
              }
            />

            <button
              onClick={handleSendMessage}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              <Send size={16} />
            </button>

          </div>

        </div>

        {/* CONVERSATION LOGS */}

        <div className="bg-white shadow rounded-lg">

          <div className="border-b p-4 font-semibold">
            Conversation Logs
          </div>

          <div className="p-4 overflow-x-auto">

            <table className="w-full text-sm">

              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Date</th>
                  <th>Customer Message</th>
                  <th>AI Response</th>
                  <th>Priority</th>
                </tr>
              </thead>

              <tbody>

                {logs.map((log) => (

                  <tr key={log._id} className="border-b">

                    <td className="py-2">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>

                    <td>{log.customerMessage}</td>

                    <td>{log.aiResponse?.startsWith("{")
                        ? JSON.parse(log.aiResponse).reply
                        : log.aiResponse}
                    </td>
                    
                    <td>
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