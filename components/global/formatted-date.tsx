import { type FC, useMemo } from "react";

type FormattedDateProps = {
  date: string | null;
  className?: string;
}

export const FormattedDate: FC<FormattedDateProps> = ({ date, className }) => {
  const formattedDate = useMemo(() => {
    if (!date) return '';
    
    return new Intl.DateTimeFormat('en-US', {
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  }, [date])

  if (!formattedDate) return null;

  return <span className={className}>{formattedDate}</span>
}