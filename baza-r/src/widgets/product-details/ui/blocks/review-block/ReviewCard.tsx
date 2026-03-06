import { useState } from "react";
import type { Review } from "../../../model/review.config";
import Block from "../../../../../shared/components/ui/Block";
import { Button } from "../../../../../shared/components/ui/Button";
import IconWrapper from "../../../../../shared/components/ui/IconWrapper";
import { ShareIcon } from "../../../../../shared/components/icons/ui/ShareIcon";
import { ReportIcon } from "../../../../../shared/components/icons/ui/ReportIcon";
import { ArrowEnterIcon } from "../../../../../shared/components/icons/ui/ArrowEnterIcon";
import { LikeIcon } from "../../../../../shared/components/icons/ui/LikeIcon";

type Props = {
  review: Review;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          className={i < rating ? "text-yellow-400" : "text-neutral-300"}
        >
          <path d="M8 1l1.854 3.756L14 5.528l-3 2.922.708 4.131L8 10.5l-3.708 2.081L5 8.45 2 5.528l4.146-.772L8 1z" />
        </svg>
      ))}
    </div>
  );
}

export function ReviewCard({ review }: Props) {
  const [repliesOpen, setRepliesOpen] = useState(false);

  return (
    <Block rounded="xl" className="flex flex-col overflow-hidden">
      <div className="bw-b-thin flex items-center justify-between gap-4 border-neutral-100 px-10 py-5">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{review.author}</span>
            {review.isSeller && (
              <span className="bg-accent/10 text-accent rounded px-2 py-0.5 text-xs font-medium">
                Продавець
              </span>
            )}
          </div>
        </div>
        <span className="text-muted flex flex-1 shrink-0 justify-end text-sm">
          {review.date}
        </span>
        <div className="flex gap-5">
          <Button color="link">
            <IconWrapper>
              <ShareIcon />
            </IconWrapper>
          </Button>
          <Button color="link">
            <IconWrapper>
              <ReportIcon />
            </IconWrapper>
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-10 py-5">
        {review.sellerName && (
          <div className="text-muted flex items-center gap-2 text-sm">
            <span>Продавець:</span>
            <span className="font-medium text-neutral-800">
              {review.sellerName}
            </span>
          </div>
        )}

        <StarRating rating={review.rating} />

        {review.text && <p className="text-base">{review.text}</p>}
        {review.photos && review.photos.length > 0 && (
          <div className="flex gap-3">
            {review.photos.map((photo) => (
              <div
                key={photo.id}
                className="h-20 w-20 overflow-hidden rounded-lg"
              >
                <img
                  src={photo.src}
                  alt={photo.alt ?? ""}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        )}

        {review.pros && (
          <div className="text-base">
            <p className="font-semibold">Переваги:</p>
            <p>{review.pros}</p>
          </div>
        )}

        {review.cons && (
          <div className="text-base">
            <p className="font-semibold">Недоліки:</p>
            <p>{review.cons}</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-4">
          <Button
            onClick={() => setRepliesOpen((p) => !p)}
            color="link"
            className="gap-1.5 text-base font-normal"
          >
            <IconWrapper>
              <ArrowEnterIcon />
            </IconWrapper>
            <span>Відповісти</span>
          </Button>
          <div className="flex items-center gap-3">
            <Button color="link" className="gap-1.5 text-base font-medium">
              <IconWrapper>
                <LikeIcon />
              </IconWrapper>
              {review.likes}
            </Button>
            <Button color="link" className="gap-1.5 text-base font-medium">
              <IconWrapper className="rotate-180">
                <LikeIcon />
              </IconWrapper>
              {review.dislikes}
            </Button>
          </div>
        </div>
      </div>

      {review.replies && review.replies.length > 0 && repliesOpen && (
        <div className="flex flex-col gap-3 border-t border-neutral-100 px-10 pb-6">
          {review.replies.map((reply) => (
            <div key={reply.id} className="flex flex-col gap-1 pt-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{reply.author}</span>
                {reply.isSeller && (
                  <span className="bg-accent/10 text-accent rounded px-2 py-0.5 text-xs font-medium">
                    Продавець
                  </span>
                )}
                <span className="text-muted ml-auto text-xs">{reply.date}</span>
              </div>
              <p className="text-sm">{reply.text}</p>
            </div>
          ))}
        </div>
      )}
    </Block>
  );
}
