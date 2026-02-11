"use client";

import { useState } from "react";
import {
  MessageSquare,
  Heart,
  Reply,
  Send,
  User,
  Ghost,
  Terminal,
} from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
}

const sampleComments: Comment[] = [
  {
    id: "1",
    author: "Alex_Gaming",
    avatar: "A",
    content:
      "Initialize sequence successful. This guide is incredible! I've been using the cursed text generator for my Discord username and the digital fallout is perfect. TypeWarp is the definitive tool for digital entropy.",
    date: "2 days ago",
    likes: 24,
    replies: [
      {
        id: "1-1",
        author: "TypeWarp_Team",
        avatar: "T",
        content:
          "Acknowledgement received, Alex. We're glad the transformation protocols are meeting your requirements. Stay tuned for future module updates. 🔥",
        date: "1 day ago",
        likes: 8,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "DigitalArtist_01",
    avatar: "D",
    content:
      "Perfect for my horror game aesthetic. The zalgo mapping creates exactly the corrupted metadata look I was aiming for. High-fidelity glitch.",
    date: "5 days ago",
    likes: 42,
    replies: [],
  },
];

function CommentCard({
  comment,
  isReply = false,
}: {
  comment: Comment;
  isReply?: boolean;
}) {
  const [liked, setLiked] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);

  return (
    <div
      className={`${
        isReply ? "ml-8 mt-6 border-l-2 border-accent-glitch/20 pl-6" : ""
      } p-6 bg-bg-card border border-white/5 relative group`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`w-10 h-10 border flex items-center justify-center font-mono font-black shrink-0 ${
            comment.author.includes("TypeWarp")
              ? "border-accent-glitch bg-accent-glitch/10 text-accent-glitch"
              : "border-white/10 bg-white/5 text-white/40"
          }`}
        >
          {comment.avatar}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-3 font-mono">
            <span className="text-xs font-black text-white uppercase tracking-widest">
              {comment.author}
            </span>
            {comment.author.includes("TypeWarp") && (
              <span className="px-2 py-0.5 bg-accent-glitch text-black text-[8px] font-black uppercase tracking-tighter">
                CORE_ADMIN
              </span>
            )}
            <span className="text-[9px] text-text-muted uppercase tracking-widest">
              {comment.date}
            </span>
          </div>

          <p className="text-text-muted font-mono text-sm leading-relaxed mb-6">
            {comment.content}
          </p>

          <div className="flex items-center gap-6 font-mono">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 text-[10px] uppercase tracking-widest transition-colors ${
                liked
                  ? "text-accent-glitch"
                  : "text-text-muted hover:text-white"
              }`}
            >
              <Heart className={`w-3 h-3 ${liked ? "fill-current" : ""}`} />
              {comment.likes + (liked ? 1 : 0)}
            </button>
            {!isReply && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-text-muted hover:text-white transition-colors"
              >
                <Reply className="w-3 h-3" />
                Reply
              </button>
            )}
          </div>

          {showReplyInput && (
            <div className="mt-6 flex gap-3">
              <input
                type="text"
                placeholder="LOAD_REPLY_BUFFER..."
                className="flex-1 px-4 py-3 bg-bg-void border border-white/10 text-white font-mono text-xs outline-none focus:border-accent-glitch/50"
              />
              <button className="px-4 py-3 bg-accent-glitch text-black font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all">
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {comment.replies.map((reply) => (
        <CommentCard key={reply.id} comment={reply} isReply />
      ))}
    </div>
  );
}

export default function Comments({ postSlug }: { postSlug: string }) {
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("popular");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      "COMMS_PROTOCOL: Backend connection pending. Finalizing transmission sequence.",
    );
    setNewComment("");
  };

  return (
    <section className="mt-20 pt-16 border-t border-white/5">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 font-mono">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 border border-accent-glitch/20 bg-accent-glitch/5 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-accent-glitch animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tighter">
              Comm_Channel
            </h2>
            <p className="text-[9px] text-text-muted uppercase tracking-[0.2em]">
              {sampleComments.length}_TRANSMISSIONS_DETECTED
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/5">
          <button
            onClick={() => setSortBy("popular")}
            className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
              sortBy === "popular"
                ? "bg-accent-glitch text-black"
                : "text-text-muted hover:text-white"
            }`}
          >
            POPULAR
          </button>
          <button
            onClick={() => setSortBy("newest")}
            className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest transition-all ${
              sortBy === "newest"
                ? "bg-accent-glitch text-black"
                : "text-text-muted hover:text-white"
            }`}
          >
            NEWEST
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-12">
        <div className="p-8 bg-bg-card border border-white/5 group relative">
          <div className="text-[9px] font-mono text-accent-glitch uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
            <Terminal className="w-3 h-3" />
            INPUT_PAYLOAD
          </div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="ENTER_DATA_TO_TRANSMIT..."
            className="w-full p-4 bg-bg-void border border-white/10 text-white font-mono text-sm outline-none focus:border-accent-glitch/50 resize-none min-h-[140px]"
          />
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
            <div className="text-[9px] font-mono text-text-muted uppercase tracking-widest flex items-center gap-2">
              <Ghost className="w-3 h-3" />
              ANONYMOUS_SESSION_ACTIVE
            </div>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="w-full sm:w-auto px-8 py-4 bg-accent-glitch text-black font-black text-[10px] uppercase tracking-[0.4em] transition-all disabled:opacity-30 flex items-center justify-center gap-3 active:scale-95"
            >
              <Send className="w-4 h-4" />
              POST_SIGNAL
            </button>
          </div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-glitch/20 to-transparent" />
        </div>
      </form>

      <div className="space-y-6">
        {sampleComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-12">
        <button className="w-full py-4 border border-white/10 font-mono text-[9px] text-text-muted uppercase tracking-[0.5em] hover:border-accent-glitch/30 hover:text-white transition-all">
          LOAD_ADDITIONAL_PACKETS
        </button>
      </div>
    </section>
  );
}
