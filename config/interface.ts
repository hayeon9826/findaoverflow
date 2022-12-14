import React from 'react';

interface Timestamp {
  _seconds: number;
  _nanoseconds: number;
}

export interface BoardType {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

export interface PostType {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  imageUrl?: string;
  category?: string;
}

export interface HeaderType {
  title?: string;
}

export interface LayoutType {
  noNav?: boolean;
  noFooter?: boolean;
  title?: string;
  className?: string;
  children: React.ReactNode;
}
