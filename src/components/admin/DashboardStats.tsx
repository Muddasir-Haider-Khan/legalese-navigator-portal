
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UsersRound, FileText, Inbox, AlertTriangle } from "lucide-react";

const DashboardStats = () => {
  // Mock statistics data
  const stats = [
    {
      title: "Total Users",
      value: 2543,
      change: "+12%",
      icon: UsersRound,
      description: "from last month"
    },
    {
      title: "Documents Created",
      value: 8729,
      change: "+8%",
      icon: FileText,
      description: "from last month"
    },
    {
      title: "Pending Submissions",
      value: 42,
      change: "+15%",
      icon: Inbox,
      description: "from last month"
    },
    {
      title: "Issues Reported",
      value: 7,
      change: "-3%",
      icon: AlertTriangle,
      description: "from last month"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <stat.icon className="h-5 w-5 text-primary mr-2" />
              <span className="text-2xl font-bold">{stat.value.toLocaleString()}</span>
            </div>
            <p className={`text-xs ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'} mt-2`}>
              {stat.change} {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
