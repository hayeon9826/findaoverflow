import React from 'react';

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface boardType {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
}

export interface HeaderType {
  title?: string;
}

export interface LayoutType {
  noNav?: boolean;
  title?: string;
  className?: string;
  children: React.ReactNode;
}
