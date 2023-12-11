import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface Props {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function AlertForm(props: Props) {
  const { title, description, children } = props;
  return (
    <Alert variant="destructive" className="flex items-center">
      <div className="mr-4">{!children ? <AlertTriangle /> : children}</div>
      <div>
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </div>
    </Alert>
  );
}
