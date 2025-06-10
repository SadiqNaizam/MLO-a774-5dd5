import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // For user/action icons
import { cn } from '@/lib/utils';

interface ActivityFeedItemProps {
  actorName?: string; // e.g., "John Doe"
  actorImageUrl?: string;
  action: string; // e.g., "updated", "created", "commented on"
  targetName?: string; // e.g., "Order #12345", "Product 'Ficus Tree'"
  targetLink?: string; // Link to the target item
  timestamp: string; // e.g., "2 minutes ago", "Mar 15, 2024"
  icon?: React.ElementType; // Optional specific icon for the activity type
  className?: string;
}

const ActivityFeedItem: React.FC<ActivityFeedItemProps> = ({
  actorName,
  actorImageUrl,
  action,
  targetName,
  targetLink,
  timestamp,
  icon: Icon,
  className,
}) => {
  console.log(`Rendering ActivityFeedItem: ${actorName || 'System'} ${action} ${targetName || ''}`);

  const actorInitial = actorName ? actorName.split(' ').map(n => n[0]).join('').toUpperCase() : 'S';

  return (
    <div className={cn("flex items-start gap-3 py-3 px-1 border-b border-border/50 last:border-b-0", className)}>
      {Icon ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
      ) : (
        <Avatar className="h-8 w-8 border">
          {actorImageUrl && <AvatarImage src={actorImageUrl} alt={actorName || 'Actor'} />}
          <AvatarFallback>{actorInitial}</AvatarFallback>
        </Avatar>
      )}
      <div className="flex-1 text-sm">
        <p className="text-foreground">
          {actorName && <span className="font-semibold">{actorName}</span>}
          {actorName ? ` ${action} ` : `${action} `}
          {targetLink && targetName ? (
            <a href={targetLink} className="font-semibold text-primary hover:underline">
              {targetName}
            </a>
          ) : targetName ? (
            <span className="font-semibold">{targetName}</span>
          ) : null}
        </p>
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
};

export default ActivityFeedItem;