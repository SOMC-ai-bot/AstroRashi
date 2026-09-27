'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CommunityPost } from '@/types';
import { SAMPLE_COMMUNITY_POSTS } from '@/lib/mock/seed-data';
import { useAuth } from './auth-context';

interface CommunityContextType {
  posts: CommunityPost[];
  activeFeed: 'forYou' | 'following' | 'trending' | 'latest';
  setActiveFeed: (feed: 'forYou' | 'following' | 'trending' | 'latest') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  createPost: (title: string, content: string, astrologyTag: string, hashtags: string[]) => void;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  toggleFollow: (authorId: string) => void;
  addComment: (postId: string, commentText: string) => void;
  deletePost: (postId: string) => void;
}

const CommunityContext = createContext<CommunityContextType | null>(null);

const STORAGE_KEY = 'astronex_community_posts_v1';

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<CommunityPost[]>(SAMPLE_COMMUNITY_POSTS);
  const [activeFeed, setActiveFeed] = useState<'forYou' | 'following' | 'trending' | 'latest'>('forYou');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setPosts(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const savePosts = (updated: CommunityPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  const createPost = (
    title: string,
    content: string,
    astrologyTag: string,
    hashtags: string[]
  ) => {
    const newPost: CommunityPost = {
      id: 'post_' + Date.now(),
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      authorSign: 'Virgo',
      isVerified: user.isPremium,
      createdAt: 'Just now',
      title,
      content,
      astrologyTag,
      hashtags: hashtags.map((h) => (h.startsWith('#') ? h : `#${h}`)),
      likes: 0,
      isLiked: false,
      isSaved: false,
      commentCount: 0,
      comments: [],
    };

    savePosts([newPost, ...posts]);
  };

  const toggleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id !== postId) return p;
      const isLiked = !p.isLiked;
      return {
        ...p,
        isLiked,
        likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
      };
    });
    savePosts(updated);
  };

  const toggleSave = (postId: string) => {
    const updated = posts.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p));
    savePosts(updated);
  };

  const toggleFollow = (authorId: string) => {
    const updated = posts.map((p) =>
      p.authorId === authorId ? { ...p, isFollowingAuthor: !p.isFollowingAuthor } : p
    );
    savePosts(updated);
  };

  const addComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;
    const updated = posts.map((p) => {
      if (p.id !== postId) return p;
      const newComment = {
        id: 'c_' + Date.now(),
        postId,
        authorId: user.id,
        authorName: user.name,
        authorAvatar: user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        authorSign: 'Virgo' as const,
        content: commentText.trim(),
        createdAt: 'Just now',
        likes: 0,
        isLiked: false,
      };
      const existing = p.comments || [];
      return {
        ...p,
        commentCount: p.commentCount + 1,
        comments: [newComment, ...existing],
      };
    });
    savePosts(updated);
  };

  const deletePost = (postId: string) => {
    const updated = posts.filter((p) => p.id !== postId);
    savePosts(updated);
  };

  return (
    <CommunityContext.Provider
      value={{
        posts,
        activeFeed,
        setActiveFeed,
        searchQuery,
        setSearchQuery,
        createPost,
        toggleLike,
        toggleSave,
        toggleFollow,
        addComment,
        deletePost,
      }}
    >
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const ctx = useContext(CommunityContext);
  if (!ctx) {
    throw new Error('useCommunity must be used within CommunityProvider');
  }
  return ctx;
}
