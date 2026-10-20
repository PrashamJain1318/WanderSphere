import React from 'react';
import { CommunityPostPreview } from '@wandersphere/contracts';
import { User, Clock, Heart, Sparkles } from 'lucide-react';

interface CommunityPreviewCardProps {
  post: CommunityPostPreview;
}

export function CommunityPreviewCard({ post }: CommunityPreviewCardProps) {
  return (
    <article className="relative flex flex-col justify-between rounded-xl border border-canvas-border bg-canvas-card p-6 shadow-sm hover:border-canvas-border/80 transition-all">
      {/* Sample disclaimer banner */}
      <div className="mb-4 inline-flex items-center gap-1.5 rounded bg-brand-amber/10 border border-brand-amber/30 px-2 py-0.5 text-[10px] font-medium text-brand-amber w-fit">
        <Sparkles className="h-3 w-3" />
        <span>Sample Community Preview • Editorial Placeholder</span>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span className="font-semibold text-brand-teal-light">{post.destinationName}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.travelDurationDays} days on route
          </span>
        </div>

        <h3 className="font-serif text-lg font-medium text-white mb-2 leading-snug">
          &ldquo;{post.title}&rdquo;
        </h3>

        <p className="text-sm text-slate-300 leading-relaxed font-sans line-clamp-3">
          {post.snippet}
        </p>
      </div>

      <div className="mt-6 border-t border-canvas-border/80 pt-4 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-canvas-subtle border border-canvas-border text-slate-300">
            <User className="h-3.5 w-3.5" />
          </div>
          <div>
            <p className="font-medium text-slate-200">{post.authorName}</p>
            <p className="text-[11px] text-slate-400">@{post.authorHandle}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <Heart className="h-3.5 w-3.5 text-rose-400" />
          <span>{post.likesCount}</span>
        </div>
      </div>
    </article>
  );
}
