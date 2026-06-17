import { useState } from "react";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    text: "Someone liked your Pokhara log",
    time: "2m ago",
    read: false,
  },
  { id: 2, text: "New comment on your Goa trip", time: "1h ago", read: false },
  { id: 3, text: "Your log was featured!", time: "3h ago", read: true },
];

export default function Notification() {
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const unread = notifs.filter((n) => !n.read).length;

  const markAllRead = () =>
    setNotifs((n) => n.map((x) => ({ ...x, read: true })));

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative text-blue-100 hover:text-white transition text-xl"
      >
        🔔
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <h3 className="font-bold text-gray-800 text-sm">Notifications</h3>
            <button
              onClick={markAllRead}
              className="text-xs text-blue-600 hover:underline"
            >
              Mark all read
            </button>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {notifs.map((n) => (
              <div
                key={n.id}
                className={`px-4 py-3 border-b last:border-0 hover:bg-gray-50 transition ${!n.read ? "bg-blue-50" : ""}`}
              >
                <p className="text-sm text-gray-700">{n.text}</p>
                <p className="text-xs text-gray-400 mt-1">{n.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
