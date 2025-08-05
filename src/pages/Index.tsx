import { useState, useEffect } from "react";
import { HabitCard } from "@/components/HabitCard";
import { AddHabitModal } from "@/components/AddHabitModal";
import { ProgressOverview } from "@/components/ProgressOverview";
import { toast } from "@/hooks/use-toast";

interface Habit {
  id: string;
  name: string;
  icon: string;
  streak: number;
  isCompletedToday: boolean;
  lastCompletedDate: string | null;
  totalCompletions: number;
}

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Load habits from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem("habithive-habits");
    if (savedHabits) {
      const parsed = JSON.parse(savedHabits);
      // Check if we need to reset daily completions
      const today = new Date().toDateString();
      const updatedHabits = parsed.map((habit: Habit) => ({
        ...habit,
        isCompletedToday: habit.lastCompletedDate === today ? habit.isCompletedToday : false
      }));
      setHabits(updatedHabits);
    } else {
      // Add some default habits for first-time users
      const defaultHabits: Habit[] = [
        {
          id: "1",
          name: "Drink Water",
          icon: "💧",
          streak: 0,
          isCompletedToday: false,
          lastCompletedDate: null,
          totalCompletions: 0,
        },
        {
          id: "2", 
          name: "Exercise",
          icon: "🏋️",
          streak: 0,
          isCompletedToday: false,
          lastCompletedDate: null,
          totalCompletions: 0,
        }
      ];
      setHabits(defaultHabits);
    }
  }, []);

  // Save habits to localStorage whenever habits change
  useEffect(() => {
    localStorage.setItem("habithive-habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = (name: string, icon: string) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      icon,
      streak: 0,
      isCompletedToday: false,
      lastCompletedDate: null,
      totalCompletions: 0,
    };
    setHabits([...habits, newHabit]);
    toast({
      title: "Habit Added! 🎉",
      description: `"${name}" has been added to your habits.`,
    });
  };

  const toggleHabit = (id: string) => {
    const today = new Date().toDateString();
    
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const wasCompletedToday = habit.isCompletedToday;
        const newIsCompleted = !wasCompletedToday;
        
        let newStreak = habit.streak;
        let newTotalCompletions = habit.totalCompletions;
        
        if (newIsCompleted) {
          // Completing the habit
          newStreak = habit.streak + 1;
          newTotalCompletions = habit.totalCompletions + 1;
          toast({
            title: "Great job! 🔥",
            description: `You've completed "${habit.name}" - ${newStreak} day streak!`,
          });
        } else {
          // Uncompleting the habit
          newStreak = Math.max(0, habit.streak - 1);
          newTotalCompletions = Math.max(0, habit.totalCompletions - 1);
        }
        
        return {
          ...habit,
          isCompletedToday: newIsCompleted,
          lastCompletedDate: newIsCompleted ? today : habit.lastCompletedDate,
          streak: newStreak,
          totalCompletions: newTotalCompletions,
        };
      }
      return habit;
    }));
  };

  const completedToday = habits.filter(h => h.isCompletedToday).length;
  const longestStreak = Math.max(...habits.map(h => h.streak), 0);
  const totalCompletions = habits.reduce((sum, h) => sum + h.totalCompletions, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center space-x-2">
            <span>🐝</span>
            <span>HabitHive</span>
          </h1>
          <p className="text-muted-foreground">Building habits together, one day at a time</p>
        </div>

        {/* Progress Overview */}
        <ProgressOverview
          totalHabits={habits.length}
          completedToday={completedToday}
          longestStreak={longestStreak}
          totalCompletions={totalCompletions}
        />

        {/* Add Habit Button */}
        <AddHabitModal onAddHabit={addHabit} />

        {/* Habits List */}
        <div className="space-y-3">
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-lg font-medium mb-2">No habits yet!</h3>
              <p className="text-muted-foreground text-sm">Add your first habit to get started on your journey.</p>
            </div>
          ) : (
            habits.map((habit) => (
              <HabitCard
                key={habit.id}
                id={habit.id}
                name={habit.name}
                icon={habit.icon}
                streak={habit.streak}
                isCompletedToday={habit.isCompletedToday}
                onToggle={toggleHabit}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-xs text-muted-foreground">
          <p>Join the hive, build the life you want! 🎯</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
