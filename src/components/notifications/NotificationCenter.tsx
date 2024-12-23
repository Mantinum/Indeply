import React, { useState, useEffect } from 'react';
import { Bell, Calendar, Clock, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { formatDateTime } from '../../utils/date';

interface Notification {
  id: string;
  type: 'appointment_reminder' | 'appointment_confirmation' | 'appointment_cancellation';
  title: string;
  message: string;
  read: boolean;
  created_at: string;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const loadNotifications = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) return;

      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false });

      if (data) {
        setNotifications(data);
        setUnreadCount(data.filter((n: Notification) => !n.read).length);
      }
    };

    loadNotifications();

    // Souscription aux nouvelles notifications
    const subscription = supabase
      .channel('notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications' 
      }, payload => {
        setNotifications(current => [payload.new as Notification, ...current]);
        setUnreadCount(count => count + 1);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const markAsRead = async (notificationId: string) => {
    await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    setNotifications(notifications.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ));
    setUnreadCount(count => Math.max(0, count - 1));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 text-secondary-400 hover:text-secondary-600 rounded-lg"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-secondary-900">Notifications</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-secondary-500">
                Aucune notification
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-100 last:border-0 ${
                    !notification.read ? 'bg-primary-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      notification.type === 'appointment_reminder'
                        ? 'bg-primary-100 text-primary-600'
                        : notification.type === 'appointment_cancellation'
                        ? 'bg-red-100 text-red-600'
                        : 'bg-green-100 text-green-600'
                    }`}>
                      {notification.type === 'appointment_reminder' ? (
                        <Clock className="w-4 h-4" />
                      ) : (
                        <Calendar className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-secondary-900">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-secondary-600">
                        {notification.message}
                      </p>
                      <p className="text-xs text-secondary-500 mt-1">
                        {formatDateTime(notification.created_at, '12:00')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}