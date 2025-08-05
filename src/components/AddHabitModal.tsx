import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddHabitModalProps {
  onAddHabit: (name: string, icon: string) => void;
}

const habitTemplates = [
  { name: "Drink Water", icon: "💧" },
  { name: "Exercise", icon: "🏋️" },
  { name: "Read", icon: "📚" },
  { name: "Meditate", icon: "🧘" },
  { name: "No Smoking", icon: "🚭" },
  { name: "Sleep Early", icon: "😴" },
  { name: "Healthy Eating", icon: "🥗" },
  { name: "Journal", icon: "📝" },
];

export const AddHabitModal = ({ onAddHabit }: AddHabitModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customIcon, setCustomIcon] = useState("");

  const handleAddTemplate = (template: typeof habitTemplates[0]) => {
    onAddHabit(template.name, template.icon);
    setIsOpen(false);
  };

  const handleAddCustom = () => {
    if (customName.trim() && customIcon.trim()) {
      onAddHabit(customName.trim(), customIcon.trim());
      setCustomName("");
      setCustomIcon("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full mb-6" size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Add New Habit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Habit</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Quick Templates</h4>
            <div className="grid grid-cols-2 gap-2">
              {habitTemplates.map((template, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAddTemplate(template)}
                  className="h-auto p-3 flex flex-col items-center space-y-1"
                >
                  <span className="text-lg">{template.icon}</span>
                  <span className="text-xs">{template.name}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-3">Create Custom</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="habit-name">Habit Name</Label>
                <Input
                  id="habit-name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="Enter habit name"
                />
              </div>
              <div>
                <Label htmlFor="habit-icon">Icon (emoji)</Label>
                <Input
                  id="habit-icon"
                  value={customIcon}
                  onChange={(e) => setCustomIcon(e.target.value)}
                  placeholder="🎯"
                  maxLength={2}
                />
              </div>
              <Button onClick={handleAddCustom} className="w-full" disabled={!customName.trim() || !customIcon.trim()}>
                Create Habit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};