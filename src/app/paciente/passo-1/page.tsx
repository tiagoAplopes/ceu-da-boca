"use client";

import StartJourney from "@/components/shared/start-journey";

export default function Passo1Page() {
  return (
    <StartJourney
      title="Pescoço"
      description="Olá! Vamos começar nossa jornada! Iniciaremos o auto exame bucal pela área do pescoço."
      audioPath="/audios/01Pescoco.mp3"
      nextPath="/paciente/passo-2"
      previousPath="/paciente/comecar-jornada"
      progressClassName="w-1/6"
    />
  );
} 