import { Badge } from "@/components/ui/badge";


interface BadgeProps {
    condition: number
  }

export default function BadgeStatus({ condition }: BadgeProps) {
  return (
    <div>
      <Badge className={`${condition <= 30 ? "bg-red-400" : condition <= 60 ? "bg-yellow-400" : "bg-green-400"}`}>Badge</Badge>
    </div>
  );
}
