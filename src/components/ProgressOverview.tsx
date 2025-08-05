import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProgressOverviewProps {
  totalHabits: number;
  completedToday: number;
  longestStreak: number;
  totalCompletions: number;
}

export const ProgressOverview = ({ 
  totalHabits, 
  completedToday, 
  longestStreak, 
  totalCompletions 
}: ProgressOverviewProps) => {
  const completionRate = totalHabits > 0 ? (completedToday / totalHabits) * 100 : 0;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Today's Progress</span>
          <span className="text-2xl">🎯</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Daily Completion</span>
            <span className="font-medium">{completedToday}/{totalHabits}</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">{longestStreak}</div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-success">{totalCompletions}</div>
            <div className="text-xs text-muted-foreground">Total Done</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">{Math.round(completionRate)}%</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};