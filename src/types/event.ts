type EventObject = {
  id?: string;
  calendarId?: string;
  title?: string;
  body?: string;
  isAllday?: boolean;
  start?: Date | string | number;
  end?: Date | string | number;
  goingDuration?: number;
  comingDuration?: number;
  location?: string;
  attendees?: string[];
  category?: 'milestone' | 'task' | 'allday' | 'time';
  recurrenceRule?: string;
  state?: 'Busy' | 'Free';
  isVisible?: boolean;
  isPending?: boolean;
  isFocused?: boolean;
  isReadOnly?: boolean;
  isPrivate?: boolean;
  color?: string;
  backgroundColor?: string;
  dragBackgroundColor?: string;
  borderColor?: string;
  raw?: any;
};

export { type EventObject };
