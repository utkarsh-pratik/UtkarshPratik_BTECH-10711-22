// frontend/src/components/ui/Avatar.tsx
export default function Avatar({ name }: { name: string }) {
    const getInitials = (name: string) => {
      const names = name.split(" ");
      if (names.length > 1) {
        return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
      }
      return name.substring(0, 2).toUpperCase();
    };
  
    return (
      <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-bold text-sm">
        {getInitials(name)}
      </div>
    );
  }