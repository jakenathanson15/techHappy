"use client";

import { useState, useEffect } from "react";

export function useBookmarks() {
  const [bookmarkedCharityIds, setBookmarkedCharityIds] = useState<string[]>([]);
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>([]);
  const [likedStoryIds, setLikedStoryIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedCharities = localStorage.getItem("techhappy_saved_charities");
      if (storedCharities) {
        setBookmarkedCharityIds(JSON.parse(storedCharities));
      }
      const storedStories = localStorage.getItem("techhappy_saved_stories");
      if (storedStories) {
        setBookmarkedStoryIds(JSON.parse(storedStories));
      }
      const storedLikes = localStorage.getItem("techhappy_liked_stories");
      if (storedLikes) {
        setLikedStoryIds(JSON.parse(storedLikes));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleCharityBookmark = (id: string) => {
    setBookmarkedCharityIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("techhappy_saved_charities", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleStoryBookmark = (id: string) => {
    setBookmarkedStoryIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("techhappy_saved_stories", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const toggleStoryLike = (id: string) => {
    setLikedStoryIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("techhappy_liked_stories", JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  return {
    bookmarkedCharityIds,
    bookmarkedStoryIds,
    likedStoryIds,
    toggleCharityBookmark,
    toggleStoryBookmark,
    toggleStoryLike,
    isCharityBookmarked: (id: string) => bookmarkedCharityIds.includes(id),
    isStoryBookmarked: (id: string) => bookmarkedStoryIds.includes(id),
    isStoryLiked: (id: string) => likedStoryIds.includes(id),
  };
}
