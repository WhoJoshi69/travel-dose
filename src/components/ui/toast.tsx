import { Alert } from "./alert";

interface ToastProps {
  title: string;
  description: string;
  variant?: 'default' | 'destructive' | 'success';
}

export function toast({ title, description, variant = 'default' }: ToastProps) {
  // For now, we'll use a simple alert
  const message = `${title}: ${description}`;
  if (variant === 'destructive') {
    console.error(message);
  } else {
    console.log(message);
  }
}
