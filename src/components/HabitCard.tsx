import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface HabitCardProps {
  id: string;
  name: string;
  icon: string;
  streak: number;
  isCompletedToday: boolean;
  onToggle: (id: string) => void;
}

export const HabitCard = ({ id, name, icon, streak, isCompletedToday, onToggle }: HabitCardProps) => {
  return (
    <Card className="mb-4 overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{icon}</div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                <Flame className="h-4 w-4 text-warning" />
                <span>{streak} day streak</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(id)}
            className={cn(
              "h-12 w-12 rounded-full p-0 transition-all duration-200",
              isCompletedToday 
                ? "bg-success hover:bg-success/90 text-success-foreground" 
                : "hover:bg-muted"
            )}
          >
            {isCompletedToday ? (
              <CheckCircle2 className="h-6 w-6" />
            ) : (
              <Circle className="h-6 w-6" />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};