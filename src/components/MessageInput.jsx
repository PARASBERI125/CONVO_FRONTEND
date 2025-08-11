import React, { useRef, useState, useEffect } from "react";
import { useChatStore } from "../store/ChatStore";
import { Image, Send, X } from "lucide-react";
import { toast } from "react-toastify";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileinputref = useRef(null);
  const { sendMessage } = useChatStore();
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null);

  const sendButtonRef = useRef(null);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendButtonRef.current?.click();
    }
  };

  // 🔁 Auto expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = 140;
      textareaRef.current.style.overflowY =
        scrollHeight > maxHeight ? "auto" : "hidden";
      textareaRef.current.style.height = `${Math.min(
        scrollHeight,
        maxHeight
      )}px`;
    }
  }, [text]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      setLoading(true);
      await sendMessage({ text: text.trim(), image: imagePreview });
      setText("");
      setImagePreview(null);
      if (fileinputref.current) fileinputref.current.value = "";
    } catch (error) {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileinputref.current) fileinputref.current.value = "";
  };

  const handleimageselect = (e) => {
    const file = e.target.files[0];
    if (!file?.type?.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-4 w-full sticky bottom-0 z-20">
      {imagePreview && (
        <div className="relative mb-2 w-18 h-18">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={removeImage}
            className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center cursor-pointer"
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-0.5">
        <div className="flex-1 relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileinputref}
            onChange={handleimageselect}
            disabled={loading}
          />

          <button
            type="button"
            className="absolute left-3 top-2.5 z-10 text-emerald-500 cursor-pointer"
            onClick={() => fileinputref.current?.click()}
            disabled={loading}
          >
            <Image size={18} />
          </button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="w-full pl-12 pr-4 py-1.5 rounded-lg input input-bordered input-sm sm:input-md resize-none min-h-[2.5rem] max-h-40 focus:outline-none focus:ring-0 focus:border-primary"
            style={{
              lineHeight: "1.5",
              overflowX: "hidden",
              overflowY: "auto",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
            disabled={loading}
            onKeyDown={handleKeyDown}
          />
        </div>

        {loading ? (
          <div className="spinner" />
        ) : (
          <button
            ref={sendButtonRef}
            type="submit"
            className="btn btn-sm btn-circle mb-1 cursor-pointer"
            disabled={!text.trim() && !imagePreview}
          >
            <Send size={24} />
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
