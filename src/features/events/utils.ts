export const formatEventDate = (dateString: string): string => {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-");
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const monthIndex = parseInt(month, 10) - 1;
  const formattedDay = day.padStart(2, "0");
  return `${formattedDay} de ${monthNames[monthIndex]}`;
};

export const getBgColorClass = (tipo: string): string => {
  switch (tipo) {
    case "Cultos":
      return "bg-blue-700"; // Azul mais escuro para Cultos
    case "Ensino":
      return "bg-emerald-600"; // Verde esmeralda para Ensino
    case "Oração":
      return "bg-purple-700"; // Roxo mais escuro para Oração
    case "Eventos":
      return "bg-fuchsia-600"; // Fúcsia para Eventos
    default:
      return "bg-gray-700"; // Cor padrão para outros tipos
  }
}; 