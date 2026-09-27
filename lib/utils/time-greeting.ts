export interface RealTimeGreetingInfo {
  greeting: string;
  dayOfWeek: string;
  formattedDate: string;
  timeString: string;
  fullGreeting: string;
  periodLabel: string;
}

export function getRealTimeGreeting(userName?: string): RealTimeGreetingInfo {
  const now = new Date();
  const hours = now.getHours();

  let greeting = 'Good afternoon';
  let periodLabel = 'Afternoon';

  if (hours >= 5 && hours < 12) {
    greeting = 'Good morning';
    periodLabel = 'Morning';
  } else if (hours >= 12 && hours < 17) {
    greeting = 'Good afternoon';
    periodLabel = 'Afternoon';
  } else if (hours >= 17 && hours < 21) {
    greeting = 'Good evening';
    periodLabel = 'Evening';
  } else {
    greeting = 'Good night';
    periodLabel = 'Night';
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = days[now.getDay()];
  const formattedDate = `${dayOfWeek}, ${months[now.getMonth()]} ${now.getDate()}`;
  const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  const namePart = userName ? `, ${userName}` : '';
  const fullGreeting = `${greeting}${namePart}`;

  return {
    greeting,
    dayOfWeek,
    formattedDate,
    timeString,
    fullGreeting,
    periodLabel,
  };
}
