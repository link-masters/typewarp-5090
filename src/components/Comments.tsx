"use client";

import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  replies: Comment[];
}

// Sample comments for demonstration
const sampleComments: Comment[] = [
  {
    id: "1",
    author: "Alex Gaming",
    avatar: "A",
    content:
      "This guide is incredible! I've been using the cursed text generator for my Discord username and everyone always asks how I made it look so cool. TypeWarp is definitely the best tool out there.",
    date: "2 days ago",
    likes: 24,
    replies: [
      {
        id: "1-1",
        author: "TypeWarp Team",
        avatar: "T",
        content:
          "Thanks Alex! We're glad you're enjoying the tool. Stay tuned for more features coming soon! 🔥",
        date: "1 day ago",
        likes: 8,
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "DigitalArtist_",
    avatar: "D",
    content:
      "Perfect for my horror game aesthetic. The zalgo text option creates exactly the corrupted look I was going for in my indie game's dialogue system.",
    date: "5 days ago",
    likes: 42,
    replies: [],
  },
  {
    id: "3",
    author: "SocialMediaPro",
    avatar: "S",
    content:
      "Finally, a comprehensive guide that explains how Unicode actually works! I've been using these tools for years without understanding the technology behind it. Great educational content.",
    date: "1 week ago",
    likes: 67,
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
        isReply ? "ml-12 mt-4" : ""
      } p-5 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${
            comment.author.includes("TypeWarp")
              ? "bg-gradient-to-br from-red-500 to-purple-500"
              : "bg-gradient-to-br from-zinc-600 to-zinc-800"
          }`}
        >
          {comment.avatar}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-[var(--foreground)]">
              {comment.author}
            </span>
            {comment.author.includes("TypeWarp") && (
              <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-xs font-bold rounded-full">
                Team
              </span>
            )}
            <span className="text-[var(--muted)] text-sm">{comment.date}</span>
          </div>

          {/* Content */}
          <p className="text-[var(--muted)] mb-4">{comment.content}</p>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                liked
                  ? "text-red-500"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <svg
                className="w-4 h-4"
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              {comment.likes + (liked ? 1 : 0)}
            </button>
            {!isReply && (
              <button
                onClick={() => setShowReplyInput(!showReplyInput)}
                className="flex items-center gap-2 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Reply
              </button>
            )}
          </div>

          {/* Reply Input */}
          {showReplyInput && (
            <div className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Write a reply..."
                className="flex-1 px-4 py-3 bg-[var(--background)] border border-[var(--card-border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-red-500/50"
              />
              <button className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors">
                Send
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Nested Replies */}
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
    // In a real app, this would submit to an API
    alert("Comments will be connected to a backend service. This is a demo.");
    setNewComment("");
  };

  return (
    <section className="mt-16 pt-12 border-t border-[var(--card-border)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500/20 to-purple-500/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-black text-[var(--foreground)]">
              Discussion
            </h2>
            <p className="text-sm text-[var(--muted)]">
              {sampleComments.length} comments • Join the conversation
            </p>
          </div>
        </div>

        {/* Sort Options */}
        <div className="flex items-center gap-2 bg-[var(--card-bg)] p-1 rounded-xl border border-[var(--card-border)]">
          <button
            onClick={() => setSortBy("popular")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
              sortBy === "popular"
                ? "bg-red-500 text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Popular
          </button>
          <button
            onClick={() => setSortBy("newest")}
            className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
              sortBy === "newest"
                ? "bg-red-500 text-white"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            Newest
          </button>
        </div>
      </div>

      {/* Comment Input */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="p-6 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts on this article..."
            className="w-full p-4 bg-[var(--background)] border border-[var(--card-border)] rounded-xl text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-red-500/50 resize-none min-h-[120px]"
          />
          <div className="flex items-center justify-between mt-4">
            <p className="text-xs text-[var(--muted)]">
              💡 Tip: Be constructive and respectful in your discussions.
            </p>
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-purple-500 hover:from-red-600 hover:to-purple-600 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Post Comment
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {sampleComments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="px-8 py-4 bg-[var(--card-bg)] border border-[var(--card-border)] rounded-2xl text-[var(--foreground)] font-bold hover:border-red-500/50 transition-all">
          Load More Comments
        </button>
      </div>
    </section>
  );
}
