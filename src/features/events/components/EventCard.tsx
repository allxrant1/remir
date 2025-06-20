import React from "react";
import { Calendar, Clock, MapPin, AlignLeft, Trash2, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Event } from "@/services/eventService";
import { UserRole } from "@/types/user";
import { formatEventDate, getBgColorClass } from "@/features/events/utils";

interface Props {
  evento: Event;
  role: UserRole;
  variant: "grid" | "list";
  onViewDetails: (evento: Event) => void;
  onDelete: (evento: Event) => void;
  onManageEscala: (evento: Event) => void;
}

const EventCard: React.FC<Props> = ({
  evento,
  role,
  variant,
  onViewDetails,
  onDelete,
  onManageEscala,
}) => {
  const WrapperClass =
    variant === "grid"
      ? "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-md md:shadow-lg"
      : "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/8 transition-all duration-300 hover:scale-[1.01] shadow-md md:shadow-lg";

  const horaFormatted = evento.hora?.substring(0,5);

  return (
    <Card className={WrapperClass}>
      <CardContent className="p-6">
        {variant === "grid" ? (
          // GRID LAYOUT
          <>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="text-lg font-bold text-white">{evento.titulo}</h3>
                  <Badge
                    className={`${getBgColorClass(
                      evento.tipo
                    )} text-white px-2 py-1 text-xs`}
                  >
                    {evento.tipo}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 gap-2 text-sm text-white/80 mb-3">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatEventDate(evento.data)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{horaFormatted}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{evento.local}</span>
                  </div>
                </div>
                <p className="text-white/70 text-sm mb-4">{evento.descricao}</p>
              </div>
            </div>
          </>
        ) : (
          // LIST LAYOUT
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-bold text-white">{evento.titulo}</h3>
                <Badge
                  className={`${getBgColorClass(
                    evento.tipo
                  )} text-white px-2 py-1 text-xs`}
                >
                  {evento.tipo}
                </Badge>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-white/80">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatEventDate(evento.data)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{horaFormatted}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{evento.local}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ações */}
        <div
          className={
            variant === "grid"
              ? "flex flex-wrap gap-2"
              : "flex items-center space-x-2 mt-4" // list variant
          }
        >
          {role === "ministry_leader" && (
            <Button
              onClick={() => onManageEscala(evento)}
              variant="outline"
              size="sm"
              className="bg-white/5 text-white border-white/10 hover:bg-white/10"
            >
              <Users className="w-4 h-4 mr-2" />
              Gerenciar Escala
            </Button>
          )}
          <Button
            onClick={() => onViewDetails(evento)}
            variant="outline"
            size="sm"
            className="bg-white/5 text-white border-white/10 hover:bg-white/10"
          >
            <AlignLeft className="w-4 h-4 mr-2" />
            Detalhes
          </Button>
          {role === "social_media" && (
            <Button
              onClick={() => onDelete(evento)}
              variant="outline"
              size="sm"
              className="bg-white/5 text-red-400 border-red-400/30 hover:bg-red-500/10 hover:border-red-400/50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Excluir
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard; 