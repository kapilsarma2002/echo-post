
import React from 'react';
import { Bell, Check, Trash2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationsPopoverProps {
  notificationsCount: number;
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const NotificationsPopover = ({ notificationsCount, setNotificationsCount }: NotificationsPopoverProps) => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: 1,
      title: 'Post published',
      message: 'Your Instagram post was published successfully.',
      time: '10 minutes ago',
      read: false
    },
    {
      id: 2,
      title: 'Analytics report',
      message: 'Your weekly analytics report is ready to view.',
      time: '2 hours ago',
      read: false
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
    setNotificationsCount(0);
    toast.success("All notifications marked as read");
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setNotificationsCount(0);
    toast.success("All notifications cleared");
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    const unreadCount = notifications.filter(n => !n.read && n.id !== id).length;
    setNotificationsCount(unreadCount);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-gray-600" />
          {notificationsCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {notificationsCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex justify-between items-center p-4 bg-gray-50">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-1" />
              Mark all read
            </Button>
            <Button variant="ghost" size="sm" onClick={clearAllNotifications}>
              <Trash2 className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          </div>
        </div>
        <Separator />
        {notifications.length > 0 ? (
          <div className="max-h-96 overflow-auto">
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <div 
                  className={`p-4 cursor-pointer hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                </div>
                <Separator />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No notifications</p>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
