"use client";

import StartJourney from "@/components/shared/start-journey";

export default function Passo4Page() {
  return (
    <StartJourney
      title="Arcadas"
      description="Vamos passar agora para o exame dos dentes observando as arcadas superior e inferior."
      audioPath="/audios/04Arcadas.mp3"
      nextPath="/paciente/passo-5"
      previousPath="/paciente/passo-3"
      progressClassName="w-4/6"
    />
  );
} 