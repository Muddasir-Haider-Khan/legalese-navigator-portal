
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

const NotificationsPanel: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Notifications</h2>
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">
            You don't have any notifications at this time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsPanel;
