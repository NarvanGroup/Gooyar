# سیستم مدیریت تقویم

این یک سیستم جامع مدیریت تقویم است که به کاربران امکان ایجاد، ویرایش و مدیریت تقویم‌ها با برنامه‌های زمانی را می‌دهد.

## Features

- **Calendar List View**: Display all calendars in a responsive grid layout
- **Add New Calendar**: Create calendars with title, description, start/end dates, and availability schedules
- **Edit Calendar**: Modify existing calendar details and availability schedules
- **Delete Calendar**: Remove calendars with confirmation dialog
- **Availability Management**: Add multiple availability slots with day selection and time spans
- **Responsive Design**: Works on desktop and mobile devices
- **Form Validation**: Ensures required fields are filled before submission
- **Success Notifications**: User feedback for all operations

## Data Structure

### Calendar Object

```typescript
interface Calendar {
  id: string;
  title: string;
  description: string;
  start_time: string; // ISO date string
  end_time?: string; // Optional ISO date string
  availabilities: Availability[];
  created_at: Date;
  updated_at: Date;
}
```

### Availability Object

```typescript
interface Availability {
  days: string[]; // Array of day names: ['monday', 'tuesday', etc.]
  time_span: string; // Time range: "09:00 - 17:00"
}
```

## Components

### CalendarManager

The main component that orchestrates the entire calendar management system.

### CalendarCard

Displays individual calendar information in a card format with edit and delete actions.

### CalendarForm

A comprehensive form dialog for creating and editing calendars with:

- Basic information (title, description)
- Date/time pickers for start and end times
- Dynamic availability management with day selection chips
- Form validation

### DeleteConfirmDialog

Confirmation dialog for calendar deletion with warning message.

## Usage

```tsx
import { Calendars } from "@/components/apps/calendar";

// Use in your page/component
<Calendars />;
```

## Sample Data

The system includes sample calendars for testing:

- Work Schedule: Monday-Friday availability with meeting times
- Personal Calendar: Weekend and evening availability
- Gym Schedule: Morning and evening workout sessions

## Styling

The system uses Material-UI components and follows the existing design system with:

- Responsive grid layout
- Card-based design
- Consistent spacing and typography
- Mobile-friendly floating action button
- Toast notifications for user feedback

## Dependencies

- @mui/material: UI components
- @mui/icons-material: Icons
- @mui/x-date-pickers: Date and time pickers
- date-fns: Date manipulation utilities

## Future Enhancements

- Calendar export functionality
- Recurring availability patterns
- Calendar sharing and collaboration
- Integration with external calendar services
- Advanced filtering and search
- Calendar templates
