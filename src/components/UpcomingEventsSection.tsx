
import { Calendar, Clock, MapPin, ChevronRight } from "lucide-react";

export function UpcomingEventsSection() {
  const events = [
    {
      title: "Culto de Domingo",
      date: "Dom, 05 Jan",
      time: "10:00",
      location: "Santuário Principal",
      type: "culto"
    },
    {
      title: "Estudos Bíblicos",
      date: "Qua, 08 Jan", 
      time: "19:30",
      location: "Sala de Estudos",
      type: "ensino"
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "culto": return "bg-blue-100 text-blue-700";
      case "ensino": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Próximos Eventos</h2>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
          <span>Ver todos</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {events.map((event, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                  {event.title}
                </h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                  {event.type}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
