import * as React from "react";
import Image from "next/image";
import { Card } from "./card";
import { Text } from "./text";
import { Heading } from "./heading";
import { Quote } from "lucide-react";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  logoUrl?: string;
  avatarUrl?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  logoUrl,
  avatarUrl,
}) => {
  return (
    <Card variant="glass" className="p-8 md:p-10 flex flex-col justify-between h-full relative">
      <Quote className="absolute right-6 top-6 w-12 h-12 text-black/5 pointer-events-none" />
      <div className="flex-1 mb-8">
        <Text size="lg" className="italic text-gray-800 leading-relaxed font-light">
          &ldquo;{quote}&rdquo;
        </Text>
      </div>
      <div className="flex items-center gap-4 border-t border-black/5 pt-6">
        {avatarUrl ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-black/10 bg-black/5">
            <Image
              src={avatarUrl}
              alt={author}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-secondary font-heading font-bold text-lg">
            {author.charAt(0)}
          </div>
        )}
        <div>
          <Heading level={4} size="base" className="font-bold text-gray-900">
            {author}
          </Heading>
          <Text size="sm" variant="muted" className="mt-0.5">
            {role}, <span className="text-black/70 font-semibold">{company}</span>
          </Text>
        </div>
      </div>
    </Card>
  );
};
